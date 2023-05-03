<template>
    <div id="estimate-team" style="overflow: visible !important;">
        <div class="bg-slate-100 border" style="min-height: 100px; max-height: 300px">
            <ul class="divide-y" v-if="members && members.length > 0">
                <li :class="{'bg-teal-50 text-teal-700 font-semibold': isMe(user)}"
                    v-for="(user, i) in members"
                    :key="i"
                    class="flex items-center flex-nowrap p-2">
                    <!--                <span class="mr-1" :style="{ 'background-image': 'url(' + member.avatarUrl + ')' }" style="border-radius: 50%; width: 32px; height: 32px;"></span>-->
                    <span class="mr-1"><img
                            class="rounded-full w-[28px] h-[28px]"
                            :src="`https://trello-members.s3.amazonaws.com/${user.id}/${user.avatarHash}/50.png`"
                            width="28" height="28"/></span>
                    <span>{{ user.fullName }}</span><span v-if="isMe(user)">&nbsp;(me)</span>:&nbsp;
                    <span>{{ teamEstimate[user.id] }}h</span>
                </li>
                <li class="bg-blue-100 text-gray-600 text-md text-center p-2" dir="rtl">
                    میانگین زمانبندی: <b>{{ averageTime }}</b>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import DefaultLayout from "../../layout/DefaultLayout.vue";

var Trello = window.TrelloPowerUp.iframe();
export default {
    name: "Startup",
    components: {DefaultLayout},
    data() {
        return {
            t: null,
            member: null,
            card: null,
            cardData: null,
            permissions: null,
            enterprise: null,
            organization: null,
            board: null,
            theme: 'light',
            members: [],
            teamEstimate: {},
            token: '',
            apiKey: '',
            appName: '',
            api: null,
            initialized: false
        }
    },
    computed: {
        isCurrentUserRegisterEstimate() {
            return this.teamEstimate && Object.keys(this.teamEstimate).length > 0 && !!this.teamEstimate[this.member]
        },
        averageTime() {
            if (!this.teamEstimate) return 0
            const allKeys = Object.keys(this.teamEstimate).filter(x => !!x)
            const count = allKeys.length
            const sum = allKeys.reduce((total, item) => total + parseInt(`${this.teamEstimate[item]}`), 0)
            return Math.round(sum / count) + 'h'
        }
    },
    methods: {
        log(...arg) {

        },
        error(...arg) {

        },
        isMe(member) {
            console.log('is me', member, this.member)
            return member && this.member && this.member === member.id
        },
        fitSize() {
            this.$nextTick(() => {
                setTimeout(() => {
                    Trello.sizeTo(document.body)
                }, 1200)
            })
        },
        async getMemberData(id) {
            try {
                const {data} = await this.api.get(`members/${id}`)
                // this.log('getMemberData', id, data)
                return data
            } catch (ex) {
                // this.error('getMemberData', id, ex)
                return null
            }
        },
        async loadCardData() {
            try {
                const {data} = await this.api.get(`card/${this.card}`)
                // this.log('loadCardData', this.card, data)
                this.cardData = data
            } catch (ex) {
                // this.error('loadCardData', this.card, ex)
            }
        },
        loadContextData() {
            // this.log('loadContextData', Trello.getContext())
            // // this.log(this.t)
            const {member, board, organization, theme, permissions, enterprise, card} = Trello.getContext()
            // const {token, appKey, appName} = Trello.args
            if (typeof Trello.args === 'function') // this.log('-----------------args', Trello.args())
                this.theme = theme
            this.member = member
            this.card = card
            this.board = board
            this.organization = organization
            this.enterprise = enterprise
            this.permissions = permissions
            const urlParams = new URLSearchParams(window.location.search);
            // this.log('urlParams', urlParams)
            this.token = localStorage.api_token || urlParams.get('token') || ''
            this.apiKey = '4b9922f16a7e5f8b8d7ce717c9180cc4'
            this.appName = 'Team Timing'
            // this.log('comp', this)
        },
        async loadTeamEstimate() {
            const self = this
            return new Promise(resolve => {
                Trello.get('card', 'shared', 'team_estimate', this.teamEstimate).then(function (data) {
                    // this.log('team_estimate::data::', data)
                    const list = JSON.parse(JSON.stringify(data, null, 2))
                    self.teamEstimate = list
                    return resolve(list)
                });
            })
        },
        async loadData(force = false) {
            if (this.initialized && force) return

            // this.log('trello', Trello)
            this.initialized = false
            this.loadContextData()
            this.api = axios.create({
                baseURL: 'https://api.trello.com/1',
                headers: {
                    'Accept': 'application/json'
                },
                params: {
                    token: this.token,
                    key: this.apiKey
                }
            })
            await this.$nextTick()
            await this.loadTeamEstimate()
            await this.loadCardData()
            this.initialized = true
            this.fitSize()
        }
    },
    watch: {
        teamEstimate() {
            const self = this
            const memberIds = Object.keys(this.teamEstimate)
            // this.log('memberIds', memberIds)
            const apiCalls = memberIds.map(id => this.getMemberData(id))
            this.members = []
            // this.log('apiCalls', apiCalls)
            Promise.allSettled(apiCalls).then(results => {
                // this.log('results::', results)
                results.forEach(result => {
                    try {
                        if (result.status === 'fulfilled' && typeof result.value === 'object' && result.value.hasOwnProperty('id')) self.members.push(result.value)
                    } catch (ex) {
                        // this.log('error', ex)
                    }
                })
            })
            // this.log('teamEstimate::', this.teamEstimate)
            // console.log('members::', this.members)
            this.$nextTick().then(() => {
                this.fitSize()
            })
        }
    },
    async mounted() {
        await this.loadData(false)
        await this.$nextTick()
        this.fitSize()
    }
}
</script>

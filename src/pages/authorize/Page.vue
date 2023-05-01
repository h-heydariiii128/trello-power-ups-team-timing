<template>
    <default-layout>
        <page-header title="Authorization Power-up" subtitle="Click on Authorize to start">
            <div class="flex flex-wrap justify-center gap-6">
                <btn-primary @click="authorize" label="Authorize"/>
            </div>
        </page-header>
        <h1>Startup</h1>
    </default-layout>
</template>
<script>
import {defineComponent} from 'vue'
import DefaultLayout from "../../layout/DefaultLayout.vue";

export default defineComponent({
    name: "Startup",
    components: {DefaultLayout},
    methods: {
        authorize() {
            var t = TrelloPowerUp.iframe();

            var apiKey = t.arg('apiKey'); // Passed in as an argument to our iframe
            console.log('apiKey', apiKey)
            console.log('Promise', TrelloPowerUp)
            var trelloAuthUrl = `https://trello.com/1/authorize?expiration=1hour&name=Example%20Trello%20Power-Up&scope=read&key=${apiKey}&callback_method=fragment&return_url=${window.location.origin}%2Fauth-success.html`;

            var tokenLooksValid = function (token) {
                // If this returns false, the Promise won't resolve.
                return /^[0-9a-f]{64}$/.test(token);
            }

            t.authorize(trelloAuthUrl, {height: 680, width: 580, validToken: tokenLooksValid})
                .then(function (token) {
                    // store the token in Trello private Power-Up storage
                    return t.set('member', 'private', 'token', token)
                })
                .then(function () {
                    // now that we have the token we needed lets go on to letting
                    // the user do whatever they need to do.
                    return t.closePopup();
                });
        }
    },
    mounted() {
        /* global TrelloPowerUp */

// we can access Bluebird Promises as followsvar Promise = TrelloPowerUp.Promise;


        /*
        Trello Data Access
        The following methods show all allowed fields, you only need to include those you want.
        They all return promises that resolve to an object with the requested fields.
        Get information about the current board
        t.board('id', 'name', 'url', 'shortLink', 'members')
        Get information about the current list (only available when a specific list is in context)
        So for example available inside 'attachment-sections' or 'card-badges' but not 'show-settings' or 'board-buttons'
        t.list('id', 'name', 'cards')
        Get information about all open lists on the current board
        t.lists('id', 'name', 'cards')
        Get information about the current card (only available when a specific card is in context)
        So for example available inside 'attachment-sections' or 'card-badges' but not 'show-settings' or 'board-buttons'
        t.card('id', 'name', 'desc', 'due', 'closed', 'cover', 'attachments', 'members', 'labels', 'url', 'shortLink', 'idList')
        Get information about all open cards on the current board
        t.cards('id', 'name', 'desc', 'due', 'closed', 'cover', 'attachments', 'members', 'labels', 'url', 'shortLink', 'idList')
        Get information about the current active Trello member
        t.member('id', 'fullName', 'username')
        For access to the rest of Trello's data, you'll need to use the RESTful API. This will require you to ask the
        user to authorize your Power-Up to access Trello on their behalf. We've included an example of how to
        do this in the `🔑 Authorization Capabilities 🗝` section at the bottom.
        */

        /*
        Storing/Retrieving Your Own Data
        Your Power-Up is afforded 4096 chars of space per scope/visibility
        The following methods return Promises.
        Storing data follows the format: t.set('scope', 'visibility', 'key', 'value')
        With the scopes, you can only store data at the 'card' scope when a card is in scope
        So for example in the context of 'card-badges' or 'attachment-sections', but not 'board-badges' or 'show-settings'
        Also keep in mind storing at the 'organization' scope will only work if the active user is a member of the team
        Information that is private to the current user, such as tokens should be stored using 'private' at the 'member' scope
        t.set('organization', 'private', 'key', 'value');
        t.set('board', 'private', 'key', 'value');
        t.set('card', 'private', 'key', 'value');
        t.set('member', 'private', 'key', 'value');
        Information that should be available to all users of the Power-Up should be stored as 'shared'
        t.set('organization', 'shared', 'key', 'value');
        t.set('board', 'shared', 'key', 'value');
        t.set('card', 'shared', 'key', 'value');
        t.set('member', 'shared', 'key', 'value');
        If you want to set multiple keys at once you can do that like so
        t.set('board', 'shared', { key: value, extra: extraValue });
        Reading back your data is as simple as
        t.get('organization', 'shared', 'key');
        Or want all in scope data at once?
        t.getAll();
        */
    }
})
</script>

<style lang="scss">

</style>

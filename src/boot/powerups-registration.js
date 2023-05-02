import axios from 'axios'

const LOGO_URL = 'https://cdn.glitch.global/624902af-fafc-4eae-b7a0-e772a855b1dd/logo.svg?v=1682948707829'
const START_ICON = 'https://cdn.glitch.global/624902af-fafc-4eae-b7a0-e772a855b1dd/start.svg?v=1683012623916'
const DONE_ICON = 'https://cdn.glitch.global/624902af-fafc-4eae-b7a0-e772a855b1dd/done.svg?v=1683012623169'
// token: ATTAb80a47a1993dc65a6c2fd5e60cf6594ef45e6a92ce26118c3e4154c764e57b0b019DE1C0

const api = axios.create({
    baseURL: 'https://api.trello.com/1',
    headers: {
        'Accept': 'application/json'
    }
})

let DOING_LIST_ID = ''
let DONE_LIST_ID = ''
let BOARD_ID = ''
let MEMBER_ID = ''
let ORGANIZATION_ID = ''
let THEME = 'light'
let BOARD_LIST = []

let API_TOKEN = localStorage.api_token || ''
let context = null

export default function initialize({appKey, appName}) {
    const returnUrl = 'https://satisfying-mango-bagpipe.glitch.me/auth-success.html'
    const oauthUrl =
        `https://trello.com/1/authorize?expiration=never&name=${encodeURIComponent(appName)}&scope=read,write,account&key=${appKey}&callback_method=fragment&return_url=${returnUrl}`;

    console.log('TrelloPowerUp', TrelloPowerUp)

    function fillData(t) {
        const {member, board, organization, theme} = getContextInfo(t)
        MEMBER_ID = member
        BOARD_ID = board
        ORGANIZATION_ID = organization
        THEME = theme
        console.log('fillData', {member, board, organization, theme})
    }

    async function startCart(t) {
        await setCardStatus(t, 'start')
    }

    async function doneCart(t) {
        await setCardStatus(t, 'end')
        /*.then(function (list) {
        console.log(JSON.stringify(list, null, 2));
    });*/
    }

    async function authorize(t) {
        return new Promise(async (resolve, reject) => {
            if (!API_TOKEN) {
                const token = await t.authorize(oauthUrl, {
                    type: "popup",
                    height: 680,
                    width: 580,
                    scope: {read: true, write: true}
                })

                console.log('success auth', token)
                API_TOKEN = token
                localStorage.api_token = token
                location.reload()
                /*const access_link = window.open(oauthUrl)
                access_link.onclose = function () {
                    console.log('closing...')
                    window.location.reload()
                }*/
                // localStorage.api_token = res2
                // API_TOKEN = res2
            }

            return resolve(API_TOKEN)
        })
    }

    async function notAuthorized(t) {
        console.log('notAuthorized::token', API_TOKEN)
        API_TOKEN = ''
        localStorage.api_token = ''
        alert('دسترسی به امکانات نیازمند احراز هویت می باشد.')
        return Promise.reject('دسترسی به امکانات نیازمند احراز هویت می باشد.')
    }

    function boardListUpdated() {
        if (!BOARD_LIST || BOARD_LIST.length === 0) return
        const doing = BOARD_LIST.find(item => item.name.indexOf('در حال انجام') > -1)
        DOING_LIST_ID = doing && doing.id

        const done = BOARD_LIST.find(item => item.name.indexOf('انجام شده') > -1)
        DONE_LIST_ID = done && done.id
    }

    async function getBoardList(t) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('getBoardList::before', `boards/${BOARD_ID}/lists?key=${appKey}&token=${API_TOKEN}`)
                if (!API_TOKEN) return notAuthorized()
                const {data} = await api.get(`boards/${BOARD_ID}/lists?key=${appKey}&token=${API_TOKEN}`)
                console.log('getBoardList', data)
                BOARD_LIST = data
                boardListUpdated()
                return resolve(data)
            } catch (ex) {
                console.log('getBoardList::error', ex)
                return reject(ex)
            }
        })
    }

    async function updateCard(t, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!API_TOKEN) return notAuthorized()
                const {card} = getContextInfo(t)
                console.log('updateCard::token', API_TOKEN)
                console.log('updateCard::cardId', card)
                console.log('updateCard::payload', payload)
                if (!card) return reject(Error('Card Id is not provided.'))
                if (!API_TOKEN) return reject(Error('token is not provided.'))
                if (!appKey) return reject(Error('appKey is not provided.'))

                const {data} = api.put(`cards/${card}?key=${appKey}&token=${API_TOKEN}`, payload)
                return resolve(data)
            } catch (ex) {
                console.log('updateCard::error', ex)
                return reject(ex)
            }
        })
    }

    function setCardStatus(t, status) {
        return new Promise(async (resolve, reject) => {
            try {
                if (status === 'end') {
                    await updateCard(t, {
                        idList: DONE_LIST_ID
                    })
                } else if (status === 'start') {
                    await updateCard(t, {
                        idList: DOING_LIST_ID
                    })
                }
                t.set('card', 'shared', 'status', status)
                    .then(function (data) {
                        resolve(data)
                    });
            } catch (ex) {
                reject(ex)
            }
        })
    }

    function getCardStatus(t) {
        return new Promise(resolve => {
            t.get('card', 'shared', 'status', 'unset')
                .then(function (data) {
                    resolve(data)
                });
        })
    }

    function getContextInfo(t) {
        context = t
        return t.getContext();
        /*{
            // id of the current board
            "board": "59287bae175fb20142c4c282",
            // id of the current card (if there is one)
            "card": "59287bec175fb20142c4c363",
            // capability command, (if there is one)
            "command": "card-buttons",
            // id of the current member, "notLoggedIn" if no member is logged in
            "member": "591f23d52a2eaa0c33e6c187",
            // id of the Workspace the board is in (if its in one)
            "organization": "538627f73cbb44d1bfbb58f0",
            // id of the enterprise the board is in (if its in one)
            "enterprise": "5cedada40a30f27bdb6e26b7",
            // read or write permissions for current member per modelType
            "permissions": {
            "board": "write",
                "organization": "write",
                "card": "write"
            },
            // the current color theme the member is using, e.g. "light" or "dark".
            "theme": "dark"
        }*/
    }

// We need to call initialize to get all of our capability handles set up and registered with Trello
    TrelloPowerUp.initialize({
        'board-buttons': async function (t, options) {
            if (!API_TOKEN) {
                return [{
                    icon: LOGO_URL,
                    text: 'احراز هویت',
                    callback: authorize
                    /*url: oauthUrl,
                    target: '_blank' // optional target for above url*/
                }]
            }
            fillData(t)
            try {
                const list = await getBoardList(t)
                console.log('board::list', list)
            } catch {
            }
            let buttons = []
            return buttons
        },
        // 'card-badges': function(t, options){
        //     return getBadges(t);
        // },
        'card-buttons': async function (t, options) {
            context = t
            const status = await getCardStatus(t)
            const buttons = []
            if (status === 'unset') {
                buttons.push({
                    // we can either provide a button that has a callback function
                    // that callback function should probably open a popup, overlay, or boardBar
                    icon: START_ICON,
                    text: 'START',
                    condition: 'always',
                    callback: startCart
                })
            } else if (status === 'start') {
                buttons.push({
                    // we can either provide a button that has a callback function
                    // that callback function should probably open a popup, overlay, or boardBar
                    icon: DONE_ICON,
                    text: 'TASK IS DONE',
                    condition: 'always',
                    callback: doneCart
                })
            } else if (status === 'end') {
                buttons.push({
                    // we can either provide a button that has a callback function
                    // that callback function should probably open a popup, overlay, or boardBar
                    icon: START_ICON,
                    text: 'Resume',
                    condition: 'always',
                    callback: startCart
                })
            }

            return buttons
        },
        /*'card-detail-badges': function(t, options) {
            return getBadges(t);
        },*/
        /*'card-from-url': function(t, options) {
            // options.url has the url in question
            // if we know cool things about that url we can give Trello a name and desc
            // to use when creating a card. Trello will also automatically add that url
            // as an attachment to the created card
            // As always you can return a Promise that resolves to the card details

            return new Promise(function(resolve) {
                resolve({
                    name: '💻 ' + options.url + ' 🤔',
                    desc: 'This Power-Up knows cool things about the attached url'
                });
            });

            // if we don't actually have any valuable information about the url
            // we can let Trello know like so:
            // throw t.NotHandled();
        },
        'format-url': function(t, options) {
            // options.url has the url that we are being asked to format
            // in our response we can include an icon as well as the replacement text

            return {
                icon: GRAY_ICON, // don't use a colored icon here
                text: '👉 ' + options.url + ' 👈'
            };

            // if we don't actually have any valuable information about the url
            // we can let Trello know like so:
            // throw t.NotHandled();
        },
        'show-settings': function(t, options){
            // when a user clicks the gear icon by your Power-Up in the Power-Ups menu
            // what should Trello show. We highly recommend the popup in this case as
            // it is the least disruptive, and fits in well with the rest of Trello's UX
            return t.popup({
                title: 'Settings',
                url: './settings.html',
                height: 184 // we can always resize later, but if we know the size in advance, its good to tell Trello
            });
        },*/

        /*

            🔑 Authorization Capabiltiies 🗝

            The following two capabilities should be used together to determine:
            1. whether a user is appropriately authorized
            2. what to do when a user isn't completely authorized

        */
        /*'authorization-status': function (t, options) {
            // Return a promise that resolves to an object with a boolean property 'authorized' of true or false
            // The boolean value determines whether your Power-Up considers the user to be authorized or not.

            // When the value is false, Trello will show the user an "Authorize Account" options when
            // they click on the Power-Up's gear icon in the settings. The 'show-authorization' capability
            // below determines what should happen when the user clicks "Authorize Account"

            // For instance, if your Power-Up requires a token to be set for the member you could do the following:
            return t.get('member', 'private', 'token')
                .then(function (token) {
                    if (token) {
                        return {authorized: true};
                    }
                    return {authorized: false};
                });
            // You can also return the object synchronously if you know the answer synchronously.
        },
        'show-authorization': function (t, options) {
            // Returns what to do when a user clicks the 'Authorize Account' link from the Power-Up gear icon
            // which shows when 'authorization-status' returns { authorized: false }.

            // If we want to ask the user to authorize our Power-Up to make full use of the Trello API
            // you'll need to add your API from trello.com/app-key below:
            let trelloAPIKey = '';
            // This key will be used to generate a token that you can pass along with the API key to Trello's
            // RESTful API. Using the key/token pair, you can make requests on behalf of the authorized user.

            // In this case we'll open a popup to kick off the authorization flow.
            if (trelloAPIKey) {
                return t.popup({
                    title: 'My Auth Popup',
                    args: {apiKey: trelloAPIKey}, // Pass in API key to the iframe
                    url: 'authorize.html', // Check out public/authorize.html to see how to ask a user to auth
                    height: 140,
                });
            } else {
                console.log("🙈 Looks like you need to add your API key to the project!");
            }
        }*/
    }, {
        appKey,
        appName
    });

    console.log('Loaded by: ' + document.referrer);

}

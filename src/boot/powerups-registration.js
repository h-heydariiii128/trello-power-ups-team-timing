const logoUrl = '../../public/logo.svg'

console.log('TrelloPowerUp', TrelloPowerUp)

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
    'board-buttons': function(t, options){
        return [{
            // we can either provide a button that has a callback function
            // that callback function should probably open a popup, overlay, or boardBar
            icon: logoUrl,
            text: 'Popup',
            url: 'dashboard.html'
            // callback: boardButtonCallback
        },
         /*   {
            // or we can also have a button that is just a simple url
            // clicking it will open a new tab at the provided url
            icon: WHITE_ICON,
            text: 'URL',
            url: 'https://trello.com/inspiration',
            target: 'Inspiring Boards' // optional target for above url
        }*/
        ];
    },
    // 'card-badges': function(t, options){
    //     return getBadges(t);
    // },
    'card-buttons': function(t, options) {
        return [{
            // usually you will provide a callback function to be run on button click
            // we recommend that you use a popup on click generally
            icon: logoUrl, // don't use a colored icon here
            text: 'Open Popup',
            callback: function(e){
                console.log('btn clicked.', e)
            }
        },
            /*{
            // but of course, you could also just kick off to a url if that's your thing
            icon: GRAY_ICON,
            text: 'Just a URL',
            url: 'https://developers.trello.com',
            target: 'Trello Developer Site' // optional target for above url
        }*/
        ];
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
    'authorization-status': function(t, options){
        // Return a promise that resolves to an object with a boolean property 'authorized' of true or false
        // The boolean value determines whether your Power-Up considers the user to be authorized or not.

        // When the value is false, Trello will show the user an "Authorize Account" options when
        // they click on the Power-Up's gear icon in the settings. The 'show-authorization' capability
        // below determines what should happen when the user clicks "Authorize Account"

        // For instance, if your Power-Up requires a token to be set for the member you could do the following:
        return t.get('member', 'private', 'token')
            .then(function(token){
                if(token){
                    return { authorized: true };
                }
                return { authorized: false };
            });
        // You can also return the object synchronously if you know the answer synchronously.
    },
    'show-authorization': function(t, options){
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
                args: { apiKey: trelloAPIKey }, // Pass in API key to the iframe
                url: 'authorize.html', // Check out public/authorize.html to see how to ask a user to auth
                height: 140,
            });
        } else {
            console.log("🙈 Looks like you need to add your API key to the project!");
        }
    }
});

console.log('Loaded by: ' + document.referrer);

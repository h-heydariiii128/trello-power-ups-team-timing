import {createApp} from "vue";
import axios from "axios";
import {createPinia} from "pinia";

// components
import MainFooter from "../components/MainFooter.vue";
import PageHeader from "../components/PageHeader.vue";
import Popup from "../components/Popup.vue";

// buttons
import BtnDefault from "../components/buttons/BtnDefault.vue";
import BtnPrimary from "../components/buttons/BtnPrimary.vue";
import BtnSuccess from "../components/buttons/BtnSuccess.vue";
import BtnWarning from "../components/buttons/BtnWarning.vue";
import BtnDanger from "../components/buttons/BtnDanger.vue";

export default function (App) {

    const app = createApp(App);


// components
    app.component('PageHeader', PageHeader)
    app.component('MainFooter', MainFooter)
    app.component('Popup', Popup)

// buttons
    app.component('BtnDefault', BtnDefault)
    app.component('BtnPrimary', BtnPrimary)
    app.component('BtnSuccess', BtnSuccess)
    app.component('BtnWarning', BtnWarning)
    app.component('BtnDanger', BtnDanger)

// middleware
    app.use(createPinia())

    const api = axios.create({
        // baseURL: '',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        }
    })

    app.config.globalProperties.$api = api

    app.mount("#app");
}

<template>
    <default-layout>
        <page-header title="Hey there! 👋"
                     subtitle="This is the HTML connector for the Power-Up. It will be loaded into a hidden iframe when your Power-Up is enabled.">
            <p class="text-center">Not sure what is going on? Head on over to the <a
                    href="https://github.com/h-heydariiii128/trello-power-ups-team-timing/blob/main/README.md">README</a>.</p>
        </page-header>
    </default-layout>
</template>
<script>
import {defineComponent} from 'vue'
import DefaultLayout from "../../layout/DefaultLayout.vue";
import powerUpsInitialize from '../../boot/powerups-registration.js'

export default defineComponent({
    name: "Startup",
    components: {DefaultLayout},
    mounted() {
        powerUpsInitialize({appKey: window.appKey, appName: window.appName})
    }
})
</script>

<template>
    <default-layout>
        <page-header title="You're set!"
                     subtitle="This window should close automatically. If it doesn't, go ahead and close it."></page-header>
    </default-layout>
</template>
<script>
import {defineComponent} from 'vue'
import DefaultLayout from "../../layout/DefaultLayout.vue";

export default defineComponent({
    name: "Startup",
    components: {DefaultLayout},
})
</script>

<style lang="scss">

</style>

<template>
  <btn-base v-bind="$attrs" :class="btnClasses">
    <slot>{{ label }}</slot>
    <!--        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>-->
  </btn-base>
</template>

<script>
import BtnBase from "./BtnBase.vue";

export default {
  name: "BtnDefault",
  components: {BtnBase},
  props: {
    label: String
  },
  computed: {
    btnClasses() {
      if (this.outline) return 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
      return 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg '
    }
  }
}
</script>

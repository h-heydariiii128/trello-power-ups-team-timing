<template>
  <btn-base v-bind="$attrs" :class="btnClasses">
    <slot>{{ label }}</slot>
    <!--        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>-->
  </btn-base>
</template>

<script>
import BtnBase from "./BtnBase.vue";

export default {
  name: "BtnSuccess",
  components: {BtnBase},
  props: {
    label: String
  },
  computed: {
    btnClasses() {
      if (this.outline) return 'border-2 border-green-200 text-green-200 hover:bg-green hover:bg-opacity-5 focus:outline-none focus:ring-0'
      return 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg'
    }
  }
}
</script>

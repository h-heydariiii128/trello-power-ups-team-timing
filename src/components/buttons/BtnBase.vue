<template>
  <button
      :class="btnClasses"
      :disabled="disabled"
      :aria-disabled="disabled"
      class="inline-flex items-center leading-tight justify-center text-center transition duration-150 ease-in-out">
    <slot>{{ label }}</slot>
    <!--        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>-->
  </button>
</template>

<script>
export default {
  name: "BtnBase",
  props: {
    label: String,
    disabled: Boolean,
    round: {
      type: Boolean,
      default: true
    },
    uppercase: {
      type: Boolean,
      default: true
    },
    rounded: Boolean,
    dense: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    btnClasses() {
      let classes = ''
      if (this.rounded) classes += ' rounded'
      else if (this.round) classes += ' rounded-full'

      if (this.dense) classes += ' font-normal text-xs px-4 py-2 shadow-xs'
      else classes += ' text-sm font-medium text-md px-5 py-3 shadow-sm'

      if (this.uppercase) classes += ' uppercase'
      if(this.disabled) classes += '  cursor-not-allowed opacity-75 hover:shadow-none'
      return classes
    }
  }
}
</script>

<template>
  <div class="relative py-16">
    <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      <div class="relative">
        <div class="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
          <h1 class="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
            <slot name="title">{{ title }}</slot>
          </h1>
          <p class="text-center text-xl text-gray-600 dark:text-gray-300" v-if="subtitle">
            {{ subtitle }}
          </p>
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: ['title', 'subtitle']
}
</script>

<style scoped>

</style>

<template>
  <footer class="py-4">
    <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      <div class="m-auto md:w-10/12 lg:w-8/12 xl:w-6/12 text-center">
          h.heydariiii128@gmail.com&nbsp;<span id="copyright"></span>
<!--        &copy; &nbsp;<span id="copyright"></span>-->
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "MainFooter",
  mounted() {
    this.$nextTick(() => {
      document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear().toString()))
    })
  }
}
</script>

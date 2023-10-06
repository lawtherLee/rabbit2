<script setup lang="ts" name="Layout">
import AppTopNav from "@/views/Layout/components/app-top-nav.vue";
import AppHeader from "@/views/Layout/components/app-header.vue";
import AppFooter from "@/views/Layout/components/app-footer.vue";

console.log(123);
</script>

<template>
  <app-top-nav />
  <app-header />
  <router-view />
  <app-footer />
</template>

<style scoped lang="less"></style>
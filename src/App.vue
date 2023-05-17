<template>
  <component :is="template">
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import BasicTemplate from '@/templates/BasicTemplate.vue'
import LoginTemplate from '@/templates/LoginTemplate.vue'

const route = useRoute()

const template = computed(() => {
  return route.meta.disabledAdterLogin ? LoginTemplate : BasicTemplate
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

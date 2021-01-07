<template>
  <div id="app">
    <bilibili-winter></bilibili-winter>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    bilibiliWinter: () => import('@/components/banner/bilibiliWinter')
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a {
  text-decoration: none;
  color: #f60;
  border-bottom: 1px solid #d4d4d4;
}
a:hover {
  color: #ff3e3e;
}
</style>

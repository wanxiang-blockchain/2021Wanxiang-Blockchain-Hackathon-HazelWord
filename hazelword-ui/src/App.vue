<!--
 * @Description: 在此输入描述
 * @Date: 2019-07-25 11:19:10
 * @Author: 郑道杨
 * @LastEditors: 郑道杨
 * @LastEditTime: 2019-10-16 21:14:04
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      shareStore: this.$storage.state,
      protocolCodes: [ 'p0001', 'p0008' ] // 全部需要授权的协议
    }
  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang="scss">
body #app {
  color: #eee;
}
</style>

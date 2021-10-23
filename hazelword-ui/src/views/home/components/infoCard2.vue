<!------------------------------------------- template ------------------------------------------->
<template>
  <div class="mod">
    <div :style="getStyle" :index="5" class="box">
      <span :index="2" class="txt">{{title}}</span>
      <div class="main">
        <div class="wrap">
          <span :index="1" class="num">{{content}}</span>
          <span :index="0" v-if="desc" class="info">{{desc}}</span>
        </div>

      </div>
    </div>
    <img v-if="bg === 1" class="pic" src="@/assets/images/icons/infoCard2_bg1.png" />
    <img v-if="bg === 2" class="pic" src="@/assets/images/icons/infoCard2_bg2.png" />
  </div>
</template>

<!-------------------------------------------- script -------------------------------------------->
<script>
export default {
  name: '',
  components: {
  },

  props: {
    bg: Number,
    ostyle: {
      type: Object,
      default () {
        return {}
      }
    },
    title: String,
    content: [String, Number],
    desc: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
    }
  },

  /* 一.生命周期函数 */
  created () {
  },

  /* 二.监控函数 */
  watch: {
  },

  computed: {
    getStyle () {
      return this.ostyle || {}
    }
  },

  /* 三.内部功能函数 */
  methods: {
    /* ----------------------事件调用函数------------------------ */
    // 事件调用函数注释
    actionXxx () {

    },

    /* ----------------------内部功能函数------------------------ */
    // 内部功能函数注释
    doSomething () {

    },

    /* ----------------------服务请求函数------------------------ */
    // 服务请求函数注释
    ajaxXxx () {

    }
  }
}
</script>

<!-------------------------------------------- style -------------------------------------------->
<style scoped lang="scss">
.mod {
  position: relative;
  width: 387px;
  height: 233px;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 387px;
  height: 233px;
  overflow: auto;
  border-radius: 10px;
}

.txt {
  position: relative;
  max-width: 303px;
  height: 62px;
  margin-top: 21px;
  margin-left: 52px;
  overflow: hidden;
  color: #ededed;
  font-weight: 400;
  font-size: 20px;
  font-style: normal;
  line-height: 63px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
}

.main {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-left: 51px;
}

.wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // margin-right: 59px;
}

.num {
  position: relative;
  z-index: 1;
  max-width: 340px;
  height: 51px;
  overflow: hidden;
  color: #ededed;
  font-weight: 400;
  font-size: 36px;
  font-family: "Impact";
  font-style: normal;
  line-height: 63px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
}

.info {
  position: relative;
  margin-top: 3px;
  color: #ededed;
  font-weight: 400;
  font-size: 20px;
  font-style: normal;
  line-height: 63px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.pic {
  position: absolute;
  right: 30px;
  bottom: 25px;
  width: 107px;
  height: 105px;
  margin-top: 24px;
  opacity: 1;
}

</style>

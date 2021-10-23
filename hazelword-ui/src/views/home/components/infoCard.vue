<!------------------------------------------- template ------------------------------------------->
<template>
  <div class="mod">
    <img
      :index="4"
      class="layer"
      src="@/assets/images/common/card-bg1.png"
    />
    <div :index="1" class="color" />
    <div class="main">
      <!-- coinCodeSecond -->
      <img
        :index="1"
        :src="`/coins/${data.coinCodeSecond.toLowerCase()}.png`"
        v-if="data.coinCodeSecond"
        class="icon-money"
      />
      <!-- coinCodeFirst -->
      <img
        :index="0"
        :src="`/coins/${data.coinCodeFirst.toLowerCase()}.png`"
        v-if="data.coinCodeFirst"
        class="icon-woman"
      />
      <span :index="0" :style="getTitleColor" class="ethusdt">{{data.coinCodeFirst}}/{{data.coinCodeSecond}}</span>
    </div>
    <span :index="0" class="count">
      <countTo
        :startVal="startVal"
        :endVal="formatNum(data.price)"
        :decimals="formatDecimals(data.price)"
        :duration="1000"></countTo>
    </span>
  </div>
</template>

<!-------------------------------------------- script -------------------------------------------->
<script>
export default {
  name: '',
  components: {
  },

  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    colorIndex: Number
  },

  data () {
    return {
      startVal: 0
    }
  },

  /* 一.生命周期函数 */
  created () {
  },

  /* 二.监控函数 */
  watch: {
    data () {
      setTimeout(() => {
        this.startVal = this.formatNum(this.data.price)
      }, 1000)
    }
  },

  computed: {
    getTitleColor () {
      var colors = ['E95241', '6870FF', 'FAB947', 'CD4AFD', 'FBB948']
      return `color: #${colors[this.colorIndex % colors.length] || 'DFA64D'};`
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
    formatNum (num, totalLength = 6) {
      if (num < 0) totalLength++
      const numLength = parseInt(num).toString().length
      let fixedNum = totalLength - numLength
      if (fixedNum < 2) {
        fixedNum = 2
      }

      return num.toFixed(fixedNum)
    },
    formatDecimals (num, totalLength = 6) {
      if (num < 0) totalLength++
      const numLength = parseInt(num).toString().length
      let fixedNum = totalLength - numLength
      if (fixedNum < 2) {
        fixedNum = 2
      }

      return fixedNum
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 308px;
  height: 203px;
}

.layer {
  position: absolute;
  top: 0;
  align-self: center;
  width: 308px;
  height: 203px;
  opacity: 1;
}

.color {
  position: absolute;
  top: 44px;
  left: 113px;
  width: 114px;
  height: 35px;
  overflow: auto;
  background-color: rgba(101, 113, 251, 0.15);
  border-radius: 8px;
}

.main {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  margin-top: 31px;
  margin-left: 42px;
}

.icon-money {
  position: absolute;
  top: 11px;
  left: 24px;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  opacity: 1;
}

.icon-woman {
  position: relative;
  width: 40px;
  height: 40px;
  margin-top: 2px;
  margin-right: 48px;
  overflow: hidden;
  border-radius: 50%;
  opacity: 1;
}

.ethusdt {
  position: relative;
  color: #6571fb;
  font-weight: 400;
  font-size: 20px;
  font-family: "Impact";
  font-style: normal;
  line-height: 20px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.count {
  position: relative;
  max-width: 328px;
  height: 56px;
  margin-top: 21px;
  margin-left: 40px;
  overflow: hidden;
  color: #ededed;
  font-weight: 400;
  font-size: 46px;
  font-family: "Impact";
  font-style: normal;
  line-height: 63px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
}

</style>

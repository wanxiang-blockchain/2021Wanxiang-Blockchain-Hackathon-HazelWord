<!------------------------------------------- template ------------------------------------------->
<template>
  <div v-if="modelVal" class="modal">
    <div class="mod">
      <div :index="4" class="box">
        <div class="hd">
          <span :index="3" class="title">{{$t('mortgage.increasePledgedAssets')}}</span>
          <div class="wrap" @click="modelVal = false">
            <img
              :index="1"
              class="icon-fail"
              src="@/assets/images/mortgage/close.png"
            />
            <div :index="0" class="color" />
          </div>
        </div>
        <span :index="2" class="desc">{{$t('mortgage.theValueOfDifferentAssetsNeedToBeEqual')}}</span>
        <div :index="6" class="bd">
          <!-- 上部分 -->
          <input
            :index="2"
            v-model="modelVal1"
            class="text"
            type="text">
          <div :index="1" class="maxWrap">
            <span :index="0" class="max">Max </span>
          </div>
          <div class="group">
            <span :index="4" class="word">{{$t('mortgage.balance')}}:0 </span>
            <img
              :index="5"
              :src="`/coins/${data.coin.toLowerCase()}.png`"
              class="icon"
            />
          </div>
          <span :index="3" class="dot">{{data.coin}} </span>
        </div>
        <div :index="6" class="main">
          <!-- 下部分 -->
          <input
            :index="2"
            v-model="modelVal2"
            class="text"
            type="text">
          <div :index="1" class="maxWrap_1">
            <span :index="0" class="max_1">Max </span>
          </div>
          <div class="outer">
            <span :index="4" class="text_1">{{$t('mortgage.balance')}}:0 </span>
            <img
              :index="5"
              :src="`/coins/usdt.png`"
              class="icon_1"
            />
          </div>
          <span :index="3" class="usdt">USDT </span>
        </div>
        <div :index="1" class="ft" @click="actionConfrim"><span :index="0" class="tag">{{$t('mortgage.confirm')}}</span></div>
      </div>
    </div>

  </div>

</template>

<!-------------------------------------------- script -------------------------------------------->
<script>
export default {
  model: { // 支持双向数据绑定
    prop: 'value',
    event: 'change'
  },

  props: {
    value: { // 通过 v-model 传入的值
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      modelVal: false, // 组件的值
      modelVal1: 0, // 上部分输入
      modelVal2: 0 // 下部分输入
    }
  },

  /* 一.生命周期函数 */
  created () {
    // 初始化数据
    this.modelVal = this.value
  },

  /* 二.监控函数 */
  watch: {
    // 监控外部值变化
    value () {
      this.modelVal = this.value
    },
    // 监控内部值变化
    modelVal () {
      this.$emit('change', this.modelVal)
      if (!this.modelVal) {
        this.modelVal1 = 0
        this.modelVal2 = 0
      }
    }
  },
  methods: {
    // 确认交易
    actionConfrim () {
      this.$Message.warning(this.$t('header.comingSoon'))
    }
  }
}
</script>

<!-------------------------------------------- style -------------------------------------------->
<style scoped lang="scss">
.modal{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.3);
}
.mod {
  width: 623px;
  height: 453px;
}

.box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 623px;
  height: 453px;
  overflow: auto;
  background-color: #353553;
  border-radius: 16px;
}

.hd {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-top: 21px;
}

.title {
  margin-top: 16px;
  color: #c1c1dd;
  font-weight: 400;
  font-size: 26px;
  font-style: normal;
  line-height: 35px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.wrap {
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 48px;
  height: 48px;
}

.icon-fail {
  position: absolute;
  top: 14px;
  right: 13px;
  width: 21px;
  height: 20px;
  opacity: 1;
}

.color {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;
  overflow: auto;
  border-color: rgba(
    133.99795532226562,
    131.99798583984375,
    183.0010986328125,
    1
  );
  border-style: solid;
  border-width: 1px;
  border-radius: 24px;
}

.desc {
  position: relative;
  align-self: center;
  margin-top: 5px;
  color: #8583b7;
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: 35px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.bd {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  width: 452px;
  height: 88px;
  margin-top: 29px;
  overflow: auto;
  background-color: #514f7d;
  border-radius: 10px;
}

.text {
  position: relative;
  width: 180px;
  margin-right: 10px;
  margin-left: 31px;
  margin-left: 31px;
  color: #c1c1dd;
  font-weight: 400;
  font-size: 26px;
  font-family: "Impact";
  font-style: normal;
  line-height: 26px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
  background: transparent;
}

.maxWrap {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  height: 38px;
  margin-top: -4px;
  margin-right: 48px;
  padding-right: 14px;
  padding-left: 15px;
  overflow: auto;
  background-color: #8583b7;
  border-color: rgba(
    133.99795532226562,
    131.99798583984375,
    183.0010986328125,
    1
  );
  border-style: solid;
  border-width: 1px;
  border-radius: 18px;
  cursor: pointer;
  user-select:none;
}

.max {
  margin-top: 0;
  color: #c1c1dd;
  font-weight: 600;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.group {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: -7px;
}

.word {
  position: relative;
  color: #8583b7;
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: 28px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.icon {
  position: relative;
  width: 31px;
  height: 31px;
  margin-top: 10px;
  margin-left: 2px;
  border-radius: 50%;
  opacity: 1;
}

.dot {
  position: absolute;
  right: 38px;
  bottom: 0;
  color: #8583b7;
  font-weight: 400;
  font-size: 26px;
  font-family: "Impact";
  font-style: normal;
  line-height: 63px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.main {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  width: 452px;
  height: 88px;
  margin-top: 12px;
  overflow: auto;
  background-color: #514f7d;
  border-radius: 10px;
}

.maxWrap_1 {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  height: 39px;
  margin-right: 48px;
  padding-right: 14px;
  padding-left: 15px;
  overflow: auto;
  background-color: #8583b7;
  border-color: rgba(
    133.99795532226562,
    131.99798583984375,
    183.0010986328125,
    1
  );
  border-style: solid;
  border-width: 1px;
  border-radius: 18px;
  cursor: pointer;
  user-select:none;
}

.max_1 {
  margin-top: 1px;
  color: #c1c1dd;
  font-weight: 600;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.outer {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.text_1 {
  position: relative;
  color: #8583b7;
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: 28px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.icon_1 {
  position: relative;
  width: 30px;
  height: 30px;
  margin-top: 8px;
  margin-left: 1px;
  opacity: 1;
}

.usdt {
  position: absolute;
  right: 24px;
  bottom: 0;
  color: #8583b7;
  font-weight: 400;
  font-size: 26px;
  font-family: "Impact";
  font-style: normal;
  line-height: 63px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.ft {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
  box-sizing: border-box;
  width: 452px;
  height: 59px;
  margin-top: 12px;
  overflow: auto;
  text-align: center;
  background-color: #514f7d;
  border-radius: 10px;
  cursor: pointer;
  user-select:none;
}

.tag {
  margin-top: 2px;
  color: #c1c1dd;
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

</style>

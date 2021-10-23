<!------------------------------------------- template ------------------------------------------->
<template>
  <div class="mod">
    <div :index="2" class="box">
      <div class="bd">
        <img
          :index="0"
          :src="`/coins/${data.coin.toLowerCase()}.png`"
          class="icon-play"
        />
        <span :index="1" class="dotusdt">{{data.coin}}/USDT </span>
      </div>
      <div class="card">
        <div class="card-title">{{$t('mortgage.quotationRevenue')}}</div>
        <div class="card-body">
          <div class="card-body-content">
            <div class="card-body-content-coin">
              <span>{{data.coin}}</span>
              <span>0</span>
            </div>
            <div class="card-body-content-coin">
              <span>USDT</span>
              <span>0</span>
            </div>
          </div>
          <div class="card-body-btn">
            <div class="my-btn disabled">{{$t('mortgage.getIncome')}}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">{{$t('mortgage.usedPledgedAssets')}}</div>
        <div class="card-body">
          <div class="card-body-content">
            <div class="card-body-content-coin">
              <span>{{data.coin}}</span>
              <span>0</span>
            </div>
            <div class="card-body-content-coin">
              <span>USDT</span>
              <span>0</span>
            </div>
          </div>
          <div class="card-body-btn">
            <div class="my-btn" @click="$emit('on-pledge', data)">{{$t('mortgage.pledgedAssets')}}</div>
          </div>
        </div>
      </div>
    </div>
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
  width: 416px;
  height: 303px;
}

.box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 416px;
  height: 303px;
  overflow: auto;
  background-color: #353553;
  border-radius: 10px;
}

.bd {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 59px;
  margin-top: 22px;
  margin-left: 25px;
}

.icon-play {
  width: 40px;
  height: 40px;
  margin-top: 1px;
  margin-right: 15px;
  border-radius: 50%;
  opacity: 1;
}

.dotusdt {
  color: #8583b7;
  font-weight: 400;
  font-size: 28px;
  font-family: "Impact";
  font-style: normal;
  line-height: 28px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.card{
  margin-bottom: 20px;
  padding-left: 80px;
  &-title{
    color: #FFF;
    font-size: 20px;
  }
  &-body{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    line-height: 20px;
    &-content{
      width: 200px;
      color: #8684b7;
      &-coin{
        display: flex;
        & > span:nth-of-type(1) {
          display: block;
          flex: 2;
        }
        & > span:nth-of-type(2) {
          display: block;
          flex: 3;
        }
      }
    }
    &-btn{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100px;
      .my-btn{
        display: flex;
        align-items: center;
        min-height: 32px;
        padding: 5px 14px;
        border: 1px solid #8684b7;
        border-radius: 4px;
        cursor: pointer;
        &.disabled{
          color: #7a78aa;
          background: #52507e;
          border-color: #52507e;
        }
      }
    }
  }
}
</style>

<template>
  <div>
    <Header active-tab="mortgage"></Header>
    <div class="body">
      <div class="body-asstes">
        <MortgageCard
          :key="index"
          :data="item"
          v-for="(item, index) in dataList"
          class="body-asstes-item"
          @on-pledge="actionPledge"
        ></MortgageCard>
      </div>
    </div>

    <mortgageCardModal :data="currentCoin" v-model="isShowModal"></mortgageCardModal>
  </div>
  </div>
</template>

<!-------------------------------------------- script -------------------------------------------->
<script>
import Header from './components/header'
import MortgageCard from './components/mortgageCard'
import mortgageCardModal from './components/mortgageCardModal'

export default {
  name: '',
  components: {
    Header,
    MortgageCard,
    mortgageCardModal
  },

  data () {
    return {
      isShowDetail: true,
      isLimit: true,
      isShowModal: false, // 是否展示质押资产弹窗
      currentCoin: {},
      dataList: [
        {
          coin: 'BTC'
        },
        {
          coin: 'ETH'
        },
        {
          coin: 'DOT'
        }
      ]
    }
  },

  /* 一.生命周期函数 */
  created () {
  },

  /* 二.监控函数 */
  watch: {
  },

  computed: {
    getInputVal () {
      return this.$xss(this.inputVal)
    }
  },

  /* 三.内部功能函数 */
  methods: {
    // 质押操作
    actionPledge (data) {
      this.currentCoin = data
      this.isShowModal = true
    },
    // 切换语言
    actionChangeLocale (locale) {
      localStorage.setItem('hazel_locale', locale)
      this.$i18n.locale = locale
    },
    async next () {
      const res = await this.$api.getConfig()
      console.log(res)
    }
  }
}
</script>

<!-------------------------------------------- style -------------------------------------------->
<style scoped lang="scss">
.body{
  display: flex;
  width: 1280px;
  margin: 0 auto;

  &-asstes{
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin-left: -16px;
    &-item{
      margin-bottom: 16px;
      margin-left: 16px;
    }
  }
}
</style>

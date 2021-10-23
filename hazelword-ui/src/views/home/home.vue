<template>
  <div>
    <Header active-tab="home"></Header>
    <div class="body">
      <div class="body-top" style="display: flex;justify-content: space-between;">
        <div class="body-chart">
          <Chart
            :assets-data="assetsData"
          ></Chart>
        </div>
        <div class="body-top-r">
          <InfoCard2
            :ostyle="{ backgroundImage: '-webkit-linear-gradient(left,rgba(207, 77, 254, 1) 0%,rgba(97, 90, 245, 1) 100%)' }"
            :content="assetsData.tradingNum"
            :bg="1"
            :title="$t('home.provideTitle')"
            :desc="$t('home.provideDesc')"
          >
          </InfoCard2>
          <InfoCard2
            :ostyle="{ backgroundImage: '-webkit-linear-gradient(left,rgba(243, 111, 167, 1) 0%,rgba(253, 138, 111, 1) 100%)' }"
            :content="assetsData.pledgeAll ? `$${formatCurrency(assetsData.pledgeAll)}` : ''"
            :bg="2"
            :title="$t('home.totalValueLocked')"
          >
          </InfoCard2>
        </div>
      </div>
      <div style="display: flex;justify-content: space-between;padding-bottom: 40px;">
        <InfoCard
          :data="item"
          :key="index"
          :color-index="index"
          v-for="(item, index) in getInfoCardData"
        ></InfoCard>
      </div>
    </div>
  </div>
</template>

<!-------------------------------------------- script -------------------------------------------->
<script>
import Header from './components/header'
import Chart from './components/chart'
import InfoCard from './components/infoCard'
import InfoCard2 from './components/infoCard2'
export default {
  name: '',
  components: {
    Chart,
    Header,
    InfoCard,
    InfoCard2
  },

  data () {
    return {
      isShowDetail: true,
      isLimit: true,
      assetsData: {}, // 数据
      timer: null // 价格查询定时器
    }
  },

  /* 一.生命周期函数 */
  created () {
    this.queryAssetsData()
    this.timer = setInterval(() => {
      this.queryAssetsData()
    }, 15 * 1000)
  },

  beforeDestroy () {
    clearInterval(this.timer)
  },

  /* 二.监控函数 */
  watch: {
  },

  computed: {
    getInfoCardData () {
      if (this.assetsData.quotedDtos) {
        return this.assetsData.quotedDtos.slice(0, 4)
      } else {
        return []
      }
    },
    getInputVal () {
      return this.$xss(this.inputVal)
    }
  },

  /* 三.内部功能函数 */
  methods: {
    // 切换语言
    actionChangeLocale (locale) {
      localStorage.setItem('hazel_locale', locale)
      this.$i18n.locale = locale
    },
    async next () {
      const res = await this.$api.getConfig()
      console.log(res)
    },
    formatCurrency (num) {
      num = num.toString().replace(/\$|,/g, '')
      if (isNaN(num)) { num = '0' }
      // eslint-disable-next-line
      var sign = (num == (num = Math.abs(num)))
      num = Math.floor(num * 100 + 0.50000000001)
      var cents = num % 100
      num = Math.floor(num / 100).toString()
      if (cents < 10) { cents = '0' + cents }
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
      }
      return (((sign) ? '' : '-') + num + '.' + cents)
    },
    queryAssetsData () {
      this.$api.queryAssetsData().then(res => {
        if (res.data.code === 0) {
          this.assetsData = res.data.data
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<!-------------------------------------------- style -------------------------------------------->
<style scoped lang="scss">
.body{
  width: 1280px;
  margin: 0 auto;

  &-top{
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
    &-r{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>

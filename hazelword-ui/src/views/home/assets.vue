<template>
  <div>
    <Header active-tab="assets"></Header>
    <div class="body">
      <div class="body-asstes">
        <InfoCard
          :key="index"
          :data="item"
          :color-index="index"
          v-for="(item, index) in getAssets"
          class="body-asstes-item"
        ></InfoCard>
      </div>
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
    getInputVal () {
      return this.$xss(this.inputVal)
    },
    getAssets () {
      if (this.assetsData.quotedDtos) {
        return this.assetsData.quotedDtos
      } else {
        return []
      }
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

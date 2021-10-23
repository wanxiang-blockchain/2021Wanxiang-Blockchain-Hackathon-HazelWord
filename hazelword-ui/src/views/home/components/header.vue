<!------------------------------------------- template ------------------------------------------->
<template>
  <div class="header mod">
    <div :index="1" class="box">
      <div style="280px">
        <img
          :index="0"
          class="logo"
          src="@/assets/images/icons/logo.png"
        />
      </div>
      <div class="primary">
        <span
          :index="3"
          :class="{ active: activeTab === 'home' }"
          class="txt"
          @click="actionJumpTo('home')">{{$t('header.home')}}</span>

        <!-- 资产数据 -->
        <span
          :index="1"
          :class="{ active: activeTab === 'assets' }"
          class="word"
          @click="actionJumpTo('assets')">{{$t('header.assetData')}}</span>

        <!-- 抵押报价 -->
        <span
          :index="0"
          :class="{ active: activeTab === 'mortgage' }"
          style="margin-right: 82px "
          class="text"
          @click="actionJumpTo('mortgage')">{{$t('header.pledge')}}</span>

        <!-- 事件数据 -->
        <span
          :index="0"
          :class="{ active: activeTab === 'eventData' }"
          style="margin-right: 82px "
          class="text"
          @click="actionJumpTo('eventData')">{{$t('header.eventData')}}</span>

      </div>
      <div class="side">
        <div :index="1" v-if="walletAddr" class="tagWrap">
          <span :index="0" class="tag">{{walletAddr.address}}</span>
        </div>
        <div
          :index="1"
          v-else
          class="tagWrap"
          @click="actionConnectWallet">
          <span :index="0" class="tag">connect to a wallet</span>
        </div>

        <div :index="1" class="block">
          <Dropdown placement="bottom-end" @on-click="actionChangeLocale">
            <img
              :index="0"
              class="icon"
              src="@/assets/images/icons/language.png"
            />
            <DropdownMenu slot="list">
              <DropdownItem name="en_US">English</DropdownItem>
              <DropdownItem name="zh_CN">简体中文</DropdownItem>
              <DropdownItem name="ja_JP">Japanese</DropdownItem>
              <DropdownItem name="de_DE">German</DropdownItem>
              <DropdownItem name="vi_VN">Tiếng Việt</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<!-------------------------------------------- script -------------------------------------------->
<script>
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'

export default {
  name: '',
  components: {
  },
  props: {
    activeTab: String
  },

  data () {
    return {
      walletAddr: '' // 用户输入的钱包地址
    }
  },

  /* 一.生命周期函数 */
  created () {
    this.autoConnectWallet()
  },
  mounted () {
    window.$hazelloading.hide()
  },

  /* 二.监控函数 */
  watch: {
  },

  computed: {
  },

  /* 三.内部功能函数 */
  methods: {
    /* ----------------------事件调用函数------------------------ */
    // 切换语言
    actionChangeLocale (locale) {
      localStorage.setItem('hazel_locale', locale)
      this.$i18n.locale = locale
    },
    // 事件调用函数注释
    actionJumpTo (name) {
      if (['eventData'].includes(name)) {
        this.$Message.warning(this.$t('header.comingSoon'))
        return
      }
      this.$router.push({ name })
    },
    // 连接钱包，创建初始化操作
    async actionConnectWallet () {
      const extensions = await web3Enable('my cool dapp')

      if (extensions.length === 0) {
        window.open('https://polkadot.js.org/extension/')
        // no extension installed, or the user did not accept the authorization
        // in this case we should inform the use and give a link to the extension
        return
      }

      this.autoConnectWallet()

      // window.open('https://polkadot.js.org/apps/')
      // window.open('https://polkadot.js.org/extension/')
      // this.$Modal.confirm({
      //   render: (h) => {
      //     return h('Input', {
      //       props: {
      //         value: this.walletAddr,
      //         autofocus: true,
      //         placeholder: '请输入钱包地址后继续'
      //       },
      //       on: {
      //         input: (val) => {
      //           this.walletAddr = val
      //         }
      //       }
      //     })
      //   },
      //   onOk: () => {
      //     this.ajaxConfirmWallet()
      //   }
      // })
    },
    /* ----------------------内部功能函数------------------------ */
    // 自动连接钱包
    async autoConnectWallet () {
      const allAccounts = await web3Accounts()

      if (allAccounts.length > 0) {
        this.walletAddr = allAccounts[0]
      }
    },

    /* ----------------------服务请求函数------------------------ */
    // 服务请求函数注释
    async ajaxConfirmWallet () {
      const api = this.$polkaApi
      const [now, { nonce, data: balances }] = await Promise.all([
        api.query.timestamp.now(),
        api.query.system.account(this.walletAddr)
      ])

      this.$Modal.info({
        content: `[查询账户信息] ${now}: balance of ${balances.free} and a nonce of ${nonce}`
      })
    }
  }
}
</script>

<!-------------------------------------------- style -------------------------------------------->
<style scoped lang="scss">
.mod {
  width: 100%;
  height: 72px;
  background-color: #3b3959;
}

.box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 1280px;
  height: 72px;
  margin: 0 auto;
  background-color: #3b3959;
}

.logo {
  width: 130px;
  height: 40px;
  opacity: 1;
}

.primary {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 63px;
  margin-top: -1px;
}

.txt {
  position: relative;
  margin-right: 82px;
  color: #8584b7;
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  &.active{
    color: #c1c1dd;
  }
}

.icon-play {
  position: absolute;
  top: 47px;
  left: -2px;
  width: 35px;
  height: 6px;
  opacity: 1;
}

.word {
  margin-top: -1px;
  margin-right: 82px;
  color: #8584b7;
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  &.active{
    color: #c1c1dd;
  }
}

.text {
  margin-top: -1px;
  color: #8584b7;
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  &.active{
    color: #c1c1dd;
  }
}

.side {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 280px;
  margin-top: -1px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tagWrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  max-width: 220px;
  height: 39px;
  margin-right: 17px;
  padding-right: 18px;
  padding-left: 20px;
  background-color: #535282;
  border-radius: 18px;
  cursor: pointer;
}

.tag {
  max-width: 100%;
  margin-top: 1px;
  overflow: hidden;
  color: #b7b6dc;
  font-weight: 600;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
}

.block {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 39px;
  height: 39px;
  overflow: auto;
  background-color: #535282;
  border-radius: 18px;
}

.icon {
  width: 20px;
  height: 20px;
  margin-top: 1px;
  opacity: 1;
}

.header{
}

</style>

<!------------------------------------------- template ------------------------------------------->
<template>
  <div class="mod">
    <div :index="11" class="box">
      <span :index="3" class="info">{{getTitle}}</span>
      <div class="bd">
        <span :index="0" class="usdc">
          <!-- USDC  -->
        </span>
        <span :index="2" class="usdcNext">
          <!-- 168,888,8  -->
        </span>
      </div>
      <span :index="1" class="word">
        <!-- +168,888,8(+2.5%)  -->
      </span>

      <div id="main" style="width:100%;height: 290;">

      </div>
    </div>
  </div>
</template>

<!-------------------------------------------- script -------------------------------------------->
<script>
import * as echarts from 'echarts'
export default {
  name: '',
  components: {
  },

  props: {
    assetsData: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      kLineData: [],
      timer: null // 定时器实例
    }
  },

  /* 一.生命周期函数 */
  created () {
    this.queryKLine()
    this.timer = setInterval(() => {
      this.queryKLine()
    }, 15 * 1000)
  },

  mounted () {

  },

  beforeDestroy () {
    clearInterval(this.timer)
  },

  /* 二.监控函数 */
  watch: {
  },

  computed: {
    getTitle () {
      const totalQuotedNum = this.formatCurrency(this.assetsData.totalQuotedNum)
      return totalQuotedNum ? this.$t('home.chartTitle', { reportCount: totalQuotedNum }) : ''
    }
  },

  /* 三.内部功能函数 */
  methods: {
    /* ----------------------事件调用函数------------------------ */
    // 事件调用函数注释
    actionXxx () {

    },

    /* ----------------------内部功能函数------------------------ */
    formatCurrency (num) {
      if (!num) return num
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
      // return (((sign) ? '' : '-') + num + '.' + cents)
      return (((sign) ? '' : '-') + num)
    },
    // 内部功能函数注释
    renderChart () {
      var myChart = echarts.init(document.getElementById('main'))
      var calcNum = 1
      var minNum // 最小展示的金额
      const data = this.kLineData.filter((item, index) => {
        if (!minNum || minNum > item.price) {
          minNum = item.price
        }
        if (index % calcNum === 0) {
          return true
        }
      })
      // 绘制图表
      myChart.setOption({
        grid: {
          left: '52px',
          right: '52px',
          top: '10px'
        },
        tooltip: {
          trigger: 'axis',

          formatter: function (params) {
            let html = ''
            params.forEach(v => {
              html += `
              <div>
                <div>${data[v.dataIndex].date}</div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="display: inline-block;width: 8px;height: 8px; border-radius: 50%; background: #a57cff;"></div>
                  </div>
                  <div><strong>$</strong><strong>${v.value}</strong></div>
                </div>
              </div>
              `
            })
            return html
          }
        },
        xAxis: [{
          // type: 'category',
          zlevel: 1,
          offset: -5,
          // data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
          data: data.map(item => item.date.split(' ')[1]),
          axisLine: {
            show: false,

            lineStyle: {
              color: '#ddd'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: parseInt(30 / calcNum),
            textStyle: {
              color: '#b0b0d5'
            },
            margin: 15
          },
          axisPointer: {
            label: {
              color: '#FFF'
            },
            lineStyle: {
              color: '#b7b6dc',
              type: 'solid',
              width: 2
            }
          }
          // boundaryGap: false
        }],
        yAxis: [{
          min: minNum - 500,
          show: false,
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#c56790'
            }
          },
          splitLine: {
            show: false
          }
        }],
        series: [{
          name: '$',
          type: 'line',
          // data: [13, 10, 3, 12, 15, 30, 7],
          data: data.map(item => item.price),
          symbolSize: 6,
          symbol: 'circle',
          smooth: true,
          lineStyle: {
            color: '#a57cff'
          },
          showSymbol: false,
          itemStyle: {
            show: false,
            color: '78afff',
            borderWidth: 2,
            borderColor: '#FFF',
            normal: {
              color: '#78afff',
              borderWidth: 2,
              borderColor: '#FFF'
            }
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#46527d'
            },
            {
              offset: 1,
              color: '#363554'
            }
            ])
          },
          emphasis: {
            itemStyle: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                  offset: 0,
                  color: '#fe9a8b'
                },
                {
                  offset: 0.4,
                  color: '#fe9a8b'
                },
                {
                  offset: 0.5,
                  color: '#fff'
                }, {
                  offset: 0.7,
                  color: '#fff'
                }, {
                  offset: 0.8,
                  color: '#fff'
                }, {
                  offset: 1,
                  color: '#fff'
                }
                ]
              },
              borderColor: '#fe9a8b',
              borderWidth: 2
            }
          }
        }
        ]
      })
    },

    /* ----------------------服务请求函数------------------------ */
    // 服务请求函数注释
    ajaxXxx () {

    },
    queryKLine () {
      this.$api.queryKLine().then(res => {
        if (res.data.code === 0) {
          this.kLineData = res.data.data.reverse()

          this.$nextTick(() => {
            this.renderChart()
          })
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
.mod {
  width: 877px;
  // width: 1257px;
  height: 483px;
}

.box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 877px;
  // width: 1257px;
  height: 483px;
  overflow: auto;
  background-color: #353553;
  border-radius: 10px;
}

.txt {
  position: absolute;
  bottom: 18px;
  left: 32px;
  color: #b7b5db;
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.info {
  position: relative;
  max-width: 1153px;
  height: 75px;
  margin-top: 18px;
  margin-left: 52px;
  overflow: hidden;
  color: #8584b7;
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

.bd {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 63px;
  margin-top: 31px;
  margin-left: 53px;
}

.usdc {
  margin-top: -4px;
  margin-right: 8px;
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

.usdcNext {
  margin-top: 2px;
  color: #ededed;
  font-weight: 400;
  font-size: 30px;
  font-style: normal;
  line-height: 30px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.word {
  position: absolute;
  top: 93px;
  left: 52px;
  color: #26aa35;
  font-weight: 400;
  font-size: 20px;
  font-style: normal;
  line-height: 63px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.layerWrap {
  position: absolute;
  top: 169px;
  left: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 1141px;
  height: 178px;
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 1141px;
  height: 178px;
  opacity: 1;
}

.text {
  position: absolute;
  top: 46px;
  left: 419px;
  color: #b7b5db;
  font-weight: 600;
  font-size: 16px;
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
  align-self: flex-end;
  margin-top: 262px;
  margin-right: 51px;
}

.txt_1 {
  margin-right: 162px;
  color: #b7b5db;
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.word_1 {
  margin-right: 162px;
  color: #b7b5db;
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.text_1 {
  margin-right: 162px;
  color: #b7b5db;
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.txt_2 {
  margin-right: 297px;
  color: #b7b5db;
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.word_2 {
  color: #b7b5db;
  font-weight: 400;
  font-size: 16px;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  text-align: left;
  text-decoration: none;
}

.bgWrap {
  position: absolute;
  bottom: 6px;
  left: 49px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 1142px;
  height: 315px;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 1142px;
  height: 315px;
  opacity: 1;
}

.color {
  position: relative;
  width: 5px;
  height: 273px;
  margin-top: 8px;
  margin-left: 401px;
  overflow: auto;
  background-color: #b7b5db;
}

.colorDiv {
  position: absolute;
  top: 157px;
  left: 392px;
  width: 23px;
  height: 23px;
  overflow: auto;
  background-color: #77afff;
  border-color: rgba(255, 255, 255, 1);
  border-style: solid;
  border-width: 6px;
  border-radius: 11px;
}

</style>

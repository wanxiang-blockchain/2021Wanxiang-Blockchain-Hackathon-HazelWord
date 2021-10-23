// dateList: [], // 初始化数据
// 插件相关
const cutNum = 1 // 日期前移天数
const weekDays = ['一', '二', '三', '四', '五', '六', '日']
// const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
const lastDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// const currentDay = ''
const monthNum = 3 // 生成几个月的数据

// 生成日期数据
function generatorRestholidays (restholidays) {
  // 日期列表
  let dateList = _createMonthList({
    startDay: restholidays.START_DATE_D,
    endDay: restholidays.END_DATE_D
  })

  var DATE_D = {}
  // 拥挤时
  restholidays.MANY_DATE_D && restholidays.MANY_DATE_D.forEach(item => {
    DATE_D[item] = 'many'
  })
  // 不可约时
  restholidays.UNAVAILABLE_DATE_D && restholidays.UNAVAILABLE_DATE_D.forEach(item => {
    DATE_D[item] = 'unavailable'
  })
  // 约满时
  restholidays.FULL_DATE_D && restholidays.FULL_DATE_D.forEach(item => {
    DATE_D[item] = 'full'
  })

  // 修改今天的状态
  DATE_D[_getToday()] = 'today'

  dateList = dateList.map(month => {
    month.dayList = month.dayList.map(day => {
      day.status = DATE_D[day.reserveDate] || day.status
      if (DATE_D[day.reserveDate] === 'today') {
        day.showDate = '今天'
      }
      return day
    })
    return month
  })

  return dateList
};

// 获取当天信息
function _getToday () {
  let currentYear = new Date().getFullYear()
  let currentMonth = new Date().getMonth() + 1
  let currentDate = new Date().getDate()
  return `${currentYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-${currentDate < 10 ? '0' + currentDate : currentDate}`
};

// 创建月份列表
function _createMonthList ({
  startDay = '',
  endDay = ''
}) {
  var d = new Date()
  var renderDate = []
  var year = d.getFullYear()
  for (var i = 0; i < monthNum; i++) {
    var month = d.getMonth() + 1

    // 12月取余12为0，所以当month + i 为12的倍数，默认赋值12
    renderDate.push(year + '-' + ((month + i) % 12 !== 0 ? (month + i) % 12 : 12))
    // 如果为12月，年份加一
    if ((month + i) % 12 === 0) {
      year++
    }
  }

  renderDate = renderDate.map(item => {
    var _date = item.split('-')

    return {
      year: _date[0],
      month: _date[1],
      weekDays: weekDays,
      dayList: _createMonth(_date[0], _date[1], startDay, endDay)
    }
  })

  return renderDate
};
// 判断是否为闰年
function _isBissextile (year) {
  var isBis = false
  if (year % 4 === 0 && ((year % 100 !== 0) || (year % 400 === 0))) {
    isBis = true
  }
  return isBis
};
// 计算某月的总天数，闰年二月为29天
// function _getMonthCount (year, month) {
//   var Mcount = lastDays[month - 1]
//   if ((month === 2) && isBissextile(year)) {
//     Mcount++
//   }
//   return Mcount
// };

// 计算今天是星期几
function _thisWeekDay (year, month, date) {
  var d = new Date(year, month - 1, date)
  return d.getDay()
};

// 输出某月的数组
function _createMonth (year, month, startDay, endDay) {
  var cutNum = 1 // 日期前移天数
  var index = _thisWeekDay(year, month, 1) // 获取今天是星期几
  var arr = [] // 输出最终的日期数组

  // 如果是闰年，2月29天
  lastDays[1] = _isBissextile(year) ? 29 : 28

  // 如果条件成立， 说明当月第一天不是周日
  if ((index - cutNum) >= 0) {
    index = (index - cutNum) % 7
  } else {
    index = (index - cutNum) % 7 + 7
  }
  var count = index + lastDays[month - 1] // 遍历次数为当月天数＋上一跃剩余天数
  // 上一个月的天数
  // var lastDay = this.lastDay[month - 2 < 0 ? this.lastDay.length - month - 2 : month - 2]
  // var lastMonth = parseInt(month) === 1 ? 12 : parseInt(month) - 1
  // var lastYear = parseInt(month) === 1 ? year - 1 : year
  for (var i = 0; i < count; i++) {
    if (i < index) {
      // arr.unshift(lastDay - i);
      // arr.unshift(this._createDateMap(lastYear,lastMonth,lastDay - i,startDay, endDay));
      arr.unshift({ status: 'empty' })
    } else {
      // arr.push(i - index + 1)
      arr.push(_createDateMap(year, month, i - index + 1, startDay, endDay))
    }
  }

  var len = arr.length % 7 > 0 && 7 - (arr.length % 7)
  // var nextMonth = parseInt(month) === 12 ? 1 : parseInt(month) + 1
  // var nextYear = parseInt(month) === 12 ? year + 1 : year
  for (i = 1; i <= len; i++) {
    // arr.push(this._createDateMap(year,nextMonth ,i,startDay, endDay))
    arr.push({ status: 'empty' })
  }
  return arr
};

// 生成日期对象
function _createDateMap (year, month, dateNum, startDay, endDay) {
  var reserveDate = `${year}-${month < 10 ? '0' + month : month}-${dateNum < 10 ? '0' + dateNum : dateNum}`
  var reserveTime = new Date(reserveDate).getTime()
  var startDayTime = new Date(startDay).getTime()
  var endDayTime = new Date(endDay).getTime()

  var status = (reserveTime < startDayTime || reserveTime > endDayTime) ? 'unavailable' : 'open'
  return {
    reserveDate: reserveDate,
    showDate: dateNum,
    // status: ''
    status: status
  }
};

export default generatorRestholidays

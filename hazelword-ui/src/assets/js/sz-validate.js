export default {
  /**
   * 校验手机号
   */
  checkPhone(phone) {
    if (phone == '11111111111') return false
    return /^1\d{10}$/.test(phone)
  },
  /**
   * 校验验证码
   */
  checkVerifyCode(verifyCode) {
    return /^\d{6}$/.test(verifyCode)
  },

  /**
   * 校验生日，格式为YYYY-MM-DD
   */
  checkBirthday(birthday) {
    if (birthday.length != 10) return false
    return !!/(\d){4}-(\d){2}-(\d){2}/.test(birthday)
  },
  /**
   * 校验名称
   */
  checkName(name) {
    let flag = true

    // [\u4e00-\u9fa5]为汉字的范围
    if (!name.match(/^[\u4e00-\u9fa5]+$/) || name.length < 2) {
      flag = false
    }
    const errorName = ['男士', '女士', '先生', '小姐', '妈妈', '爸爸']
    errorName.forEach(item => {
      if (name.match(item)) {
        flag = false
      }
    })

    return flag
  },
  /**
   * 检测身份证号
   * @param { String } num 身份证号字符串
   * @returns true or false
   */
  checkIdCard(num) {
    num += ''
    num = num.toUpperCase() // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
      // alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
      // alert('身份证号长度不正确或不符合规定！');
      return false
    }
    // 验证前2位，城市符合
    var aCity = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }
    if (aCity[parseInt(num.substr(0, 2))] == null) {
      // alert('身份证号不正确或不符合规定！');
      return false
    }

    // 下面分别分析出生日期和校验位
    var len, re
    len = num.length
    if (len == 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
      var arrSplit = num.match(re) // 检查生日日期是否正确
      var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      var bGoodDay
      bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]))
      if (!bGoodDay) {
        // alert('身份证号的出生日期不对！');
        return false
      } else { // 将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
        var nTemp = 0,
          i
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        num += arrCh[nTemp % 11]
        return true
      }
    }
    if (len == 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
      var arrSplit = num.match(re) // 检查生日日期是否正确
      var dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      var bGoodDay
      bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]))
      if (!bGoodDay) {
        // alert(dtmBirth.getYear());
        // alert(arrSplit[2]);
        // alert('身份证号的出生日期不对！');
        return false
      } else { // 检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var valnum
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
        var nTemp = 0,
          i
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        valnum = arrCh[nTemp % 11]
        if (valnum != num.substr(17, 1)) {
          return false
        }
        return true
      }
    }
    return false
  },
  /**
   * 通过身份证号检测性别
   */
  checkSex(idCard) {
    var len = idCard.length
    if (len === 15) {
      return parseInt(idCard[len - 1]) % 2 == 1 ? 'm' : 'w'
    }
    if (len === 18) {
      return parseInt(idCard.substr(16, 1)) % 2 == 1 ? 'm' : 'w'
    }
  },
  /**
   * 通过身份证号检测年龄，如果小于0、即身份证号不正确
   */
  checkAge(idCard) {
    idCard += ''
    var myDate = new Date()
    var month = myDate.getMonth() + 1
    var day = myDate.getDate()
    var age = 0
    var len = idCard.length
    // 一代身份证
    if (len === 15) {
      age = myDate.getFullYear() - ('19' + idCard.substring(6, 8)) - 1
      if (idCard.substring(8, 10) < month || idCard.substring(8, 10) == month && idCard.substring(10, 12) <= day) {
        age++
      }
    }
    // 二代身份证
    if (len === 18) {
      age = myDate.getFullYear() - idCard.substring(6, 10) - 1
      if (idCard.substring(10, 12) < month || idCard.substring(10, 12) == month && idCard.substring(12, 14) <= day) {
        age++
      }
    }
    return age
  },

  // 校验银行卡号码
  checkBankCardNo(num) {
    const len = num.length
    if (len > 11 && len < 20) {
      return true
    } else {
      return false
    }
  },
  // 校验银行卡号码
  checkBankName(name) {
    const len = name.length
    if (len > 3 && len < 31) {
      return true
    } else {
      return false
    }
  }
}
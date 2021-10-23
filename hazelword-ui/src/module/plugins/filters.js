let GlobalPlugin = {}

GlobalPlugin.install = Vue => {
  Vue.filter('oldImg', function (val) {
    return process.env.VUE_APP_IMG_URL + val
  })

  Vue.filter('img', function (val) {
    return process.env.VUE_APP_STATIC_URL + val
  })

  Vue.filter('asgard', function (val) {
    return process.env.VUE_APP_ASGARD_URL + val
  })

  Vue.filter('att', function (val) {
    return process.env.VUE_APP_ATT_URL + val
  })
}

export default GlobalPlugin

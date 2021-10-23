/**
 * Created by wangqiao on 2018/3/21.
 */
(function (doc, win) {
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let designSize = 450
  let recalc = function () {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) return
    if (clientWidth >= designSize) {
      docEl.style.fontSize = '50px'
    } else {
      docEl.style.fontSize = 60 * (clientWidth / designSize) + 'px'
    }
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)

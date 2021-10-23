// queue的元素类型应该是 funcion,aruguments,this，length 为3
function doJobs (queue) {
  if (Object.prototype.toString.call(queue) !== '[object Array]') {
    throw new Error(queue + 'is not a array')
  }
  if (queue.length === 0) {
    return
  }
  console.log(queue[0])
  while (queue.length) {
    let content = queue.shift()
    if (typeof content[0] !== 'function') {
      throw new Error(`${content}不是函数`)
    }
    content[0].apply(content[2], content[1])
  }
}

let queue = []
setInterval(function () {
  doJobs(queue)
}, 1000)

export { queue }

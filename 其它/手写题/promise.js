// promise/A+规范
// 1、要求有以下三种状态，
// 2、
// 3、
const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

class Promise{
  // executor 执行器函数
  constructor(executor){
    // 初始状态
    this.state = STATUS.PENDING
    // 成功返回的值
    this.value = undefined
    // 失败返回的原因
    this.reason = undefined

    // 成功时调用的函数集合
    this.onResolvedList = []
    // 失败时调用的函数集合
    this.onRejectedList = []


    let resolve = (value) => {
      console.log('调用了resolve')
      if (this.state === STATUS.PENDING) {
        console.log('resolve状态改变')
        this.state = STATUS.FULFILLED
        this.value = value

        this.onResolvedList.forEach( fn => fn())
      }
    }
    let reject = reason => {
      console.log('调用了reject')
      if (this.state === STATUS.PENDING) {
        console.log('reject状态改变')
        this.state = STATUS.REJECTED
        this.reason = reason

        this.onRejectedList.forEach( fn => fn())
      }
    }

    try {
      // 立即执行
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected){
    console.log('当前状态为：'+this.state)
    if (this.state === STATUS.FULFILLED) {
      typeof onFulfilled === 'function' && onFulfilled(this.value)
    }
    if (this.state === STATUS.REJECTED) {
      typeof onRejected === 'function' && onRejected(this.reason)
    }

    // 处理异步调用情况
    if (this.state === STATUS.PENDING) {
      typeof onFulfilled === 'function' && this.onResolvedList.push( () => onFulfilled(this.value))
      typeof onRejected === 'function' && this.onRejectedList.push( () => onRejected(this.reason))
    }
  }
}


var myP = new Promise(function(resolve, reject){
  console.log('执行')
  setTimeout(function(){
      reject(3)
  }, 1000)
});

myP.then(function(res){
  console.log(res)
},function(err){
  console.log(err)
});

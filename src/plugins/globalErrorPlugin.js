function errorHandler (error, vm, info) {
  console.error(error)
  console.error(`錯誤分析: ${info}`)
}

const globalErrorPlugin = {
  install: (Vue, options) => {
    Vue.config.errorHandler = errorHandler
    Vue.config.warnHandler = function (msg, vm, trace) {
      console.log(msg, vm, trace)
    }

    window.onerror = function (message, source, line, column, error) {
      errorHandler(message, null, '全局錯誤')
      console.log('全局捕获错误', message, source, line, column, error)
    }

    window.addEventListener('unhandledrejection', (event) => {
      errorHandler(event, null, '全局 Promise 錯誤 檢查 api 請求是否有錯誤')
    })
  }
}

export default globalErrorPlugin

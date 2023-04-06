import exampleDirective from './exampleDirective'

// 共用 directive 統一在這裡註冊
const globalDirectives = {}
const install = function (Vue) {
  Vue.directive('example', exampleDirective)
}

globalDirectives.install = install

export default globalDirectives

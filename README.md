#### 項目描述
電影院管理員後台
- 上線網址 https://cinema-admin-hdmv.onrender.com

#### 技術堆疊
- vue composition api(寫法風格)
- vuex(狀態管理)
- vue-router(前端路由)
- vueUse(hook工具套件) https://vueuse.org/
- dayjs(時間套件) https://day.js.org/
- loadash(資料處理套件) https://lodash.com/
- vee-validate(驗證套件) https://vee-validate.logaretm.com/v4/
- element-plus(ui框架) https://element-plus.org/zh-CN/
- tailwindcss(css框架) https://tailwindcss.com/
- vitest(測試工具) https://vitest.dev/
- cicd(github action && render.com)
- 專案相關工具(husky && eslint && stylelint)

#### 安裝指南
- 終端機輸入 node -v 確認版本為(v16.15.1)
- 終端機輸入 npm ci
- 終端機輸入 npm run dev(使用 .env.development 的環境變數) 或是  npm run production(使用 .env.production 的環境變數) 
- 看到終端機  VITE v4.2.1  ready in 158 ms 啟動成功

#### 項目結構 src
```
- api(統一管理 api ) 
- assets(資源管理 scss 檔案等等)
- components(組件)
- directives(自定義指令)
- hooks(自定義hook)
- plugins(自定義套件)
- router(路由配置)
- stores(vuex配置)
- test(測試檔案)
- utils(共用工具)
- view(頁面)
```

#### 教學文件
- api 定義方式: https://medium.com/i-am-mike/%E4%BD%BF%E7%94%A8axios%E6%99%82%E4%BD%A0%E7%9A%84api%E9%83%BD%E6%80%8E%E9%BA%BC%E7%AE%A1%E7%90%86-557d88365619
- cd https://render.com/docs/deploy-vue-js
- ci https://ithelp.ithome.com.tw/articles/10262377
- husky https://ithelp.ithome.com.tw/articles/10278411

#### GIT FLOW
![gitflow](https://user-images.githubusercontent.com/97425372/230756961-5a15e31a-3910-4503-9e92-ff4ad32264b8.png)

#### 注意事項
- 存檔會自動 format 格式

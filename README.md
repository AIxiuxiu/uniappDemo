
## 安装使用

- 安装依赖

```bash
yarn install
```

- 运行

```bash
# 其他端请查看 package.json script
yarn dev:h5
```

- 打包

```bash
# 其他端请查看 package.json script
yarn build:h5
```


## 特性

- **最新技术栈**：使用 Vue3/Vite4/pinia ,TypeScript 等前端前沿技术开发;
- **[iconify](https://github.com/iconify/iconify)**图标
- **Eslint/Prettier**: 规范代码格式,统一编码;
- **路由拦截**: 基于uni.addInterceptor进行路由拦截;
- **请求拦截**: 核心使用 [luch-request](https://ext.dcloud.net.cn/plugin?id=392),支持请求和响应拦截等;

## 目录结构

```shell
.
├─ src
│   ├─components # 组件目录
│   ├─enums # 枚举/常量
│   ├─pages # 页面
│   │   ├─ index
│   │   │    └─index.vue
│   │   └─...
│   ├─state # 状态管理模式(pinia)
│   │   ├─ modules # 数据模块  
│   │   │    ├─auth.ts
│   │   │    └─...
│   │   │
│   │   └─ index.ts
│   │ 
│   ├─static # 静态公共文件
│   │   ├─ images # 图片  
│   │   │    ├─avatar.png
│   │   │    └─...
│   │   └─ ...
│   │   
│   ├─types # 类型文件
│   │
│   └─utils # 工具类
│       ├─ cache # 缓存相关目录
│       ├─ http  # request相关目录
│       ├─ interceptors  # 拦截器相关目录
│       └─ ...
│
├─ .env.development
├─ .env.production
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.js
├─ favicon.ico
├─ index.html
├─ package.json
├─ yarn-lock.yaml
├─ README.md
├─ tree.txt
├─ tsconfig.json
└─ vite.config.ts

```

## 资源

- [uniapp](https://uniapp.dcloud.net.cn)
- [uview-plus](https://uiadmin.net/uview-plus/components/intro.html)
- [小程序开发指南](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0008aeea9a8978ab0086a685851c0a)

##  h5测试
"qqmap": {
  "key": "JHEBZ-7NCCS-T2GOM-6N4E7-AL7H3-CHB3H"
}

# Mpvue Typescript demo

> 一个mpvue的typescript工程模板，基于[mpvue官方的ts工程项目](https://github.com/WingGao/mpvue-ts-demo)

# Technology stack

> mpvue + typescript + vuex + webpack3

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:7100
npm run dev

# build for production with minification
npm run build
```

## description 
1、官方的ts工程模板的build相关文件非常杂乱，而且webpack配置上有些问题，导致无法在ts文件中引用less文件。该模板工程修改了build相关文件，让webpack配置看起来更易懂。   
2、官方的ts工程没有将store注入到vue，导致在vue组件中无法使用this.$store与vuex-class库。本工程模板修复了这个问题

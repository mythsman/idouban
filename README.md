# idouban

一个在网页中嵌入个人豆瓣页面的 javascript 插件。

[![package version](https://badge.fury.io/js/idouban.svg)](https://www.npmjs.com/package/idouban)
[![GitHub license](https://img.shields.io/github/license/mythsman/idouban.svg)](https://github.com/mythsman/idouban/blob/master/LICENSE)

## 配置

```html

<body>
<div id="douban"></div>
</body>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/idouban/dist/main.css"/>
<script src="https://cdn.jsdelivr.net/npm/idouban/dist/main.js" onload="window.idouban.init({
           selector: '#douban',
           type: 'movie',
           douban_id: ${your_douban_id},
           page_size: 15,
        })">
</script>
```

cdn 缓存可能不是最新，如需最新版本，可直接指定版本号，例如若当前版本是 `1.0.1` ：

* `https://cdn.jsdelivr.net/npm/idouban@1.0.1/dist/main.css`
* `https://cdn.jsdelivr.net/npm/idouban@1.0.1/dist/main.js`

考虑到 jsdelivr 国内访问效果不太好，建议直接 self-host 这些文件。

配置项如下：

* selector : 表示需要将相关代码生成后嵌入到指定 `document.querySelector($selector)` 下。
* type : 表示需要生成的页面类型，可选项为 `book`, `movie`, `game`, `song`。
* douban_Id : 你的豆瓣ID(纯数字格式，不是自定义的域名)。获取方法可以参考[怎样获取豆瓣的数字 ID ？](https://www.zhihu.com/question/19634899)。
* page_size : 每页需要展示的条目数。

## 原理

插件内部会请求一个豆瓣数据缓存服务 [mouban](https://github.com/mythsman/mouban)，获取响应后直接直接以列表的形式渲染出来。类似功能的插件还有 [hexo-douban](https://github.com/mythsman/hexo-douban)

用户首次访问时会触发 mouban 的初始化收录。这个过程可能比较久，没有排队的情况下需要等待的时间至少为 条目数/15*5秒 。如果一不小心排队了，则可能需要等待半天。

首次初始化好之后，后续会随着页面的不断访问定时进行增量更新，期间均可正常使用。

## Demo

个人博客：
[读书页](https://blog.mythsman.com/books)
[电影页](https://blog.mythsman.com/movies)
[游戏页](https://blog.mythsman.com/games)

## 反馈

系统刚上线，可能还不够完善。如果大家在使用的过程中数据有问题、或者有什么问题和意见，欢迎随时提issue。

如果你觉得这个插件很好用，欢迎右上角点下 star ⭐️，表达对作者的鼓励。
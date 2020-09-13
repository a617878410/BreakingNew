$(function () {
  $.ajaxPrefilter(function (item) {
    console.log(item.url)
    item.url = 'http://ajax.frontend.itheima.net' + item.url;
    console.log(item.url);
  })
})
// $.ajaxPrefilter(function (options) {
//   // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
//   options.url = 'http://ajax.frontend.itheima.net' + options.url
// })
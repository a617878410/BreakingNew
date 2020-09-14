$(function () {
  $.ajaxPrefilter(function (item) {
    console.log(item.url)
    item.url = 'http://ajax.frontend.itheima.net' + item.url;
    console.log(item.url);


    // 统一为有权限的接口，设置 headers 请求头
    if (item.url.indexOf('/my/') !== -1) {
      item.headers = {
        Authorization: localStorage.getItem('token') || ''
      }
    };



    item.complete = function (res) {
      console.log(res);
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        console.log(res.responseJSON.status);
        //清除本地存储（其实清除不清除没啥影响）
        localStorage.removeItem('token');
        //符合条件跳转到登录页
        location.href = '/login.html'
      }
    }
  })
})
// $.ajaxPrefilter(function (options) {
//   // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
//   options.url = 'http://ajax.frontend.itheima.net' + options.url
// })
// 统一为有权限的接口，设置 headers 请求头


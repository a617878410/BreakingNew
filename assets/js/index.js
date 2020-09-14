$(function () {
  //调用 getUserInfo 获取用户信息
  getUserInfo()

  let layer = layui.layer //（这里给不给layer赋值影响不大，照样用）

  //退出
  $('#btnLogout').on('click', function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something
      //退出到登录页面
      //1、首先清除本地存储中的 token
      localStorage.removeItem('token');
      //2、其次跳转到登录页面
      location.href = '/login.html';
      layer.close(index);
    });
  })

  //获取用户基本信息
  function getUserInfo() {
    $.ajax({
      url: '/my/userinfo',
      method: 'GET',
      // headers: {
      //   Authorization: localStorage.getItem('token'),
      // },
      // success: function (res) {
      //   console.log(res);
      // }

      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('获取用户信息失败！')
        } console.log(res);
        renderAvatar(res.data)
      },

      complete: function (res) {
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
  }

  //头像的渲染
  function renderAvatar(user) {
    //获取用户账号或者ID欢迎语
    let name = user.username || user.nickname
    //渲染欢迎语
    $('#welcome').html('欢迎' + name)
    //判断是否设置头像
    if (user.user_pic !== null) {
      //渲染头像
      $('.layui-nav-img').attr('src', user.user_pic).show()
      $('.text-avatar').hide()

    } else {
      //渲染没有头像的情况下名字的第一个字母
      $('.layui-nav-img').hide();
      let first = name[0].toUpperCase();
      $('.text-avatar').html(first).show();
    }
  }
})
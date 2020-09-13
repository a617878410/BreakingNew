$(function () {
  $('.login-btn').on('click', function () {
    // console.log(1);
    $('.login-box').hide();
    $('.reg-box').show()
  })
  $('.reg-btn').on('click', function () {
    // console.log(1);
    $('.login-box').show();
    $('.reg-box').hide()
  })

  let form = layui.form

  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val()
      // console.log(pwd);
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })




  //监听注册表单提交
  $('#form-reg').on('submit', function (e) {
    console.log(1);
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    // let data = {
    //   username: $('#form-reg [name=username]').val(),
    //   password: $('#form-reg [name=password]').val(),
    // };
    // console.log(data);
    // $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
    //   console.log(res);
    //   if (res.status != 0) {
    //     return layer.msg(res.message)
    //   }
    //   layer.msg('注册成功，请登录！')

    // })

    $.ajax({
      url: '/api/reguser',
      method: 'POST',
      data: {
        username: $('#form-reg [name=username]').val(),
        password: $('#form-reg [name=password]').val()
      },
      success: function (res) {
        if (res.status != 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
        $('.reg-btn').click()
      }
    })
  })


  //登录页面提交
  $('#login-form').submit(function (e) {
    //阻止默认事件
    e.preventDefault();
    //发起Ajax的POST请求
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        //把token 存在浏览器缓存里，方便以后提用
        localStorage.setItem('token', res.token)
        //点击登录成功之后可以跳转到主页面
        location.href = '/index.html'
      }
    })
  })

})
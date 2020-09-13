$(function () {
  $('.reg-box').hide()
  function none() {
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
  }
  none()
})
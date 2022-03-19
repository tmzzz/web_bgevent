$(function(){
  //调用 getUserInfo() 获取用户信息
  getUserInfo()

  var layer = layui.layer

  // 点击按钮，实现退出功能
  $('#btnLogout').on('click',function(){
    // 提示用户 是否退出?
    layer.confirm('确认是否退出?', {icon: 3, title:'提示'}, function(index){
      //do something
      // 1. 清空本地存储的token
      localStorage.removeItem('token')
      // 2. 调回登录页
      location.href = '/login.html'
      // 这是关闭 confirm 询问框
      layer.close(index);
    });
  })
})

// 获取用户信息
function getUserInfo(){
  $.ajax({
    url: '/my/userinfo',
    method: 'GET',
    
    // headers:请求头配置对象 
    // 在baseAPI.js中为、/my开头的统一配置
    success:function(res){
      if(res.status !== 0){
        return layer.msg('获取用户信息失败！')
      }

      //调用 renderAvater 渲染用户的头像
      renderAvater(res.data)
    },
    
  })
}

// 渲染用户的头像
function renderAvater(user){
  // 1.获取用户名称
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;',name)
  // 2.判断用户是否有头像,按需渲染
  if(user.user_pic !== null){
    // 3.渲染图片头像
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avater').hide()
  }else{
    // 4.渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avater').html(first).show()

  }

}
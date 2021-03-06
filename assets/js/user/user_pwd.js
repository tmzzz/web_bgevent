$(function(){
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
        ],
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同！'
            }
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码不一致'
            }
        }
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatePwd',
            // 快速获取表单数据
            data:{
                oldPwd:form.val("formUserInfo").oldPwd,
                newPwd:form.val("formUserInfo").newPwd
            },
            //data:$(this).serialize(),
            success:function(res){

                if(res.status !== 0 ){
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')

                // 重置表单，清空表单
                // 加上[0]就是原生DOM对象
                $('.layui-form')[0].reset()
                
            }
        })
    })
    
})
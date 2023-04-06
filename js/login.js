$(document).ready(function () {
    //初始化弹窗
    layui.use('layer', function () {
        var layer = layui.layer;
    });
})

 //点击登录事件
 $('#login-btn').on('click',function(){
    // console.log('click');
    let account = $('#account').val();
    let password = $('#password').val();
    $.ajax({
        type: 'post',
        dataType: 'json',
        data: { 'account': account, 'password': password },
        url: './PHP/login.php',
        success: function (res, state, status) {
            if (state != 'success' && status.status != 200) {
                layer.msg('数据连接失败',{icon:5});
                return;
            } else if (res == 'admin') {
                layer.msg('管理员登录成功',{icon:6});
                setTimeout(() => {
                    window.location.href = './admin-index.html';
                }, 700);
            } else if(res == 'student'){
                layer.msg('学生登录成功',{icon:6});
                setTimeout(() => {
                    window.location.href = './stu-index.html';
                }, 700);
            }else if(res == 'notApproved'){
                layer.msg('账号未通过审核',{icon:4})
            }else{
                layer.msg('账号或密码错误',{icon:5});
            }
        }
    })
})
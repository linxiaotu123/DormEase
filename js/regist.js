$(document).ready(function () {
    //初始化弹窗
    layui.use('layer', function () {
        var layer = layui.layer;
    });
})

//点击注册事件
$('#regist-btn').on('click', function () {
    let account = $('#account').val();
    let password = $('#password').val();
    let name = $('#name').val();
    let stuid = $('#stuid').val();
    if(account === '' || password === '' || name === '' || stuid === ''){
        layer.msg('内容不可为空',{icon:2});
        return;
    }
    $.ajax({
        type: 'post',
        dataType: 'json',
        data: { 'account': account, 'password': password, 'name': name, 'stuid': stuid },
        url: './PHP/regist.php',
        success: function (res, state, status) {
            if (state != 'success' && status.status != 200) {
                layer.msg('数据连接失败', { icon: 5 });
                return;
            } else if (res == 'accountExist') {
                layer.msg('账号已存在', { icon: 2 });
                return;
            } else if (res == 'stuidExist') {
                layer.msg('学号已存在', { icon: 2 });
                return;
            } else if (res == 'success') {
                layer.msg('注册成功', { icon: 1 });
                setTimeout(() => {
                    window.location.href = './login.html';
                }, 500);
            } else {
                layer.msg('注册失败', { icon: 2 });
            }
        }
    })
})
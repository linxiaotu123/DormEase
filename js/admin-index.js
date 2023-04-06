var nowAccount = '';
//页面加载完毕时隐藏所有内容
$(document).ready(function () {
    //页面加载完毕隐藏所有内容
    $('#index-block').css('display', 'block');
    $('#notice-block').css('display', 'none');
    $('#repair-block').css('display', 'none');
    $('#exchange-block').css('display', 'none');
    $('#discipline-block').css('display', 'none');
    $('#hostel-block').css('display', 'none');
    $('#InAndOut-block').css('display', 'none');
    $('#examine-block').css('display', 'none');

    //初始化轮播图
    $('.am-slider').flexslider();

    //验证登录
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: './PHP/Verify-login.php',
        success: function (res, state, status) {
            if (state != 'success' && status != 200) {
                alert('连接失败');
                return;
            } else {
                if (res == 'success') {
                    // alert('登录成功');
                    layer.msg('登录成功', { icon: 1 });
                } else {
                    // alert('无权访问');
                    layer.msg('无权访问', { icon: 2 });
                    setTimeout(() => {
                        location.href = './login.html';
                    }, 700);
                }
            }
        }
    })
    //获取account
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: './PHP/Account-session.php',
        success: function (res, state, status) {
            if (state != 'success' && status != 200) {
                // alert('数据连接失败');
                layer.msg('数据连接失败', { icon: 5 })
                return;
            } else {
                if (res != 'fail') {
                    nowAccount = res;
                }
            }
        }
    })


    //active效果
    $('#nav-box>li>a').on('click', function () {
        $(this).addClass('active');
        $(this).parents().siblings('li').children('a').removeClass('active');
    })

    //初始化弹窗
    layui.use('layer', function () {
        var layer = layui.layer;
    });
})

//--------------------------------------------------------------------------------------------
//退出登录
$('#logout-btn').unbind('click').click(function () {
    $.ajax({
        type: 'post',
        url: './PHP/delSession.php',
        success: function (res, state, status) {
            // console.log('state:'+state+',status:'+status.status);
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败', { icon: 5 })
            } else {
                // alert('注销成功!');
                layer.msg('注销成功', { icon: 1 });
                setTimeout(() => {
                    location.href = './login.html';
                }, 1000);
            }
        }
    })
})


//--------------------------------------------------------------------------------------------
//管理员信息
$(document).on('click', '#adminInfo', function () {
    // console.log(nowAccount);
    $.ajax({
        type: 'post',
        dataType: 'json',
        data: { 'account': nowAccount },
        url: './PHP/findUserByAccount.php',
        success: function (res, state, status) {
            // console.log('state:'+state+',status:'+status.status);
            let name = '';
            let number = '';
            let sta = '';
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败', { icon: 5 })
            } else {
                if (res != 'fail') {
                    for (let i = 0; i < res.length; i++) {
                        name = res[i].name;
                        number = res[i].number;
                        if (res[i].state == 1) {
                            sta = '管理员';
                        } else {
                            sta = '学生';
                        }
                    }
                    $('#adminInfo-name').val(name);
                    $('#adminInfo-number').val(number);
                    $('#adminInfo-state').val(sta);
                }
            }
        }
    })
})

//--------------------------------------------------------------------------------------------
//编辑管理员信息
$(document).on('click', '#editAdminInfo', function () {
    // console.log(nowAccount);
    $.ajax({
        type: 'post',
        dataType: 'json',
        data: { 'account': nowAccount },
        url: './PHP/findUserByAccount.php',
        success: function (res, state, status) {
            // console.log('state:'+state+',status:'+status.status);
            let name = '';
            let number = '';
            let sta = '';
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败', { icon: 5 })
            } else {
                if (res != 'fail') {
                    for (let i = 0; i < res.length; i++) {
                        name = res[i].name;
                        number = res[i].number;
                        if (res[i].state == 1) {
                            sta = '管理员';
                        } else {
                            sta = '学生';
                        }
                    }
                    $('#editAdminInfo-name').val(name);
                    $('#editAdminInfo-number').val(number);
                    $('#editAdminInfo-state').val(sta);
                }
            }
        }
    });
    editAdminInfo();
});

//--------------------------------------------------------------------------------------------
//编辑管理员函数
function editAdminInfo() {
    $('#editAdminInfo-btn').unbind('click').click(function () {
        let name = $('#editAdminInfo-name').val();
        let number = $('#editAdminInfo-number').val();
        let sta = '';
        if ($('#editAdminInfo-state').val() == '管理员') {
            sta = '1';
        } else if ($('#editAdminInfo-state').val() == '学生') {
            sta = '0';
        }
        if (name === '' || number === '' || sta === '') {
            // alert('内容不可为空');
            layer.msg('内容不可为空', { icon: 2 })
            return;
        }
        $.ajax({
            type: 'post',
            dataType: 'json',
            data: { 'account': nowAccount, 'name': name, 'number': number, 'state': sta },
            url: './PHP/editUserInfo.php',
            success: function (res, state, status) {
                if (state != 'success' && status.status != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败', { icon: 5 })
                } else {
                    if (res == 'success') {
                        // alert('修改成功');
                        layer.msg('修改成功', { icon: 1 });
                    } else {
                        // alert('修改失败');
                        layer.msg('修改失败', { icon: 2 });
                    }
                }
            }
        })
    })
}


//显示首页
$(document).on('click', '#showIndex', function () {
    $('#index-block').css('display', 'block');
    $('#notice-block').css('display', 'none');
    $('#repair-block').css('display', 'none');
    $('#exchange-block').css('display', 'none');
    $('#discipline-block').css('display', 'none');
    $('#hostel-block').css('display', 'none');
    $('#InAndOut-block').css('display', 'none');
    $('#examine-block').css('display', 'none');
})


//--------------------------------------------------------------------------------------------
// 显示全部公告
//点击公告按钮时显示公告内容,调用ajax刷新数据
$(document).on('click', '#showNotice', function () {
    $('#notice-block').css('display', 'block');
    $('#repair-block').css('display', 'none');
    $('#exchange-block').css('display', 'none');
    $('#discipline-block').css('display', 'none');
    $('#hostel-block').css('display', 'none');
    $('#InAndOut-block').css('display', 'none');
    $('#index-block').css('display', 'none');
    $('#examine-block').css('display', 'none');
    showNotice();
})

function showNotice() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "./PHP/showNotice.php",
        success: function (res, state, status) {
            // console.log(res);
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败', { icon: 5 })
            } else {
                if (res != 'fail') {
                    let html = '';
                    for (let i = 0; i < res.length; i++) {
                        html += '<tr>';
                        html += '<td>' + res[i].id + '</td>';
                        html += '<td>' + res[i].title + '</td>';
                        html += '<td>' + res[i].content + '</td>';
                        html += '<td>' + res[i].time + '</td>';
                        html += '<td>';
                        html += '<div class="am-btn-toolbar">';
                        html += '<div class="am-btn-group am-btn-group-xs">';
                        html += '<button id="editNotice" class="am-btn am-btn-default am-btn-xs am-text-secondary" data-id=' + res[i].id + '><span class="am-icon-pencil-square-o"></span> 编辑</button>';
                        html += '<button id="delNotice" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"data-id=' + res[i].id + '><span class="am-icon-trash-o"></span> 删除</button>';
                        html += '</div>';
                        html += '</div>';
                        html += '</td>';
                        html += '</tr>';
                    }
                    $('#notice-body').html(html);
                } else {
                    let html = '';
                    $('#notice-body').html(html);
                }
            }
        }
    })
}


//--------------------------------------------------------------------------------------------]
// 添加公告
//点击添加公告提交按钮,调用ajax向PHP文件传输参数
$(document).on('click', '#addNotice-btn', function () {
    addNotice();
})
//添加公告函数
function addNotice() {
    let title = $('#addNotice-title').val();
    let content = $('#addNotice-content').val();
    if (title === '' || content === '') {
        // alert('内容或标题不可为空!');
        layer.msg('内容或标题不可为空', { icon: 2 })
        return;
    }
    $.ajax({
        type: "post",
        dataType:'json',
        data: { 'title': title, 'content': content },
        url: "./PHP/addNotice.php",
        success: function (res, state, status) {
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败', { icon: 5 })
            } else {
                if (res == 'success') {
                    // alert('添加成功');
                    layer.msg('添加成功', { icon: 1 });
                    showNotice();
                } else {
                    // alert('添加失败');
                    layer.msg('添加失败', { icon: 2 });
                }
            }
        }
    })
    $('#addNotice-title').val('');
    $('#addNotice-content').val('');
}


//--------------------------------------------------------------------------------------------
// 编辑公告
//点击编辑公告按钮
$(document).on('click', '#editNotice', function () {
    let id = $(this).data('id');
    $.ajax({
        type: "post",
        dataType: "json",
        data: { 'id': id },
        url: "./PHP/findNoticeById.php",
        success: function (res, state, status) {
            // console.log(res);
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败', { icon: 5 })
            } else {
                for (let i = 0; i < res.length; i++) {
                    var title = res[i].title;
                    var content = res[i].content;
                }
                $('#editNotice-title').val(title);
                $('#editNotice-content').val(content);
            }
        }
    })
    // 调用弹出框
    $('#editNotice-confirm').modal({});
    editNotice(id);
})

//点击编辑公告弹出框的提交按钮执行的事件
function editNotice(id) {
    $('#editNotice-btn').unbind('click').click(function () {
        let title = $('#editNotice-title').val();
        let content = $('#editNotice-content').val();
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id, 'title': title, 'content': content },
            url: "./PHP/editNotice.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败', { icon: 5 })
                } else if (res == 'success') {
                    // alert('修改成功!');
                    // $.alerts.alert("修改成功","系统提示","确定",function(){$.AMUI.progress.done();});
                    layer.msg('修改成功', { icon: 1 });
                    showNotice();
                } else {
                    // alert('修改失败!');
                    layer.msg('修改失败', { icon: 2 });
                }
            }
        })
    })
}


//--------------------------------------------------------------------------------------------
// 删除公告
//点击删除公告按钮
$(document).on('click', '#delNotice', function () {
    let id = $(this).data('id');
    $('#delNotice-confirm').modal({});
    delNotice(id);
})

//点击删除公告弹出框的确定按钮执行的事件
function delNotice(id) {
    $('#delNotice-btn').unbind('click').click(function () {
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id },
            url: "./PHP/delNotice.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败', { icon: 5 })
                } else if (res == 'success') {
                    // alert('删除成功!');
                    layer.msg('删除成功', { icon: 1 });
                    showNotice();
                } else {
                    // alert('删除失败!');
                    layer.msg('删除失败', { icon: 2 });
                }
            }
        })
    })
}


//--------------------------------------------------------------------------------------------
//显示全部报修信息
//点击报修按钮时显示公告内容,调用ajax刷新数据
$(document).on('click', '#showRepair', function () {
    $('#repair-block').css('display', 'block');
    $('#notice-block').css('display', 'none');
    $('#exchange-block').css('display', 'none');
    $('#discipline-block').css('display', 'none');
    $('#hostel-block').css('display', 'none');
    $('#InAndOut-block').css('display', 'none');
    $('#index-block').css('display', 'none');
    $('#examine-block').css('display', 'none');
    showRepair();
})

//显示报修函数
function showRepair() {
    $.ajax({
        type: "post",
        dataType: "json",
        url: "./PHP/showRepair.php",
        success: function (res, state, status) {
            if (state != 'success' && status.stauts != 200) {
                // alert('数据连接失败');
                layer.msg('数据连接失败', { icon: 5 })
                return false;
            } else {
                if (res != 'fail') {
                    let html = '';
                    for (let i = 0; i < res.length; i++) {
                        html += '<tr>';
                        html += '<td>' + res[i].id + '</td>';
                        html += '<td>' + res[i].hostelId + '</td>';
                        html += '<td>' + res[i].trouble + '</td>';
                        html += '<td>' + res[i].reporter + '</td>';
                        html += '<td>' + res[i].time + '</td>';
                        html += '<td>';
                        html += '<div class="am-btn-toolbar">';
                        html += '<div class="am-btn-group am-btn-group-xs">';
                        html += '<button id="passRepair" type="button" class="am-btn am-btn-default am-btn-xs am-text-secondary" data-id=' + res[i].id + '><span class="am-icon-pencil-square-o"></span> 完成</button>';
                        html += '<button id="rejectRepair"type="button"  class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"data-id=' + res[i].id + '><span class="am-icon-trash-o"></span> 驳回</button>';
                        html += '</div>';
                        html += '</div>';
                        html += '</td>';
                        html += '</tr>';
                    }
                    $('#repair-body').html(html);
                } else {
                    let html = '';
                    $('#repair-body').html(html);
                }
            }
        }
    })
}


//--------------------------------------------------------------------------------------------
// 完成报修
//点击完成报修按钮
$(document).on('click', '#passRepair', function () {
    let id = $(this).data('id');
    // 调用弹出框
    $('#passRepair-confirm').modal({});
    passRepair(id);
})

//点击完成报修弹出框的确定按钮执行的事件
function passRepair(id) {
    $('#passRepair-btn').unbind('click').click(function () {
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id },
            url: "./PHP/passRepair.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败', { icon: 5 })
                } else if (res == 'success') {
                    // alert('已通过!');
                    layer.msg('已通过', { icon: 1 });
                    showRepair();
                } else {
                    // alert('操作失败!');
                    layer.msg('操作失败', { icon: 2 });
                }
            }
        });
    });
}


//--------------------------------------------------------------------------------------------
// 驳回报修
//点击驳回报修按钮
$(document).on('click', '#rejectRepair', function () {
    let id = $(this).data('id');
    // 调用弹出框
    $('#rejectRepair-confirm').modal({});
    rejectRepair(id);
})

//点击驳回报修弹出框的确定按钮执行的事件
function rejectRepair(id) {
    $('#rejectRepair-btn').unbind('click').click(function () {
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id },
            url: "./PHP/rejectRepair.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败', { icon: 5 })
                } else if (res == 'success') {
                    // alert('已驳回!');
                    layer.msg('已驳回', { icon: 1 });
                    showRepair();
                } else {
                    // alert('操作失败!');
                    layer.msg('操作失败', { icon: 2 });
                }
            }
        });
    })
}


//--------------------------------------------------------------------------------------------
//显示全部换宿申请信息
//点击换宿按钮时显示申请内容,调用ajax刷新数据
$(document).on('click', '#showExchange', function () {
    $('#exchange-block').css('display', 'block');
    $('#repair-block').css('display', 'none');
    $('#notice-block').css('display', 'none');
    $('#discipline-block').css('display', 'none');
    $('#hostel-block').css('display', 'none');
    $('#InAndOut-block').css('display', 'none');
    $('#index-block').css('display', 'none');
    $('#examine-block').css('display', 'none');
    showExchange();
})

//显示换宿申请的函数
function showExchange() {
    $.ajax({
        type: "post",
        dataType: "json",
        url: "./PHP/showExchange.php",
        success: function (res, state, status) {
            if (state != 'success' && status.stauts != 200) {
                // alert('数据连接失败');
                layer.msg('数据连接失败', { icon: 5 })
                return false;
            } else {
                if (res != 'fail') {
                    let html = '';
                    for (let i = 0; i < res.length; i++) {
                        html += '<tr>';
                        html += '<td>' + res[i].id + '</td>';
                        html += '<td>' + res[i].reporter + '</td>';
                        html += '<td>' + res[i].old + '</td>';
                        html += '<td>' + res[i].new + '</td>';
                        html += '<td>' + res[i].cause + '</td>';
                        html += '<td>' + res[i].time + '</td>';
                        html += '<td>';
                        html += '<div class="am-btn-toolbar">';
                        html += '<div class="am-btn-group am-btn-group-xs">';
                        html += '<button id="passExchange" type="button" class="am-btn am-btn-default am-btn-xs am-text-secondary" data-id=' + res[i].id + '><span class="am-icon-pencil-square-o"></span> 通过</button>';
                        html += '<button id="rejectExchange"type="button"  class="am-btn am-btn-default am-btn-xs am-text-danger" data-id=' + res[i].id + '><span class="am-icon-trash-o"></span> 驳回</button>';
                        html += '</div>';
                        html += '</div>';
                        html += '</td>';
                        html += '</tr>';
                    }
                    $('#exchange-body').html(html);
                } else {
                    let html = '';
                    $('#exchange-body').html(html);
                }
            }
        }
    })
}


//--------------------------------------------------------------------------------------------
// 通过换宿申请
//点击通过申请按钮
$(document).on('click', '#passExchange', function () {
    let id = $(this).data('id');
    // 调用弹出框
    $('#passExchange-confirm').modal({});
    passExchange(id);
})

//点击换宿申请弹出框的确定按钮执行的事件
function passExchange(id) {
    $('#passExchange-btn').unbind('click').click(function () {
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id },
            url: "./PHP/passExchange.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败', { icon: 5 })
                } else if (res == 'success') {
                    // alert('已通过!');
                    layer.msg('已通过', { icon: 1 });
                    showExchange();
                } else {
                    // alert('操作失败!');
                    layer.msg('操作失败', { icon: 2 });
                }
            }
        });
    });
}


//--------------------------------------------------------------------------------------------
// 驳回换宿申请
//点击换宿申请按钮
$(document).on('click', '#rejectExchange', function () {
    let id = $(this).data('id');
    // 调用弹出框
    $('#rejectExchange-confirm').modal({});
    rejectExchange(id);
})

//点击驳回换宿申请弹出框的确定按钮执行的事件
function rejectExchange(id) {
    $('#rejectExchange-btn').unbind('click').click(function () {
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id },
            url: "./PHP/rejectExchange.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败', { icon: 5 })
                } else if (res == 'success') {
                    // alert('已驳回!');
                    layer.msg('已驳回', { icon: 1 });
                    showExchange();
                } else {
                    // alert('操作失败!');
                    layer.msg('操作失败', { icon: 2 });
                }
            }
        });
    })
}


//--------------------------------------------------------------------------------------------
// 显示全部纪律信息
//点击纪律按钮时显示公告内容,调用ajax刷新数据
$(document).on('click', '#showDiscipline', function () {
    $('#discipline-block').css('display', 'block');
    $('#notice-block').css('display', 'none');
    $('#repair-block').css('display', 'none');
    $('#exchange-block').css('display', 'none');
    $('#hostel-block').css('display', 'none');
    $('#InAndOut-block').css('display', 'none');
    $('#index-block').css('display', 'none');
    $('#examine-block').css('display', 'none');
    showDiscipline();
})

function showDiscipline() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "./PHP/showDiscipline.php",
        success: function (res, state, status) {
            // console.log(res);
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败', { icon: 5 })
            } else {
                if (res != 'fail') {
                    let html = '';
                    for (let i = 0; i < res.length; i++) {
                        html += '<tr>';
                        html += '<td>' + res[i].Id + '</td>';
                        html += '<td>' + res[i].content + '</td>';
                        html += '<td>' + res[i].time + '</td>';
                        html += '<td>';
                        html += '<div class="am-btn-toolbar">';
                        html += '<div class="am-btn-group am-btn-group-xs">';
                        html += '<button id="editDiscipline" class="am-btn am-btn-default am-btn-xs am-text-secondary" data-id=' + res[i].Id + '><span class="am-icon-pencil-square-o"></span> 编辑</button>';
                        html += '<button id="delDiscipline" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"data-id=' + res[i].Id + '><span class="am-icon-trash-o"></span> 删除</button>';
                        html += '</div>';
                        html += '</div>';
                        html += '</td>';
                        html += '</tr>';
                    }
                    $('#discipline-body').html(html);
                } else {
                    let html = '';
                    $('#discipline-body').html(html);
                }
            }
        }
    })
}


//--------------------------------------------------------------------------------------------]
// 添加纪律
//点击添加纪律提交按钮,调用ajax向PHP文件传输参数
$(document).on('click', '#addDiscipline-btn', function () {
    addDiscipline();
})
//添加公告函数
function addDiscipline() {
    let content = $('#addDiscipline-content').val();
    if (content === '') {
        // alert('内容不可为空!');
        layer.msg('内容不可为空', { icon: 2 })
        return;
    }
    $.ajax({
        type: "post",
        dataType:'json',
        data: { 'content': content },
        url: "./PHP/addDiscipline.php",
        success: function (res, state, status) {
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败', { icon: 5 })
            } else {
                if (res == 'success') {
                    // alert('添加成功');
                    layer.msg('添加成功', { icon: 1 });
                    showDiscipline();
                } else {
                    // alert('添加失败');
                    layer.msg('添加失败', { icon: 2 });
                }
            }
        }
    })
    $('#addDiscipline-content').val('');
}


// //--------------------------------------------------------------------------------------------
// // 编辑纪律
// //点击编辑纪律按钮
$(document).on('click', '#editDiscipline', function () {
    let id = $(this).data('id');
    $.ajax({
        type: "post",
        dataType: "json",
        data: { 'id': id },
        url: "./PHP/findDisciplineById.php",
        success: function (res, state, status) {
            // console.log(res);
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败', { icon: 5 })
            } else {
                for (let i = 0; i < res.length; i++) {
                    var content = res[i].content;
                }
                $('#editDiscipline-content').val(content);
            }
        }
    })
    // 调用弹出框
    $('#editDiscipline-confirm').modal({});
    editDiscipline(id);
})

//点击编辑纪律弹出框的提交按钮执行的事件
function editDiscipline(id) {
    $('#editDiscipline-btn').unbind('click').click(function () {
        let content = $('#editDiscipline-content').val();
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id, 'content': content },
            url: "./PHP/editDiscipline.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败', { icon: 5 })
                } else if (res == 'success') {
                    // alert('修改成功!');
                    layer.msg('修改成功', { icon: 1 });
                    showDiscipline();
                } else {
                    // alert('修改失败!');
                    layer.msg('修改失败', { icon: 2 });
                }
            }
        })
    })
}


// //--------------------------------------------------------------------------------------------
// // 删除纪律
// //点击删除纪律按钮
$(document).on('click', '#delDiscipline', function () {
    let id = $(this).data('id');
    // 调用弹出框
    $('#delDiscipline-confirm').modal({});
    delDiscipline(id);

})

//点击删除公告弹出框的确定按钮执行的事件
function delDiscipline(id) {
    $('#delDiscipline-btn').unbind('click').click(function () {
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id },
            url: "./PHP/delDiscipline.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败', { icon: 5 })
                } else if (res == 'success') {
                    // alert('删除成功!');
                    layer.msg('删除成功', { icon: 1 });
                    showDiscipline();
                } else {
                    // alert('删除失败!');
                    layer.msg('删除失败', { icon: 1 });
                }
            }
        })
    })
}


//--------------------------------------------------------------------------------------------
// 显示宿舍列表
//点击宿舍列表按钮时显示宿舍内容,调用ajax刷新数据
$(document).on('click', '#showHostel', function () {
    $('#hostel-block').css('display', 'block');
    $('#notice-block').css('display', 'none');
    $('#repair-block').css('display', 'none');
    $('#exchange-block').css('display', 'none');
    $('#discipline-block').css('display', 'none');
    $('#InAndOut-block').css('display', 'none');
    $('#index-block').css('display', 'none');
    $('#examine-block').css('display', 'none');
    showHostel();
})

function showHostel() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "./PHP/showHostel.php",
        success: function (res, state, status) {
            // console.log(res);
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败', { icon: 5 })
            } else {
                if (res != 'fail') {
                    let html = '';
                    for (let i = 0; i < res.length; i++) {
                        html += '<tr>';
                        html += '<td>' + res[i].Id + '</td>';
                        html += '<td>' + res[i].hostelId + '</td>';
                        html += '<td>' + res[i].time + '</td>';
                        html += '<td>';
                        html += '<div class="am-btn-toolbar">';
                        html += '<div class="am-btn-group am-btn-group-xs">';
                        html += '<button id="showMember" class="am-btn am-btn-default am-btn-xs am-text-success" data-id=' + res[i].Id + '><span class="am-icon-eye"></span> 浏览</button>';
                        html += '<button id="editHostel" class="am-btn am-btn-default am-btn-xs am-text-secondary" data-id=' + res[i].Id + '><span class="am-icon-pencil-square-o"></span> 编辑</button>';
                        html += '<button id="delHostel" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"data-id=' + res[i].Id + '><span class="am-icon-trash-o"></span> 删除</button>';
                        html += '</div>';
                        html += '</div>';
                        html += '</td>';
                        html += '</tr>';
                    }
                    $('#hostel-body').html(html);
                } else {
                    let html = '';
                    $('#hostel-body').html(html);
                }
            }
        }
    })
}


//--------------------------------------------------------------------------------------------
// 新增宿舍
//点击新增宿舍提交按钮,调用ajax向PHP文件传输参数
$(document).on('click', '#addHostel-btn', function () {
    addHostel();
})
//新增函数
function addHostel() {
    let hostelId = $('#addHostel-hostelId').val();
    let member1 = $('#addHostel-member1').val();
    let member2 = $('#addHostel-member2').val();
    let member3 = $('#addHostel-member3').val();
    let member4 = $('#addHostel-member4').val();
    if (hostelId === '') {
        // alert('宿舍号不可为空!');
        layer.msg('宿舍号不可为空', { icon: 2 })
        return;
    } else if (member1 === '' && member2 === '' && member3 === '' && member4 === '') {
        // alert('成员不可为空!');
        layer.msg('成员不可为空', { icon: 2 })
        return;
    }
    $.ajax({
        type: "post",
        dataType:'json',
        data: { 'hostelId': hostelId, 'member1': member1, 'member2': member2, 'member3': member3, 'member4': member4 },
        url: "./PHP/addHostel.php",
        success: function (res, state, status) {
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败', { icon: 5 })
            } else {
                if (res == 'success') {
                    // alert('添加成功');
                    layer.msg('添加成功', { icon: 1 });
                    showHostel();
                } else {
                    // alert('添加失败');
                    layer.msg('添加失败', { icon: 2 });
                }
            }
        }
    })
    $('#addHostel-hostelId').val('');
    $('#addHostel-member1').val('');
    $('#addHostel-member2').val('');
    $('#addHostel-member3').val('');
    $('#addHostel-member4').val('');
}


//--------------------------------------------------------------------------------------------
//浏览宿舍成员
//点击浏览按钮时,发送ajax请求
$(document).on('click', '#showMember', function () {
    let id = $(this).data('id');
    // 调用弹出框
    $('#showMember-confirm').modal({});
    showMember(id);
})

//ajax请求函数
function showMember(id) {
    $.ajax({
        type: 'post',
        dataType: 'json',
        data: { 'id': id },
        url: './PHP/findHostelById.php',
        success: function (res, state, status) {
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败');
                layer.msg('数据连接失败', { icon: 5 })
                return;
            } else {
                for (let i = 0; i < res.length; i++) {
                    var hostelId = res[i].hostelId;
                    var member1 = res[i].member1;
                    var member2 = res[i].member2;
                    var member3 = res[i].member3;
                    var member4 = res[i].member4;
                }
                $('#showMember-hostelId').val(hostelId);
                $('#showMember-member1').val(member1);
                $('#showMember-member2').val(member2);
                $('#showMember-member3').val(member3);
                $('#showMember-member4').val(member4);
            }
        }
    })
}


//--------------------------------------------------------------------------------------------
//修改宿舍信息
$(document).on('click', '#editHostel', function () {
    let id = $(this).data('id');
    // 调用弹出框
    $('#editHostel-confirm').modal({});
    editHostel(id);
})

//编辑宿舍函数
function editHostel(id) {
    //渲染原信息
    $.ajax({
        type: 'post',
        dataType: 'json',
        data: { 'id': id },
        url: './PHP/findHostelById.php',
        success: function (res, state, status) {
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败');
                layer.msg('数据连接失败', { icon: 5 })
                return;
            } else {
                for (let i = 0; i < res.length; i++) {
                    var hostelId = res[i].hostelId;
                    var member1 = res[i].member1;
                    var member2 = res[i].member2;
                    var member3 = res[i].member3;
                    var member4 = res[i].member4;
                }
                $('#editHostel-hostelId').val(hostelId);
                $('#editHostel-member1').val(member1);
                $('#editHostel-member2').val(member2);
                $('#editHostel-member3').val(member3);
                $('#editHostel-member4').val(member4);
            }
        }
    });

    //点击提交按钮
    $('#editHostel-btn').unbind('click').click(function () {
        let hostelId = $('#editHostel-hostelId').val();
        let member1 = $('#editHostel-member1').val();
        let member2 = $('#editHostel-member2').val();
        let member3 = $('#editHostel-member3').val();
        let member4 = $('#editHostel-member4').val();
        console.log('id=' + id, '宿舍号=' + hostelId, 'm1=' + member1, 'm2=' + member2, 'm3=' + member3, 'm4=' + member4);
        if (hostelId == '') {
            // alert('宿舍号不可为空!');
            layer.msg('宿舍号不可为空', { icon: 2 })
            return;
        } else if (member1 == '' && member2 == '' && member3 == '' && member4 == '') {
            // alert('成员不可为空!');
            layer.msg('成员不可为空', { icon: 2 })
            return;
        } else {
            //发送修改数据的请求
            $.ajax({
                type: 'post',
                dataType: 'json',
                data: { 'id': id, 'hostelId': hostelId, 'member1': member1, 'member2': member2, 'member3': member3, 'member4': member4 },
                url: './PHP/editHostel.php',
                success: function (res, state, status) {
                    if (state != 'success' && status.status != 200) {
                        // alert('数据连接失败');
                        layer.msg('数据连接失败', { icon: 5 })
                        return;
                    } else {
                        if (res == 'success') {
                            // alert('修改成功');
                            layer.msg('修改成功', { icon: 1 });
                            showHostel();
                        } else {
                            // alert('修改失败');
                            layer.msg('修改失败', { icon: 2 });
                        }
                    }
                }
            })
        }
    })
}


//--------------------------------------------------------------------------------------------
// // 删除宿舍信息
// //点击删除宿舍信息按钮
$(document).on('click', '#delHostel', function () {
    let id = $(this).data('id');
    // 调用弹出框
    $('#delHostel-confirm').modal({});
    delHostel(id);

})

//点击删除宿舍弹出框的确定按钮,向php发送删除请求
function delHostel(id) {
    $('#delHostel-btn').unbind('click').click(function () {
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id },
            url: "./PHP/delHostel.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败', { icon: 5 })
                } else if (res == 'success') {
                    // alert('删除成功!');
                    layer.msg('删除成功', { icon: 1 });
                    showHostel();
                } else {
                    // alert('删除失败!');
                    layer.msg('删除失败', { icon: 2 });
                }
            }
        })
    })
}


//--------------------------------------------------------------------------------------------
//显示出入登记信息
$(document).on('click', '#showInAndOut', function () {
    $('#InAndOut-block').css('display', 'block');
    $('#notice-block').css('display', 'none');
    $('#repair-block').css('display', 'none');
    $('#exchange-block').css('display', 'none');
    $('#discipline-block').css('display', 'none');
    $('#hostel-block').css('display', 'none');
    $('#index-block').css('display', 'none');
    $('#examine-block').css('display', 'none');
    showInAndOut();
})

function showInAndOut() {
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: './PHP/showInAndOut.php',
        success: function (res, state, status) {
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败');
                layer.msg('数据连接失败', { icon: 5 })
                return;
            } else {
                if (res != 'fail') {
                    let html = '';
                    for (let i = 0; i < res.length; i++) {
                        html += '<tr>';
                        html += '<td>' + res[i].Id + '</td>';
                        html += '<td>' + res[i].name + '</td>';
                        html += '<td>' + res[i].content + '</td>';
                        html += '<td>' + res[i].time + '</td>';
                        html += '<td>';
                        html += '<div class="am-btn-toolbar">';
                        html += '<div class="am-btn-group am-btn-group-xs">';
                        html += '<button id="editInAndOut" class="am-btn am-btn-default am-btn-xs am-text-secondary" data-id=' + res[i].Id + '><span class="am-icon-pencil-square-o"></span> 编辑</button>';
                        html += '<button id="delInAndOut" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"data-id=' + res[i].Id + '><span class="am-icon-trash-o"></span> 删除</button>';
                        html += '</div>';
                        html += '</div>';
                        html += '</td>';
                        html += '</tr>';
                    }
                    $('#InAndOut-body').html(html);
                } else {
                    let html = '';
                    $('#InAndOut-body').html(html);
                }
            }
        }
    })
}


//--------------------------------------------------------------------------------------------
// 新增登记记录
//点击新增登记记录提交按钮,调用ajax向PHP文件传输参数
$(document).on('click', '#addInAndOut-btn', function () {
    addInAndOut();
})
//新增函数
function addInAndOut() {
    let name = $('#addInAndOut-name').val();
    let content = $('#addInAndOut-content').val();
    if (name === '' || content === '') {
        // alert('内容不可为空!');
        layer.msg('内容不可为空', { icon: 2 })
        return;
    }
    $.ajax({
        type: "post",
        dataType:'json',
        data: { 'name': name, 'content': content },
        url: "./PHP/addInAndOut.php",
        success: function (res, state, status) {
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败', { icon: 5 })
            } else {
                if (res == 'success') {
                    // alert('添加成功');
                    layer.msg('添加成功', { icon: 1 });
                    showInAndOut();
                } else {
                    // alert('添加失败');
                    layer.msg('添加失败', { icon: 2 });
                }
            }
        }
    })
    $('#addInAndOut-name').val('');
    $('#addInAndOut-content').val('');
}


//--------------------------------------------------------------------------------------------
//编辑登记信息
$(document).on('click', '#editInAndOut', function () {
    let id = $(this).data('id');
    //调用弹出框
    $('#editInAndOut-confirm').modal({});
    //调用函数
    editInAndOut(id);
})

//编辑登记信息函数
function editInAndOut(id) {
    //渲染原信息
    $.ajax({
        type: 'post',
        dataType: 'json',
        data: { 'id': id },
        url: './PHP/findInAndOutById.php',
        success: function (res, state, status) {
            let name = '';
            let content = '';
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败');
                layer.msg('数据连接失败', { icon: 5 })
                return;
            } else {
                for (let i = 0; i < res.length; i++) {
                    name = res[i].name;
                    content = res[i].content;
                }
                $('#editInAndOut-name').val(name);
                $('#editInAndOut-content').val(content);
            }
        }
    })
    //点击提交按钮,ajax传输数据
    $('#editInAndOut-btn').unbind('click').click(function () {
        let name = $('#editInAndOut-name').val();
        let content = $('#editInAndOut-content').val();
        if (name === '' || content === '') {
            // alert('登记人与内容不可为空');
            layer.msg('登记人姓名与登记内容不可为空', { icon: 2 })
            return;
        }
        $.ajax({
            type: 'post',
            dataType: 'json',
            data: { 'id': id, 'name': name, 'content': content },
            url: './PHP/editInAndOut.php',
            success: function (res, state, status) {
                if (state != 'success' && status.status != 200) {
                    // alert('数据连接失败');
                    layer.msg('数据连接失败', { icon: 5 })
                    return;
                } else {
                    if (res === 'success') {
                        // alert('修改成功');
                        layer.msg('修改成功', { icon: 1 });
                        showInAndOut();
                    } else {
                        // alert('修改失败');
                        layer.msg('修改失败', { icon: 2 });
                    }
                }
            }
        })
    })
}


//--------------------------------------------------------------------------------------------
//删除登记信息
$(document).on('click', '#delInAndOut', function () {
    //获取id
    let id = $(this).data('id');
    //调用弹出框
    $('#delInAndOut-confirm').modal({});
    //调用函数
    delInAndOut(id);
})

//删除登记信息函数
function delInAndOut(id) {
    $('#delInAndOut-btn').unbind('click').click(function () {
        $.ajax({
            type: 'post',
            dataType: 'json',
            data: { 'id': id },
            url: './PHP/dleInAndOut.php',
            success: function (res, state, status) {
                if (state != 'success' && stauts.stauts != 200) {
                    // alert('数据连接失败');
                    layer.msg('数据连接失败', { icon: 5 })
                    return;
                } else {
                    if (res == 'success') {
                        // alert('删除成功');
                        layer.msg('删除成功', { icon: 1 });
                        showInAndOut();
                    } else {
                        // alert('删除失败');
                        layer.msg('删除失败', { icon: 2 });
                    }
                }
            }
        })
    })
}


//--------------------------------------------------------------------------------------------
//账号审核模块
//显示账号信息列表
$(document).on('click', '#showExamine', function () {
    $('#examine-block').css('display', 'block');
    $('#InAndOut-block').css('display', 'none');
    $('#notice-block').css('display', 'none');
    $('#repair-block').css('display', 'none');
    $('#exchange-block').css('display', 'none');
    $('#discipline-block').css('display', 'none');
    $('#hostel-block').css('display', 'none');
    $('#index-block').css('display', 'none');
    showExamine();
})

function showExamine() {
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: './PHP/showExamine.php',
        success: function (res, state, status) {
            let html = '';
            if (state != 'success' && status.status != 200) {
                layer.msg('数据连接失败', { icon: 5 });
                return;
            } else {
                if (res != 'fail') {
                    for (let i = 0; i < res.length; i++) {
                        html += '<tr>';
                        html += '<td>' + res[i].id + '</td>';
                        html += '<td>' + res[i].account + '</td>';
                        html += '<td>' + res[i].password + '</td>';
                        html += '<td>' + res[i].name + '</td>';
                        html += '<td>' + res[i].number + '</td>';
                        html += '<td>' + res[i].time + '</td>';
                        html += '<td>';
                        html += '<div class="am-btn-toolbar">';
                        html += '<div class="am-btn-group am-btn-group-xs">';
                        html += '<button id="passRegist" type="button" class="am-btn am-btn-default am-btn-xs am-text-secondary" data-id=' + res[i].id + '><span class="am-icon-pencil-square-o"></span> 通过</button>';
                        html += '<button id="rejectRegist"type="button"  class="am-btn am-btn-default am-btn-xs am-text-danger" data-id=' + res[i].id + '><span class="am-icon-trash-o"></span> 驳回</button>';
                        html += '</div>';
                        html += '</div>';
                        html += '</td>';
                    }
                    $('#examine-body').html(html);
                }else{
                    $('#examine-body').html(html);
                }
            }
        }
    })
}


//--------------------------------------------------------------------------------------------
// 通过账号注册
//点击通过按钮
$(document).on('click', '#passRegist', function () {
    let id = $(this).data('id');
    // 调用弹出框
    $('#passRegist-confirm').modal({});
    passRegist(id);
})

//点击通过账号注册弹出框的确定按钮执行的事件
function passRegist(id) {
    $('#passRegist-btn').unbind('click').click(function () {
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id },
            url: "./PHP/passRegist.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败', { icon: 5 })
                } else if (res == 'success') {
                    // alert('已通过!');
                    layer.msg('已通过', { icon: 1 });
                    showExamine();
                } else {
                    // alert('操作失败!');
                    layer.msg('操作失败', { icon: 2 });
                }
            }
        });
    });
}


//--------------------------------------------------------------------------------------------
// 驳回账号注册
//点击驳回按钮
$(document).on('click', '#rejectRegist', function () {
    let id = $(this).data('id');
    // 调用弹出框
    $('#rejectRegist-confirm').modal({});
    rejectRegist(id);
})

//点击驳回账号注册弹出框的确定按钮执行的事件
function rejectRegist(id) {
    $('#rejectRegist-btn').unbind('click').click(function () {
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id },
            url: "./PHP/rejectRegist.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败', { icon: 5 })
                } else if (res == 'success') {
                    // alert('已驳回!');
                    layer.msg('已驳回', { icon: 1 });
                    showExamine();
                } else {
                    // alert('操作失败!');
                    layer.msg('操作失败', { icon: 2 });
                }
            }
        });
    })
}
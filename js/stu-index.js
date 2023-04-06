var nowAccount = '';
//页面加载完毕时隐藏所有内容
$(document).ready(function () {

     //初始化弹窗
     layui.use('layer', function () {
        var layer = layui.layer;
    });

    //页面加载完毕隐藏所有内容
    $('#index-block').css('display', 'block');
    $('#notice-block').css('display', 'none');
    $('#repair-block').css('display', 'none');
    $('#exchange-block').css('display', 'none');
    $('#discipline-block').css('display', 'none');

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
                    layer.msg('登录成功',{icon:1});
                } else {
                    // alert('无权访问');
                    layer.msg('无权访问',{icon:2})
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
                layer.msg('数据连接失败',{icon:5});
                return;
            } else {
                if (res != 'fail') {
                    nowAccount = res;
                    //渲染用户名
                    $.ajax({
                        type: 'post',
                        dataType: 'json',
                        data: { 'account': nowAccount },
                        url: './PHP/findUserByAccount.php',
                        success: function (res, state, status) {
                            // console.log(nowAccount);
                            let username = '';
                            if (state != 'success' && status != 200) {
                                // alert('数据连接失败');
                                layer.msg('数据连接失败',{icon:5});
                                return;
                            } else {
                                if (res != 'fail') {
                                    for (let i = 0; i < res.length; i++) {
                                        username = res[i].name;
                                    }
                                    $('#username').after(' ' + username + ' ');
                                    // console.log(username);
                                }
                            }
                        }
                    })
                }
            }
        }
    })

    $('#nav-box>li>a').on('click', function () {
        $(this).addClass('active');
        $(this).parents().siblings('li').children('a').removeClass('active');
    })
})


//--------------------------------------------------------------------------------------------
//退出登录
$('#logout').unbind('click').click(function () {
    $.ajax({
        type: 'post',
        url: './PHP/delSession.php',
        success: function (res, state, status) {
            // console.log('state:'+state+',status:'+status.status);
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败',{icon:5});
            } else {
                // alert('注销成功!');
                layer.msg('注销成功',{icon:6});
                setTimeout(() => {
                    location.href = './login.html';
                }, 700);
            }
        }
    })
})


//--------------------------------------------------------------------------------------------
//学生信息
$(document).on('click', '#stuInfo', function () {
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
                layer.msg('数据连接失败',{icon:5});
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
                    $('#stuInfo-name').val(name);
                    $('#stuInfo-number').val(number);
                    $('#stuInfo-state').val(sta);
                }
            }
        }
    })
})

//--------------------------------------------------------------------------------------------
//编辑学生信息
$(document).on('click', '#editStuInfo', function () {
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
                layer.msg('数据连接失败',{icon:5});
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
                    $('#editStuInfo-name').val(name);
                    $('#editStuInfo-number').val(number);
                    $('#editStuInfo-state').val(sta);
                }
            }
        }
    });
    editStuInfo();
});

//--------------------------------------------------------------------------------------------
//编辑学生函数
function editStuInfo() {
    $('#editStuInfo-btn').unbind('click').click(function () {
        let name = $('#editStuInfo-name').val();
        let number = $('#editStuInfo-number').val();
        let sta = '';
        if ($('#editStuInfo-state').val() == '管理员') {
            sta = '1';
        } else if ($('#editStuInfo-state').val() == '学生') {
            sta = '0';
        }
        if (name === '' || number === '' || sta === '') {
            // alert('内容不可为空');
            layer.msg('内容不可为空',{icon:1});
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
                    layer.msg('数据连接失败',{icon:5});
                } else {
                    if (res == 'success') {
                        // alert('修改成功');
                        layer.msg('修改成功',{icon:1});
                    } else {
                        // alert('修改失败');
                        layer.msg('修改失败',{icon:2});
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
})


//--------------------------------------------------------------------------------------------
//显示公告
//点击公告按钮时显示公告内容,调用ajax刷新数据
$(document).on('click', '#showNotice', function () {
    $('#notice-block').css('display', 'block');
    $('#repair-block').css('display', 'none');
    $('#exchange-block').css('display', 'none');
    $('#discipline-block').css('display', 'none');
    $('#index-block').css('display', 'none');
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
                layer.msg('数据连接失败',{icon:5});
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


//--------------------------------------------------------------------------------------------
//显示报修信息
//点击报修按钮时显示公告内容,调用ajax刷新数据
$(document).on('click', '#showMyRepair', function () {
    $('#repair-block').css('display', 'block');
    $('#notice-block').css('display', 'none');
    $('#exchange-block').css('display', 'none');
    $('#discipline-block').css('display', 'none');
    $('#index-block').css('display', 'none');
    showMyRepair();
})

//显示报修函数
function showMyRepair() {
    $.ajax({
        type: "post",
        dataType: "json",
        data: { 'account': nowAccount },
        url: "./PHP/showMyRepair.php",
        success: function (res, state, status) {
            if (state != 'success' && status.stauts != 200) {
                // alert('数据连接失败');
                layer.msg('数据连接失败',{icon:5});
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
                        if (res[i].state == '0') {
                            html += '<td>未审核</td>';
                            html += '<td>';
                            html += '<div class="am-btn-toolbar">';
                            html += '<div class="am-btn-group am-btn-group-xs">';
                            html += '<button id="editRepair" type="button" class="am-btn am-btn-default am-btn-xs am-text-secondary" data-id=' + res[i].id + '><span class="am-icon-pencil-square-o"></span> 编辑</button>';
                            html += '<button id="delRepair"type="button"  class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"data-id=' + res[i].id + '><span class="am-icon-trash-o"></span> 删除</button>';
                            html += '</div>';
                            html += '</div>';
                            html += '</td>';
                        } else if (res[i].state == '1') {
                            html += '<td>驳回</td>';
                            html += '<td>';
                            html += '<div class="am-btn-toolbar">';
                            html += '<div class="am-btn-group am-btn-group-xs">';
                            html += '<button id="editRepair" type="button" class="am-btn am-btn-default am-btn-xs am-text-secondary" data-id=' + res[i].id + ' disabled><span class="am-icon-pencil-square-o"></span> 编辑</button>';
                            html += '<button id="delRepair"type="button"  class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"data-id=' + res[i].id + '><span class="am-icon-trash-o"></span> 删除</button>';
                            html += '</div>';
                            html += '</div>';
                            html += '</td>';
                        } else {
                            html += '<td>通过</td>';
                            html += '<td>';
                            html += '<div class="am-btn-toolbar">';
                            html += '<div class="am-btn-group am-btn-group-xs">';
                            html += '<button id="editRepair" type="button" disabled class="am-btn am-btn-default am-btn-xs am-text-secondary" data-id=' + res[i].id + '><span class="am-icon-pencil-square-o"></span> 编辑</button>';
                            html += '<button id="delRepair"type="button"  disabled class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"data-id=' + res[i].id + '><span class="am-icon-trash-o"></span> 删除</button>';
                            html += '</div>';
                            html += '</div>';
                            html += '</td>';
                        }

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
// 提交报修
//点击提交报修按钮,调用ajax向PHP文件传输参数
$(document).on('click', '#addRepair-btn', function () {
    addRepair();
})
//添加报修函数
function addRepair() {
    let hostelId = $('#addRepair-hostelId').val();
    let trouble = $('#addRepair-trouble').val();
    let reporter = $('#addRepair-reporter').val();
    if (hostelId === '' || trouble === '' || reporter === '') {
        // alert('内容不可为空!');
        layer.msg('内容不可为空',{icon:2});
        return;
    }
    $.ajax({
        type: "post",
        dataType:'json',
        data: { 'account': nowAccount, 'hostelId': hostelId, 'trouble': trouble, 'reporter': reporter },
        url: "./PHP/addRepair.php",
        success: function (res, state, status) {
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败',{icon:5});
            } else {
                if (res == 'success') {
                    // alert('添加成功');
                    layer.msg('添加成功',{icon:1});
                    showMyRepair();
                } else {
                    // alert('添加失败');
                    layer.msy('添加失败',{icon:2});
                }
            }
        }
    })
    $('#addRepair-hostelId').val('');
    $('#addRepair-trouble').val('');
    $('#addRepair-reporter').val('');
}


//--------------------------------------------------------------------------------------------
// 编辑报修信息
//点击编辑按钮
$(document).on('click', '#editRepair', function () {
    let id = $(this).data('id');
    $.ajax({
        type: "post",
        dataType: "json",
        data: { 'id': id },
        url: "./PHP/findRepairById.php",
        success: function (res, state, status) {
            // console.log(res);
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败',{icon:5});
            } else {
                for (let i = 0; i < res.length; i++) {
                    var hostelId = res[i].hostelId;
                    var trouble = res[i].trouble;
                    var reporter = res[i].reporter;
                }
                $('#editRepair-hostelId').val(hostelId);
                $('#editRepair-trouble').val(trouble);
                $('#editRepair-reporter').val(reporter);
            }
        }
    })
    // 调用弹出框
    $('#editRepair-confirm').modal({});
    editRepair(id);
})

//点击编辑报修信息弹出框的提交按钮执行的事件
function editRepair(id) {
    $('#editRepair-btn').unbind('click').click(function () {
        let hostelId = $('#editRepair-hostelId').val();
        let trouble = $('#editRepair-trouble').val();
        let reporter = $('#editRepair-reporter').val();
        if (hostelId === '' || trouble === '' || reporter === '') {
            // alert('内容不可为空!');
            layer.msg('内容不可为空',{icon:2});
            return
        }
        // console.log(hostelId+trouble+reporter);
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id, 'hostelId': hostelId, 'trouble': trouble, 'reporter': reporter },
            url: "./PHP/editRepair.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败',{icon:5});
                } else if (res == 'success') {
                    // alert('修改成功!');
                    layer.msg('修改成功',{icon:1});
                    showMyRepair();
                } else {
                    // alert('修改失败!');
                    layer.msg('修改失败',{icon:2});
                }
            }
        })
    })
}


//--------------------------------------------------------------------------------------------
// 删除报修信息
//点击删除按钮
$(document).on('click', '#delRepair', function () {
    let id = $(this).data('id');
    $('#delRepair-confirm').modal({});
    delRepair(id);
})

//点击删除信息弹出框的确定按钮执行的事件
function delRepair(id) {
    $('#delRepair-btn').unbind('click').click(function () {
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id },
            url: "./PHP/delRepair.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败',{icon:5});
                } else if (res == 'success') {
                    // alert('删除成功!');
                    layer.msg('删除成功',{icon:1});
                    showMyRepair();
                } else {
                    // alert('删除失败!');
                    layer.msg('删除失败',{icon:2});
                }
            }
        })
    })
}


//--------------------------------------------------------------------------------------------
//显示换宿信息
//点击换宿按钮时显示公告内容,调用ajax刷新数据
$(document).on('click', '#showMyExchange', function () {
    $('#repair-block').css('display', 'none');
    $('#notice-block').css('display', 'none');
    $('#exchange-block').css('display', 'block');
    $('#discipline-block').css('display', 'none');
    $('#index-block').css('display', 'none');
    showMyExchange();
})

//显示换宿信息函数
function showMyExchange() {
    $.ajax({
        type: "post",
        dataType: "json",
        data: { 'account': nowAccount },
        url: "./PHP/showMyExchange.php",
        success: function (res, state, status) {
            if (state != 'success' && status.stauts != 200) {
                // alert('数据连接失败');
                layer.msg('数据连接失败',{icon:5});
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
                        if (res[i].state == '0') {
                            html += '<td>未审核</td>';
                            html += '<td>';
                            html += '<div class="am-btn-toolbar">';
                            html += '<div class="am-btn-group am-btn-group-xs">';
                            html += '<button id="editExchange" type="button" class="am-btn am-btn-default am-btn-xs am-text-secondary" data-id=' + res[i].id + '><span class="am-icon-pencil-square-o"></span> 编辑</button>';
                            html += '<button id="delExchange"type="button"  class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"data-id=' + res[i].id + '><span class="am-icon-trash-o"></span> 删除</button>';
                            html += '</div>';
                            html += '</div>';
                            html += '</td>';
                        } else if (res[i].state == '1') {
                            html += '<td>驳回</td>';
                            html += '<td>';
                            html += '<div class="am-btn-toolbar">';
                            html += '<div class="am-btn-group am-btn-group-xs">';
                            html += '<button id="editExchange" type="button" class="am-btn am-btn-default am-btn-xs am-text-secondary" data-id=' + res[i].id + ' disabled><span class="am-icon-pencil-square-o"></span> 编辑</button>';
                            html += '<button id="delExchange"type="button"  class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"data-id=' + res[i].id + '><span class="am-icon-trash-o"></span> 删除</button>';
                            html += '</div>';
                            html += '</div>';
                            html += '</td>';
                        } else {
                            html += '<td>通过</td>';
                            html += '<td>';
                            html += '<div class="am-btn-toolbar">';
                            html += '<div class="am-btn-group am-btn-group-xs">';
                            html += '<button id="editExchange" type="button" disabled class="am-btn am-btn-default am-btn-xs am-text-secondary" data-id=' + res[i].id + '><span class="am-icon-pencil-square-o"></span> 编辑</button>';
                            html += '<button id="delExchange"type="button"  disabled class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only"data-id=' + res[i].id + '><span class="am-icon-trash-o"></span> 删除</button>';
                            html += '</div>';
                            html += '</div>';
                            html += '</td>';
                        }

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
// 提交换宿申请
//点击提交按钮,调用ajax向PHP文件传输参数
$(document).on('click', '#addExchange-btn', function () {
    addExchange();
})
//添加换宿函数
function addExchange() {
    let reporter = $('#addExchange-reporter').val();
    let old = $('#addExchange-old').val();
    let newHostel = $('#addExchange-new').val();
    let cause = $('#addExchange-cause').val();
    if (old === '' || newHostel === '' || cause === '' || reporter === '') {
        // alert('内容不可为空!');
        layer.msg('数据连接失败',{icon:5});
        return;
    }
    $.ajax({
        type: "post",
        data: { 'account': nowAccount, 'reporter': reporter, 'old': old, 'new': newHostel, 'cause': cause },
        url: "./PHP/addExchange.php",
        success: function (res, state, status) {
            if (state != 'success' && status.status != 200) {
                alert('数据连接失败!');
            } else {
                if (state == 'success') {
                    // alert('添加成功');
                    layer.msg('添加成功',{icon:1});
                    showMyExchange();
                } else {
                    // alert('添加失败');
                    layer.msg('添加失败',{icon:2});
                }
            }
        }
    })
    $('#addExchange-reporter').val('');
    $('#addExchange-old').val('');
    $('#addExchange-new').val('');
    $('#addExchange-cause').val('');
}

//--------------------------------------------------------------------------------------------
// 编辑换宿信息
//点击编辑按钮
$(document).on('click', '#editExchange', function () {
    let id = $(this).data('id');
    $.ajax({
        type: "post",
        dataType: "json",
        data: { 'id': id },
        url: "./PHP/findExchangeById.php",
        success: function (res, state, status) {
            // console.log(res);
            if (state != 'success' && status.status != 200) {
                // alert('数据连接失败!');
                layer.msg('数据连接失败',{icon:5});
            } else {
                for (let i = 0; i < res.length; i++) {
                    var reporter = res[i].reporter;
                    var old = res[i].old;
                    var newHostel = res[i].new;
                    var cause = res[i].cause;
                }
                $('#editExchange-reporter').val(reporter);
                $('#editExchange-old').val(old);
                $('#editExchange-new').val(newHostel);
                $('#editExchange-cause').val(cause);
            }
        }
    })
    // 调用弹出框
    $('#editExchange-confirm').modal({});
    editExhcange(id);
})

//点击编辑报修信息弹出框的提交按钮执行的事件
function editExhcange(id) {
    $('#editExchange-btn').unbind('click').click(function () {
        let reporter = $('#editExchange-reporter').val();
        let old = $('#editExchange-old').val();
        let newHostel = $('#editExchange-new').val();
        let cause = $('#editExchange-cause').val();
        if (reporter === '' || old === '' || newHostel === '' || cause === '') {
            // alert('内容不可为空!');
            layer.msg('内容不可为空',{icon:2});
            return
        }
        // console.log(reporter+old+newHostel+cause);
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id, 'old': old, 'new': newHostel, 'reporter': reporter, 'cause': cause },
            url: "./PHP/editExchange.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败',{icon:5});
                } else if (res == 'success') {
                    // alert('修改成功!');
                    layer.msg('修改成功',{icon:1});
                    showMyExchange();
                } else {
                    // alert('修改失败!');
                    layer.msg('修改失败',{icon:2});
                }
            }
        })
    })
}


//--------------------------------------------------------------------------------------------
// 删除换宿信息
//点击删除按钮
$(document).on('click', '#delExchange', function () {
    let id = $(this).data('id');
    $('#delExchange-confirm').modal({});
    delExchange(id);
})

//点击删除信息弹出框的确定按钮执行的事件
function delExchange(id) {
    $('#delExchange-btn').unbind('click').click(function () {
        $.ajax({
            type: "post",
            dataType: "json",
            data: { 'id': id },
            url: "./PHP/delExchange.php",
            success: function (res, state, status) {
                // console.log(res);
                if (state != 'success' && status.stauts != 200) {
                    // alert('数据连接失败!');
                    layer.msg('数据连接失败',{icon:5});
                } else if (res == 'success') {
                    // alert('删除成功!');
                    layer.msg('删除成功',{icon:1});
                    showMyExchange();
                } else {
                    // alert('删除失败!');
                    layer.msg('删除失败',{icon:2});
                }
            }
        })
    })
}


//--------------------------------------------------------------------------------------------
//显示纪律列表
//点击纪律按钮时显示纪律内容,调用ajax刷新数据
$(document).on('click', '#showDiscipline', function () {
    $('#discipline-block').css('display', 'block');
    $('#notice-block').css('display', 'none');
    $('#repair-block').css('display', 'none');
    $('#exchange-block').css('display', 'none');
    $('#index-block').css('display', 'none');   
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
                layer.msg('数据连接失败',{icon:5});
            } else {
                if (res != 'fail') {
                    let html = '';
                    for (let i = 0; i < res.length; i++) {
                        html += '<tr>';
                        html += '<td>' + res[i].Id + '</td>';
                        html += '<td>' + res[i].content + '</td>';
                        html += '<td>' + res[i].time + '</td>';
                        html += '<td>';
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


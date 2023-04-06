<?php
//引入数据库连接池
include './db.php';
//获取参数
$account = $_POST['account'];
$reporter = $_POST['reporter'];
$old = $_POST['old'];
$new = $_POST['new'];
$cause = $_POST['cause'];
//定义SQL
$sql = "insert into exchange (reporter,old,new,cause,account,state) values ('{$reporter}','{$old}','{$new}','{$cause}','{$account}','0')";
//执行SQL
$res = $conn->query($sql);
if($res === TRUE){
    echo json_encode('success');
    $conn->close();
}else{
    echo json_encode('fail');
    $conn->close();
}
?>
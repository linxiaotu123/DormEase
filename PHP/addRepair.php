<?php
//引入数据库连接池
include './db.php';
//获取参数
$account = $_POST['account'];
$hostelId = $_POST['hostelId'];
$trouble = $_POST['trouble'];
$reporter = $_POST['reporter'];
//定义SQL
$sql = "insert into repair (hostelId,trouble,reporter,account,state) values ('{$hostelId}','{$trouble}','{$reporter}','{$account}','0')";
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
<?php
//引入数据库连接池
include './db.php';
//获取参数
$hostelId = $_POST['hostelId'];
$member1 = $_POST['member1'];
$member2 = $_POST['member2'];
$member3 = $_POST['member3'];
$member4 = $_POST['member4'];
//定义SQL
$sql = "insert into hostel (hostelId,member1,member2,member3,member4) values ('{$hostelId}','{$member1}','{$member2}','{$member3}','{$member4}')";
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
<?php
//引入数据库连接池
include './db.php';
//获取参数
$content = $_POST['content'];
//定义SQL
$sql = "insert into discipline (content) values ('{$content}')";
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
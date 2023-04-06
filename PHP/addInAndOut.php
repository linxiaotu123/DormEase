<?php
//引入数据库连接池
include './db.php';
//获取参数
$name = $_POST['name'];
$content = $_POST['content'];
//定义SQL
$sql = "insert into inandout (name,content) values ('{$name}','{$content}')";
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
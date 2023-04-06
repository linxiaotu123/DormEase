<?php
//引入数据库连接池
include './db.php';
//获取变量
$id = $_POST['id'];
//定义sql语句
$sql = "select * from hostel where id = '{$id}'";

//执行SQL
$res = $conn->query($sql);
$arr = array();
if($res->num_rows>0){
    while($row = $res->fetch_assoc()){
        $arr[] = $row;
    }
    echo json_encode($arr);
    $conn->close();
}else{
    echo json_encode('fail');
    $conn->close();
}
?>
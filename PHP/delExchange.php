<?php
    //引入数据库连接池
    include './db.php';
    //接收数据
    $id = $_POST['id'];
    //定义SQL
    $sql = "delete from exchange where id = '{$id}'";
    //执行SQL
    $res = $conn->query($sql);
    if($res === TRUE){
        echo json_encode('success');
        $conn->close();
    }else{
        // echo "fail";
        echo json_encode('fail');
        $conn->close();
    }
?>
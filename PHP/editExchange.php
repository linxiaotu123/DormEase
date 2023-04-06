<?php
    //引入数据库连接池
    include './db.php';
    //接收数据
    $id = $_POST['id'];
    $reporter = $_POST['reporter'];
    $old = $_POST['old'];
    $new = $_POST['new'];
    $cause = $_POST['cause'];
    //定义SQL
    $sql = "update exchange set reporter = '{$reporter}',old = '{$old}',new = '{$new}',cause = '{$cause}' where id = '{$id}'";
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
<?php
    //引入数据库连接池
    include './db.php';
    //接收数据
    $id = $_POST['id'];
    $hostelId = $_POST['hostelId'];
    $trouble = $_POST['trouble'];
    $reporter = $_POST['reporter'];
    //定义SQL
    $sql = "update repair set hostelId = '{$hostelId}', trouble = '{$trouble}', reporter= '{$reporter}' where id = '{$id}'";
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
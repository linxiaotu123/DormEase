<?php
    //引入数据库连接池
    include './db.php';
    //接收数据
    $account = $_POST['account'];
    $name = $_POST['name'];
    $number = $_POST['number'];
    $state = $_POST['state'];
    //定义SQL
    $sql = "update user set name = '{$name}',number = '{$number}',state = '{$state}' where account = '{$account}'";
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
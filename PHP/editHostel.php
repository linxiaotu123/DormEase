<?php
    //引入数据库连接池
    include './db.php';
    //接收数据
    $id = $_POST['id'];
    $hostelId = $_POST['hostelId'];
    $member1 = $_POST['member1'];
    $member2 = $_POST['member2'];
    $member3 = $_POST['member3'];
    $member4 = $_POST['member4'];
    //定义SQL
    $sql = "update hostel set hostelId = '{$hostelId}',member1= '{$member1}',member2= '{$member2}',member3= '{$member3}',member4= '{$member4}' where id = '{$id}'";
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
<?php
//  启动会话，这步必不可少
session_start();
//  判断是否登陆
if (isset($_SESSION["account"])) {
    echo json_encode($_SESSION["account"]);
} else {
    //  验证失败，将 $_SESSION["login"] 置为 false
    $_SESSION["account"] = null;
    echo json_encode('fail');
}
?>
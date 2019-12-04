<?php
$msg = $_GET['msg'];
$url = "http://api.qingyunke.com/api.php?key=free&appid=0&msg="."($msg)";
$result = file_get_contents($url);
echo $result; 
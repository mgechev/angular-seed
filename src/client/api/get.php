<?php
    require_once('db.php');

    $db = new Db();
    $rows = $db -> select("SELECT * FROM locations");
    echo json_encode($rows);
?>
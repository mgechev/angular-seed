<?php
    require_once('db.php');

    $request = json_decode($_POST['data']);
    $name = $request->name;
    $lat = $request->lat;
    $long = $request->long;
    $submitter = $request->submitter;
    $home = $request->home;
    $verified = 0;

    $db = new Db();
    $result = $db -> query("INSERT INTO locations VALUES ('$name', '$lat', '$long', '$verified', '$submitter', '$home')");
    echo json_encode($result);
?>
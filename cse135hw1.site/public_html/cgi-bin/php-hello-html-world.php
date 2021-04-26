<?php
header('Cache-Control: no-cache');
header('Content-type: text/html');
print "<html>";
print "<head>";
print "<title>Hello, PHP!</title>";
print "</head>";
print "<body>";

print "<h1>Timo & Bradley were here - Hello, PHP!</h1>";
print "<p>This page was generated with PHP</p>";
date_default_timezone_set("America/Los_Angeles");
$date = date("m-d-y");
$time = date("h:ia");
print "<p>Current Date: ". $date . " Current Time: " . $time ."</p>";

# IP Address is an environment variable when using CGI
$address = $_SERVER['REMOTE_ADDR'];
print "<p>Your IP Address: " . $address . "</p>";
print "</body>";
print "</html>";
?>

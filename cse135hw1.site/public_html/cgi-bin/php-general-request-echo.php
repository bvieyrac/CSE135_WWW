<?php
header('Cache-Control: no-cache');
header('Content-type: text/html');


print '<!DOCTYPE html><html><head><title>General Request Echo</title></head><body><h1 align="center">General Request Echo</h1><hr>';

$Protocol = $_SERVER['SERVER_PROTOCOL'];
$Method = $_SERVER["REQUEST_METHOD"];
$Qstring = $_SERVER["QUERY_STRING"];

# HTTP Protocol, HTTP Method, and the Query String are all environment variables
print "<p><b>HTTP Protocol: </b>$Protocol</p>";
print "<p><b>HTTP Method: </b>$Method</p>";
print "<p><b>Query String: </b>$Qstring</p>";

$Body = file_get_contents('php://input');
print "<b>Message Body: </b>$Body <br />\n";


print "</body></html>";

?>
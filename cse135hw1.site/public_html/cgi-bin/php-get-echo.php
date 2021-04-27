<?php
header('Cache-Control: no-cache');
header('Content-type: text/html');


print '<!DOCTYPE html><html><head><title>GET Request Echo</title></head><body><h1 align="center">GET Request Echo</h1><hr>';

$Qstring = $_SERVER['QUERY_STRING'];

print "<b>Query String:</b> $Qstring <br />\n";

parse_str($Qstring, $array);

foreach ($array as $key => $value){
    print "<b>" . $key . "</b>:  " . $value;
    print "<br/>";    
}

print "</body></html>";

?>
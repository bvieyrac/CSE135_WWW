<?php
header('Cache-Control: no-cache');
header('Content-type: text/html');


print '<!DOCTYPE html><html><head><title>POST Request Echo</title></head><body><h1 align="center">POST Request Echo</h1><hr>';

$Body = file_get_contents('php://input');

print "<b>Message Body:</b> $Body <br />\n";

parse_str($Body, $array);

foreach ($array as $key => $value){
    print "<b>" . $key . "</b>:  " . $value;
    print "<br/>";    
}



print "</body></html>";

?>
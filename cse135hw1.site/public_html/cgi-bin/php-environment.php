<?php
header('Cache-Control: no-cache');
header('Content-type: text/html');

print '<!DOCTYPE html><html><head><title>Environment Variables</title></head><body><h1 align="center">Environment Variables</h1><hr>';

foreach ($_SERVER as $key => $value){
    print "<b>" . $key . "</b>:  " . $value;
    print "</br>";    
}

print "</body></html>";
?>
#!/usr/bin/php
<?php
print "Cache-Control: no-cache\n";
print "Content-type: text/plain\n\n";
print "<html>";
print "<head>";
print "<title>Hello, PHP!</title>";
print "</head>";
print "<body>";

print "<h1>Timo & Bradley were here - Hello, PHP!</h1>";
print "<p>This page was generated with PHP</p>";

//$date = localtime();
//print "<p>Current Time: $date</p>";

# IP Address is an environment variable when using CGI
//$address = $ENV{REMOTE_ADDR};
//print "<p>Your IP Address: $address</p>";

print "</body>";
print "</html>";
?>
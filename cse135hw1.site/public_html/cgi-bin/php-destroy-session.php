<?php
session_start();

header('Content-type: text/html');

// remove all session variables
session_unset();

// destroy the session
session_destroy();

print "<html>";
print "<head>";
print "<title>PHP Session Destroyed</title>";
print "</head>";
print "<body>";
print "<h1>Session Destroyed</h1>";
print "<a href=\"/sessions/php-cgiform.html\">Back to the PHP CGI Form</a><br />";
print "<a href=\"/cgi-bin/php-sessions1.php\">Back to Page 1</a><br />";
print "<a href=\"/cgi-bin/php-sessions2.php\">Back to Page 2</a>";
print "</body>";
print "</html>";

?>
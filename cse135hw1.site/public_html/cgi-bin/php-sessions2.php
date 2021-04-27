<?php
session_start();

header('Content-type: text/html');

$name = $_SESSION["Username"];

print "<html>";
print "<head>";
print "<title>PHP Sessions</title>";
print "</head>";
print "<body>";

print "<h1>PHP Sessions Page 2</h1>";

if ($name){
	print("<p><b>Name:</b> $name");
}else{
	print "<p><b>Name:</b> You do not have a name set</p>";
}
print "<br/><br/>";
print "<a href=\"/cgi-bin/php-sessions1.php\">Session Page 1</a><br/>";
print "<a href=\"/sessions/php-cgiform.html\">PHP CGI Form</a><br />";
print "<form style=\"margin-top:30px\" action=\"/cgi-bin/php-destroy-session.php\" method=\"get\">";
print "<button type=\"submit\">Destroy Session</button>";
print "</form>";

print "</body>";
print "</html>";
?>
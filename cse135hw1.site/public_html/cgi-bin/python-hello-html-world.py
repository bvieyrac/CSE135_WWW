#!/usr/bin/python

## Import modules for CGI handling
import cgi, cgitb

##  Headers
print "Cache-Control: no-cache\n"
print "Content-type:text/html\n\n"

##  Head
print "<html>"
print "<head>"
print "<title>Hello World!! by Timo Chen</title>"
print "</head>"

##  Body
print "<body>"

print "<h1>Timo & Bradley were here - Hello, Perl!</h1>"
print "<p>This page was generated with the Perl programming langauge</p>

$date = localtime()
print "<p>Current Time: $date</p>"

# IP address
$address = $ENV{REMOTE_ADDR}
print "<p>Your IP Address: $address</p>"

print "</body>"
print "</html>"
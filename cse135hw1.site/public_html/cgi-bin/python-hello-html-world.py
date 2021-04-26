#!/usr/bin/python3

## Import modules for CGI handling
import cgi, cgitb
from datetime import date

##  Headers
print("Cache-Control: no-cache")
print("Content-type:text/html\n")

##  Head
print("<html>")
print("<head>")
print("<title>Hello World!! by Timo Chen</title>")
print("</head>")

##  Body
print("<body>")

print("<h1>Timo & Bradley were here - Hello, Perl!</h1>")
print("<p>This page was generated with the Perl programming langauge</p>")

current_date = date.today()
print("<p>Current Time:",current_date,"</p>")

# IP address
#$address = $ENV{REMOTE_ADDR}
#print "<p>Your IP Address: $address</p>"

print("</body>")
print("</html>")

#!/usr/bin/python3

## Import modules for CGI handling
import cgi, cgitb
import socket
import os
from datetime import date
from datetime import datetime

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

print("<h1>Timo & Bradley were here - Hello, Python!</h1>")
print("<p>This page was generated with the Python programming langauge</p>")

current_date = datetime.today()

print("<p>Current Time:",current_date.now().strftime("%a %b %d %H:%M:%S %Y"),"</p>")

# IP address
hostname = os.environ['REMOTE_ADDR']
print("<p>Your IP Address: ", hostname, "</p>")

print("</body>")
print("</html>")

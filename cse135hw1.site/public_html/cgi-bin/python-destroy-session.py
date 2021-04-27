#!/usr/bin/python3

## Import modules for CGI handling
import os
import sys

##  Headers - a MUST
print("Cache-Control: no-cache")
print("Set-Cookie: destroyed")
print("Content-type: text/html\n")

## HTML
print("<html>")
print("<head><title>Session Destroyed</title></head>")
print("<body>")
print("<h1>Session Destroyed</h1>")

print("<a href=\"/sessions/python-cgiform.html\">Python CGI Form</a><br />")
print("<a href=\"/cgi-bin/python-sessions-1.py\">Back to Page 1</a><br/>")
print("<a href=\"/cgi-bin/python-sessions-2.py\">Back to Page 2</a><br/>")

## print HTML footer
print("</body></html>")

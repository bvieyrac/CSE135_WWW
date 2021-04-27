#!/usr/bin/python3

## Import modules for CGI handling
import cgi, cgitb
import socket
import os
import json
import sys
import requests
import random
import datetime, time
from datetime import date
from datetime import datetime
from http import cookies

##  Headers - a MUST
print("Cache-Control: no-cache")

# Get the for value
form = cgi.FieldStorage()
username = form.getvalue('username')

# Set cookie through header
if username:
    print("Content-type: text/html")
    print("Set-Cookie: %s\n" %username)
else:
    print("Content-type: text/html\n")


## HTML
print("<html><head><title>Python Sessions</title></head> \
        <body><h1 align=center>Python Sessions Page 1</h1> \
        <hr/>\n")


if username:
    print("<p><b>Name:</b> ", username)
elif (os.getenv('HTTP_COOKIE') is not None and 'destroyed' not in os.getenv('HTTP_COOKIE')):
    print('<tr><td>Cookie:</td><td>', os.getenv('HTTP_COOKIE'), '</td></tr>\n')
else:
    print("<p><b>Name:</b> You do not have a name set</p>")

print("<br/><br/>")
print("<a href=\"/cgi-bin/python-sessions-2.py\">Session Page 2</a><br/>")
print("<a href=\"/sessions/python-cgiform.html\">Python CGI Form</a><br />")
print("<form style=\"margin-top:30px\" action=\"/cgi-bin/python-destroy-session.py\" method=\"get\">")
print("<button type=\"submit\">Destroy Session</button>")
print("</form>")

## print HTML footer
print("</body></html>")

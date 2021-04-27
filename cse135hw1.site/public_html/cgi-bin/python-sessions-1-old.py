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
print("Content-type: text/html\n")

## HTML
print("<html><head><title>Python Sessions</title></head> \
        <body><h1 align=center>Python Sessions Page 1</h1> \
        <hr/>\n")

# Create a session
form = cgi.FieldStorage()
username = form.getvalue('username')

c = {}

if 'HTTP_COOKIE' in os.environ:
    cookie_list = os.environ['HTTP_COOKIE'].split(';')
    for cookie_string in cookie_list:
        key, value = cookie_string.split('=')
        c[key.strip()] = value.strip()


name = ''
if 'username' in c.keys():
    name = c['username']
elif username != '':
    #c['username'] = username
    name = username
    # new cookie object
    new_cookie = cookies.SimpleCookie()

    # set cookie
    random_id = random.randint(0,1000000000) + int(time.time()) 
    new_cookie['unique_id'] = random_id
    new_cookie['username'] = username
    
    print("Content-type: text/html;charset=utf-8")
    print(new_cookie)
    print("\n")

print("name = ", name)

if name != '':
    print("<p><b>Name:</b> ", username)
else:
    print("<p><b>Name:</b> You do not have a name set</p>")

print("<br/><br/>")
print("<a href=\"/cgi-bin/python-sessions-2.py\">Session Page 2</a><br/>")
print("<a href=\"/sessions/python-cgiform.html\">Perl CGI Form</a><br />")
print("<form style=\"margin-top:30px\" action=\"/cgi-bin/python-destroy-session.py\" method=\"get\">")
print("<button type=\"submit\">Destroy Session</button>")
print("</form>")

## print HTML footer
print("</body></html>")

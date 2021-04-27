#!/usr/bin/python3

## Import modules for CGI handling
import cgi, cgitb
import socket
import os
import json
from datetime import date
from datetime import datetime

##  Headers - a MUST
print("Cache-Control: no-cache")
print("Content-type: text/html\n")

## HTML
print("<html><head><title>GET Request Echo</title></head> \
        <body><h1 align=center>GET Request Echo</h1> \
        <hr/>\n")

# Print out each environment variables
if(os.environ.get('QUERY_STRING')):
    query_string = os.environ.get('QUERY_STRING')
    print("<b>Query String:</b> %s" % (query_string))
    print("<br/>")

    strings = query_string.split('&')
    for s in strings:
        key, val = s.split('=')
        print(key, "=", val, "<br/>")
else:
    print("Query String:")


## print HTML footer
print("</body></html>")

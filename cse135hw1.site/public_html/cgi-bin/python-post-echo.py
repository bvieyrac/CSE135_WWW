#!/usr/bin/python3

## Import modules for CGI handling
import cgi, cgitb
import socket
import os
import json
import sys
from datetime import date
from datetime import datetime

##  Headers - a MUST
print("Cache-Control: no-cache")
print("Content-type: text/html\n")

## HTML
print("<html><head><title>POST Request Echo</title></head> \
        <body><h1 align=center>POST Request Echo</h1> \
        <hr/>\n")

# Print out each environment variables
print("<b>Query String: </b>", end='')
for line in sys.stdin:
    if(len(line) <= 0):
        continue
    query_string = line
    print("%s<br>" % (query_string))

    strings = query_string.split('&')
    for s in strings:
        key, val = s.split('=')
        print(key, "=", val, "<br/>")


## print HTML footer
print("</body></html>")

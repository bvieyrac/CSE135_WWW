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
print("<html><head><title>Environment Variables</title></head> \
        <body><h1 align=center>Environment Variables</h1> \
        <hr/>\n")

# Print out each environment variables
for variable in os.environ.keys():
    print("<b>%s</b>: %s<br>" % (variable, os.environ.get(variable)))

## print HTML footer
print("</body></html>")

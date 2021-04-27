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
print("<html><head><title>General Request Echo</title></head> \
        <body><h1 align=center>General Request Echo</h1> \
        <hr/>\n")

# Print out HTTP Protocol
protocol = os.environ.get('SERVER_PROTOCOL')
print("<b>HTTP Protocol: </b>", protocol, "<br/><br/>")
request_type = os.environ.get('REQUEST_METHOD')
print("<b>HTTP Method: </b>", request_type, "<br/><br/>")

# Print out each environment variables
if(os.environ.get('QUERY_STRING')):
    query_string = os.environ.get('QUERY_STRING')
    print("<b>Query String: </b>", query_string)

    #strings = query_string.split('&')
    #for s in strings:
    #    key, val = s.split('=')
    #    print(key, "=", val)
else:
    print("<b>Query String: </b><br/>")
print("<br/><br/>")

# Print out each environment variables
print("<b>Message Body: </b>", end='')
if(not sys.stdin.isatty()):
    for line in sys.stdin:
        query_string = line
        print(query_string)

        #strings = query_string.split('&')
        #for s in strings:
        #    key, val = s.split('=')
        #    print(key, "=", val)
print("<br/><br/>")


## print HTML footer
print("</body></html>")

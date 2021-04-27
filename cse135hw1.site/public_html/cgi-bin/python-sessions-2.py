#!/usr/bin/python3

## Import modules for CGI handling
import os
import sys

##  Headers - a MUST
print("Cache-Control: no-cache")
print("Content-type: text/html\n")

## HTML
print("<html><head><title>Python Sessions</title></head> \
        <body><h1 align=center>Python Sessions Page 2</h1> \
        <hr/>\n")

print("<table>")

if (os.getenv('HTTP_COOKIE') is not None and 'destroyed' not in os.getenv('HTTP_COOKIE')):
    print('<tr><td>Cookie:</td><td>',os.getenv('HTTP_COOKIE'), '</td></tr>\n')
else:
    print("<p><b>Name:</b> You do not have a name set</p>")

print("</table>")

print("<br/><br/>")
print("<a href=\"/cgi-bin/python-sessions-1.py\">Session Page 1</a><br/>")
print("<a href=\"/sessions/python-cgiform.html\">Python CGI Form</a><br />")
print("<form style=\"margin-top:30px\" action=\"/cgi-bin/python-destroy-session.py\" method=\"get\">")
print("<button type=\"submit\">Destroy Session</button>")
print("</form>")

## print HTML footer
print("</body></html>")

import secrets
import sys
import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
from threading import Timer
import s3

HandlerClass = SimpleHTTPRequestHandler
ServerClass  = BaseHTTPServer.HTTPServer
Protocol     = "HTTP/1.0"

if sys.argv[1:]:
    port = int(sys.argv[1])
else:
    port = 8000
server_address = ('127.0.0.1', port)

HandlerClass.protocol_version = Protocol
HandlerClass.path = secrets.khan_exercises_path 
httpd = ServerClass(server_address, HandlerClass)

sa = httpd.socket.getsockname()
print "Serving HTTP on", sa[0], "port", sa[1], "..."

def render_exercises():
    import os
    from os import listdir
    from os.path import isfile, join
    bucket = s3.ScreenshotsBucket()
    mypath = secrets.khan_exercises_path + "/exercises/"
    onlyfiles = [ f for f in listdir(mypath) if isfile(join(mypath,f)) and "html" in f ]
    for ex_file in onlyfiles:
        os.system("phantomjs render.js http://127.0.0.1:8000/" + secrets.khan_exercises_path + "exercises/" + ex_file)
        pngfile = ex_file.replace(".html",".png")
        bucket.upload_screenshot(pngfile)
    httpd.shutdown()

t = Timer(5.0, render_exercises)
t.start() 

httpd.serve_forever()

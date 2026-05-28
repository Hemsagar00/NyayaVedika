import http.server
import socketserver
import os

PORT = 17777
os.chdir(r'D:\Websites\NyayaVedika-v2\frontend\out')

with socketserver.TCPServer(("127.0.0.1", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
    print(f"Serving at http://127.0.0.1:{PORT}")
    httpd.serve_forever()

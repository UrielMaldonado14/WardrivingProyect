"""
API Server Ejemplo para conectar Raspberry Pi Pico W con la interfaz web

Este es un servidor de ejemplo que podrías usar en el futuro para
recibir datos de la Pico y servir la interfaz web.

USO:
1. La Pico envía datos vía HTTP POST a este servidor
2. El servidor almacena los datos en memoria
3. La interfaz React consulta los datos vía GET

Para correrlo:
    python api_server_example.py

Nota: Este archivo es solo de REFERENCIA. La interfaz actual usa datos mock.
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from datetime import datetime

# Almacenamiento temporal de datos
latest_scan_data = {
    "gps": {"lat": 25.6866, "lon": -100.3161, "fix": True},
    "wifi": [],
    "timestamp": datetime.now().timestamp() * 1000
}

class WardrivingAPIHandler(BaseHTTPRequestHandler):
    
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_OPTIONS(self):
        self._set_headers()
    
    def do_GET(self):
        """Endpoint para que la interfaz web obtenga los datos"""
        if self.path == '/scan':
            self._set_headers()
            self.wfile.write(json.dumps(latest_scan_data).encode())
        elif self.path == '/health':
            self._set_headers()
            self.wfile.write(json.dumps({"status": "ok"}).encode())
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not found"}).encode())
    
    def do_POST(self):
        """Endpoint para que la Pico envíe datos"""
        if self.path == '/upload':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                global latest_scan_data
                latest_scan_data = data
                
                self._set_headers(201)
                self.wfile.write(json.dumps({
                    "status": "success",
                    "message": "Data received"
                }).encode())
                
                print(f"[{datetime.now()}] Datos recibidos: {len(data.get('wifi', []))} redes")
                
            except json.JSONDecodeError:
                self._set_headers(400)
                self.wfile.write(json.dumps({
                    "status": "error",
                    "message": "Invalid JSON"
                }).encode())
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not found"}).encode())
    
    def log_message(self, format, *args):
        # Personalizar logs
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {format % args}")

def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, WardrivingAPIHandler)
    print(f"🚀 Servidor API corriendo en http://localhost:{port}")
    print(f"📡 Endpoints disponibles:")
    print(f"   GET  /scan   - Obtener datos actuales")
    print(f"   POST /upload - Subir datos desde la Pico")
    print(f"   GET  /health - Health check")
    print(f"\n⚠️  Recuerda actualizar App.jsx para usar datos reales")
    httpd.serve_forever()

if __name__ == '__main__':
    try:
        run_server()
    except KeyboardInterrupt:
        print("\n\n👋 Servidor detenido")


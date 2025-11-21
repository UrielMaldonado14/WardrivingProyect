# 🔌 Guía de Integración con Raspberry Pi Pico W

## Opciones para conectar la Pico con la interfaz web

### Opción 1: API REST (Recomendada)

La Pico actúa como servidor HTTP y la interfaz web consulta los datos.

#### En la Pico (MicroPython):

```python
# api_server.py
import socket
import ujson
from wifi_scan import scan_networks
from gps_reader import get_gps_data

def create_response(data):
    response = ujson.dumps(data)
    return f"HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\n\r\n{response}"

def start_server():
    addr = socket.getaddrinfo('0.0.0.0', 80)[0][-1]
    s = socket.socket()
    s.bind(addr)
    s.listen(1)
    
    print('Servidor corriendo en', addr)
    
    while True:
        cl, addr = s.accept()
        request = cl.recv(1024).decode()
        
        if 'GET /scan' in request:
            gps = get_gps_data()
            networks = scan_networks()
            
            response_data = {
                "gps": gps or {"lat": 0, "lon": 0, "fix": False},
                "wifi": networks,
                "timestamp": time.time() * 1000
            }
            
            cl.send(create_response(response_data))
        
        cl.close()
```

#### En la interfaz (src/App.jsx):

```javascript
// Reemplazar la función de mock data:
const fetchRealData = async () => {
  try {
    const response = await fetch('http://IP_DE_TU_PICO/scan');
    const data = await response.json();
    setNetworks(data.wifi);
    setGpsLocation(data.gps);
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
};

useEffect(() => {
  const interval = setInterval(() => {
    fetchRealData();
  }, 5000);
  
  fetchRealData(); // Carga inicial
  return () => clearInterval(interval);
}, []);
```

### Opción 2: WebSocket (Tiempo Real)

Para actualizaciones en tiempo real sin polling.

#### En la Pico:

```python
# Requiere instalar uwebsockets
import uwebsockets
import ujson

def broadcast_data(ws, data):
    ws.send(ujson.dumps(data))

# ... implementación del servidor WebSocket
```

#### En la interfaz:

```javascript
useEffect(() => {
  const ws = new WebSocket('ws://IP_DE_TU_PICO:80');
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setNetworks(data.wifi);
    setGpsLocation(data.gps);
  };
  
  return () => ws.close();
}, []);
```

### Opción 3: Server Intermedio (Python)

Usar `api_server_example.py` como intermediario.

```
[Pico] --POST--> [Server Python] <--GET-- [Interfaz Web]
```

**Ventajas:**
- La Pico no necesita servidor HTTP complejo
- Puedes almacenar historial
- Más fácil de debuggear

#### En la Pico:

```python
import urequests
import ujson

def upload_data(server_url, data):
    try:
        response = urequests.post(
            f"{server_url}/upload",
            headers={'Content-Type': 'application/json'},
            data=ujson.dumps(data)
        )
        print("Datos enviados:", response.status_code)
        response.close()
    except Exception as e:
        print("Error al enviar:", e)

# En tu loop principal:
while True:
    data = {
        "gps": get_gps_data(),
        "wifi": scan_networks(),
        "timestamp": time.time() * 1000
    }
    upload_data("http://IP_DE_TU_SERVER:8000", data)
    time.sleep(10)
```

## 🔍 Pasos para Integrar

### 1. Conectar la Pico a WiFi

```python
# En la Pico
import network

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect('TU_WIFI', 'TU_PASSWORD')

while not wlan.isconnected():
    pass

print('IP de la Pico:', wlan.ifconfig()[0])
```

### 2. Configurar CORS (si usas servidor en la Pico)

```python
# Agregar header en respuestas HTTP:
headers = "Access-Control-Allow-Origin: *\r\n"
```

### 3. Actualizar la interfaz

En `src/App.jsx`, cambiar de datos mock a datos reales:

```javascript
// ANTES (Mock):
const newNetworks = generateMockData();

// DESPUÉS (Real):
const response = await fetch('http://192.168.1.100/scan');
const data = await response.json();
const newNetworks = data.wifi;
```

### 4. Probar la conexión

1. Asegúrate de que la Pico y tu PC estén en la misma red
2. Verifica la IP de la Pico con `wlan.ifconfig()`
3. Prueba desde el navegador: `http://IP_PICO/scan`
4. Deberías ver un JSON con los datos

## 📡 Formato de Datos Esperado

```json
{
  "gps": {
    "lat": 25.6866,
    "lon": -100.3161,
    "fix": true
  },
  "wifi": [
    {
      "ssid": "Red-WiFi",
      "mac": "00:11:22:33:44:55",
      "rssi": -65,
      "security": "WPA2-PSK"
    }
  ],
  "timestamp": 1700000000000
}
```

## 🐛 Troubleshooting

### La interfaz no recibe datos

1. **Verifica la IP**: Asegúrate de usar la IP correcta de la Pico
2. **CORS**: Agrega el header `Access-Control-Allow-Origin: *`
3. **Firewall**: Desactiva temporalmente el firewall de Windows
4. **Red**: Asegúrate de estar en la misma red WiFi

### La Pico no responde

1. **Reinicia la Pico**: Desconecta y vuelve a conectar
2. **Verifica el código**: Asegúrate de que el servidor esté corriendo
3. **Serial Monitor**: Revisa errores en Thonny o tu IDE

### Datos incorrectos

1. **Formato JSON**: Verifica que el JSON sea válido
2. **Tipos de datos**: Asegúrate de enviar números como números, no strings
3. **Coordenadas GPS**: Deben ser decimales (ej: 25.6866, no strings)

## 🚀 Siguientes Pasos

1. ✅ Configurar WiFi en la Pico
2. ✅ Implementar servidor HTTP básico
3. ✅ Probar endpoint `/scan` desde navegador
4. ✅ Integrar con la interfaz React
5. ✅ Agregar manejo de errores
6. ✅ Optimizar frecuencia de actualización

---

¡Buena suerte con tu proyecto! 🎓


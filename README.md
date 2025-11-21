# 🛰️ Wardriving Monitor - Proyecto Sistemas Embebidos

Interfaz web moderna para visualizar datos de wardriving capturados por una **Raspberry Pi Pico W**.

## 📋 Características

- 📡 **Visualización en tiempo real** de redes WiFi detectadas
- 🗺️ **Mapa interactivo** con ubicaciones GPS de las redes
- 📊 **Estadísticas detalladas** (total de redes, abiertas, seguras, señal promedio)
- 🎨 **Diseño moderno y responsivo** con animaciones fluidas
- 🚗 **Simulación de movimiento GPS** (simula wardriving real)
- 🎮 **Controles interactivos** (Iniciar/Detener/Guardar/Ver Offline)
- 💾 **Almacenamiento offline** en LocalStorage
- 🌐 **Simulación de conectividad** a internet
- 🔄 **Auto-actualización** cada 3 segundos durante simulación

## 🚀 Instalación

### Prerrequisitos

- Node.js (v22 o superior)
- npm

### Pasos

1. **Instalar dependencias**
```bash
npm install
```

2. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

3. **Abrir en el navegador**
El navegador se abrirá automáticamente en `http://localhost:3000`

## 🛠️ Tecnologías Utilizadas

- **React** - Framework UI
- **Vite** - Build tool y dev server
- **Leaflet** - Mapas interactivos
- **React-Leaflet** - Integración de Leaflet con React
- **Recharts** - Gráficos (ready para expansión futura)
- **Lucide React** - Iconos modernos

## 📁 Estructura del Proyecto

```
WardrivingProyect/
├── src/
│   ├── components/
│   │   ├── NetworkMap.jsx      # Mapa interactivo
│   │   ├── NetworkList.jsx     # Lista de redes
│   │   └── StatsCards.jsx      # Tarjetas de estadísticas
│   ├── App.jsx                 # Componente principal
│   ├── main.jsx                # Punto de entrada
│   ├── mockData.js             # Datos simulados
│   └── index.css               # Estilos globales
├── gps_reader.py               # Módulo GPS (Pico)
├── wifi_scan.py                # Módulo WiFi (Pico)
├── storage.py                  # Almacenamiento (Pico)
├── main_test.py                # Script principal (Pico)
└── vite.config.js              # Configuración de Vite
```

## 🔌 Integración con Raspberry Pi Pico W

### Modo Demo (Actual)
La interfaz funciona con datos simulados generados en `src/mockData.js`

### Modo Producción (Futuro)
Para conectar con la Pico W real:

1. La Pico debe exponer un endpoint HTTP/WebSocket
2. Modificar `App.jsx` para consumir datos reales:

```javascript
// Reemplazar generateMockData() por:
fetch('http://IP_DE_TU_PICO:puerto/scan')
  .then(res => res.json())
  .then(data => setNetworks(data.wifi))
```

## 📊 Formato de Datos

La interfaz espera datos en este formato:

```json
{
  "gps": {
    "lat": 25.6866,
    "lon": -100.3161,
    "fix": true
  },
  "wifi": [
    {
      "ssid": "RedWiFi",
      "mac": "00:11:22:33:44:55",
      "rssi": -65,
      "security": "WPA2-PSK",
      "lat": 25.6866,
      "lon": -100.3161,
      "timestamp": 1700000000000
    }
  ],
  "timestamp": 1700000000000
}
```

## 🎨 Características Visuales

- **Mapa**: Círculos de colores indican fuerza de señal
  - 🟢 Verde: Señal excelente/buena
  - 🟠 Naranja: Señal regular
  - 🔴 Rojo: Señal débil

- **Seguridad**:
  - 🔓 Candado abierto (verde): Red abierta
  - 🔒 Candado cerrado (rojo): Red encriptada

- **Estadísticas**: Actualización en tiempo real con animaciones

## 📱 Responsivo

La interfaz se adapta a:
- 💻 Desktop (>1024px)
- 📱 Tablet (768px - 1024px)
- 📱 Móvil (<768px)

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```

## 👨‍💻 Autor

Proyecto Final - Sistemas Embebidos
Instituto Tecnológico de Aguascalientes (9no Semestre)

## 📝 Notas

- Los datos mostrados actualmente son **simulados**
- Las ubicaciones GPS en el mapa son del ITA, Aguascalientes
- Para usar con hardware real, modificar la fuente de datos en `App.jsx`

---

🎓 **Proyecto Académico - 2024**


# 🎮 Guía de Simulación

## 🚀 Cómo usar la simulación

La interfaz ahora incluye **controles interactivos** que simulan el comportamiento real del wardriving sin necesidad de la Raspberry Pi Pico W.

### 🎛️ Panel de Control

```
┌──────────────────────────────────────────────────────────────┐
│  [▶ Iniciar]  [■ Detener]  [💾 Guardar]  [📊 Ver (0)]  [🗑️]  │
└──────────────────────────────────────────────────────────────┘
```

### Botones Disponibles

#### 1. ▶️ **Iniciar Simulación**
- Comienza el escaneo automático
- Actualiza GPS cada 3 segundos (simula movimiento)
- Escanea redes WiFi en cada ubicación
- Actualiza el mapa en tiempo real

**Estado**: 🟢 Activo

#### 2. ⏹️ **Detener**
- Pausa la simulación
- Mantiene los datos actuales
- Deja de mover el GPS

**Estado**: 🔴 Detenido

#### 3. 💾 **Guardar Offline**
- Guarda el escaneo actual en LocalStorage
- Incluye: GPS, redes WiFi, timestamp
- Persiste entre sesiones del navegador
- Muestra confirmación con total de registros

**Formato guardado**:
```json
{
  "gps": { "lat": 25.6866, "lon": -100.3161 },
  "wifi": [ /* array de redes */ ],
  "timestamp": 1700000000000
}
```

#### 4. 📊 **Ver Offline (N)**
- Muestra cantidad de registros guardados
- Imprime datos completos en consola (F12)
- Muestra resumen con fechas

**Ejemplo de salida**:
```
📊 Registros offline: 5

Primer registro: 21/11/2024, 14:30:15
Último registro: 21/11/2024, 14:45:22

Ver consola (F12) para detalles completos
```

#### 5. 🗑️ **Limpiar**
- Borra todos los datos offline
- Pide confirmación antes de eliminar
- Reinicia el contador a 0

---

## 🗺️ Simulación de GPS

### Movimiento Automático

La simulación imita el movimiento real de un vehículo:

```javascript
// Cada actualización mueve el GPS ligeramente (alrededor del ITA)
Lat: 21.916400 → 21.916534 → 21.916691 → ...
Lon: -102.292800 → -102.292687 → -102.292545 → ...
```

**Características**:
- ✅ Movimiento aleatorio pequeño (simula conducir)
- ✅ Ubicación inicial: ITA, Aguascalientes
- ✅ Se puede reiniciar a origen
- ✅ Actualización visual en el mapa

### Ubicación Inicial

```
📍 Punto de partida:
   Latitud:  21.9164°N
   Longitud: 102.2928°W
   Ciudad:   Aguascalientes, Aguascalientes
   Lugar:    Instituto Tecnológico de Aguascalientes
   Dirección: Av. Adolfo López Mateos 1801, Bona Gens
```

---

## 📡 Simulación de Redes WiFi

### Generación Dinámica

En cada escaneo se generan **3 a 8 redes** aleatorias:

```javascript
Red_835
├─ MAC: AA:BB:CC:12:34:56
├─ RSSI: -65 dBm (📶📶📶)
├─ Seguridad: WPA2-PSK
└─ Ubicación: Cercana al GPS actual
```

### Tipos de Seguridad

| Tipo | Color | Descripción |
|------|-------|-------------|
| 🔓 OPEN | Verde | Red abierta sin contraseña |
| 🔒 WEP | Naranja | Encriptación débil (obsoleta) |
| 🔒 WPA-PSK | Azul | WPA Personal |
| 🔒 WPA2-PSK | Verde | WPA2 Personal (común) |
| 🔒 WPA/WPA2-PSK | Morado | Modo mixto |

### Intensidad de Señal

| RSSI | Barras | Color | Calidad |
|------|--------|-------|---------|
| -30 a -50 dBm | 📶📶📶📶 | Verde | Excelente |
| -51 a -60 dBm | 📶📶📶▢ | Verde | Buena |
| -61 a -70 dBm | 📶📶▢▢ | Naranja | Regular |
| -71 a -90 dBm | 📶▢▢▢ | Rojo | Débil |

### SSIDs Simulados

```
INFINITUM_2.4G_XXXX
Totalplay-5G_XXXX
IZZI-Casa_XXXX
Telmex-Wifi_XXXX
Megacable_2022_XXXX
Axtel-Home_XXXX
ATT-WiFi_XXXX
Movistar_Hogar_XXXX
RedPrivada_XXXX
Oficina-Corp_XXXX
CafeInternet_XXXX
Hotel-Guest_XXXX
```

---

## 🌐 Simulación de Internet

### Conectividad Variable

La simulación incluye un **test de conectividad** que cambia aleatoriamente:

- 🟢 **Online** (70% probabilidad): Sistema conectado
- 🔴 **Offline** (30% probabilidad): Sin conexión

**Propósito**: Simular escenarios realistas donde podrías perder conexión.

---

## 💾 LocalStorage

### Datos Persistentes

Los datos se guardan en el navegador usando `localStorage`:

```javascript
// Estructura en el navegador
localStorage
└─ offline_data: [
     { gps: {...}, wifi: [...], timestamp: ... },
     { gps: {...}, wifi: [...], timestamp: ... },
     ...
   ]
```

### Inspeccionar datos

1. Abre DevTools (F12)
2. Ve a: **Application** → **Local Storage**
3. Busca: `offline_data`

### Ventajas

✅ **Persistencia**: Datos sobreviven al cerrar el navegador
✅ **Sin backend**: No requiere servidor
✅ **Rápido**: Acceso inmediato
✅ **Debuggeable**: Visible en DevTools

### Limitaciones

⚠️ **Tamaño**: Máximo ~5-10 MB según navegador
⚠️ **Por dominio**: Solo accesible desde localhost:3000
⚠️ **Borrable**: El usuario puede limpiar datos del navegador

---

## 🎯 Casos de Uso

### 1. Demo sin Hardware
```
1. npm run dev
2. Click en "Iniciar Simulación"
3. Observa el mapa actualizarse
4. Presenta tu proyecto sin la Pico
```

### 2. Pruebas de Interfaz
```
1. Inicia simulación
2. Guarda varios registros offline
3. Detén simulación
4. Revisa datos guardados
5. Limpia cuando termines
```

### 3. Desarrollo de Features
```
1. Modifica código
2. Guarda cambios
3. La simulación continúa
4. Prueba nuevas características
```

### 4. Presentación en Clase
```
1. Abre en proyector
2. Explica la funcionalidad
3. Demuestra controles
4. Muestra datos offline
5. Explica integración futura con Pico
```

---

## 🔧 Personalización

### Cambiar frecuencia de actualización

**Archivo**: `src/App.jsx` (línea ~45)

```javascript
intervalRef.current = setInterval(() => {
  performScan();
}, 3000); // ← Cambia aquí (milisegundos)
```

### Cambiar cantidad de redes

**Archivo**: `src/mockData.js` (línea ~43)

```javascript
const count = Math.floor(Math.random() * 6) + 3; // 3-8 redes
//                                       ↑   ↑
//                                    rango  mínimo
```

### Cambiar ubicación inicial

**Archivo**: `src/mockData.js` (línea ~4)

```javascript
let currentLocation = { 
  lat: 21.9164,   // ← Tu latitud (ITA)
  lon: -102.2928  // ← Tu longitud (ITA)
};
```

### Cambiar velocidad de movimiento

**Archivo**: `src/mockData.js` (línea ~9)

```javascript
currentLocation.lat += (Math.random() - 0.5) * 0.001;
//                                              ↑
//                                    velocidad de movimiento
```

---

## 📊 Estadísticas en Vivo

Durante la simulación verás:

### Header
```
📡 Wardriving Monitor              🟢 Activo
   Simulación                      📍 25.686734, -100.315987
                                   🌐 Online
```

### Estadísticas
```
┌──────────────────────────────────────────────────────┐
│  📡 Total: 6   🔓 Abiertas: 2   🔒 Seguras: 4   📊 -67 dBm  │
└──────────────────────────────────────────────────────┘
⏰ Última actualización: 14:32:45
```

### Footer
```
🟢 En ejecución • Redes: 6 • Registros offline: 12
```

---

## 🐛 Troubleshooting

### "No se guardan los datos"
- Verifica que tengas permisos de localStorage
- Revisa la consola (F12) por errores
- Intenta en modo incógnito

### "El mapa no se mueve"
- Asegúrate de hacer click en "Iniciar Simulación"
- Verifica que el estado sea "Activo" (🟢)
- Refresca la página (Ctrl + R)

### "Muchos datos, navegador lento"
- Click en "Limpiar" para borrar datos offline
- Reduce la frecuencia de guardado
- Cierra otras pestañas

---

## 🎓 Comparación con Código Real (Pico)

| Aspecto | Simulación (PC) | Real (Pico) |
|---------|-----------------|-------------|
| GPS | `moveGPS()` | `get_gps_data()` + UART |
| WiFi | `scanNetworks()` | `wlan.scan()` |
| Storage | `localStorage` | `ujson` + archivo |
| Internet | `testInternet()` | `urequests.get()` |
| Loop | `setInterval()` | `while True:` |

**La simulación replica fielmente el comportamiento de la Pico** ✅

---

## 🚀 Próximo Paso: Integrar Pico Real

Cuando tengas tu hardware listo:

1. Lee `INTEGRACION_PICO.md`
2. Implementa servidor HTTP en la Pico
3. Cambia `mockData.js` por llamadas fetch reales
4. ¡Wardriving real! 🎉

---

**¡Disfruta la simulación!** 🎮


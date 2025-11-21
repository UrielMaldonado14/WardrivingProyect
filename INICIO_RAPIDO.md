# 🚀 Inicio Rápido - Wardriving Monitor

## ⚡ Comandos Esenciales

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en navegador (automático o manual)
http://localhost:3000
```

## 📂 Estructura de Archivos

```
📁 WardrivingProyect/
│
├── 🌐 INTERFAZ WEB (React)
│   ├── src/
│   │   ├── App.jsx              ← Componente principal
│   │   ├── mockData.js          ← Datos de prueba
│   │   └── components/          ← Componentes UI
│   ├── index.html               ← HTML base
│   └── package.json             ← Dependencias
│
├── 🤖 CÓDIGO PICO (Python)
│   ├── main_test.py             ← Script principal
│   ├── wifi_scan.py             ← Escaneo WiFi
│   ├── gps_reader.py            ← Lectura GPS
│   ├── storage.py               ← Almacenamiento
│   └── internet_test.py         ← Pruebas de conexión
│
└── 📚 DOCUMENTACIÓN
    ├── README.md                ← Guía general
    ├── CARACTERISTICAS.md       ← Detalles de la UI
    └── INTEGRACION_PICO.md      ← Conectar hardware
```

## 🎯 ¿Qué hace cada archivo?

### Interfaz Web
- **App.jsx**: Lógica principal, maneja estado y datos
- **NetworkMap.jsx**: Mapa interactivo con Leaflet
- **NetworkList.jsx**: Lista scrolleable de redes
- **StatsCards.jsx**: Tarjetas de estadísticas
- **mockData.js**: Genera datos falsos para pruebas

### Código Pico
- **main_test.py**: Loop principal que coordina todo
- **wifi_scan.py**: Escanea redes WiFi cercanas
- **gps_reader.py**: Lee datos del módulo GPS
- **storage.py**: Guarda datos localmente
- **internet_test.py**: Verifica conexión WiFi

## 🔄 Flujo de Trabajo

### Desarrollo Sin Hardware (Ahora)
```
MockData → App.jsx → Componentes → Navegador
    ↓
Datos Falsos
```

### Producción Con Pico (Futuro)
```
Pico → Servidor HTTP → App.jsx → Componentes → Navegador
 ↓
GPS + WiFi Scan
```

## 🛠️ Tareas Comunes

### Cambiar datos mock
📝 Editar: `src/mockData.js`

### Ajustar estilos
🎨 Editar: `src/App.css` y archivos en `src/components/`

### Modificar frecuencia de actualización
⏱️ Editar: `src/App.jsx` línea 18

### Integrar con Pico real
📖 Leer: `INTEGRACION_PICO.md`

## 🐛 Solución de Problemas

### Error: "npm: command not found"
```bash
# Instalar Node.js desde: https://nodejs.org/
```

### Error: Puerto 3000 en uso
```bash
# Editar vite.config.js, cambiar:
port: 3001  # o cualquier otro puerto
```

### Error: No se ve el mapa
```bash
# Verificar conexión a internet (Leaflet usa CDN)
# Revisar consola del navegador (F12)
```

### Interfaz no actualiza
```bash
# Ctrl + C para detener servidor
# npm run dev para reiniciar
# Ctrl + Shift + R para recargar sin caché
```

## 📦 Dependencias Instaladas

```json
{
  "react": "^19.2.0",           // Framework UI
  "react-dom": "^19.2.0",       // React para DOM
  "leaflet": "^1.9.4",          // Librería de mapas
  "react-leaflet": "^5.0.0",    // Leaflet + React
  "lucide-react": "^0.554.0",   // Iconos modernos
  "vite": "^7.2.4"              // Build tool
}
```

## ⌨️ Atajos de Teclado (en navegador)

- `F12` - Abrir DevTools
- `Ctrl + Shift + R` - Recarga sin caché
- `Ctrl + +/-` - Zoom in/out
- `F11` - Pantalla completa

## 📊 Datos de Ejemplo

La interfaz genera automáticamente:
- ✅ 15 redes WiFi
- ✅ Ubicación GPS (ITA, Aguascalientes)
- ✅ Diferentes tipos de seguridad
- ✅ Señales variadas (-90 a -40 dBm)
- ✅ Actualización cada 3 segundos

## 🎓 Próximos Pasos

1. ✅ Familiarízate con la interfaz
2. ✅ Explora el código en `src/`
3. ✅ Personaliza colores/estilos
4. ⏳ Programa tu Pico con los scripts Python
5. ⏳ Conecta hardware GPS y WiFi
6. ⏳ Sigue `INTEGRACION_PICO.md` para conectar

## 🆘 Recursos Adicionales

- [Documentación React](https://react.dev/)
- [Documentación Vite](https://vitejs.dev/)
- [Leaflet Docs](https://leafletjs.com/)
- [Raspberry Pi Pico W](https://www.raspberrypi.com/documentation/microcontrollers/raspberry-pi-pico.html)

## 💡 Tips Pro

1. **Auto-save en VS Code**: Los cambios se reflejan instantáneamente
2. **Múltiples pestañas**: Abre DevTools + código al mismo tiempo
3. **Mock flexible**: Modifica `mockData.js` para simular escenarios
4. **CSS modular**: Cada componente tiene su propio archivo CSS
5. **Git**: No olvides hacer commits frecuentes

---

## 🎉 ¡Todo Listo!

Tu interfaz está funcionando en modo DEMO.
Cuando tengas la Pico lista, sigue la guía de integración.

**¡Éxito con tu proyecto final! 🚀**


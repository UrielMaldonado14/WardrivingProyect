// Datos simulados para pruebas sin la Raspberry Pi Pico

// Ubicación base (Instituto Tecnológico de Aguascalientes)
// Av. Adolfo López Mateos 1801, Bona Gens, Aguascalientes
// Coordenadas: 21°52'35" N, 102°15'40" O
let currentLocation = { lat: 21.8764, lon: -102.2611 };

// Simular movimiento GPS (como si estuvieras conduciendo)
export const moveGPS = () => {
  // Movimiento aleatorio pequeño (simula desplazamiento)
  currentLocation.lat += (Math.random() - 0.5) * 0.001;
  currentLocation.lon += (Math.random() - 0.5) * 0.001;
  return { ...currentLocation };
};

// Resetear ubicación
export const resetGPS = () => {
  currentLocation = { lat: 21.8764, lon: -102.2611 };
};

// Parse GPGGA (simulación del formato NMEA del GPS real)
export const parseGPGGA = (sentence) => {
  const parts = sentence.split(',');
  if (parts.length < 6) return null;
  
  const fix = parts[6];
  if (fix === '0') return null;
  
  const latRaw = parts[2];
  const latDir = parts[3];
  const lonRaw = parts[4];
  const lonDir = parts[5];
  
  const convert = (coord, direction) => {
    const deg = parseFloat(coord.slice(0, 2));
    const minutes = parseFloat(coord.slice(2));
    let decimal = deg + minutes / 60;
    if (direction === 'S' || direction === 'W') decimal *= -1;
    return decimal;
  };
  
  return {
    lat: convert(latRaw, latDir),
    lon: convert(lonRaw, lonDir),
    fix: true
  };
};

// Generar redes WiFi cercanas a la ubicación actual
export const scanNetworks = (location) => {
  const networks = [];
  const count = Math.floor(Math.random() * 6) + 3; // 3-8 redes
  
  const ssids = [
    'INFINITUM_2.4G', 'Totalplay-5G', 'IZZI-Casa', 'Telmex-Wifi',
    'Megacable_2022', 'Axtel-Home', 'ATT-WiFi', 'Movistar_Hogar',
    'RedPrivada', 'Oficina-Corp', 'CafeInternet', 'Hotel-Guest'
  ];
  
  const securities = ['OPEN', 'WEP', 'WPA-PSK', 'WPA2-PSK', 'WPA/WPA2-PSK'];
  
  for (let i = 0; i < count; i++) {
    networks.push({
      ssid: ssids[Math.floor(Math.random() * ssids.length)] + `_${Math.floor(Math.random() * 9999)}`,
      mac: Array.from({length: 6}, () => 
        Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':'),
      rssi: -30 - Math.floor(Math.random() * 60), // -30 a -90 dBm
      security: securities[Math.floor(Math.random() * securities.length)],
      lat: location.lat + (Math.random() - 0.5) * 0.002,
      lon: location.lon + (Math.random() - 0.5) * 0.002,
      timestamp: Date.now()
    });
  }
  
  return networks;
};

// Guardar datos offline (localStorage)
export const saveOffline = (data) => {
  const stored = JSON.parse(localStorage.getItem('offline_data') || '[]');
  stored.push(data);
  localStorage.setItem('offline_data', JSON.stringify(stored));
};

// Cargar datos offline
export const loadOffline = () => {
  return JSON.parse(localStorage.getItem('offline_data') || '[]');
};

// Limpiar almacenamiento
export const clearStorage = () => {
  localStorage.setItem('offline_data', '[]');
};

// Simular conexión a internet
export const testInternet = () => {
  return Math.random() > 0.3; // 70% probabilidad de estar conectado
};


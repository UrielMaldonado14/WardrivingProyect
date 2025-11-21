import React, { useState, useEffect, useRef } from 'react';
import { Wifi, MapPin, Signal, Clock, Activity, Play, Square, Save, Database, Trash2 } from 'lucide-react';
import NetworkMap from './components/NetworkMap';
import NetworkList from './components/NetworkList';
import StatsCards from './components/StatsCards';
import { moveGPS, scanNetworks, saveOffline, loadOffline, clearStorage, testInternet, resetGPS } from './mockData';
import './App.css';

function App() {
  const [networks, setNetworks] = useState([]);
  const [gpsLocation, setGpsLocation] = useState({ lat: 21.8764, lon: -102.2611 });
  const [isScanning, setIsScanning] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [internetConnected, setInternetConnected] = useState(true);
  const [offlineCount, setOfflineCount] = useState(0);
  const intervalRef = useRef(null);

  // Actualizar contador de registros offline
  useEffect(() => {
    const data = loadOffline();
    setOfflineCount(data.length);
  }, []);

  // Función para realizar un escaneo
  const performScan = () => {
    setIsScanning(true);
    
    // Simular delay del escaneo
    setTimeout(() => {
      // Mover GPS
      const newLocation = moveGPS();
      setGpsLocation(newLocation);
      
      // Escanear redes
      const newNetworks = scanNetworks(newLocation);
      setNetworks(newNetworks);
      
      // Verificar internet
      setInternetConnected(testInternet());
      
      setLastUpdate(new Date());
      setIsScanning(false);
    }, 1000);
  };

  // Iniciar simulación automática
  const startSimulation = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    performScan(); // Primera ejecución inmediata
    
    intervalRef.current = setInterval(() => {
      performScan();
    }, 3000); // Cada 3 segundos
  };

  // Detener simulación
  const stopSimulation = () => {
    setIsRunning(false);
    setIsScanning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Guardar datos offline
  const handleSaveOffline = () => {
    const data = {
      gps: gpsLocation,
      wifi: networks,
      timestamp: Date.now()
    };
    saveOffline(data);
    const offlineData = loadOffline();
    setOfflineCount(offlineData.length);
    alert(`✅ Datos guardados offline correctamente\n\nTotal registros: ${offlineData.length}`);
  };

  // Ver datos offline
  const handleShowOffline = () => {
    const data = loadOffline();
    console.log('Datos offline:', data);
    if (data.length === 0) {
      alert('📭 No hay datos offline almacenados');
    } else {
      alert(`📊 Registros offline: ${data.length}\n\n` +
            `Primer registro: ${new Date(data[0].timestamp).toLocaleString()}\n` +
            `Último registro: ${new Date(data[data.length - 1].timestamp).toLocaleString()}\n\n` +
            `Ver consola (F12) para detalles completos`);
    }
  };

  // Limpiar datos offline
  const handleClearOffline = () => {
    if (confirm('⚠️ ¿Estás seguro de eliminar todos los datos offline?')) {
      clearStorage();
      setOfflineCount(0);
      alert('✅ Datos offline eliminados');
    }
  };

  // Reiniciar GPS
  const handleResetGPS = () => {
    stopSimulation();
    resetGPS();
    setGpsLocation({ lat: 21.8764, lon: -102.2611 });
    setNetworks([]);
    alert('🔄 GPS reiniciado a la ubicación inicial\n📍 ITA - Av. López Mateos 1801');
  };

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const stats = {
    total: networks.length,
    open: networks.filter(n => n.security === 'OPEN').length,
    encrypted: networks.filter(n => n.security !== 'OPEN').length,
    avgSignal: networks.length > 0 
      ? Math.round(networks.reduce((acc, n) => acc + n.rssi, 0) / networks.length) 
      : 0
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Wifi size={32} />
            <div>
              <h1>Wardriving Monitor</h1>
              <p>Simulación - Raspberry Pi Pico W</p>
            </div>
          </div>
          <div className="status">
            <div className={`status-indicator ${isScanning ? 'scanning' : isRunning ? 'running' : 'idle'}`}>
              <Activity size={20} />
              <span>{isScanning ? 'Escaneando...' : isRunning ? 'Activo' : 'Detenido'}</span>
            </div>
            <div className="gps-status">
              <MapPin size={18} />
              <span>{gpsLocation.lat.toFixed(6)}, {gpsLocation.lon.toFixed(6)}</span>
            </div>
            <div className={`internet-status ${internetConnected ? 'connected' : 'disconnected'}`}>
              <Signal size={18} />
              <span>{internetConnected ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Botones de Control */}
        <div className="control-panel">
          <button 
            className={`control-btn primary ${isRunning ? 'disabled' : ''}`}
            onClick={startSimulation}
            disabled={isRunning}
          >
            <Play size={20} />
            Iniciar Simulación
          </button>
          <button 
            className={`control-btn danger ${!isRunning ? 'disabled' : ''}`}
            onClick={stopSimulation}
            disabled={!isRunning}
          >
            <Square size={20} />
            Detener
          </button>
          <button 
            className="control-btn success"
            onClick={handleSaveOffline}
            disabled={networks.length === 0}
          >
            <Save size={20} />
            Guardar Offline
          </button>
          <button 
            className="control-btn info"
            onClick={handleShowOffline}
          >
            <Database size={20} />
            Ver Offline ({offlineCount})
          </button>
          <button 
            className="control-btn warning"
            onClick={handleClearOffline}
            disabled={offlineCount === 0}
          >
            <Trash2 size={20} />
            Limpiar
          </button>
        </div>

        <StatsCards stats={stats} lastUpdate={lastUpdate} />
        
        <div className="content-grid">
          <div className="map-section">
            <div className="section-card">
              <div className="section-header">
                <h2>
                  <MapPin size={24} />
                  Mapa de Redes
                </h2>
              </div>
              <NetworkMap networks={networks} center={gpsLocation} />
            </div>
          </div>

          <div className="list-section">
            <div className="section-card">
              <div className="section-header">
                <h2>
                  <Signal size={24} />
                  Redes Detectadas ({networks.length})
                </h2>
              </div>
              <NetworkList networks={networks} />
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2024 Wardriving Project - Sistemas Embebidos</p>
        <p className="footer-note">
          Modo Simulación • {isRunning ? '🟢 En ejecución' : '🔴 Detenido'} • 
          Redes detectadas: {networks.length} • 
          Registros offline: {offlineCount}
        </p>
      </footer>
    </div>
  );
}

export default App;


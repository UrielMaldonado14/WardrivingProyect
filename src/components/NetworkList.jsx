import React from 'react';
import { Wifi, Lock, Unlock, Signal } from 'lucide-react';
import './NetworkList.css';

function NetworkList({ networks }) {
  const getSignalStrength = (rssi) => {
    if (rssi >= -50) return { level: 'excelente', bars: 4, color: '#48bb78' };
    if (rssi >= -60) return { level: 'buena', bars: 3, color: '#48bb78' };
    if (rssi >= -70) return { level: 'regular', bars: 2, color: '#ed8936' };
    return { level: 'débil', bars: 1, color: '#f56565' };
  };

  const sortedNetworks = [...networks].sort((a, b) => b.rssi - a.rssi);

  return (
    <div className="network-list">
      {sortedNetworks.length === 0 ? (
        <div className="empty-state">
          <Wifi size={48} />
          <p>No hay redes detectadas</p>
        </div>
      ) : (
        sortedNetworks.map((network, index) => {
          const signal = getSignalStrength(network.rssi);
          return (
            <div key={index} className="network-item">
              <div className="network-icon">
                {network.security === 'OPEN' ? (
                  <Unlock size={24} color="#48bb78" />
                ) : (
                  <Lock size={24} color="#f56565" />
                )}
              </div>
              
              <div className="network-info">
                <div className="network-ssid">{network.ssid}</div>
                <div className="network-details">
                  <span className="network-mac">{network.mac}</span>
                  <span className="network-security">{network.security}</span>
                </div>
              </div>

              <div className="network-signal">
                <div className="signal-bars">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`signal-bar ${i < signal.bars ? 'active' : ''}`}
                      style={{ 
                        backgroundColor: i < signal.bars ? signal.color : '#e2e8f0' 
                      }}
                    />
                  ))}
                </div>
                <span className="signal-value" style={{ color: signal.color }}>
                  {network.rssi} dBm
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default NetworkList;


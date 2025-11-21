import React from 'react';
import { Wifi, Lock, Unlock, Signal, Clock } from 'lucide-react';
import './StatsCards.css';

function StatsCards({ stats, lastUpdate }) {
  const cards = [
    {
      icon: <Wifi size={28} />,
      title: 'Total Redes',
      value: stats.total,
      color: '#667eea',
      bgColor: 'rgba(102, 126, 234, 0.1)'
    },
    {
      icon: <Unlock size={28} />,
      title: 'Redes Abiertas',
      value: stats.open,
      color: '#48bb78',
      bgColor: 'rgba(72, 187, 120, 0.1)'
    },
    {
      icon: <Lock size={28} />,
      title: 'Redes Seguras',
      value: stats.encrypted,
      color: '#f56565',
      bgColor: 'rgba(245, 101, 101, 0.1)'
    },
    {
      icon: <Signal size={28} />,
      title: 'Señal Promedio',
      value: `${stats.avgSignal} dBm`,
      color: '#ed8936',
      bgColor: 'rgba(237, 137, 54, 0.1)'
    }
  ];

  return (
    <div className="stats-container">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="stat-card"
          style={{ 
            borderLeft: `4px solid ${card.color}`,
            background: card.bgColor
          }}
        >
          <div className="stat-icon" style={{ color: card.color }}>
            {card.icon}
          </div>
          <div className="stat-content">
            <h3>{card.title}</h3>
            <p className="stat-value">{card.value}</p>
          </div>
        </div>
      ))}
      <div className="last-update">
        <Clock size={16} />
        <span>Última actualización: {lastUpdate.toLocaleTimeString()}</span>
      </div>
    </div>
  );
}

export default StatsCards;


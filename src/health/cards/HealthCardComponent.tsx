import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

interface HealthCardProps {
  title: string;
  value: string;
  date: string;
  data: Array<{ day: string; value: number; label: string }>;
  colors: {
    primary: string;
    secondary: string;
  };
}

export default function HealthCardComponent({ title, value, date, data, colors }: HealthCardProps) {
  
  const CustomBar = (props: any) => {
    const { payload, x, y, width, height } = props;
    const isHighest = payload.value === Math.max(...data.map(d => d.value));
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={isHighest ? colors.primary : colors.secondary}
          rx={2}
        />
        <text
          x={x + width / 2}
          y={y - 4}
          textAnchor="middle"
          fill="#6c757d"
          fontSize="0.75rem"
        >
          {payload.label}
        </text>
      </g>
    );
  };

  return (
    <div className="card shadow">
      <div className="card-body">
        <div className="text-muted small mb-1" style={{fontSize: '0.75rem'}}>{title}</div>
        <h3 className="fw-bold mb-1" style={{fontSize: '1.25rem', color: colors.primary}}>{value}</h3>
        <div className="text-muted small mb-3" style={{fontSize: '0.7rem'}}>{date}</div>
        
        <div className="mb-2" style={{ height: '6rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: '0.7rem', fill: '#6c757d' }}
              />
              <Bar 
                dataKey="value" 
                shape={<CustomBar />}
                maxBarSize={16}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
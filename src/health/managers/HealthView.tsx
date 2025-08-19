import React, { useState } from 'react';

const HealthView: React.FC = () => {
  const [healthData, setHealthData] = useState<any>(null);
  const [dataType, setDataType] = useState<string>('');

  // Add the receiveHealthData function to the window object
  React.useEffect(() => {
    (window as any).receiveHealthData = (action: string, data: any) => {
      console.log('Received health data:', action, data);
      setHealthData(data);
      setDataType(action);
    };
  }, []);

  const requestHealthPermission = () => {
    (window as any).webkit?.messageHandlers?.ios?.postMessage("healthPermission");
  };

  const fetchStepsCount = () => {
    (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchStepsCount");
  };

  const fetchHeartRate = () => {
    (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchHeartRate");
  };

  const fetchSleepAnalysis = () => {
    (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchSleepAnalysis");
  };

  const fetchDistanceWalkingRunning = () => {
    (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchDistanceWalkingRunning");
  };

  const fetchActiveEnergyBurned = () => {
    (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchActiveEnergyBurned");
  };

  const fetchRespiratoryRate = () => {
    (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchRespiratoryRate");
  };
  
  const renderHealthData = () => {
    if (!healthData) return null;
    
    return (
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Health Data: {dataType}</h3>
        <p>Total entries: {healthData.count}</p>
        
        {healthData.data && healthData.data.length > 0 ? (
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {healthData.data.map((entry: any, index: number) => (
              <div key={index} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                {dataType === 'steps' && (
                  <div>
                    <strong>Date:</strong> {new Date(entry.date).toLocaleString()}<br/>
                    <strong>Steps:</strong> {entry.steps}<br/>
                    <strong>Source:</strong> {entry.source}
                  </div>
                )}
                
                {dataType === 'heartRate' && (
                  <div>
                    <strong>Date:</strong> {new Date(entry.date).toLocaleString()}<br/>
                    <strong>Heart Rate:</strong> {entry.heartRate} BPM<br/>
                    <strong>Source:</strong> {entry.source}
                  </div>
                )}
                
                {dataType === 'sleep' && (
                  <div>
                    <strong>Start:</strong> {new Date(entry.startTime).toLocaleString()}<br/>
                    <strong>End:</strong> {new Date(entry.endTime).toLocaleString()}<br/>
                    <strong>Stage:</strong> {entry.stage}<br/>
                    <strong>Duration:</strong> {entry.duration.toFixed(1)} hours<br/>
                    <strong>Source:</strong> {entry.source}
                  </div>
                )}
                
                {dataType === 'distance' && (
                  <div>
                    <strong>Start:</strong> {new Date(entry.startTime).toLocaleString()}<br/>
                    <strong>End:</strong> {new Date(entry.endTime).toLocaleString()}<br/>
                    <strong>Distance:</strong> {entry.distance.toFixed(2)} meters<br/>
                    <strong>Duration:</strong> {entry.duration.toFixed(1)} minutes<br/>
                    <strong>Source:</strong> {entry.source}
                  </div>
                )}
                
                {dataType === 'energy' && (
                  <div>
                    <strong>Start:</strong> {new Date(entry.startTime).toLocaleString()}<br/>
                    <strong>End:</strong> {new Date(entry.endTime).toLocaleString()}<br/>
                    <strong>Calories:</strong> {entry.calories.toFixed(1)} cal<br/>
                    <strong>Duration:</strong> {entry.duration.toFixed(1)} minutes<br/>
                    <strong>Source:</strong> {entry.source}
                  </div>
                )}
                
                {dataType === 'respiratory' && (
                  <div>
                    <strong>Date:</strong> {new Date(entry.date).toLocaleString()}<br/>
                    <strong>Rate:</strong> {entry.rate.toFixed(1)} breaths/min<br/>
                    <strong>Source:</strong> {entry.source}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No data available</p>
        )}
        
        {healthData.error && (
          <p style={{ color: 'red' }}>Error: {healthData.error}</p>
        )}
      </div>
    );
  };

  return (
    <>
      <button onClick={requestHealthPermission}>
        Request Health Permission
      </button>
      <button onClick={fetchStepsCount}>
        READ STEPS DATA
      </button>
      <button onClick={fetchHeartRate}>
        READ HEART RATE
      </button>
      <button onClick={fetchSleepAnalysis}>
        READ SLEEP ANALYSIS
      </button>
      <button onClick={fetchDistanceWalkingRunning}>
        READ DISTANCE WALKING/RUNNING
      </button>
      <button onClick={fetchActiveEnergyBurned}>
        READ ACTIVE ENERGY BURNED
      </button>
      <button onClick={fetchRespiratoryRate}>
        READ RESPIRATORY RATE
      </button>
      {renderHealthData()}
    </>
  );
};

export default HealthView; 
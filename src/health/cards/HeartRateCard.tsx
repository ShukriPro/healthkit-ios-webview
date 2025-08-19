import React, { useEffect } from 'react';
import HealthCardComponent from './HealthCardComponent';
import { useHealthData } from '../managers/HealthDataManager';

export default function HeartRateCard() {
    // Use the shared health data manager
    const healthKitData = useHealthData('heartRate');

    // Automatically request heart rate data when component mounts
    useEffect(() => {
        (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchHeartRate");
    }, []);

    // If no data is available yet, don't render anything
    if (!healthKitData) {
        return null;
    }

    // Transform the data to show available data mapped to weekdays
    const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const transformedData = weekdays.map((day, index) => {
        // Get heart rate data from the available entries, cycling through whatever data exists
        const heartRateData = healthKitData.data[index % healthKitData.data.length];
        const heartRate = heartRateData?.heartRate || 0;
        
        return {
            day: day,
            value: heartRate,
            label: heartRate.toString()
        };
    });

    const handleCardClick = () => {
        // Trigger heart rate data fetch when card is clicked
        (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchHeartRate");
    };

    return (
        <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <HealthCardComponent
                title="Heart Rate" 
                value={`${Math.round(healthKitData.data[0]?.heartRate || 0)} BPM`} 
                date={new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short', 
                    year: '2-digit' 
                })}
                data={transformedData}
                colors={{ primary: '#dc3545', secondary: '#f8d7da' }}
            />
        </div>
    );
}

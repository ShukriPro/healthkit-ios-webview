import React, { useEffect } from 'react';
import HealthCardComponent from './HealthCardComponent';
import { useHealthData } from '../managers/HealthDataManager';
export default function RespiratoryCard() {
    // Use the shared health data manager
    const healthKitData = useHealthData('respiratory');

    // Automatically request respiratory data when component mounts
    useEffect(() => {
        (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchRespiratoryRate");
    }, []);

    // If no data is available yet, don't render anything
    if (!healthKitData) {
        return null;
    }

    // Transform the data to show 7 bars for the weekdays
    const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const transformedData = weekdays.map((day, index) => {
        // Get respiratory data from the available entries
        const respiratoryData = healthKitData.data[index % healthKitData.data.length];
        const rate = respiratoryData.rate;
        
        return {
            day: day,
            value: rate,
            label: `${rate.toFixed(1)}`
        };
    });

    return (
        // breaths/min
        <HealthCardComponent
            title="Respiratory Rate" 
            value={`${(healthKitData.data[0]?.rate || 0).toFixed(1)}`} 
            date={new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                day: 'numeric', 
                month: 'short', 
                year: '2-digit' 
            })}
            data={transformedData}
            colors={{ primary: '#17a2b8', secondary: '#6bc5d1' }}
        />
    );
}

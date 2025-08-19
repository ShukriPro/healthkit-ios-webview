import React, { useEffect } from 'react';
import HealthCardComponent from '../cards/HealthCardComponent';
import { useHealthData } from '../managers/HealthDataManager';
export default function DistanceWalkingRunningCard() {
    // Use the shared health data manager
    const healthKitData = useHealthData('distance');

    // Automatically request distance data when component mounts
    useEffect(() => {
        (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchDistanceWalkingRunning");
    }, []);

    // If no data is available yet, don't render anything
    if (!healthKitData) {
        return null;
    }

    // Transform the data to show available data mapped to weekdays
    const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const transformedData = weekdays.map((day, index) => {
        // Get distance data from the available entries, cycling through whatever data exists
        const distanceData = healthKitData.data[index % healthKitData.data.length];
        const distance = distanceData?.distance || 0;
        
        // Convert meters to kilometers for display if over 100m
        let label = '';
        if (distance >= 100) {
            label = `${(distance / 1000).toFixed(1)}km`;
        } else {
            label = `${Math.round(distance)}m`;
        }
        
        return {
            day: day,
            value: distance,
            label: label
        };
    });

    // Calculate total distance for the main value display
    const totalDistance = healthKitData.data[0]?.distance || 0;
    let displayValue = '';
    if (totalDistance >= 100) {
        displayValue = `${(totalDistance / 1000).toFixed(1)} km`;
    } else {
        displayValue = `${Math.round(totalDistance)} m`;
    }

    const handleCardClick = () => {
        // Trigger distance data fetch when card is clicked
        (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchDistanceWalkingRunning");
    };

    return (
        <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <HealthCardComponent
                title="Distance" 
                value={displayValue} 
                date={new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short', 
                    year: '2-digit' 
                })}
                data={transformedData}
                colors={{ primary: '#0d6efd', secondary: '#6ea8fe' }}
            />
        </div>
    );
}

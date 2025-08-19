import React, { useEffect } from 'react';
import HealthCardComponent from './HealthCardComponent';
import { useHealthData } from '../managers/HealthDataManager';
export default function SleepCard() {
    // Use the shared health data manager
    const healthKitData = useHealthData('sleep');

    // Automatically request sleep data when component mounts
    useEffect(() => {
        (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchSleepAnalysis");
    }, []);

    // If no data is available yet, don't render anything
    if (!healthKitData) {
        return null;
    }

    // Transform the data to show 7 bars for the weekdays
    const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const transformedData = weekdays.map((day, index) => {
        // Get sleep data from the available entries
        const sleepData = healthKitData.data[index % healthKitData.data.length];
        const duration = sleepData.duration;
        
        // Convert hours to hours and minutes for display
        const hours = Math.floor(duration);
        const minutes = Math.round((duration - hours) * 60);
        
        // Handle different duration cases
        let label = '';
        if (duration < 1) {
            // Less than 1 hour, show only minutes
            label = `${minutes}m`;
        } else if (minutes === 0) {
            // Whole hours only
            label = `${hours}h`;
        } else {
            // Hours and minutes
            label = `${hours}h ${minutes}m`;
        }
        
        return {
            day: day,
            value: duration,
            label: label
        };
    });

    // Calculate total sleep time for the main value display
    const totalSleep = healthKitData.data[0]?.duration || 0;
    const totalHours = Math.floor(totalSleep);
    const totalMinutes = Math.round((totalSleep - totalHours) * 60);
    
    let displayValue = '';
    if (totalSleep < 1) {
        displayValue = `${totalMinutes}m`;
    } else if (totalMinutes === 0) {
        displayValue = `${totalHours}h`;
    } else {
        displayValue = `${totalHours}h ${totalMinutes}m`;
    }

    return (
        <HealthCardComponent
            title="Sleep Hours" 
            value={displayValue} 
            date={new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                day: 'numeric', 
                month: 'short', 
                year: '2-digit' 
            })}
            data={transformedData}
            colors={{ primary: '#6f42c1', secondary: '#c7b3e7' }}
        />
    );
}

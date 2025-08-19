import React, { useEffect } from 'react';
import HealthCardComponent from './HealthCardComponent';
import { useHealthData } from '../managers/HealthDataManager';

export default function StepsCard() {
    // Use the shared health data manager
    const healthKitData = useHealthData('steps');

    // Automatically request steps data when component mounts
    useEffect(() => {
        (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchStepsCount");
    }, []);

    // If no data is available yet, don't render anything
    if (!healthKitData) {
        return null;
    }

    // Transform the data to show available data mapped to weekdays
    const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const transformedData = weekdays.map((day, index) => {
        // Get step data from the available entries, cycling through whatever data exists
        const stepData = healthKitData.data[index % healthKitData.data.length];
        const steps = stepData?.steps || 0;
        
        return {
            day: day,
            value: steps,
            label: steps >= 1000 ? `${(steps/1000).toFixed(1)}k` : steps.toString()
        };
    });

    // Calculate total steps from the latest date
    const latestDate = healthKitData.data[0]?.date;
    let totalSteps = 0;
    
    if (latestDate) {
        // Sum all steps from the same date as the latest entry
        totalSteps = healthKitData.data
            .filter((entry: any) => entry.date === latestDate)
            .reduce((sum: number, entry: any) => sum + (entry.steps || 0), 0);
    }

    const handleCardClick = () => {
        // Trigger steps data fetch when card is clicked
        (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchStepsCount");
    };

    return (
        <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <HealthCardComponent
                title="Steps" 
                value={totalSteps.toString()} 
                date={new Date(healthKitData.data[0]?.date || new Date()).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short', 
                    year: '2-digit' 
                })}
                data={transformedData}
                colors={{ primary: '#198754', secondary: '#75b798' }}
            />
        </div>
    );
    
}

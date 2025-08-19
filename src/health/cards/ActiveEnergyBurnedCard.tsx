import React, { useEffect } from 'react';
import HealthCardComponent from '../cards/HealthCardComponent';
import { useHealthData } from '../managers/HealthDataManager';

export default function ActiveEnergyBurnedCard() {
    // Use the shared health data manager
    const healthKitData = useHealthData('energy');

    // Automatically request active energy burned data when component mounts
    useEffect(() => {
        (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchActiveEnergyBurned");
    }, []);

    // If no data is available yet, don't render anything
    if (!healthKitData) {
        return null;
    }

    // Transform the data to show available data mapped to weekdays
    const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const transformedData = weekdays.map((day, index) => {
        // Get energy data from the available entries, cycling through whatever data exists
        const energyData = healthKitData.data[index % healthKitData.data.length];
        const calories = energyData?.calories || 0;
        
        // Convert calories to kilocalories for display if over 1000 cal
        let label = '';
        if (calories >= 1000) {
            label = `${(calories / 1000).toFixed(1)}kcal`;
        } else {
            label = `${Math.round(calories)} cal`;
        }
        
        return {
            day: day,
            value: calories,
            label: label
        };
    });

    // Calculate total calories for the main value display
    const totalCalories = healthKitData.data[0]?.calories || 0;
    let displayValue = '';
    if (totalCalories >= 1000) {
        displayValue = `${(totalCalories / 1000).toFixed(1)} kcal`;
    } else {
        displayValue = `${Math.round(totalCalories)} cal`;
    }

    const handleCardClick = () => {
        // Trigger active energy data fetch when card is clicked
        (window as any).webkit?.messageHandlers?.ios?.postMessage("fetchActiveEnergyBurned");
    };

    return (
        <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <HealthCardComponent
                title="Active Energy" 
                value={displayValue} 
                date={new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short', 
                    year: '2-digit' 
                })}
                data={transformedData}
                colors={{ primary: '#fd7e14', secondary: '#ffb366' }}
            />
        </div>
    );
}

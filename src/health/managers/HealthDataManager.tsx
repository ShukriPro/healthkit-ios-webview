import { useState, useEffect, useCallback, useRef } from 'react';

// Shared state for all health cards
let healthDataState: { [key: string]: any } = {};
let listeners: { [key: string]: Set<(data: any) => void> } = {};
let globalListenerSetup = false;

// Initial data structure for each health metric
const getInitialData = (action: string) => {
    const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    
    switch (action) {
        case 'steps':
            return {
                type: "steps",
                count: 0,
                data: weekdays.map(() => ({ steps: 0, source: "Initial", date: new Date().toISOString() }))
            };
        case 'heartRate':
            return {
                type: "heartRate", 
                data: weekdays.map(() => ({ heartRate: 0, source: "Initial", date: new Date().toISOString() }))
            };
        case 'sleep':
            return {
                type: "sleep",
                data: weekdays.map(() => ({ duration: 0, source: "Initial", date: new Date().toISOString() }))
            };
        case 'respiratory':
            return {
                type: "respiratory",
                data: weekdays.map(() => ({ rate: 0, source: "Initial", date: new Date().toISOString() }))
            };
        case 'distance':
            return {
                type: "distance",
                data: weekdays.map(() => ({ distance: 0, source: "Initial", date: new Date().toISOString() }))
            };
        case 'energy':
            return {
                type: "energy",
                data: weekdays.map(() => ({ calories: 0, source: "Initial", date: new Date().toISOString() }))
            };
        default:
            return null;
    }
};

// Function to set up the global listener for iOS data (only once)
export const setupHealthDataListener = () => {
    if (globalListenerSetup) return; // Already set up
    
    (window as any).receiveHealthData = (action: string, data: any) => {
        console.log('HealthDataManager received:', action, data);
        healthDataState[action] = data;
        
        // Notify all listeners for this action
        if (listeners[action]) {
            listeners[action].forEach(listener => listener(data));
        }
    };
    
    globalListenerSetup = true;
};

// Hook for health cards to use
export const useHealthData = (action: string) => {
    // Start with initial data so the card renders immediately
    const [data, setData] = useState<any>(() => getInitialData(action));
    const listenerRef = useRef<(data: any) => void>();

    // Memoize the listener function to prevent unnecessary re-renders
    const listener = useCallback((newData: any) => {
        setData(newData);
    }, []);

    useEffect(() => {
        // Set up the global listener if not already done (only once)
        setupHealthDataListener();
        
        // Initialize listeners object for this action if it doesn't exist
        if (!listeners[action]) {
            listeners[action] = new Set();
        }
        
        // Store reference to current listener
        listenerRef.current = listener;
        
        // Add listener to the set
        listeners[action].add(listener);
        
        // Cleanup function
        return () => {
            if (listeners[action] && listenerRef.current) {
                listeners[action].delete(listenerRef.current);
                // Clean up empty listener sets
                if (listeners[action].size === 0) {
                    delete listeners[action];
                }
            }
        };
    }, [action, listener]);

    return data;
};

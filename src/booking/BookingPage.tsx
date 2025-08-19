import React, { useState } from 'react';

const BookingPage = () => {
  const [currentView, setCurrentView] = useState('welcome'); // 'welcome' or 'booking'
  const [selectedService, setSelectedService] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const services = [
    {
      "id": "S001",
      "name": "Physiotherapy",
      "description": "Treatment for musculoskeletal pain, injury rehabilitation, arthritis, respiratory and neurological conditions.",
      "availability": "By appointment only"
    },
    {
      "id": "S002",
      "name": "Immediate Care",
      "description": "Walk-in clinic for minor injuries, common illnesses, wound care, sprains, infections, burns, rashes, and sexual health needs.",
      "availability": [
        { "days": ["Monday", "Tuesday", "Wednesday", "Friday"], "time": "09:30-11:30" },
        { "days": ["Monday", "Tuesday", "Wednesday"], "time": "14:00-16:00" }
      ]
    },
    {
      "id": "S003",
      "name": "Social Work",
      "description": "Holistic, culturally sensitive support for housing, food, employment, family issues, advocacy, and community connections.",
      "availability": "By appointment only"
    },
    {
      "id": "S004",
      "name": "Psychological Skills Group",
      "description": "8-week rolling group program teaching coping strategies, mindfulness, distress tolerance, and emotional regulation.",
      "availability": [
        { "days": ["Tuesday"], "time": "13:00-14:00" }
      ]
    },
    {
      "id": "S005",
      "name": "Persistent Pain Service",
      "description": "Transdisciplinary program for managing chronic pain through physiotherapy, psychology, medication education, and skills training.",
      "availability": "By appointment only"
    },
    {
      "id": "S006",
      "name": "Respiratory Health Service",
      "description": "Assessment and support for asthma and COPD, focusing on risk factors like smoking, housing, and air quality.",
      "availability": "By appointment only"
    },
    {
      "id": "S007",
      "name": "Mental Wellness",
      "description": "Individual and group psychological support from clinical and intern psychologists with funded options available.",
      "availability": "By referral / appointment"
    },
    {
      "id": "S008",
      "name": "Women's Clinic",
      "description": "Female-focused clinic covering sexual health checks, maternity visits, contraceptive reviews, cervical screening, menopause support, and breast checks.",
      "availability": [
        { "days": ["Monday"], "frequency": "Alternating weeks" },
        { "days": ["Wednesday"], "frequency": "Alternating weeks" }
      ]
    }
  ];

  const getAvailabilityText = (availability: any) => {
    if (typeof availability === 'string') {
      return availability;
    }
    
    if (Array.isArray(availability)) {
      return availability.map((slot: any) => {
        if (slot.frequency) {
          return `${slot.days.join(', ')} (${slot.frequency})`;
        }
        return `${slot.days.join(', ')}: ${slot.time}`;
      }).join(' | ');
    }
    
    return 'Please call to book';
  };

  const canBookOnline = (availability: any) => {
    return Array.isArray(availability) && availability.some((slot: any) => slot.time && !slot.frequency);
  };

  const getTimeSlots = (availability: any) => {
    if (!Array.isArray(availability)) return [];
    
    const slots: Array<{day: string, time: string}> = [];
    availability.forEach((slot: any) => {
      if (slot.time && !slot.frequency) {
        slot.days.forEach((day: string) => {
          slots.push({ day, time: slot.time });
        });
      }
    });
    return slots;
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedTime('');
  };

  const handleSubmit = () => {
    const selectedServiceObj = services.find(s => s.id === selectedService);
    
    if (!selectedServiceObj) {
      alert('Please select a service');
      return;
    }
    
    if (!patientInfo.name || !patientInfo.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    alert(`Booking request submitted!\n\nService: ${selectedServiceObj.name}\n${selectedTime ? `Time: ${selectedTime}` : 'We will contact you to schedule'}\nPatient: ${patientInfo.name}\nPhone: ${patientInfo.phone}`);
    
    // Reset form and go back to welcome
    setCurrentView('welcome');
    setSelectedService('');
    setSelectedTime('');
    setPatientInfo({ name: '', phone: '', email: '', notes: '' });
  };

  const selectedServiceObj = services.find(s => s.id === selectedService);
  const timeSlots = selectedServiceObj ? getTimeSlots(selectedServiceObj.availability) : [];

  if (currentView === 'welcome') {
    return (
      <div className="min-vh-100 bg-light py-3" style={{marginBottom: '20px'}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              
              {/* Welcome Section */}
              <div className="card shadow-sm mb-3">
                <div className="card-body p-3 text-center">
                  <h1 className="h6 text-muted mb-3" style={{fontSize: '0.875rem'}}>Patient Booking Portal</h1>
                  
                  <div className="bg-primary d-flex align-items-center justify-content-center mx-auto mb-3" 
                       style={{width: '48px', height: '48px', borderRadius: '8px'}}>
                    <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                  </div>
                  
                  <h2 className="h5 fw-semibold mb-2" style={{fontSize: '1.1rem'}}>Let's get started</h2>
                  <p className="text-muted mb-3" style={{fontSize: '0.8rem'}}>
                    Book your healthcare appointment quickly and easily. Choose from our available services and schedule a time that works for you.
                  </p>
                  
                  <button 
                    onClick={() => setCurrentView('booking')}
                    className="btn btn-primary w-100 py-2 rounded-pill fw-medium"
                    style={{fontSize: '0.9rem'}}
                  >
                    Book Healthcare Service
                  </button>
                </div>
              </div>

              {/* Upcoming Bookings Section */}
              <div className="card shadow-sm">
                <div className="card-body p-3">
                  <h3 className="h6 fw-medium text-center mb-3" style={{fontSize: '0.9rem'}}>Your Appointments</h3>
                  
                  <div className="text-center">
                    <div className="bg-light d-flex align-items-center justify-content-center mx-auto mb-2" 
                         style={{width: '48px', height: '48px', borderRadius: '8px'}}>
                      <svg width="24" height="24" fill="#6c757d" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    
                    <h4 className="h6 fw-medium mb-1" style={{fontSize: '0.85rem'}}>No upcoming appointments</h4>
                    <p className="text-muted small mb-3" style={{fontSize: '0.75rem'}}>
                      As soon as you book an appointment it will show up here.
                    </p>
                    
                    <button 
                      onClick={() => setCurrentView('booking')}
                      className="btn btn-link text-primary p-0 fw-medium small"
                      style={{fontSize: '0.75rem'}}
                    >
                      View all services
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-3" style={{marginBottom: '20px'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm">
              
              {/* Header with Back Button */}
              <div className="bg-primary text-white p-3 rounded-top">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <button 
                    onClick={() => setCurrentView('welcome')}
                    className="btn btn-link text-white p-0 fw-medium"
                    style={{fontSize: '0.8rem'}}
                  >
                    ← Back
                  </button>
                  <h1 className="h6 mb-0" style={{fontSize: '1rem'}}>Book Appointment</h1>
                  <div style={{width: '40px'}}></div>
                </div>
                <p className="text-center text-primary-emphasis mb-0 opacity-75" style={{fontSize: '0.75rem'}}>Schedule your healthcare visit</p>
              </div>

              <div className="card-body p-3">
                {/* Step 1: Select Service */}
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <span className="bg-primary text-white d-flex align-items-center justify-content-center me-2 fw-semibold small" 
                          style={{width: '20px', height: '20px', borderRadius: '50%', fontSize: '0.7rem'}}>1</span>
                    <h2 className="h6 fw-semibold mb-0" style={{fontSize: '0.85rem'}}>Select Service</h2>
                  </div>
                  
                  <select 
                    value={selectedService}
                    onChange={(e) => handleServiceSelect(e.target.value)}
                    className="form-select form-select-sm"
                    style={{fontSize: '16px'}}
                  >
                    <option value="">Choose a service...</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>

                  {selectedServiceObj && (
                    <div className="mt-2 p-2 bg-light rounded border">
                      <p className="small text-muted mb-1" style={{fontSize: '0.7rem'}}>{selectedServiceObj.description}</p>
                      <p className="small fw-medium text-primary mb-0" style={{fontSize: '0.7rem'}}>
                        {getAvailabilityText(selectedServiceObj.availability)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Step 2: Select Time (if applicable) */}
                {selectedServiceObj && canBookOnline(selectedServiceObj.availability) && (
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <span className="bg-primary text-white d-flex align-items-center justify-content-center me-2 fw-semibold small" 
                            style={{width: '20px', height: '20px', borderRadius: '50%', fontSize: '0.7rem'}}>2</span>
                      <h2 className="h6 fw-semibold mb-0" style={{fontSize: '0.85rem'}}>Select Time</h2>
                    </div>

                    <div className="d-grid gap-1">
                      {timeSlots.map((slot, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedTime(`${slot.day} ${slot.time}`)}
                          className={`btn text-start p-2 ${
                            selectedTime === `${slot.day} ${slot.time}`
                              ? 'btn-outline-primary active'
                              : 'btn-outline-secondary'
                          }`}
                          style={{fontSize: '0.75rem'}}
                        >
                          <div className="fw-medium" style={{fontSize: '0.75rem'}}>{slot.day}</div>
                          <div className="small text-muted" style={{fontSize: '0.7rem'}}>{slot.time}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Patient Information */}
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <span className="bg-primary text-white d-flex align-items-center justify-content-center me-2 fw-semibold small" 
                          style={{width: '20px', height: '20px', borderRadius: '50%', fontSize: '0.7rem'}}>
                      {canBookOnline(selectedServiceObj?.availability) ? '3' : '2'}
                    </span>
                    <h2 className="h6 fw-semibold mb-0" style={{fontSize: '0.85rem'}}>Your Information</h2>
                  </div>

                  <div className="row g-2">
                    <div className="col-12">
                      <label className="form-label fw-medium" style={{fontSize: '0.75rem'}}>Full Name *</label>
                      <input
                        type="text"
                        value={patientInfo.name}
                        onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                        className="form-control form-control-sm"
                        placeholder="Enter your full name"
                        style={{fontSize: '16px'}}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium" style={{fontSize: '0.75rem'}}>Phone Number *</label>
                      <input
                        type="tel"
                        value={patientInfo.phone}
                        onChange={(e) => setPatientInfo({...patientInfo, phone: e.target.value})}
                        className="form-control form-control-sm"
                        placeholder="Enter your phone number"
                        style={{fontSize: '16px'}}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium" style={{fontSize: '0.75rem'}}>Email Address</label>
                      <input
                        type="email"
                        value={patientInfo.email}
                        onChange={(e) => setPatientInfo({...patientInfo, email: e.target.value})}
                        className="form-control form-control-sm"
                        placeholder="Enter your email address"
                        style={{fontSize: '16px'}}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-medium" style={{fontSize: '0.75rem'}}>Additional Notes</label>
                      <textarea
                        value={patientInfo.notes}
                        onChange={(e) => setPatientInfo({...patientInfo, notes: e.target.value})}
                        className="form-control"
                        rows={2}
                        placeholder="Brief reason for visit or special requirements"
                        style={{fontSize: '16px'}}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary w-100 py-2 fw-semibold"
                  style={{fontSize: '0.85rem'}}
                >
                  {selectedServiceObj && canBookOnline(selectedServiceObj.availability) 
                    ? 'Book Appointment' 
                    : 'Submit Booking Request'
                  }
                </button>

                {selectedServiceObj && !canBookOnline(selectedServiceObj.availability) && (
                  <div className="alert alert-info mt-2 mb-0 py-2">
                    <p className="small mb-0 text-center" style={{fontSize: '0.7rem'}}>
                      We'll contact you within 24 hours to schedule your appointment
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
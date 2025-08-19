import React, { useEffect, useState } from 'react';
import { Bell, MessageCircle, Calendar, Phone, MoreHorizontal, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    // Detect iOS keyboard appearance
    const handleResize = () => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        const visualViewport = (window as any).visualViewport;
        if (visualViewport) {
          const keyboardHeight = window.innerHeight - visualViewport.height;
          setIsKeyboardOpen(keyboardHeight > 150);
        }
      }
    };

    // Listen for viewport changes (iOS keyboard)
    if ((window as any).visualViewport) {
      (window as any).visualViewport.addEventListener('resize', handleResize);
    }

    // Fallback for older iOS versions
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      if ((window as any).visualViewport) {
        (window as any).visualViewport.removeEventListener('resize', handleResize);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const navItems = [
    { name: 'Home', icon: Home, path: '/home' },
    { name: 'Chat', icon: MessageCircle, path: '/chat' },
    { name: 'Appointments', icon: Calendar, path: '/appointments' },
    { name: 'Calls', icon: Phone, path: '/calls' },
    { name: 'More', icon: MoreHorizontal, path: '/more' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div 
      className={`fixed-bottom bg-white border-top shadow-sm pb-3 ${
        isKeyboardOpen ? 'keyboard-open' : ''
      }`}
      style={{
        bottom: isKeyboardOpen ? '0px' : '0px',
        transition: 'bottom 0.3s ease'
      }}
    >
      <div className="d-flex justify-content-around align-items-stretch p-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`btn btn-link d-flex flex-column align-items-center justify-content-center flex-fill py-1 px-2 text-decoration-none border-0 ${
                isActive ? 'text-primary' : 'text-secondary'
              }`}
              style={{ minWidth: 0 }}
            >
              <div className="d-flex align-items-center justify-content-center p-1">
                <Icon size={16} />
              </div>
              <small className="mt-1 fw-medium" style={{ fontSize: '0.65rem' }}>
                {item.name}
              </small>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
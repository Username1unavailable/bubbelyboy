import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const videoElement = document.getElementById('loadingVideo');
    if (videoElement) {
      videoElement.onended = () => {
        navigate('/home');
      };
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '0px' }}>
      <video 
        id="loadingVideo" 
        width="100%" 
        autoPlay 
        muted 
        playsInline 
        disablePictureInPicture 
        controls={false}
        style={{ pointerEvents: 'none' }}
      >
        <source src="./introhd3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LoadingScreen;

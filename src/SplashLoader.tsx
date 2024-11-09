import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const SplashLoader = ({ videoVisible, setVideoVisible }: any) => {
  const [disableScroll, setDisableScroll] = useState(true);
  const [splashVisible, setSplashVisible] = useState(true);

  const handleSplashEnd = () => {
    setSplashVisible(false);
    setTimeout(() => {
      setDisableScroll(false);
      setVideoVisible(false);
    }, 300);
  };

  useEffect(() => {
    // Function to handle skip
    const skipAnimation = () => {
      handleSplashEnd();
    };

    // Add event listeners
    document.addEventListener('click', skipAnimation);
    document.addEventListener('keydown', skipAnimation);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener('click', skipAnimation);
      document.removeEventListener('keydown', skipAnimation);
    };
  }, []);

  useEffect(() => {
    // Enable or disable scrolling based on the state
    document.body.style.overflow = disableScroll ? 'hidden' : 'auto';

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [disableScroll]);

  return (
    <Fade in={videoVisible} timeout={1000}>
      <Box
        sx={{
          backgroundColor: 'black',
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column', // Stack items vertically
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Fade in={splashVisible}>
          <video
            src="/loader.mp4"
            autoPlay
            loop={false}
            muted
            preload="auto"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: 240,
            }}
            onEnded={() => {
              handleSplashEnd();
            }}
          />
        </Fade>
      </Box>
    </Fade>
  );
};

export default SplashLoader;

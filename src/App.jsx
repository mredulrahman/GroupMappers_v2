import React, { useState, useEffect  } from "react"
// import GRPMbdpage from './components/GRPMbdpage';
import AppRoutes from './components/Routes';
import LoadingScreen from './components/LoadScreen';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

function App() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching or resource loading
    setTimeout(() => {
      setIsLoading(false); // Once loaded, set loading to false
    }, 2000); // Animation/loading for 2 seconds

    // Clean up the timeout
    return () => clearTimeout(setTimeout);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      {/* <GRPMbdpage/> */}
      {/* <AppRoutes /> */}

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <MantineProvider>
          <AppRoutes />
        </MantineProvider>
      )}
    </>
  )
}

export default App

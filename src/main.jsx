import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './router/router';
import NavigateProvider from './context/NavigateProvider';
import ReactGA from 'react-ga4';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SiteBackground from './components/SiteBackground'; // Import koro
import Preloader from './components/Preloader';
import ClickSpark from './components/ClickSpark';

ReactGA.initialize("G-9QH68429Q0");
ReactGA.send("pageview"); 

const RootApp = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <NavigateProvider>
      <ClickSpark
        sparkColor="#a3e635"
        sparkSize={12}
        sparkRadius={24}
        sparkCount={10}
        duration={520}
        easing="ease-out"
        extraScale={1.15}
      >
        <div className="relative min-h-screen">
          {/* Background Section */}
          <SiteBackground />

          <AnimatePresence>{isLoading && <Preloader onFinish={() => setIsLoading(false)} />}</AnimatePresence>

          {/* Main App Content - Transparent background rakte hobe */}
          <div className='site-text-glitch relative z-10 selection:bg-lime-400 selection:text-black'>
            <RouterProvider router={router} />
          </div>
        </div>
      </ClickSpark>
    </NavigateProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);

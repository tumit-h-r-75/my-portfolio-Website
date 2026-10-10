import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import NavigateProvider from './context/NavigateProvider';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SiteBackground from './components/SiteBackground'; // Import koro
import Preloader from './components/Preloader';
import ClickSpark from './components/ClickSpark';
import { applyPerfClasses } from './lib/perf';
import { IntroContext } from './context/IntroContext';

// Google Analytics is loaded once from index.html (gtag) — no second tracker here.

// Low-end / touch device hole heavy effects off kore dey (CSS hooks: .perf-lite, .perf-low)
applyPerfClasses();

const RootApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [introReady, setIntroReady] = useState(false);

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

          <AnimatePresence>
            {isLoading && (
              <Preloader onReveal={() => setIntroReady(true)} onFinish={() => setIsLoading(false)} />
            )}
          </AnimatePresence>

          {/* Main App Content - Transparent background rakte hobe */}
          <div className='site-text-glitch relative z-10 selection:bg-lime-400 selection:text-black'>
            <IntroContext.Provider value={introReady}>
              <RouterProvider router={router} />
            </IntroContext.Provider>
          </div>
        </div>
      </ClickSpark>
    </NavigateProvider>
  );
};

export default RootApp;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './router/router';
import NavigateProvider from './context/NavigateProvider';
import ReactGA from 'react-ga4';
import SiteBackground from './components/SiteBackground'; // Import koro

ReactGA.initialize("G-9QH68429Q0");
ReactGA.send("pageview"); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavigateProvider>
      {/* Background Section */}
      <SiteBackground /> 
      
      {/* Main App Content - Transparent background rakte hobe */}
      <div className='relative z-10 selection:bg-lime-400 selection:text-black'>
        <RouterProvider router={router} />
      </div>
    </NavigateProvider>
  </StrictMode>
);
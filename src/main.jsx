import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './router/router';
import NavigateProvider from './context/NavigateProvider';
import ReactGA from 'react-ga4';

// ✅ Initialize your Google Analytics
ReactGA.initialize("G-9QH68429Q0"); // <-- তোমার Measurement ID বসাও
ReactGA.send("pageview"); // <-- Home page visitor count

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavigateProvider>
      <div className='bg-gray-900'>
        <RouterProvider router={router} />
      </div>
    </NavigateProvider>
  </StrictMode>
);

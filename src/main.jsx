import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './router/router';
import NavigateProvider from './context/NavigateProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavigateProvider>
      <div className='bg-gray-900'>
        <RouterProvider router={router} />
      </div>
    </NavigateProvider>
  </StrictMode>
);

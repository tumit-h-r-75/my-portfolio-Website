import React, { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

// Chat widget is not needed for first paint — load it as a separate chunk
const ChatBot = lazy(() => import('../components/ChatBot/ChatBot'));

const MainLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='max-w-[96rem] mx-auto min-h-screen pt-26'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
            <Suspense fallback={null}>
                <ChatBot />
            </Suspense>
        </div>
    );
};

export default MainLayout;

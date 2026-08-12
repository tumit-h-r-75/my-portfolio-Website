import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot/ChatBot';

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
            <ChatBot />
        </div>
    );
};

export default MainLayout;
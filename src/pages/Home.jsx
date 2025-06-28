import React from 'react';
import Banner from '../components/Banner';
import About from './About';
import SkillBar from '../components/SkillBar';

const Home = () => {
    return (
        <div>
            <section>
                <Banner></Banner>
            </section>
            <section>
                <About></About>
            </section>
            <section>
                <SkillBar></SkillBar>
            </section>
        </div>
    );
};

export default Home;
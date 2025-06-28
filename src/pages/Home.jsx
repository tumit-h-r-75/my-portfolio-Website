import React from 'react';
import Banner from '../components/Banner';
import About from './About';
import SkillBar from '../components/SkillBar';
import Education from '../components/Education';
import ProjectsSection from '../components/ProjectsSection';
import Contact from './Contact';

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
            <section>
                <Education></Education>
            </section>
            <section>
                <ProjectsSection></ProjectsSection>
            </section>
            <section>
                <Contact></Contact>
            </section>
        </div>
    );
};

export default Home;
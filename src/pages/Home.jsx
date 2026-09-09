import React from 'react';
import Banner from '../components/Banner';
import About from './About';
import SkillBar from '../components/SkillBar';
import Education from '../components/Education';
import TechJourney from '../components/TechJourney/TechJourney';
import Workflow from '../components/Workflow/Workflow';
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
                <TechJourney></TechJourney>
            </section>
            <section id="process" className="px-4 sm:px-6 md:px-10 max-w-[96rem] mx-auto">
                <Workflow></Workflow>
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
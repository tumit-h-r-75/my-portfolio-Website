import { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import BorderGlow, { glowTheme } from '../BorderGlow/BorderGlow';
import SectionHeading from '../SectionHeading';
import './TechJourney.css';

const techMilestones = [
  {
    id: 1,
    number: '01',
    tech: 'JavaScript',
    title: 'JavaScript Foundations with Problem-Solving Mindset',
    topics: ['Variables, Data Types, Operators', 'Conditions & Loops', 'Arrays', 'Strings & Objects', 'Functions & Parameters', 'Logic Building & Problem Solving'],
    capabilities: ['JS দিয়ে পেজ জীবন্ত করা', 'ডেটা সেভ-চেঞ্জ করা', 'লজিক দিয়ে সিদ্ধান্ত নেয়া', 'লুপ দিয়ে রিপিট কাজ সহজে করা', 'অ্যারেতে লিস্ট বানিয়ে কাজ করা', 'অবজেক্টে ডেটা অর্গানাইজ করা'],
    color: '#fbbf24',
  },
  {
    id: 2,
    number: '02',
    tech: 'React',
    title: 'React: Building Interactive User Interfaces',
    topics: ['Components & JSX', 'Hooks (useState, useEffect)', 'State Management', 'Routing', 'Performance Optimization', 'Context API'],
    capabilities: ['Interactive UIs তৈরি করা', 'Single Page Apps বানানো', 'Responsive layouts ডিজাইন করা', 'Component reusability বাড়ানো', 'Real-time updates যোগ করা', 'Dynamic page transitions করা'],
    color: '#06b6d4',
  },
  {
    id: 3,
    number: '03',
    tech: 'Node.js',
    title: 'Node.js & Express: Backend Development',
    topics: ['Express.js Framework', 'REST APIs', 'Middleware', 'Authentication', 'Error Handling', 'Async Operations'],
    capabilities: ['Backend servers তৈরি করা', 'API endpoints ডিজাইন করা', 'Request processing করা', 'Data validation যোগ করা', 'Session management করা', 'Authentication implement করা'],
    color: '#22c55e',
  },
  {
    id: 4,
    number: '04',
    tech: 'MongoDB',
    title: 'MongoDB: NoSQL Database Design',
    topics: ['Data Modeling', 'CRUD Operations', 'Schema Design', 'Aggregation', 'Indexing', 'Data Validation'],
    capabilities: ['Data persistence করা', 'Complex queries তৈরি করা', 'Data relationships manage করা', 'Performance optimize করা', 'Backup & recovery করা', 'Data integrity নিশ্চিত করা'],
    color: '#10b981',
  },
  {
    id: 5,
    number: '05',
    tech: 'Full Stack',
    title: 'Full Stack: Next.js & Production Deployment',
    topics: ['Next.js Fundamentals', 'Server-Side Rendering', 'API Routes', 'Deployment', 'Performance Metrics', 'Security Best Practices'],
    capabilities: ['Production apps তৈরি করা', 'Performance optimize করা', 'SEO-friendly sites বানানো', 'Scalable architecture ডিজাইন করা', 'Monitoring & logging setup করা', 'Security implement করা'],
    color: '#a3e635',
  },
];

const TechJourney = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [selectedId, setSelectedId] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const selectedMilestone = useMemo(
    () => techMilestones.find((m) => m.id === selectedId),
    [selectedId]
  );

  useEffect(() => {
    if (!svgRef.current || isMobile) return;

    const svg = svgRef.current;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;

    svg.setAttribute('width', containerWidth);
    svg.setAttribute('height', containerHeight);

    // Dynamic positions
    const centerX = containerWidth / 2;
    const centerY = 80;
    const leftX = 80;
    const rightX = containerWidth - 80;
    const contentY = Math.min(containerHeight * 0.45, 280);

    // Main line from left through center
    const leftPathData = `M ${leftX},${contentY} C ${centerX - 100},${contentY} ${centerX + 50},${centerY + 40} ${centerX},${centerY}`;

    // Main line from center going right (will branch)
    const mainRightPathData = `M ${centerX},${centerY} C ${centerX + 100},${centerY + 40} ${rightX - 50},${contentY} ${rightX},${contentY}`;

    // Branch lines from center to each capability
    const capabilitiesCount = selectedMilestone?.capabilities.length || 6;
    const spacing = containerHeight * 0.35 / capabilitiesCount;
    const branchPaths = [];

    for (let i = 0; i < capabilitiesCount; i++) {
      const itemY = contentY - (capabilitiesCount - 1) * spacing / 2 + i * spacing;
      const branchPathData = `M ${centerX},${centerY} C ${centerX + 80},${centerY + (itemY - centerY) * 0.3} ${rightX - 60},${itemY - 20} ${rightX},${itemY}`;
      branchPaths.push(branchPathData);
    }

    // Update main paths
    const pathLeft = document.querySelector('.path-left');
    const pathMainRight = document.querySelector('.path-right');
    const pathLeftGlow = document.querySelector('.path-left-glow');
    const pathMainRightGlow = document.querySelector('.path-right-glow');

    if (pathLeft) pathLeft.setAttribute('d', leftPathData);
    if (pathMainRight) pathMainRight.setAttribute('d', mainRightPathData);
    if (pathLeftGlow) {
      pathLeftGlow.setAttribute('d', leftPathData);
      pathLeftGlow.style.opacity = '1';
    }
    if (pathMainRightGlow) {
      pathMainRightGlow.setAttribute('d', mainRightPathData);
      pathMainRightGlow.style.opacity = '1';
    }

    // Update branch paths
    branchPaths.forEach((pathData, idx) => {
      const branchPath = document.querySelector(`.path-branch-${idx}`);
      const branchGlowPath = document.querySelector(`.path-branch-glow-${idx}`);

      if (branchPath) branchPath.setAttribute('d', pathData);
      if (branchGlowPath) {
        branchGlowPath.setAttribute('d', pathData);
        branchGlowPath.style.opacity = '1';
      }
    });
  }, [isMobile, selectedId, selectedMilestone?.capabilities.length]);

  return (
    <section className="tech-journey-section">
      <SectionHeading
        before="My Learning"
        highlight="Tech Journey"
        highlightClassName="text-lime-400"
      />

      {/* Milestone Carousel */}
      <div className="milestone-carousel-wrapper">
        <div className="milestone-carousel">
          <div className="carousel-track">
            {techMilestones.map((milestone) => (
              <motion.button
                key={milestone.id}
                onClick={() => setSelectedId(milestone.id)}
                className={`milestone-carousel-badge ${selectedId === milestone.id ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {milestone.number}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div ref={containerRef} className="tech-journey-container">
        {/* SVG Connector Lines */}
        <svg ref={svgRef} className="journey-svg">
          <defs>
            <filter id="journey-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(163, 230, 53, 0.6)" />
              <stop offset="50%" stopColor="rgba(163, 230, 53, 1)" />
              <stop offset="100%" stopColor="rgba(163, 230, 53, 0.6)" />
            </linearGradient>
          </defs>

          {/* Main paths: Left to Center */}
          <path className="path-left" stroke="rgba(229, 231, 235, 0.3)" strokeWidth="2" fill="none" />
          <path className="path-left-glow" stroke="url(#pathGradient)" strokeWidth="2.5" fill="none" filter="url(#journey-glow)" />

          {/* Main paths: Center to Right */}
          <path className="path-right" stroke="rgba(229, 231, 235, 0.3)" strokeWidth="2" fill="none" />
          <path className="path-right-glow" stroke="url(#pathGradient)" strokeWidth="2.5" fill="none" filter="url(#journey-glow)" />

          {/* Branch paths to each capability */}
          {selectedMilestone?.capabilities.map((_, idx) => (
            <g key={`branch-${idx}`}>
              <path className={`path-branch-${idx}`} stroke="rgba(229, 231, 235, 0.15)" strokeWidth="1.5" fill="none" />
              <path className={`path-branch-glow-${idx}`} stroke="url(#pathGradient)" strokeWidth="1.5" fill="none" filter="url(#journey-glow)" />
            </g>
          ))}
        </svg>

        {!isMobile ? (
          <div className="three-column-layout">
            {/* LEFT: Topics */}
            <motion.div
              className="column topics-column"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BorderGlow {...glowTheme} backgroundColor="#0d121f" borderRadius={24}>
                <div className="column-inner">
                  <h3 className="column-heading">
                    <span className="heading-label">টপিক</span>
                    <span className="heading-main">Topic will <span className="highlight">Cover</span></span>
                  </h3>
                  <div className="topics-list">
                    {selectedMilestone?.topics.map((topic, idx) => (
                      <motion.div
                        key={idx}
                        className="topic-badge"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.3 }}
                      >
                        {topic}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            </motion.div>

            {/* CENTER: Milestone Card - File/Folder Icon Style */}
            <motion.div
              className="column center-column"
              key={selectedId}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="milestone-card">
                <svg className="milestone-file-icon" viewBox="0 0 301 301" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="fileGrad1" x1="150.5" y1="40" x2="150.5" y2="270" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(163, 230, 53, 0.4)" />
                      <stop offset="100%" stopColor="rgba(163, 230, 53, 0.1)" />
                    </linearGradient>
                    <linearGradient id="fileGrad2" x1="150.5" y1="65" x2="150.5" y2="240" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(163, 230, 53, 0.35)" />
                      <stop offset="100%" stopColor="rgba(163, 230, 53, 0.08)" />
                    </linearGradient>
                  </defs>

                  {/* Base layers */}
                  <path d="M134.928 43.5484C132.474 41.3493 129.295 40.1333 126 40.1333H53.5109C47.9696 40.1333 43.4775 44.6254 43.4775 50.1667V205.683H257.522V67.5362C257.522 61.9949 253.03 57.5028 247.489 57.5028H155.617C152.322 57.5028 149.143 56.2868 146.689 54.0878L134.928 43.5484Z" fill="url(#fileGrad1)" />

                  <path opacity="0.75" d="M42.3902 79.1551C42.0714 71.5535 48.1479 65.2168 55.7562 65.2168H245.244C252.852 65.2168 258.929 71.5535 258.61 79.1551L252.72 219.622C252.419 226.786 246.524 232.439 239.353 232.439H61.6468C54.4764 232.439 48.5811 226.786 48.2807 219.622L42.3902 79.1551Z" fill="url(#fileGrad2)" />

                  <path opacity="0.6" d="M38.2329 85.8656C37.9015 78.256 43.9813 71.9058 51.598 71.9058H249.402C257.019 71.9058 263.098 78.256 262.767 85.8656L256.65 226.332C256.338 233.487 250.447 239.128 243.285 239.128H57.7151C50.5531 239.128 44.6616 233.487 44.35 226.332L38.2329 85.8656Z" fill="rgba(163, 230, 53, 0.2)" />

                  {/* Border */}
                  <rect x="40" y="85" width="220" height="155" rx="8" fill="none" stroke="rgba(163, 230, 53, 0.3)" strokeWidth="1" />
                </svg>

                <div className="milestone-card-content">
                  <div className="milestone-number">{selectedMilestone?.number}</div>
                  <div className="milestone-badge">
                    <span>{selectedMilestone?.tech}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Capabilities */}
            <motion.div
              className="column capabilities-column"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BorderGlow {...glowTheme} backgroundColor="#0d121f" borderRadius={24}>
                <div className="column-inner">
                  <h3 className="column-heading">
                    <span className="heading-label">যোগ্যতা</span>
                    <span className="heading-main">তুমি <span className="highlight">কী কী</span> করতে পারবে</span>
                  </h3>
                  <div className="capabilities-list">
                    {selectedMilestone?.capabilities.map((capability, idx) => (
                      <motion.div
                        key={idx}
                        className="capability-item"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.3 }}
                      >
                        <span className="capability-icon">✓</span>
                        <span>{capability}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          </div>
        ) : (
          // Mobile: Stacked
          <motion.div
            className="mobile-stack"
            key={selectedId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BorderGlow {...glowTheme} backgroundColor="#0d121f" borderRadius={20}>
              <div className="column-inner">
                <h3 className="column-heading">টপিক</h3>
                <div className="topics-list">
                  {selectedMilestone?.topics.map((topic, idx) => (
                    <div key={idx} className="topic-badge">
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </BorderGlow>

            <BorderGlow {...glowTheme} backgroundColor="#0d121f" borderRadius={20}>
              <div className="column-inner">
                <h3 className="column-heading">কী কী করতে পারবে</h3>
                <div className="capabilities-list">
                  {selectedMilestone?.capabilities.map((capability, idx) => (
                    <div key={idx} className="capability-item">
                      <span className="capability-icon">✓</span>
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            </BorderGlow>
          </motion.div>
        )}
      </div>

      {/* Journey Progress */}
      <div className="journey-progress">
        <span>Journey <span className="current">{selectedId}</span> of <span className="total">{techMilestones.length}</span></span>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${(selectedId / techMilestones.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </section>
  );
};

export default TechJourney;

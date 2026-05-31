/**
 * CONTENT DATA FILE
 * Central location for all portfolio content
 */

// ============================================
// BASIC INFO
// ============================================

export const logotext = "🎲";

export const meta = {
    title: "Enesi Y.Y | Software Engineer | Chemical Engineer | Professional Forex Analyst",
    description: "Software Engineer, Chemical Engineer & Professional Forex Analyst. Full-stack development, process optimization, and financial market analysis.",
};

// ============================================
// RESUME / DOWNLOAD
// ============================================

export const resumeLink = {
    url: "/resume/enesi-yy-resume.pdf",
    label: "Download Resume",
    fileName: "Enesi_YY_Resume.pdf",
};

// ============================================
// HERO / INTRO SECTION
// ============================================

export const introdata = {
    title: "Enesi Y.Y",
    animated: {
        first: "Software Engineer",
        second: "Chemical Engineer",
        third: "Professional Forex Analyst",
    },
    description: "Multidisciplinary professional bridging software engineering, chemical engineering, and financial markets. Building innovative solutions, optimizing industrial processes, and analyzing global currency trends.",
    your_img_url: "https://i.pinimg.com/1200x/ea/b3/6a/eab36aafb5a93dc0452f506a1609da4f.jpg",
    buttons: {
        hireMe: "Hire Me",
        downloadCV: "Download CV",
        contactMe: "Contact Me",
        Portfolio: "View Portfolio",
    },
};

// ============================================
// ABOUT SECTION
// ============================================

export const dataabout = {
    title: "About Me",
    aboutme: "I'm a Software Engineer, Chemical Engineer, and Professional Forex Analyst with a unique blend of technical and analytical expertise. As a software engineer, I build full-stack applications and scalable systems. My chemical engineering background gives me a systematic approach to process optimization and industrial problem-solving. As a forex analyst, I specialize in technical and fundamental analysis, market trends, and risk management. This multidisciplinary background allows me to approach challenges from multiple perspectives and deliver comprehensive solutions.",
};

// ============================================
// EDUCATION SECTION
// ============================================

export const education = [
    {
        id: 1,
        degree: "B.Eng. Chemical Engineering",
        institution: "Bayero University",
        location: "Kano State, Nigeria",
        date: "November 2017 – July 2024",
        achievements: [
            "Studied core chemical engineering disciplines including thermodynamics, fluid mechanics, and process design.",
            "Completed industrial training at NIPP Gas Plant, applying engineering principles in a live production environment.",
            "Graduated with a strong foundation in process optimisation, safety, and instrumentation.",
        ],
    },
    {
        id: 2,
        degree: "Software Development Programme",
        institution: "Ts Academy",
        location: "Lagos State, Nigeria / United Kingdom",
        date: "November 2025 – June 2026",
        achievements: [
            "Completed structured training in full-stack web development covering React.js, Node.js, APIs, and software architecture.",
        ],
    },
];

// ============================================
// SKILLS SECTION — NO VALUE FIELD
// ============================================

export const skills = [
    // Software Engineering
    { name: "JavaScript / TypeScript", category: "Software Engineering" },
    { name: "React / Next.js",         category: "Software Engineering" },
    { name: "Python / Django",         category: "Software Engineering" },
    { name: "Node.js / Express",       category: "Software Engineering" },
    { name: "HTML5 / CSS3 / Tailwind", category: "Software Engineering" },
    { name: "SQL / MongoDB",           category: "Software Engineering" },

    // Chemical Engineering
    { name: "Process Optimization",        category: "Chemical Engineering" },
    { name: "Chemical Process Simulation", category: "Chemical Engineering" },
    { name: "Industrial Safety",           category: "Chemical Engineering" },
    { name: "Plant Operations",            category: "Chemical Engineering" },

    // Forex Analysis
    { name: "Technical Analysis",    category: "Forex Analysis" },
    { name: "Fundamental Analysis",  category: "Forex Analysis" },
    { name: "Risk Management",       category: "Forex Analysis" },
    { name: "Trading Psychology",    category: "Forex Analysis" },
    { name: "MetaTrader Platforms",  category: "Forex Analysis" },
    { name: "Market Trend Analysis", category: "Forex Analysis" },
];

// ============================================
// SERVICES SECTION
// ============================================

export const services = [
    {
        title: "Software Development",
        description: "Full-stack web development, custom applications, API integration, responsive design, and modern frontend frameworks.",
    },
    {
        title: "Chemical Engineering Consulting",
        description: "Process optimization, plant efficiency analysis, industrial safety audits, and chemical process simulation.",
    },
    {
        title: "Forex Trading & Analysis",
        description: "Professional technical and fundamental analysis, market trend forecasting, trading strategies, and risk management.",
    },
    {
        title: "Forex Education & Mentorship",
        description: "One-on-one trading mentorship, forex market education, strategy development, and trading psychology coaching.",
    },
];

// ============================================
// PORTFOLIO / PROJECTS SECTION
// ============================================

export const dataportfolio = [
    { id: 1,  img: "https://picsum.photos/400/?grayscale",     description: "Full-stack web application built with React, Node.js, and MongoDB for task management.",                        link: "#", title: "Task Management Dashboard",      category: "Software Engineering" },
    { id: 2,  img: "https://picsum.photos/400/800/?grayscale", description: "E-commerce platform with payment integration and admin dashboard.",                                              link: "#", title: "E-Commerce Platform",             category: "Software Engineering" },
    { id: 3,  img: "https://picsum.photos/400/?grayscale",     description: "Portfolio website with dark/light mode and responsive design.",                                                   link: "#", title: "Portfolio Website",               category: "Software Engineering" },
    { id: 4,  img: "https://picsum.photos/400/600/?grayscale", description: "Chemical process optimization reducing energy consumption by 25% in manufacturing plant.",                        link: "#", title: "Process Efficiency Optimization", category: "Chemical Engineering" },
    { id: 5,  img: "https://picsum.photos/400/300/?grayscale", description: "Industrial safety audit and risk assessment for chemical processing facility.",                                    link: "#", title: "Safety & Risk Assessment",        category: "Chemical Engineering" },
    { id: 6,  img: "https://picsum.photos/400/700/?grayscale", description: "Developed comprehensive forex trading strategy with 65% win rate over 6 months.",                                 link: "#", title: "Forex Strategy Development",       category: "Forex Analysis" },
    { id: 7,  img: "https://picsum.photos/400/600/?grayscale", description: "Market trend analysis report for major currency pairs (EUR/USD, GBP/USD, USD/JPY).",                             link: "#", title: "Market Analysis Report",           category: "Forex Analysis" },
    { id: 8,  img: "https://picsum.photos/400/300/?grayscale", description: "Risk management framework for forex traders with position sizing strategies.",                                     link: "#", title: "Forex Risk Management System",    category: "Forex Analysis" },
    { id: 9,  img: "https://picsum.photos/400/?grayscale",     description: "Technical indicator combination for high-probability trade entries.",                                              link: "#", title: "Technical Analysis Toolkit",      category: "Forex Analysis" },
    { id: 10, img: "https://picsum.photos/400/550/?grayscale", description: "API integration project connecting forex data to web dashboard.",                                                  link: "#", title: "Forex Data API Integration",      category: "Software Engineering" },
];

// ============================================
// CONTACT SECTION
// ============================================

export const contactConfig = {
    YOUR_EMAIL: "ahmadallahyy@gmail.com",
    YOUR_FONE: "+234-8088751166",
    description: "Available for software development projects, chemical engineering consulting, forex market analysis, and trading mentorship. Reach out to discuss how I can help with your projects.",
    YOUR_SERVICE_ID: "your_service_id",
    YOUR_TEMPLATE_ID: "your_template_id",
    YOUR_USER_ID: "your_user_id",
};

// ============================================
// SOCIAL MEDIA PROFILES - UPDATED (Removed duplicate Discord & Facebook, Added TikTok)
// ============================================

export const socialprofils = {
    linkedin:  "https://linkedin.com/in/enesi-yy",
    discord:   "https://discord.com/users/enesi_yy",
    twitter:   "https://twitter.com/enesi_yy",
    github:    "https://github.com/enesiyy",
    tiktok:    "https://tiktok.com/@enesi_yy",
    instagram: "https://instagram.com/enesi.yy",
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getProjectById       = (id)       => dataportfolio.find(p => p.id === id);
export const getSkillByName       = (name)     => skills.find(s => s.name === name);
export const getProjectsByCategory = (category) => dataportfolio.filter(p => p.category === category);
export const getSkillsByCategory  = (category) => skills.filter(s => s.category === category);
export const getEducationById     = (id)       => education.find(e => e.id === id);
export const getLatestEducation   = ()         => education[0];

export default {
    logotext, meta, resumeLink, introdata, dataabout,
    education, skills, services,
    dataportfolio, contactConfig, socialprofils,
};
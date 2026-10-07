/* ============================================================
   PORTFOLIO DATA CONFIGURATION - KRISHNA WAGH
   Easily update and maintain all portfolio content here!
   ============================================================ */

const defaultPortfolioData = {
  profile: {
    name: "Krishna Wagh",
    tagline: "Software Engineer & Full-Stack Developer",
    statusBadge: "Open to Work • Seeking Software Engineering & Internship Roles",
    location: "India • Open to Remote & Relocation",
    email: "krishnawagh.dev@gmail.com",
    github: "https://github.com/Krishna9423-wagh",
    linkedin: "https://linkedin.com/in/krishna-wagh",
    twitter: "https://x.com/krishnawagh_dev",
    bioShort: "Passionate Software Developer dedicated to engineering clean, robust, and user-centric digital experiences. Ready to contribute, learn rapidly, and add immediate value to forward-thinking engineering teams.",
    bioLong: "I am a driven software developer with a strong foundation in modern computer science, full-stack web development, and problem solving. I thrive at the intersection of performant backend engineering and intuitive frontend design. With a persistent curiosity for emerging technologies and a commitment to writing clean, maintainable code, I am actively seeking full-time software engineering roles and internships where I can contribute to high-impact products while growing alongside top-tier engineering talent.",
    avatarUrl: "", // Defaults to clean initials/avatar SVG if empty
    typingTitles: [
      "Full-Stack Web Developer",
      "Software Engineering Intern",
      "Problem Solver & Algorithmic Builder",
      "Modern React & Node.js Specialist",
      "API & System Architecture Enthusiast"
    ],
    stats: [
      { label: "Projects Built", value: "12+", suffix: "", icon: "folder-git-2" },
      { label: "DSA Problems Solved", value: "350+", suffix: "", icon: "code" },
      { label: "Technologies Mastered", value: "15+", suffix: "", icon: "cpu" },
      { label: "Commit Consistency", value: "99.8%", suffix: "", icon: "activity" }
    ]
  },

  skills: {
    categories: [
      { id: "all", name: "All Technologies" },
      { id: "frontend", name: "Frontend & UI" },
      { id: "backend", name: "Backend & APIs" },
      { id: "database", name: "Databases & Cloud" },
      { id: "tools", name: "Tools & Fundamentals" }
    ],
    items: [
      // Frontend
      { name: "JavaScript (ES6+)", category: "frontend", level: "Advanced", icon: "code-2", color: "#F7DF1E" },
      { name: "React.js", category: "frontend", level: "Advanced", icon: "atom", color: "#61DAFB" },
      { name: "TypeScript", category: "frontend", level: "Intermediate", icon: "file-code", color: "#3178C6" },
      { name: "HTML5 / Semantic Web", category: "frontend", level: "Expert", icon: "layout", color: "#E34F26" },
      { name: "CSS3 / Modern Styling", category: "frontend", level: "Advanced", icon: "palette", color: "#1572B6" },
      { name: "Tailwind CSS", category: "frontend", level: "Advanced", icon: "sparkles", color: "#38B2AC" },
      { name: "Responsive UI/UX Design", category: "frontend", level: "Advanced", icon: "smartphone", color: "#A855F7" },

      // Backend
      { name: "Node.js", category: "backend", level: "Advanced", icon: "server", color: "#339933" },
      { name: "Express.js", category: "backend", level: "Advanced", icon: "layers", color: "#000000" },
      { name: "RESTful API Design", category: "backend", level: "Advanced", icon: "network", color: "#6366F1" },
      { name: "Python", category: "backend", level: "Intermediate", icon: "terminal", color: "#3776AB" },
      { name: "Authentication & JWT", category: "backend", level: "Advanced", icon: "shield-check", color: "#10B981" },

      // Database & Cloud
      { name: "MongoDB & Mongoose", category: "database", level: "Advanced", icon: "database", color: "#47A248" },
      { name: "PostgreSQL / SQL", category: "database", level: "Intermediate", icon: "table", color: "#4169E1" },
      { name: "Redis Caching", category: "database", level: "Intermediate", icon: "zap", color: "#DC382D" },
      { name: "Vercel & Netlify", category: "database", level: "Advanced", icon: "cloud-upload", color: "#000000" },

      // Tools & Fundamentals
      { name: "Data Structures & Algorithms", category: "tools", level: "Proficient", icon: "binary", color: "#EC4899" },
      { name: "Git & GitHub", category: "tools", level: "Advanced", icon: "git-branch", color: "#F05032" },
      { name: "Postman API Testing", category: "tools", level: "Advanced", icon: "send", color: "#FF6C37" },
      { name: "Docker Fundamentals", category: "tools", level: "Basics", icon: "box", color: "#2496ED" },
      { name: "Linux / Bash Scripting", category: "tools", level: "Intermediate", icon: "terminal", color: "#FCC624" }
    ]
  },

  projects: [
    {
      id: "taskpulse",
      title: "TaskPulse - Collaborative Smart Task Suite",
      badge: "Full-Stack • Productivity SaaS",
      category: "fullstack",
      featured: true,
      shortDesc: "Enterprise-grade Kanban task and project management suite featuring real-time state synchronization, smart priority tagging, deadline analytics, and fluid drag-and-drop workflows.",
      fullDesc: "TaskPulse is a modern, high-performance productivity application engineered to streamline individual and team workflows. Built with an agile mindset, it offers kanban boards, customizable tags, real-time status updates, markdown task notes, and data persistence with search and filtering.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "REST API"],
      highlights: [
        "Interactive drag-and-drop Kanban workflow with smooth CSS micro-interactions",
        "Role-based task organization with multi-tier status categories (Backlog, In Progress, Review, Completed)",
        "Local and cloud persistence with fast indexed querying and instant filtering",
        "Comprehensive keyboard shortcuts for rapid task creation and status changes"
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Krishna9423-wagh/create-a-to-do-app",
      previewGradient: "from-indigo-600 via-purple-600 to-pink-500",
      stats: { stars: "★ Top Featured", metric: "< 60ms Latency" }
    },
    {
      id: "devfolio",
      title: "DevFolio Pro - Interactive Portfolio Engine",
      badge: "Modern Frontend • UI/UX",
      category: "frontend",
      featured: true,
      shortDesc: "A sleek, responsive portfolio web application featuring glassmorphism design, theme switching, dynamic project modals, interactive resume generator, and particle constellation background.",
      fullDesc: "Designed to showcase software engineering acumen to tech recruiters. Features clean accessibility, zero external heavy runtime dependencies, responsive touch layout, live customizer modal, and print-ready PDF resume stylesheet.",
      techStack: ["JavaScript (ES6+)", "HTML5", "CSS3 / Variables", "Tailwind CSS", "Canvas API"],
      highlights: [
        "Particle constellation physics engine running smoothly on 60 FPS Canvas",
        "Dual Dark / Light mode with smooth CSS variables transition and persistent storage",
        "Recruiter-ready Resume viewer with instant print-to-PDF formatting",
        "Live Portfolio Customizer allowing instantaneous edits and profile preview"
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Krishna9423-wagh",
      previewGradient: "from-cyan-600 via-blue-600 to-indigo-600",
      stats: { stars: "★ 100/100 Lighthouse", metric: "100% Responsive" }
    },
    {
      id: "nexuschat",
      title: "NexusChat - Real-Time Collaborative Workspace",
      badge: "Full-Stack • WebSockets",
      category: "fullstack",
      featured: true,
      shortDesc: "Real-time communication platform offering workspace channels, direct messages, active presence detection, typing indicators, and markdown message formatting.",
      fullDesc: "NexusChat solves the latency problem in modern remote team communication. Powered by WebSockets and efficient pub/sub architecture, it provides instant message delivery, room isolation, and persistent chat archives.",
      techStack: ["Node.js", "React", "Socket.io", "MongoDB", "Express", "JWT Auth"],
      highlights: [
        "Sub-10ms message propagation using bidirectional WebSocket connections",
        "Secure JSON Web Token (JWT) session handling and encrypted credential storage",
        "Channel permission management and active user presence tracking",
        "Responsive sidebar with mobile swipe navigation and notification sound effects"
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Krishna9423-wagh",
      previewGradient: "from-emerald-600 via-teal-600 to-cyan-600",
      stats: { stars: "★ WebSockets", metric: "Real-Time Sync" }
    },
    {
      id: "algorise",
      title: "Algorise - Interactive Algorithm Visualizer",
      badge: "Core CS • Algorithms",
      category: "tools",
      featured: false,
      shortDesc: "Educational visualizer bringing sorting algorithms (QuickSort, MergeSort, HeapSort) and graph traversals (Dijkstra, BFS, DFS) to life with step-by-step animations.",
      fullDesc: "Created to deepen intuition for complex data structures and asymptotic complexities. Features adjustable speed controls, custom array generators, step-by-step debugger, and side-by-side time/space complexity comparisons.",
      techStack: ["JavaScript", "HTML5 Canvas", "CSS Grid", "Web Workers"],
      highlights: [
        "Non-blocking visualization engine utilizing asynchronous generators and Web Workers",
        "Visual step-by-step call stack and memory allocation diagrams",
        "Audio synthesis mapping array values to musical pitch for multimodal learning",
        "Interactive comparison mode pitting two sorting algorithms against identical datasets"
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Krishna9423-wagh",
      previewGradient: "from-violet-600 via-purple-600 to-amber-500",
      stats: { stars: "★ Educational", metric: "60 FPS Visuals" }
    },
    {
      id: "shopsphere",
      title: "ShopSphere - Modern E-Commerce Platform",
      badge: "Full-Stack • Commercial",
      category: "fullstack",
      featured: false,
      shortDesc: "End-to-end e-commerce store with intuitive product catalog, dynamic multi-filter facets, responsive shopping cart, order review, and mock checkout workflow.",
      fullDesc: "Engineered with focus on fast client-side navigation, minimal re-renders, and frictionless customer checkout experience. Includes mock admin portal for managing inventory and tracking analytics.",
      techStack: ["React", "Context API", "Node.js", "Tailwind CSS", "REST API"],
      highlights: [
        "Instant search with debounced querying and price/category faceted filtering",
        "Persistent cart state with instant quantity updates and total calculations",
        "Order receipt generator and simulated checkout validation pipeline",
        "Mobile-first responsive product gallery with image lightbox zoom"
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Krishna9423-wagh",
      previewGradient: "from-rose-600 via-red-600 to-orange-500",
      stats: { stars: "★ E-Commerce", metric: "Fast Navigation" }
    },
    {
      id: "weathersphere",
      title: "WeatherSphere - Geospatial Forecast & Air Quality",
      badge: "API Integration • Data",
      category: "frontend",
      featured: false,
      shortDesc: "Interactive real-time meteorological dashboard featuring geolocation lookup, 7-day predictive weather graphs, hourly temperature curve, and air quality indices.",
      fullDesc: "Fetches live geospatial meteorological data via OpenWeather and Geocoding APIs. Presents complex weather data in clean, readable glassmorphism charts and dynamic weather-reactive background gradients.",
      techStack: ["JavaScript (ES6+)", "Chart.js", "Fetch API", "Tailwind CSS"],
      highlights: [
        "Geolocation-based auto-detection with fallback manual city search across the globe",
        "Dynamic background changes responding to real-time weather conditions (Rain, Sun, Storm)",
        "Interactive hourly temperature trends plotted with Chart.js canvas elements",
        "Cached API responses in sessionStorage to reduce redundant network calls"
      ],
      liveUrl: "#",
      githubUrl: "https://github.com/Krishna9423-wagh",
      previewGradient: "from-sky-600 via-blue-600 to-indigo-700",
      stats: { stars: "★ Data Viz", metric: "RESTful API" }
    }
  ],

  journey: [
    {
      type: "education",
      period: "2023 - 2027",
      title: "Bachelor of Technology / Engineering in Computer Science",
      organization: "University Engineering Institute",
      location: "India",
      description: "Focusing on Core Computer Science principles including Data Structures & Algorithms, Database Systems, Object-Oriented Software Design, Operating Systems, Computer Networks, and Full-Stack Web Technologies. Maintaining strong academic excellence and active participation in coding competitions.",
      highlights: [
        "Core Coursework: DSA, System Architecture, DBMS, Web Development, OOP in Java/C++",
        "Active member of Technical Coding Club and Developer Student Community",
        "Regular participant in inter-college hackathons and algorithmic programming challenges"
      ],
      icon: "graduation-cap"
    },
    {
      type: "experience",
      period: "2024 - Present",
      title: "Full-Stack Developer & Open Source Contributor",
      organization: "Independent & Community Projects",
      location: "Remote",
      description: "Architected and delivered multiple full-stack applications solving practical developer and productivity bottlenecks. Focused on modern web technologies, modular code patterns, and automated CI/CD practices.",
      highlights: [
        "Developed full-stack web applications using React, Node.js, Express, and MongoDB",
        "Designed clean, RESTful APIs following industry best practices and comprehensive error handling",
        "Actively collaborating on open-source repositories and refining code quality through code reviews"
      ],
      icon: "briefcase"
    },
    {
      type: "achievement",
      period: "2024",
      title: "Competitive Programming & Problem Solving Milestone",
      organization: "LeetCode & Coding Platforms",
      location: "Online",
      description: "Consistently solved 350+ data structures and algorithms challenges across arrays, strings, trees, dynamic programming, and graphs. Honed analytical thinking and optimization mindset under time constraints.",
      highlights: [
        "350+ problems solved across LeetCode, HackerRank, and GeeksforGeeks",
        "Earned multiple monthly problem-solving badges and badges in SQL & Algorithms"
      ],
      icon: "award"
    }
  ],

  testimonials: [
    {
      quote: "Krishna demonstrates exceptional dedication to building clean software. His ability to quickly understand requirements, ask the right technical questions, and implement elegant solutions makes him a tremendous asset to any engineering team.",
      author: "Senior Engineering Mentor",
      role: "Tech Lead & Mentor"
    },
    {
      quote: "Working alongside Krishna on projects is always smooth. He writes well-structured, maintainable code, respects deadlines, and always looks for ways to improve user experience and system performance.",
      author: "Project Collaborator",
      role: "Full-Stack Peer Developer"
    }
  ]
};

// State Manager with LocalStorage Support
class PortfolioManager {
  constructor() {
    this.STORAGE_KEY = 'krishna_portfolio_data_v1';
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultPortfolioData, ...parsed };
      }
    } catch (e) {
      console.warn("Failed to load stored portfolio data, using defaults.", e);
    }
    return JSON.parse(JSON.stringify(defaultPortfolioData));
  }

  saveData(newData) {
    try {
      this.data = { ...this.data, ...newData };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
      return true;
    } catch (e) {
      console.error("Failed to save portfolio data.", e);
      return false;
    }
  }

  resetToDefault() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.data = JSON.parse(JSON.stringify(defaultPortfolioData));
  }

  getProfile() { return this.data.profile; }
  getSkills() { return this.data.skills; }
  getProjects() { return this.data.projects; }
  getJourney() { return this.data.journey; }
  getTestimonials() { return this.data.testimonials; }
}

const portfolioState = new PortfolioManager();

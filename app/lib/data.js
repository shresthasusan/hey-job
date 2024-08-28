/// for messages
const users = [
  {
    name: "John Doe",
    message: "Pick me at 9:00 AM",
    image: "/images/placeholder-614.webp",
    time: "9:00 AM",
    id: 1,
  },
  {
    name: "Jane Smith",
    message: "Hi Sam, Welcome",
    image: "/images/placeholder-614.webp",
    time: "9:00 AM",
    id: 2,
  },
  {
    name: "Michael Johnson",
    message: "Micheal : Thanks Everyone",
    image: "/images/placeholder-614.webp",
    time: "9:00 AM",
    id: 3,
  },
  {
    name: "Sarah Thompson",
    message: "Sarah : some one can fix this",
    image: "/images/placeholder-614.webp",
    time: "9:00 AM",
    id: 4,
  },
  {
    name: "David Wilson",
    message: "David : some one can fix this",
    image: "/images/placeholder-614.webp",
    time: "9:00 AM",
    id: 5,
  },
  {
    name: "Emily Davis",
    message: "Emily : some one can fix this",
    image: "/images/placeholder-614.webp",
    time: "9:00 AM",
    id: 6,
  },
  {
    name: "Daniel Anderson",
    message: "Daniel : some one can fix this",
    image: "/images/placeholder-614.webp",
    time: "9:00 AM",
    id: 7,
  },

  {
    name: "React Developers",
    message: "New hooks tutorial available",
    image: "/images/placeholder-614.webp",
    time: "10:15 AM",
    id: 8,
  },
  {
    name: "Vue Vixens",
    message: "Join our Vue3 webinar",
    image: "/images/placeholder-614.webp",
    time: "11:00 AM",
    id: 9,
  },
  {
    name: "Angular Architects",
    message: "Monthly meeting rescheduled",
    image: "/images/placeholder-614.webp",
    time: "12:45 PM",
    id: 10,
  },
  {
    name: "Python Programmers",
    message: "Hackathon next weekend",
    image: "/images/placeholder-614.webp",
    time: "1:30 PM",
    id: 11,
  },
  {
    name: "Flutter Friends",
    message: "State management discussion",
    image: "/images/placeholder-614.webp",
    time: "2:15 PM",
    id: 12,
  },
  {
    name: "Node.js Ninjas",
    message: "Express vs Koa - which is better?",
    image: "/images/placeholder-614.webp",
    time: "3:00 PM",
    id: 13,
  },
  {
    name: "Blockchain Buffs",
    message: "Smart contract workshop",
    image: "/images/placeholder-614.webp",
    time: "3:45 PM",
    id: 14,
  },
  {
    name: "AI Enthusiasts",
    message: "New ML model released",
    image: "/images/placeholder-614.webp",
    time: "4:30 PM",
    id: 15,
  },
  {
    name: "Cybersecurity Circle",
    message: "Vulnerability analysis session",
    image: "/images/placeholder-614.webp",
    time: "5:15 PM",
    id: 16,
  },
  {
    name: "DevOps Dudes",
    message: "CI/CD pipeline setup guide",
    image: "/images/placeholder-614.webp",
    time: "6:00 PM",
    id: 17,
  },
];
// for jobs dashboard
const jobsData = [
  {
    time: "2 hours ago",
    title: "Frontend Developer",
    type: "Fixed-price",
    experience: "Intermediate",
    budget: 500,
    description:
      "Looking for an experienced frontend developer to revamp our e-commerce site. The ideal candidate must be proficient in React, HTML, CSS, and have solid experience with responsive design. The project involves redesigning the user interface to improve user experience and increase conversion rates. Familiarity with UX principles and SEO optimization is a plus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, metus a ultricies vehicula, felis justo aliquam nunc, et varius nisl turpis et metus.",
    tags: ["React", "HTML", "CSS", "Responsive Design"],
    location: "Remote",
    saved: true,
  },
  {
    time: "1 day ago",
    title: "Full-stack Developer",
    type: "Fixed-price - Expert",
    experience: "Entry Level",
    budget: 3000,
    description:
      "We need a full-stack developer to build a web application from scratch. The project requires a developer with experience in Node.js, MongoDB, Express, and React. The ideal candidate should be able to work independently, design the database schema, implement backend logic, and develop a responsive frontend. Knowledge of cloud services and deployment is essential.",
    tags: ["Node.js", "MongoDB", "Express", "React"],
    location: "Remote",
    saved: false,
  },
  {
    time: "3 days ago",
    title: "Mobile App Developer",
    type: "Fixed-price - Intermediate",
    experience: "Entry Level",
    budget: 2000,
    description:
      "Seeking a mobile app developer to create a social media application. The project requires experience with Flutter and Firebase. The developer should be capable of implementing custom user interfaces and integrating third-party APIs. Previous work with social media apps or real-time chat applications will be considered an advantage.",
    tags: ["Flutter", "Firebase", "Mobile App Development"],
    location: "Remote",
    saved: true,
  },
  {
    time: "1 week ago",
    title: "SEO Specialist",
    type: "Hourly",
    experience: "Entry Level",
    budget: 15,
    description:
      "Looking for an SEO specialist to improve our website's Google ranking. The project involves comprehensive keyword research, backlink analysis, and content optimization. The ideal candidate should have a proven track record of successful SEO strategies and be familiar with the latest SEO tools and techniques. Experience with Google Analytics and Search Console is required.",
    tags: ["SEO", "Keyword Research", "Content Optimization"],
    location: "Remote",
    saved: false,
  },
  // Added data
  {
    time: "2 weeks ago",
    title: "Graphic Designer for Branding Project",
    type: "Fixed-price - Expert",
    experience: "Intermediate",
    budget: 1500,
    description:
      "We are looking for a talented graphic designer to lead our branding project. The project includes logo design, brand guidelines, and marketing materials. The ideal candidate should have a strong portfolio showcasing innovative design solutions and experience in brand identity projects. Proficiency in Adobe Creative Suite is required.",
    tags: ["Graphic Design", "Branding", "Adobe Creative Suite"],
    location: "Remote",
    saved: false,
  },
  {
    time: "3 weeks ago",
    title: "Data Analyst for Market Research",
    type: "Hourly - Intermediate",
    experience: "Expert",
    budget: 35,
    description:
      "Seeking a data analyst to conduct market research and provide insights for our new product launch. The project involves analyzing customer data, market trends, and competitor analysis. The ideal candidate should have experience with data visualization tools and statistical analysis. Familiarity with SQL and Python for data manipulation is a plus.",
    tags: ["Data Analysis", "Market Research", "SQL", "Python"],
    location: "Remote",
    saved: true,
  },
];

const recent = [
  {
    time: "Just now",
    title: "Backend Developer for FinTech Startup",
    type: "Fixed-price - Expert",
    experience: "Expert",
    budget: 4000,
    description:
      "Looking for a seasoned backend developer to join our FinTech startup. The project involves developing secure, scalable APIs and integrating payment gateways. Proficiency in Node.js, Express, and MongoDB is required. Experience with financial services and knowledge of PCI compliance is a plus.",
    tags: ["Node.js", "Express", "MongoDB", "FinTech"],
    location: "Remote",
    saved: false,
  },
  {
    time: "5 minutes ago",
    title: "UI/UX Designer for Mobile App",
    type: "Hourly - Intermediate",
    experience: "Intermediate",
    budget: 25,
    description:
      "Seeking a creative UI/UX designer to revamp our existing mobile application. The ideal candidate should have a strong portfolio in mobile app design, focusing on user experience and modern design trends. Proficiency in Sketch or Figma is required. Experience with user testing and research is a plus.",
    tags: ["UI/UX Design", "Sketch", "Figma", "Mobile App"],
    location: "Remote",
    saved: true,
  },
  {
    time: "30 minutes ago",
    title: "WordPress Developer for E-commerce Site",
    type: "Fixed-price - Intermediate",
    experience: "Intermediate",
    budget: 1000,
    description:
      "We need a WordPress developer to create a custom e-commerce site. The project requires experience with WooCommerce, custom theme development, and plugin customization. The ideal candidate should be able to optimize the site for performance and SEO.",
    tags: ["WordPress", "WooCommerce", "E-commerce"],
    location: "Remote",
    saved: false,
  },
  {
    time: "1 hour ago",
    title: "Digital Marketing Specialist",
    type: "Hourly - Expert",
    experience: "Expert",
    budget: 50,
    description:
      "Looking for a digital marketing specialist to enhance our online presence. The project involves social media marketing, PPC campaigns, email marketing, and SEO. The ideal candidate should have a proven track record in increasing online engagement and sales.",
    tags: ["Digital Marketing", "SEO", "PPC", "Email Marketing"],
    location: "Remote",
    saved: true,
  },
  {
    time: "2 hours ago",
    title: "Cloud Engineer for Infrastructure Setup",
    type: "Hourly - Expert",
    experience: "Expert",
    budget: 70,
    description:
      "Seeking a cloud engineer to set up our cloud infrastructure. The project requires experience with AWS, Azure, or Google Cloud. The ideal candidate should be able to design a scalable, secure, and cost-effective cloud environment.",
    tags: ["Cloud Engineering", "AWS", "Azure", "Google Cloud"],
    location: "Remote",
    saved: false,
  },
];

// const saved = [
//   {
//     time: "3 days ago",
//     title: "Mobile App Developer",
//     type: "Fixed-price - Intermediate",
//     experience: "Entry Level",
//     budget: 2000,
//     description:
//       "Seeking a mobile app developer to create a social media application. The project requires experience with Flutter and Firebase. The developer should be capable of implementing custom user interfaces and integrating third-party APIs. Previous work with social media apps or real-time chat applications will be considered an advantage.",
//     tags: ["Flutter", "Firebase", "Mobile App Development"],
//     location: "Remote",
//     saved: true,
//   },
//   {
//     time: "1 week ago",
//     title: "SEO Specialist",
//     type: "Hourly",
//     experience: "Entry Level",
//     budget: 15,
//     description:
//       "Looking for an SEO specialist to improve our website's Google ranking. The project involves comprehensive keyword research, backlink analysis, and content optimization. The ideal candidate should have a proven track record of successful SEO strategies and be familiar with the latest SEO tools and techniques. Experience with Google Analytics and Search Console is required.",
//     tags: ["SEO", "Keyword Research", "Content Optimization"],
//     location: "Remote",
//     saved: false,
//   },
//   // Added data
//   {
//     time: "2 weeks ago",
//     title: "Graphic Designer for Branding Project",
//     type: "Fixed-price - Expert",
//     experience: "Intermediate",
//     budget: 1500,
//     description:
//       "We are looking for a talented graphic designer to lead our branding project. The project includes logo design, brand guidelines, and marketing materials. The ideal candidate should have a strong portfolio showcasing innovative design solutions and experience in brand identity projects. Proficiency in Adobe Creative Suite is required.",
//     tags: ["Graphic Design", "Branding", "Adobe Creative Suite"],
//     location: "Remote",
//     saved: false,
//   },
// ];

/// ongoing jobs data
const ongoingProjects = [
  {
    projectName: "E-commerce Website Redesign",
    category: "Web Development",
    description:
      "Redesign and optimize an existing e-commerce website for better UX/UI.",
    budget: "$5,000",
    deadline: "Sep 30, 2024",
    clientName: "Alice Tech Solutions",
  },
  {
    projectName: "Mobile App for Delivery",
    category: "Mobile Development",
    description:
      "Develop a cross-platform mobile app for a local delivery service.",
    budget: "$8,500",
    deadline: "Oct 15, 2024",
    clientName: "Urban Courier Inc.",
  },
  {
    projectName: "Marketing Automation Setup",
    category: "Digital Marketing",
    description:
      "Implement a marketing automation platform for targeted campaigns.",
    budget: "$3,200",
    deadline: "Sep 20, 2024",
    clientName: "BrightStar Media",
  },
  {
    projectName: "Custom CRM Development",
    category: "Software Development",
    description:
      "Build a custom CRM solution tailored for a mid-sized business.",
    budget: "$12,000",
    deadline: "Nov 1, 2024",
    clientName: "Prime Business Co.",
  },
  {
    projectName: "Data Analysis Tool",
    category: "Data Science & Analytics",
    description:
      "Develop a tool for analyzing sales data and generating reports.",
    budget: "$4,500",
    deadline: "Sep 25, 2024",
    clientName: "Data Insights Ltd.",
  },
  {
    projectName: "E-commerce Website Redesign",
    category: "Web Development",
    description:
      "Redesign and optimize an existing e-commerce website for better UX/UI.",
    budget: "$5,000",
    deadline: "Sep 30, 2024",
    clientName: "Alice Tech Solutions",
  },
  {
    projectName: "Mobile App for Delivery",
    category: "Mobile Development",
    description:
      "Develop a cross-platform mobile app for a local delivery service.",
    budget: "$8,500",
    deadline: "Oct 15, 2024",
    clientName: "Urban Courier Inc.",
  },
  {
    projectName: "Marketing Automation Setup",
    category: "Digital Marketing",
    description:
      "Implement a marketing automation platform for targeted campaigns.",
    budget: "$3,200",
    deadline: "Sep 20, 2024",
    clientName: "BrightStar Media",
  },
  {
    projectName: "Custom CRM Development",
    category: "Software Development",
    description:
      "Build a custom CRM solution tailored for a mid-sized business.",
    budget: "$12,000",
    deadline: "Nov 1, 2024",
    clientName: "Prime Business Co.",
  },
  {
    projectName: "Data Analysis Tool",
    category: "Data Science & Analytics",
    description:
      "Develop a tool for analyzing sales data and generating reports.",
    budget: "$4,500",
    deadline: "Sep 25, 2024",
    clientName: "Data Insights Ltd.",
  },
];

module.exports = {
  users,
  jobsData,
  recent,
  ongoingProjects,
};

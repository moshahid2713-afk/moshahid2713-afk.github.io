export type Project = {
  name: string;
  shortName: string;
  description: string;
  details: string;
  technologies: string[];
  features: string[];
  category: string;
  github?: string;
  accent: string;
  concepts?: string[];
  relatedSkills?: string[];
};

export const profile = {
  name: "Mohammed Shahid",
  role: "B.Tech CSE Student · Developer · Problem Solver",
  graduation: "Expected graduation 2029",
  github: "https://github.com/moshahid2713-afk",
  linkedin: "https://www.linkedin.com/in/mohammed-shahid-undefined-689531404/",
  email: "",
};

export const projects: Project[] = [
  {
    name: "MiniProject",
    shortName: "MiniProject",
    description: "GitHub project — explore the repository for implementation details.",
    details: "The public repository does not currently provide a project description or README detail beyond its name.",
    technologies: ["C", "Makefile", "Batchfile"],
    features: [],
    category: "Systems",
    github: "https://github.com/moshahid2713-afk/MiniProject",
    accent: "cyan",
    concepts: [],
    relatedSkills: ["C"],
  },
  {
    name: "C-Line_editor",
    shortName: "C-Line_editor",
    description: "Simple Line Editor (C) — a small command-line line editor.",
    details: "A C line editor backed by a dynamic array of char* pointers. The README documents insert, delete, display, save/load, and search operations.",
    technologies: ["C", "Dynamic array of char*"],
    features: ["Insert", "Delete", "Display", "Save", "Load", "Search"],
    category: "Systems",
    github: "https://github.com/moshahid2713-afk/C-Line_editor",
    accent: "violet",
    relatedSkills: ["C"],
  },
  {
    name: "programming-portfolio-1",
    shortName: "programming-portfolio-1",
    description: "A collection of programming projects and practice programs in C, C++.",
    details: "The repository description identifies it as a collection of programming projects and practice programs in C and C++.",
    technologies: ["C++", "C"],
    features: [],
    category: "Academic",
    github: "https://github.com/moshahid2713-afk/programming-portfolio-1",
    accent: "blue",
    relatedSkills: ["C", "C++"],
  },
  {
    name: "programming-portfolio",
    shortName: "programming-portfolio",
    description: "A collection of programming projects and practice programs in C, C++, Python, Java, HTML, and other technologies.",
    details: "The repository is a collection of programming projects and practice programs across the languages listed in its public description.",
    technologies: ["Java", "C++", "C", "Python"],
    features: [],
    category: "Development",
    github: "https://github.com/moshahid2713-afk/programming-portfolio",
    accent: "amber",
    relatedSkills: ["C", "C++", "Python", "Java"],
  },
  {
    name: "programmingportfolio3",
    shortName: "programmingportfolio3",
    description: "GitHub project — explore the repository for implementation details.",
    details: "The requested public repository could not be retrieved, so no implementation details are inferred here.",
    technologies: ["Repository details unavailable"],
    features: [],
    category: "Other",
    github: "https://github.com/moshahid2713-afk/programmingportfolio3",
    accent: "cyan",
  },
  {
    name: "leetcode-solutions",
    shortName: "leetcode-solutions",
    description: "Personal LeetCode practice log — part of a portfolio.",
    details: "The README organizes the practice log into Arrays & Strings, Basic Algorithms, Stacks, and Linked Lists.",
    technologies: ["C++", "Arrays & Strings", "Basic Algorithms", "Stacks", "Linked Lists"],
    features: ["Arrays & Strings", "Basic Algorithms", "Stacks", "Linked Lists"],
    category: "Problem Solving",
    github: "https://github.com/moshahid2713-afk/leetcode-solutions",
    accent: "blue",
    concepts: ["Arrays & Strings", "Basic Algorithms", "Stacks", "Linked Lists"],
    relatedSkills: ["C++", "Data Structures & Algorithms", "Problem Solving"],
  },
  {
    name: "ipl2026",
    shortName: "ipl2026",
    description: "GitHub project — explore the repository for implementation details.",
    details: "The public repository does not currently provide a description or README detail to summarize.",
    technologies: ["C"],
    features: [],
    category: "Other",
    github: "https://github.com/moshahid2713-afk/ipl2026",
    accent: "violet",
    relatedSkills: ["C"],
  },
];

export const skills = [
  { group: "Programming", items: ["C", "C++", "Python", "Java"] },
  { group: "Computer science", items: ["Data Structures & Algorithms", "Problem Solving", "Object-Oriented Programming", "Programming Fundamentals"] },
  { group: "Tools", items: ["Git", "GitHub", "VS Code"] },
  { group: "AI / ML", items: ["Python", "AI fundamentals", "Machine Learning fundamentals"] },
];

export const journey = [
  { year: "2025", title: "Started B.Tech CSE", text: "Began the degree journey in Computer Science & Engineering." },
  { year: "2025–2026", title: "Built programming fundamentals", text: "Worked through core programming concepts and hands-on C projects." },
  { year: "2026", title: "Deeper DSA practice", text: "Started sharpening data structures and problem-solving skills." },
  { year: "2026+", title: "Building and expanding", text: "Turning learning into projects while exploring development and AI/ML fundamentals." },
  { year: "2029", title: "Expected graduation", text: "The planned finish line for the B.Tech CSE degree." },
];

export const problemSet = [
  ["Two Sum", "Arrays & Strings", "C++", "Hash map lookup"],
  ["Valid Anagram", "Arrays & Strings", "C++", "Frequency counting"],
  ["Reverse a String", "Arrays & Strings", "C++", "Two pointers"],
  ["Longest Common Prefix", "Arrays & Strings", "C++", "String traversal"],
  ["Best Time to Buy and Sell Stock", "Basic Algorithms", "C++", "Greedy scan"],
  ["Binary Search", "Basic Algorithms", "C++", "Divide and conquer"],
  ["Move Zeroes", "Arrays & Strings", "C++", "In-place array update"],
  ["Reverse Linked List", "Linked Lists", "C++", "Pointer manipulation"],
];

export const certifications = [
  { name: "Introduction to Python", issuer: "IBM", skill: "Python fundamentals" },
  { name: "Basics of Machine Learning", issuer: "IBM", skill: "Machine learning fundamentals" },
];

export const learning = [
  ["DSA", "Breaking problems into smaller, testable steps."],
  ["C++", "Practicing a language suited to algorithms and systems."],
  ["Problem Solving", "Getting clearer about the why before the how."],
  ["Development", "Turning concepts into small, useful projects."],
  ["AI/ML", "Building fundamentals in Python and machine learning."],
  ["Quantitative Aptitude", "Keeping the reasoning muscles active."],
];

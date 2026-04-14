import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowLeft, Trophy, Award, Medal, Star, Target, ChevronLeft, Globe, Shield, Network, FileCode, Layout, Palette } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { HeroMode } from "./Index";
import SpideyBackground from "@/components/SpideyBackground";
import IronManBackground from "@/components/IronManBackground";
import DeadpoolBackground from "@/components/DeadpoolBackground";
import BatmanBackground from "@/components/BatmanBackground";
import SupermanBackground from "@/components/SupermanBackground";

const themes: Record<HeroMode, { accent: string; dim: string; cardBg: string; border: string; glow: string; bgSrc: string }> = {
  spidey:   { accent: "#ffffff", dim: "#ffffff", cardBg: "rgba(3,3,5,0.95)",  border: "rgba(255,255,255,0.2)",  glow: "0 0 30px rgba(0,0,0,0.6)", bgSrc: "/spiderman-bg.png" },
  ironman:  { accent: "#ff2200", dim: "#ff8c8c", cardBg: "rgba(10,0,0,0.95)", border: "rgba(255,0,0,0.3)",  glow: "0 0 30px rgba(220,30,0,0.5)", bgSrc: "/ironman-bg.png" },
  deadpool: { accent: "#dc1414", dim: "#ff4444", cardBg: "rgba(12,0,0,0.95)",  border: "rgba(255,255,255,0.15)", glow: "0 0 30px rgba(200,20,0,0.5)", bgSrc: "/deadpool-bg.jpg" },
  batman:   { accent: "#fdc700", dim: "#ffe44d", cardBg: "rgba(2,2,5,0.98)", border: "rgba(255,220,0,0.2)", glow: "0 0 30px rgba(180,130,0,0.4)", bgSrc: "/batman-bg.jpg" },
  superman: { accent: "#4488ff", dim: "#ffc000", cardBg: "rgba(1,5,25,0.95)", border: "rgba(50,150,255,0.25)", glow: "0 0 30px rgba(50,100,255,0.4)", bgSrc: "/superman-bg.jpg" },
};

const categories = [
  { 
    id: "codechef", 
    name: "Codechef Achievements", 
    icon: Star, 
    description: "Competitive programming milestones and algorithmic rankings.",
    highlight: "2 Star" 
  },
  { 
    id: "codechef_certs", 
    name: "Codechef Certifications", 
    icon: FileCode, 
    description: "Professional certifications in web development and user experience.",
    highlight: "Verified" 
  },
  { 
    id: "cisco", 
    name: "Cisco Netacad Achievements", 
    icon: Network, 
    description: "Verified certifications in web foundations and logical scripting.",
    highlight: "Certified" 
  },
  {
    id: "lingo",
    name: "Lingo Certifications",
    icon: Globe,
    description: "Official language proficiency certifications and global evaluations.",
    highlight: "Fluent"
  },
  { 
    id: "other", 
    name: "Other Accomplishments", 
    icon: Award, 
    description: "Technical certifications, project milestones, and special mentions." 
  },
];

const achievementsData = [
  {
    mode: "spidey",
    items: [
      {
        category: "codechef",
        title: "2-Star Slinger",
        tagline: "1405 Codechef Rating",
        icon: Star as any,
        image: "/codechef-2star.png",
        context: "Achieved a 2-star rating on Codechef. Like swinging through the city, competitive programming requires perfect timing and the ability to react to any 'unexpected' bug with spider-like agility.",
        features: ["Algorithmic Efficiency", "Problem Solving", "Time-Bound Delivery", "Competitive Edge"],
        stats: { stars: "2", rating: "1405", rank: "Top 20%" }
      },
      {
        category: "codechef",
        title: "Gold Badge Problem Solver",
        tagline: "796+ Problems Overcome",
        icon: Trophy as any,
        image: "/goldbadge-codechef.png",
        context: "Earned the Gold Problem Solver badge by conquering over 796 algorithmic challenges. No bug can hide when my spider-sense for logic is tingling at maximum capacity.",
        features: ["Massive Problem Set", "Analytical Persistence", "Logic Mastery", "Web-Wide Solutions"],
        stats: { level: "Gold", solved: "796+", status: "Elite" }
      },
      {
        category: "cisco",
        title: "JavaScript Essentials 1",
        tagline: "Logic-Slinging Mastery",
        icon: FileCode as any,
        image: "/js essentials-badge.png",
        context: "Developing a spider-sense for logic. Certified in the dynamic scripting protocols that make the web come alive with reflex-like precision and agility.",
        features: ["Dynamic Logic", "Reflexive Scripting", "Algorithm Timing", "Web Interactivity"],
        stats: { status: "Verified", platform: "Cisco Netacad", issued: "Feb 26, 2026" }
      },
      {
        category: "cisco",
        title: "CSS Essentials",
        tagline: "Visual Weaving Expert",
        icon: Palette as any,
        image: "/css essentials-badge.png",
        context: "Mastered the art of visual weaving. Like a custom-tailored suit, these styling skills ensure every element fits perfectly and looks spectacular under any pressure.",
        features: ["Responsive Weaving", "Style Precision", "Aesthetic DNA", "UI Textures"],
        stats: { status: "Verified", platform: "Cisco Netacad", issued: "Feb 24, 2026" }
      },
      {
        category: "cisco",
        title: "HTML Essentials",
        tagline: "Structural Web Foundations",
        icon: Globe as any,
        image: "/html essentials-badge.png",
        context: "The webbing of the web. Certified in the structural foundations that keep the internet standing tall, even when everything else is hanging by a thread.",
        features: ["Semantic Foundation", "Structural Integrity", "Web Accessibility", "SEO Backbone"],
        stats: { status: "Verified", platform: "Cisco Netacad", issued: "Jan 23, 2026" }
      },
      {
        category: "codechef_certs",
        title: "HTML Web Foundation",
        tagline: "Certified Markup Specialist",
        icon: FileCode as any,
        image: "/html-codechef.png",
        context: "Mastered the structural DNA of the web. Like building the perfect web-fluid formula, a solid HTML foundation is essential for swinging through the internet with precision and strength.",
        features: ["Semantic HTML5", "Structural Architecture", "Accessibility Standards", "Web Foundations"],
        stats: { status: "Verified", platform: "Codechef", date: "Feb 2026" }
      },
      {
        category: "codechef_certs",
        title: "CSS Styling Mastery",
        tagline: "Visual Weaving Expert",
        icon: Palette as any,
        image: "/css-codechef.png",
        context: "Mastered the art of web aesthetics. From Suit textures to dynamic cityscapes, CSS is the thread that weaves the visual fabric of the digital world with style and flair.",
        features: ["Advanced Layouts", "Responsive Design", "Animation Styling", "Visual Fidelity"],
        stats: { status: "Verified", platform: "Codechef", date: "Feb 2026" }
      },
      {
        category: "codechef_certs",
        title: "UX for Web Developers",
        tagline: "User-Centric Design Specialist",
        icon: Layout as any,
        image: "/ux-codechef.png",
        context: "Developed a spider-sense for user behavior. Understanding how users navigate the web ensures that every interface is as intuitive as a reflex action.",
        features: ["User Research", "Wireframing", "Interaction Design", "Usability Testing"],
        stats: { status: "Verified", platform: "CodeChef", date: "Jan 2026" }
      },
            {
        category: "lingo",
        title: "EFSET English Certificate",
        tagline: "Proficient Spidey-Senses",
        icon: Globe as any,
        image: "/efset-certificate.png",
        context: "Communication is key when swinging through New York. This certification proves my web-slinger level fluency in English, ensuring no cries for help go misunderstood.",
        features: ["Fluent Communication", "Global Networking", "Universal Understanding", "Fast Response"],
        stats: { status: "Verified", platform: "EFSET", level: "Advanced" }
      },
      {
        category: "other",
        title: "Web Mastery Certification",
        tagline: "Full-Stack Development Specialist",
        icon: Globe as any,
        context: "Recognized for building high-performance, responsive web applications with a focus on modern user experiences and robust backend architectures. Swinging through the web with precision.",
        features: ["React Architecture", "Scalable Systems", "Performance Tuning", "UI/UX Fidelity"],
        stats: { status: "Certified", platform: "FreeCodeCamp", year: "2024" }
      }
    ]
  },
  {
    mode: "ironman",
    items: [
      {
        category: "codechef",
        title: "Grade 2 Algorithm Tech",
        tagline: "1405 Codechef Rating",
        icon: Star as any,
        image: "/codechef-2star.png",
        context: "Validated as a 2-star competitive programmer on Codechef. This milestone reflects the engineering precision required to optimize algorithms to Stark Industries' rigorous performance standards.",
        features: ["Optimized Logic", "Binary Search Mastery", "Dynamic Programming", "High-Pressure Execution"],
        stats: { stars: "2", rating: "1405", status: "Validated" }
      },
      {
        category: "codechef",
        title: "JARVIS-Grade Solver",
        tagline: "Gold Badge Excellence (796+ Solved)",
        icon: Trophy as any,
        image: "/goldbadge-codechef.png",
        context: "Secured the Gold Problem Solver badge. Integrating complex logic patterns to solve 796+ technical hurdles—roughly the effort required to recalibrate an entire Iron Man squadron.",
        features: ["Advanced Data Structures", "Efficiency Tuning", "Stark-Tech Logic", "Massive Scalability"],
        stats: { level: "Gold", count: "796+", tech: "Stark-OS" }
      },
      {
        category: "cisco",
        title: "JavaScript Essentials 1",
        tagline: "Core Logic Engine",
        icon: FileCode as any,
        image: "/js essentials-badge.png",
        context: "Engineered the dynamic scripting foundations that power JARVIS's secondary interface response protocols with Stark-level efficiency and speed.",
        features: ["Logical Architecture", "System Scripting", "Real-Time Response", "Efficiency Tuning"],
        stats: { status: "Certified", platform: "Cisco Netacad", issued: "Feb 26, 2026" }
      },
      {
        category: "cisco",
        title: "CSS Essentials",
        tagline: "UI Armor Calibration",
        icon: Palette as any,
        image: "/css essentials-badge.png",
        context: "Synchronized the visual subsystems to ensure a seamless, high-fidelity user interface across all Iron Man operating units and global Stark data hubs.",
        features: ["Interface Mapping", "Visual Fidelity", "Adaptive UI", "Armor Aesthetics"],
        stats: { status: "Certified", platform: "Cisco Netacad", issued: "Feb 24, 2026" }
      },
      {
        category: "cisco",
        title: "HTML Essentials",
        tagline: "Base Chassis Architecture",
        icon: Layout as any,
        image: "/html essentials-badge.png",
        context: "Established the structural integrity required to support advanced Stark-grade digital displays and modular data nodes across the global satellite network.",
        features: ["Structural Systems", "Data Layout", "Core Architecture", "Modular Standards"],
        stats: { status: "Certified", platform: "Cisco Netacad", issued: "Jan 23, 2026" }
      },
      {
        category: "codechef_certs",
        title: "Stark-HTML5 Protocol",
        tagline: "Structural Systems Specialist",
        icon: FileCode as any,
        image: "/html-codechef.png",
        context: "Certified in the core structural protocols that power the modern web. Building the digital armor of high-performance applications requires semantic precision and modular efficiency at every layer.",
        features: ["Modular Markup", "Technical SEO", "Standard Compliance", "Schema Integration"],
        stats: { status: "Verified", platform: "Codechef", date: "Feb 2026" }
      },
      {
        category: "codechef_certs",
        title: "Nano-Aesthetic CSS",
        tagline: "Visual Systems Architect",
        icon: Palette as any,
        image: "/css-codechef.png",
        context: "Engineered high-fidelity visual systems. Certified in the modular styling protocols required to render Stark-grade interfaces with unparalleled precision and efficiency.",
        features: ["CSS-in-JS", "Modular Styling", "Performance Paint", "Hardware Acceleration"],
        stats: { status: "Verified", platform: "Codechef", date: "Feb 2026" }
      },
      {
        category: "codechef_certs",
        title: "Human-Interface Optimizer",
        tagline: "UX Engineering Grade 7",
        icon: Layout as any,
        image: "/ux-codechef.png",
        context: "Optimizing the interface between human and machine. Utilizing advanced UX analytics to ensure that every user interaction is as seamless as a neural link with JARVIS.",
        features: ["Neural UX Flow", "interface Ergonomics", "Cognitive Load Balancing", "Interaction Analytics"],
        stats: { status: "Verified", platform: "CodeChef", date: "Jan 2026" }
      },
            {
        category: "lingo",
        title: "Global Communications Proto",
        tagline: "EFSET Linguistic Mastery",
        icon: Globe as any,
        image: "/efset-certificate.png",
        context: "Stark Industries requires seamless global communication. Certified in advanced English linguistics to negotiate contracts and interface with international defense networks.",
        features: ["Global Interface", "Universal Translation", "Executive Communication", "Executive Fluency"],
        stats: { status: "Verified", platform: "EFSET", level: "Advanced" }
      },
      {
        category: "other",
        title: "Cyber Defense Protocol",
        tagline: "System Security & Optimization",
        icon: Shield as any,
        context: "Successfully implemented advanced security protocols for distributed systems, ensuring JARVIS-level protection against external threats and data integrity across all nodes.",
        features: ["Encryption", "Threat Analysis", "System Hardening", "AI Integration"],
        stats: { level: "Elite", platform: "Stark Labs", auth: "Level 7" }
      }
    ]
  },
  {
    mode: "deadpool",
    items: [
      {
        category: "codechef",
        title: "2-Star Chimichanga",
        tagline: "1405 Rating with Maximum Effort",
        icon: Star as any,
        image: "/codechef-2star.png",
        context: "Nailed a 2-star rating on Codechef with Maximum Effort. Coding is like a chimichanga—it's all about the right spice (and solving hard math problems without crying).",
        features: ["Cheeky Logic", "Chimichanga Powered", "Unstoppable Coding", "Fourth Wall Hacks"],
        stats: { stars: "2", rating: "1405", effort: "MAX" }
      },
      {
        category: "codechef",
        title: "Gold Badge Mercenary",
        tagline: "796+ Problems Annihilated",
        icon: Trophy as any,
        image: "/goldbadge-codechef.png",
        context: "Solved 796+ problems. That's a lot of typing. My fingers are basically superheroes now. Gold badge? More like 'Gold Medal for Not Being Bored' badge. Just kidding, I love it.",
        features: ["Relentless Solving", "Fourth Wall Logic", "Taco Breaks", "Code Chaos Mastery"],
        stats: { status: "Gold", solved: "796+", damage: "High" }
      },
      {
        category: "cisco",
        title: "JavaScript Essentials 1",
        tagline: "Explosive Logical Effort",
        icon: FileCode as any,
        image: "/js essentials-badge.png",
        context: "Nailed the logic part of coding. They said I couldn't learn it. I told them logic is just a chimichanga with too much syntax. 4th wall shattered, certification achieved.",
        features: ["Chaotic Scripting", "Fourth Wall Logic", "Taco-Powered Code", "Infinite Effort"],
        stats: { status: "Certified", platform: "Cisco Netacad", issued: "Feb 26, 2026" }
      },
      {
        category: "cisco",
        title: "CSS Essentials",
        tagline: "Fancy Spandex Styles",
        icon: Palette as any,
        image: "/css essentials-badge.png",
        context: "Turns out you can make the web look as good as I do in red spandex. Certified in making things look flashy enough to distract the bad guys while I heal.",
        features: ["Red & Black Focus", "Maximum Style", "Responsive Puns", "Visual Domination"],
        stats: { status: "Certified", platform: "Cisco Netacad", issued: "Feb 24, 2026" }
      },
      {
        category: "cisco",
        title: "HTML Essentials",
        tagline: "Structural Chimichanga",
        icon: Layout as any,
        image: "/html essentials-badge.png",
        context: "Found out the boxes on the internet are made of tags. Who knew? Now I build my own boxes. Big boxes, small boxes, boxes that hold infinite tacos.",
        features: ["Box-Model Brawling", "Semantic Sarcasm", "Structural Chaos", "Legitimate Markup"],
        stats: { status: "Certified", platform: "Cisco Netacad", issued: "Jan 23, 2026" }
      },
      {
        category: "codechef_certs",
        title: "Fourth-Wall Markup",
        tagline: "Web Foundation Acrobat",
        icon: FileCode as any,
        image: "/html-codechef.png",
        context: "Learned HTML because the boxes on my profile weren't pretty enough. Now I can build my own boxes. And they have rounded corners. And they are RED. Maximum markup effort achieved.",
        features: ["Div Soup Mastery", "Tag Acrobatics", "Semantic Sarcasm", "Pixel Perfection"],
        stats: { status: "Certified", platform: "Codechef", date: "Feb 2026" }
      },
      {
        category: "codechef_certs",
        title: "Red & Black Stylist",
        tagline: "CSS Mercenary Grade",
        icon: Palette as any,
        image: "/css-codechef.png",
        context: "They said 'don't use too much red'. I used ONLY red. And some black. Certified in making the web look as good as my spandex (which is to say, spectacular).",
        features: ["Color Overload", "Responsive Puns", "Flashy Layouts", "Maximum Style"],
        stats: { status: "Verified", platform: "Codechef", date: "Feb 2026" }
      },
      {
        category: "codechef_certs",
        title: "Mercenary UX",
        tagline: "User Engagement Master",
        icon: Layout as any,
        image: "/ux-codechef.png",
        context: "Making the web easier to use, because users are basically just mercenaries for clarity. Certified in creating interfaces that even I can't break. (Trust me, I tried).",
        features: ["Chaos Reduction", "Intuitive Triggers", "Visual Puns", "User Soul Hacking"],
        stats: { status: "Verified", platform: "CodeChef", date: "Jan 2026" }
      },
            {
        category: "lingo",
        title: "Loudmouth Certification",
        tagline: "EFSET English Master",
        icon: Globe as any,
        image: "/efset-certificate.png",
        context: "I talk a lot. Sometimes in different languages. This piece of paper says I'm officially good at English. Watch out world, I'm verbally unstoppable.",
        features: ["Sarcasm Fluent", "Fourth Wall Taunts", "Mercenary Linguistics", "Chimichanga Talk"],
        stats: { status: "Verified", platform: "EFSET", level: "Maximum" }
      },
      {
        category: "other",
        title: "Mercenary of the Web",
        tagline: "Unpredictable UI/UX Engineering",
        icon: Target as any,
        context: "Broke the fourth wall of design. Created interfaces so intuitive they practically talk back (sometimes they actually do). Who needs documentation when you have pure talent?",
        features: ["Rule Breaking", "Visual Chaos", "Rapid Prototyping", "Actually Works"],
        stats: { damage: "Low", style: "High", chimichangas: "12" }
      }
    ]
  },
  {
    mode: "batman",
    items: [
      {
        category: "codechef",
        title: "2-Star Detective",
        tagline: "1405 Rating (Investigation Complete)",
        icon: Star as any,
        image: "/codechef-2star.png",
        context: "Achieved 2-star status on Codechef. Mastering algorithms from the shadows, this milestone reflects a relentless pursuit of binary justice and logical perfection.",
        features: ["Silent Algorithms", "Forensic Logic", "Shadow Coding", "Logical Fortress"],
        stats: { stars: "2", rating: "1405", ranking: "Top Tier" }
      },
      {
        category: "codechef",
        title: "Gotham's Code Guardian",
        tagline: "Gold Badge Problem Solver (796+)",
        icon: Trophy as any,
        image: "/goldbadge-codechef.png",
        context: "Analyzed and solved 796+ complex digital mysteries. A gold badge on Codechef is a testament to the forensic precision required to protect Gotham's data from the shadows.",
        features: ["Deep Analysis", "System Security", "Logical Resilience", "Shadow Solving"],
        stats: { rank: "Gold", solved: "796+", status: "Guardian" }
      },
      {
        category: "cisco",
        title: "JavaScript Essentials 1",
        tagline: "Forensic Scripting Tech",
        icon: FileCode as any,
        image: "/js essentials-badge.png",
        context: "Mastered the logical scripting that powers Gotham's forensic analysis labs. Every branch in a decision tree is a step closer to solving the city's next mystery.",
        features: ["Detective Logic", "Evidence Processing", "Cryptographic Scripting", "System Vigilance"],
        stats: { status: "Certified", platform: "Cisco Netacad", issued: "Feb 26, 2026" }
      },
      {
        category: "cisco",
        title: "CSS Essentials",
        tagline: "Shadow-Web Styling",
        icon: Palette as any,
        image: "/css essentials-badge.png",
        context: "Crafting interfaces that remain visible even in the dimmest shadows of Gotham's underworld. The visual hierarchy of justice must never be compromised.",
        features: ["Dark Hierarchy", "High-Contrast Defense", "Stealth Aesthetics", "Visual Forensics"],
        stats: { status: "Certified", platform: "Cisco Netacad", issued: "Feb 24, 2026" }
      },
      {
        category: "cisco",
        title: "HTML Essentials",
        tagline: "Logical Fortress Architecture",
        icon: Globe as any,
        image: "/html essentials-badge.png",
        context: "The structural backbone of the Bat-Computer's data surveillance nodes. Ensuring structural integrity is the first rule of protecting a city from the shadows.",
        features: ["Secure Architecture", "Structural Hardening", "Silent Markup", "Data Integrity"],
        stats: { status: "Certified", platform: "Cisco Netacad", issued: "Jan 23, 2026" }
      },
      {
        category: "codechef_certs",
        title: "Shadow-Web Foundations",
        tagline: "Data Integrity & Structure",
        icon: FileCode as any,
        image: "/html-codechef.png",
        context: "Certified in the structural foundations of Gotham's digital infrastructure. Ensuring that every data package is wrapped in secure, semantic code that remains invisible to those who would abuse it.",
        features: ["Secure Data Tags", "Foundational Logic", "Silent Hierarchy", "Structural Hardening"],
        stats: { status: "Verified", platform: "Codechef", date: "Feb 2026" }
      },
      {
        category: "codechef_certs",
        title: "Dark Mode Stylist",
        tagline: "Visual Stealth & Hierarchy",
        icon: Palette as any,
        image: "/css-codechef.png",
        context: "Mastered the visual hierarchy of the night. Certified in crafting high-contrast, low-visibility interfaces that provide absolute clarity in the most demanding digital environments.",
        features: ["Dark Mode Mastery", "Visual Hierarchy", "Z-Index Stealth", "Shadow Properties"],
        stats: { status: "Verified", platform: "Codechef", date: "Feb 2026" }
      },
      {
        category: "codechef_certs",
        title: "Tactical Interface Design",
        tagline: "Bat-Computer UX Specialist",
        icon: Layout as any,
        image: "/ux-codechef.png",
        context: "Designing interfaces for maximum efficiency under extreme tactical conditions. Every millisecond saved in user interaction is a life saved in the field. Precision is the only metric.",
        features: ["High-Stress UX", "Minimalist Logic", "Tactical Feedback", "Forensic Clarity"],
        stats: { status: "Verified", platform: "CodeChef", date: "Jan 2026" }
      },
            {
        category: "lingo",
        title: "Interrogation Linguistics",
        tagline: "EFSET Global Certification",
        icon: Globe as any,
        image: "/efset-certificate.png",
        context: "To understand the criminal underworld, one must master their languages. This certification ensures my tactical communication across Gotham remains universally feared and precise.",
        features: ["Tactical Dialect", "Interrogation Ready", "Silent Fluency", "Global Reach"],
        stats: { status: "Verified", platform: "EFSET", level: "Advanced" }
      },
      {
        category: "other",
        title: "Vigilante Architecture",
        tagline: "Scalable Systems for Gotham's Future",
        icon: Shield as any,
        context: "Designed a multi-layered system architecture that remains operational under extreme load, ensuring the city's digital infrastructure is as resilient as the Dark Knight himself.",
        features: ["Redundancy", "Edge Computing", "Security First", "Silent Scaling"],
        stats: { reliability: "99.9%", status: "Active", access: "Dark" }
      }
    ]
  },
  {
    mode: "superman",
    items: [
      {
        category: "codechef",
        title: "Man of Tomorrow (2-Star)",
        tagline: "1405 Rating - Steel Strength",
        icon: Star as any,
        image: "/codechef-2star.png",
        context: "Achieved a 2-star rating on Codechef. Demonstrating the strength and vision required to solve planetary-scale algorithmic challenges and leading the code-frontier with absolute integrity.",
        features: ["Incredible Vision", "Unbreakable Logic", "Solar-Powered Focus", "Faster than O(N)"],
        stats: { stars: "2", rating: "1405", status: "Champion" }
      },
      {
        category: "codechef",
        title: "Steel-Strength Solver",
        tagline: "Gold Badge (796+ Challenges)",
        icon: Trophy as any,
        image: "/goldbadge-codechef.png",
        context: "Solved 796+ planetary-level challenges, earning the Gold badge. Integrity and persistence are the foundation of this milestone, ensuring every problem is met with absolute clarity.",
        features: ["Pure Integrity", "Universal Solutions", "X-Ray Logic", "Infinite Patience"],
        stats: { level: "Gold", solved: "796+", vision: "High" }
      },
      {
        category: "cisco",
        title: "JavaScript Essentials 1",
        tagline: "Planetary Scripting Strength",
        icon: FileCode as any,
        image: "/js essentials-badge.png",
        context: "Certified in the logical scripting required to manage inter-planetary communication hubs for the Hall of Justice with absolute truth and zero latency.",
        features: ["Steel Logic", "Incredible Speed", "Global Connectivity", "Truth-Grade Execution"],
        stats: { status: "Certified", platform: "Cisco Netacad", issued: "Feb 26, 2026" }
      },
      {
        category: "cisco",
        title: "CSS Essentials",
        tagline: "Universal Visual Fidelity",
        icon: Palette as any,
        image: "/css essentials-badge.png",
        context: "Providing perfect clarity across any digital planetary system. The Man of Tomorrow ensures that information is always presented with absolute visual integrity.",
        features: ["Solar Clarity", "Perfect Contrast", "Infinite Scaling", "Universal Design"],
        stats: { status: "Certified", platform: "Cisco Netacad", issued: "Feb 24, 2026" }
      },
      {
        category: "cisco",
        title: "HTML Essentials",
        tagline: "Man of Tomorrow Structure",
        icon: Globe as any,
        image: "/html essentials-badge.png",
        context: "Building the foundations of a transparent digital future. Certified in the structural markup that bridges the gap between different cultures and worlds.",
        features: ["Transparent Markup", "Global Foundations", "Humanity Bridge", "Steel Architecture"],
        stats: { status: "Certified", platform: "Cisco Netacad", issued: "Jan 23, 2026" }
      },
      {
        category: "codechef_certs",
        title: "Universal Web Architecture",
        tagline: "Planetary Foundations",
        icon: FileCode as any,
        image: "/html-codechef.png",
        context: "Certified in the universal language of the web. HTML is the building block of global transparent communication, ensuring that information remains accessible to every man, woman, and child of Earth.",
        features: ["Universal Standard", "Truth-Grade Markup", "Solar Accessibility", "Steel Foundations"],
        stats: { status: "Verified", platform: "Codechef", date: "Feb 2026" }
      },
      {
        category: "codechef_certs",
        title: "Solar-Suit Styling",
        tagline: "Infinite Visual Fidelity",
        icon: Palette as any,
        image: "/css-codechef.png",
        context: "Crafting interfaces that shine with the power of the yellow sun. Certified in providing absolute visual clarity and aesthetic perfection across all digital planetary systems.",
        features: ["Global Reach Styling", "Perfect Contrast", "Universal CSS", "Solar Rendering"],
        stats: { status: "Verified", platform: "Codechef", date: "Feb 2026" }
      },
      {
        category: "codechef_certs",
        title: "Kryptonian UX Principles",
        tagline: "Infinite Accessibility Master",
        icon: Layout as any,
        image: "/ux-codechef.png",
        context: "Redesigning human interaction for a future of infinite possibility. Leveraging UX principles to foster unity and absolute clarity in every digital experience for all civilizations.",
        features: ["Unity-First Design", "X-Ray Usability", "Perfect Transparency", "Inter-Species UX"],
        stats: { status: "Verified", platform: "CodeChef", date: "Jan 2026" }
      },
            {
        category: "lingo",
        title: "Universal Translator",
        tagline: "EFSET Linguistic Certification",
        icon: Globe as any,
        image: "/efset-certificate.png",
        context: "As a symbol of hope for all of Earth, understanding its people is paramount. This certification represents my commitment to clear, unifying communication on a global scale.",
        features: ["Planetary Unity", "Hope Speaker", "Universal Fluency", "Global Empathy"],
        stats: { status: "Verified", platform: "EFSET", level: "Advanced" }
      },
      {
        category: "other",
        title: "Global Connectivity Hub",
        tagline: "Connecting the World with Integrity",
        icon: Globe as any,
        context: "Developed a worldwide communication platform that bridges the gap between different cultures and systems, promoting a future where information is accessible and transparent for all.",
        features: ["Massive Scale", "Zero Latency", "Global Reach", "Absolute Truth"],
        stats: { nodes: "Infinite", status: "Unity", vision: "X-Ray" }
      }
    ]
  }
];

export default function Achievements() {
  console.log("Categories loaded:", categories.length);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const urlMode = searchParams.get("mode");
  const mode: HeroMode = (['spidey', 'deadpool', 'batman', 'superman', 'ironman'].includes(urlMode as any) 
    ? urlMode 
    : "spidey") as HeroMode;
  const t = themes[mode];
  
  const allAchievements = achievementsData.find(d => d.mode === mode)?.items || achievementsData[0].items;
  const filteredAchievements = activeCategory 
    ? allAchievements.filter(ach => ach.category === activeCategory)
    : [];

  const navigate = useNavigate();

  const handleExit = () => {
    // Cinematic Portal Exit Animation
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      filter: "blur(20px)",
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        // LIFO return: try navigating back, else fallback to Hub
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate("/");
        }
      }
    });
  };

  useEffect(() => {
    document.title = "Hall of Achievements | Prem Sai Surisetti";
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      if (!activeCategory) {
        gsap.fromTo(".category-card", 
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "back.out(1.7)" }
        );
      } else {
        gsap.fromTo(".achievement-card", 
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
      }
      
      gsap.fromTo(".hero-text", 
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [mode, activeCategory]);

  return (
    <div ref={containerRef} className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black overflow-x-hidden relative z-10">
      {/* Dynamic High-Fidelity Backgrounds */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        {mode === 'spidey'   && <SpideyBackground />}
        {mode === 'ironman'  && <IronManBackground />}
        {mode === 'deadpool' && <DeadpoolBackground />}
        {mode === 'batman'   && <BatmanBackground />}
        {mode === 'superman' && <SupermanBackground />}
      </div>
      <div className="fixed inset-0 bg-black/20 z-[1] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] p-8 backdrop-blur-md bg-black/40 border-b border-white/10 shadow-2xl">
        <div className="container mx-auto flex justify-between items-center">
          <button 
            onClick={handleExit}
            className="flex items-center gap-3 group text-white/80 hover:text-white transition-all duration-300 relative px-4 py-2 rounded-full hover:bg-white/10 border border-transparent hover:border-white/20"
          >
            <div className="absolute inset-0 bg-white/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform relative z-10" />
            <div className="flex flex-col items-start relative z-10">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100">Dimensional Shift</span>
              <span className="font-mono text-sm tracking-widest uppercase italic font-bold">Exit Portal // LIFO</span>
            </div>
          </button>
          <div className="hidden md:flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse ring-4 ring-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,1)]" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-60">Trophy Hall // STATUS: UNLOCKED</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-64 pb-24 px-8 relative z-10">
        <div className="container mx-auto text-center hero-text">
          <p className="font-mono text-xs tracking-[0.5em] uppercase text-white/30 mb-6 italic">
            // {activeCategory ? `CATEGORY: ${categories.find(c => c.id === activeCategory)?.name}` : "COMMENDATIONS & TROPHIES"}
          </p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none mb-4">
            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">Achievements</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/40 text-lg md:text-xl font-light tracking-wide italic">
             {activeCategory 
               ? `Detailed record of ${categories.find(c => c.id === activeCategory)?.name.toLowerCase()} and technical excellence.`
               : "A record of technical milestones, breakthrough innovations, and heroic digital deployments."}
          </p>
          
          {activeCategory && (
            <button 
              onClick={() => setActiveCategory(null)}
              className="mt-12 flex items-center gap-2 mx-auto font-mono text-xs tracking-[0.3em] uppercase hover:text-white transition-colors group"
              style={{ color: t.accent }}
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Categories
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 pb-32">
        {!activeCategory ? (
          /* Category Selection View */
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="category-card group relative p-12 rounded-3xl border transition-all duration-500 text-left overflow-hidden translate-z-0 z-[10] hover:scale-[1.02]"
                style={{ 
                  backgroundColor: t.cardBg, 
                  borderColor: t.border,
                  boxShadow: `0 30px 60px rgba(0,0,0,0.6), inset 0 0 0 1px ${t.border}`
                }}
              >
                {/* Subtle highlight gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full blur-[40px] transition-colors" 
                  style={{ background: `${t.accent}15` }} />
                
                <div className="flex justify-between items-start mb-8">
                  <cat.icon className="w-12 h-12 group-hover:scale-110 transition-transform duration-500" style={{ color: t.accent }} />
                  {cat.highlight && (
                    <div className="px-4 py-2 rounded-full border transition-colors flex items-center gap-2"
                      style={{ background: `${t.accent}10`, borderColor: `${t.accent}20` }}>
                      <Star className="w-4 h-4 fill-current animate-pulse" style={{ color: t.accent }} />
                      <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase" style={{ color: t.accent }}>{cat.highlight}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-3xl font-black uppercase italic mb-4 tracking-tight text-white relative z-20"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,1)" }}>{cat.name}</h3>
                <p className="text-white/80 font-light italic leading-relaxed mb-8 relative z-20 transition-colors group-hover:text-white">
                  {cat.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ color: t.accent }}>
                  Open Files <ArrowLeft className="w-3 h-3 rotate-180" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Achievements List View */
          <div className="space-y-32">
            {filteredAchievements.map((ach, idx) => (
              <article key={idx} className="achievement-card relative group z-[10]">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Icon Side */}
                  <div className="relative aspect-square flex items-center justify-center rounded-3xl overflow-hidden border transition-all duration-700 p-20"
                    style={{ background: t.cardBg, borderColor: t.border, boxShadow: `0 20px 50px rgba(0,0,0,0.5)` }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent group-hover:opacity-100 transition-opacity opacity-0" />
                    
                    {ach.image ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* Solid background for high contrast */}
                        <div className="absolute inset-0 bg-black/40 rounded-2xl" />
                        <img 
                          src={ach.image} 
                          alt={ach.title} 
                          className="relative z-10 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-1000 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                        />
                      </div>
                    ) : (
                      <ach.icon size={220} className="text-white/10 group-hover:text-white/40 group-hover:scale-110 transition-all duration-1000" />
                    )}
                    
                    <div className="absolute bottom-8 left-8">
                       <div className="flex flex-wrap gap-4">
                          {Object.entries(ach.stats).map(([k, v]) => (
                            <div key={k} className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                               <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">{k}: </span>
                               <span className="font-mono text-[10px] tracking-widest text-white">{v as string}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-12 h-[1px]" style={{ background: t.accent }} />
                       <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: t.accent }}>Award {idx + 1}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-2 tracking-tight italic uppercase leading-tight">{ach.title}</h2>
                    <h3 className="text-2xl text-white/60 font-light mb-8 italic tracking-wide">{ach.tagline}</h3>
                    
                    <div className="relative mb-10 p-8 rounded-3xl border transition-colors duration-500 backdrop-blur-3xl"
                      style={{ background: t.cardBg, borderColor: t.border }}>
                       <p className="text-xl leading-relaxed text-white/80 font-light italic">
                         "{ach.context}"
                       </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {ach.features.map(f => (
                          <div key={f} className="flex items-center gap-3 text-white/40 group/feat">
                             <div className="w-1.5 h-1.5 rounded-full transition-colors" style={{ background: `${t.accent}40` }} />
                             <span className="text-sm font-mono tracking-tight group-hover/feat:text-white/60 transition-colors">{f}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-8 text-center text-white/20 font-mono text-xs tracking-[0.4em] uppercase">
          Trophy Room Encryption Enabled // Archive Verified // Heroic Status Confirmed
        </div>
      </footer>
    </div>
  );
}

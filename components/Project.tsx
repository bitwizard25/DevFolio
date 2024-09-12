'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Info } from 'lucide-react';

// Sample project data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: "AI Assistant",
    description: "An AI-driven assistant using CrewAI, Groq LLM, LangChain, and Streamlit.",
    image: "/Ai Assistant Project Logo.jpg",
    link: "https://yourproject1.com",
    github: "https://github.com/yourusername/project1",
    tags: ["AI", "Python", "LangChain"]
  },
  {
    id: 2,
    title: "Byte Buddy",
    description: "A social media application inspired by Instagram for college students and researchers.",
    image: "/ByteBuddy.jpg",
    link: "https://yourproject2.com",
    github: "https://github.com/yourusername/project2",
    tags: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 3,
    title: "Custom Chatbot",
    description: "A versatile chatbot using OpenAI, Langchain, and Streamlit for specific user needs.",
    image: "/Chatbot.jpg",
    link: "https://yourproject3.com",
    github: "https://github.com/yourusername/project3",
    tags: ["OpenAI", "Python", "Streamlit"]
  },
  // Add more projects as needed
];

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image 
        src={project.image} 
        alt={project.title}
        width={400}
        height={300}
        layout="responsive"
        className="object-cover"
      />
      <motion.div 
        className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center p-4 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm mb-4 text-center">{project.description}</p>
        <div className="flex space-x-4">
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <ExternalLink size={24} />
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <Github size={24} />
          </a>
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center p-2 bg-gray-900 bg-opacity-80">
        {project.tags.map((tag, index) => (
          <span key={index} className="text-xs bg-blue-500 text-white px-2 py-1 rounded m-1">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
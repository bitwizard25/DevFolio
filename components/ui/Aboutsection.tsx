'use client'
import React, { useState } from 'react';
import { Code, Briefcase, GraduationCap } from 'lucide-react';
import Image from 'next/image'

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('skills');

  const tabs = [
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
  ];

  const skills = [
    { category: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Redux', 'Webpack', 'Vite.js'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'Flask', 'Django', 'GraphQL', 'RESTful APIs'] },
    { category: 'Tools & Others', items: ['Git', 'CI/CD', 'Streamlit', 'Cross-browser compatibility', 'SEO'] },
    { category: 'Soft Skills', items: ['Communication', 'Leadership', 'Problem-Solving', 'Teamwork', 'Adaptability'] },
  ];

  const experience = [
    {
      title: 'Web Developer Intern',
      company: 'BlueKei Solutions',
      period: 'Feb 2024 - May 2024',
      location: 'Hybrid, Kharadi Pune',
      achievements: [
        'Increased query set creation efficiency by 60% by developing an object-relational mapper on top of the Neo4j driver.',
        'Developed a web application with admin privileges to manage data, enabling CRUD operations for 252 nodes, enhancing data management efficiency by 70%.',
        'Simplified the query writing process using dropdown designs and relation management by creating an ORM on top of the Neo4j driver, reducing query writing time by 50%.',
      ],
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Technology (Computer Engineering)',
      institution: 'Bapurao Deshmukh College Of Engineering, Sewagram, Wardha',
      period: '2021-2024',
    },
    {
      degree: 'High School with Computer Science',
      institution: 'Arts, Commerce, and Science College Chandrapur',
      period: '2019-2020',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">About Me</h2>
        
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-gray-800 text-white p-6">
              <div className="relative w-32 h-32 mx-auto mb-3">
                <Image 
                  src="Raj.jpg"
                  alt="Raj Bhoyar" 
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full mb-2"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Raj Bhoyar</h3>
              <p className="text-gray-300 mb-4">B.Tech CSE Graduate (2024), aspiring AI/ML Enthusiast and Software Programmer</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">AI/ML</span>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Python</span>
                <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Full Stack</span>
              </div>
            </div>
            
            <div className="md:w-2/3 p-6">
              <div className="flex border-b mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center px-4 py-2 ${activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="mr-2" size={18} />
                    {tab.label}
                  </button>
                ))}
              </div>
              
              {activeTab === 'skills' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skillSet, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold  text-gray-800 mb-2">{skillSet.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillSet.items.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'experience' && (
                <div>
                  {experience.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-bold  text-gray-800 text-lg">{exp.title}</h4>
                      <p className="text-gray-600">{exp.company} | {exp.period}</p>
                      <p className="text-gray-500 mb-2">{exp.location}</p>
                      <ul className="list-disc list-inside">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-gray-700">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'education' && (
                <div>
                  {education.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-bold  text-gray-800 text-lg">{edu.degree}</h4>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-gray-500">{edu.period}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

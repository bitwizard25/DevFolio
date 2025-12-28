'use client'
import React, { useState } from 'react';
import { Code2 as Code, Briefcase, GraduationCap, ChevronRight, Award, Users, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('skills');

  const tabs = [
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Achievements', icon: Award },
  ];

  const skills = [
    {
      category: 'Backend Development',
      items: [
        { name: 'Node.js/Express', level: 90 },
        { name: 'Python (Flask/Django)', level: 88 },
        { name: 'RESTful API Design', level: 92 },
        { name: 'GraphQL', level: 75 },
      ]
    },
    {
      category: 'Database & Message Queues',
      items: [
        { name: 'MongoDB/Aggregations', level: 90 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'Neo4j (Graph DB)', level: 82 },
        { name: 'RabbitMQ', level: 85 },
        { name: 'Redis', level: 78 },
      ]
    },
    {
      category: 'AI/ML & LLMs',
      items: [
        { name: 'LangChain/LangGraph', level: 88 },
        { name: 'OpenAI/Gemini/Groq', level: 85 },
        { name: 'RAG & Chroma', level: 82 },
        { name: 'CrewAI', level: 78 },
        { name: 'MCP', level: 75 },
      ]
    },
    {
      category: 'Others & Integrations',
      items: [
        { name: 'Zoho/MSG91 APIs', level: 88 },
        { name: 'Google Sheets API', level: 85 },
        { name: 'Git/Docker/CI-CD', level: 85 },
        { name: 'Payment Gateways', level: 80 },
      ]
    },
  ];

  const experience = [
    {
      title: 'Software Development Engineer (AI)',
      company: 'NNIIT',
      companyUrl: 'https://nniit.com',
      period: 'Nov 2025 - Present',
      location: 'Hyderabad',
      type: 'current',
      description: 'Leading AI initiatives including RAG pipelines and intelligent automation',
      achievements: [
        { text: 'Building RAG pipelines for transcript analysis with LangChain', metric: 'AI-Powered' },
        { text: 'Developing intelligent automation systems for EdTech workflows', metric: 'Automation' },
      ],
      techStack: ['LangChain', 'OpenAI', 'Python', 'Neo4j', 'Node.js'],
    },
    {
      title: 'Full Stack Engineer',
      company: 'NNIIT',
      companyUrl: 'https://nniit.com',
      period: 'Jun 2025 - Nov 2025',
      location: 'Hyderabad',
      type: 'past',
      description: 'Built scalable EdTech backend with focus on performance and automation',
      achievements: [
        { text: 'Architected RabbitMQ message queue system processing 10K+ daily events', metric: '10K+ events/day' },
        { text: 'Built MongoDB aggregation pipelines reducing API response by 60%', metric: '60% faster' },
        { text: 'Integrated Zoho APIs with atomic locking preventing token race conditions', metric: 'Zero conflicts' },
        { text: 'Developed automated cron pipelines for session management & transcript analysis', metric: '100% automated' },
      ],
      techStack: ['Node.js', 'MongoDB', 'RabbitMQ', 'Zoho API', 'MSG91'],
    },
    {
      title: 'Founding Engineer',
      company: 'Games World League',
      period: 'May 2024 - May 2025',
      location: 'Remote',
      type: 'past',
      description: 'Core engineering team building gaming platform from ground up',
      achievements: [
        { text: 'Architected backend systems for gaming platform', metric: 'Full Stack' },
        { text: 'Implemented key features as part of founding team', metric: 'Startup' },
      ],
      techStack: ['Node.js', 'MongoDB', 'React', 'AWS'],
    },
    {
      title: 'Software Developer Intern',
      company: 'BlueKei Solutions',
      period: 'Feb 2024 - Apr 2024',
      location: 'Pune (Hybrid)',
      type: 'past',
      description: 'Developed ORM layer and admin tools for Neo4j graph database',
      achievements: [
        { text: 'Developed ORM layer on top of Neo4j driver for simplified query building', metric: '60% efficiency' },
        { text: 'Built admin web application with CRUD for 252+ graph nodes', metric: '252 nodes' },
      ],
      techStack: ['Python', 'Neo4j', 'Flask', 'Jinja'],
    },
    {
      title: 'Technical Lead',
      company: 'TFL',
      period: 'Jun 2023 - Jun 2024',
      location: 'Sewagram',
      type: 'past',
      description: 'Led technical initiatives and managed team operations',
      achievements: [
        { text: 'Led technical committee and managed event organization', metric: 'Leadership' },
        { text: 'Previously served as Admin member for 9 months', metric: 'Team Mgmt' },
      ],
      techStack: ['Leadership', 'Event Management', 'Team Building'],
    },
  ];

  const volunteerExperience = [
    {
      role: 'Technical Committee Lead',
      org: 'T.F.L (Tech Forum for Learning)',
      period: 'May 2023 - Present',
      icon: Users,
    },
    {
      role: 'Android Lead',
      org: 'Coding Club, BDCOE Wardha',
      period: 'Jan 2021 - Present',
      icon: Code,
    },
    {
      role: 'Member',
      org: 'Computer Society of India',
      period: 'Active Member',
      icon: Users,
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Technology (Computer Engineering)',
      institution: 'Bapurao Deshmukh College of Engineering, Sewagram',
      period: '2021 - 2024',
      grade: 'B.Tech CSE',
      highlights: ['Data Structures', 'System Design', 'AI/ML Fundamentals', 'Database Systems'],
    },
    {
      degree: 'Higher Secondary (Computer Science)',
      institution: 'Arts, Commerce, and Science College Chandrapur',
      period: '2018 - 2020',
    },
  ];

  const certifications = [
    { name: 'Code4GovTech Program 2023', issuer: 'C4GT - Government of India', type: 'program', highlight: true },
    { name: 'Flipkart GRiD 4.0 Challenge', issuer: 'Flipkart & Unstop', type: 'competition', highlight: true },
    { name: 'GoF Design Patterns with Java', issuer: 'Udemy', type: 'course' },
    { name: 'Java Network Programming (TCP/IP)', issuer: 'Udemy', type: 'course' },
    { name: 'O(1) Django Workshop', issuer: 'O(1) Coding Club', type: 'workshop' },
    { name: 'Walmart SWE Virtual Experience', issuer: 'Forage', type: 'virtual' },
    { name: 'Web Development Diploma', issuer: 'Udemy', type: 'course' },
  ];

  const projects: { name: string; description: string; period: string }[] = [];

  return (
    <section data-scroll-section className="min-h-screen py-20">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Backend specialist with a passion for building efficient, scalable systems that handle real-world complexity
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 animate-slide-up">
            <div className="card p-6 text-center sticky top-24">
              {/* Profile Image */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur opacity-50" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-700">
                  <Image
                    src="/Raj.jpg"
                    alt="Raj Bhoyar"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-1">Raj Bhoyar</h3>
              <p className="text-cyan-400 text-sm mb-3">Software Developer @ NNIIT</p>
              <p className="text-slate-400 text-sm mb-4">
                B.Tech CSE &apos;24 | Building scalable EdTech solutions | Code4GovTech &apos;23
              </p>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  Backend Expert
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  10K+ Events/Day
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  AI/ML
                </span>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-700">
                <div className="text-center">
                  <div className="text-lg font-bold text-cyan-400">3+</div>
                  <div className="text-xs text-slate-500">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">15+</div>
                  <div className="text-xs text-slate-500">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-400">7+</div>
                  <div className="text-xs text-slate-500">Certs</div>
                </div>
              </div>

              {/* Volunteer Roles */}
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500 mb-2">Leadership Roles</p>
                <div className="space-y-2">
                  {volunteerExperience.map((vol, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                      <vol.icon className="w-3 h-3 text-cyan-400" />
                      <span>{vol.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2 animate-slide-up animation-delay-200">
            <div className="card overflow-hidden">
              {/* Tabs - Interactive Pill Design */}
              <div className="flex p-1 mb-8 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-300 ${activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white/10 rounded-xl border border-white/10 shadow-sm"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <tab.icon className="relative z-10 w-4 h-4" />
                    <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Skills Tab */}
                {activeTab === 'skills' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid sm:grid-cols-2 gap-6"
                  >
                    {skills.map((skillSet, index) => (
                      <div key={index} className="space-y-4">
                        <h4 className="font-semibold text-slate-200 flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-cyan-400" />
                          {skillSet.category}
                        </h4>
                        <div className="space-y-3">
                          {skillSet.items.map((skill, skillIndex) => (
                            <div key={skillIndex}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-300">{skill.name}</span>
                                <span className="text-slate-500">{skill.level}%</span>
                              </div>
                              <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                  viewport={{ once: true }}
                                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Experience Tab */}
                {activeTab === 'experience' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative pl-6 border-l-2 border-cyan-500/30"
                      >
                        <div className={`absolute -left-2.5 top-0 w-5 h-5 rounded-full border-4 border-slate-800 ${exp.type === 'current' ? 'bg-emerald-500 animate-pulse' : 'bg-cyan-500'
                          }`} />
                        <div className="mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-xl font-semibold text-slate-100">{exp.title}</h4>
                            {exp.type === 'current' && (
                              <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-cyan-400 font-medium">{exp.company}</p>
                            {exp.companyUrl && (
                              <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400">
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <p className="text-slate-500 text-sm">{exp.period} • {exp.location}</p>
                          {exp.description && (
                            <p className="text-slate-400 text-sm mt-1">{exp.description}</p>
                          )}
                        </div>

                        {/* Achievements with Metrics */}
                        <ul className="space-y-2 mb-4">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start gap-2 text-slate-300 text-sm">
                              <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <span>{achievement.text}</span>
                                {achievement.metric && (
                                  <span className="ml-2 px-2 py-0.5 rounded text-xs bg-slate-700/50 text-emerald-400">
                                    {achievement.metric}
                                  </span>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Stack */}
                        {exp.techStack && (
                          <div className="flex flex-wrap gap-2">
                            {exp.techStack.map((tech, i) => (
                              <span key={i} className="px-2 py-1 rounded text-xs bg-slate-700/50 text-slate-300">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Education Tab */}
                {activeTab === 'education' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative pl-6 border-l-2 border-purple-500/30"
                      >
                        <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-slate-800" />
                        <h4 className="text-xl font-semibold text-slate-100">{edu.degree}</h4>
                        <p className="text-purple-400">{edu.institution}</p>
                        <p className="text-slate-500 text-sm mb-2">{edu.period}</p>
                        {edu.grade && (
                          <span className="inline-block px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400 mr-2">
                            {edu.grade}
                          </span>
                        )}
                        {edu.highlights && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {edu.highlights.map((h, i) => (
                              <span key={i} className="px-2 py-1 rounded text-xs bg-slate-700/50 text-slate-400">
                                {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Notable Project */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 p-4 rounded-lg bg-slate-800/30 border border-slate-700"
                    >
                      <h4 className="font-semibold text-slate-200 mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4 text-cyan-400" />
                        Notable Academic Project
                      </h4>
                      {projects.map((proj, i) => (
                        <div key={i}>
                          <p className="text-cyan-400 font-medium">{proj.name}</p>
                          <p className="text-slate-400 text-sm">{proj.description}</p>
                          <p className="text-slate-500 text-xs mt-1">{proj.period}</p>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* Certifications Tab */}
                {activeTab === 'certifications' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Highlighted Achievements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-200 mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-400" />
                        Key Achievements
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {certifications.filter(c => c.highlight).map((cert, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 hover:border-yellow-500/50 transition-colors"
                          >
                            <p className="font-medium text-slate-100">{cert.name}</p>
                            <p className="text-slate-400 text-sm">{cert.issuer}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Other Certifications */}
                    <h4 className="font-semibold text-slate-200 mb-3">Certifications & Courses</h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {certifications.filter(c => !c.highlight).map((cert, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + (i * 0.05) }}
                          className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors"
                        >
                          <Award className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-slate-200 text-sm truncate">{cert.name}</p>
                            <p className="text-slate-500 text-xs">{cert.issuer}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

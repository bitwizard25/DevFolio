// Skill data — consumed by the SkillsSection pills (accessible/mobile) and the 3D word-orb (decorative)

export interface SkillGroup {
  label: string;
  skills: string[];
  color: string;
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Backend',
    skills: ['Node.js', 'Express', 'Python (FastApi/Django)', 'REST APIs', 'GraphQL'],
    color: '#0A84FF',
  },
  {
    label: 'Databases',
    skills: ['MongoDB', 'PostgreSQL', 'Neo4j', 'Redis', 'RabbitMQ'],
    color: '#32D74B',
  },
  {
    label: 'AI & LLMs',
    skills: ['LangChain', 'LangGraph', 'OpenAI', 'Gemini', 'Groq', 'RAG', 'Chroma', 'CrewAI', 'MCP'],
    color: '#BF5AF2',
  },
  {
    label: 'Others',
    skills: ['Git', 'Docker', 'Zoho API', 'MSG91', 'Payment Gateways'],
    color: '#FF9F0A',
  },
];

/** Flat list for the orb: every skill with its group color */
export const allSkills = skillGroups.flatMap((group) =>
  group.skills.map((name) => ({ name, color: group.color })),
);

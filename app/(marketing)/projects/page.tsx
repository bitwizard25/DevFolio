import ProjectsSection from '@/components/Project'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Raj Bhoyar | Full Stack Developer & AI Enthusiast',
  description: 'Explore Raj Bhoyar\'s portfolio of enterprise solutions and side projects, including EdTech scheduling, message queues, and AI assistants.',
}

const page = () => {
  return (
    <>
      <h1 className="sr-only">Raj Bhoyar's Projects</h1>
      <ProjectsSection/>
    </>
  )
}

export default page
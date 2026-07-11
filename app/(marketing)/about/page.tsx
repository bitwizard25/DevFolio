import AboutSection from '@/components/ui/Aboutsection'
import Bookshelf from '@/components/ui/Bookshelf'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Raj Bhoyar | Full Stack Developer & AI Enthusiast',
  description: 'Learn more about Raj Bhoyar, SDE (AI) at NNIIT, specializing in Node.js, MongoDB, RabbitMQ, and CrewAI pipelines.',
}

const page = () => {
  return (
    <>
      <h1 className="sr-only">About Raj Bhoyar</h1>
      <AboutSection/>
      <Bookshelf/>
    </>
  )
}

export default page
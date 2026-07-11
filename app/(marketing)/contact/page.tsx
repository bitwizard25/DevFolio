import ContactMe from '@/components/Contactme'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Raj Bhoyar | Full Stack Developer & AI Enthusiast',
  description: 'Get in touch with Raj Bhoyar for software engineering roles, project collaboration, or consulting. Let\'s talk.',
}

const page = () => {
  return (
    <>
      <h1 className="sr-only">Contact Raj Bhoyar</h1>
      <ContactMe/>
    </>
  )
}

export default page
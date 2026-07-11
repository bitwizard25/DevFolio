import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { caseStudies } from '@/lib/case-studies';
import CaseStudyPage from '@/components/case-study/CaseStudyPage';
import { siteUrl, siteName } from '@/lib/site';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Statically generate parameters at build time
export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

// Next 15 Dynamic Metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const study = caseStudies.find((s) => s.slug === resolvedParams.slug);

  if (!study) {
    return {
      title: 'Page Not Found',
    };
  }

  const title = `${study.title} | ${siteName} Case Study`;
  const description = study.seoDescription;
  const canonicalUrl = `${siteUrl}/projects/${study.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: study.heroImage,
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [study.heroImage],
    },
  };
}

// Set dynamic parameters handling (false = 404 for unknown parameters)
export const dynamicParams = false;

export default async function CaseStudyRoute({ params }: PageProps) {
  const resolvedParams = await params;
  const study = caseStudies.find((s) => s.slug === resolvedParams.slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyPage study={study} />;
}

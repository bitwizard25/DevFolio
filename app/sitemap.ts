import { MetadataRoute } from 'next';
import { caseStudies } from '@/lib/case-studies';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/about', '/projects', '/contact', '/classic'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : route === '/classic' ? 0.5 : 0.8,
  }));

  const caseStudyPages = caseStudies.map((study) => ({
    url: `${siteUrl}/projects/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...caseStudyPages];
}

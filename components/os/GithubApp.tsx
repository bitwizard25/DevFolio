'use client'

import React, { useEffect, useState } from 'react';
import { GitFork, Star, BookOpen, MapPin, Users, ExternalLink, RefreshCw } from 'lucide-react';

const USERNAME = 'bitwizard25';
const PROFILE_URL = `https://github.com/${USERNAME}`;
const CACHE_KEY = 'github-app-cache-v1';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 min — friendly to the 60/hr unauthenticated API limit

// github.com itself sends `X-Frame-Options: deny`, so it can't be iframed. Instead this app
// pulls the REAL profile through GitHub's public API (CORS-enabled) and renders it natively
// in the window — live avatar, bio, counts, and top repositories, not mocked data. The
// contribution graph comes from ghchart.rshah.org, which serves it as an embeddable SVG image.
const CHART_URL = `https://ghchart.rshah.org/0A84FF/${USERNAME}`;

interface GhUser {
  name: string | null;
  login: string;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

interface GhRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-amber-400',
  Python: 'bg-yellow-500',
  Go: 'bg-cyan-500',
  HTML: 'bg-orange-500',
  CSS: 'bg-purple-500',
  'Jupyter Notebook': 'bg-orange-400',
};

export default function GithubApp() {
  const [user, setUser] = useState<GhUser | null>(null);
  const [repos, setRepos] = useState<GhRepo[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      // Session cache first — one profile open per half hour hits the network
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { at, user: u, repos: r } = JSON.parse(cached);
          if (Date.now() - at < CACHE_TTL_MS) {
            setUser(u);
            setRepos(r);
            setStatus('ready');
            return;
          }
        }
      } catch {
        // corrupt cache — fall through to a fresh fetch
      }

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API unavailable');

        const u: GhUser = await userRes.json();
        const allRepos: GhRepo[] = await reposRes.json();
        const top = [...allRepos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 4);

        if (cancelled) return;
        setUser(u);
        setRepos(top);
        setStatus('ready');
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), user: u, repos: top }));
        } catch {
          // storage full/blocked — fine, we just refetch next time
        }
      } catch {
        if (!cancelled) setStatus('error');
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#0d0d15] text-slate-100 flex flex-col font-sans select-text">
      {/* Toolbar / Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-semibold text-slate-300 font-mono">github.com/{USERNAME}</span>
        </div>
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] font-bold text-[#0A84FF] hover:underline"
        >
          <span>Open in GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {status === 'loading' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-slate-400">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="text-xs">Loading live profile…</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-sm text-slate-300">Couldn&apos;t reach the GitHub API right now.</p>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-xs font-semibold text-black bg-white hover:bg-slate-200 transition-colors"
          >
            Open profile on GitHub
          </a>
        </div>
      )}

      {status === 'ready' && user && (
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
          {/* Profile Card — live data */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element -- remote avatar, avoids next/image remotePatterns config */}
            <img
              src={user.avatar_url}
              alt={user.name ?? user.login}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full border-2 border-white/10 shrink-0 object-cover"
            />

            <div className="flex-grow text-center md:text-left space-y-2">
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">{user.name ?? user.login}</h2>
                <p className="text-sm text-slate-400">{user.login}</p>
              </div>
              {user.bio && (
                <p className="text-xs md:text-sm text-slate-300 max-w-xl font-light">{user.bio}</p>
              )}

              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 text-xs text-slate-400">
                {user.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {user.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {user.followers} followers · {user.following} following
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> {user.public_repos} public repos
                </span>
              </div>
            </div>
          </div>

          {/* Contributions — the real graph, served as an embeddable SVG */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3.5">
            <h3 className="text-sm font-bold text-white">Contribution activity</h3>
            <div className="w-full overflow-x-auto pb-1">
              {/* eslint-disable-next-line @next/next/no-img-element -- third-party SVG chart */}
              <img
                src={CHART_URL}
                alt={`${user.login}'s GitHub contribution graph`}
                className="min-w-[600px] w-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Repositories — top by stars, live */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-bold text-white">Popular repositories</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-[#0A84FF] text-sm hover:underline">{repo.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-3">
                      {repo.description ?? 'No description yet.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      {repo.language && (
                        <>
                          <span className={`w-2.5 h-2.5 rounded-full ${LANG_COLORS[repo.language] ?? 'bg-slate-500'}`} />
                          <span>{repo.language}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-500/20 text-yellow-500" /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" /> {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

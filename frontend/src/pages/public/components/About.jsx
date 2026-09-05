import { useState, useEffect } from 'react';
import { FiMail, FiMapPin, FiPhone, FiDownload, FiArrowRight } from 'react-icons/fi';
import SectionHeader from '../../../components/SectionHeader';

export default function About({ profile, settings }) {
  const facts = [
    profile?.full_name && ['Name', profile.full_name],
    profile?.email && ['Email', profile.email],
    profile?.location && ['Location', profile.location],
    profile?.phone && ['Phone', profile.phone],
  ].filter(Boolean);

  return (
    <section id="about" className="section-pad">
      <div className="container-custom">
        <SectionHeader
          eyebrow="About"
          title={settings.section_about_heading || 'About Me'}
          subtitle={settings.section_about_subtitle}
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-12 items-start">
          <div className="animate-slide-up space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              {profile?.bio || 'Passionate software developer dedicated to building high-quality web applications. Always eager to learn new technologies and solve complex problems.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile?.email && (
                <div className="card-hover p-4 flex items-center gap-3">
                  <span className="p-2.5 rounded-lg bg-primary-500/10 text-primary-400"><FiMail /></span>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm text-slate-300 truncate">{profile.email}</p>
                  </div>
                </div>
              )}
              {profile?.location && (
                <div className="card-hover p-4 flex items-center gap-3">
                  <span className="p-2.5 rounded-lg bg-primary-500/10 text-primary-400"><FiMapPin /></span>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="text-sm text-slate-300 truncate">{profile.location}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {profile?.resume_url && (
                <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 !px-5 text-sm">
                  <FiDownload /> Download Resume
                </a>
              )}
              <a href="#contact" className="btn-primary !py-2.5 !px-5 text-sm">
                Let's Talk <FiArrowRight />
              </a>
            </div>
          </div>

          <div className="card p-8 animate-slide-in-right">
            <h3 className="font-display text-xl font-semibold text-white mb-6">Quick Information</h3>
            <div className="space-y-4">
              {facts.map(([label, value]) => (
                <div key={label} className="flex items-start gap-3 pb-4 border-b border-surface-700/50 last:border-0 last:pb-0">
                  <span className="mt-1 text-primary-400">▸</span>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
                    <p className="text-slate-200">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

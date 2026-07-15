import { useEffect, useState } from 'react'
import { portfolio } from './data/portfolio'

type Theme = 'light' | 'dark'

function SectionTitle({ index, label }: { index: string; label: string }) {
  return (
    <div className="section-title">
      <span>{index}</span>
      <p>{label}</p>
    </div>
  )
}

function getSocialIcon(label: string) {
  switch (label.toLowerCase()) {
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="social-icon" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    case 'github':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="social-icon" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    default:
      return null
  }
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('kamran-theme')
    return storedTheme === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('kamran-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label={`${portfolio.name} home`}>
          <span className="wordmark-mark">KR</span>
          <span>{portfolio.name}</span>
        </a>
        <nav aria-label="Primary navigation">
          {portfolio.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
          <span aria-hidden="true">{theme === 'light' ? 'DK' : 'LT'}</span>
        </button>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-copy reveal">
            <p className="eyebrow">{portfolio.availability}</p>
            <h1>{portfolio.heroTitle}</h1>
            <p className="hero-intro">{portfolio.shortIntroduction}</p>
            
            <div className="hero-social-row">
              {portfolio.socialLinks.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="hero-social-badge" aria-label={link.label}>
                  {getSocialIcon(link.label)}
                </a>
              ))}
            </div>

            <div className="hero-actions">
              <a className="button button-primary" href="#contact">Start a conversation <span aria-hidden="true">-&gt;</span></a>
              <a className="button button-secondary" href="/resume.pdf" download>Download resume <span aria-hidden="true">PDF</span></a>
            </div>
            
            <ul className="hero-proof" aria-label="Professional credentials">
              {portfolio.credentials.map((credential) => <li key={credential}>{credential}</li>)}
            </ul>
          </div>
          
          <div className="hero-portrait reveal-delay">
            <div className="portrait-frame">
              <img src="/profile-photo.png" alt="Illustrated portrait of Kamran Raza" width="754" height="1600" />
            </div>
            <div className="portrait-note">
              <span>Based in</span>
              <strong>{portfolio.location}</strong>
            </div>
          </div>
        </section>

        <section className="marquee" aria-label="Areas of expertise">
          <div>
            {portfolio.marquee.map((item) => <span key={item}>{item} <b aria-hidden="true">+</b></span>)}
          </div>
        </section>

        <section className="section-grid section-stack about-section" id="about">
          <SectionTitle index="01" label="About" />
          <div className="section-content">
            <p className="statement statement-tight">{portfolio.about}</p>
            <div className="metrics metrics-cards">
              {portfolio.metrics.map((metric) => (
                <article key={metric.label} className="metric-card">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-grid section-stack" id="experience">
          <SectionTitle index="02" label="Experience" />
          <div className="section-content timeline">
            {portfolio.experience.map((role) => (
              <article className="timeline-item" key={role.title}>
                <div className="timeline-meta">
                  <span>{role.period}</span>
                  <span>{role.location}</span>
                </div>
                <div>
                  <h2>{role.title}</h2>
                  <p className="organization">{role.organization}</p>
                </div>
                <ul className="timeline-bullets">
                  {role.bullets.map((bullet, i) => (
                    <li key={i}><span className="bullet-sym">▸</span> {bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-grid skills-section section-stack" id="skills">
          <SectionTitle index="03" label="Expertise" />
          <div className="section-content">
            <div className="skills-intro">
              <h2>Systems that hold up under scrutiny.</h2>
              <p>Practical audit, quality and compliance expertise for organizations that need reliable standards in daily operations.</p>
            </div>
            <div className="skill-grid">
              {portfolio.skillGroups.map((group, index) => {
                const icons = [
                  // Food Safety
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="skill-icon" key="food-safety"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8a3 3 0 0 0-3 3c0 3 3 5 3 5s3-2 3-5a3 3 0 0 0-3-3z" /></svg>,
                  // QA/QC
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="skill-icon" key="qa-qc"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><path d="M8 11l2 2 4-4" /></svg>,
                  // Certification & Compliance
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="skill-icon" key="cert-compliance"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path d="M13 18l2 4-3-2-3 2 2-4" /><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" /></svg>,
                  // Improvement Practice
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="skill-icon" key="improvement"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                ]
                return (
                  <article className="skill-card" key={group.title}>
                    <div className="skill-card-header">
                      {icons[index]}
                      <span className="card-number">0{index + 1}</span>
                    </div>
                    <h3>{group.title}</h3>
                    <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section-grid section-stack" id="certifications">
          <SectionTitle index="04" label="Credentials" />
          <div className="section-content credential-layout">
            <div>
              <h2>Qualifications with operational perspective.</h2>
              <p>{portfolio.credentialIntroduction}</p>
            </div>
            <div className="credential-list">
              {portfolio.certifications.map((certificate) => (
                <article key={certificate.title} className="credential-item">
                  <div className="credential-icon-title">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="cert-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                    <div>
                      <span>{certificate.type}</span>
                      <h3>{certificate.title}</h3>
                    </div>
                  </div>
                  <p>{certificate.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-grid section-stack" id="projects">
          <SectionTitle index="05" label="Selected work" />
          <div className="section-content project-grid">
            {portfolio.projects.map((project, index) => (
              <article className={`project-card project-${index + 1}`} key={project.title}>
                <span>{project.category}</span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <ul className="project-bullets">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome}><span className="bullet-sym">▸</span> {outcome}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-grid section-stack" id="education">
          <SectionTitle index="06" label="Education" />
          <div className="section-content education-list">
            {portfolio.education.map((item) => (
              <article key={item.degree}>
                <span>{item.level}</span>
                <h2>{item.degree}</h2>
                <p>{item.focus}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">Let us work on the next standard</p>
            <h2>Ready to make quality more dependable?</h2>
            <p>{portfolio.contactIntro}</p>
            <a className="contact-email" href={`mailto:${portfolio.email}`}>{portfolio.email}</a>
            
            <div className="social-links">
              {portfolio.socialLinks.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="social-link-badge">
                  {getSocialIcon(link.label)}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
          
          <form className="contact-form" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden-field"><label>Do not fill this out if you are human: <input name="bot-field" /></label></p>
            <label>Name<input name="name" type="text" autoComplete="name" required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
            <label>How can I help?<textarea name="message" rows={5} required /></label>
            <button className="button button-primary" type="submit">Send message <span aria-hidden="true">-&gt;</span></button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <p>{portfolio.name} <span>/</span> Food Safety, Quality & Compliance</p>
        <p>Built for clarity, credibility and connection.</p>
      </footer>
    </div>
  )
}

export default App

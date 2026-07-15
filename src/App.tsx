import { useEffect, useState } from 'react'
import { portfolio } from './data/portfolio'

type Theme = 'light' | 'dark'

function SectionTitle({ index, title, label }: { index: string; title: string; label: string }) {
  return (
    <div className="section-title">
      <span>{index}</span>
      <div>
        <p>{label}</p>
        <h2>{title}</h2>
      </div>
    </div>
  )
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

        <section className="section-grid section-stack about-section" id="about">
          <SectionTitle index="01" label="About" title="A practical profile built around trust, clarity and audit discipline." />
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
          <SectionTitle index="02" label="Experience" title="A concise path through certification, auditing and quality systems." />
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
                <p>{role.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-grid skills-section section-stack" id="skills">
          <SectionTitle index="03" label="Expertise" title="What I do." />
          <div className="section-content">
            <div className="skills-intro">
              <h2>Systems that hold up under scrutiny.</h2>
              <p>Practical audit, quality and compliance expertise for organizations that need reliable standards in daily operations.</p>
            </div>
            <div className="skill-grid">
              {portfolio.skillGroups.map((group, index) => (
                <article className="skill-card" key={group.title}>
                  <span className="card-number">0{index + 1}</span>
                  <h3>{group.title}</h3>
                  <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-grid section-stack" id="certifications">
          <SectionTitle index="04" label="Credentials" title="Selected qualifications and recognition." />
          <div className="section-content credential-layout">
            <div>
              <h2>Qualifications with operational perspective.</h2>
              <p>{portfolio.credentialIntroduction}</p>
            </div>
            <div className="credential-list">
              {portfolio.certifications.map((certificate) => (
                <article key={certificate.title}>
                  <span>{certificate.type}</span>
                  <h3>{certificate.title}</h3>
                  <p>{certificate.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-grid section-stack" id="projects">
          <SectionTitle index="05" label="Selected work" title="Examples of the kinds of work I support." />
          <div className="section-content project-grid">
            {portfolio.projects.map((project, index) => (
              <article className={`project-card project-${index + 1}`} key={project.title}>
                <span>{project.category}</span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <ul>{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-grid section-stack" id="education">
          <SectionTitle index="06" label="Education" title="Academic background." />
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
            <div className="social-links">{portfolio.socialLinks.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label} <span aria-hidden="true">-&gt;</span></a>)}</div>
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

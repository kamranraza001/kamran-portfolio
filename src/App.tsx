import { useEffect, useState } from 'react'
import { portfolio } from './data/portfolio'

type SectionHeadingProps = {
  index: string
  label: string
  title: string
  introduction?: string
}

function SectionHeading({ index, label, title, introduction }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <div className="section-kicker">
        <span>{index}</span>
        <span>{label}</span>
      </div>
      <div>
        <h2>{title}</h2>
        {introduction ? <p>{introduction}</p> : null}
      </div>
    </header>
  )
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${portfolio.name} home`}>
          <span className="brand-mark">{portfolio.monogram}</span>
          <span>{portfolio.name}</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        <nav
          className={`primary-nav ${menuOpen ? 'is-open' : ''}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {portfolio.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </header>

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy reveal">
            <p className="eyebrow">{portfolio.eyebrow}</p>
            <h1 id="hero-title">{portfolio.heroTitle}</h1>
            <p className="professional-title">{portfolio.professionalTitle}</p>
            <p className="hero-introduction">{portfolio.shortIntroduction}</p>

            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Start a conversation <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href={portfolio.resumeUrl}>
                View resume <span>PDF</span>
              </a>
            </div>

            <div className="hero-links" aria-label="Professional profiles">
              {portfolio.socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                  {social.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="portrait-column reveal reveal-delay">
            <div className="portrait-frame">
              <span className="portrait-halo" aria-hidden="true" />
              <img src={portfolio.photo} alt={`Illustrated portrait of ${portfolio.name}`} />
            </div>
            <p className="portrait-caption">
              Based in <strong>{portfolio.location}</strong>
            </p>
          </div>

          <dl className="hero-metrics">
            {portfolio.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section-shell" id="about">
          <SectionHeading
            index="01"
            label="Profile"
            title="Independent judgement. Practical implementation."
          />
          <div className="about-copy">
            {portfolio.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="section-shell" id="experience">
          <SectionHeading
            index="02"
            label="Experience"
            title="Standards translated into operating discipline."
            introduction="A career across certification, manufacturing quality, food safety, halal assurance, and international compliance."
          />
          <div className="experience-list">
            {portfolio.experience.map((role) => (
              <article className="experience-row" key={`${role.title}-${role.organization}`}>
                <div className="experience-meta">
                  <span>{role.period}</span>
                  <span>{role.location}</span>
                </div>
                <div>
                  <h3>{role.title}</h3>
                  <p className="organization">{role.organization}</p>
                  <p>{role.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell" id="expertise">
          <SectionHeading
            index="03"
            label="Expertise"
            title="Four disciplines. One assurance mindset."
            introduction="Focused expertise for organizations that need credible controls, defensible evidence, and sustained compliance."
          />
          <div className="expertise-grid">
            {portfolio.expertise.map((group, index) => (
              <article className="expertise-item" key={group.title}>
                <span className="item-number">0{index + 1}</span>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell" id="credentials">
          <SectionHeading
            index="04"
            label="Credentials"
            title="Qualified to assess. Experienced to advise."
          />
          <div className="credential-list">
            {portfolio.credentials.map((credential) => (
              <article className="credential-row" key={credential.title}>
                <span>{credential.type}</span>
                <h3>{credential.title}</h3>
                <p>{credential.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell" id="selected-work">
          <SectionHeading
            index="05"
            label="Selected work"
            title="Representative audit and assurance engagements."
          />
          <div className="work-list">
            {portfolio.selectedWork.map((project) => (
              <article className="work-row" key={project.title}>
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell" id="education">
          <SectionHeading
            index="06"
            label="Education"
            title="Engineering foundations. Food-safety specialization."
          />
          <div className="education-list">
            {portfolio.education.map((item) => (
              <article key={item.degree}>
                <span>{item.level}</span>
                <h3>{item.degree}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-intro">
            <p className="eyebrow">Private and professional enquiries</p>
            <h2>Let’s make your next audit more decisive.</h2>
            <p>
              For audit, compliance, QA/QC, food safety, or halal certification work,
              contact me directly or connect on LinkedIn.
            </p>
            <a className="email-link" href={`mailto:${portfolio.email}`}>
              {portfolio.email}
            </a>
          </div>

          <form className="contact-form" name="contact" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="contact" />
            <label>
              Name
              <input type="text" name="name" autoComplete="name" required />
            </label>
            <label>
              Email
              <input type="email" name="email" autoComplete="email" required />
            </label>
            <label>
              How can I help?
              <textarea name="message" rows={4} required />
            </label>
            <button className="button button-primary" type="submit">
              Send message <span aria-hidden="true">↗</span>
            </button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <p>{portfolio.name} / Quality, Certification &amp; Compliance</p>
        <div>
          {portfolio.socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  )
}

export default App

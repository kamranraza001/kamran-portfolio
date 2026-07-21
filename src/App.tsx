import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Certificate,
  CheckCircle,
  Drop,
  EnvelopeSimple,
  Factory,
  FileText,
  Globe,
  GraduationCap,
  Leaf,
  LinkedinLogo,
  GithubLogo,
  List,
  Medal,
  Moon,
  ShieldCheck,
  Sun,
  X,
} from '@phosphor-icons/react'
import { portfolio } from './data/portfolio'

type SectionHeadingProps = {
  index: string
  label: string
  title: string
  introduction?: string
}

const expertiseIcons = [ShieldCheck, Factory, Certificate, Globe]
const credentialIcons = [ShieldCheck, Drop, Certificate, Medal]
const workIcons = [Factory, Drop, Globe]
const educationIcons = [Certificate, GraduationCap]

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
          {menuOpen ? <X size={20} /> : <List size={20} />}
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
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
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </header>

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy reveal">
            <p className="eyebrow">{portfolio.eyebrow}</p>
            <h1 id="hero-title">{portfolio.heroTitle}</h1>
            <p className="professional-title">{portfolio.professionalTitle}</p>
            <p className="hero-introduction">{portfolio.shortIntroduction}</p>

            <div className="hero-signals" aria-label="Core specialties">
              <div><ShieldCheck size={24} weight="duotone" /><span>ISO Auditing</span></div>
              <div><Factory size={24} weight="duotone" /><span>QA/QC</span></div>
              <div><Leaf size={24} weight="duotone" /><span>Halal Assurance</span></div>
              <div><Globe size={24} weight="duotone" /><span>Compliance</span></div>
            </div>

            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Start a conversation <ArrowUpRight size={17} />
              </a>
              <a className="button button-secondary" href={portfolio.resumeUrl}>
                View resume <FileText size={17} />
              </a>
            </div>

            <div className="hero-links" aria-label="Professional profiles">
              <a href={portfolio.socials[0].href} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinLogo size={20} weight="fill" /> LinkedIn
              </a>
              <a href={portfolio.socials[1].href} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GithubLogo size={20} weight="fill" /> GitHub
              </a>
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
            {portfolio.metrics.map((metric, index) => {
              const MetricIcon = [CheckCircle, Certificate, Globe][index]
              return (
                <div key={metric.label}>
                  <MetricIcon className="metric-icon" size={25} weight="duotone" />
                  <dt>{metric.value}</dt>
                  <dd>{metric.label}</dd>
                </div>
              )
            })}
          </dl>
        </section>

        <section className="career-context-section">
          <h2>Career context</h2>
          <div className="career-context-grid">
            {portfolio.careerContext.map((company) => (
              <div className="career-context-card" key={company.name}>
                <div className="career-context-logo-wrap">
                  <img src={company.logo} alt={`${company.name} logo`} />
                </div>
                <div className="career-context-info">
                  <h4>{company.subtitle}</h4>
                  <p>{company.context}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="career-context-footnote">
            Company names and marks identify professional context only; no endorsement is implied.
          </p>
        </section>

        <section className="section-shell" id="about">
          <SectionHeading index="01" label="Profile" title="Clear standards. Credible evidence." />
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
            title="From factory floor to certification."
          />
          <div className="experience-list">
            {portfolio.experience.map((role) => (
              <article className="experience-row" key={`${role.title}-${role.organization}`}>
                <div className="experience-meta">
                  <CheckCircle size={21} weight="duotone" />
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
          />
          <div className="expertise-grid">
            {portfolio.expertise.map((group, index) => {
              const ExpertiseIcon = expertiseIcons[index]
              return (
                <article className="expertise-item" key={group.title} style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}>
                  <div className="expertise-icon"><ExpertiseIcon size={30} weight="duotone" /></div>
                  <span className="item-number">0{index + 1}</span>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}><CheckCircle size={14} weight="fill" /> {item}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>

        <section className="section-shell" id="credentials">
          <SectionHeading index="04" label="Credentials" title="Qualified across key systems." />
          <div className="credential-list">
            {portfolio.credentials.map((credential, index) => {
              const CredentialIcon = credentialIcons[index]
              return (
                <article className="credential-row" key={credential.title}>
                  <div className="row-icon"><CredentialIcon size={27} weight="duotone" /></div>
                  <span>{credential.type}</span>
                  <h3>{credential.title}</h3>
                  <p>{credential.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="section-shell" id="selected-work">
          <SectionHeading index="05" label="Selected work" title="Evidence in practice." />
          <div className="work-list">
            {portfolio.selectedWork.map((project, index) => {
              const WorkIcon = workIcons[index]
              return (
                <article className="work-row" key={project.title}>
                  <div className="row-icon"><WorkIcon size={27} weight="duotone" /></div>
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="section-shell" id="education">
          <SectionHeading index="06" label="Education" title="Engineering meets food safety." />
          <div className="education-list">
            {portfolio.education.map((item, index) => {
              const EducationIcon = educationIcons[index]
              return (
                <article key={item.degree}>
                  <div className="education-icon"><EducationIcon size={29} weight="duotone" /></div>
                  <span>{item.level}</span>
                  <h3>{item.degree}</h3>
                  <p>{item.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-intro">
            <div className="contact-icon"><EnvelopeSimple size={32} weight="duotone" /></div>
            <p className="eyebrow">Professional enquiries</p>
            <h2>Let’s strengthen your next audit.</h2>
            <p>Food safety, QA/QC, halal certification, ISO auditing, and compliance.</p>
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
              Message
              <textarea name="message" rows={3} required />
            </label>
            <button className="button button-primary" type="submit">
              Send message <ArrowUpRight size={17} />
            </button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <p>{portfolio.name} / Quality, Certification &amp; Compliance</p>
        <div>
          <a href={portfolio.socials[0].href} target="_blank" rel="noreferrer"><LinkedinLogo size={18} /> LinkedIn</a>
          <a href={portfolio.socials[1].href} target="_blank" rel="noreferrer"><GithubLogo size={18} /> GitHub</a>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  )
}

export default App

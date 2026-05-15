'use client';
import { useEffect, useRef, useState } from 'react';

// ── Shared tokens ─────────────────────────────────────────────────────────────
const C = {
  plum:       '#2D1B3D',
  plumMid:    '#3D2450',
  plumLight:  '#6B3A5E',
  rose:       '#D4849A',
  roseLight:  '#E8A8BA',
  rosePale:   '#F5ECF1',
  blush:      '#FDF6F9',
  white:      '#FFFFFF',
  textBody:   '#3D2450',
  textMuted:  '#9B7A8E',
  border:     'rgba(212,132,154,0.2)',
};

// ── Intersection reveal ───────────────────────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add('visible'), delay); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

// ── Logo ──────────────────────────────────────────────────────────────────────
function Logo({ light = false }: { light?: boolean }) {
  const textColor = light ? '#FDF6F9' : C.plum;
  return (
    <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
        {/* Heart shape */}
        <path
          d="M21 35 C21 35 5 25 5 14.5 C5 9.5 9 6 13.5 6 C16.5 6 19 7.8 21 10.5 C23 7.8 25.5 6 28.5 6 C33 6 37 9.5 37 14.5 C37 25 21 35 21 35Z"
          fill={light ? 'rgba(212,132,154,0.18)' : 'rgba(212,132,154,0.15)'}
          stroke={C.rose}
          strokeWidth="1.4"
        />
        {/* EKG / pulse line */}
        <path
          d="M7 20 L13 20 L15.5 14 L18 26 L20.5 17 L23 23 L25.5 20 L35 20"
          stroke={light ? C.roseLight : C.plum}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span
        className="font-display"
        style={{
          fontSize: '1.45rem',
          fontWeight: 400,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: textColor,
          lineHeight: 1,
        }}
      >
        Luminary
      </span>
    </a>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    ['Our Story', '#our-story'],
    ['Mission', '#our-mission'],
    ['Resources', '#resources'],
    ['Research', '#research'],
    ['Know Your Rights', '#rights'],
    ['Get Involved', '#get-involved'],
  ];

  return (
    <nav
      className={scrolled ? 'scrolled' : ''}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? undefined : 'transparent',
        transition: 'all 0.5s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo light />

        {/* Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {links.map(([label, href]) => (
            <a key={label} href={href} style={{ color: 'rgba(253,246,249,0.72)', fontSize: '0.78rem', letterSpacing: '0.04em', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.color = C.roseLight)}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(253,246,249,0.72)')}
            >{label}</a>
          ))}
          <a href="#contact"
            style={{ background: C.rose, color: C.plum, padding: '9px 22px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.25s ease' }}
            onMouseOver={e => { e.currentTarget.style.background = C.roseLight; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseOut={e => { e.currentTarget.style.background = C.rose; e.currentTarget.style.transform = 'translateY(0)'; }}
          >Contact</a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} className="hamburger">
          {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 24, height: 1.5, background: C.roseLight, transition: 'all 0.3s', transform: open ? (i===0?'rotate(45deg) translateY(6.5px)':i===2?'rotate(-45deg) translateY(-6.5px)':'scaleX(0)') : 'none' }} />)}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: C.plum, borderTop: `1px solid ${C.border}` }}>
          {[...links, ['Contact', '#contact']].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '1rem 2rem', color: 'rgba(253,246,249,0.8)', fontSize: '0.9rem', textDecoration: 'none', borderBottom: `1px solid rgba(212,132,154,0.1)` }}
            >{label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      background: `linear-gradient(140deg, ${C.plum} 0%, ${C.plumMid} 55%, ${C.plumLight} 100%)`,
      display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative rings */}
      {[600,420,260].map((size, i) => (
        <div key={size} style={{
          position: 'absolute', right: '-8%', top: '50%', transform: 'translateY(-50%)',
          width: size, height: size,
          border: `1px solid rgba(212,132,154,${0.06 + i * 0.04})`,
          borderRadius: '50%', pointerEvents: 'none',
        }} />
      ))}
      {/* Glow */}
      <div style={{ position: 'absolute', bottom: '-15%', left: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(212,132,154,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', paddingTop: '7rem', paddingBottom: '5rem', width: '100%' }}>
        <div style={{ maxWidth: 680 }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem', animation: 'fadeInUp 0.7s ease forwards', opacity: 0 }}>
            <div style={{ width: 36, height: 1, background: C.rose }} />
            <span style={{ color: C.rose, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase' }}>
              A Global NICU Initiative
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display" style={{
            fontSize: 'clamp(3.2rem, 7vw, 6rem)', fontWeight: 300,
            color: C.blush, lineHeight: 1.05, marginBottom: '1.75rem',
            animation: 'fadeInUp 0.8s 0.1s ease forwards', opacity: 0,
          }}>
            Every Family<br />
            <em style={{ color: C.rose, fontStyle: 'italic' }}>Deserves</em> to Thrive.
          </h1>

          {/* Sub */}
          <p style={{
            color: 'rgba(253,246,249,0.6)', fontSize: '1.05rem', maxWidth: '52ch',
            lineHeight: 1.8, marginBottom: '2.5rem',
            animation: 'fadeInUp 0.8s 0.2s ease forwards', opacity: 0,
          }}>
            Luminary is a global initiative dedicated to transforming the neonatal intensive care 
            experience — supporting families, accelerating research, and building the connective 
            tissue the neonatal ecosystem has never had.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fadeInUp 0.8s 0.35s ease forwards', opacity: 0 }}>
            <a href="#our-mission"
              style={{ background: C.rose, color: C.plum, padding: '15px 38px', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s ease' }}
              onMouseOver={e => { e.currentTarget.style.background = C.roseLight; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={e => { e.currentTarget.style.background = C.rose; e.currentTarget.style.transform = 'translateY(0)'; }}
            >Explore Our Mission</a>
            <a href="#rights"
              style={{ background: 'transparent', color: C.blush, padding: '14px 38px', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', border: `1px solid rgba(253,246,249,0.3)`, textDecoration: 'none', transition: 'all 0.3s ease' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = C.rose; e.currentTarget.style.color = C.rose; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(253,246,249,0.3)'; e.currentTarget.style.color = C.blush; }}
            >Know Your Rights</a>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 0, marginTop: '5.5rem',
          borderTop: `1px solid rgba(212,132,154,0.18)`, paddingTop: '2.5rem',
          maxWidth: 780, animation: 'fadeInUp 0.8s 0.5s ease forwards', opacity: 0,
        }}>
          {[
            { num: '15M+',   label: 'Premature births annually worldwide (WHO)' },
            { num: '1 in 10', label: 'Babies born before 37 weeks (WHO)' },
            { num: '#1',     label: 'Cause of death in children under 5 (Lancet)' },
            { num: '180+',   label: 'Countries impacted globally' },
          ].map(s => (
            <div key={s.label} style={{ paddingRight: '2rem' }}>
              <div className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 300, color: C.rose, lineHeight: 1.1 }}>{s.num}</div>
              <div style={{ color: 'rgba(253,246,249,0.45)', fontSize: '0.72rem', lineHeight: 1.5, marginTop: '0.3rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, animation: 'fadeIn 1s 1.2s ease forwards', opacity: 0 }}>
        <span style={{ color: 'rgba(253,246,249,0.3)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${C.rose}80, transparent)` }} />
      </div>
    </section>
  );
}

// ── Our Story ─────────────────────────────────────────────────────────────────
function OurStory() {
  const ref = useReveal();
  return (
    <section id="our-story" style={{ background: C.blush, padding: '7rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="two-col">

          {/* Visual panel */}
          <div style={{ position: 'relative' }}>
            <div style={{ background: `linear-gradient(140deg, ${C.plum}, ${C.plumLight})`, aspectRatio: '4/5', maxHeight: 540, position: 'relative', overflow: 'hidden' }}>
              {/* Decorative SVG */}
              <svg viewBox="0 0 400 500" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }}>
                <circle cx="200" cy="200" r="160" stroke={C.rose} strokeWidth="0.8" fill="none"/>
                <circle cx="200" cy="200" r="100" stroke={C.rose} strokeWidth="0.8" fill="none"/>
                <circle cx="200" cy="200" r="50"  stroke={C.rose} strokeWidth="0.8" fill="none"/>
                <line x1="40"  y1="200" x2="360" y2="200" stroke={C.rose} strokeWidth="0.5"/>
                <line x1="200" y1="40"  x2="200" y2="360" stroke={C.rose} strokeWidth="0.5"/>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', textAlign: 'center' }}>
                <div className="font-display" style={{ fontSize: '6rem', fontWeight: 300, color: C.rose, opacity: 0.3, lineHeight: 1, fontStyle: 'italic', userSelect: 'none' }}>"</div>
                <p className="font-display" style={{ fontSize: '1.3rem', fontWeight: 300, color: C.blush, lineHeight: 1.7, fontStyle: 'italic', marginTop: '-1rem' }}>
                  No family should face the NICU alone. No parent should navigate that journey without the knowledge, support, and community they deserve.
                </p>
                <div style={{ width: 36, height: 1, background: C.rose, margin: '1.5rem auto 0.75rem' }} />
                <p style={{ color: 'rgba(253,246,249,0.45)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Founder, Luminary</p>
              </div>
            </div>
            {/* Rose accent block */}
            <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', width: 100, height: 100, background: C.rose, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
              <svg width="36" height="36" viewBox="0 0 42 42" fill="none">
                <path d="M21 35 C21 35 5 25 5 14.5 C5 9.5 9 6 13.5 6 C16.5 6 19 7.8 21 10.5 C23 7.8 25.5 6 28.5 6 C33 6 37 9.5 37 14.5 C37 25 21 35 21 35Z" fill="rgba(45,27,61,0.25)" stroke={C.plum} strokeWidth="1.5"/>
                <path d="M7 20 L13 20 L15.5 14 L18 26 L20.5 17 L23 23 L25.5 20 L35 20" stroke={C.plum} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Text */}
          <div ref={ref} className="section-reveal">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
              <div style={{ width: 36, height: 1, background: C.rose }} />
              <span style={{ color: C.rose, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Our Story</span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 300, color: C.plum, lineHeight: 1.15, marginBottom: '1.75rem' }}>
              Born from<br />a Personal Journey
            </h2>
            {[
              "When our daughter arrived premature, we entered a world we were wholly unprepared for — a world of beeping monitors, medical terminology, and the profound isolation of watching your child fight for life behind glass.",
              "We were fortunate. We had access to excellent care and the resources to navigate the journey. But as we looked around the NICU, we saw other families struggling far more than they should have.",
              "Luminary was founded from that experience and that inequity. We believe that the quality of a family's NICU journey should not be determined by their access to wealth, information, or geography.",
              "We are building the institution we wish had existed — one with the ambition, reach, and rigor to transform neonatal care for every family, everywhere.",
            ].map((p, i) => (
              <p key={i} style={{ color: '#5A3D6E', lineHeight: 1.8, fontSize: '0.97rem', marginBottom: '1.1rem' }}>{p}</p>
            ))}
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: `1px solid ${C.border}` }}>
              <a href="#our-mission" style={{ color: C.plum, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'gap 0.3s ease' }}
                onMouseOver={e => (e.currentTarget.style.gap = '14px')} onMouseOut={e => (e.currentTarget.style.gap = '8px')}>
                Read About Our Mission
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke={C.rose} strokeWidth="1.5" strokeLinecap="round"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`.two-col { @media (max-width: 768px) { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ── Mission / Pillars ─────────────────────────────────────────────────────────
function Mission() {
  const ref = useReveal();
  const pillars = [
    { num:'01', title:'Family Support', sub:'World-class resources for every NICU family', desc:"We provide evidence-based tools, emotional support frameworks, multilingual resources, and community connections for parents navigating one of life's most overwhelming experiences.", items:['24/7 Family Resource Library','Peer Support Matching','Mental Health Pathways','Financial Navigation Tools'] },
    { num:'02', title:'Community & Network', sub:"The world's largest NICU family network", desc:'We are building a global community of NICU families, clinicians, researchers, and advocates — united by shared experience and the shared conviction that better care is possible.', items:['Global Alumni Network','Clinician Collaboration Platform','Advocacy Coalition','Research Volunteer Registry'] },
    { num:'03', title:'Innovation & Impact', sub:'Accelerating breakthroughs in neonatal care', desc:'We partner with leading hospitals, researchers, and institutions to fund research, pilot new care models, and scale the interventions that demonstrably improve outcomes for premature and medically fragile newborns.', items:['Research Grants Program','Hospital Systems Partnerships','Policy & Advocacy','Global Impact Measurement'] },
  ];

  return (
    <section id="our-mission" style={{ background: C.plum, padding: '7rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div ref={ref} className="section-reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{ width: 36, height: 1, background: C.rose }} />
            <span style={{ color: C.rose, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase' }}>Our Mission</span>
            <div style={{ width: 36, height: 1, background: C.rose }} />
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 300, color: C.blush, lineHeight: 1.1, maxWidth: '18ch', margin: '0 auto 1.25rem' }}>
            Three Pillars of Systemic Change
          </h2>
          <p style={{ color: 'rgba(253,246,249,0.5)', maxWidth: '52ch', margin: '0 auto', lineHeight: 1.8, fontSize: '0.97rem' }}>
            Lasting change in neonatal care requires simultaneously supporting families, connecting the global community, and driving structural innovation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5px', background: C.border }}>
          {pillars.map((p, i) => {
            const ref2 = useReveal(i * 120);
            return (
              <div key={p.num} ref={ref2} className="section-reveal"
                style={{ background: C.plum, padding: '3rem 2.5rem', borderBottom: '3px solid transparent', transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s ease' }}
                onMouseOver={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = C.plumMid; el.style.borderBottomColor = C.rose; el.style.transform = 'translateY(-4px)'; }}
                onMouseOut={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = C.plum; el.style.borderBottomColor = 'transparent'; el.style.transform = 'translateY(0)'; }}
              >
                <div className="font-display" style={{ fontSize: '3.5rem', fontWeight: 300, color: 'rgba(212,132,154,0.2)', lineHeight: 1, marginBottom: '1.25rem' }}>{p.num}</div>
                <h3 className="font-display" style={{ fontSize: '1.7rem', fontWeight: 400, color: C.blush, lineHeight: 1.2, marginBottom: '0.4rem' }}>{p.title}</h3>
                <p style={{ color: C.rose, fontSize: '0.76rem', fontWeight: 600, letterSpacing: '0.07em', marginBottom: '1.25rem' }}>{p.sub}</p>
                <p style={{ color: 'rgba(253,246,249,0.52)', lineHeight: 1.75, fontSize: '0.88rem', marginBottom: '1.75rem' }}>{p.desc}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {p.items.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 9, color: 'rgba(253,246,249,0.55)', fontSize: '0.8rem' }}>
                      <div style={{ width: 4, height: 4, background: C.rose, borderRadius: '50%', flexShrink: 0 }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Resources ─────────────────────────────────────────────────────────────────
function Resources() {
  const ref = useReveal();
  const resources = [
    { icon:'❤️', cat:'Emotional Support', title:'Parent Mental Health Program', desc:'Evidence-based tools and guided pathways for managing the psychological weight of a NICU stay — for both parents and siblings.' },
    { icon:'📚', cat:'Education', title:'NICU Navigation Library', desc:"A comprehensive, clinician-reviewed library covering everything from understanding your baby's diagnosis to advocating for your family's rights." },
    { icon:'💬', cat:'Community', title:'Peer Support Network', desc:'Connect with other NICU parents who have walked this path. Our trained peer mentors are available in 40+ languages.' },
    { icon:'💰', cat:'Practical Help', title:'Financial Resource Navigator', desc:'A personalized guide to hospital financial assistance, insurance advocacy, government programs, and emergency family support.' },
    { icon:'🏥', cat:'Hospital Partners', title:'Partner NICU Directory', desc:'Find Luminary-partnered NICUs worldwide that have committed to family-integrated care standards and our quality benchmarks.' },
    { icon:'🌍', cat:'Global Access', title:'Multilingual Resource Hub', desc:'All core resources available in 20+ languages, with culturally adapted content developed in partnership with regional experts.' },
  ];

  return (
    <section id="resources" style={{ background: C.blush, padding: '7rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div ref={ref} className="section-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }} >
          <div style={{ position: 'sticky', top: '6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
              <div style={{ width: 36, height: 1, background: C.rose }} />
              <span style={{ color: C.rose, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase' }}>For Families</span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, color: C.plum, lineHeight: 1.15, marginBottom: '1.25rem' }}>
              Resources Built Around You
            </h2>
            <p style={{ color: '#5A3D6E', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
              Every resource we create is designed with families — informed by lived experience, refined by clinical expertise, and built to be accessible to anyone, anywhere.
            </p>
            <a href="#contact"
              style={{ background: C.plum, color: C.blush, padding: '13px 30px', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s ease' }}
              onMouseOver={e => { e.currentTarget.style.background = C.rose; e.currentTarget.style.color = C.plum; }}
              onMouseOut={e => { e.currentTarget.style.background = C.plum; e.currentTarget.style.color = C.blush; }}
            >Access Resources</a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5px', background: C.border }}>
            {resources.map(r => (
              <div key={r.title}
                style={{ background: C.blush, padding: '2.25rem 2rem', transition: 'background 0.3s ease', cursor: 'default' }}
                onMouseOver={e => (e.currentTarget.style.background = C.white)}
                onMouseOut={e => (e.currentTarget.style.background = C.blush)}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{r.icon}</div>
                <div style={{ color: C.rose, fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{r.cat}</div>
                <h4 style={{ color: C.plum, fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.6rem', lineHeight: 1.3 }}>{r.title}</h4>
                <p style={{ color: '#7A5080', fontSize: '0.83rem', lineHeight: 1.7 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){#resources .section-reveal{grid-template-columns:1fr!important}#resources .section-reveal>div:first-child{position:static!important}}@media(max-width:600px){#resources [style*="1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ── Know Your Rights ──────────────────────────────────────────────────────────
function KnowYourRights() {
  const ref = useReveal();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<null | { laws: { name: string; desc: string; applies: boolean }[]; summary: string }>(null);

  const questions = [
    { id: 'employer_size', label: 'How many employees does your employer have?', options: ['Fewer than 15', '15–49', '50 or more', 'Not sure'] },
    { id: 'situation', label: 'What best describes your situation?', options: ['NICU / premature birth', 'Child with serious illness', 'Caring for ill parent or spouse', 'Pregnancy-related condition', 'Postpartum / breastfeeding'] },
    { id: 'action', label: 'What has your employer done?', options: ['Denied leave', 'Retaliated after leave', 'Refused accommodations', 'Terminated my employment', 'Harassment or hostile environment'] },
    { id: 'state', label: 'Which state do you work in?', options: ['California', 'New York', 'New Jersey', 'Washington', 'Other state'] },
  ];

  const analyze = () => {
    const size = answers.employer_size;
    const laws = [
      { name: 'FMLA — Family & Medical Leave Act', applies: size === '50 or more' || size === 'Not sure', desc: '12 weeks of unpaid, job-protected leave. Applies to employers with 50+ employees. Covers birth, adoption, and serious health conditions.' },
      { name: 'PWFA — Pregnant Workers Fairness Act (2023)', applies: size !== 'Fewer than 15', desc: 'Requires employers with 15+ employees to provide reasonable accommodations for pregnancy, childbirth, and related conditions.' },
      { name: 'PUMP Act (2022)', applies: true, desc: 'Requires all employers to provide reasonable break time and a private space for nursing employees to express breast milk for up to one year after birth.' },
      { name: 'ADA — Americans with Disabilities Act', applies: size !== 'Fewer than 15', desc: 'May apply if your child or you have a qualifying disability. Also protects against "association discrimination" — being penalized because of a family member\'s disability.' },
      { name: 'Title VII — Pregnancy Discrimination Act', applies: size !== 'Fewer than 15', desc: 'Prohibits employers with 15+ employees from discriminating based on pregnancy, childbirth, or related medical conditions.' },
      { name: 'State-Level Protections', applies: ['California', 'New York', 'New Jersey', 'Washington'].includes(answers.state), desc: `${answers.state || 'Your state'} has additional protections that may provide stronger rights than federal law — including paid leave, broader employer coverage, and extended timelines.` },
    ];
    setResult({ laws, summary: `Based on your answers, ${laws.filter(l => l.applies).length} federal and/or state laws may apply to your situation. Review each one below, then consult a licensed employment attorney for advice specific to your case.` });
    setStep(questions.length + 1);
  };

  const reset = () => { setStep(0); setAnswers({}); setResult(null); };

  return (
    <section id="rights" style={{ background: C.rosePale, padding: '7rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div ref={ref} className="section-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{ width: 36, height: 1, background: C.rose }} />
            <span style={{ color: C.plumLight, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase' }}>Legal Resources</span>
            <div style={{ width: 36, height: 1, background: C.rose }} />
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 300, color: C.plum, lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Know Your Rights
          </h2>
          <p style={{ color: '#5A3D6E', maxWidth: '52ch', margin: '0 auto', lineHeight: 1.8, fontSize: '0.97rem' }}>
            Caregiver discrimination is more common than most parents realize — and more protected against than most employers admit. 
            Answer four questions and we'll show you which laws may apply to your situation.
          </p>
          <p style={{ color: C.textMuted, fontSize: '0.72rem', marginTop: '1rem', fontStyle: 'italic' }}>
            This tool provides general legal information, not legal advice. Always consult a licensed employment attorney for guidance on your specific situation.
          </p>
        </div>

        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {/* Progress bar */}
          {step <= questions.length && step > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: C.textMuted, fontSize: '0.72rem' }}>Question {step} of {questions.length}</span>
                <span style={{ color: C.rose, fontSize: '0.72rem', fontWeight: 600 }}>{Math.round((step / questions.length) * 100)}%</span>
              </div>
              <div style={{ height: 3, background: C.border, borderRadius: 2 }}>
                <div style={{ height: '100%', background: C.rose, width: `${(step / questions.length) * 100}%`, transition: 'width 0.4s ease', borderRadius: 2 }} />
              </div>
            </div>
          )}

          {/* Start screen */}
          {step === 0 && (
            <div style={{ background: C.white, padding: '3.5rem', textAlign: 'center', border: `1px solid ${C.border}` }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <svg width="56" height="56" viewBox="0 0 42 42" fill="none" style={{ margin: '0 auto' }}>
                  <path d="M21 35 C21 35 5 25 5 14.5 C5 9.5 9 6 13.5 6 C16.5 6 19 7.8 21 10.5 C23 7.8 25.5 6 28.5 6 C33 6 37 9.5 37 14.5 C37 25 21 35 21 35Z" fill="rgba(212,132,154,0.15)" stroke={C.rose} strokeWidth="1.4"/>
                  <path d="M7 20 L13 20 L15.5 14 L18 26 L20.5 17 L23 23 L25.5 20 L35 20" stroke={C.plum} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <h3 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 300, color: C.plum, marginBottom: '0.75rem' }}>Caregiver Rights Screener</h3>
              <p style={{ color: '#5A3D6E', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '40ch', margin: '0 auto 2rem' }}>
                Answer 4 questions to see which federal and state laws may protect you from workplace discrimination and retaliation.
              </p>
              <button onClick={() => setStep(1)}
                style={{ background: C.plum, color: C.blush, padding: '14px 36px', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseOver={e => (e.currentTarget.style.background = C.rose)}
                onMouseOut={e => (e.currentTarget.style.background = C.plum)}
              >Start Screener</button>
            </div>
          )}

          {/* Questions */}
          {step >= 1 && step <= questions.length && (
            <div style={{ background: C.white, padding: '3rem', border: `1px solid ${C.border}` }}>
              <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 300, color: C.plum, marginBottom: '2rem', lineHeight: 1.3 }}>
                {questions[step - 1].label}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {questions[step - 1].options.map(opt => (
                  <button key={opt} onClick={() => {
                    setAnswers(prev => ({ ...prev, [questions[step - 1].id]: opt }));
                    if (step < questions.length) setStep(s => s + 1); else analyze();
                  }}
                    style={{
                      background: answers[questions[step - 1].id] === opt ? C.rosePale : 'transparent',
                      border: `1px solid ${answers[questions[step - 1].id] === opt ? C.rose : C.border}`,
                      padding: '14px 20px', textAlign: 'left', cursor: 'pointer',
                      color: C.plum, fontSize: '0.9rem', transition: 'all 0.2s ease',
                    }}
                    onMouseOver={e => { if (answers[questions[step-1].id] !== opt) { e.currentTarget.style.borderColor = C.rose; e.currentTarget.style.background = 'rgba(212,132,154,0.04)'; }}}
                    onMouseOut={e => { if (answers[questions[step-1].id] !== opt) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = 'transparent'; }}}
                  >{opt}</button>
                ))}
              </div>
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)} style={{ marginTop: '1.5rem', background: 'none', border: 'none', color: C.textMuted, fontSize: '0.78rem', cursor: 'pointer', letterSpacing: '0.05em' }}>
                  ← Back
                </button>
              )}
            </div>
          )}

          {/* Results */}
          {result && (
            <div>
              <div style={{ background: C.plum, padding: '2rem 2.5rem', marginBottom: '1.5px' }}>
                <p style={{ color: C.rose, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Your Rights Overview</p>
                <p style={{ color: C.blush, lineHeight: 1.75, fontSize: '0.92rem' }}>{result.summary}</p>
              </div>
              {result.laws.map(law => (
                <div key={law.name} style={{ background: law.applies ? C.white : '#F9F5FB', padding: '1.75rem 2.5rem', marginBottom: '1.5px', border: `1px solid ${law.applies ? C.rose : C.border}`, opacity: law.applies ? 1 : 0.55 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: law.applies ? C.rose : C.border, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <span style={{ color: law.applies ? C.plum : C.textMuted, fontSize: '0.7rem', fontWeight: 700 }}>{law.applies ? '✓' : '–'}</span>
                    </div>
                    <div>
                      <h4 style={{ color: C.plum, fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>{law.name}</h4>
                      <p style={{ color: '#5A3D6E', fontSize: '0.83rem', lineHeight: 1.7 }}>{law.desc}</p>
                      {!law.applies && <p style={{ color: C.textMuted, fontSize: '0.75rem', marginTop: '0.4rem', fontStyle: 'italic' }}>May not apply based on your answers — verify with an attorney.</p>}
                    </div>
                  </div>
                </div>
              ))}

              {/* Next steps */}
              <div style={{ background: C.rosePale, padding: '2rem 2.5rem', border: `1px solid ${C.border}`, marginTop: '1.5rem' }}>
                <h4 style={{ color: C.plum, fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }}>Recommended Next Steps</h4>
                {[
                  'Document everything — dates, conversations, emails, and any changes in your treatment at work',
                  'File a charge with the EEOC within 180–300 days of the discriminatory act (deadline matters)',
                  'Contact your state labor board for additional state-law protections',
                  'Consult a licensed employment attorney — many offer free initial consultations',
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 20, height: 20, background: C.rose, color: C.plum, fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{i+1}</div>
                    <p style={{ color: '#5A3D6E', fontSize: '0.85rem', lineHeight: 1.65 }}>{s}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <a href="#contact" style={{ background: C.plum, color: C.blush, padding: '13px 28px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s' }}
                  onMouseOver={e => (e.currentTarget.style.background = C.rose)} onMouseOut={e => (e.currentTarget.style.background = C.plum)}>
                  Find Legal Help
                </a>
                <button onClick={reset} style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.textMuted, padding: '12px 28px', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Research ──────────────────────────────────────────────────────────────────
function Research() {
  const ref = useReveal();
  return (
    <section id="research" style={{ background: C.plumMid, padding: '7rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div ref={ref} className="section-reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{ width: 36, height: 1, background: C.rose }} />
            <span style={{ color: C.rose, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase' }}>Research & Impact</span>
            <div style={{ width: 36, height: 1, background: C.rose }} />
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 300, color: C.blush, lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Rigorous Science.<br /><em style={{ color: C.rose }}>Real-World Impact.</em>
          </h2>
          <p style={{ color: 'rgba(253,246,249,0.5)', maxWidth: '52ch', margin: '0 auto', lineHeight: 1.8 }}>
            We invest in the research and innovations with the greatest potential to improve outcomes — and hold ourselves to the highest standards of evidence and accountability.
          </p>
        </div>

        {/* WHO stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginBottom: '1rem', border: `1px solid rgba(212,132,154,0.15)` }}>
          {[
            { num:'15M+', label:'Preterm births annually (WHO)' },
            { num:'1 in 10', label:'Babies born premature globally (WHO)' },
            { num:'#1', label:'Cause of under-5 mortality (Lancet)' },
            { num:'90%+', label:'Survival rate in high-income countries vs. <10% in low-income (WHO)' },
          ].map((s, i) => (
            <div key={s.label} style={{ padding: '2.5rem 2rem', borderRight: i < 3 ? '1px solid rgba(212,132,154,0.15)' : 'none', textAlign: 'center' }}>
              <div className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, color: C.rose, lineHeight: 1, marginBottom: '0.6rem' }}>{s.num}</div>
              <div style={{ color: 'rgba(253,246,249,0.4)', fontSize: '0.75rem', lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <p style={{ color: 'rgba(253,246,249,0.18)', fontSize: '0.68rem', textAlign: 'center', marginBottom: '4rem' }}>
          Statistics sourced from the World Health Organization and The Lancet. Luminary is in its founding phase.
        </p>

        {/* Research focus areas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {[
            { title:'Global NICU Data Commons', desc:'Building the first ethically governed, family-consented global neonatal outcomes dataset — open access, contributed by partner hospitals worldwide.', tags:['Data Infrastructure','Open Science'] },
            { title:'Family Knowledge as Clinical Evidence', desc:'Systematically capturing family-reported outcomes and translating them into clinical evidence — making parents co-producers of medical knowledge.', tags:['Patient-Reported Outcomes','Research'] },
            { title:'Neurodevelopmental Outcomes', desc:'A longitudinal study following NICU graduates from birth to adulthood to identify the interventions that most improve lifelong brain development.', tags:['Longitudinal Study','Child Development'] },
            { title:'Closing the Survival Gap', desc:'Addressing the catastrophic equity gap — a premature baby in a high-income country has a 90%+ survival rate; in a low-income country, below 10%.', tags:['Health Equity','Global Health'] },
          ].map(a => (
            <div key={a.title}
              style={{ border: `1px solid rgba(212,132,154,0.15)`, padding: '2.25rem', transition: 'border-color 0.3s ease, background 0.3s ease' }}
              onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,132,154,0.5)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(212,132,154,0.04)'; }}
              onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,132,154,0.15)'; (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
            >
              <h4 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 400, color: C.blush, lineHeight: 1.3, marginBottom: '0.85rem' }}>{a.title}</h4>
              <p style={{ color: 'rgba(253,246,249,0.5)', fontSize: '0.85rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>{a.desc}</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {a.tags.map(t => <span key={t} style={{ background: 'rgba(212,132,154,0.1)', color: C.rose, fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 9px' }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Get Involved ──────────────────────────────────────────────────────────────
function GetInvolved() {
  const ref = useReveal();
  const ways = [
    { title:'NICU Families', sub:'Share your story. Strengthen the community.', desc:"If you've experienced the NICU — as a parent, grandparent, or sibling — your story matters. Join our global alumni network.", cta:'Join the Network' },
    { title:'Clinicians & Researchers', sub:'Bring your expertise to a global mission.', desc:'Partner with Luminary to conduct research, share clinical insights, pilot new care models, or join our advisory councils.', cta:'Partner With Us' },
    { title:'Institutions & Partners', sub:'Bring organizational weight to the mission.', desc:"We're building relationships with foundations, research institutions, and health organizations who share our conviction that every premature baby deserves a fighting chance.", cta:'Explore Partnership' },
    { title:'Hospitals & Health Systems', sub:"Elevate your NICU's standard of care.", desc:'Become a Luminary-partnered hospital and help us implement family-integrated care standards and connect with a global network of neonatal professionals.', cta:'Become a Partner' },
  ];

  return (
    <section id="get-involved" style={{ background: C.blush, padding: '7rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div ref={ref} className="section-reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{ width: 36, height: 1, background: C.rose }} />
            <span style={{ color: C.rose, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase' }}>Get Involved</span>
            <div style={{ width: 36, height: 1, background: C.rose }} />
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 300, color: C.plum, lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Everyone Has a Role to Play
          </h2>
          <p style={{ color: '#5A3D6E', maxWidth: '52ch', margin: '0 auto', lineHeight: 1.8 }}>
            Whether you are a NICU parent, a neonatologist, a researcher, or simply someone who believes in the cause — there is a meaningful way to be part of this mission.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5px', background: C.border }}>
          {ways.map((w, i) => (
            <div key={w.title}
              style={{ background: C.blush, padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', transition: 'background 0.3s ease', cursor: 'default' }}
              onMouseOver={e => (e.currentTarget.style.background = C.white)}
              onMouseOut={e => (e.currentTarget.style.background = C.blush)}
            >
              <div className="font-display" style={{ fontSize: '2.8rem', fontWeight: 300, color: 'rgba(45,27,61,0.1)', lineHeight: 1, marginBottom: '1.25rem' }}>0{i+1}</div>
              <h3 className="font-display" style={{ fontSize: '1.55rem', fontWeight: 400, color: C.plum, lineHeight: 1.2, marginBottom: '0.35rem' }}>{w.title}</h3>
              <p style={{ color: C.rose, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.07em', marginBottom: '1rem' }}>{w.sub}</p>
              <p style={{ color: '#5A3D6E', fontSize: '0.85rem', lineHeight: 1.75, flex: 1, marginBottom: '1.75rem' }}>{w.desc}</p>
              <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: C.plum, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'gap 0.3s ease' }}
                onMouseOver={e => (e.currentTarget.style.gap = '14px')} onMouseOut={e => (e.currentTarget.style.gap = '8px')}>
                {w.cta}
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 3l3.5 3.5L7 10" stroke={C.rose} strokeWidth="1.4" strokeLinecap="round"/></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Quote Banner ──────────────────────────────────────────────────────────────
function QuoteBanner() {
  return (
    <section style={{ background: C.rose, padding: '5rem 2rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <p className="font-display" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.3rem)', fontWeight: 300, color: C.plum, fontStyle: 'italic', lineHeight: 1.55 }}>
          "The most powerful thing we can give a premature baby is parents who know they are not alone — 
          and a system that treats them as partners, not visitors."
        </p>
        <div style={{ width: 36, height: 1, background: 'rgba(45,27,61,0.35)', margin: '1.75rem auto' }} />
        <p style={{ color: 'rgba(45,27,61,0.65)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>Luminary Founding Principle</p>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: '', email: '', role: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" style={{ background: C.plum, padding: '7rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }} className="two-col">
          <div ref={ref} className="section-reveal">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
              <div style={{ width: 36, height: 1, background: C.rose }} />
              <span style={{ color: C.rose, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Contact</span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: C.blush, lineHeight: 1.15, marginBottom: '1.75rem' }}>
              Let's Build<br />Something Lasting
            </h2>
            <p style={{ color: 'rgba(253,246,249,0.5)', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '0.95rem' }}>
              Whether you're a NICU family seeking support, a clinician interested in partnership, or an institution aligned with our mission — we want to hear from you.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {[
                { label:'General Inquiries', value:'hello@luminary.org' },
                { label:'Media & Press',     value:'press@luminary.org' },
                { label:'Research',          value:'research@luminary.org' },
                { label:'Partnerships',      value:'partners@luminary.org' },
              ].map(c => (
                <div key={c.label}>
                  <div style={{ color: C.rose, fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{c.label}</div>
                  <div style={{ color: 'rgba(253,246,249,0.65)', fontSize: '0.92rem' }}>{c.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(253,246,249,0.04)', border: `1px solid ${C.border}`, padding: '3rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✉️</div>
                <h3 className="font-display" style={{ fontSize: '1.7rem', fontWeight: 300, color: C.blush, marginBottom: '0.75rem' }}>Thank You</h3>
                <p style={{ color: 'rgba(253,246,249,0.5)', lineHeight: 1.7 }}>We've received your message and will be in touch within 2 business days.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 300, color: C.blush, marginBottom: '0.25rem' }}>Send Us a Message</h3>
                {[
                  { key:'name', label:'Full Name', type:'text', ph:'Your full name' },
                  { key:'email', label:'Email Address', type:'email', ph:'your@email.com' },
                  { key:'role', label:'I am a…', type:'text', ph:'NICU Parent / Clinician / Researcher / Partner / Other' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', color: C.rose, fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{ width: '100%', background: 'transparent', border: `1px solid rgba(253,246,249,0.12)`, padding: '11px 14px', color: C.blush, fontSize: '0.88rem', outline: 'none', transition: 'border-color 0.3s', fontFamily: 'DM Sans, sans-serif' }}
                      onFocus={e => (e.target.style.borderColor = C.rose)} onBlur={e => (e.target.style.borderColor = 'rgba(253,246,249,0.12)')}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', color: C.rose, fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Message</label>
                  <textarea rows={5} placeholder="How can we help, or how would you like to get involved?"
                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ width: '100%', background: 'transparent', border: `1px solid rgba(253,246,249,0.12)`, padding: '11px 14px', color: C.blush, fontSize: '0.88rem', outline: 'none', resize: 'vertical', fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.3s' }}
                    onFocus={e => (e.target.style.borderColor = C.rose)} onBlur={e => (e.target.style.borderColor = 'rgba(253,246,249,0.12)')}
                  />
                </div>
                <button onClick={() => { if (form.name && form.email) setSubmitted(true); }}
                  style={{ background: C.rose, color: C.plum, padding: '14px 30px', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', alignSelf: 'flex-start', transition: 'all 0.3s ease' }}
                  onMouseOver={e => (e.currentTarget.style.background = C.roseLight)} onMouseOut={e => (e.currentTarget.style.background = C.rose)}
                >Send Message</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#1A0D25', padding: '4rem 0 2rem', borderTop: `1px solid rgba(212,132,154,0.1)` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3.5rem' }} className="footer-grid">
          <div>
            <Logo light />
            <p style={{ color: 'rgba(253,246,249,0.3)', fontSize: '0.82rem', lineHeight: 1.8, maxWidth: '28ch', marginTop: '1.25rem' }}>
              Transforming the neonatal intensive care experience for families worldwide through support, community, and innovation.
            </p>
          </div>
          {[
            { h:'Initiative', links:['Our Story','Our Mission','Leadership','Press'] },
            { h:'Programs',   links:['Family Resources','Peer Network','Research','Hospital Partners'] },
            { h:'Connect',    links:['Get Involved','Know Your Rights','Contact Us','Newsletter'] },
          ].map(col => (
            <div key={col.h}>
              <div style={{ color: C.rose, fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.1rem' }}>{col.h}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {col.links.map(l => <a key={l} href="#" style={{ color: 'rgba(253,246,249,0.38)', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => (e.currentTarget.style.color = C.blush)} onMouseOut={e => (e.currentTarget.style.color = 'rgba(253,246,249,0.38)')}>{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.75rem' }}>
          <p style={{ color: 'rgba(253,246,249,0.22)', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
            © 2024 Luminary. All rights reserved.
          </p>
          <p style={{ color: 'rgba(253,246,249,0.14)', fontSize: '0.7rem' }}>
            Luminary is currently in its founding phase. We are not a registered nonprofit and are not soliciting donations at this time.
          </p>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:480px){.footer-grid{grid-template-columns:1fr!important}}
        @media(max-width:768px){.two-col{grid-template-columns:1fr!important}}
      `}</style>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        .section-reveal { opacity:0; transform:translateY(36px); transition:opacity 0.9s ease,transform 0.9s ease; }
        .section-reveal.visible { opacity:1; transform:translateY(0); }
        nav.scrolled { background:rgba(45,27,61,0.97)!important; backdrop-filter:blur(20px); box-shadow:0 1px 0 rgba(212,132,154,0.2); }
      `}</style>
      <Nav />
      <Hero />
      <OurStory />
      <Mission />
      <Resources />
      <KnowYourRights />
      <Research />
      <QuoteBanner />
      <GetInvolved />
      <Contact />
      <Footer />
    </>
  );
}

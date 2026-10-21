import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import {
  Activity, ArrowDownRight, ArrowUpRight, Check, ChevronRight, CircleHelp,
  Code2, ExternalLink, FileCode2, Globe2, Menu, Newspaper, Radio, ShieldCheck,
  Sparkles, Terminal, X, Zap, LogIn, LogOut, Plus, Save, Trash2, Pencil, Send
} from 'lucide-react';
import './styles.css';

const envReady = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
// Local-only admin mode for private previews. Frontend credentials are visible to anyone inspecting the site;
// do not deploy this mode publicly. Use server-side authentication for a public site.
const LOCAL_ADMIN_USER = 'YimMenuV2-Admins';
const LOCAL_ADMIN_PASS = 'hU{cw>x0cäd!g6$FYZÄR';
const supabase = envReady ? createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY) : null;

const initialComponents = [
  { id: 'yim', name: 'YimMenuV2.dll', type: 'Core component', status: 'operational', description: 'The main YimMenu component.', url: 'https://github.com/YimMenu/YimMenuV2/releases/tag/nightly', icon: 'code' },
  { id: 'fsl', name: 'FSL', type: 'Save solution', status: 'operational', description: 'Community resource and documentation.', url: 'https://www.unknowncheats.me/forum/grand-theft-auto-v/616977-fsl-local-gtao-saves.html', icon: 'shield' },
  { id: 'xenos', name: 'Xenos DLL Injector', type: 'Utility', status: 'maintenance', description: 'External project maintained by its author.', url: 'https://github.com/DarthTon/Xenos', icon: 'terminal' },
  { id: 'lua', name: 'Lua Scripts', type: 'Community scripts', status: 'operational', description: 'Browse community-maintained Lua repositories.', url: 'https://github.com/orgs/YimMenu-Lua/repositories', icon: 'file' }
];
const initialNews = [
  { id: 'n1', category: 'ANNOUNCEMENT', date: '2026-10-21', title: 'Welcome to the new YimHub', body: 'A refreshed home for component status, useful links and community updates. Check back here for future announcements.', pinned: true },
  { id: 'n2', category: 'STATUS', date: '2026-10-18', title: 'Status information', body: 'Component statuses are maintained by the site team. Always check the original project page for the latest release details.', pinned: false }
];
const copy = {
  de: {
    navStatus:'Komponenten', navNews:'Neuigkeiten', navResources:'Ressourcen', navAdmin:'Admin', heroTag:'COMMUNITY HUB · STATUS & UPDATES',
    heroTitleA:'Alles Wichtige.', heroTitleB:'Ein zentraler Ort.', heroText:'Komponentenstatus, offizielle Projektlinks und Neuigkeiten – übersichtlich an einem Ort.',
    ctaStatus:'Status ansehen', ctaNews:'Neuigkeiten lesen', live:'SYSTEMÜBERSICHT', allSystems:'Komponenten im Überblick',
    statusTitle:'Komponentenstatus', statusSub:'Statusinformationen auf einen Blick. Externe Projektseiten bleiben die Quelle für Releases.',
    operational:'Betriebsbereit', maintenance:'Wartung', outage:'Beeinträchtigt', unknown:'Unbekannt', updated:'Status durch Admin gepflegt',
    download:'Projekt öffnen', newsTitle:'News & Ankündigungen', newsSub:'Updates aus der Community und wichtige Hinweise.', viewAll:'Alle Neuigkeiten',
    resourcesTitle:'Direkt zu den Projekten', resourcesSub:'Öffne die jeweiligen offiziellen oder Community-Projektseiten.',
    newsletterTitle:'Nichts mehr verpassen.', newsletterSub:'Erhalte neue Ankündigungen direkt in dein Postfach.', emailPlaceholder:'Deine E-Mail-Adresse', subscribe:'Anmelden',
    privacy:'Mit der Anmeldung stimmst du zu, Updates von YimHub zu erhalten. Du kannst dich jederzeit abmelden.',
    footerText:'Ein Community-Projekt. Bitte beachte die Richtlinien und Nutzungsbedingungen der jeweiligen Drittanbieter.',
    adminTitle:'Admin-Bereich', adminDesc:'Melde dich an, um Status und Neuigkeiten ohne Codeänderungen zu verwalten.',
    login:'Einloggen', logout:'Abmelden', email:'E-Mail-Adresse', password:'Passwort', loginNote:'Lokale Vorschau: Die Anmeldung wird im Browser geprüft. Für den öffentlichen Betrieb ist serverseitige Authentifizierung erforderlich.',
    dashboard:'Dashboard', manageStatus:'Komponenten verwalten', manageNews:'News verwalten', save:'Speichern', cancel:'Abbrechen', edit:'Bearbeiten', delete:'Löschen',
    addNews:'News erstellen', title:'Titel', category:'Kategorie', body:'Inhalt', date:'Datum', pinned:'Anheften', emptyNews:'Noch keine News vorhanden.',
    setupNeeded:'Lokaler Vorschau-Modus', setupText:'News, Komponentenstatus und Newsletter-Anmeldungen werden nur in diesem Browser gespeichert. Änderungen sind für Besucher auf anderen Geräten nicht sichtbar. Admin-Zugangsdaten im Frontend dürfen nicht öffentlich eingesetzt werden.',
    subscribeSuccess:'Danke! Deine Anmeldung wurde gespeichert.', subscribeError:'Anmeldung nicht möglich. Bitte versuche es erneut.',
    adminOnly:'Du bist nicht als Admin angemeldet.', statusLabel:'Status', description:'Beschreibung', link:'Projekt-Link', siteStatus:'Website-Status',
    footerStatus:'Community-Statusboard', latest:'NEUESTE UPDATES', noNews:'Aktuell gibt es keine Neuigkeiten.', loading:'Wird geladen…'
  },
  en: {
    navStatus:'Components', navNews:'News', navResources:'Resources', navAdmin:'Admin', heroTag:'COMMUNITY HUB · STATUS & UPDATES',
    heroTitleA:'Everything that matters.', heroTitleB:'One central hub.', heroText:'Component status, official project links and community updates — clear, useful, all in one place.',
    ctaStatus:'View status', ctaNews:'Read updates', live:'SYSTEM OVERVIEW', allSystems:'Components at a glance',
    statusTitle:'Component status', statusSub:'Status information at a glance. Original project pages remain the source for releases.',
    operational:'Operational', maintenance:'Maintenance', outage:'Degraded', unknown:'Unknown', updated:'Status maintained by admin',
    download:'Open project', newsTitle:'News & announcements', newsSub:'Community updates and important notices.', viewAll:'All updates',
    resourcesTitle:'Project quick links', resourcesSub:'Visit the relevant official or community project pages.',
    newsletterTitle:'Stay in the loop.', newsletterSub:'Get new announcements delivered straight to your inbox.', emailPlaceholder:'Your email address', subscribe:'Subscribe',
    privacy:'By subscribing, you agree to receive YimHub updates. You can unsubscribe at any time.',
    footerText:'A community project. Please follow the policies and terms of each third-party project.',
    adminTitle:'Admin area', adminDesc:'Sign in to manage component statuses and news without editing code.',
    login:'Sign in', logout:'Sign out', email:'Email address', password:'Password', loginNote:'Local preview: sign-in is checked in the browser. Public deployment requires server-side authentication.',
    dashboard:'Dashboard', manageStatus:'Manage components', manageNews:'Manage news', save:'Save', cancel:'Cancel', edit:'Edit', delete:'Delete',
    addNews:'Create news post', title:'Title', category:'Category', body:'Content', date:'Date', pinned:'Pin post', emptyNews:'No news posts yet.',
    setupNeeded:'Local preview mode', setupText:'News, component status and newsletter signups are stored only in this browser. Changes are not shared with visitors on other devices. Do not publish frontend-only admin credentials.',
    subscribeSuccess:'Thanks! Your subscription has been saved.', subscribeError:'Could not subscribe. Please try again.',
    adminOnly:'You are not signed in as an admin.', statusLabel:'Status', description:'Description', link:'Project link', siteStatus:'Site status',
    footerStatus:'Community status board', latest:'LATEST UPDATES', noNews:'There are no updates right now.', loading:'Loading…'
  }
};
const statusKey = (status) => ({ operational:'operational', maintenance:'maintenance', outage:'outage', unknown:'unknown' }[status] || 'unknown');
const IconFor = ({type}) => type === 'shield' ? <ShieldCheck/> : type === 'terminal' ? <Terminal/> : type === 'file' ? <FileCode2/> : <Code2/>;

function App() {
  const [lang, setLang] = useState('de');
  const [components, setComponents] = useState(() => {
    try { return JSON.parse(localStorage.getItem('yimhub-components')) || initialComponents; }
    catch { return initialComponents; }
  });
  const [news, setNews] = useState(() => {
    try { return JSON.parse(localStorage.getItem('yimhub-news')) || initialNews; }
    catch { return initialNews; }
  });
  const [session, setSession] = useState(() => {
    try { return sessionStorage.getItem('yimhub-local-admin') === '1' ? { local: true, user: 'admin' } : null; }
    catch { return null; }
  });
  const [section, setSection] = useState('home');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [adminTab, setAdminTab] = useState('status');
  const [editingNews, setEditingNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({data}) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    async function loadData() {
      const [{data: c}, {data: n}] = await Promise.all([
        supabase.from('components').select('*').order('sort_order'),
        supabase.from('news').select('*').order('created_at', {ascending:false})
      ]);
      if (c?.length) setComponents(c);
      if (n) setNews(n);
    }
    loadData();
    return () => listener.subscription.unsubscribe();
  }, []);

  const go = (target) => { setSection(target); setMobileMenu(false); window.scrollTo({top:0, behavior:'smooth'}); };
  const saveComponent = async (item) => {
    if (supabase) {
      const {error} = await supabase.from('components').upsert(item);
      if (error) { setNotice(error.message); return; }
    }
    const next = components.map(c => c.id === item.id ? item : c);
    setComponents(next);
    if (!supabase) localStorage.setItem('yimhub-components', JSON.stringify(next));
    setNotice(lang === 'de' ? 'Status gespeichert.' : 'Status saved.');
  };
  const saveNews = async (item) => {
    const payload = {...item};
    if (supabase) {
      const {error} = await supabase.from('news').upsert(payload);
      if (error) { setNotice(error.message); return; }
    }
    const next = [payload, ...news.filter(n => n.id !== payload.id)];
    setNews(next);
    if (!supabase) localStorage.setItem('yimhub-news', JSON.stringify(next));
    setEditingNews(null);
    setNotice(lang === 'de' ? 'News gespeichert.' : 'News saved.');
  };
  const deleteNews = async (id) => {
    if (!confirm(lang === 'de' ? 'Diesen Beitrag wirklich löschen?' : 'Delete this post?')) return;
    if (supabase) {
      const {error} = await supabase.from('news').delete().eq('id', id);
      if (error) { setNotice(error.message); return; }
    }
    const next = news.filter(n => n.id !== id);
    setNews(next);
    if (!supabase) localStorage.setItem('yimhub-news', JSON.stringify(next));
  };
  const login = async (e) => {
    e.preventDefault();
    if (!supabase) {
      if (loginEmail === LOCAL_ADMIN_USER && loginPassword === LOCAL_ADMIN_PASS) {
        const localSession = { local: true, user: 'admin' };
        setSession(localSession);
        try { sessionStorage.setItem('yimhub-local-admin', '1'); } catch {}
        setNotice('');
      } else {
        setNotice(lang === 'de' ? 'Anmeldedaten sind nicht korrekt.' : 'The login details are incorrect.');
      }
      return;
    }
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({email:loginEmail, password:loginPassword});
    setLoading(false);
    setNotice(error ? error.message : '');
  };
  const logout = async () => {
    if (supabase && !session?.local) await supabase.auth.signOut();
    try { sessionStorage.removeItem('yimhub-local-admin'); } catch {}
    setSession(null);
  };
  const subscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (!supabase) {
      try {
        const list = JSON.parse(localStorage.getItem('yimhub-newsletter') || '[]');
        const normalized = email.trim().toLowerCase();
        if (!list.includes(normalized)) localStorage.setItem('yimhub-newsletter', JSON.stringify([...list, normalized]));
        setNotice(t.subscribeSuccess);
        setEmail('');
      } catch { setNotice(t.subscribeError); }
      return;
    }
    const {error} = await supabase.from('newsletter_subscribers').insert({email:email.trim().toLowerCase()});
    setNotice(error ? t.subscribeError : t.subscribeSuccess);
    if (!error) setEmail('');
  };
  const statusText = (status) => t[statusKey(status)] || t.unknown;
  const statusColor = (status) => status === 'operational' ? 'green' : status === 'maintenance' ? 'amber' : status === 'outage' ? 'red' : 'gray';
  const sortedNews = [...news].sort((a,b) => Number(Boolean(b.pinned))-Number(Boolean(a.pinned)) || String(b.date || b.created_at || '').localeCompare(String(a.date || a.created_at || '')));
  const dateText = (date) => { if (!date) return ''; const d = new Date(date.length === 10 ? `${date}T12:00:00` : date); return Number.isNaN(d.getTime()) ? date : d.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US',{day:'2-digit',month:'short',year:'numeric'}); };

  return <div className="app-shell">
    <div className="topline"><span><span className="pulse-dot"/> {t.footerStatus}</span><span className="topline-right"><Activity size={13}/> {lang === 'de' ? 'Community-Updates & Projektlinks' : 'Community updates & project links'}</span></div>
    <header className="navbar">
      <button className="brand" onClick={() => go('home')} aria-label="YimHub home"><span className="brand-mark"><Zap size={20} fill="currentColor"/></span><span>YIM<span className="brand-accent">HUB</span><small>COMMUNITY NETWORK</small></span></button>
      <nav className={mobileMenu ? 'nav-links open' : 'nav-links'}>
        <button onClick={() => go('home')}>{lang === 'de' ? 'Übersicht' : 'Overview'}</button>
        <button onClick={() => go('status')}>{t.navStatus}</button>
        <button onClick={() => go('news')}>{t.navNews}</button>
        <button onClick={() => go('resources')}>{t.navResources}</button>
        <button className="mobile-admin" onClick={() => go('admin')}>{t.navAdmin}</button>
      </nav>
      <div className="nav-actions"><button className="language-btn" onClick={() => setLang(lang === 'de' ? 'en' : 'de')}><Globe2 size={15}/>{lang.toUpperCase()} <span className="lang-divider">/</span>{lang === 'de' ? 'EN' : 'DE'}</button><button className="admin-btn" onClick={() => go('admin')}><ShieldCheck size={15}/>{t.navAdmin}</button><button className="menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menu">{mobileMenu ? <X/> : <Menu/>}</button></div>
    </header>

    {section === 'home' && <>
      <main>
        <section className="hero container">
          <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/> {t.heroTag}</div>
            <h1>{t.heroTitleA}<br/><span>{t.heroTitleB}</span></h1>
            <p className="hero-text">{t.heroText}</p>
            <div className="hero-buttons"><button className="primary-btn" onClick={() => go('status')}>{t.ctaStatus}<ArrowUpRight size={17}/></button><button className="secondary-btn" onClick={() => go('news')}><Newspaper size={16}/>{t.ctaNews}</button></div>
            <div className="hero-meta"><span><Check size={14}/> {lang==='de'?'Übersichtlich & aktuell':'Clear & up to date'}</span><span><ShieldCheck size={14}/> {lang==='de'?'Community-orientiert':'Community-focused'}</span></div>
          </div>
          <div className="hero-visual"><div className="visual-glow"/><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-core"><div className="core-icon"><Zap size={37} fill="currentColor"/></div><div className="core-label">YIM<span>HUB</span></div><div className="core-caption">COMMUNITY SYSTEMS</div></div><div className="float-card float-top"><span className="mini-icon"><Activity size={15}/></span><span><b>{lang==='de'?'Statusübersicht':'System overview'}</b><small>4 {lang==='de'?'Komponenten':'components'}</small></span><span className="float-live"/></div><div className="float-card float-bottom"><span className="float-code"><Terminal size={17}/></span><span><b>{lang==='de'?'Projektlinks':'Project links'}</b><small>GitHub · Community</small></span><ArrowUpRight size={15}/></div><div className="visual-index">01 <span>—</span> 04</div></div>
        </section>
        <section className="overview-strip"><div className="container overview-inner"><div className="overview-heading"><span className="section-kicker">{t.live}</span><b>{t.allSystems}</b></div><div className="overview-stats"><div><span className="stat-number">{components.length.toString().padStart(2,'0')}</span><span>{lang==='de'?'Komponenten':'Components'}</span></div><div><span className="stat-number">{components.filter(c=>c.status==='operational').length.toString().padStart(2,'0')}</span><span>{lang==='de'?'Betriebsbereit':'Operational'}</span></div><div className="overview-state"><span className="pulse-dot"/>{components.every(c=>c.status==='operational') ? (lang==='de'?'Alle Systeme bereit':'All systems operational') : (lang==='de'?'Status prüfen':'Check component status')}</div></div></div></section>
        <section className="section container" id="status"><div className="section-head"><div><span className="section-kicker">01 / STATUS</span><h2>{t.statusTitle}</h2><p>{t.statusSub}</p></div><button className="text-link" onClick={() => go('status')}>{lang==='de'?'Alle Komponenten':'All components'} <ArrowUpRight size={16}/></button></div><div className="component-grid">{components.slice(0,4).map((c,i)=><ComponentCard key={c.id} item={c} t={t} statusText={statusText} statusColor={statusColor} index={i}/>)}</div></section>
        <section className="news-band"><div className="container"><div className="section-head"><div><span className="section-kicker">02 / {t.latest}</span><h2>{t.newsTitle}</h2><p>{t.newsSub}</p></div><button className="text-link" onClick={() => go('news')}>{t.viewAll} <ArrowUpRight size={16}/></button></div>{sortedNews.length ? <div className="news-grid">{sortedNews.slice(0,2).map((n,i)=><NewsCard key={n.id} item={n} t={t} dateText={dateText} onClick={() => go('news')} featured={i===0}/>)}</div> : <p>{t.noNews}</p>}</div></section>
        <section className="section container resources-preview"><div className="resource-banner"><div className="resource-banner-icon"><Sparkles size={24}/></div><div><span className="section-kicker">03 / RESOURCES</span><h2>{t.resourcesTitle}</h2><p>{t.resourcesSub}</p></div><button className="primary-btn" onClick={() => go('resources')}>{lang==='de'?'Links ansehen':'Explore links'}<ArrowUpRight size={17}/></button></div></section>
        <Newsletter t={t} email={email} setEmail={setEmail} subscribe={subscribe} notice={notice}/>
      </main>
    </>}

    {section === 'status' && <main className="page-main container"><PageIntro kicker="01 / STATUS" title={t.statusTitle} subtitle={t.statusSub}/><div className="component-grid full-grid">{components.map((c,i)=><ComponentCard key={c.id} item={c} t={t} statusText={statusText} statusColor={statusColor} index={i}/>)}</div><p className="disclaimer"><CircleHelp size={15}/>{lang==='de'?'Statusangaben sind Community-Pflege und keine automatischen Uptime-Prüfungen.':'Statuses are community-maintained and are not automated uptime checks.'}</p></main>}
    {section === 'news' && <main className="page-main container"><PageIntro kicker="02 / UPDATES" title={t.newsTitle} subtitle={t.newsSub}/>{sortedNews.length ? <div className="news-grid all-news">{sortedNews.map((n,i)=><NewsCard key={n.id} item={n} t={t} dateText={dateText} onClick={() => {}} featured={i===0}/>)}</div>:<div className="empty-state">{t.noNews}</div>}<Newsletter t={t} email={email} setEmail={setEmail} subscribe={subscribe} notice={notice}/></main>}
    {section === 'resources' && <main className="page-main container"><PageIntro kicker="03 / RESOURCES" title={t.resourcesTitle} subtitle={t.resourcesSub}/><div className="component-grid full-grid">{components.map((c,i)=><ComponentCard key={c.id} item={c} t={t} statusText={statusText} statusColor={statusColor} index={i}/>)}</div></main>}
    {section === 'admin' && <main className="page-main container admin-page"><PageIntro kicker="ADMIN CONSOLE" title={t.adminTitle} subtitle={t.adminDesc}/>{!session ? <div className="login-panel"><div className="login-icon"><ShieldCheck size={24}/></div><h3>{t.login}</h3><p>{t.loginNote}</p><form onSubmit={login} className="login-form"><label>{t.email}<input type={supabase ? "email" : "text"} required value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} placeholder="YimMenuV2-Admins" autoComplete="username"/></label><label>{t.password}<input type="password" required value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} placeholder="••••••••••"/></label><button className="primary-btn full-btn" disabled={loading}>{loading?t.loading:t.login}<LogIn size={16}/></button></form>{!envReady && <div className="setup-callout"><b>{t.setupNeeded}</b><p>{t.setupText}</p></div>}</div> : <div className="admin-console"><div className="admin-toolbar"><div className="admin-tabs"><button className={adminTab==='status'?'active':''} onClick={()=>setAdminTab('status')}>{t.manageStatus}</button><button className={adminTab==='news'?'active':''} onClick={()=>setAdminTab('news')}>{t.manageNews}</button></div><button className="secondary-btn" onClick={logout}><LogOut size={15}/>{t.logout}</button></div>{adminTab==='status' ? <div className="admin-list">{components.map(c=><AdminComponent key={c.id} item={c} t={t} saveComponent={saveComponent}/>)}</div> : <div className="admin-news"><button className="primary-btn" onClick={()=>setEditingNews({id:crypto.randomUUID(),title:'',category:'ANNOUNCEMENT',body:'',date:new Date().toISOString().slice(0,10),pinned:false})}><Plus size={16}/>{t.addNews}</button>{editingNews && <NewsEditor item={editingNews} t={t} setItem={setEditingNews} onSave={saveNews} onCancel={()=>setEditingNews(null)}/>}<div className="admin-list">{sortedNews.map(n=><div className="admin-news-row" key={n.id}><div><b>{n.title}</b><small>{n.category} · {n.date}</small></div><div className="row-actions"><button className="icon-btn" onClick={()=>setEditingNews({...n})} aria-label={t.edit}><Pencil size={15}/></button><button className="icon-btn danger" onClick={()=>deleteNews(n.id)} aria-label={t.delete}><Trash2 size={15}/></button></div></div>)}</div></div>}</div>}{notice && <div className="notice" role="status">{notice}<button onClick={()=>setNotice('')}><X size={14}/></button></div>}</main>}

    <footer className="footer"><div className="container footer-top"><button className="brand footer-brand" onClick={()=>go('home')}><span className="brand-mark"><Zap size={18} fill="currentColor"/></span><span>YIM<span className="brand-accent">HUB</span><small>COMMUNITY NETWORK</small></span></button><p>{t.footerText}</p><div className="footer-links"><button onClick={()=>go('status')}>{t.navStatus}</button><button onClick={()=>go('news')}>{t.navNews}</button><button onClick={()=>go('admin')}>{t.navAdmin}</button></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} YimHub</span><span>BUILT FOR THE COMMUNITY <span className="footer-dot">●</span></span></div></footer>
  </div>;
}

function ComponentCard({item,t,statusText,statusColor,index}) {
  return <article className="component-card"><div className="card-top"><span className="component-icon"><IconFor type={item.icon}/></span><span className={`status-pill ${statusColor(item.status)}`}><i/>{statusText(item.status)}</span></div><div className="component-info"><span className="component-type">{item.type || 'Community resource'}</span><h3>{item.name}</h3><p>{item.description}</p></div><div className="component-bottom"><a className="download-link" href={item.url} target="_blank" rel="noreferrer">{t.download}<ArrowUpRight size={15}/></a><span className="card-number">0{index+1}</span></div></article>;
}
function NewsCard({item,t,dateText,onClick,featured}) {
  return <article className={`news-card ${featured?'featured':''}`} onClick={onClick} role="button" tabIndex="0" onKeyDown={e=>e.key==='Enter'&&onClick()}><div className="news-card-top"><span className="news-category"><span/> {item.category || 'UPDATE'}</span><span className="news-date">{dateText(item.date || item.created_at)}</span></div><h3>{item.title}</h3><p>{item.body}</p><div className="news-card-bottom"><span>{t.navNews}</span><ArrowDownRight size={17}/></div></article>;
}
function PageIntro({kicker,title,subtitle}) { return <div className="page-intro"><span className="section-kicker">{kicker}</span><h1>{title}</h1><p>{subtitle}</p></div>; }
function Newsletter({t,email,setEmail,subscribe,notice}) {
  return <section className="newsletter-section"><div className="container newsletter-wrap"><div className="newsletter-icon"><Radio size={23}/></div><div className="newsletter-copy"><span className="section-kicker">YIMHUB DISPATCH</span><h2>{t.newsletterTitle}</h2><p>{t.newsletterSub}</p></div><form className="newsletter-form" onSubmit={subscribe}><div className="email-field"><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder={t.emailPlaceholder}/><button aria-label={t.subscribe} type="submit"><Send size={17}/></button></div><small>{t.privacy}</small>{notice && <small className="form-notice">{notice}</small>}</form></div></section>;
}
function AdminComponent({item,t,saveComponent}) {
  const [draft,setDraft] = useState(item);
  useEffect(()=>setDraft(item),[item]);
  return <div className="admin-component-row"><div className="admin-component-heading"><span className="component-icon small"><IconFor type={item.icon}/></span><div><b>{item.name}</b><small>{item.type}</small></div></div><div className="admin-fields"><label>{t.statusLabel}<select value={draft.status} onChange={e=>setDraft({...draft,status:e.target.value})}><option value="operational">{t.operational}</option><option value="maintenance">{t.maintenance}</option><option value="outage">{t.outage}</option><option value="unknown">{t.unknown}</option></select></label><label>{t.description}<input value={draft.description || ''} onChange={e=>setDraft({...draft,description:e.target.value})}/></label><label>{t.link}<input value={draft.url || ''} onChange={e=>setDraft({...draft,url:e.target.value})}/></label><button className="save-btn" onClick={()=>saveComponent(draft)}><Save size={15}/>{t.save}</button></div></div>;
}
function NewsEditor({item,t,setItem,onSave,onCancel}) {
  return <form className="news-editor" onSubmit={e=>{e.preventDefault();onSave(item)}}><label>{t.title}<input required value={item.title} onChange={e=>setItem({...item,title:e.target.value})}/></label><div className="editor-two"><label>{t.category}<select value={item.category} onChange={e=>setItem({...item,category:e.target.value})}><option>ANNOUNCEMENT</option><option>STATUS</option><option>UPDATE</option><option>COMMUNITY</option></select></label><label>{t.date}<input type="date" value={item.date || ''} onChange={e=>setItem({...item,date:e.target.value})}/></label></div><label>{t.body}<textarea rows="5" required value={item.body} onChange={e=>setItem({...item,body:e.target.value})}/></label><label className="check-label"><input type="checkbox" checked={Boolean(item.pinned)} onChange={e=>setItem({...item,pinned:e.target.checked})}/>{t.pinned}</label><div className="editor-actions"><button type="button" className="secondary-btn" onClick={onCancel}>{t.cancel}</button><button className="primary-btn"><Save size={15}/>{t.save}</button></div></form>;
}

createRoot(document.getElementById('root')).render(<App/>);
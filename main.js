import { siteData } from './data/mockData.js';

const byId = (id) => document.getElementById(id);

const renderHero = () => {
  byId('hero-kicker').textContent = siteData.profile.title;
  byId('hero-title').textContent = `${siteData.profile.name} · 个人 IP 小站`;
  byId('hero-description').textContent = siteData.profile.description;

  const actions = byId('hero-actions');
  actions.innerHTML = '';
  siteData.profile.ctas.forEach((cta) => {
    const link = document.createElement('a');
    link.href = cta.href;
    link.className = `button ${cta.type === 'primary' ? 'button-primary' : 'button-secondary'}`;
    link.textContent = cta.label;
    actions.append(link);
  });
};

const renderAbout = () => {
  const container = byId('about-grid');
  container.innerHTML = '';

  siteData.about.forEach((item) => {
    const article = document.createElement('article');
    article.className = 'info-card';
    article.innerHTML = `<h3>${item.label}</h3><p>${item.value}</p>`;
    container.append(article);
  });
};

const renderWorks = () => {
  byId('works-intro').textContent = siteData.worksIntro;
  const container = byId('works-grid');
  container.innerHTML = '';

  siteData.works.forEach((work) => {
    const article = document.createElement('article');
    article.className = 'work-card';
    article.innerHTML = `
      <p class="meta">${work.type} · ${work.year}</p>
      <h3>${work.title}</h3>
      <p>${work.summary}</p>
      <a href="${work.href}">${work.linkLabel}</a>
    `;
    container.append(article);
  });
};

const renderEssays = () => {
  byId('essays-intro').textContent = siteData.essaysIntro;
  const container = byId('essay-list');
  container.innerHTML = '';

  siteData.essays.forEach((essay) => {
    const item = document.createElement('li');
    item.className = 'essay-item';
    item.innerHTML = `
      <a href="${essay.href}" aria-label="阅读：${essay.title}">
        <h3>${essay.title}</h3>
        <p>${essay.excerpt}</p>
        <time datetime="${essay.date}">${essay.date}</time>
      </a>
    `;
    container.append(item);
  });
};

const renderContact = () => {
  byId('contact-note').textContent = siteData.contactNote;
  const container = byId('contact-list');
  container.innerHTML = '';

  siteData.contacts.forEach((contact) => {
    const item = document.createElement('li');
    item.innerHTML = `<span>${contact.label}</span><a href="${contact.href}">${contact.value}</a>`;
    container.append(item);
  });
};

const renderFooter = () => {
  const year = new Date().getFullYear();
  byId('footer-text').textContent = `© ${year} ${siteData.profile.name} · ${siteData.profile.tagline}`;
};

renderHero();
renderAbout();
renderWorks();
renderEssays();
renderContact();
renderFooter();

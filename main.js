import { exhibitionData } from './data/mockData.js';

const $ = (id) => document.getElementById(id);
const page = document.body.dataset.page;

const renderShell = () => {
  const siteName = $('site-name');
  const siteZhName = $('site-zh-name');
  const nav = $('site-nav');
  const footer = $('footer');

  if (siteName) siteName.textContent = exhibitionData.site.name;
  if (siteZhName) siteZhName.textContent = exhibitionData.site.zhName;

  if (nav) {
    nav.innerHTML = '';
    exhibitionData.site.nav.forEach((item) => {
      const link = document.createElement('a');
      link.href = item.href;
      link.textContent = item.label;
      const isCurrent = location.pathname.endsWith(item.href) || (location.pathname === '/' && item.href === 'index.html');
      if (isCurrent) link.setAttribute('aria-current', 'page');
      nav.append(link);
    });
  }

  const menuToggle = $('menu-toggle');
  menuToggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(Boolean(open)));
  });

  if (footer) footer.textContent = '纸、雾、花瓣、旧绢、傍晚的水面。';
};

const renderHome = () => {
  const { hero, portals, featured, preface } = exhibitionData.home;

  $('hero-title').textContent = hero.title;
  $('hero-subtitle').textContent = hero.subtitle;

  const heroPanel = $('hero-panel');
  const heroBackground = hero.backgroundFallbackImage
    ? `url(\"${hero.backgroundImage}\"), url(\"${hero.backgroundFallbackImage}\")`
    : `url(\"${hero.backgroundImage}\")`;
  heroPanel?.style.setProperty('--hero-image', heroBackground);

  const heroAction = $('hero-action');
  heroAction.textContent = hero.action.label;
  heroAction.href = hero.action.href;

  const heroCredit = $('hero-credit');
  heroCredit.textContent = `背景图：${hero.backgroundCredit}`;

  $('portal-title').textContent = portals.title;
  const portalGrid = $('portal-grid');
  portalGrid.innerHTML = '';

  portals.items.forEach((item, index) => {
    const card = document.createElement('a');
    card.className = 'card portal-card';
    card.href = item.href;
    card.innerHTML = `
      <span class="portal-index">${String(index + 1).padStart(2, '0')}</span>
      <h3>${item.name}</h3>
      <p>${item.note}</p>
    `;
    portalGrid.append(card);
  });

  $('featured-title').textContent = featured.title;
  $('featured-subtitle').textContent = featured.subtitle;

  const featuredGrid = $('featured-grid');
  featuredGrid.innerHTML = '';

  featured.works.forEach((work, index) => {
    const figure = document.createElement('figure');
    figure.className = 'image-card';
    figure.innerHTML = `
      <div class="image-placeholder image-${index + 1}" aria-hidden="true"></div>
      <figcaption>
        <strong>${work.title}</strong>
        <span>${work.meta}</span>
      </figcaption>
    `;
    featuredGrid.append(figure);
  });

  const prefaceContent = $('preface-content');
  prefaceContent.innerHTML = '';
  preface.forEach((line) => {
    const p = document.createElement('p');
    p.textContent = line;
    prefaceContent.append(p);
  });
};

const renderCategoryPage = (config) => {
  $('page-title').textContent = config.title;
  $('page-intro').textContent = config.intro;

  const list = $('page-blocks');
  list.innerHTML = '';
  config.blocks.forEach((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    list.append(li);
  });
};

const renderAbout = () => {
  const about = exhibitionData.pages.about;
  $('page-title').textContent = about.title;

  const container = $('about-copy');
  container.innerHTML = '';

  about.paragraphs.forEach((paragraph) => {
    const p = document.createElement('p');
    p.innerHTML = paragraph.replaceAll('\n', '<br />');
    container.append(p);
  });
};

renderShell();

if (page === 'home') renderHome();
if (page === 'overview') renderCategoryPage(exhibitionData.pages.overview);
if (page === 'artist') renderCategoryPage(exhibitionData.pages.artist);
if (page === 'topic') renderCategoryPage(exhibitionData.pages.topic);
if (page === 'artwork') renderCategoryPage(exhibitionData.pages.artwork);
if (page === 'creators') renderCategoryPage(exhibitionData.pages.creators);
if (page === 'about') renderAbout();

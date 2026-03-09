import { exhibitionData } from './data/mockData.js';

const $ = (id) => document.getElementById(id);
const page = document.body.dataset.page;

const renderShell = () => {
  $('site-name').textContent = exhibitionData.site.name;
  $('site-zh-name').textContent = exhibitionData.site.zhName;

  const nav = $('site-nav');
  nav.innerHTML = '';
  exhibitionData.site.nav.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.label;
    if (location.pathname.endsWith(item.href) || (location.pathname === '/' && item.href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
    nav.append(link);
  });

  const menuToggle = $('menu-toggle');
  menuToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  $('footer').textContent = `纸、雾、花瓣、旧绢、傍晚的水面。`;
};

const renderHome = () => {
  const { hero, portals, featured, preface } = exhibitionData.home;

  $('hero-title').textContent = hero.title;
  $('hero-subtitle').textContent = hero.subtitle;
  const action = $('hero-action');
  action.textContent = hero.action.label;
  action.href = hero.action.href;

  $('portal-title').textContent = portals.title;
  const portalGrid = $('portal-grid');
  portals.items.forEach((item) => {
    const card = document.createElement('a');
    card.className = 'card portal-card';
    card.href = item.href;
    card.innerHTML = `<h3>${item.name}</h3><p>${item.note}</p>`;
    portalGrid.append(card);
  });

  $('featured-title').textContent = featured.title;
  $('featured-subtitle').textContent = featured.subtitle;
  const featuredGrid = $('featured-grid');
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
if (page === 'about') renderAbout();

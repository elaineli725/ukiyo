import { exhibitionData } from './data/mockData.js';

const $ = (id) => document.getElementById(id);
const page = document.body.dataset.page;

const createCard = (title, content, meta) => {
  const article = document.createElement('article');
  article.className = 'card';
  article.innerHTML = `
    ${meta ? `<p class="meta">${meta}</p>` : ''}
    <h3>${title}</h3>
    <p>${content}</p>
  `;
  return article;
};

const renderShell = () => {
  $('site-name').textContent = exhibitionData.site.name;

  const nav = $('site-nav');
  nav.innerHTML = '';
  exhibitionData.site.nav.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.label;
    if (location.pathname.endsWith(item.href)) {
      link.setAttribute('aria-current', 'page');
    }
    nav.append(link);
  });

  const menuToggle = $('menu-toggle');
  menuToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  $('footer').textContent = `${new Date().getFullYear()} · ${exhibitionData.site.subtitle}`;
};

const renderHome = () => {
  const { hero, ia, about, genres, artists, featuredWorks, curations } = exhibitionData;

  const iaGrid = $('ia-grid');
  ia.forEach((item) => iaGrid.append(createCard(item.title, item.summary)));

  $('hero-kicker').textContent = hero.kicker;
  $('hero-title').textContent = hero.title;
  $('hero-description').textContent = hero.description;

  const actions = $('hero-actions');
  hero.actions.forEach((action) => {
    const link = document.createElement('a');
    link.href = action.href;
    link.className = `button button-${action.type}`;
    link.textContent = action.label;
    actions.append(link);
  });

  $('about-title').textContent = about.title;
  const aboutContent = $('about-content');
  about.paragraphs.forEach((text) => {
    const p = document.createElement('p');
    p.textContent = text;
    aboutContent.append(p);
  });

  const genreGrid = $('genre-grid');
  genres.forEach((genre) => {
    const box = document.createElement('article');
    box.className = 'genre-item';
    box.innerHTML = `<span>${genre.icon}</span><h3>${genre.name}</h3><p>${genre.note}</p>`;
    genreGrid.append(box);
  });

  const artistGrid = $('artist-grid');
  artists.forEach((artist) => {
    artistGrid.append(createCard(artist.name, artist.highlight, `${artist.period} · ${artist.style}`));
  });

  const workGrid = $('work-grid');
  featuredWorks.forEach((work) => {
    workGrid.append(createCard(work.title, `${work.description}（${work.location}）`, `${work.artist} · ${work.year}`));
  });

  const curationGrid = $('curation-grid');
  curations.forEach((topic) => {
    const card = createCard(topic.title, topic.summary);
    const link = document.createElement('a');
    link.href = topic.link;
    link.className = 'text-link';
    link.textContent = '进入专题';
    card.append(link);
    curationGrid.append(card);
  });
};

const renderTemplatePage = (config, listId, items) => {
  $('template-title').textContent = config.title;
  $('template-intro').textContent = config.intro;
  if (!listId || !items) return;

  const list = $(listId);
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = typeof item === 'string' ? item : `${item.label}：${item.value}`;
    list.append(li);
  });
};

renderShell();

if (page === 'home') {
  renderHome();
}

if (page === 'overview') {
  renderTemplatePage(exhibitionData.templatePages.overview, 'overview-stats', exhibitionData.templatePages.overview.stats);
}

if (page === 'artist') {
  renderTemplatePage(exhibitionData.templatePages.artist, 'artist-sections', exhibitionData.templatePages.artist.sections);
}

if (page === 'artwork') {
  renderTemplatePage(exhibitionData.templatePages.artwork, 'artwork-fields', exhibitionData.templatePages.artwork.fields);
}

if (page === 'topic') {
  renderTemplatePage(exhibitionData.templatePages.topic, 'topic-modules', exhibitionData.templatePages.topic.modules);
}

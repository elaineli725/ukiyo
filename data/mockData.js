export const exhibitionData = {
  site: {
    name: '浮世绘图录 Ukiyo-e Atlas',
    subtitle: '数字展览 · 图像文献 · 专题阅读',
    description:
      '以图录化方式整理浮世绘作品、画师、题材与策展专题，呈现江户视觉文化在当代数字空间中的阅读体验。',
    nav: [
      { label: '首页', href: 'index.html' },
      { label: '概览页', href: 'overview.html' },
      { label: '画师页', href: 'artist.html' },
      { label: '作品详情', href: 'artwork.html' },
      { label: '专题页', href: 'topic.html' },
    ],
  },
  ia: [
    {
      title: '数字展览',
      summary: '用展陈路径呈现「时代—题材—画师—作品」关系，首页承接导览。',
    },
    {
      title: '图像文献',
      summary: '以作品卡片、版式信息和馆藏出处构成可检索的文献底座。',
    },
    {
      title: '专题阅读',
      summary: '围绕风景版画、美人画、役者绘等线索进行策展式阅读。',
    },
  ],
  hero: {
    kicker: '江户视觉文化档案',
    title: '浮世绘：从“当世风俗”到“世界图像”',
    description:
      '浮世绘诞生于江户时期都市文化之中，涵盖美人画、役者绘、名所绘等题材。它既是大众图像生产，也是日本近世审美与社会日常的切片。',
    actions: [
      { label: '进入数字展览', href: 'overview.html', type: 'primary' },
      { label: '查看专题策展', href: 'topic.html', type: 'secondary' },
    ],
  },
  about: {
    title: '浮世绘是什么',
    paragraphs: [
      '“浮世绘”最早指描绘“浮世”风俗与娱乐生活的绘画，后逐渐发展为成熟的木版画体系。',
      '其制作常由画师、雕师、摺师与版元协作完成，形成独特的分工生产模式。',
    ],
  },
  genres: [
    { name: '美人画', note: '女性形象与时尚风俗', icon: '美' },
    { name: '役者绘', note: '歌舞伎演员与舞台瞬间', icon: '役' },
    { name: '名所绘', note: '江户景观与旅行文化', icon: '景' },
    { name: '武者绘', note: '历史叙事与英雄形象', icon: '武' },
  ],
  artists: [
    {
      name: '葛饰北斋',
      period: '1760—1849',
      style: '构图革新、波浪与山岳意象',
      highlight: '《富岳三十六景》推动名所绘的世界传播。',
    },
    {
      name: '歌川广重',
      period: '1797—1858',
      style: '诗意风景、气候与季节感',
      highlight: '《东海道五十三次》塑造旅行版画经典。',
    },
    {
      name: '喜多川歌麿',
      period: '1753—1806',
      style: '半身大首绘、细腻人物心理',
      highlight: '美人画中的线条与表情刻画极具辨识度。',
    },
  ],
  featuredWorks: [
    {
      title: '神奈川冲浪里',
      artist: '葛饰北斋',
      year: '约 1831',
      medium: '多色木版画（锦绘）',
      location: '东京国立博物馆等多馆藏',
      description: '巨浪与远山的尺度对照，构成近代图像史中的标志性瞬间。',
    },
    {
      title: '大桥安宅骤雨',
      artist: '歌川广重',
      year: '1857',
      medium: '《名所江户百景》之一',
      location: '大英博物馆等馆藏',
      description: '斜线雨幕与桥面人物形成流动节奏，体现天气叙事能力。',
    },
    {
      title: '当时三美人',
      artist: '喜多川歌麿',
      year: '约 1793',
      medium: '大首绘美人画',
      location: '波士顿美术馆等馆藏',
      description: '在有限画幅中呈现人物差异，强化都市风尚的图像记忆。',
    },
  ],
  curations: [
    {
      title: '专题一：风景版画与近代旅行想象',
      summary: '从《富岳三十六景》到《东海道五十三次》，观察交通、地理与观看方式变化。',
      link: 'topic.html',
    },
    {
      title: '专题二：美人画中的身份、时尚与消费文化',
      summary: '以发饰、衣纹、姿态解析江户都市女性形象的构成。',
      link: 'topic.html',
    },
  ],
  templatePages: {
    overview: {
      title: '概览页模板',
      intro: '按时代、题材、画师和作品四个维度建立导览入口。',
      stats: [
        { label: '收录题材', value: '12' },
        { label: '核心画师', value: '28' },
        { label: '重点作品', value: '180+' },
      ],
    },
    artist: {
      title: '画师页模板 · 葛饰北斋',
      intro: '提供生平、创作阶段、代表系列与延伸阅读。',
      sections: ['生平年表', '代表题材', '系列作品', '图像细节'],
    },
    artwork: {
      title: '作品详情页模板 · 神奈川冲浪里',
      intro: '包含作品信息、图像解析、版本说明与引用文献。',
      fields: ['创作年代', '版次信息', '馆藏出处', '图像分析', '参考资料'],
    },
    topic: {
      title: '专题页模板 · 江户的雨与雪',
      intro: '用策展叙事串联跨画师作品，提供主题阅读路径。',
      modules: ['策展导言', '作品编目', '细节放大', '延伸书目'],
    },
  },
};

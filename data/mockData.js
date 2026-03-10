export const exhibitionData = {
  site: {
    name: 'Floating World',
    zhName: '江户绮梦',
    subtitle: 'Where beauty lingers, seasons drift, and the city becomes a dream.',
    nav: [
      { label: '首页', href: 'index.html' },
      { label: '往事·历史', href: 'overview.html' },
      { label: '美人·才子·英雄', href: 'artist.html' },
      { label: '神话·妖鬼', href: 'topic.html' },
      { label: '浮世·风景', href: 'artwork.html' },
      { label: '关于', href: 'about.html' },
    ],
  },
  home: {
    hero: {
      title: 'Floating World',
      subtitle: 'Where beauty lingers, seasons drift, and the city becomes a dream.',
      backgroundImage:
        'https://upload.wikimedia.org/wikipedia/commons/6/65/Tsukioka_Yoshitoshi_-_Genji_Night_-_Yugao.jpg',
      backgroundCredit: '月冈芳年《源氏夕颜卷》',
      action: { label: 'Begin Wandering', href: '#painted-world' },
    },
    portals: {
      title: 'Through the Painted World',
      items: [
        { name: '浮世绘·简介', note: '从一纸版画开始，进入江户时代流动的梦与日常。', href: 'index.html' },
        { name: '往事·历史', note: '旧城、风俗、时代波纹，与那些被图像悄悄保存的过去。', href: 'overview.html' },
        { name: '美人·才子·英雄', note: '侧影、衣纹、目光与姓名，共同构成被观看的传奇。', href: 'artist.html' },
        { name: '神话·妖鬼', note: '神灵、怨魂、狐魅与夜色，在纸上拥有比现实更长的生命。', href: 'topic.html' },
        { name: '浮世·风景', note: '桥、水、月、雪、海浪与远山，都是浮世缓慢流动的回声。', href: 'artwork.html' },
        { name: '代表画家', note: '追随北斋、广重、歌麿等名字，走进浮世绘最清晰的笔触。', href: 'creators.html' },
      ],
    },
    featured: {
      title: '片刻停留',
      subtitle: 'Fragments of the Floating World',
      works: [
        { title: '《神奈川冲浪里》', meta: '葛饰北斋｜约1831年' },
        { title: '《大桥安宅骤雨》', meta: '歌川广重｜1857年' },
        { title: '《当时三美人》', meta: '喜多川歌麿｜约1793年' },
      ],
    },
    preface: [
      '浮世绘并不只是一种古老版画。',
      '它关乎城市、四季、欲望，也关乎观看与消逝。',
      '这个小站想保留的，不只是图像本身，',
      '还有那些停驻在纸上、至今仍未散去的情绪。',
    ],
  },
  pages: {
    overview: {
      title: '往事·历史',
      intro: '旧城、风俗与时代波纹，在版画里被轻轻保留。',
      blocks: ['江户町人与城市生活', '出版与流通的图像网络', '时代转折中的视觉记忆'],
    },
    artist: {
      title: '美人·才子·英雄',
      intro: '被观看的人物，构成了浮世绘最动人的戏剧。',
      blocks: ['美人画：姿态与衣纹', '役者绘：舞台与名声', '武者绘：传奇与历史'],
    },
    topic: {
      title: '神话·妖鬼',
      intro: '夜色、传说与怨灵，在纸上留下更长的回声。',
      blocks: ['百鬼夜行图像谱系', '狐魅与异闻叙事', '歌舞伎与妖异想象'],
    },
    artwork: {
      title: '浮世·风景',
      intro: '桥、水、月、雪与远山，成为旅行与凝望的节拍。',
      blocks: ['名所绘与旅行文化', '风雨与四季的气息', '海浪、山岳与空间构图'],
    },
    creators: {
      title: '代表画家',
      intro: '从画师生平、版元合作到系列作品，建立稳定的创作者线索。',
      blocks: ['葛饰北斋：构图与运动', '歌川广重：雨雪与旅路', '喜多川歌麿：人物与风尚'],
    },
    about: {
      title: '关于',
      paragraphs: [
        '这是一个以浮世绘为主题的个人小站。',
        '我想在这里收集那些让我停下来的图像：\n美人的侧影，演员的姿态，风景中的潮声与月色，\n以及江户城市生活中短暂、轻盈、近于幻觉的片刻。',
        '浮世绘并不只是过去留下的图像。\n它更像一种仍在流动的观看方式：\n关于四季，关于欲望，关于人如何在短暂之中追求美。',
        '所以，这里并不是一座完整的资料库，\n而更像一本缓慢展开的手记。\n它记录我如何透过这些版画，进入一个既热闹又忧伤的浮世。',
      ],
    },
  },
};

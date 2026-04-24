// Schema kept identical to the ranking-site template.
// Semantic relabels (in i18n.ts):
//   h_index   → Overall Score (0-100; weighted composite of 6 criteria)
//   citations → Career Impact (×10)
//   papers    → Content Quality (×10)
//   field     → Subject focus / standout offering
//   native_province_*  → Platform type (group axis)
//   notable_work → Sub-scores (variety/cert/UX/pricing) + pros/cons + ideal learner
//
// Weighting scheme:
//   Content quality      : 22%
//   Career impact        : 22%
//   Pricing              : 15%
//   Certification value  : 15%
//   Course variety       : 13%
//   User experience      : 13%
//
// Snapshot of the global online-learning market, April 2026.
// Scores reflect a mix of platform stats, third-party reviews (Class Central,
// G2, Trustpilot), and learner-survey signal. Treat as descriptive, not endorsement.

export interface Researcher {
  id: number;
  name_en: string;
  name_zh: string;
  affiliation_en: string;
  affiliation_zh: string;
  field_en: string;
  field_zh: string;
  h_index: number;     // Overall Score
  citations: number;   // Career Impact ×10
  papers: number;      // Content Quality ×10
  notable_work_en: string;
  notable_work_zh: string;
  country: string;
  native_province_en: string;
  native_province_zh: string;
  homepage?: string;
}

export interface ProvinceStats {
  province_en: string;
  province_zh: string;
  count: number;
  researchers: Researcher[];
  avg_h_index: number;
  total_citations: number;
}

export function getProvinceStats(data: Researcher[]): ProvinceStats[] {
  const map = new Map<string, Researcher[]>();
  for (const r of data) {
    const key = r.native_province_en;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(r);
  }
  const stats: ProvinceStats[] = [];
  for (const [province_en, rs] of map) {
    stats.push({
      province_en,
      province_zh: rs[0].native_province_zh,
      count: rs.length,
      researchers: rs.sort((a, b) => b.h_index - a.h_index),
      avg_h_index: Math.round(rs.reduce((s, r) => s + r.h_index, 0) / rs.length),
      total_citations: rs.reduce((s, r) => s + r.citations, 0),
    });
  }
  return stats.sort((a, b) => b.count - a.count || b.avg_h_index - a.avg_h_index);
}

type _R = {
  n: string; z: string;
  a: string; az: string;
  f: string; fz: string;
  h: number; c: number; p: number;
  w: string; wz: string;
  g: string;
  pn: string; pz: string;
  hp?: string;
};

const _data: _R[] = [
  // === MOOC / UNIVERSITY ===
  {n:"Coursera",z:"Coursera",a:"Coursera",az:"Coursera",f:"University courses · Pro Certs · degrees",fz:"大学课程 · 专业证书 · 学位",h:88,c:95,p:95,w:"Variety 10·Cert 9·UX 8·Price 7 ($59/mo Plus). Pros: Stanford/Yale/Google/Meta cert content, accredited degrees, 7000+ courses. Cons: Plus is the only worthwhile tier, free auditing limited. Ideal: career switchers, professionals.",wz:"丰富度 10 · 证书 9 · UX 8 · 价格 7 ($59/月 Plus)。优点：斯坦福/耶鲁/谷歌/Meta 证书内容，含可认证学位，7000+ 课；缺点：Plus 是唯一值得档，免费试听受限；适合：职业转型者、专业人士。",g:"🇺🇸",pn:"MOOC / University",pz:"大学 MOOC",hp:"https://coursera.org"},
  {n:"edX",z:"edX",a:"2U",az:"2U",f:"Harvard/MIT founded · MicroMasters · degrees",fz:"哈佛/MIT 创立 · MicroMasters · 学位",h:82,c:88,p:92,w:"Variety 9·Cert 9·UX 7·Price 7. Pros: MIT/Harvard cert pedigree, MicroMasters/MicroBachelors stackable, free audit. Cons: 2U acquisition wobble, UX dated. Ideal: rigorous self-learners, MIT/Harvard fans.",wz:"丰富度 9 · 证书 9 · UX 7 · 价格 7。优点：MIT/哈佛证书血统，MicroMasters/MicroBachelors 可堆叠学分，免费旁听；缺点：被 2U 收购后有动荡，UX 陈旧；适合：严肃的自学者，MIT/哈佛粉。",g:"🇺🇸",pn:"MOOC / University",pz:"大学 MOOC"},
  {n:"FutureLearn",z:"FutureLearn",a:"OpenED",az:"OpenED",f:"UK universities · short courses · ExpertTrack",fz:"英国大学 · 短课 · ExpertTrack",h:74,c:78,p:85,w:"Variety 8·Cert 8·UX 8·Price 7. Pros: UK university content (Manchester/Edinburgh), social-learning UX, ExpertTracks for skills. Cons: smaller breadth than Coursera/edX. Ideal: UK-centric learners.",wz:"丰富度 8 · 证书 8 · UX 8 · 价格 7。优点：英国大学内容 (曼彻斯特/爱丁堡)，社交化学习 UX，ExpertTracks 技能路径；缺点：广度不及 Coursera/edX；适合：偏英联邦的学习者。",g:"🇬🇧",pn:"MOOC / University",pz:"大学 MOOC"},
  {n:"Khan Academy",z:"可汗学院",a:"Khan Academy (nonprofit)",az:"可汗学院 (非营利)",f:"K-12 · math · science · Khanmigo AI tutor",fz:"K-12 · 数学 · 科学 · Khanmigo AI 导师",h:90,c:90,p:95,w:"Variety 9·Cert N/A·UX 9·Price 10 (free). Pros: Khanmigo (GPT-powered tutor) free, world-class K-12 + early college math, fully free. Cons: no certs, less depth at advanced levels. Ideal: K-12 students, math foundations.",wz:"丰富度 9 · 证书 不适用 · UX 9 · 价格 10 (免费)。优点：Khanmigo (GPT 驱动导师) 免费，世界级 K-12+大学初阶数学，完全免费；缺点：无证书，高阶深度不足；适合：K-12 学生，打数学基础。",g:"🇺🇸",pn:"MOOC / University",pz:"大学 MOOC",hp:"https://khanacademy.org"},
  {n:"MIT OpenCourseWare",z:"MIT 开放课程",a:"MIT",az:"麻省理工学院",f:"Free MIT lecture archive · 2500+ courses",fz:"免费 MIT 课程档案 · 2500+ 课",h:84,c:90,p:100,w:"Variety 10·Cert N/A·UX 7·Price 10 (free). Pros: actual MIT content for free, exam materials included, no signup. Cons: just lecture material — no interactivity, no certs. Ideal: rigorous self-directed adults.",wz:"丰富度 10 · 证书 不适用 · UX 7 · 价格 10 (免费)。优点：真实 MIT 内容免费，含考试资料，无需注册；缺点：仅讲义，无互动，无证书；适合：自驱力强的成人学习者。",g:"🇺🇸",pn:"MOOC / University",pz:"大学 MOOC"},
  {n:"Stanford Online",z:"Stanford Online",a:"Stanford",az:"斯坦福大学",f:"Free + paid Stanford courses · graduate certs",fz:"免费+付费 Stanford 课程 · 研究生证书",h:80,c:88,p:95,w:"Variety 7·Cert 9·UX 7·Price 6. Pros: Stanford cert credibility, real grad-level options, CS/AI legendary courses (CS229/CS231n). Cons: pricey grad certs ($4-6k each), audit limited. Ideal: tech mid-careers wanting Stanford branding.",wz:"丰富度 7 · 证书 9 · UX 7 · 价格 6。优点：Stanford 证书可信度，真正研究生级别可选，CS/AI 传奇课程 (CS229/CS231n)；缺点：研究生证书贵 ($4-6 千美元/张)，旁听受限；适合：想要斯坦福背书的技术中坚。",g:"🇺🇸",pn:"MOOC / University",pz:"大学 MOOC"},

  // === CODING / TECH ===
  {n:"freeCodeCamp",z:"freeCodeCamp",a:"freeCodeCamp.org",az:"freeCodeCamp.org",f:"Free dev curriculum · 12 cert tracks",fz:"免费开发者课程 · 12 个证书路径",h:90,c:90,p:90,w:"Variety 9·Cert 7·UX 8·Price 10 (free, donation-funded). Pros: completely free, hundreds of hours of cert curriculum, real projects, jobs board. Cons: certs not weighted as heavily as paid alternatives in hiring. Ideal: career switchers into dev.",wz:"丰富度 9 · 证书 7 · UX 8 · 价格 10 (免费，靠捐赠)。优点：完全免费，数百小时证书课程，含真实项目和招聘板；缺点：证书在招聘中权重不及付费同类；适合：转行做开发的学习者。",g:"🇺🇸",pn:"Coding / Tech",pz:"编程 / 科技",hp:"https://freecodecamp.org"},
  {n:"Codecademy",z:"Codecademy",a:"Skillsoft",az:"Skillsoft",f:"Interactive coding · skill paths · career paths",fz:"交互式编程 · 技能路径 · 职业路径",h:80,c:80,p:85,w:"Variety 8·Cert 6·UX 9·Price 7 ($24/mo Pro). Pros: best interactive learn-by-doing UX, AI assistant, structured paths. Cons: less depth than freeCodeCamp, certs are weak. Ideal: complete beginners.",wz:"丰富度 8 · 证书 6 · UX 9 · 价格 7 ($24/月 Pro)。优点：动手学最佳的交互 UX，AI 助手，结构化路径；缺点：深度不及 freeCodeCamp，证书弱；适合：完全的新手。",g:"🇺🇸",pn:"Coding / Tech",pz:"编程 / 科技"},
  {n:"Udacity",z:"Udacity",a:"Accenture",az:"埃森哲",f:"Nanodegrees · capstone projects · mentorship",fz:"纳米学位 · 顶点项目 · 导师制",h:74,c:82,p:85,w:"Variety 7·Cert 8·UX 8·Price 5 ($249/mo Pro). Pros: industry-co-built nanodegrees (Google/Meta/AWS), real project mentorship. Cons: very expensive, declining mindshare since Accenture acquisition. Ideal: deep career switch with budget.",wz:"丰富度 7 · 证书 8 · UX 8 · 价格 5 ($249/月 Pro)。优点：与产业共建的纳米学位 (谷歌/Meta/AWS)，真项目导师指导；缺点：极贵，被埃森哲收购后市场份额下滑；适合：有预算的深度转型。",g:"🇺🇸",pn:"Coding / Tech",pz:"编程 / 科技"},
  {n:"Pluralsight",z:"Pluralsight",a:"Pluralsight",az:"Pluralsight",f:"Enterprise tech training · skill assessments",fz:"企业技术培训 · 技能评估",h:72,c:88,p:85,w:"Variety 9·Cert 8·UX 7·Price 6 ($29/mo Personal). Pros: enterprise-trusted, skill IQ assessments, vendor-cert prep (AWS/Azure/GCP). Cons: dated UX, expensive vs alternatives. Ideal: corporate teams.",wz:"丰富度 9 · 证书 8 · UX 7 · 价格 6 ($29/月 Personal)。优点：企业信任度高，Skill IQ 评估，云厂商证书备考 (AWS/Azure/GCP)；缺点：UX 陈旧，相比同类偏贵；适合：企业团队。",g:"🇺🇸",pn:"Coding / Tech",pz:"编程 / 科技"},
  {n:"Frontend Masters",z:"Frontend Masters",a:"Frontend Masters",az:"Frontend Masters",f:"Deep front-end · senior-level workshops",fz:"前端深度 · 资深级工作坊",h:80,c:80,p:88,w:"Variety 7·Cert 6·UX 8·Price 7 ($39/mo). Pros: best front-end depth on the internet (Kyle Simpson, Brian Holt, Lydia Hallie), workshops > tutorials. Cons: niche, no cert. Ideal: serious mid-to-senior front-end devs.",wz:"丰富度 7 · 证书 6 · UX 8 · 价格 7 ($39/月)。优点：互联网上最深的前端内容 (Kyle Simpson、Brian Holt、Lydia Hallie)，工作坊>教程；缺点：垂直，无证书；适合：认真的中-高级前端开发者。",g:"🇺🇸",pn:"Coding / Tech",pz:"编程 / 科技",hp:"https://frontendmasters.com"},
  {n:"Egghead.io",z:"Egghead.io",a:"Egghead",az:"Egghead",f:"Bite-sized senior-dev tutorials",fz:"小段资深开发者教程",h:74,c:78,p:88,w:"Variety 6·Cert 5·UX 8·Price 7 ($30/mo). Pros: extreme bite-size (3-5 min lessons), senior-dev creators, Pro git workflow tutorials. Cons: niche, JS-heavy. Ideal: working developers learning new framework fast.",wz:"丰富度 6 · 证书 5 · UX 8 · 价格 7 ($30/月)。优点：极致小段 (3-5 分钟单课)，资深开发者授课，Pro 级 Git 工作流教程；缺点：垂直，JS 偏重；适合：在职开发者快速学新框架。",g:"🇺🇸",pn:"Coding / Tech",pz:"编程 / 科技"},
  {n:"Educative.io",z:"Educative.io",a:"Educative",az:"Educative",f:"Text-based interactive · system design",fz:"文本式交互 · 系统设计",h:76,c:85,p:85,w:"Variety 8·Cert 6·UX 9·Price 7 ($14/mo). Pros: text-first (faster than video), 'Grokking' system design series is interview gold, in-browser execution. Cons: text not for everyone. Ideal: interview prep (FAANG-style).",wz:"丰富度 8 · 证书 6 · UX 9 · 价格 7 ($14/月)。优点：文本优先 (比视频快)，'Grokking' 系统设计系列是面试黄金，浏览器内执行代码；缺点：文字风格非人人爱；适合：FAANG 面试备考。",g:"🇺🇸",pn:"Coding / Tech",pz:"编程 / 科技"},
  {n:"DataCamp",z:"DataCamp",a:"DataCamp",az:"DataCamp",f:"Data science · SQL · Python · R · AI",fz:"数据科学 · SQL · Python · R · AI",h:78,c:85,p:80,w:"Variety 8·Cert 7·UX 9·Price 7 ($25/mo). Pros: best for data analysts, browser-based no install, certifications recognised in industry. Cons: depth limited vs Coursera Pro Certs. Ideal: aspiring data analysts.",wz:"丰富度 8 · 证书 7 · UX 9 · 价格 7 ($25/月)。优点：数据分析师首选，浏览器内运行无需安装，行业认可的证书；缺点：相比 Coursera 专业证书深度有限；适合：有志数据分析师。",g:"🇺🇸",pn:"Coding / Tech",pz:"编程 / 科技"},
  {n:"Brilliant",z:"Brilliant",a:"Brilliant",az:"Brilliant",f:"Math · CS · science · interactive puzzles",fz:"数学 · 计算机 · 科学 · 交互式谜题",h:84,c:80,p:90,w:"Variety 8·Cert 6·UX 10·Price 7 ($25/mo Premium). Pros: stunning interactive UX, daily 15-min lessons, builds intuition. Cons: not job-cert focused. Ideal: math-curious adults, parents teaching kids.",wz:"丰富度 8 · 证书 6 · UX 10 · 价格 7 ($25/月 Premium)。优点：精美的交互 UX，每日 15 分钟课，培养直觉；缺点：非职业证书导向；适合：对数学好奇的成人，教孩子的家长。",g:"🇺🇸",pn:"Coding / Tech",pz:"编程 / 科技"},
  {n:"Scrimba",z:"Scrimba",a:"Scrimba",az:"Scrimba",f:"Interactive video coding · React/JS focus",fz:"交互式视频编程 · React/JS 重点",h:78,c:75,p:85,w:"Variety 7·Cert 6·UX 10·Price 8 ($16/mo). Pros: pause and edit teacher's code in-place, free Frontend Career Path, friendly community. Cons: JS-heavy, smaller breadth. Ideal: aspiring front-end devs.",wz:"丰富度 7 · 证书 6 · UX 10 · 价格 8 ($16/月)。优点：可暂停并就地修改教师代码，含免费的 Frontend Career Path，社区友好；缺点：JS 偏重，广度小；适合：有志前端开发者。",g:"🇳🇴",pn:"Coding / Tech",pz:"编程 / 科技"},
  {n:"LeetCode",z:"LeetCode",a:"LeetCode",az:"LeetCode",f:"Coding-interview practice · contests",fz:"编程面试题库 · 竞赛",h:84,c:90,p:85,w:"Variety 8·Cert 7·UX 8·Price 8 ($35/mo Premium). Pros: the FAANG-interview standard, 3000+ problems, premium gives company-tagged problems + solutions. Cons: makes you good at interviews, not necessarily good at building. Ideal: FAANG interview seekers.",wz:"丰富度 8 · 证书 7 · UX 8 · 价格 8 ($35/月 Premium)。优点：FAANG 面试标准，3000+ 题，Premium 含公司标签题+题解；缺点：让你擅长面试不一定擅长建造；适合：FAANG 面试者。",g:"🇺🇸",pn:"Coding / Tech",pz:"编程 / 科技"},

  // === SKILL MARKETPLACES ===
  {n:"Udemy",z:"Udemy",a:"Udemy",az:"Udemy",f:"Marketplace · 213k courses · sales-driven",fz:"市场 · 21.3 万课程 · 折扣常见",h:75,c:78,p:75,w:"Variety 10·Cert 6·UX 7·Price 9 ($10-15 sale prices). Pros: vast library, perpetual access (one-time buy), constant sales. Cons: huge quality variance, certs not respected. Ideal: skill-tactical learners.",wz:"丰富度 10 · 证书 6 · UX 7 · 价格 9 (常 $10-15 大促)。优点：海量课程，一次购买永久使用，常年促销；缺点：质量参差，证书认可度低；适合：战术性学技能的人。",g:"🇺🇸",pn:"Skill Marketplace",pz:"技能市场"},
  {n:"Skillshare",z:"Skillshare",a:"Skillshare",az:"Skillshare",f:"Creative classes · projects · community",fz:"创意课程 · 项目 · 社区",h:72,c:70,p:78,w:"Variety 8·Cert 5·UX 8·Price 8 ($14/mo). Pros: huge creative library (illustration, photography, writing), project-based. Cons: no certs, content quality varies. Ideal: creative hobbyists.",wz:"丰富度 8 · 证书 5 · UX 8 · 价格 8 ($14/月)。优点：海量创意课 (插画、摄影、写作)，项目驱动；缺点：无证书，质量参差；适合：创意类兴趣学习者。",g:"🇺🇸",pn:"Skill Marketplace",pz:"技能市场"},
  {n:"LinkedIn Learning",z:"领英学习",a:"LinkedIn / Microsoft",az:"领英 / 微软",f:"Business + tech + creative · 21k courses",fz:"商业+科技+创意 · 2.1 万课程",h:78,c:88,p:80,w:"Variety 9·Cert 7·UX 8·Price 7 ($40/mo or LinkedIn Premium). Pros: cert auto-publishes to LinkedIn profile (highly visible to recruiters), broad business + tech mix. Cons: Lynda.com legacy = some dated content. Ideal: working professionals visible on LinkedIn.",wz:"丰富度 9 · 证书 7 · UX 8 · 价格 7 ($40/月 或 LinkedIn Premium)。优点：证书自动发布到 LinkedIn 主页 (招聘官可见)，商业+科技广覆盖；缺点：Lynda.com 遗留导致部分内容陈旧；适合：在 LinkedIn 上活跃的在职专业人士。",g:"🇺🇸",pn:"Skill Marketplace",pz:"技能市场"},
  {n:"MasterClass",z:"MasterClass",a:"MasterClass",az:"MasterClass",f:"Celebrity-taught · cinematic production",fz:"名人授课 · 电影级制作",h:68,c:60,p:90,w:"Variety 7·Cert N/A·UX 10·Price 6 ($15/mo annual). Pros: cinematic production, A-list celebrities (Gordon Ramsay, Aaron Sorkin), inspirational. Cons: more entertainment than skill-building, no certs. Ideal: aspirational casual learners.",wz:"丰富度 7 · 证书 不适用 · UX 10 · 价格 6 ($15/月年付)。优点：电影级制作，A 级名人 (戈登·拉姆齐、艾伦·索金)，激励性强；缺点：娱乐多于学技能，无证书；适合：渴望灵感的轻度学习者。",g:"🇺🇸",pn:"Skill Marketplace",pz:"技能市场"},
  {n:"Domestika",z:"Domestika",a:"Domestika",az:"Domestika",f:"Creative pro courses · Spanish-roots",fz:"创意专业课程 · 西班牙裔",h:74,c:65,p:90,w:"Variety 7·Cert 5·UX 9·Price 8 (~$10/course on sale). Pros: gorgeous production by working creatives, Spanish + Portuguese strong. Cons: no certs, course quality varies. Ideal: visual creatives.",wz:"丰富度 7 · 证书 5 · UX 9 · 价格 8 (大促 ~$10/课)。优点：在职创意人精美制作，西班牙语+葡萄牙语内容强；缺点：无证书，质量参差；适合：视觉类创意工作者。",g:"🇪🇸",pn:"Skill Marketplace",pz:"技能市场"},
  {n:"O'Reilly Learning",z:"O'Reilly Learning",a:"O'Reilly",az:"奥莱利",f:"Tech books + videos · live online events",fz:"科技图书+视频 · 在线直播会议",h:78,c:85,p:90,w:"Variety 9·Cert 7·UX 7·Price 5 ($49/mo). Pros: O'Reilly book library all-you-can-read, conferences online, Safari heritage. Cons: pricey for individuals, dated UX. Ideal: working software/data engineers.",wz:"丰富度 9 · 证书 7 · UX 7 · 价格 5 ($49/月)。优点：奥莱利图书库随便读，在线技术大会，Safari 血统；缺点：个人偏贵，UX 陈旧；适合：在职软件/数据工程师。",g:"🇺🇸",pn:"Skill Marketplace",pz:"技能市场"},

  // === LANGUAGE ===
  {n:"Duolingo",z:"多邻国",a:"Duolingo",az:"Duolingo",f:"Gamified language · 40+ languages · streaks",fz:"游戏化语言 · 40+ 语言 · 打卡",h:82,c:75,p:85,w:"Variety 9·Cert 6·UX 10·Price 9 (free + $7/mo Plus). Pros: addictive UX, free tier strong, Duolingo English Test accepted by universities. Cons: doesn't get you to fluency alone, owl pestering memed to death. Ideal: casual language starters, app-streak addicts.",wz:"丰富度 9 · 证书 6 · UX 10 · 价格 9 (免费 + $7/月 Plus)。优点：UX 上瘾，免费版强，Duolingo 英语测试被大学认可；缺点：单靠它无法流利，猫头鹰催学已成梗；适合：休闲语言入门、打卡党。",g:"🇺🇸",pn:"Language",pz:"语言"},
  {n:"Babbel",z:"Babbel",a:"Babbel",az:"Babbel",f:"Conversation-first language · 14 languages",fz:"对话优先语言 · 14 语种",h:74,c:70,p:85,w:"Variety 7·Cert 6·UX 9·Price 7 ($14/mo). Pros: dialogue-focused, real-life phrases, German-rigour pedagogy. Cons: smaller language list than Duolingo. Ideal: serious adult language learners.",wz:"丰富度 7 · 证书 6 · UX 9 · 价格 7 ($14/月)。优点：对话导向，实用短语，德式严谨教学法；缺点：语种比多邻国少；适合：严肃的成人语言学习者。",g:"🇩🇪",pn:"Language",pz:"语言"},
  {n:"Pimsleur",z:"Pimsleur",a:"Simon & Schuster",az:"西蒙与舒斯特",f:"Audio-only spaced-repetition · 51 languages",fz:"纯音频 · 间隔重复 · 51 语种",h:72,c:75,p:90,w:"Variety 9·Cert 5·UX 7·Price 6 ($21/mo). Pros: audio-first means learn while driving/walking, scientifically grounded. Cons: no visual learning, dated app. Ideal: commuters, auditory learners.",wz:"丰富度 9 · 证书 5 · UX 7 · 价格 6 ($21/月)。优点：音频优先 = 开车/走路也能学，方法科学；缺点：无视觉，App 陈旧；适合：通勤族、听觉型学习者。",g:"🇺🇸",pn:"Language",pz:"语言"},
  {n:"Busuu",z:"Busuu",a:"Chegg",az:"Chegg",f:"Language with native-speaker corrections",fz:"含母语者纠错的语言学习",h:70,c:70,p:80,w:"Variety 7·Cert 7·UX 8·Price 7 ($14/mo). Pros: McGraw-Hill cert content, native-speaker peer corrections. Cons: less viral than Duolingo. Ideal: structured-curriculum learners.",wz:"丰富度 7 · 证书 7 · UX 8 · 价格 7 ($14/月)。优点：含麦格劳-希尔证书内容，母语者同伴纠错；缺点：不及多邻国病毒式传播；适合：偏好结构化课程的学习者。",g:"🇪🇸",pn:"Language",pz:"语言"},

  // === CREATIVE ===
  {n:"CreativeBug",z:"CreativeBug",a:"Sandstone Diversified",az:"Sandstone Diversified",f:"Crafts · sewing · fiber arts",fz:"手工艺 · 缝纫 · 纤维艺术",h:64,c:55,p:80,w:"Variety 6·Cert 4·UX 8·Price 8 ($8/mo). Pros: niche-defining for crafts, calm UX, library card grants free access in many libraries. Cons: very niche. Ideal: hobbyist makers, library users.",wz:"丰富度 6 · 证书 4 · UX 8 · 价格 8 ($8/月)。优点：手工艺垂直定义级，UX 安静，许多图书馆借书证可免费访问；缺点：极垂直；适合：手工艺爱好者、图书馆用户。",g:"🇺🇸",pn:"Creative",pz:"创意"},
  {n:"Yellowbrick",z:"Yellowbrick",a:"Yellowbrick",az:"Yellowbrick",f:"Career-discovery + uni-credit creative paths",fz:"职业探索 + 大学学分创意路径",h:62,c:65,p:75,w:"Variety 6·Cert 7·UX 7·Price 6 ($299/course). Pros: NYU/UCLA-co-built creative-career certs, college-credit option. Cons: pricey for what it is. Ideal: high schoolers exploring creative careers.",wz:"丰富度 6 · 证书 7 · UX 7 · 价格 6 ($299/课)。优点：与 NYU/UCLA 共建的创意职业证书，可换大学学分；缺点：相对内容偏贵；适合：探索创意职业的高中生。",g:"🇺🇸",pn:"Creative",pz:"创意"},

  // === KIDS / K-12 ===
  {n:"Outschool",z:"Outschool",a:"Outschool",az:"Outschool",f:"Live small-group classes for K-12",fz:"K-12 在线小班直播课",h:78,c:75,p:85,w:"Variety 10·Cert 6·UX 8·Price 6 ($10-50 per class). Pros: live teachers + small groups, niche topics (Minecraft physics, K-pop dance), parental controls. Cons: variable teacher quality. Ideal: K-12 enrichment, homeschoolers.",wz:"丰富度 10 · 证书 6 · UX 8 · 价格 6 ($10-50/课)。优点：真人小班直播，垂直话题 (Minecraft 物理、K-pop 舞蹈)，家长控制；缺点：教师质量参差；适合：K-12 兴趣拓展、在家上学。",g:"🇺🇸",pn:"Kids / K-12",pz:"少儿 K-12"},
  {n:"Khan Academy Kids",z:"可汗学院儿童版",a:"Khan Academy",az:"可汗学院",f:"Free K-2 reading + math · friendly mascots",fz:"免费 K-2 阅读+数学 · 友好吉祥物",h:82,c:75,p:90,w:"Variety 8·Cert N/A·UX 10·Price 10 (free). Pros: completely free, ad-free, well-designed for tiny humans. Cons: K-2 only. Ideal: parents of pre-K to 2nd grade.",wz:"丰富度 8 · 证书 不适用 · UX 10 · 价格 10 (免费)。优点：完全免费，无广告，专为低龄儿童设计；缺点：仅 K-2；适合：学前到二年级家长。",g:"🇺🇸",pn:"Kids / K-12",pz:"少儿 K-12"},

  // === PROFESSIONAL CERTIFICATION ===
  {n:"AWS Skill Builder",z:"AWS Skill Builder",a:"AWS",az:"亚马逊云",f:"AWS cert prep · cloud labs",fz:"AWS 证书备考 · 云实验",h:80,c:95,p:85,w:"Variety 8·Cert 10·UX 8·Price 8 (free + $29/mo Individual). Pros: AWS certs are top-3 most-valuable in tech ($100k+ salaries), labs included. Cons: AWS-only. Ideal: cloud engineers.",wz:"丰富度 8 · 证书 10 · UX 8 · 价格 8 (免费 + $29/月 Individual)。优点：AWS 证书是科技界最值钱前 3 ($10 万+薪资)，含云端实验；缺点：仅 AWS；适合：云工程师。",g:"🇺🇸",pn:"Pro Certification",pz:"专业认证"},
  {n:"Microsoft Learn",z:"Microsoft Learn",a:"Microsoft",az:"微软",f:"Free Microsoft tech docs + cert prep",fz:"免费微软文档+证书备考",h:80,c:90,p:90,w:"Variety 9·Cert 9·UX 8·Price 10 (free, certs paid). Pros: completely free content (Azure/M365/Power Platform/AI), labs included, certs respected. Cons: only Microsoft tech. Ideal: enterprise IT pros.",wz:"丰富度 9 · 证书 9 · UX 8 · 价格 10 (内容免费，考证收费)。优点：内容完全免费 (Azure/M365/Power Platform/AI)，含实验，证书受认可；缺点：仅微软技术栈；适合：企业 IT 专业人士。",g:"🇺🇸",pn:"Pro Certification",pz:"专业认证"},
  {n:"Google Cloud Skills Boost",z:"Google Cloud Skills Boost",a:"Google Cloud",az:"谷歌云",f:"GCP cert prep · Qwiklabs hands-on",fz:"GCP 证书备考 · Qwiklabs 实操",h:76,c:90,p:85,w:"Variety 7·Cert 9·UX 8·Price 7 ($29/mo or $299/yr). Pros: GCP certs respected, hands-on Qwiklabs, free credits often. Cons: GCP-only, smaller ecosystem than AWS. Ideal: GCP-focused engineers.",wz:"丰富度 7 · 证书 9 · UX 8 · 价格 7 ($29/月 或 $299/年)。优点：GCP 证书受认可，Qwiklabs 实操，常有免费 credits；缺点：仅 GCP，生态小于 AWS；适合：GCP 方向的工程师。",g:"🇺🇸",pn:"Pro Certification",pz:"专业认证"},
  {n:"Cisco Networking Academy",z:"思科网络学院",a:"Cisco",az:"思科",f:"Free networking · CCNA prep · cybersecurity",fz:"免费网络 · CCNA 备考 · 网络安全",h:74,c:88,p:88,w:"Variety 7·Cert 9·UX 7·Price 10 (mostly free). Pros: industry-defining CCNA cert, free curriculum via partner schools. Cons: heavy old-school networking flavor. Ideal: aspiring network engineers.",wz:"丰富度 7 · 证书 9 · UX 7 · 价格 10 (基本免费)。优点：行业定义级的 CCNA 证书，通过合作院校免费学；缺点：传统网络味重；适合：有志网络工程师。",g:"🇺🇸",pn:"Pro Certification",pz:"专业认证"},

  // === CHINESE PLATFORMS ===
  {n:"GeekTime (极客时间)",z:"极客时间",a:"InfoQ China",az:"InfoQ 中国",f:"Chinese tech professional courses",fz:"中文技术专业课程",h:82,c:88,p:90,w:"Variety 8·Cert 7·UX 9·Price 7 (~¥199/course). Pros: best Chinese tech-pro platform, ex-FAANG/Alibaba experts as authors, K12-quality production. Cons: Chinese only. Ideal: Chinese SWEs and product folks.",wz:"丰富度 8 · 证书 7 · UX 9 · 价格 7 (~¥199/课)。优点：中文技术专业平台第一，前 FAANG/阿里专家作者，K12 级制作；缺点：仅中文；适合：中国软件工程师与产品人。",g:"🇨🇳",pn:"Chinese Platforms",pz:"中文平台",hp:"https://time.geekbang.org"},
  {n:"DeDao (得到)",z:"得到",a:"Luogic Talkshow",az:"罗辑思维",f:"Curated knowledge audio · book summaries",fz:"精选知识音频 · 听书",h:76,c:80,p:85,w:"Variety 9·Cert 5·UX 9·Price 8 (~¥199/course). Pros: high-quality audio summaries, top-tier teachers (经济学/历史/管理), commute-friendly. Cons: light depth, knowledge-snack format. Ideal: Chinese white-collar commuters.",wz:"丰富度 9 · 证书 5 · UX 9 · 价格 8 (~¥199/课)。优点：高质量音频总结，顶尖教师 (经济学/历史/管理)，通勤友好；缺点：深度偏轻，知识零食式；适合：中国白领通勤族。",g:"🇨🇳",pn:"Chinese Platforms",pz:"中文平台"},
  {n:"NetEase Cloud Classroom (网易云课堂)",z:"网易云课堂",a:"NetEase",az:"网易",f:"Marketplace · Chinese skill courses",fz:"市场 · 中文技能课程",h:72,c:75,p:75,w:"Variety 9·Cert 6·UX 7·Price 8 (~¥99-499/course). Pros: huge breadth in Chinese, frequent sales, micro-degree paths. Cons: quality variance, mobile UX dated. Ideal: Chinese skill-tactical learners.",wz:"丰富度 9 · 证书 6 · UX 7 · 价格 8 (~¥99-499/课)。优点：中文广度大，常促销，微学位路径；缺点：质量参差，移动端 UX 陈旧；适合：中国战术性技能学习者。",g:"🇨🇳",pn:"Chinese Platforms",pz:"中文平台"},
  {n:"Imooc (慕课网)",z:"慕课网",a:"Imooc",az:"慕课网",f:"Programmer-focused Chinese MOOC",fz:"程序员中文 MOOC",h:72,c:80,p:80,w:"Variety 8·Cert 6·UX 8·Price 8 (~¥299-999/course). Pros: practitioner-built front-end/back-end paths, Chinese tech-native, affordable. Cons: declining mindshare vs GeekTime. Ideal: Chinese developer beginners.",wz:"丰富度 8 · 证书 6 · UX 8 · 价格 8 (~¥299-999/课)。优点：从业者搭建的前后端路径，中文技术原生，价格亲民；缺点：相比极客时间份额下滑；适合：中国开发者新手。",g:"🇨🇳",pn:"Chinese Platforms",pz:"中文平台"},
  {n:"Xueersi Online (学而思网校)",z:"学而思网校",a:"Tomorrow Advancing Life",az:"好未来",f:"Chinese K-12 tutoring (post-double-reduction pivot)",fz:"中国 K-12 课外辅导（双减后转型）",h:68,c:70,p:75,w:"Variety 8·Cert 7·UX 8·Price 7. Pros: top-tier Chinese K-12 brand recovery post-2021 'Double Reduction', strong adaptive system. Cons: regulatory uncertainty in China. Ideal: Chinese K-12 families navigating exam system.",wz:"丰富度 8 · 证书 7 · UX 8 · 价格 7。优点：双减后顶级 K-12 品牌复苏，自适应系统强；缺点：监管不确定性；适合：应对中国考试体系的 K-12 家庭。",g:"🇨🇳",pn:"Chinese Platforms",pz:"中文平台"},
];

export const researchers: Researcher[] = _data.map((d, i) => ({
  id: i + 1,
  name_en: d.n, name_zh: d.z,
  affiliation_en: d.a, affiliation_zh: d.az,
  field_en: d.f, field_zh: d.fz,
  h_index: d.h, citations: d.c, papers: d.p,
  notable_work_en: d.w, notable_work_zh: d.wz,
  country: d.g,
  native_province_en: d.pn, native_province_zh: d.pz,
  homepage: d.hp,
}));

export type SortKey = "h_index" | "citations" | "papers";

export function sortResearchers(data: Researcher[], key: SortKey): Researcher[] {
  return [...data].sort((a, b) => (b[key] as number) - (a[key] as number));
}

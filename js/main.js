/* ============================================================
   CoRevo - Main JavaScript
   ============================================================ */

// ----------------------------------------
// Header scroll effect
// ----------------------------------------
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }, { passive: true });
}

// ----------------------------------------
// Mobile menu
// ----------------------------------------
const menuBtn = document.querySelector('.menu-btn');
const navMobile = document.querySelector('.nav-mobile');
if (menuBtn && navMobile) {
  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.classList.toggle('open');
    navMobile.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  // Close on link click
  navMobile.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ----------------------------------------
// Active nav link
// ----------------------------------------
(function() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ----------------------------------------
// Scroll reveal
// ----------------------------------------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal, .reveal--left, .reveal--right').forEach(el => {
  revealObserver.observe(el);
});

// ----------------------------------------
// Counter animation
// ----------------------------------------
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ----------------------------------------
// Typing animation
// ----------------------------------------
function typeEffect(el) {
  if (!el) return;
  if (el._typingTimer) {
    clearTimeout(el._typingTimer);
  }
  const words = JSON.parse(el.dataset.words || '[]');
  if (!words.length) return;

  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pausing = false;

  function tick() {
    const current = words[wordIdx];
    if (pausing) {
      pausing = false;
      el._typingTimer = setTimeout(tick, deleting ? 80 : 1800);
      return;
    }

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        pausing = true;
        deleting = true;
        el._typingTimer = setTimeout(tick, 80);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        pausing = true;
      }
    }
    el._typingTimer = setTimeout(tick, deleting ? 60 : 110);
  }
  tick();
}

const typingEl = document.querySelector('[data-words]');
typeEffect(typingEl);

// ----------------------------------------
// Index page i18n (JP / EN / ZH)
// ----------------------------------------
(function() {
  const langButtons = document.querySelectorAll('.lang-switch__btn');
  if (!langButtons.length) return;
  if (document.body.dataset.page !== 'index') return;

  const LANG_STORAGE_KEY = 'corevo_lang';
  const SUPPORTED_LANGS = ['ja', 'en', 'zh'];

  const I18N = {
    ja: {
      htmlLang: 'ja',
      metaTitle: 'CoRevo Inc. - Deploy Elite Engineers',
      metaDescription: 'CoRevoは、最高水準のエンジニアをお客様のプロジェクトに展開するSES・ITソリューション企業です。',
      navTop: 'TOP',
      navServices: 'SERVICES',
      navRecruit: 'RECRUIT',
      navAbout: 'ABOUT',
      navContact: 'CONTACT',
      contactCta: 'お問い合わせ',
      heroBadge: 'SES / ITソリューション',
      heroTitleHtml: 'DEPLOY<br><span class="hero__title-line2">ELITE ENGINEERS</span>',
      heroWords: ['エンジニアをあなたの現場へ', '最適なチームを構築します', '技術力で未来を切り拓く', '一緒に挑戦しませんか'],
      heroDesc: 'CoRevoは、高度なエンジニアリング能力を持つ技術者を厳選し、お客様のプロジェクトに最適なチームとして展開するSES・ITソリューション企業です。技術の最前線で、あなたのビジネスを加速させます。',
      heroBtnServices: 'サービスを見る',
      heroBtnRecruit: '採用情報',
      stat1Label: '初回返信（営業日）',
      stat2Label: '初期提案まで（最短）',
      stat3Label: '相談・見積',
      stat4Number: '代表直結',
      stat4Label: '少数精鋭で対応',
      techLabel: '対応技術スタック',
      servicesLabel: 'SERVICES',
      servicesTitleHtml: 'エンジニアの力で、<br><span>課題を解決する</span>',
      servicesDesc: 'SESから受託開発、ITコンサルティングまで。お客様のフェーズと規模に合わせた最適なソリューションを提供します。',
      service1Title: 'SES / エンジニア派遣',
      service1Desc: '即戦力エンジニアをスピーディに提供。バックエンド・フロントエンド・インフラ・データエンジニアなど、幅広い技術領域に対応します。',
      service1Tags: ['常駐型', 'リモート可', '短期〜長期'],
      service2Title: '受託開発',
      service2Desc: '要件定義から設計・開発・運用まで一気通貫で対応。Webアプリ・スマホアプリ・業務システムをワンストップで構築します。',
      service2Tags: ['Web', 'スマホ', '業務系'],
      service3Title: 'クラウド / インフラ',
      service3Desc: 'AWS・Azure・GCPを活用したクラウドアーキテクチャ設計と運用自動化。コスト最適化・セキュリティ強化をトータルサポートします。',
      service3Tags: ['AWS', 'Azure', 'GCP'],
      allServicesBtn: 'すべてのサービスを見る →',
      aboutLabel: 'ABOUT CoRevo',
      aboutTitleHtml: '技術に誠実に、<br><span>人に真剣に</span>',
      aboutDesc: '「良いエンジニアと良い仕事をつなぐ」というシンプルな信念のもと設立されたCoRevo。エンジニアのキャリアを真剣に考え、お客様のビジネスに本気で向き合います。',
      value1Label: 'PRECISION MATCHING',
      value1Desc: 'スキル・経験・志向性を三次元で分析し、最適なアサインを実現',
      value2Label: 'ENGINEER-FIRST',
      value2Desc: 'エンジニアの成長・キャリアを最優先に考えた案件選定と支援',
      value3Label: 'LONG-TERM PARTNERSHIP',
      value3Desc: '単発の案件提供ではなく、長期的なビジネスパートナーとして伴走',
      aboutBtn: '会社概要を見る',
      processLabel: 'HOW IT WORKS',
      processTitleHtml: '最短<span>2週間</span>でアサイン完了',
      processDesc: 'ご要望ヒアリングからエンジニアのアサインまで、スピーディかつ丁寧に進めます。',
      step1Title: '01 ヒアリング',
      step1Desc: '要件・スケジュール・チーム構成などをヒアリング',
      step2Title: '02 マッチング',
      step2Desc: 'データベースから最適なエンジニアを選定・提案',
      step3Title: '03 面談・確認',
      step3Desc: 'エンジニアとお客様の面談を設定・調整をサポート',
      step4Title: '04 アサイン',
      step4Desc: '契約締結後、スムーズなオンボーディングを実施',
      recruitBadge: '// FOR ENGINEERS',
      recruitTitleHtml: 'あなたの技術を、<br>最高の舞台で活かしてください。',
      recruitDesc: 'CoRevoは成長意欲の高いエンジニアを積極採用中です。スキルアップ支援・リモート対応・充実した福利厚生で、エンジニアとしてのキャリアを全力でサポートします。',
      recruitBtn: '採用情報を見る',
      consultBtn: 'まず相談する',
      ctaLabel: 'GET STARTED',
      ctaTitleHtml: 'エンジニア調達の悩みを、<br>今すぐ解決しませんか？',
      ctaDesc: 'まずはお気軽にご相談ください。経験豊富なコンサルタントが、貴社に最適なソリューションをご提案します。',
      ctaPrimary: '無料でお問い合わせ',
      ctaSecondary: 'サービス詳細',
      footerTaglineHtml: 'CoRevo = Cooperation × Revolution<br>「協力（Cooperation）」の力で「革新（Revolution）」を生み出し、新しい価値と未来を創造する。',
      footerCompanyHeading: 'COMPANY',
      footerServicesHeading: 'SERVICES',
      footerContactHeading: 'CONTACT',
      footerCompanyLinks: ['会社概要', 'サービス', '採用情報', 'お問い合わせ'],
      footerServicesLinks: ['SES / 派遣', '受託開発', 'クラウド', 'コンサルティング'],
      footerEngineered: 'Engineered with precision.'
    },
    en: {
      htmlLang: 'en',
      metaTitle: 'CoRevo Inc. - Deploy Elite Engineers',
      metaDescription: 'CoRevo is an SES and IT solutions company that deploys high-caliber engineers to your projects.',
      navTop: 'TOP',
      navServices: 'SERVICES',
      navRecruit: 'RECRUIT',
      navAbout: 'ABOUT',
      navContact: 'CONTACT',
      contactCta: 'CONTACT',
      heroBadge: 'SES / IT SOLUTIONS',
      heroTitleHtml: 'DEPLOY<br><span class="hero__title-line2">ELITE ENGINEERS</span>',
      heroWords: ['Engineers to your mission-critical site', 'Build your optimal team', 'Open the future with engineering', 'Let us take on the challenge together'],
      heroDesc: 'CoRevo carefully selects highly skilled engineers and deploys them as the best-fit team for your projects. We accelerate your business with practical SES and IT solutions.',
      heroBtnServices: 'View Services',
      heroBtnRecruit: 'Careers',
      stat1Label: 'First response (business day)',
      stat2Label: 'Initial proposal (as fast as)',
      stat3Label: 'Consultation / Estimate',
      stat4Number: 'Direct CEO',
      stat4Label: 'Small agile team',
      techLabel: 'Supported Tech Stack',
      servicesLabel: 'SERVICES',
      servicesTitleHtml: 'Solve your challenges with<br><span>engineering power</span>',
      servicesDesc: 'From SES to contract development and IT consulting, we provide optimal solutions aligned to your phase and scale.',
      service1Title: 'SES / Engineer Dispatch',
      service1Desc: 'We quickly provide job-ready engineers across backend, frontend, infrastructure, and data engineering.',
      service1Tags: ['On-site', 'Remote Ready', 'Short to Long Term'],
      service2Title: 'Contract Development',
      service2Desc: 'From requirements to design, development, and operations. We build web apps, mobile apps, and business systems end-to-end.',
      service2Tags: ['Web', 'Mobile', 'Business Apps'],
      service3Title: 'Cloud / Infrastructure',
      service3Desc: 'Architecture design and operational automation on AWS, Azure, and GCP with total support for cost and security optimization.',
      service3Tags: ['AWS', 'Azure', 'GCP'],
      allServicesBtn: 'View All Services →',
      aboutLabel: 'ABOUT CoRevo',
      aboutTitleHtml: 'Honest to technology,<br><span>serious about people</span>',
      aboutDesc: 'CoRevo was built on a simple belief: connect great engineers with great work. We take engineer careers seriously and commit to client outcomes.',
      value1Label: 'PRECISION MATCHING',
      value1Desc: 'We analyze skill, experience, and orientation in 3D to deliver optimal assignment.',
      value2Label: 'ENGINEER-FIRST',
      value2Desc: 'Opportunity selection and support designed around engineer growth and career.',
      value3Label: 'LONG-TERM PARTNERSHIP',
      value3Desc: 'We work as a long-term business partner, not as a one-off staffing provider.',
      aboutBtn: 'View Company Profile',
      processLabel: 'HOW IT WORKS',
      processTitleHtml: 'Assignment completed in as fast as <span>2 weeks</span>',
      processDesc: 'From hearing your requirements to assigning engineers, we move quickly and carefully.',
      step1Title: '01 DISCOVERY',
      step1Desc: 'We gather requirements, schedule, and team expectations.',
      step2Title: '02 MATCHING',
      step2Desc: 'We select and propose the best engineers from our database.',
      step3Title: '03 INTERVIEW',
      step3Desc: 'We coordinate interviews and confirmations with full support.',
      step4Title: '04 ONBOARDING',
      step4Desc: 'After agreement, we ensure smooth onboarding.',
      recruitBadge: '// FOR ENGINEERS',
      recruitTitleHtml: 'Bring your skills to<br>the best stage.',
      recruitDesc: 'CoRevo is actively hiring growth-minded engineers with strong support for upskilling, remote work, and benefits.',
      recruitBtn: 'View Careers',
      consultBtn: 'Talk to Us',
      ctaLabel: 'GET STARTED',
      ctaTitleHtml: 'Need engineers?<br>Let’s solve it now.',
      ctaDesc: 'Feel free to contact us. Experienced consultants will propose the best-fit solution for your business.',
      ctaPrimary: 'Contact for Free',
      ctaSecondary: 'Service Details',
      footerTaglineHtml: 'CoRevo = Cooperation × Revolution<br>Creating new value and future through the power of cooperation.',
      footerCompanyHeading: 'COMPANY',
      footerServicesHeading: 'SERVICES',
      footerContactHeading: 'CONTACT',
      footerCompanyLinks: ['Company', 'Services', 'Careers', 'Contact'],
      footerServicesLinks: ['SES / Dispatch', 'Contract Development', 'Cloud', 'Consulting'],
      footerEngineered: 'Engineered with precision.'
    },
    zh: {
      htmlLang: 'zh-CN',
      metaTitle: 'CoRevo Inc. - 精英工程师部署',
      metaDescription: 'CoRevo 是一家 SES 与 IT 解决方案公司，为你的项目快速配置高水平工程师团队。',
      navTop: '首页',
      navServices: '服务',
      navRecruit: '招聘',
      navAbout: '关于',
      navContact: '联系',
      contactCta: '联系我们',
      heroBadge: 'SES / IT 解决方案',
      heroTitleHtml: '部署<br><span class="hero__title-line2">精英工程师</span>',
      heroWords: ['把工程师配置到你的业务现场', '快速构建最合适的团队', '用技术力打开未来', '一起发起新的挑战'],
      heroDesc: 'CoRevo 精选高水平工程师，并以最匹配的团队形态投入你的项目。通过实战型 SES 与 IT 方案，加速你的业务增长。',
      heroBtnServices: '查看服务',
      heroBtnRecruit: '招聘信息',
      stat1Label: '首次回复（工作日）',
      stat2Label: '初版提案（最快）',
      stat3Label: '咨询 / 估算',
      stat4Number: '代表直连',
      stat4Label: '小而精团队支持',
      techLabel: '支持技术栈',
      servicesLabel: '服务',
      servicesTitleHtml: '用工程能力，<br><span>解决业务课题</span>',
      servicesDesc: '从 SES 到委托开发与 IT 咨询，我们会根据你的阶段和规模提供最优方案。',
      service1Title: 'SES / 工程师派遣',
      service1Desc: '快速提供可立即上手的工程师，覆盖后端、前端、基础设施与数据工程等方向。',
      service1Tags: ['驻场', '可远程', '短期到长期'],
      service2Title: '委托开发',
      service2Desc: '从需求定义到设计、开发、运维一体化交付，覆盖 Web、移动端与业务系统。',
      service2Tags: ['Web', '移动端', '业务系统'],
      service3Title: '云与基础设施',
      service3Desc: '基于 AWS / Azure / GCP 提供架构设计与运维自动化，并兼顾成本与安全优化。',
      service3Tags: ['AWS', 'Azure', 'GCP'],
      allServicesBtn: '查看全部服务 →',
      aboutLabel: '关于 CoRevo',
      aboutTitleHtml: '对技术负责，<br><span>对人认真</span>',
      aboutDesc: 'CoRevo 基于一个简单信念而成立：让优秀工程师连接到优秀工作。我们重视工程师成长，也对客户结果负责。',
      value1Label: '精准匹配',
      value1Desc: '从技能、经验、志向三维分析，实现最佳人岗匹配。',
      value2Label: '工程师优先',
      value2Desc: '以工程师成长与职业发展为优先进行项目选择与支持。',
      value3Label: '长期合作',
      value3Desc: '不做一次性派单，而是作为长期业务伙伴持续陪跑。',
      aboutBtn: '查看公司简介',
      processLabel: '流程',
      processTitleHtml: '最快<span>2周</span>完成派遣',
      processDesc: '从需求沟通到工程师入场，我们以快速且稳妥的方式推进。',
      step1Title: '01 需求沟通',
      step1Desc: '确认需求、时间计划和团队结构。',
      step2Title: '02 人选匹配',
      step2Desc: '从数据库中筛选并推荐最合适的工程师。',
      step3Title: '03 面谈确认',
      step3Desc: '协助安排客户与工程师面谈并完成确认。',
      step4Title: '04 正式入场',
      step4Desc: '签约后提供顺畅的 Onboarding 支持。',
      recruitBadge: '// FOR ENGINEERS',
      recruitTitleHtml: '把你的技术，<br>用在最好的舞台上。',
      recruitDesc: 'CoRevo 正在积极招聘有成长意愿的工程师，提供学习支持、远程协作与完善福利。',
      recruitBtn: '查看招聘',
      consultBtn: '先咨询一下',
      ctaLabel: '立即开始',
      ctaTitleHtml: '工程师配置难题，<br>现在就解决。',
      ctaDesc: '欢迎随时联系。经验丰富的顾问将为你提供最匹配的解决方案。',
      ctaPrimary: '免费咨询',
      ctaSecondary: '服务详情',
      footerTaglineHtml: 'CoRevo = Cooperation × Revolution<br>以“协作（Cooperation）”之力创造“革新（Revolution）”，持续创造新价值与新未来。',
      footerCompanyHeading: '公司',
      footerServicesHeading: '服务',
      footerContactHeading: '联系',
      footerCompanyLinks: ['公司简介', '服务', '招聘信息', '联系我们'],
      footerServicesLinks: ['SES / 派遣', '委托开发', '云服务', '咨询'],
      footerEngineered: '以精密工程打造。'
    }
  };

  const INDEX_FOOTER_ADDRESS = {
    ja: '東京都中央区銀座1-22-11<br>銀座大竹ビジデンス2F',
    en: 'Ginza Otake Bizidence 2F<br>1-22-11 Ginza, Chuo-ku, Tokyo, Japan',
    zh: '日本东京都中央区银座1-22-11<br>银座大竹ビジデンス2F'
  };

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(el => {
      el.textContent = value;
    });
  }

  function setHtml(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = value;
  }

  function setList(selector, values) {
    const items = document.querySelectorAll(selector);
    items.forEach((item, idx) => {
      if (values[idx] !== undefined) {
        item.textContent = values[idx];
      }
    });
  }

  function applyIndexI18n(lang) {
    const t = I18N[lang] || I18N.ja;

    document.documentElement.lang = t.htmlLang;
    document.title = t.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.metaDescription);

    setText('.header .nav__link[data-index="01"], .nav-mobile .nav__link[data-index="01"]', t.navTop);
    setText('.header .nav__link[data-index="02"], .nav-mobile .nav__link[data-index="02"]', t.navServices);
    setText('.header .nav__link[data-index="03"], .nav-mobile .nav__link[data-index="03"]', t.navRecruit);
    setText('.header .nav__link[data-index="04"], .nav-mobile .nav__link[data-index="04"]', t.navAbout);
    setText('.header .nav__link[data-index="05"], .nav-mobile .nav__link[data-index="05"]', t.navContact);
    setText('.header__cta .btn', t.contactCta);
    setText('.nav-mobile > .btn.btn--primary.mt-4', t.contactCta);

    setHtml('.hero__badge', `<span class="hero__badge-dot"></span>${t.heroBadge}`);
    setHtml('.hero__title', t.heroTitleHtml);
    if (typingEl) {
      typingEl.dataset.words = JSON.stringify(t.heroWords);
      typeEffect(typingEl);
    }
    setText('.hero__desc', t.heroDesc);
    setText('.hero__actions .btn--primary', t.heroBtnServices);
    setText('.hero__actions .btn--outline', t.heroBtnRecruit);
    setText('.hero__stats .stat:nth-child(1) .stat__label', t.stat1Label);
    setText('.hero__stats .stat:nth-child(2) .stat__label', t.stat2Label);
    setText('.hero__stats .stat:nth-child(3) .stat__label', t.stat3Label);
    setText('.hero__stats .stat:nth-child(4) .stat__number', t.stat4Number);
    setText('.hero__stats .stat:nth-child(4) .stat__label', t.stat4Label);
    setText('.tech-strip__label', t.techLabel);

    setText('.services-preview .section-label', t.servicesLabel);
    setHtml('.services-preview .section-title', t.servicesTitleHtml);
    setText('.services-preview .section-desc', t.servicesDesc);
    setText('.services-preview .service-card:nth-child(1) .card__title', t.service1Title);
    setText('.services-preview .service-card:nth-child(1) .card__desc', t.service1Desc);
    setList('.services-preview .service-card:nth-child(1) .tag', t.service1Tags);
    setText('.services-preview .service-card:nth-child(2) .card__title', t.service2Title);
    setText('.services-preview .service-card:nth-child(2) .card__desc', t.service2Desc);
    setList('.services-preview .service-card:nth-child(2) .tag', t.service2Tags);
    setText('.services-preview .service-card:nth-child(3) .card__title', t.service3Title);
    setText('.services-preview .service-card:nth-child(3) .card__desc', t.service3Desc);
    setList('.services-preview .service-card:nth-child(3) .tag', t.service3Tags);
    setText('.services-preview .text-center .btn', t.allServicesBtn);

    setText('.about-strip .section-label', t.aboutLabel);
    setHtml('.about-strip .section-title', t.aboutTitleHtml);
    setText('.about-strip .about-strip__desc', t.aboutDesc);
    setText('.about-strip .about-strip__value-item:nth-child(1) .about-strip__value-label', t.value1Label);
    setText('.about-strip .about-strip__value-item:nth-child(1) .about-strip__value-desc', t.value1Desc);
    setText('.about-strip .about-strip__value-item:nth-child(2) .about-strip__value-label', t.value2Label);
    setText('.about-strip .about-strip__value-item:nth-child(2) .about-strip__value-desc', t.value2Desc);
    setText('.about-strip .about-strip__value-item:nth-child(3) .about-strip__value-label', t.value3Label);
    setText('.about-strip .about-strip__value-item:nth-child(3) .about-strip__value-desc', t.value3Desc);
    setText('.about-strip .btn.btn--outline.mt-4', t.aboutBtn);

    setText('.process .section-label', t.processLabel);
    setHtml('.process .section-title', t.processTitleHtml);
    setText('.process .section-desc', t.processDesc);
    setText('.process .process-step:nth-child(1) .process-step__title', t.step1Title);
    setText('.process .process-step:nth-child(1) .process-step__desc', t.step1Desc);
    setText('.process .process-step:nth-child(2) .process-step__title', t.step2Title);
    setText('.process .process-step:nth-child(2) .process-step__desc', t.step2Desc);
    setText('.process .process-step:nth-child(3) .process-step__title', t.step3Title);
    setText('.process .process-step:nth-child(3) .process-step__desc', t.step3Desc);
    setText('.process .process-step:nth-child(4) .process-step__title', t.step4Title);
    setText('.process .process-step:nth-child(4) .process-step__desc', t.step4Desc);

    setText('.recruit-cta__badge', t.recruitBadge);
    setHtml('.recruit-cta__title', t.recruitTitleHtml);
    setText('.recruit-cta__desc', t.recruitDesc);
    setText('.recruit-cta__actions .btn.btn--purple', t.recruitBtn);
    setText('.recruit-cta__actions .btn.btn--ghost', t.consultBtn);

    setText('.cta-strip .section-label', t.ctaLabel);
    setHtml('.cta-strip__title', t.ctaTitleHtml);
    setText('.cta-strip__desc', t.ctaDesc);
    setText('.cta-strip__actions .btn.btn--primary', t.ctaPrimary);
    setText('.cta-strip__actions .btn.btn--outline', t.ctaSecondary);

    setHtml('.footer__tagline', t.footerTaglineHtml);
    setText('footer .footer__grid > div:nth-child(2) .footer__heading', t.footerCompanyHeading);
    setText('footer .footer__grid > div:nth-child(3) .footer__heading', t.footerServicesHeading);
    setText('footer .footer__grid > div:nth-child(4) .footer__heading', t.footerContactHeading);
    setList('footer .footer__grid > div:nth-child(2) .footer__links a', t.footerCompanyLinks);
    setList('footer .footer__grid > div:nth-child(3) .footer__links a', t.footerServicesLinks);
    setHtml('footer .footer__grid > div:nth-child(4) .footer__links li:last-child', INDEX_FOOTER_ADDRESS[lang] || INDEX_FOOTER_ADDRESS.ja);
    setText('footer .footer__bottom span:nth-child(2)', t.footerEngineered);
  }

  function updateLangButtons(lang) {
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function setLanguage(lang) {
    const normalized = SUPPORTED_LANGS.includes(lang) ? lang : 'ja';
    localStorage.setItem(LANG_STORAGE_KEY, normalized);
    applyIndexI18n(normalized);
    updateLangButtons(normalized);
  }

  const initialLang = localStorage.getItem(LANG_STORAGE_KEY) || 'ja';
  setLanguage(initialLang);

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });
})();

// ----------------------------------------
// Site-wide i18n layer (non-index pages)
// ----------------------------------------
(function() {
  const LANG_STORAGE_KEY = 'corevo_lang';
  const SUPPORTED_LANGS = ['ja', 'en', 'zh'];
  const page = document.body.dataset.page || 'index';

  // Index has a dedicated translation block above; skip here to avoid double-binding.
  if (page === 'index') return;

  function ensureLanguageSwitchers() {
    const headerInner = document.querySelector('.header__inner');
    if (headerInner && !headerInner.querySelector('.lang-switch')) {
      const switcher = document.createElement('div');
      switcher.className = 'lang-switch';
      switcher.setAttribute('aria-label', 'Language switcher');
      switcher.innerHTML = [
        '<button type="button" class="lang-switch__btn" data-lang="ja">JP</button>',
        '<button type="button" class="lang-switch__btn" data-lang="en">EN</button>',
        '<button type="button" class="lang-switch__btn" data-lang="zh">中文</button>'
      ].join('');
      const cta = headerInner.querySelector('.header__cta');
      if (cta) {
        headerInner.insertBefore(switcher, cta);
      } else {
        headerInner.appendChild(switcher);
      }
    }

    const navMobileEl = document.querySelector('.nav-mobile');
    if (navMobileEl && !navMobileEl.querySelector('.lang-switch--mobile')) {
      const mobileSwitcher = document.createElement('div');
      mobileSwitcher.className = 'lang-switch lang-switch--mobile';
      mobileSwitcher.setAttribute('aria-label', 'Language switcher');
      mobileSwitcher.innerHTML = [
        '<button type="button" class="lang-switch__btn" data-lang="ja">JP</button>',
        '<button type="button" class="lang-switch__btn" data-lang="en">EN</button>',
        '<button type="button" class="lang-switch__btn" data-lang="zh">中文</button>'
      ].join('');
      navMobileEl.insertBefore(mobileSwitcher, navMobileEl.firstChild);
    }
  }

  ensureLanguageSwitchers();
  const langButtons = document.querySelectorAll('.lang-switch__btn');
  if (!langButtons.length) return;

  const COMMON = {
    ja: {
      htmlLang: 'ja',
      menuAriaLabel: 'メニュー',
      navTop: 'TOP',
      navServices: 'SERVICES',
      navRecruit: 'RECRUIT',
      navAbout: 'ABOUT',
      navContact: 'CONTACT',
      ctaContact: 'お問い合わせ',
      footerTagline: 'CoRevo = Cooperation × Revolution<br>「協力（Cooperation）」の力で「革新（Revolution）」を生み出し、新しい価値と未来を創造する。',
      footerCompany: 'COMPANY',
      footerServices: 'SERVICES',
      footerSupport: 'SUPPORT',
      footerContact: 'CONTACT',
      companyLinks: ['会社概要', 'サービス', '採用情報', 'お問い合わせ'],
      serviceLinks: ['SES / 派遣', '受託開発', 'クラウド', 'コンサルティング'],
      supportLinks: ['プライバシーポリシー', 'お問い合わせフォーム'],
      engineered: 'Engineered with precision.',
      addressHtml: '東京都中央区銀座1-22-11<br>銀座大竹ビジデンス2F',
      addressLine: '東京都中央区銀座1-22-11 銀座大竹ビジデンス2F',
      addressPrefix: '住所：',
      addressLabel: 'ADDRESS'
    },
    en: {
      htmlLang: 'en',
      menuAriaLabel: 'Menu',
      navTop: 'TOP',
      navServices: 'SERVICES',
      navRecruit: 'RECRUIT',
      navAbout: 'ABOUT',
      navContact: 'CONTACT',
      ctaContact: 'CONTACT',
      footerTagline: 'CoRevo = Cooperation × Revolution<br>Creating new value and future through the power of cooperation.',
      footerCompany: 'COMPANY',
      footerServices: 'SERVICES',
      footerSupport: 'SUPPORT',
      footerContact: 'CONTACT',
      companyLinks: ['Company', 'Services', 'Careers', 'Contact'],
      serviceLinks: ['SES / Dispatch', 'Contract Development', 'Cloud', 'Consulting'],
      supportLinks: ['Privacy Policy', 'Contact Form'],
      engineered: 'Engineered with precision.',
      addressHtml: 'Ginza Otake Bizidence 2F<br>1-22-11 Ginza, Chuo-ku, Tokyo, Japan',
      addressLine: 'Ginza Otake Bizidence 2F, 1-22-11 Ginza, Chuo-ku, Tokyo, Japan',
      addressPrefix: 'Address: ',
      addressLabel: 'ADDRESS'
    },
    zh: {
      htmlLang: 'zh-CN',
      menuAriaLabel: '菜单',
      navTop: '首页',
      navServices: '服务',
      navRecruit: '招聘',
      navAbout: '关于',
      navContact: '联系',
      ctaContact: '联系我们',
      footerTagline: 'CoRevo = Cooperation × Revolution<br>以“协作（Cooperation）”之力创造“革新（Revolution）”，持续创造新价值与新未来。',
      footerCompany: '公司',
      footerServices: '服务',
      footerSupport: '支持',
      footerContact: '联系',
      companyLinks: ['公司简介', '服务', '招聘信息', '联系我们'],
      serviceLinks: ['SES / 派遣', '委托开发', '云服务', '咨询'],
      supportLinks: ['隐私政策', '联系表单'],
      engineered: '以精密工程打造。',
      addressHtml: '日本东京都中央区银座1-22-11<br>银座大竹ビジデンス2F',
      addressLine: '日本东京都中央区银座1-22-11 银座大竹ビジデンス2F',
      addressPrefix: '地址：',
      addressLabel: '地址'
    }
  };

  const PAGE_META = {
    about: {
      ja: {
        title: '会社概要 | CoRevo Inc.',
        desc: 'CoRevoの会社概要。ミッション・ビジョン・代表メッセージ・会社情報・沿革をご紹介します。',
        heroDesc: 'テクノロジーとエンジニアの力で、日本のビジネスを加速させる。CoRevoは創業間もないスタートアップとして、一社一社の課題に丁寧に向き合いながら実績を積み上げています。'
      },
      en: {
        title: 'Company Profile | CoRevo Inc.',
        desc: 'Company profile of CoRevo: mission, vision, founder message, company information, and history.',
        heroDesc: 'Accelerating Japanese business with the power of technology and engineers. As an early-stage startup, CoRevo steadily builds trust by tackling each client challenge with care.'
      },
      zh: {
        title: '公司简介 | CoRevo Inc.',
        desc: 'CoRevo 公司简介，包含使命愿景、代表寄语、公司信息与沿革。',
        heroDesc: '以技术与工程师之力，加速日本企业发展。作为初创阶段团队，CoRevo 正在认真面对每一家客户课题并持续积累成果。'
      }
    },
    services: {
      ja: {
        title: 'SERVICES | CoRevo Inc.',
        desc: 'CoRevoのサービスラインナップ。SES・派遣、受託開発、クラウド、コンサルティングで貴社のIT戦略を支援します。',
        heroTitle: 'ITの力で、<br><span class="text-gradient">ビジネスを加速</span>する。',
        heroDesc: 'CoRevoは、SES・受託開発・クラウドインフラ・ITコンサルティングの4領域で、クライアント企業のデジタル戦略を包括的に支援します。'
      },
      en: {
        title: 'Services | CoRevo Inc.',
        desc: 'CoRevo services: SES/dispatch, contract development, cloud infrastructure, and IT consulting.',
        heroTitle: 'Accelerate your business<br><span class="text-gradient">with IT power</span>.',
        heroDesc: 'CoRevo supports client digital strategy across four domains: SES/dispatch, contract development, cloud infrastructure, and IT consulting.'
      },
      zh: {
        title: '服务 | CoRevo Inc.',
        desc: 'CoRevo 服务一览：SES/派遣、委托开发、云基础设施与 IT 咨询。',
        heroTitle: '以 IT 能力，<br><span class="text-gradient">加速业务增长</span>。',
        heroDesc: 'CoRevo 在 SES/派遣、委托开发、云基础设施与 IT 咨询四大领域，为客户提供整体数字化支持。'
      }
    },
    recruit: {
      ja: {
        title: 'RECRUIT | CoRevo Inc.',
        desc: 'CoRevoの採用情報。エンジニア積極採用中。スキルアップ支援・リモート対応・充実した福利厚生でキャリアを加速させませんか。'
      },
      en: {
        title: 'Recruit | CoRevo Inc.',
        desc: 'Careers at CoRevo. We are hiring engineers with growth support, remote work, and solid benefits.'
      },
      zh: {
        title: '招聘 | CoRevo Inc.',
        desc: 'CoRevo 招聘信息。积极招聘工程师，提供成长支持、远程协作与完善福利。'
      }
    },
    contact: {
      ja: {
        title: 'お問い合わせ | CoRevo Inc.',
        desc: 'CoRevoへのお問い合わせページ。サービスに関するご相談・エンジニア採用・その他ご質問は、こちらのフォームからお気軽にどうぞ。'
      },
      en: {
        title: 'Contact | CoRevo Inc.',
        desc: 'Contact CoRevo for services, estimates, recruiting, and other inquiries.'
      },
      zh: {
        title: '联系我们 | CoRevo Inc.',
        desc: '联系 CoRevo：服务咨询、报价申请、招聘报名与其他问题。'
      }
    },
    'privacy-policy': {
      ja: {
        title: 'プライバシーポリシー | CoRevo Inc.',
        desc: 'CoRevoのプライバシーポリシーです。個人情報の取得・利用目的・管理方法・お問い合わせ窓口について記載しています。'
      },
      en: {
        title: 'Privacy Policy | CoRevo Inc.',
        desc: 'CoRevo privacy policy for personal data collection, use, management, and contact information.'
      },
      zh: {
        title: '隐私政策 | CoRevo Inc.',
        desc: 'CoRevo 隐私政策：关于个人信息的收集、使用、管理与联系方式。'
      }
    }
  };

  const CONTACT_FORM_I18N = {
    ja: {
      namePlaceholder: '山田 太郎',
      companyPlaceholder: '株式会社〇〇',
      positionPlaceholder: '開発部 エンジニアリングマネージャー',
      messagePlaceholder: '例：Javaバックエンドエンジニアを2名、来月から6ヶ月間アサインしていただきたいです。フレームワークはSpring Boot、経験3年以上を希望します。',
      budgetOptions: ['選択してください', '〜100万円/月', '100〜300万円/月', '300〜500万円/月', '500万円/月〜', '未定・相談したい'],
      sendButton: '送信する →'
    },
    en: {
      namePlaceholder: 'John Doe',
      companyPlaceholder: 'Example Co., Ltd.',
      positionPlaceholder: 'Engineering Manager, Development',
      messagePlaceholder: 'Example: We need two Java backend engineers for six months starting next month. Spring Boot preferred, with 3+ years of experience.',
      budgetOptions: ['Please select', 'Up to JPY 1M / month', 'JPY 1M - 3M / month', 'JPY 3M - 5M / month', 'JPY 5M+ / month', 'Undecided / want to discuss'],
      sendButton: 'Send →'
    },
    zh: {
      namePlaceholder: '张三',
      companyPlaceholder: '示例株式会社',
      positionPlaceholder: '开发部 工程经理',
      messagePlaceholder: '示例：希望从下个月起安排 2 名 Java 后端工程师，周期 6 个月。框架为 Spring Boot，期望 3 年以上经验。',
      budgetOptions: ['请选择', '100万日元/月以内', '100万-300万日元/月', '300万-500万日元/月', '500万日元/月以上', '未定 / 想先咨询'],
      sendButton: '发送 →'
    }
  };

  let currentLang = null;
  const PAGE_CONTENT = {};

  PAGE_CONTENT.services = {
    en: {
      heroLabel: 'SERVICES',
      heroTitle: 'Accelerate your business<br><span class="text-gradient">with IT power</span>.',
      heroDesc: 'CoRevo supports client digital strategy across four domains: SES/dispatch, contract development, cloud infrastructure, and IT consulting.',
      badges: [
        '<span class="service-section__num">01</span>SES / Dispatch',
        '<span class="service-section__num">02</span>Contract Development',
        '<span class="service-section__num">03</span>Cloud Infrastructure',
        '<span class="service-section__num">04</span>IT Consulting'
      ],
      sectionTitles: [
        'Rapidly deploy<br><span class="text-gradient">job-ready engineers</span>',
        'From requirements to<br><span class="text-gradient">release</span>, end-to-end',
        'Scalable<br><span class="text-gradient">infrastructure design</span> & build',
        'From strategy to<br><span class="text-gradient">execution</span>, side by side'
      ],
      sectionDescs: [
        'We assign engineers best matched to your project in as fast as two weeks. From requirement hearing to candidate selection and interview coordination, we support end to end.',
        'We deliver web, mobile, and business system development. Using agile cycles, we deliver value quickly and support modernization as well.',
        'We provide design, build, operations, and optimization for AWS / Azure / GCP multi-cloud environments with IaC-driven reproducibility.',
        'From DX and IT strategy to organizational design, we support diagnosis, roadmap design, execution, and measurement.'
      ],
      sesFeatures: [
        'Fast support from hearing to proposal',
        'Clear skill requirements and careful candidate screening',
        'Skill sheets and portfolios submitted in advance',
        'Post-contract follow-up and periodic reporting',
        'Flexible and fast decisions enabled by a compact team'
      ],
      devFeatures: [
        'Coverage from requirements and design to implementation, testing, and maintenance',
        '2-week sprint agile development with high transparency',
        'Progress managed by a dedicated project manager',
        'Continuous post-release maintenance and operations support',
        'Extensive modernization experience for legacy systems'
      ],
      cloudFeatures: [
        'Support by certified AWS / Azure / GCP engineers',
        'IaC standardization with Terraform / CloudFormation',
        'Zero-downtime migration support',
        'Continuous optimization for cost and performance',
        '24/7 monitoring, alerting, and incident response options'
      ],
      consultFeatures: [
        'DX and digital strategy planning with execution support',
        'IT organization and engineering hiring plan design',
        'Advisory for system renewal and vendor selection',
        'Security risk assessment and improvement proposals',
        'Visualization and phased resolution plans for technical debt'
      ],
      sectionBtns: [
        'Discuss engineer sourcing',
        'Discuss a development project',
        'Discuss cloud strategy',
        'Talk with a consultant'
      ],
      skillSetLabel: '// Supported Skill Set',
      statNums: [
        '1<span style="font-size:0.9rem"> day</span>',
        '5<span style="font-size:0.9rem"> days</span>',
        '0<span style="font-size:0.9rem"> JPY</span>'
      ],
      statLabels: [
        'First response (business day)',
        'Initial proposal (as fast as)',
        'Consultation / Estimate'
      ],
      devFlowLabel: '// Development Flow (Agile)',
      devStepNames: ['Requirements & Design', 'Sprint Development', 'Testing & QA', 'Release & Maintenance'],
      devStepDescs: [
        'Design architecture and UI/UX prototypes based on interviews',
        'Release features in two-week cycles and reflect feedback quickly',
        'Ensure quality via automated tests, load tests, and security checks',
        'Safe releases with CI/CD and ongoing operations support'
      ],
      consultFlowLabel: '// Consulting Process',
      consultStepNames: ['Current-State Analysis', 'Target Design & Roadmap', 'Execution Support', 'Measurement & Improvement'],
      consultStepDescs: [
        'Assess and visualize IT assets, organization, and processes',
        'Define IT strategy and KPIs aligned with business goals',
        'Support project execution, talent development, and change management',
        'Continuously improve with quantitative validation'
      ],
      pricingTitle: 'Flexible plans<br><span class="text-gradient">for your budget</span>',
      pricingDesc: 'We offer multiple pricing models based on scale, duration, and requirements, including monthly fixed, hourly, and project-based plans.',
      pricingPrimary: 'Free consultation / estimate',
      pricingSecondary: 'Download materials',
      faqTitle: 'Frequently Asked <span>Questions</span>',
      faqQuestions: [
        'What is the difference between SES and contract development?',
        'How long does it take to assign engineers?',
        'Can we specify required skills and years of experience?',
        'Can we replace an engineer during the contract?',
        'Can you support small projects (1-2 engineers)?'
      ],
      faqAnswers: [
        'SES places engineers into your project team, while contract development means CoRevo delivers end-to-end from requirements to release.',
        'From hearing requirements to candidate proposal usually takes 3-5 business days, and assignment can be completed in as fast as 10 days.',
        'Yes. You can specify detailed conditions such as language, framework, domain experience, certifications, and years of experience.',
        'Yes. If project direction or skill requirements change, we can respond flexibly with consultant follow-up.',
        'Yes. We welcome requests from one engineer upward, including startup and project-based engagements.'
      ],
      ctaLabel: 'GET STARTED',
      ctaTitle: 'Start with a free consultation<br>today.',
      ctaDesc: 'Share your requirements and challenges. We will propose the most suitable service plan. No cost required.',
      ctaPrimary: 'Contact us for free',
      ctaSecondary: 'View Careers'
    },
    zh: {
      heroLabel: '服务',
      heroTitle: '以 IT 能力，<br><span class="text-gradient">加速业务增长</span>。',
      heroDesc: 'CoRevo 在 SES/派遣、委托开发、云基础设施与 IT 咨询四大领域，为客户提供整体数字化支持。',
      badges: [
        '<span class="service-section__num">01</span>SES / 派遣',
        '<span class="service-section__num">02</span>委托开发',
        '<span class="service-section__num">03</span>云基础设施',
        '<span class="service-section__num">04</span>IT 咨询'
      ],
      sectionTitles: [
        '快速提供<br><span class="text-gradient">即战力工程师</span>',
        '从需求定义到<br><span class="text-gradient">发布上线</span>一体化',
        '可扩展的<br><span class="text-gradient">基础设施设计</span>与构建',
        '从战略制定到<br><span class="text-gradient">落地执行</span>全程陪跑'
      ],
      sectionDescs: [
        '最短 2 周为项目匹配最合适的工程师。从需求访谈到候选筛选、面谈协调全流程支持。',
        '可承接 Web、移动端、业务系统等项目，采用敏捷方式快速交付价值，并支持系统现代化改造。',
        '提供 AWS/Azure/GCP 多云环境的设计、构建、运维与优化，以 IaC 提升可复现性并推进成本与安全优化。',
        '围绕 DX、IT 战略和组织建设，从诊断到路线图、执行与评估提供一体化支持。'
      ],
      sesFeatures: [
        '从课题访谈到提案快速并行推进',
        '明确技能要求并细致筛选候选人',
        '提前提交技能表与作品集',
        '签约后持续跟进与定期汇报',
        '小团队带来的灵活与快速决策'
      ],
      devFeatures: [
        '覆盖需求定义、设计、开发、测试与维护',
        '2 周迭代敏捷开发，过程透明',
        '由专任项目经理管理进度',
        '上线后持续提供运维支持',
        '具备丰富的遗留系统现代化经验'
      ],
      cloudFeatures: [
        '由 AWS / Azure / GCP 认证工程师提供支持',
        '使用 Terraform / CloudFormation 标准化 IaC',
        '支持零停机迁移方案',
        '持续进行成本与性能优化',
        '提供 24/7 监控、告警与故障应对选项'
      ],
      consultFeatures: [
        'DX 与数字化战略制定及执行支持',
        'IT 组织与工程师招聘规划设计',
        '系统更新与厂商选型顾问支持',
        '安全风险诊断与改进建议',
        '技术债可视化与分阶段消解计划'
      ],
      sectionBtns: ['咨询工程师配置', '咨询开发项目', '咨询云方案', '咨询顾问服务'],
      skillSetLabel: '// 对应技能栈',
      statNums: [
        '1<span style="font-size:0.9rem">天</span>',
        '5<span style="font-size:0.9rem">天</span>',
        '0<span style="font-size:0.9rem">日元</span>'
      ],
      statLabels: ['首次回复（工作日）', '初版提案（最快）', '咨询 / 估算'],
      devFlowLabel: '// 开发流程（敏捷）',
      devStepNames: ['需求定义与设计', '迭代开发', '测试与质量保障', '发布与维护'],
      devStepDescs: [
        '基于访谈完成系统设计与 UI/UX 原型',
        '按 2 周节奏发布功能并快速反馈',
        '通过自动化测试、压测与安全诊断保障质量',
        '通过 CI/CD 安全发布并持续运维支持'
      ],
      consultFlowLabel: '// 咨询流程',
      consultStepNames: ['现状分析与课题诊断', '目标设计与路线图', '执行支持与体制建设', '效果评估与持续改善'],
      consultStepDescs: [
        '多角度调查并可视化 IT 资产、组织与流程',
        '基于业务目标制定 IT 战略与 KPI',
        '支持项目推进、人才培养与变革管理',
        '基于量化数据验证效果并持续优化'
      ],
      pricingTitle: '按预算定制的<br><span class="text-gradient">灵活方案</span>',
      pricingDesc: '根据规模、周期与需求提供月费制、时薪制、项目制等多种计费方式，欢迎先行咨询。',
      pricingPrimary: '免费咨询 / 报价申请',
      pricingSecondary: '下载资料',
      faqTitle: '常见<span>问题</span>',
      faqQuestions: [
        'SES 与委托开发有什么区别？',
        '工程师配置通常需要多久？',
        '可以指定技能和经验年限吗？',
        '合同中途可以更换工程师吗？',
        '小规模项目（1-2 人）也能支持吗？'
      ],
      faqAnswers: [
        'SES 是将工程师编入贵司项目团队；委托开发则由 CoRevo 从需求到上线整体交付。',
        '从需求沟通到候选人提案平均 3-5 个工作日，最快约 10 天可完成配置。',
        '可以。支持语言、框架、行业经验、证书、年限等详细条件指定。',
        '可以。若项目方向或技能需求变化，我们可灵活调整并持续跟进。',
        '可以。我们支持从 1 人起的委托，也有大量初创与按项目合作经验。'
      ],
      ctaLabel: '立即开始',
      ctaTitle: '从免费咨询开始<br>现在就行动。',
      ctaDesc: '只要告知需求与课题，我们将提出最合适的服务方案，费用为 0。',
      ctaPrimary: '免费联系我们',
      ctaSecondary: '查看招聘信息'
    }
  };

  PAGE_CONTENT.recruit = {
    en: {
      heroLabel: 'RECRUIT',
      heroTitle: 'Bring your skills,<br><span class="text-gradient">move the world</span>.',
      heroDesc: 'CoRevo pursues an environment where engineers shine the most. With growth, challenge, and freedom, we fully support your career.',
      heroPrimary: 'View Open Positions',
      heroSecondary: 'Talk First',
      metricsTitle: 'Our early-stage <span>commitment</span>',
      metricNums: [
        '1<span style="font-size:1.8rem"> day</span>',
        '5<span style="font-size:1.8rem"> days</span>',
        '0<span style="font-size:1.8rem"> JPY</span>',
        'Direct CEO Access'
      ],
      metricLabels: ['First response (business day)', 'Initial proposal (as fast as)', 'Consultation / Estimate', 'Flexible support by a compact team'],
      valuesTitle: 'The <span>3 values</span> we stand by',
      valueDescs: [
        'We allocate 10% of work time to learning and support certifications, conferences, and internal study sessions.',
        'From project choice to tech stack and work style, each engineer has strong ownership and autonomy.',
        'Remote-first work design with async communication so you can perform at your best from anywhere.'
      ],
      careerTitle: 'Career Path & <span>Benefits</span>',
      careerStepTitles: ['Junior Engineer', 'Mid-level Engineer', 'Senior Engineer', 'Tech Lead / Manager', 'CTO / Executive'],
      careerStepYears: ['Year 0-2', 'Year 3-5', 'Year 5-8', 'Year 8+', 'Special Track'],
      careerStepDescs: [
        'Build core skills under senior support with OJT and mentor systems.',
        'Complete development tasks independently and contribute to tech decisions.',
        'Lead architecture and quality through design leadership and code reviews.',
        'Lead technology strategy, team building, and client communication.',
        'Actively supported paths: internal CTO track, spin-out support, and specialist routes.'
      ],
      benefitNames: ['Equipment Support', 'Full Remote', 'Learning Support', 'Health Insurance', 'Flex Schedule', 'Side Projects OK', 'Incentives', 'Paid Leave'],
      benefitDescs: [
        'MacBook Pro / high-spec PC, monitor, and peripherals fully covered',
        'No office attendance requirement. Work from anywhere in Japan',
        'Books, Udemy, and certification fees covered up to JPY 30,000/month',
        'Full social insurance, checkups, and mental health support',
        'No core time. Fully flexible schedule',
        'Open culture for OSS, personal products, and side work',
        'Certification bonuses, engineer awards, and tech contribution rewards',
        '20 days from day one with easy-to-use rules'
      ],
      jobsTitle: 'Current <span>Open Positions</span>',
      jobTags: ['Backend', 'Full-time', 'Urgent', 'Frontend', 'Full-time', 'Infrastructure', 'Full-time', 'Popular', 'Mobile', 'Full-time', 'Data', 'Full-time', 'PM', 'Full-time'],
      jobTitles: [
        'Backend Engineer (Java / Python)',
        'Frontend Engineer (React / TypeScript)',
        'Infrastructure / Cloud Engineer (AWS / Terraform)',
        'Mobile Engineer (iOS / Android / Flutter)',
        'Data Engineer / ML Engineer',
        'Project Manager (IT)'
      ],
      jobMetas: [
        '📍 Fully Remote', '💰 JPY 6M-9M', '🕐 3+ years',
        '📍 Fully Remote', '💰 JPY 5M-8M', '🕐 2+ years',
        '📍 Fully Remote / Partial Onsite', '💰 JPY 6.5M-9.5M', '🕐 3+ years',
        '📍 Fully Remote', '💰 JPY 5.5M-8.5M', '🕐 2+ years',
        '📍 Fully Remote', '💰 JPY 7M-10M', '🕐 3+ years',
        '📍 Fully Remote / Partial Onsite', '💰 JPY 7M-11M', '🕐 5+ years'
      ],
      processTitle: 'Selection <span>Process</span>',
      processDesc: 'From document screening to offer, we aim to complete in as fast as two weeks.',
      processStepTitles: ['01 Document Screening', '02 Casual Interview', '03 Technical Interview', '04 Final Interview', '05 Offer'],
      processStepDescs: [
        'Review resume, work history, and portfolio',
        '30-minute online talk to discuss company and role casually',
        'Assess problem-solving, code review, and architecture skills',
        'Discuss cultural fit and career vision with executives',
        'After offer, onboarding support team follows closely'
      ],
      ctaLabel: 'APPLY NOW',
      ctaTitle: 'We look forward to<br>your application.',
      ctaDesc: 'If you are still considering a change, start with a casual interview. Let us think about your career together.',
      ctaPrimary: 'Apply Now',
      ctaSecondary: 'Book a Casual Interview'
    },
    zh: {
      heroLabel: '招聘',
      heroTitle: '让你的技术，<br><span class="text-gradient">驱动世界</span>。',
      heroDesc: 'CoRevo 持续打造“工程师最能发光”的环境。以成长、挑战、自由为核心，全力支持你的职业发展。',
      heroPrimary: '查看职位',
      heroSecondary: '先聊一聊',
      metricsTitle: '初创阶段的<span>响应方针</span>',
      metricNums: [
        '1<span style="font-size:1.8rem">天</span>',
        '5<span style="font-size:1.8rem">天</span>',
        '0<span style="font-size:1.8rem">日元</span>',
        '代表直连'
      ],
      metricLabels: ['首次回复（工作日）', '初版提案（最快）', '咨询 / 估算', '小而精团队灵活响应'],
      valuesTitle: 'CoRevo 重视的<span>3 个价值观</span>',
      valueDescs: [
        '将 10% 工作时间用于学习，全面支持证书、技术会议与内部学习会。',
        '从项目选择、技术选型到工作方式，赋予工程师充分自主决策空间。',
        '以全远程为前提并采用异步协作，保证你在任何地点都能发挥最佳表现。'
      ],
      careerTitle: '职业路径与<span>福利</span>',
      careerStepTitles: ['初级工程师', '中级工程师', '高级工程师', '技术负责人 / 经理', 'CTO / 高管路径'],
      careerStepYears: ['0-2 年', '3-5 年', '5-8 年', '8 年以上', '特别通道'],
      careerStepDescs: [
        '在资深工程师支持下构建基础能力，配套 OJT 与导师制度。',
        '可独立完成开发任务，成为项目核心并参与技术选型。',
        '主导设计与架构，通过代码评审与培养后辈保障质量。',
        '负责技术战略、团队建设与客户沟通，双线带队。',
        '积极支持内部 CTO 候选、分拆创业支持和专家化发展路线。'
      ],
      benefitNames: ['设备支持', '全远程', '学习支持', '健康保障', '弹性工作', '允许副业', '激励制度', '带薪休假'],
      benefitDescs: [
        'MacBook Pro / 高性能 PC、显示器与外设全额配备',
        '无到岗义务，可在日本全国任意地点工作',
        '书籍、Udemy、资格费用每月最高 3 万日元公司承担',
        '社保齐全、体检与心理健康支持',
        '无核心工时，完全弹性',
        '鼓励 OSS、个人开发与副业文化',
        '资格奖金、优秀工程师奖、技术贡献奖励',
        '入社首日即享 20 天并配套易用制度'
      ],
      jobsTitle: '当前<span>招聘职位</span>',
      jobTags: ['后端', '正式员工', '急聘', '前端', '正式员工', '基础设施', '正式员工', '热门', '移动端', '正式员工', '数据', '正式员工', 'PM', '正式员工'],
      jobTitles: [
        '后端工程师（Java / Python）',
        '前端工程师（React / TypeScript）',
        '基础设施 / 云工程师（AWS / Terraform）',
        '移动端工程师（iOS / Android / Flutter）',
        '数据工程师 / ML 工程师',
        '项目经理（IT）'
      ],
      jobMetas: [
        '📍 全远程', '💰 600万-900万日元', '🕐 3年以上经验',
        '📍 全远程', '💰 500万-800万日元', '🕐 2年以上经验',
        '📍 全远程 / 部分到岗', '💰 650万-950万日元', '🕐 3年以上经验',
        '📍 全远程', '💰 550万-850万日元', '🕐 2年以上经验',
        '📍 全远程', '💰 700万-1,000万日元', '🕐 3年以上经验',
        '📍 全远程 / 部分到岗', '💰 700万-1,100万日元', '🕐 5年以上经验'
      ],
      processTitle: '选考<span>流程</span>',
      processDesc: '从书面筛选到发放 offer，目标最快 2 周完成。',
      processStepTitles: ['01 书面筛选', '02 轻松面谈', '03 技术面试', '04 最终面试', '05 录用通知'],
      processStepDescs: [
        '确认简历、工作经历与作品集',
        '30 分钟线上交流，轻松了解公司与工作',
        '评估技术问题解决、代码评审与设计能力',
        '与管理层沟通文化匹配与职业观',
        '发放录用后由入社支持团队全程跟进'
      ],
      ctaLabel: '立即申请',
      ctaTitle: '期待收到你的<br>申请。',
      ctaDesc: '即使你还未决定转职，也欢迎先从轻松面谈开始，一起规划你的职业路径。',
      ctaPrimary: '立即报名',
      ctaSecondary: '预约轻松面谈'
    }
  };

  PAGE_CONTENT.about = {
    en: {
      heroDesc: 'Accelerating Japanese business with the power of technology and engineers. As an early-stage startup, CoRevo steadily builds trust by tackling each client challenge with care.',
      numberSuffixes: [' day', ' days', ' JPY'],
      numberLabels: ['First response (business day)', 'Initial proposal (as fast as)', 'Consultation / Estimate', 'Flexible support by a compact team'],
      numberDirect: 'Direct CEO Access',
      missionTitle: 'Create an<br><span>ecosystem</span> where engineers thrive',
      missionPara1: 'Our mission is to reduce the mismatch between engineers and business needs to zero. We create an environment where strong engineers can perform at their best on the right projects while companies can secure the technical capabilities they truly need.',
      missionPara2: 'We are not a simple staffing company. We co-design engineer careers and act as a partner that drives client projects to success, contributing to the development of the entire technology industry.',
      missionVisionHtml: '<strong style="color:var(--text)">Vision 2030:</strong> <span style="color:var(--cyan)">"Bring Japan’s industrial competitiveness to world-class levels through technology."</span>',
      valuesTitle: 'The <span>3 values</span> we live by',
      valuesDesc: 'These three values are at the core of every decision and action at CoRevo.',
      valueDescs: [
        'We believe in the power of technology and continuously pursue the newest and most practical solutions while strengthening essential engineering capability.',
        'Nothing is possible without engineers. We place engineer-first principles at the center of work environment, career, and rewards to support long-term growth.',
        'We focus on outcomes, not process only. We keep verifying that client business problems are solved and engineers keep growing.'
      ],
      messageTitle: "Founder's Message",
      messageQuote: 'Turn what engineers can do<br>into what business can become.',
      messageParas: [
        'When I founded CoRevo, I had a strong discomfort as an engineer: "Why can’t I join the projects I truly want despite my skills?" Searching for that answer became the beginning of CoRevo.',
        'Today, technology is becoming the foundation of every industry. As DX, AI, and cloud adoption expand, demand for high-quality engineering has never been higher.',
        'CoRevo aims to be the bridge between demand and supply. We accurately understand each engineer’s strengths and connect them to the right projects while deeply understanding client business challenges.',
        'Our mission is to realize both a society where engineers can work with pride and a future where industry is transformed by technology.'
      ],
      profileTitle: 'Company Profile',
      profileHeaders: ['Company Name', 'Established', 'Representative Director', 'Capital', 'Employees', 'Business', 'Head Office', 'Office', 'Major Clients'],
      profileValues: [
        'CoRevo Inc.',
        'June 1, 2026',
        'Shinsenji Kou',
        'JPY 3,000,000',
        '6 (as of June 2026)',
        'Engineering Services (SES / Dispatch)<br>Contract Development<br>Cloud Infrastructure Build / Operation<br>IT Consulting / DX Support',
        'Ginza Otake Bizidence 2F<br>1-22-11 Ginza, Chuo-ku, Tokyo, Japan',
        'Tokyo HQ',
        'Major telecom carriers / major financial institutions / global IT companies / startups'
      ],
      historyTitle: 'History',
      timelineTitle: 'CoRevo Inc. founded',
      timelineDesc: 'Founded in Chofu, Tokyo with SES as the core business. Started with a team of five engineers.',
      ctaLabel: 'JOIN US / WORK WITH US',
      ctaTitle: 'Build the future<br>with CoRevo.',
      ctaDesc: 'For recruiting, service adoption, or partnerships, feel free to contact us.',
      ctaPrimary: 'Contact',
      ctaSecondary: 'View Careers'
    },
    zh: {
      heroDesc: '以技术与工程师之力，加速日本企业发展。作为初创阶段团队，CoRevo 正在认真面对每一家客户课题并持续积累成果。',
      numberSuffixes: ['天', '天', '日元'],
      numberLabels: ['首次回复（工作日）', '初版提案（最快）', '咨询 / 估算', '小而精团队灵活响应'],
      numberDirect: '代表直连',
      missionTitle: '打造让工程师发光的<br><span>生态系统</span>',
      missionPara1: 'CoRevo 的使命是将技术人才与业务需求之间的“错配”降到零。让优秀工程师在合适项目中发挥能力，同时让企业稳定获取真正需要的技术力。',
      missionPara2: '我们不是单纯的人才介绍公司。我们与工程师共同设计职业路径，并作为客户项目成功的伙伴，为整个技术产业发展贡献价值。',
      missionVisionHtml: '<strong style="color:var(--text)">愿景2030：</strong> <span style="color:var(--cyan)">“用技术把日本产业竞争力提升到世界一流水平”</span>',
      valuesTitle: '我们重视的<span>3 个价值观</span>',
      valuesDesc: '这三项价值观是 CoRevo 所有决策与行动的核心。',
      valueDescs: [
        '相信技术的力量，持续追求最新且最合适的解决方案，同时重视本质技术力的沉淀。',
        '没有工程师就没有成果。我们在工作环境、职业发展与回报体系上贯彻工程师优先。',
        '不仅关注过程，更关注结果。持续验证客户课题是否真正被解决、工程师是否持续成长。'
      ],
      messageTitle: '代表寄语',
      messageQuote: '把工程师“能做到”的事，<br>变成业务“能实现”的结果。',
      messageParas: [
        '创立 CoRevo 时，我作为工程师一直有一个疑问：“明明有技术，为什么不能参与真正想做的项目？”寻找这个答案，成为 CoRevo 的起点。',
        '如今技术正成为各行业基础。随着 DX、AI、云迁移加速，市场对高质量工程能力的需求达到了前所未有的高度。',
        'CoRevo 希望成为供需之间的桥梁。准确理解每位工程师的优势并连接到最合适的项目，同时深度理解客户的业务课题并提供真正需要的技术力。',
        '“工程师能够有尊严地工作”与“技术推动产业变革的未来”，这两者的同时实现，就是我们的使命。'
      ],
      profileTitle: '公司简介',
      profileHeaders: ['公司名', '成立时间', '代表董事', '资本金', '员工数', '业务内容', '总部地址', '据点', '主要客户'],
      profileValues: [
        '株式会社 CoRevo（CoRevo Inc.）',
        '2026年6月1日',
        '秦泉寺 浩（Shinsenji Kou）',
        '300万日元',
        '6名（截至2026年6月）',
        '工程服务（SES / 派遣）<br>系统委托开发<br>云基础设施构建与运维<br>IT 咨询与 DX 支援',
        '日本东京都中央区银座1-22-11<br>银座大竹ビジデンス2F',
        '东京总部',
        '大型通信运营商 / 大型金融机构 / 外资 IT 企业 / 创业公司等'
      ],
      historyTitle: '沿革',
      timelineTitle: '株式会社 CoRevo 成立',
      timelineDesc: '于东京调布市创立，以 SES 业务为核心起步，团队由 5 名工程师组成。',
      ctaLabel: 'JOIN US / WORK WITH US',
      ctaTitle: '与 CoRevo 一起，<br>构建未来。',
      ctaDesc: '无论是招聘、服务导入还是合作提案，都欢迎随时联系。',
      ctaPrimary: '联系我们',
      ctaSecondary: '查看招聘信息'
    }
  };

  PAGE_CONTENT.contact = {
    en: {
      heroEyebrow: 'CONTACT US',
      heroTitle: 'GET IN<br><span class="grad">TOUCH.</span>',
      heroDesc: 'For service inquiries, estimates, recruiting, and any other questions, feel free to contact us. We usually reply within 2 business days.',
      formHeading: 'Contact Form',
      formSub: '<span style="color:var(--cyan)">*</span> Required fields',
      inquiryLabel: 'Inquiry Type',
      inquiryTabs: ['About Services', 'Request a Quote', 'About Recruiting', 'Partner Alliance', 'Other'],
      nameLabel: 'Name',
      companyLabel: 'Company',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone',
      positionLabel: 'Position / Department',
      budgetLabel: 'Budget Range',
      messageLabel: 'Message',
      formNote: 'Providing details such as tech stack, team size, period, and desired start date helps us make a smoother proposal.',
      privacyLabel: '<a href="privacy-policy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a> acknowledged. I agree to the handling of personal information. The information will be used only to respond to your inquiry and provide service guidance.',
      submitNote: 'We usually reply within 2 business days.<br>For urgent cases, phone inquiries are also accepted.',
      successTitle: 'Your message has been sent',
      successDesc: 'Thank you for your inquiry.<br>Our team will contact you within 2 business days.<br>Please wait for a moment.',
      directLabel: '// DIRECT CONTACT',
      quickLabel: '// QUICK LINKS',
      responseLabel: '// RESPONSE TIME',
      quickTitle: 'Popular Links',
      contactInfoLabels: ['EMAIL', 'PHONE', 'ADDRESS'],
      hoursText: 'Weekdays 9:00-18:00 Available',
      quickLinks: [
        'About SES / Engineer Dispatch',
        'About Contract Development',
        'About Cloud Build',
        'Recruiting Entry',
        'Company Profile / Services'
      ],
      responseCaptions: ['Within 2 business days<br>Reply', 'Within 10 business days<br>Initial proposal'],
      responseNote: 'For urgent matters, please call us.<br>Same-day response is available (weekdays 9:00-18:00).'
    },
    zh: {
      heroEyebrow: '联系我们',
      heroTitle: '欢迎<br><span class="grad">联系</span>',
      heroDesc: '无论是服务咨询、报价申请、招聘报名还是其他问题，都欢迎随时联系。通常会在 2 个工作日内回复。',
      formHeading: '联系表单',
      formSub: '<span style="color:var(--cyan)">*</span> 为必填项',
      inquiryLabel: '咨询类型',
      inquiryTabs: ['关于服务', '报价申请', '关于招聘', '合作伙伴', '其他'],
      nameLabel: '姓名',
      companyLabel: '公司名',
      emailLabel: '电子邮箱',
      phoneLabel: '电话号码',
      positionLabel: '职位 / 部门',
      budgetLabel: '预算范围',
      messageLabel: '咨询内容',
      formNote: '如果填写技术栈、人数、周期、开始时间等具体需求，我们可更顺畅地为你制定方案。',
      privacyLabel: '我已同意<a href="privacy-policy.html" target="_blank" rel="noopener noreferrer">隐私政策</a>并同意个人信息处理。所获取信息仅用于回复咨询与服务说明。',
      submitNote: '通常会在 2 个工作日内回复。<br>如有紧急事项，也可电话联系。',
      successTitle: '发送成功',
      successDesc: '感谢你的咨询。<br>负责人将在 2 个工作日内与你联系。<br>请稍候。',
      directLabel: '// 直接联系',
      quickLabel: '// 快捷链接',
      responseLabel: '// 响应时间',
      quickTitle: '常用链接',
      contactInfoLabels: ['邮箱', '电话', '地址'],
      hoursText: '工作日 9:00-18:00 在线',
      quickLinks: [
        '关于 SES / 工程师派遣',
        '关于系统委托开发',
        '关于云构建',
        '工程师招聘报名',
        '公司简介 / 服务一览'
      ],
      responseCaptions: ['2个工作日内<br>回复', '10个工作日内<br>初步提案'],
      responseNote: '如需紧急处理，请电话联系。<br>可提供当日响应（工作日 9:00-18:00）。'
    }
  };

  PAGE_CONTENT['privacy-policy'] = {
    en: {
      heroLabel: 'PRIVACY POLICY',
      heroTitle: 'Privacy Policy',
      heroDesc: 'CoRevo Inc. ("the Company") properly protects personal information and handles it in compliance with applicable laws and regulations.',
      headings: [
        '1. Information We Collect',
        '2. Purpose of Use',
        '3. Provision to Third Parties',
        '4. Security Control Measures',
        '5. Requests for Disclosure / Correction / Deletion',
        '6. Use of Cookies',
        '7. Revisions',
        '8. Contact'
      ],
      card1Text: 'Through the inquiry form and other channels, we may collect the following information:',
      card1Items: [
        'Name, company name, title, email address, and phone number',
        'Inquiry details and other form input information',
        'Access logs and cookie-based technical information (for site improvement)'
      ],
      card2Text: 'Collected personal information is used within the following scope:',
      card2Items: [
        'Replying to inquiries, communication, and document delivery',
        'Service delivery, proposals, and quotation support',
        'Communication and selection related to recruiting activities',
        'Analysis for service quality improvement and website enhancement'
      ],
      card3Text: 'Except when required by law, we do not provide personal information to third parties without consent. However, we may disclose necessary information to subcontractors within the scope required to fulfill the purpose of use.',
      card4Text: 'We implement appropriate security measures to prevent unauthorized access, leakage, loss, and tampering of personal information, and review such measures as needed.',
      card5Text: 'If a person requests disclosure, correction, suspension of use, or deletion of their personal information, we will respond promptly within a reasonable scope based on applicable laws after identity verification.',
      card6Text: 'This site may use cookies for usability improvement and access analytics. You can disable cookies in browser settings, but some features may not function properly.',
      card7Text: 'This policy may be revised in response to legal amendments or business changes. Important changes will be announced on this website.',
      card8Text: 'For inquiries regarding this policy, please contact us below:',
      contactCompanyHtml: 'Company: CoRevo Inc.',
      contactEmailHtml: 'Email: <a href="mailto:info@corevo.co.jp">info@corevo.co.jp</a>',
      contactPhoneHtml: 'Phone: <a href="tel:0424480664">04-2448-0664</a>',
      enactedDate: 'Enacted on: March 6, 2026'
    },
    zh: {
      heroLabel: '隐私政策',
      heroTitle: '隐私政策',
      heroDesc: 'CoRevo Inc.（以下简称“本公司”）将妥善保护个人信息，并依照相关法律法规进行处理。',
      headings: [
        '1. 我们收集的信息',
        '2. 使用目的',
        '3. 向第三方提供',
        '4. 安全管理措施',
        '5. 关于公开 / 更正 / 删除等请求',
        '6. 关于 Cookie 的使用',
        '7. 政策修订',
        '8. 联系方式'
      ],
      card1Text: '本公司可能通过联系表单等渠道收集以下信息：',
      card1Items: [
        '姓名、公司名、职位、电子邮箱、电话号码',
        '咨询内容及其他表单填写信息',
        '访问日志、Cookie 等技术信息（用于网站优化）'
      ],
      card2Text: '所获取的个人信息将用于以下范围：',
      card2Items: [
        '回复咨询、联系及资料发送',
        '服务提供、方案建议与报价支持',
        '招聘相关联系与选考流程',
        '用于服务质量提升与网站改进分析'
      ],
      card3Text: '除法律规定外，未经本人同意，本公司不会向第三方提供个人信息。但在实现使用目的所必需的范围内，可能向受托方披露必要信息。',
      card4Text: '为防止个人信息被非法访问、泄露、丢失或篡改，本公司将实施适当的安全措施，并在必要时进行审查与改进。',
      card5Text: '若本人提出对个人信息的公开、更正、停止使用或删除等请求，本公司将在确认本人身份后，依据相关法律在合理范围内迅速处理。',
      card6Text: '本网站可能为提升便利性和进行访问分析而使用 Cookie。你可通过浏览器设置禁用 Cookie，但部分功能可能无法正常使用。',
      card7Text: '本政策可能根据法律修订或业务内容变化进行调整。若有重要变更，将在本网站公告。',
      card8Text: '如对本政策有任何疑问，请通过以下方式联系：',
      contactCompanyHtml: '公司名：CoRevo Inc.',
      contactEmailHtml: '邮箱：<a href="mailto:info@corevo.co.jp">info@corevo.co.jp</a>',
      contactPhoneHtml: '电话：<a href="tel:0424480664">04-2448-0664</a>',
      enactedDate: '制定日期：2026年3月6日'
    }
  };

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  }

  function setHtml(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.innerHTML = value;
    });
  }

  function setList(selector, values) {
    if (!Array.isArray(values)) return;
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node, idx) => {
      if (values[idx] !== undefined) {
        node.textContent = values[idx];
      }
    });
  }

  function setHtmlList(selector, values) {
    if (!Array.isArray(values)) return;
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node, idx) => {
      if (values[idx] !== undefined) {
        node.innerHTML = values[idx];
      }
    });
  }

  function setAttr(selector, name, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.setAttribute(name, value);
    });
  }

  function markNoTranslate(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add('notranslate');
    });
  }

  function applyCommon(lang) {
    const t = COMMON[lang] || COMMON.ja;
    document.documentElement.lang = t.htmlLang;

    setText('.header .nav__link[data-index="01"], .nav-mobile .nav__link[data-index="01"]', t.navTop);
    setText('.header .nav__link[data-index="02"], .nav-mobile .nav__link[data-index="02"]', t.navServices);
    setText('.header .nav__link[data-index="03"], .nav-mobile .nav__link[data-index="03"]', t.navRecruit);
    setText('.header .nav__link[data-index="04"], .nav-mobile .nav__link[data-index="04"]', t.navAbout);
    setText('.header .nav__link[data-index="05"], .nav-mobile .nav__link[data-index="05"]', t.navContact);
    setText('.header__cta .btn', t.ctaContact);
    setText('.nav-mobile > .btn.btn--primary.mt-4', t.ctaContact);
    setAttr('.menu-btn', 'aria-label', t.menuAriaLabel);

    setHtml('.footer__tagline', t.footerTagline);
    setText('footer .footer__grid > div:nth-child(2) .footer__heading', t.footerCompany);
    setText('footer .footer__grid > div:nth-child(4) .footer__heading', t.footerContact);
    setList('footer .footer__grid > div:nth-child(2) .footer__links a', t.companyLinks);
    setText('footer .footer__bottom span:nth-child(2)', t.engineered);

    if (page === 'privacy-policy') {
      setText('footer .footer__grid > div:nth-child(3) .footer__heading', t.footerSupport);
      setList('footer .footer__grid > div:nth-child(3) .footer__links a', t.supportLinks);
    } else {
      setText('footer .footer__grid > div:nth-child(3) .footer__heading', t.footerServices);
      setList('footer .footer__grid > div:nth-child(3) .footer__links a', t.serviceLinks);
    }

    setHtml('footer .footer__grid > div:nth-child(4) .footer__links li:last-child', t.addressHtml);
    setHtml('.contact-info-item:nth-child(3) .contact-info-item__value', t.addressHtml);
    setText('.contact-info-item:nth-child(3) .contact-info-item__label', t.addressLabel);
    setHtml('.profile__table tr:nth-child(7) td', t.addressHtml);
    setText('.policy-card:nth-child(8) li:nth-child(4)', t.addressPrefix + t.addressLine);

    markNoTranslate('.lang-switch, .lang-switch *');
    markNoTranslate('.header .nav__link, .nav-mobile .nav__link');
    markNoTranslate('.header__cta .btn, .nav-mobile > .btn.btn--primary.mt-4');
    markNoTranslate('footer .footer__heading, footer .footer__links a, footer .footer__bottom span:nth-child(2)');
    markNoTranslate('footer .footer__grid > div:nth-child(4) .footer__links li:last-child');
    markNoTranslate('.contact-info-item:nth-child(3) .contact-info-item__label, .contact-info-item:nth-child(3) .contact-info-item__value');
    markNoTranslate('.profile__table tr:nth-child(7) td');
    markNoTranslate('.policy-card:nth-child(8) li:nth-child(4)');
  }

  function applyPageMeta(lang) {
    const m = PAGE_META[page];
    if (!m) return;
    const t = m[lang] || m.ja;

    document.title = t.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t.desc);

    if (page === 'about') {
      setText('.page-hero__desc', t.heroDesc);
      markNoTranslate('.page-hero__desc');
    }

    if (page === 'services') {
      setHtml('.page-hero__title', t.heroTitle);
      setText('.page-hero__desc', t.heroDesc);
      markNoTranslate('.page-hero__title, .page-hero__desc');
    }
  }

  function applyContactForm(lang) {
    if (page !== 'contact') return;
    const t = CONTACT_FORM_I18N[lang] || CONTACT_FORM_I18N.ja;

    setAttr('#name', 'placeholder', t.namePlaceholder);
    setAttr('#company', 'placeholder', t.companyPlaceholder);
    setAttr('#position', 'placeholder', t.positionPlaceholder);
    setAttr('#message', 'placeholder', t.messagePlaceholder);

    const budgetOptions = document.querySelectorAll('#budget option');
    budgetOptions.forEach((option, index) => {
      if (t.budgetOptions[index] !== undefined) {
        option.textContent = t.budgetOptions[index];
      }
    });

    const sendBtn = document.querySelector('#contactForm button[type="submit"]');
    if (sendBtn) {
      sendBtn.textContent = t.sendButton;
    }
  }

  function applyServicesContent(lang) {
    const t = PAGE_CONTENT.services[lang];
    if (!t) return;

    setText('.page-hero__label', t.heroLabel);
    setHtml('.page-hero__title', t.heroTitle);
    setText('.page-hero__desc', t.heroDesc);
    setHtmlList('.service-section__badge', t.badges);
    setHtmlList('.service-section__title', t.sectionTitles);
    setList('.service-section__desc', t.sectionDescs);
    setList('#ses .feature-list__item', t.sesFeatures);
    setList('#dev .feature-list__item', t.devFeatures);
    setList('#cloud .feature-list__item', t.cloudFeatures);
    setList('#consulting .feature-list__item', t.consultFeatures);
    setText('#ses .btn.btn--primary', t.sectionBtns[0]);
    setText('#dev .btn.btn--primary', t.sectionBtns[1]);
    setText('#cloud .btn.btn--primary', t.sectionBtns[2]);
    setText('#consulting .btn.btn--primary', t.sectionBtns[3]);
    setText('#ses .service-panel__body > p', t.skillSetLabel);
    setHtml('#ses .stat-item:nth-child(1) .stat-item__num', t.statNums[0]);
    setHtml('#ses .stat-item:nth-child(2) .stat-item__num', t.statNums[1]);
    setHtml('#ses .stat-item:nth-child(3) .stat-item__num', t.statNums[2]);
    setList('#ses .stat-item__label', t.statLabels);
    setText('#dev .service-panel__body > div:first-child', t.devFlowLabel);
    setList('#dev .consult-step__name', t.devStepNames);
    setList('#dev .consult-step__desc', t.devStepDescs);
    setText('#consulting .service-panel__body > div:first-child', t.consultFlowLabel);
    setList('#consulting .consult-step__name', t.consultStepNames);
    setList('#consulting .consult-step__desc', t.consultStepDescs);
    setHtml('.pricing-note__title', t.pricingTitle);
    setText('.pricing-note__desc', t.pricingDesc);
    setText('.pricing-note__inner .btn.btn--primary', t.pricingPrimary);
    setText('.pricing-note__inner .btn.btn--ghost', t.pricingSecondary);
    setHtml('.faq .section-title', t.faqTitle);
    setHtmlList('.faq__question', t.faqQuestions.map((q) => `${q}<span class="faq__arrow">▶</span>`));
    setList('.faq__answer', t.faqAnswers);
    setText('.cta-strip .section-label', t.ctaLabel);
    setHtml('.cta-strip__title', t.ctaTitle);
    setText('.cta-strip__desc', t.ctaDesc);
    setText('.cta-strip__actions .btn.btn--primary', t.ctaPrimary);
    setText('.cta-strip__actions .btn.btn--outline', t.ctaSecondary);
  }

  function applyRecruitContent(lang) {
    const t = PAGE_CONTENT.recruit[lang];
    if (!t) return;

    setText('.page-hero__label', t.heroLabel);
    setHtml('.page-hero__title', t.heroTitle);
    setText('.page-hero__desc', t.heroDesc);
    setText('.page-hero .btn.btn--purple', t.heroPrimary);
    setText('.page-hero .btn.btn--ghost', t.heroSecondary);
    setHtml('.culture-metrics .section-title', t.metricsTitle);
    setHtml('.metrics-grid .metric-item:nth-child(1) .metric-item__num', t.metricNums[0]);
    setHtml('.metrics-grid .metric-item:nth-child(2) .metric-item__num', t.metricNums[1]);
    setHtml('.metrics-grid .metric-item:nth-child(3) .metric-item__num', t.metricNums[2]);
    setText('.metrics-grid .metric-item:nth-child(4) .metric-item__num', t.metricNums[3]);
    setList('.metrics-grid .metric-item__label', t.metricLabels);
    setHtml('.values .section-title', t.valuesTitle);
    setList('.values .value-card__desc', t.valueDescs);
    setHtml('.career .section-title', t.careerTitle);
    setList('.career-step__title', t.careerStepTitles);
    setList('.career-step__years', t.careerStepYears);
    setList('.career-step__desc', t.careerStepDescs);
    setList('.benefit-item__name', t.benefitNames);
    setList('.benefit-item__desc', t.benefitDescs);
    setHtml('.jobs .section-title', t.jobsTitle);
    setList('.jobs .job-item .tag', t.jobTags);
    setList('.jobs .job-item__title', t.jobTitles);
    setList('.jobs .job-item__meta-item', t.jobMetas);
    setHtml('.recruit-process .section-title', t.processTitle);
    setText('.recruit-process .section-desc', t.processDesc);
    setList('.recruit-step__title', t.processStepTitles);
    setList('.recruit-step__desc', t.processStepDescs);
    setText('.cta-strip .section-label', t.ctaLabel);
    setHtml('.cta-strip__title', t.ctaTitle);
    setText('.cta-strip__desc', t.ctaDesc);
    setText('.cta-strip__actions .btn.btn--purple', t.ctaPrimary);
    setText('.cta-strip__actions .btn.btn--outline', t.ctaSecondary);
  }

  function applyAboutContent(lang) {
    const t = PAGE_CONTENT.about[lang];
    if (!t) return;

    setText('.page-hero__desc', t.heroDesc);
    setList('.numbers .number-item__label', t.numberLabels);
    setAttr('.numbers .number-item:nth-child(1) [data-target]', 'data-suffix', t.numberSuffixes[0]);
    setAttr('.numbers .number-item:nth-child(2) [data-target]', 'data-suffix', t.numberSuffixes[1]);
    setAttr('.numbers .number-item:nth-child(3) [data-target]', 'data-suffix', t.numberSuffixes[2]);
    setText('.numbers .number-item:nth-child(1) [data-target]', `1${t.numberSuffixes[0]}`);
    setText('.numbers .number-item:nth-child(2) [data-target]', `5${t.numberSuffixes[1]}`);
    setText('.numbers .number-item:nth-child(3) [data-target]', `0${t.numberSuffixes[2]}`);
    setText('.numbers .number-item:nth-child(4) .number-item__value span', t.numberDirect);
    setHtml('.mission__content h2', t.missionTitle);
    setText('.mission__content > p:nth-of-type(2)', t.missionPara1);
    setText('.mission__content > p:nth-of-type(3)', t.missionPara2);
    setHtml('.mission__content > p:nth-of-type(4)', t.missionVisionHtml);
    setHtml('.values .section-title', t.valuesTitle);
    setText('.values .section-desc', t.valuesDesc);
    setList('.values .value-card__desc', t.valueDescs);
    setText('.message .section-title', t.messageTitle);
    setHtml('.message__quote', t.messageQuote);
    setList('.message__body p', t.messageParas);
    setText('.profile .section-title', t.profileTitle);
    setList('.profile__table th', t.profileHeaders);
    setHtml('.profile__table tr:nth-child(1) td', t.profileValues[0]);
    setHtml('.profile__table tr:nth-child(2) td', t.profileValues[1]);
    setHtml('.profile__table tr:nth-child(3) td', t.profileValues[2]);
    setHtml('.profile__table tr:nth-child(4) td', t.profileValues[3]);
    setHtml('.profile__table tr:nth-child(5) td', t.profileValues[4]);
    setHtml('.profile__table tr:nth-child(6) td', t.profileValues[5]);
    setHtml('.profile__table tr:nth-child(7) td', t.profileValues[6]);
    setHtml('.profile__table tr:nth-child(8) td', t.profileValues[7]);
    setHtml('.profile__table tr:nth-child(9) td', t.profileValues[8]);
    setText('.history .section-title', t.historyTitle);
    setText('.timeline__title', t.timelineTitle);
    setText('.timeline__desc', t.timelineDesc);
    setText('.cta-strip .section-label', t.ctaLabel);
    setHtml('.cta-strip__title', t.ctaTitle);
    setText('.cta-strip__desc', t.ctaDesc);
    setText('.cta-strip__actions .btn.btn--primary', t.ctaPrimary);
    setText('.cta-strip__actions .btn.btn--purple', t.ctaSecondary);
  }

  function applyContactContent(lang) {
    const t = PAGE_CONTENT.contact[lang];
    if (!t) return;

    setText('.page-hero__eyebrow', t.heroEyebrow);
    setHtml('.page-hero__title', t.heroTitle);
    setText('.page-hero__desc', t.heroDesc);
    setText('.form-heading', t.formHeading);
    setHtml('.form-sub', t.formSub);
    setText('.contact-form-area > div[style*="margin-bottom:2rem"] > .form-label', t.inquiryLabel);
    setList('.inquiry-tab', t.inquiryTabs);
    setHtml('label[for="name"]', `${t.nameLabel} <span class="required">*</span>`);
    setHtml('label[for="company"]', `${t.companyLabel} <span class="required">*</span>`);
    setHtml('label[for="email"]', `${t.emailLabel} <span class="required">*</span>`);
    setText('label[for="phone"]', t.phoneLabel);
    setText('label[for="position"]', t.positionLabel);
    setText('label[for="budget"]', t.budgetLabel);
    setHtml('label[for="message"]', `${t.messageLabel} <span class="required">*</span>`);
    setText('.form-note', t.formNote);
    setHtml('.privacy-consent label', t.privacyLabel);
    setHtml('.form-submit-note', t.submitNote);
    setText('.success-title', t.successTitle);
    setHtml('.success-desc', t.successDesc);
    setText('.contact-sidebar .sidebar-card:nth-child(1) .sidebar-card__label', t.directLabel);
    setText('.contact-sidebar .sidebar-card:nth-child(2) .sidebar-card__label', t.quickLabel);
    setText('.contact-sidebar .sidebar-card:nth-child(2) .sidebar-card__title', t.quickTitle);
    setText('.contact-sidebar .sidebar-card:nth-child(3) .sidebar-card__label', t.responseLabel);
    setList('.contact-info-item__label', t.contactInfoLabels);
    setHtml('.hours-badge', `<div class="hours-badge__dot"></div>${t.hoursText}`);
    setList('.faq-item', t.quickLinks);
    setHtmlList('.contact-sidebar .sidebar-card:nth-child(3) [style*="font-size:0.75rem"]', t.responseCaptions);
    setHtml('.contact-sidebar .sidebar-card:nth-child(3) > p[style*="font-size:0.8rem"]', t.responseNote);
  }

  function applyPrivacyPolicyContent(lang) {
    const t = PAGE_CONTENT['privacy-policy'][lang];
    if (!t) return;

    setText('.policy-hero .section-label', t.heroLabel);
    setText('.policy-hero .section-title', t.heroTitle);
    setText('.policy-hero .section-desc', t.heroDesc);

    setList('.policy-card h2', t.headings);

    setText('.policy-card:nth-child(1) > p', t.card1Text);
    setList('.policy-card:nth-child(1) li', t.card1Items);

    setText('.policy-card:nth-child(2) > p', t.card2Text);
    setList('.policy-card:nth-child(2) li', t.card2Items);

    setText('.policy-card:nth-child(3) > p', t.card3Text);
    setText('.policy-card:nth-child(4) > p', t.card4Text);
    setText('.policy-card:nth-child(5) > p', t.card5Text);
    setText('.policy-card:nth-child(6) > p', t.card6Text);
    setText('.policy-card:nth-child(7) > p', t.card7Text);

    setText('.policy-card:nth-child(8) > p:not(.policy-meta)', t.card8Text);
    setHtml('.policy-card:nth-child(8) li:nth-child(1)', t.contactCompanyHtml);
    setHtml('.policy-card:nth-child(8) li:nth-child(2)', t.contactEmailHtml);
    setHtml('.policy-card:nth-child(8) li:nth-child(3)', t.contactPhoneHtml);
    setText('.policy-card:nth-child(8) .policy-meta', t.enactedDate);
  }

  function applyPageContent(lang) {
    if (lang === 'ja') return;
    if (page === 'services') applyServicesContent(lang);
    if (page === 'recruit') applyRecruitContent(lang);
    if (page === 'about') applyAboutContent(lang);
    if (page === 'contact') applyContactContent(lang);
    if (page === 'privacy-policy') applyPrivacyPolicyContent(lang);
  }

  function updateButtons(lang) {
    langButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function setLanguage(lang) {
    const resolved = SUPPORTED_LANGS.includes(lang) ? lang : 'ja';
    const previous = currentLang;

    if (resolved === 'ja' && previous && previous !== 'ja') {
      localStorage.setItem(LANG_STORAGE_KEY, resolved);
      window.location.reload();
      return;
    }

    localStorage.setItem(LANG_STORAGE_KEY, resolved);
    applyCommon(resolved);
    applyPageMeta(resolved);
    applyContactForm(resolved);
    applyPageContent(resolved);
    updateButtons(resolved);

    currentLang = resolved;
  }

  const initialLang = localStorage.getItem(LANG_STORAGE_KEY) || 'ja';
  setLanguage(initialLang);

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });
})();

function encodeFormData(formData) {
  return new URLSearchParams(formData).toString();
}

const liveContactForm = document.getElementById('contactForm');
if (liveContactForm) {
  const privacyCheckbox = liveContactForm.querySelector('#privacy');
  const submitBtn = liveContactForm.querySelector('[type="submit"]');

  const syncSubmitState = () => {
    if (!submitBtn) return;
    const enabled = !privacyCheckbox || privacyCheckbox.checked;
    submitBtn.disabled = !enabled;
    submitBtn.setAttribute('aria-disabled', enabled ? 'false' : 'true');
  };

  if (privacyCheckbox) {
    privacyCheckbox.addEventListener('change', syncSubmitState);
    syncSubmitState();
  }

  liveContactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!liveContactForm.checkValidity()) {
      liveContactForm.reportValidity();
      return;
    }

    const btn = liveContactForm.querySelector('[type="submit"]');
    const original = btn.textContent;
    const successMsg = document.getElementById('formSuccess');
    const typeInput = document.getElementById('inquiryType');

    if (typeInput && !typeInput.name) {
      typeInput.name = 'inquiry_type';
    }

    btn.textContent = 'SENDING...';
    btn.disabled = true;

    try {
      const formData = new FormData(liveContactForm);
      const response = await fetch(liveContactForm.getAttribute('action') || window.location.pathname, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encodeFormData(formData)
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      if (successMsg) {
        liveContactForm.style.display = 'none';
        successMsg.style.display = 'block';
      } else {
        liveContactForm.reset();
      }
    } catch (error) {
      window.alert('送信に失敗しました。時間をおいて再度お試しください。');
      btn.textContent = original;
      btn.disabled = false;
      return;
    }

    btn.textContent = original;
    btn.disabled = false;
  });
}

/*
// ----------------------------------------
// Form submission (mock)
// ----------------------------------------
const contactFormLegacy = null;
if (contactFormLegacy) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'SENDING...';
    btn.disabled = true;

    setTimeout(() => {
      const successMsg = document.getElementById('formSuccess');
      if (successMsg) {
        contactForm.style.display = 'none';
        successMsg.style.display = 'block';
      } else {
        btn.textContent = 'SENT ✓';
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          contactForm.reset();
        }, 2000);
      }
    }, 1200);
  });
}

*/
// ----------------------------------------
// Smooth hover glow on cards (optional extra)
// ----------------------------------------
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  });
});

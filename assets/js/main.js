
(function(){
  const LANG_KEY="corevo_lang_v3";
  const langs=[
    {code:"ja", label:"JP"},
    {code:"en", label:"EN"},
    {code:"zh", label:"中文"},
    {code:"ko", label:"한국어"},
  ];

  const T={
    ja:{
      sec_cases:"事例",
      sec_cases_sub:"提供実績の一部（サンプル）をご紹介します。",
      case1_k:"クラウド移行",
      case1_t:"AWSで高可用アーキテクチャへ刷新",
      case1_d:"設計レビュー、IaC、監視、移行まで伴走。",
      case2_k:"データ基盤",
      case2_t:"セキュアなデータパイプライン構築",
      case2_d:"ETL、権限管理、監査ログ、コスト最適化。",
      case3_k:"グローバル",
      case3_t:"多言語・時差を前提にしたチーム開発",
      case3_d:"プロセス設計、QA、関係者コミュニケーション。",
      read_story:"事例を見る",
      blog_read_more:"続きを読む",
      post_coreconnect_h2:"自社SaaS『CoreConnect』リリース",
      post_coreconnect_b1:"業務効率化を支援する新プロダクトを公開しました。",
      post_coreconnect_b2:"導入・運用まで見据えた設計と、スピーディな改善サイクルで価値を積み上げます。",
      post_aiiot_h2:"AI × IoT の取り組み",
      post_aiiot_b1:"PoCから本番導入まで伴走した事例を紹介します。",
      post_aiiot_b2:"セキュリティと可観測性を前提に、安定運用まで支援します。",
      case_aws_h2:"AWSで高可用アーキテクチャへ刷新",
      case_aws_b1:"要件整理から設計レビュー、IaC、移行まで一気通貫で支援。",
      case_aws_b2:"段階リリースと監視整備で、止めない移行を実現します。",
      case_data_h2:"セキュアなデータパイプライン構築",
      case_data_b1:"ETL・権限・監査ログを設計し、運用できる基盤へ。",
      case_data_b2:"コストと性能を見ながら継続改善します。",
      case_global_h2:"多言語・時差を前提にしたチーム開発",
      case_global_b1:"品質基準とコミュニケーション設計でブレを抑えます。",
      case_global_b2:"PMO・QA・運用まで含めて支援します。",

      // nav
      nav_home:"ホーム",
      nav_services:"サービス",
      nav_services_ses:"SES",
      nav_services_product:"自社開発",
      nav_services_global:"グローバル開発",
      nav_company:"会社情報",
      nav_company_about:"会社概要",
      nav_company_profile:"会社情報",
      nav_security:"セキュリティ",
      nav_news:"ニュース",
      nav_contact:"お問い合わせ",
      cta_contact:"お問い合わせ",
      // hero
      hero_kicker:"Technology Partner for Your Business",
      hero_title_top:"Co-Creation for the Future",
      hero_title_main:"共創で未来を変える",
      hero_sub:"株式会社CoRevoは、SES・自社開発・グローバル開発を通じて、企業の成長を支えるテクノロジーパートナーです。",
      hero_btn:"サービスを見る",
      pill_ses:"SES",
      pill_solutions:"Solutions",
      pill_global:"Global Development",
      // metrics
      m_projects:"Projects",
      m_areas:"Areas",
      m_languages:"Languages",
      m_retention:"Retention",
      m_members:"Global Members",
      // sections
      sec_services:"Our Services",
      sec_services_sub:"課題に合わせた最適な体制と開発支援をご提供します。",
      svc1_title:"SES",
      svc1_sub:"System Engineering Services",
      svc1_desc:"常駐/リモート体制提案、スキルマッチ、運用支援まで。",
      svc2_title:"Solutions",
      svc2_sub:"In-house Development",
      svc2_desc:"Web / Cloud / DX の実装をスピーディに。要件から運用まで。",
      svc3_title:"Global Development",
      svc3_sub:"Offshore & Nearshore",
      svc3_desc:"多言語・時差を前提に、品質とスピードを両立。",
      learn_more:"Learn More",
      // clients
      sec_clients:"Our Clients",
      sec_clients_sub:"さまざまな業種の企業様からご信頼いただいています。",
      // news
      sec_news:"News & Blog",
      view_all_news:"View All News",
      news1_title:"自社SaaS『CoreConnect』リリース",
      news1_desc:"業務効率化を支援する新プロダクトを公開しました。",
      news2_title:"AI × IoT の取り組み",
      news2_desc:"PoCから本番導入まで伴走した事例を紹介します。",
      tag_news:"News",
      tag_blog:"Blog",
      // security
      sec_scp_title:"Security / Compliance / Process",
      sec_scp_sub:"企業案件で求められる、安心の体制とプロセス。",
      scp_sec:"Security",
      scp_sec_desc:"最小権限・監査ログ・標準運用",
      scp_comp:"Compliance",
      scp_comp_desc:"情報管理・規程整備・契約順守",
      scp_proc:"Process",
      scp_proc_desc:"Agile / DevOps / PMO / Global Delivery",
      // contact panel
      contact_panel_title:"Contact Us",
      contact_email_label:"Email",
      contact_name:"Name",
      contact_email:"Email",
      contact_message:"Message",
      contact_submit:"Submit",
      contact_hint:"※フォームはNetlify Formsで受信します。",
      // footer
      footer_company:"株式会社 CoRevo",
      footer_links_services:"Services",
      footer_links_company:"Company",
      footer_links_security:"Security",
      footer_links_news:"News",
      footer_links_contact:"Contact",
      // pages
      page_services_title:"サービス",
      page_company_title:"会社情報",
      page_about_title:"会社概要",
      page_security_title:"セキュリティ",
      page_news_title:"ニュース / ブログ",
      page_contact_title:"お問い合わせ",
      thanks_title:"送信完了",
      thanks_msg:"送信ありがとうございます。内容を確認の上、ご連絡いたします。",
      back_home:"ホームへ戻る",
    },
    en:{
      sec_cases:"Case Studies",
      sec_cases_sub:"Selected delivery examples (placeholders).",
      case1_k:"Cloud Migration",
      case1_t:"High-availability redesign on AWS",
      case1_d:"Architecture review, IaC, observability, and rollout support.",
      case2_k:"Data Platform",
      case2_t:"Secure data pipeline and governance",
      case2_d:"ETL, access control, audit logging, and cost optimization.",
      case3_k:"Global Delivery",
      case3_t:"Bilingual team delivery across time zones",
      case3_d:"Process design, QA, and stakeholder communication.",
      read_story:"Read story",
      blog_read_more:"Read more",
      post_coreconnect_h2:"New SaaS “CoreConnect” released",
      post_coreconnect_b1:"We launched a product to streamline business operations.",
      post_coreconnect_b2:"We compound value through an iterative build-and-improve cycle.",
      post_aiiot_h2:"AI × IoT initiatives",
      post_aiiot_b1:"A delivery story from PoC to production rollout.",
      post_aiiot_b2:"We build with security and observability to ensure stable operations.",
      case_aws_h2:"High-availability redesign on AWS",
      case_aws_b1:"End-to-end support: discovery, review, IaC, and migration.",
      case_aws_b2:"Staged rollout and observability enable no-downtime migration.",
      case_data_h2:"Secure data pipeline and governance",
      case_data_b1:"Design ETL, access control, and audit logs for operable platforms.",
      case_data_b2:"Continuously optimize cost and performance.",
      case_global_h2:"Bilingual team delivery across time zones",
      case_global_b1:"Quality standards and comms design reduce variance.",
      case_global_b2:"We support PMO, QA, and operations.",

      nav_home:"Home",
      nav_services:"Services",
      nav_services_ses:"SES",
      nav_services_product:"Product",
      nav_services_global:"Global",
      nav_company:"Company",
      nav_company_about:"About",
      nav_company_profile:"Profile",
      nav_security:"Security",
      nav_news:"News",
      nav_contact:"Contact",
      cta_contact:"Contact Us",
      hero_kicker:"Technology Partner for Your Business",
      hero_title_top:"Co-Creation for the Future",
      hero_title_main:"Move the future forward",
      hero_sub:"CoRevo delivers SES, in-house development, and global delivery—balancing speed and quality for enterprise clients.",
      hero_btn:"View Our Services",
      pill_ses:"SES",
      pill_solutions:"Solutions",
      pill_global:"Global Development",
      m_projects:"Projects",
      m_areas:"Areas",
      m_languages:"Languages",
      m_retention:"Retention",
      m_members:"Global Members",
      sec_services:"Our Services",
      sec_services_sub:"A practical delivery model tailored to your business goals.",
      svc1_title:"SES",
      svc1_sub:"System Engineering Services",
      svc1_desc:"Staffing, skill matching, and operational support—remote or onsite.",
      svc2_title:"Solutions",
      svc2_sub:"In-house Development",
      svc2_desc:"Web / Cloud / DX implementation from discovery to operations.",
      svc3_title:"Global Development",
      svc3_sub:"Offshore & Nearshore",
      svc3_desc:"Bilingual delivery with quality-by-design across time zones.",
      learn_more:"Learn More",
      sec_clients:"Our Clients",
      sec_clients_sub:"Trusted by companies across industries.",
      sec_news:"News & Blog",
      view_all_news:"View All News",
      news1_title:"New SaaS “CoreConnect” released",
      news1_desc:"We launched a product to streamline business operations.",
      news2_title:"AI × IoT initiatives",
      news2_desc:"A delivery story from PoC to production rollout.",
      tag_news:"News",
      tag_blog:"Blog",
      sec_scp_title:"Security / Compliance / Process",
      sec_scp_sub:"Reliable practices enterprise clients expect.",
      scp_sec:"Security",
      scp_sec_desc:"Least privilege, audit logs, operational standards",
      scp_comp:"Compliance",
      scp_comp_desc:"Information governance and contract adherence",
      scp_proc:"Process",
      scp_proc_desc:"Agile / DevOps / PMO / Global Delivery",
      contact_panel_title:"Contact Us",
      contact_email_label:"Email",
      contact_name:"Name",
      contact_email:"Email",
      contact_message:"Message",
      contact_submit:"Submit",
      contact_hint:"*Collected via Netlify Forms.",
      footer_company:"CoRevo Inc.",
      footer_links_services:"Services",
      footer_links_company:"Company",
      footer_links_security:"Security",
      footer_links_news:"News",
      footer_links_contact:"Contact",
      page_services_title:"Services",
      page_company_title:"Company",
      page_about_title:"About",
      page_security_title:"Security",
      page_news_title:"News / Blog",
      page_contact_title:"Contact",
      thanks_title:"Thank you",
      thanks_msg:"We received your message and will get back to you soon.",
      back_home:"Back to Home",
    },
    zh:{
      sec_cases:"案例",
      sec_cases_sub:"精选交付示例（占位样例）。",
      case1_k:"云迁移",
      case1_t:"在 AWS 上重构高可用架构",
      case1_d:"架构评审、IaC、可观测性与上线支持。",
      case2_k:"数据平台",
      case2_t:"安全的数据管道与治理",
      case2_d:"ETL、权限控制、审计日志与成本优化。",
      case3_k:"全球交付",
      case3_t:"跨时区多语言团队交付",
      case3_d:"流程设计、QA 与干系人沟通。",
      read_story:"查看案例",
      blog_read_more:"阅读更多",
      post_coreconnect_h2:"自社SaaS『CoreConnect』发布",
      post_coreconnect_b1:"发布了支持业务效率提升的新产品。",
      post_coreconnect_b2:"通过持续迭代的方式沉淀价值。",
      post_aiiot_h2:"AI × IoT 的实践",
      post_aiiot_b1:"从 PoC 到上线的交付案例分享。",
      post_aiiot_b2:"以安全与可观测性为前提支援稳定运维。",
      case_aws_h2:"在 AWS 上重构高可用架构",
      case_aws_b1:"从需求到评审、IaC 与迁移的一体化支持。",
      case_aws_b2:"分阶段发布与监控体系保障不停机迁移。",
      case_data_h2:"安全的数据管道与治理",
      case_data_b1:"设计 ETL、权限与审计日志，形成可运营平台。",
      case_data_b2:"持续优化成本与性能。",
      case_global_h2:"跨时区多语言团队交付",
      case_global_b1:"以质量标准与沟通设计降低波动。",
      case_global_b2:"支持 PMO、QA 与运维。",

      nav_home:"首页",
      nav_services:"服务",
      nav_services_ses:"SES",
      nav_services_product:"自社开发",
      nav_services_global:"海外交付",
      nav_company:"公司",
      nav_company_about:"公司介绍",
      nav_company_profile:"公司信息",
      nav_security:"安全",
      nav_news:"新闻",
      nav_contact:"联系",
      cta_contact:"联系我们",
      hero_kicker:"面向企业的技术伙伴",
      hero_title_top:"Co-Creation for the Future",
      hero_title_main:"以共创改变未来",
      hero_sub:"CoRevo 提供 SES 技术支援、自社开发与海外交付，兼顾速度与质量，服务企业客户。",
      hero_btn:"查看服务",
      pill_ses:"SES",
      pill_solutions:"Solutions",
      pill_global:"Global Development",
      m_projects:"项目数",
      m_areas:"领域数",
      m_languages:"支持语言",
      m_retention:"续约率",
      m_members:"全球成员",
      sec_services:"我们的服务",
      sec_services_sub:"根据业务目标提供可落地的交付体系。",
      svc1_title:"SES",
      svc1_sub:"系统工程服务",
      svc1_desc:"驻场/远程体制、技能匹配、运维支持。",
      svc2_title:"Solutions",
      svc2_sub:"自社开发 / 解决方案",
      svc2_desc:"Web / Cloud / DX 从需求到运维的一体化实现。",
      svc3_title:"Global Development",
      svc3_sub:"离岸 & 近岸交付",
      svc3_desc:"多语言、多时区下的高质量交付。",
      learn_more:"了解更多",
      sec_clients:"合作客户",
      sec_clients_sub:"获得多行业客户的信赖。",
      sec_news:"新闻 & 博客",
      view_all_news:"查看全部新闻",
      news1_title:"自社SaaS『CoreConnect』发布",
      news1_desc:"发布了支持业务效率提升的新产品。",
      news2_title:"AI × IoT 的实践",
      news2_desc:"从 PoC 到上线的交付案例分享。",
      tag_news:"新闻",
      tag_blog:"博客",
      sec_scp_title:"安全 / 合规 / 流程",
      sec_scp_sub:"企业项目所期待的可靠实践。",
      scp_sec:"安全",
      scp_sec_desc:"最小权限、审计日志、标准运维",
      scp_comp:"合规",
      scp_comp_desc:"信息治理、制度建设、合同遵循",
      scp_proc:"流程",
      scp_proc_desc:"敏捷 / DevOps / PMO / 全球交付",
      contact_panel_title:"联系我们",
      contact_email_label:"邮箱",
      contact_name:"姓名",
      contact_email:"邮箱",
      contact_message:"内容",
      contact_submit:"提交",
      contact_hint:"※通过 Netlify Forms 收集。",
      footer_company:"株式会社 CoRevo",
      footer_links_services:"服务",
      footer_links_company:"公司",
      footer_links_security:"安全",
      footer_links_news:"新闻",
      footer_links_contact:"联系",
      page_services_title:"服务",
      page_company_title:"公司信息",
      page_about_title:"公司介绍",
      page_security_title:"安全",
      page_news_title:"新闻 / 博客",
      page_contact_title:"联系",
      thanks_title:"已提交",
      thanks_msg:"我们已收到你的信息，会尽快与您联系。",
      back_home:"返回首页",
    },
    ko:{
      sec_cases:"사례",
      sec_cases_sub:"선정된 딜리버리 예시(샘플)입니다.",
      case1_k:"클라우드 마이그레이션",
      case1_t:"AWS 고가용성 아키텍처로 재설계",
      case1_d:"아키텍처 리뷰, IaC, 관측성, 전환 지원.",
      case2_k:"데이터 플랫폼",
      case2_t:"보안 데이터 파이프라인과 거버넌스",
      case2_d:"ETL, 접근 제어, 감사 로그, 비용 최적화.",
      case3_k:"글로벌 딜리버리",
      case3_t:"다국어·시차 기반 팀 딜리버리",
      case3_d:"프로세스 설계, QA, 이해관계자 커뮤니케이션.",
      read_story:"사례 보기",
      blog_read_more:"더 보기",
      post_coreconnect_h2:"자사 SaaS ‘CoreConnect’ 출시",
      post_coreconnect_b1:"업무 효율화를 위한 신제품을 공개했습니다.",
      post_coreconnect_b2:"지속적인 개선 사이클로 가치를 축적합니다.",
      post_aiiot_h2:"AI × IoT 이니셔티브",
      post_aiiot_b1:"PoC부터 운영까지의 사례를 소개합니다.",
      post_aiiot_b2:"보안과 관측성을 전제로 안정 운영까지 지원합니다.",
      case_aws_h2:"AWS 고가용성 아키텍처로 재설계",
      case_aws_b1:"요구정의부터 리뷰, IaC, 전환까지 일괄 지원.",
      case_aws_b2:"단계적 릴리스와 모니터링으로 무중단 전환을 지원.",
      case_data_h2:"보안 데이터 파이프라인과 거버넌스",
      case_data_b1:"ETL·권한·감사 로그를 설계해 운영 가능한 기반으로.",
      case_data_b2:"비용과 성능을 지속적으로 최적화합니다.",
      case_global_h2:"다국어·시차 기반 팀 딜리버리",
      case_global_b1:"품질 기준과 커뮤니케이션 설계로 변동을 줄입니다.",
      case_global_b2:"PMO·QA·운영까지 지원합니다.",

      nav_home:"홈",
      nav_services:"서비스",
      nav_services_ses:"SES",
      nav_services_product:"자사 개발",
      nav_services_global:"글로벌",
      nav_company:"회사",
      nav_company_about:"회사 소개",
      nav_company_profile:"회사 정보",
      nav_security:"보안",
      nav_news:"뉴스",
      nav_contact:"문의",
      cta_contact:"문의하기",
      hero_kicker:"비즈니스를 위한 기술 파트너",
      hero_title_top:"Co-Creation for the Future",
      hero_title_main:"공동 창조로 미래를 바꿉니다",
      hero_sub:"CoRevo는 SES, 자사 개발, 글로벌 딜리버리를 제공하며 속도와 품질을 균형 있게 제공합니다.",
      hero_btn:"서비스 보기",
      pill_ses:"SES",
      pill_solutions:"Solutions",
      pill_global:"Global Development",
      m_projects:"프로젝트",
      m_areas:"분야",
      m_languages:"언어",
      m_retention:"리텐션",
      m_members:"글로벌 멤버",
      sec_services:"서비스",
      sec_services_sub:"비즈니스 목표에 맞춘 현실적인 딜리버리 모델.",
      svc1_title:"SES",
      svc1_sub:"시스템 엔지니어링 서비스",
      svc1_desc:"상주/원격 체계, 스킬 매칭, 운영 지원.",
      svc2_title:"Solutions",
      svc2_sub:"자사 개발 / 솔루션",
      svc2_desc:"Web / Cloud / DX를 요구정의부터 운영까지.",
      svc3_title:"Global Development",
      svc3_sub:"오프쇼어 & 니어쇼어",
      svc3_desc:"다국어·시차 환경에서도 품질 중심 딜리버리.",
      learn_more:"더 보기",
      sec_clients:"고객사",
      sec_clients_sub:"다양한 업계의 신뢰를 얻고 있습니다.",
      sec_news:"뉴스 & 블로그",
      view_all_news:"전체 뉴스 보기",
      news1_title:"자사 SaaS ‘CoreConnect’ 출시",
      news1_desc:"업무 효율화를 위한 신제품을 공개했습니다.",
      news2_title:"AI × IoT 이니셔티브",
      news2_desc:"PoC부터 운영까지의 사례를 소개합니다.",
      tag_news:"뉴스",
      tag_blog:"블로그",
      sec_scp_title:"보안 / 컴플라이언스 / 프로세스",
      sec_scp_sub:"기업 고객이 기대하는 신뢰 가능한 운영 체계.",
      scp_sec:"보안",
      scp_sec_desc:"최소 권한, 감사 로그, 운영 표준",
      scp_comp:"컴플라이언스",
      scp_comp_desc:"정보 거버넌스 및 계약 준수",
      scp_proc:"프로세스",
      scp_proc_desc:"Agile / DevOps / PMO / Global Delivery",
      contact_panel_title:"문의하기",
      contact_email_label:"이메일",
      contact_name:"이름",
      contact_email:"이메일",
      contact_message:"내용",
      contact_submit:"제출",
      contact_hint:"*Netlify Forms로 수집됩니다.",
      footer_company:"CoRevo Inc.",
      footer_links_services:"서비스",
      footer_links_company:"회사",
      footer_links_security:"보안",
      footer_links_news:"뉴스",
      footer_links_contact:"문의",
      page_services_title:"서비스",
      page_company_title:"회사 정보",
      page_about_title:"회사 소개",
      page_security_title:"보안",
      page_news_title:"뉴스 / 블로그",
      page_contact_title:"문의",
      thanks_title:"완료",
      thanks_msg:"메시지를 받았습니다. 곧 연락드리겠습니다.",
      back_home:"홈으로",
    }
  };

  function getLang(){
    const v = localStorage.getItem(LANG_KEY);
    return T[v] ? v : "ja";
  }
  function setLang(code){
    localStorage.setItem(LANG_KEY, code);
    apply(code);
  }
  function apply(code){
    const t=T[code]||T.ja;
    document.documentElement.setAttribute("lang", code);
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const k=el.getAttribute("data-i18n");
      if(t[k]!=null) el.textContent=t[k];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
      const k=el.getAttribute("data-i18n-placeholder");
      if(t[k]!=null) el.setAttribute("placeholder", t[k]);
    });
    const btn=document.querySelector("[data-lang-button]");
    if(btn){
      const label=(langs.find(x=>x.code===code)||langs[0]).label;
      btn.textContent=label+" ▾";
    }
  }

  function setupMenu(){
    const btn=document.querySelector("[data-lang-button]");
    const menu=document.querySelector("[data-lang-menu]");
    if(!btn||!menu) return;
    menu.innerHTML="";
    langs.forEach(l=>{
      const a=document.createElement("a");
      a.href="#"; a.textContent=l.label;
      a.style.display="block"; a.style.padding="10px 10px"; a.style.borderRadius="12px";
      a.addEventListener("click",(e)=>{e.preventDefault(); setLang(l.code); menu.style.display="none";});
      a.addEventListener("mouseover",()=>a.style.background="rgba(255,255,255,.07)");
      a.addEventListener("mouseout",()=>a.style.background="transparent");
      menu.appendChild(a);
    });
    btn.addEventListener("click",(e)=>{
      e.preventDefault();
      menu.style.display = (menu.style.display==="block") ? "none" : "block";
    });
    document.addEventListener("click",(e)=>{
      if(!menu.contains(e.target) && e.target!==btn) menu.style.display="none";
    });
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    setupMenu();
    apply(getLang());
  });
})();

// scroll reveal
(function(){
  function setupReveal(){
    const els=document.querySelectorAll(".reveal");
    if(!("IntersectionObserver" in window)){
      els.forEach(e=>e.classList.add("is-visible"));
      return;
    }
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){
          ent.target.classList.add("is-visible");
          io.unobserve(ent.target);
        }
      });
    },{threshold:0.12});
    els.forEach(e=>io.observe(e));
  }
  document.addEventListener("DOMContentLoaded", setupReveal);
})();


// Mega menu behavior (hover + click + keyboard) + mobile panel
(function(){
  function closeAll(except){
    document.querySelectorAll(".has-mega.open").forEach(el=>{
      if(except && el===except) return;
      el.classList.remove("open");
      const btn = el.querySelector(".megatoggle");
      if(btn) btn.setAttribute("aria-expanded","false");
    });
  }

  function setupMega(){
    const items = document.querySelectorAll(".has-mega");
    items.forEach(item=>{
      const btn = item.querySelector(".megatoggle");
      const panel = item.querySelector(".mega");
      if(!btn || !panel) return;

      const open = ()=>{
        closeAll(item);
        item.classList.add("open");
        btn.setAttribute("aria-expanded","true");
      };
      const close = ()=>{
        item.classList.remove("open");
        btn.setAttribute("aria-expanded","false");
      };

      item.addEventListener("mouseenter", ()=>{
        if(window.matchMedia("(max-width: 980px)").matches) return;
        open();
      });
      item.addEventListener("mouseleave", ()=>{
        if(window.matchMedia("(max-width: 980px)").matches) return;
        close();
      });

      btn.addEventListener("click", (e)=>{
        e.preventDefault();
        if(item.classList.contains("open")) close(); else open();
      });

      item.addEventListener("focusin", ()=>{
        if(window.matchMedia("(max-width: 980px)").matches) return;
        open();
      });
    });

    document.addEventListener("click", (e)=>{
      const t = e.target;
      if(t && t.closest && (t.closest(".has-mega") || t.closest("[data-lang-menu]") || t.closest("[data-lang-button]"))) return;
      closeAll();
    });

    document.addEventListener("keydown", (e)=>{
      if(e.key === "Escape") closeAll();
    });
  }

  function setupMobile(){
    const btn = document.querySelector("[data-mobile-toggle]");
    const panel = document.querySelector("[data-mobile-panel]");
    if(!btn || !panel) return;
    btn.addEventListener("click", ()=>{
      panel.classList.toggle("open");
      closeAll();
    });
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    setupMega();
    setupMobile();
  });
})();

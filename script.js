// ローディング演出
document.body.classList.add('is-loading');
const pageLoader = document.getElementById('pageLoader');
const hideLoader = () => {
  if (!pageLoader) return;
  pageLoader.classList.add('is-hidden');
  document.body.classList.remove('is-loading');
};
window.addEventListener('load', () => window.setTimeout(hideLoader, 700));
window.setTimeout(hideLoader, 2800);

// モバイルナビの開閉
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', nav.classList.contains('is-open') ? 'true' : 'false');
  });
  // ナビ内リンクをタップしたら閉じる
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// =====================================================================
// お問い合わせフォームの送信先
// FormSubmitの確認済み匿名エンドポイントを使用し、公開コードにメールアドレスを記載しません。
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/ba10fc3659ef9272dc23d67339193694';
// =====================================================================

// お問い合わせフォーム（FormSubmit経由でメール送信・ページ遷移なし）
const form = document.getElementById('contactForm');
const thanks = document.getElementById('formThanks');
const errorMsg = document.getElementById('formError');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const privacyAgree = form.querySelector('[name="privacy_agree"]')?.checked;

    if (!name || !email || !message || !privacyAgree) {
      alert('必須項目をご入力のうえ、プライバシーポリシーに同意してください。');
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      alert('メールアドレスの形式をご確認ください。');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中…';
    if (thanks) thanks.hidden = true;
    if (errorMsg) errorMsg.hidden = true;

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error('送信に失敗しました');

      if (thanks) thanks.hidden = false;
      form.reset();
    } catch (err) {
      if (errorMsg) errorMsg.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '無料相談を送信する';
    }
  });
}

// スクロールで要素を順に表示
const revealTargets = document.querySelectorAll(
  '.intro__grid, .section-heading, .strength__grid, .profile__grid, .voices__head, .price-block, .faq__inner, .contact__grid'
);
revealTargets.forEach((element) => element.classList.add('reveal'));

const staggerTargets = document.querySelectorAll(
  '.pain__grid, .service-list, .works__grid, .voices__grid, .plan-intro, .price-cards, .flow__list'
);
staggerTargets.forEach((element) => element.classList.add('reveal-stagger'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  [...revealTargets, ...staggerTargets].forEach((element) => observer.observe(element));
} else {
  [...revealTargets, ...staggerTargets].forEach((element) => element.classList.add('is-visible'));
}

// マウスに合わせてヒーローのキャラクターを少しだけ動かす
const heroVisual = document.querySelector('.hero__visual');
const heroHamster = document.querySelector('.hero__hamster');
if (heroVisual && heroHamster && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroVisual.addEventListener('pointermove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroHamster.style.setProperty('--mouse-x', `${x * 16}px`);
    heroHamster.style.setProperty('--mouse-y', `${y * 12}px`);
  });
  heroVisual.addEventListener('pointerleave', () => {
    heroHamster.style.removeProperty('--mouse-x');
    heroHamster.style.removeProperty('--mouse-y');
  });
}

// スクロールでヘッダーを少しコンパクトにする
const header = document.querySelector('.header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

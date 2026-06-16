// モバイルナビの開閉
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
  // ナビ内リンクをタップしたら閉じる
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('is-open'));
  });
}

// お問い合わせフォーム（デモ：実送信なし）
const form = document.getElementById('contactForm');
const thanks = document.getElementById('formThanks');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();

    if (!name || !email) {
      alert('お名前とメールアドレスをご入力ください。');
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      alert('メールアドレスの形式をご確認ください。');
      return;
    }

    // 実際にはここでサーバーへ送信します
    form.querySelector('button[type="submit"]').disabled = true;
    if (thanks) thanks.hidden = false;
    form.reset();
  });
}

// スクロールでヘッダーに影を付与
const header = document.querySelector('.header');
if (header) {
  const onScroll = () => {
    header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(30,41,59,.08)' : 'none';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

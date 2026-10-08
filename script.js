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

// スクロールでヘッダーに影を付与
const header = document.querySelector('.header');
if (header) {
  const onScroll = () => {
    header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(30,41,59,.08)' : 'none';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

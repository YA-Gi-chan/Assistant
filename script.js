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

// =====================================================================
// お問い合わせフォームの送信先設定（ここだけ変更すればOK）
// ---------------------------------------------------------------------
// FormSubmit でメールアドレスを「隠す」には、専用コード方式を使います。
//
// 【最初の有効化（1回だけ）】
//   1) 下の FORM_ENDPOINT を一時的にメール直指定にする：
//        'https://formsubmit.co/ajax/gaga73111@gmail.com'
//   2) 公開ページからテスト送信 → 届いた確認メールの有効化リンクをクリック
//   3) 同じメールに「あなた専用のランダムURL（例: .../el/abcd1234）」が記載されます
//
// 【メールを隠す（本番）】
//   有効化後、専用コードに差し替える（このページのソースからメールが消えます）：
//        'https://formsubmit.co/ajax/el/あなたの専用コード'
//
// ↓ 現在は専用コードのプレースホルダー。発行されたコードに置き換えてください。
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/el/YOUR_FORMSUBMIT_CODE';
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

    if (!name || !email) {
      alert('お名前とメールアドレスをご入力ください。');
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
      submitBtn.disabled = false;
      submitBtn.textContent = '無料相談を申し込む';
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

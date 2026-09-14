/* VARZIN optional analytics loader. No Google request is made before opt-in. */
(() => {
  'use strict';
  const meta = document.querySelector('meta[name="varzin-ga4-id"]');
  const id = meta?.content?.trim();
  if (!id || !/^G-[A-Z0-9]+$/i.test(id)) return;

  const key = 'varzin-analytics-consent';
  const choice = localStorage.getItem(key);
  const load = () => {
    if (document.querySelector('script[data-varzin-ga4]')) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    const script = document.createElement('script');
    script.async = true;
    script.dataset.varzinGa4 = 'true';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.append(script);
  };
  if (choice === 'granted') return load();
  if (choice === 'denied') return;

  const panel = document.createElement('aside');
  panel.className = 'vr-consent';
  panel.setAttribute('aria-label', 'Analytics consent');
  panel.innerHTML = `<p><strong>Optional analytics</strong><br>VARZIN can use Google Analytics to understand aggregate site usage. No Google Analytics request is sent unless you choose Allow. <a href="/privacy.html#analytics">Privacy details</a>.</p><div class="vr-consent-actions"><button type="button" data-consent="accept">Allow analytics</button><button type="button" data-consent="decline">Decline</button></div>`;
  document.body.append(panel);
  panel.querySelector('[data-consent="accept"]').addEventListener('click', () => {
    localStorage.setItem(key, 'granted'); panel.remove(); load();
  });
  panel.querySelector('[data-consent="decline"]').addEventListener('click', () => {
    localStorage.setItem(key, 'denied'); panel.remove();
  });

  document.querySelectorAll('[data-reset-analytics-consent]').forEach((button) => {
    button.addEventListener('click', () => { localStorage.removeItem(key); location.reload(); });
  });
})();

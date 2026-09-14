/* Progressive enhancement for the VARZIN research portal. */
(() => {
  "use strict";
  document.documentElement.classList.add("vr-js");
  document.querySelectorAll(".vr-mobile").forEach((menu) => {
    menu.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.open) {
        menu.open = false;
        menu.querySelector("summary")?.focus();
      }
    });
    menu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => { menu.open = false; }),
    );
  });
  document.querySelectorAll(".vr-header nav a").forEach((link) => {
    if (link.pathname === location.pathname && !link.hash)
      link.setAttribute("aria-current", "page");
  });
  document.querySelectorAll("table").forEach((table, i) => {
    let wrapper = table.parentElement;
    if (!wrapper.classList.contains("table-wrap")) {
      wrapper = document.createElement("div");
      table.before(wrapper);
      wrapper.append(table);
    }
    wrapper.classList.add("vr-table-scroll");
    wrapper.tabIndex = 0;
    wrapper.setAttribute("role", "region");
    wrapper.setAttribute("aria-label", `Research table ${i + 1}; scroll horizontally for more columns`);
  });
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = [
    ...document.querySelectorAll(
      ".vr-section,.vr-editorial-section,.vr-status-band,.vr-card,.vr-fact,.vr-publication,.vr-record,.vr-boundary-card,.vz-captcha-demo",
    ),
  ];
  revealTargets.forEach((el, index) => {
    el.classList.add("vr-reveal-ready");
    el.style.setProperty("--vr-delay", `${Math.min(index % 5, 4) * 55}ms`);
  });
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("vr-in-view"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("vr-in-view");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -7%", threshold: 0.08 },
    );
    revealTargets.forEach((el) => observer.observe(el));
  }

  const finePointer = matchMedia("(pointer:fine)").matches;
  if (finePointer && !reduceMotion) {
    let raf = 0;
    window.addEventListener("pointermove", (event) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--vr-pointer-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--vr-pointer-y", `${event.clientY}px`);
        raf = 0;
      });
    }, { passive: true });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target && !reduceMotion) target.classList.add("vr-in-view");
    });
  });
})();

/* Native disclosures and documents remain usable without this enhancement. */
(() => {
  "use strict";
  document.querySelectorAll(".vr-mobile").forEach((menu) => {
    menu.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.open) {
        menu.open = false;
        menu.querySelector("summary").focus();
      }
    });
    menu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        menu.open = false;
      }),
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
    wrapper.setAttribute(
      "aria-label",
      `Research table ${i + 1}; scroll horizontally for more columns`,
    );
  });
})();

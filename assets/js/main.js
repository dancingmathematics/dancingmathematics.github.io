/* ==========================================================================
   Ratih Ayu Apsari — site behaviour
   Three small things only: mobile nav, list filtering, email obfuscation.
   ========================================================================== */
(function () {
  "use strict";

  /* --- 1. Mobile navigation toggle ------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --- 2. Filter bars ---------------------------------------------------
     Markup contract:
       <div class="filters" data-filter-target="#some-list"> …
         <button class="filter-btn is-active" data-filter="all">All</button>
         <button class="filter-btn" data-filter="journal">Journal</button>
       </div>
       <ul id="some-list"> <li data-cat="journal"> … </li> </ul>
     An item matches if data-cat contains the filter word (space separated).
  ---------------------------------------------------------------------- */
  document.querySelectorAll(".filters").forEach(function (bar) {
    var target = document.querySelector(bar.getAttribute("data-filter-target"));
    if (!target) return;
    var items = Array.prototype.slice.call(target.children);

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      var want = btn.getAttribute("data-filter");

      bar.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });

      items.forEach(function (item) {
        var cats = (item.getAttribute("data-cat") || "").split(/\s+/);
        var show = want === "all" || cats.indexOf(want) !== -1;
        item.classList.toggle("is-hidden", !show);
      });

      // Hide group headings that no longer have visible siblings
      target.querySelectorAll("[data-group-heading]").forEach(function (h) {
        var next = h.nextElementSibling, any = false;
        while (next && !next.hasAttribute("data-group-heading")) {
          if (!next.classList.contains("is-hidden")) { any = true; break; }
          next = next.nextElementSibling;
        }
        h.classList.toggle("is-hidden", !any);
      });
    });
  });

  /* --- 3. Email obfuscation --------------------------------------------
     <a class="js-mail" data-user="ra.apsari" data-domain="berkeley.edu"></a>
     Keeps a plain-text address out of the HTML source for scrapers.
  ---------------------------------------------------------------------- */
  document.querySelectorAll(".js-mail").forEach(function (el) {
    var addr = el.getAttribute("data-user") + "@" + el.getAttribute("data-domain");
    el.setAttribute("href", "mailto:" + addr);
    if (!el.textContent.trim()) el.textContent = addr;
  });

  /* --- 4. Mark the current page in the nav (path-based) ----------------- */
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === here) a.classList.add("is-active");
  });

  /* --- 5. Footer year --------------------------------------------------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
  /* --- 6. Course-list modals ---------------------------------------------
     Markup contract:
       <button type="button" class="link-btn" data-open-modal="courses-phd">See courses</button>
       <dialog class="course-modal" id="courses-phd"> … <button class="course-modal__close">…</button> </dialog>
  ---------------------------------------------------------------------- */
  document.querySelectorAll("[data-open-modal]").forEach(function (btn) {
    var dialog = document.getElementById(btn.getAttribute("data-open-modal"));
    if (!dialog) return;
    btn.addEventListener("click", function () {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    });
  });
  document.querySelectorAll(".course-modal").forEach(function (dialog) {
    dialog.querySelectorAll(".course-modal__close").forEach(function (closeBtn) {
      closeBtn.addEventListener("click", function () { dialog.close(); });
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  });
})();

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

     Group headings may nest one level deep (e.g. a type heading containing
     several year sub-headings). Mark the outer heading with a plain
     data-group-heading and inner sub-headings with data-group-heading="2";
     a heading hides only when nothing visible remains beneath it, checking
     inside its sub-headings too. Single-level pages need no change — every
     data-group-heading defaults to level 1, so any next heading still ends
     the group exactly as before.
  ---------------------------------------------------------------------- */
  document.querySelectorAll(".filters").forEach(function (bar) {
    var target = document.querySelector(bar.getAttribute("data-filter-target"));
    if (!target) return;
    var items = Array.prototype.slice.call(target.children).filter(function (el) {
      return !el.hasAttribute("data-group-heading");
    });

    function headingLevel(h) {
      return Number(h.getAttribute("data-group-heading")) || 1;
    }

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

      // Hide group headings that no longer have visible content beneath
      // them. Deepest headings first, so a parent heading's check can rely
      // on its sub-headings' is-hidden state already being up to date.
      var headings = Array.prototype.slice.call(target.querySelectorAll("[data-group-heading]"));
      headings.sort(function (a, b) { return headingLevel(b) - headingLevel(a); });

      headings.forEach(function (h) {
        var hLevel = headingLevel(h);
        var next = h.nextElementSibling, any = false;
        while (next) {
          if (next.hasAttribute("data-group-heading") && headingLevel(next) <= hLevel) break;
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
    // Click on the backdrop (outside the inner panel) closes it too.
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  });
     /* --- 7. Full-article PDF links open in a new tab ---------------------- */
  document.querySelectorAll(".pub-apa__link a").forEach(function (a) {
    a.target = "_blank";
    a.rel = "noopener";
  });
      /* --- 8. Gallery prev/next buttons --------------------------------------
     Wraps every multi-photo .entry__gallery in a non-scrolling frame and
     adds two real <button> controls: click "next" to slide one photo to
     the right, "prev" to slide back. Either button hides itself when
     there's nowhere further to go in that direction. Runs automatically —
     no HTML changes needed in log.html, ever.
  ---------------------------------------------------------------------- */
  document.querySelectorAll(".entry__gallery").forEach(function (gallery) {
    if (gallery.children.length < 2) return; // nothing to page through

    var wrap = document.createElement("div");
    wrap.className = "entry__gallery-wrap";
    gallery.parentNode.insertBefore(wrap, gallery);
    wrap.appendChild(gallery);

    var prev = document.createElement("button");
    prev.type = "button";
    prev.className = "entry__gallery-nav entry__gallery-nav--prev";
    prev.setAttribute("aria-label", "Previous photo");

    var next = document.createElement("button");
    next.type = "button";
    next.className = "entry__gallery-nav entry__gallery-nav--next";
    next.setAttribute("aria-label", "Next photo");

    wrap.appendChild(prev);
    wrap.appendChild(next);

    function update() {
      var max = gallery.scrollWidth - gallery.clientWidth;
      prev.hidden = gallery.scrollLeft <= 4;
      next.hidden = gallery.scrollLeft >= max - 4;
    }

    prev.addEventListener("click", function () {
      gallery.scrollBy({ left: -gallery.clientWidth, behavior: "smooth" });
    });
    next.addEventListener("click", function () {
      gallery.scrollBy({ left: gallery.clientWidth, behavior: "smooth" });
    });
    gallery.addEventListener("scroll", update);
    update();
  });

  /* --- 9. Discourage saving log photos (casual deterrent only; see CSS
     .entry__gallery img for the pointer-events/user-select/drag rules that
     do most of the work — this just blocks the right-click menu too) ----- */
  document.querySelectorAll(".entry__gallery").forEach(function (gallery) {
    gallery.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  });
})();

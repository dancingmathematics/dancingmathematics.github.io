# ratihapsari.github.io — site source

Personal academic website for Ratih Ayu Apsari, Ph.D.
Plain HTML and CSS. No build step, no dependencies, no database. Every page is a file you can open
in a browser by double-clicking it.

---

## 1. What is in here

```
index.html            Home
research.html         Research & projects overview
grid.html             GRiD project page (migrated from the EDRL lab site)
publications.html     Full publication & presentation list, with filters
teaching.html         Teaching, mentoring, peer review, community service
dance.html            Balinese dance practice + performance record
log.html              Documentation log — the portfolio that accumulates over time
cv.html               Structured CV page
404.html              Shown when a URL does not exist
assets/
  css/style.css       All styling. Design tokens are at the top.
  js/main.js          ~80 lines: mobile menu, filters, email obfuscation
  img/                Images. favicon.svg is here.
  files/              Ratih-Ayu-Apsari-CV.pdf
```

---

## 2. Publishing it on GitHub Pages (free)

You need a free GitHub account. Fifteen minutes, once.

**Step 1 — Create the repository.**
On GitHub, click **New repository**. Name it exactly:

```
ratihapsari.github.io
```

(substituting your own GitHub username for `ratihapsari` — the name must be
`<your-username>.github.io`). Set it to **Public**. Do not add a README, .gitignore, or licence —
this folder already has what it needs.

**Step 2 — Upload the files.**
On the empty repository page, click **uploading an existing file**. Drag in the *contents* of this
folder — all the `.html` files and the `assets` folder — not the folder itself. Scroll down, write
"initial site" in the commit box, and click **Commit changes**.

**Step 3 — Turn on Pages.**
Go to **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**,
branch **main**, folder **/ (root)**. Save.

**Step 4 — Wait two minutes**, then visit `https://<your-username>.github.io`.

That is the whole deployment. There is nothing to rebuild and nothing to maintain.

### If you prefer a drag-and-drop alternative

[Netlify Drop](https://app.netlify.com/drop) will host this folder with no account and no Git: drag
the folder onto the page and it is live in seconds at a random URL you can then rename. Cloudflare
Pages works the same way. Both are free and both accept this folder unchanged, because there is
nothing to build. GitHub Pages is recommended only because the version history is useful when a site
has to outlive several jobs.

---

## 3. Updating the site

### The simplest way (no software to install)

1. Go to your repository on github.com.
2. Click the file you want to change (e.g. `log.html`).
3. Click the pencil icon.
4. Edit, scroll down, click **Commit changes**.

The live site updates within a minute. This is entirely sufficient for adding a log entry or a
publication, and it works from any computer, including a borrowed one.

### The more comfortable way

Install [GitHub Desktop](https://desktop.github.com/), clone the repository once, edit files in any
text editor (VS Code is free and good), and click **Push origin** when you are done. Use this if you
are making several changes at a time, or want to preview locally first by double-clicking
`index.html`.

### Adding a log entry

Open `log.html`. Near the top of `<div id="loglist">` there is a commented-out template. Copy it,
paste it directly above the newest entry, remove the `<!--` and `-->`, and fill it in. Set
`data-cat` to one of `talk`, `workshop`, `fieldwork`, `writing`, `performance`, `teaching`.

### Adding a publication

Open `publications.html`. Copy any `<div class="pub" data-cat="…">` block, paste it into the right
section, edit the text. The filter buttons pick it up automatically from `data-cat`.

### Adding a performance

Open `dance.html`. Copy the first `<li data-cat="y2026">` block, paste it at the top of the list,
edit it. When a new year starts, add a matching filter button.

### Replacing the CV PDF

Drop the new file into `assets/files/` with the **same filename**
(`Ratih-Ayu-Apsari-CV.pdf`). Every link on the site keeps working.

### Adding images

Put them in `assets/img/` (or `assets/img/log/`, `assets/img/grid/`, `assets/img/dance/` to stay
organised), then replace the dashed placeholder blocks — they all tell you the filename they expect.
A placeholder looks like this:

```html
<div class="ph">Figure 1 — … <code>assets/img/grid/fig1-students.jpg</code></div>
```

and becomes:

```html
<img src="assets/img/grid/fig1-students.jpg" alt="Students working on the GRiD mat">
```

Resize photographs to about 1600px on the long edge and save as JPEG at ~80% quality before
uploading. A 6MB phone photo will make the page slow for no visible benefit.

---

## 4. Changing the design

Everything visual is controlled by the tokens at the top of `assets/css/style.css`:

```css
--accent:      #e05142;   /* roasted orange */
--accent-dark: #b23a2d;
--blue:        #1f4e6b;   /* companion blue */
--serif: "Source Serif 4", …   /* headings */
--sans:  "Inter", …            /* body text */
```

Change a value there and it changes everywhere on every page. You do not need to touch anything
else.

**The navigation and footer are repeated in each HTML file.** That is the trade-off of having no
build step. If you add a page, paste the `<nav>` block into it and add one `<a>` to every other
page's nav. With eight pages this takes two minutes; it is the only repetitive part of the setup.

---

## 5. Taking the site with you

This is the part that matters for portability, and it is why the site was built this way.

- **The site is a folder.** It has no server requirements, no runtime, no database. Any web host on
  earth will serve it, including a university's own web space.
- **To move to an institutional URL** (e.g. `people.newinstitution.edu/~rapsari/`): give the IT
  office this folder, or upload it via whatever file transfer they use. It will work unchanged.
- **To keep both**: leave the GitHub Pages copy live and put a line on the institutional page
  pointing to it, or vice versa. Duplication is fine and costs nothing.
- **To make the address permanent**, buy a domain (about $12/year at Namecheap, Porkbun, or
  Cloudflare Registrar) — for example `ratihapsari.com`. Then in your repository, create a file
  named `CNAME` containing only your domain, and point the domain's DNS at GitHub:

  ```
  A     @    185.199.108.153
  A     @    185.199.109.153
  A     @    185.199.110.153
  A     @    185.199.111.153
  CNAME www  <your-username>.github.io
  ```

  Then in **Settings → Pages**, enter the domain in "Custom domain" and tick "Enforce HTTPS".
  From then on, the address stays yours across every affiliation — and if you ever move hosts, you
  repoint the DNS and no link anyone has saved ever breaks.

**Recommendation:** publish on `<username>.github.io` today, and buy the domain when you know which
name you want. Moving from one to the other later takes ten minutes.

---

## 6. Privacy notes

- There is no analytics script, no tracking pixel, no cookie banner, and no embedded social widget
  anywhere in this site. Nothing is loaded from a third party except the two web fonts from Google
  Fonts. If you would rather not load those either, download the font files into
  `assets/fonts/`, replace the `<link>` tag in each page with an `@font-face` block, and the site
  becomes entirely self-contained.
- Your email address does not appear as plain text in the HTML source. It is assembled by JavaScript
  from `data-user` and `data-domain` attributes, which defeats most address-harvesting scrapers. To
  change it, search the project for `data-user="ra.apsari"` and edit both attributes.
- **Consider using a durable personal address rather than an institutional one.** A `berkeley.edu`
  address will stop working when the affiliation ends, and every link and citation pointing at it
  breaks silently. An address you own is the same argument as a domain you own.
- Before publishing photographs, check that no research participant — especially no child — is
  identifiable unless your consent forms explicitly cover publication on a personal website.

---

## 7. Optional additions

None of these are needed, but each is a small file away:

- **`robots.txt`** in the root, if you want to steer crawlers.
- **A `sitemap.xml`**, which helps search engines index a new site faster.
- **An OpenGraph card image** at `assets/img/og-card.png` (1200×630) so the site shows a preview
  image when someone shares a link. The `<meta property="og:image">` tag on `index.html` already
  points at that path.
- **A `humans.txt`** or a short colophon, if you like that sort of thing.

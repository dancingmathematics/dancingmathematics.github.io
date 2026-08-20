# Your website: design rationale, migration plan, and publishing strategy

A companion to the site itself. This explains *why* it is built the way it is, what to bring across
from the EDRL lab pages, and how to make the address permanent so it travels with you.

---

## 1. What this site has to do

You described three needs that usually pull in different directions:

1. **A professional résumé** — legible in thirty seconds to a search committee, a grant panel, or a
   collaborator who just heard your name at a conference.
2. **An ongoing portfolio** — a place to document activity now that you are not using social media.
3. **Something portable** — organised by you, moved by you, not owned by an institution.

The design resolves these by separating *the record that stays stable* (CV, publications, teaching,
the GRiD project) from *the record that grows* (the documentation log). The first is what someone
evaluating you reads. The second is what makes the site worth returning to, and what replaces the
function social media was serving.

That separation is the single most important structural decision here. Sites that mix the two end
up either as a stale CV nobody revisits, or as a blog where the credentials are hard to find.

---

## 2. Information architecture

| Page | Role | Update rhythm |
|---|---|---|
| **Home** | The thirty-second version. Who you are, three research threads, four recent papers. | Rarely |
| **Research** | The intellectual argument plus every active project strand. | A few times a year |
| **GRiD** | The deep project page, migrated from the lab site. Your flagship. | When the project moves |
| **Publications** | Complete, filterable, DOI-linked. | Per publication |
| **Teaching** | Appointments, courses, 23 mentees, peer review, community service. | Per semester |
| **Dance** | Practice statement, repertoire, full performance record. | Per performance |
| **Log** | Dated entries: talks, workshops, fieldwork, writing. | Whenever |
| **CV** | Structured on-page CV + PDF download. | Per CV revision |

Two decisions worth flagging:

**Dance is a first-class page, not an "interests" footnote.** Your CV devotes three pages to
performances, and your entire research program rests on that practice. Burying it would
misrepresent the work. But the page opens with *why this is on a research website* — so a search
committee reads it as scholarly grounding rather than as a hobby.

**The GRiD project gets its own page, not a section.** It is the thing people will link to and cite.
A standalone URL means the lab, conference organisers, and journalists can point at it directly.

---

## 3. Visual design

**Palette.** White dominates — the page background is pure `#ffffff`, with a warm off-white
(`#fbfaf9`) for alternating bands so sections separate without heavy borders.

| Token | Value | Used for |
|---|---|---|
| Accent | `#e05142` | Section rules, eyebrow labels, year markers, primary button, active nav |
| Accent dark | `#b23a2d` | Hover states, text on tinted backgrounds (passes contrast) |
| Accent tint | `#fdf1ef` | Callout backgrounds, active-tag fills |
| Blue | `#1f4e6b` | Links, venue names, secondary tags |
| Blue mid | `#35708e` | Secondary eyebrow labels |
| Blue tint | `#eef4f7` | Note callouts, tag fills |

The blue was chosen against your orange specifically: deep and slightly desaturated, so it reads as
a companion rather than as a second accent competing for attention. Orange marks *structure*
(where a section starts, which item is current); blue marks *action* (things you can click). Keeping
those two jobs separate is what stops a two-colour palette from looking busy.

**Type.** Source Serif 4 for headings, Inter for body text — both free, both open source, both
loaded from Google Fonts. The serif gives the scholarly register; the sans keeps dense lists (your
publication list runs to fifty entries) readable. If you would rather load nothing from Google, the
README explains how to self-host the two font files.

**Restraint.** No shadows except a subtle lift on hover, no gradients except one barely-visible band
behind page titles, no animation beyond a 150ms colour transition. On a site whose content is this
substantive, visual noise costs credibility.

---

## 4. Migrating from the EDRL lab site

Your lab pages contain material worth preserving. Here is what came across and what still needs you.

### Already migrated into `grid.html`

- The framing question — *what would be a situation where the lines come intuitively?*
- Rationale, design framework, and the full component list (mat, markers, stickers, yarn, pipe
  cleaners, elastic bands)
- The four-step activity structure, including *Tapak Sirang Pada*
- Participant description (fifth-graders, ages 9–13, Bali and California)
- **Every named team member** — six research assistants, fourteen EDSTEM C122 mentees across five
  terms, two URAP participants. This matters: those students can now point at a page with their
  names on it, and it is a permanent record of your mentoring.
- Digital GRiD, EDaMMLA, Copernicus, Expanding Your Horizons
- All GRiD publications, proceedings, and posters
- Funding, and an attribution note linking back to the EDRL page

### What you still need to bring across yourself

**The fifteen figures.** The lab page has them; this site has captioned placeholders showing exactly
which filename each expects (`assets/img/grid/fig1-students.jpg` and so on). Download them from the
lab site, or use your originals — originals will be higher resolution.

Before publishing any of them, check the consent question: images of identifiable children need
consent that explicitly covers publication on a personal (non-institutional) website. Where consent
is ambiguous, either crop so faces are not identifiable, or describe the moment in the caption and
leave the image out. A page with eight well-cleared photographs is stronger than one with fifteen
you feel uneasy about.

**The embedded dance-lesson video.** If it is yours, upload it somewhere durable and embed it. If it
belongs to the lab, link rather than re-host.

**Your portrait.** The lab profile has one. `assets/img/portrait.jpg`.

### What deliberately did *not* come across

- **The Instagram handle.** Removed everywhere, per your decision.
- **Phone number.** On your CV, not on the site — a public phone number invites exactly the contact
  you are trying to reduce.
- **The lab's contact block and webmaster.** Those belong to EDRL, not to you.
- **The "PhD candidate" framing.** You have filed. The site says Ph.D. and Research Associate.

### One courtesy worth extending

Send Julien Putz (the EDRL webmaster) a note asking that your lab profile add a line linking to your
personal site. Lab pages rank well in search results, and that one link will carry visitors to a page
you control long after the affiliation ends. It is also the cleanest way to signal the transition
without deleting anything.

---

## 5. Publishing: GitHub Pages, and why

Full step-by-step instructions are in `README.md` §2. The short version: create a repository named
`<your-username>.github.io`, drag the files in, switch Pages on in Settings. Free, permanent, no
renewal, no credit card.

**Why GitHub Pages over the alternatives**, given your specific requirement that the site travel
with you:

- **It stores the source, not just the output.** Netlify Drop is faster to start, but GitHub keeps a
  complete version history. In ten years and three institutions, that history is the thing that lets
  you recover a page you deleted, or see what your project description said in 2026.
- **The output is portable to anything.** Because there is no build step, this folder can be handed
  to a university IT office and served from `people.newinstitution.edu/~apsari/` unchanged. Sites
  built on Jekyll, Hugo, or WordPress cannot do that — they need their toolchain to come along.
- **It is free forever with no account tier to age out of.**
- **Embedding into a new institution's site later is trivial**, because each page is self-contained
  HTML. An institutional CMS can ingest the content, or simply link to your domain.

### The domain question

Start on `<username>.github.io` today — free, live in fifteen minutes.

**Then buy a domain when you are ready.** About $12/year at Porkbun, Namecheap, or Cloudflare
Registrar. `ratihapsari.com`, `ratihayuapsari.com`, or similar. The DNS setup is five lines and is
in `README.md` §5.

The reason to do this is precisely your stated goal. A domain you own is the one address that
survives every affiliation change. Put it on every paper, every conference badge, every email
signature, and it never needs updating again — when you move, you repoint the DNS and every saved
link, every citation, every QR code on a poster still resolves.

Institutional URLs (`edrl.berkeley.edu/people/...`) and platform URLs alike disappear when the
relationship ends. That is the failure mode you are designing against.

**Same logic, applied to email:** consider putting a permanent personal address on the site rather
than `berkeley.edu`. The site currently uses your Berkeley address; change it in one place per page
(search for `data-user="ra.apsari"`) whenever you decide.

---

## 6. Using the log well

The log is the part that replaces what social media was doing, and it works differently, so it is
worth being deliberate.

**What it is good for.** A conference talk with two sentences on what the room pushed back on. A
workshop with one photograph. A paper accepted. A fieldwork day where something surprised you. A
performance and what the stage geometry did to it. These accumulate into something a CV cannot show:
evidence of an active, thinking practice.

**What to expect.** No likes, no notifications, no audience metric. Nobody will see an entry the day
you post it. That is the trade. What you get instead is that in three years the archive is complete,
searchable, entirely yours, and reads as a coherent body of work rather than as fragments scattered
across a platform that may not exist.

**A realistic rhythm.** Once or twice a month, or after anything notable. Batch it — sit down after a
conference and write three entries at once. An entry can be two sentences; the value is in the record
existing, not in its length.

**One habit worth keeping.** Write the entry within a week, while you still remember what actually
happened rather than what you would say happened. That immediacy is the thing that makes a log more
useful than a CV line.

---

## 7. First week: a short list

1. Create the GitHub repository and publish. (§2 of the README — fifteen minutes.)
2. Add your portrait to `assets/img/portrait.jpg` and swap out the placeholder on `index.html`.
3. Pull the GRiD figures across from the lab site, applying the consent check above.
4. Ask EDRL to add a link from your lab profile to the new site.
5. Add the URL to your email signature and the header of your CV.
6. Decide about the domain. If yes, buy it and follow README §5.
7. Write one log entry, about anything. The first one is the hard one.

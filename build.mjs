// OCJ Groups concept - page generator (MP Launch, 2026-09-29)
// node build.mjs  -> writes 7 static pages sharing one chrome.
//
// 🚨 EVERY FACT HERE TRACES TO ONE OF THREE SOURCES, NOTHING ELSE:
//   [site] ocjgroups.com.au as fetched 29 Sep 2026 (home, /services, /profile, /projects, /contact-us)
//   [ig]   instagram.com/ocjgroups, the 12 posts visible logged-out on 29 Sep 2026 (incl. the Grand
//          Hyatt reel of 19 Feb 2026 and the branded van photo)
//   [call] Peter's call with Joe, 29 Sep 2026: resurfaces concrete (driveways, garage flooring),
//          construction, waterproofing; a leaking-balcony system that goes over the top, "we're not
//          removing anything", product supplied by CRG (coloured recycled glass); can take more work.
// Claims used and where from:
//   "over 20 years' experience in waterproofing" + "15 years' experience in road safety surfacing"
//   + "operating in Victoria" [site] · "Zero Defects, On Time, On Budget" [site] · "Free
//   Consultation" [site] · the 7 surfaces we waterproof [site] · Waterproofing: internal, external,
//   caulking, screeding [site + van] · Epoxy: commercial, domestic, roads [site + van] · Tiling:
//   install + supply all types [site] · High friction surfacing + coloured surface treatments [site]
//   · Residential and commercial [site] · suppliers APTC, Omnigrip Direct, Parchem, Bayset [site
//   logos] + CRG [call] · Joe 0422 606 369, Shant 0421 132 448, info@ [site] · Grand Hyatt [ig].
// DELIBERATELY LEFT OUT: the street address (site says 1395 Sydney Rd 3060, Google says 1435 Sydney
//   Rd 3047 - they disagree, so suburb only), the Google rating, any review, licence, insurance,
//   warranty/guarantee, response time, staff numbers, "interstate", Martin's number (home page only),
//   the stock photos on his site (warehouse, city skyline, tools, worker-on-white), every
//   TikTok-watermarked frame, CRG's own before/after photos (their work, not his).
import { readFileSync, writeFileSync } from "node:fs";

const META = JSON.parse(readFileSync(new URL("./img-meta.json", import.meta.url), "utf8"));

const BIZ = {
  name: "OCJ Groups",
  suburb: "Fawkner", state: "VIC", postcode: "3060",
  joe: "0422 606 369", joeTel: "+61422606369",
  shant: "0421 132 448", shantTel: "+61421132448",
  email: "info@ocjgroups.com.au",
  insta: "https://instagram.com/ocjgroups",
  facebook: "https://www.facebook.com/OCJ-Groups-100625772271633",
};
const SLUG = "ocj-groups-preview";
const LEAD = { label: "Joe - OCJ Groups", phone: BIZ.joeTel };

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%230E0F11'/%3E%3Ccircle cx='26' cy='32' r='15' fill='none' stroke='%23F3F1ED' stroke-width='6'/%3E%3Cpath d='M48 20a15 15 0 1 0 0 24' fill='none' stroke='%23E0283C' stroke-width='6'/%3E%3C/svg%3E";

const LOGO = (w, dark = false) => {
  const h = Math.round((w * 110) / 160);
  return `<img src="assets/logo-${dark ? "dark" : "light"}.svg" width="${w}" height="${h}" alt="OCJ Groups">`;
};

const pic = (n, alt, { cls = "", eager = false } = {}) => {
  const [w, h] = META[n] || [800, 600];
  return `<img${cls ? ` class="${cls}"` : ""} src="assets/${n}.webp" width="${w}" height="${h}" alt="${alt}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
};

/* ---------- services (one page each) ---------- */
const SERVICES = [
  {
    file: "leaking-balcony-repair-melbourne.html",
    nav: "Leaking Balconies",
    icon: "balcony",
    card: "Fixed from the top. The system goes over your existing balcony, so nothing gets ripped up.",
    img: "balcony-membrane",
    title: "Leaking Balcony Repair Melbourne | No Demolition | OCJ Groups",
    desc: "Leaking balcony? OCJ Groups fixes it from the top. The system goes straight over your existing balcony, nothing is removed, and it finishes clean. Free consultation, Melbourne-wide.",
    eyebrow: "Leaking balcony repair",
    h1: "Leaking balcony? We fix it <em>from the top.</em>",
    lede: "No jackhammers. No ripping up tiles. The OCJ Groups balcony system goes straight over your existing balcony, nothing gets removed, and it leaves a clean, finished surface.",
    heroImg: ["balcony-membrane", "Balcony sealed by OCJ Groups"],
  },
  {
    file: "waterproofing-melbourne.html",
    nav: "Waterproofing",
    icon: "drop",
    card: "Internal, external, caulking and screeding. Balconies, basements, wet areas, roof decks and carparks.",
    img: "wetarea",
    title: "Waterproofing Melbourne | 20+ Years Experience | OCJ Groups",
    desc: "Waterproofing in Melbourne from OCJ Groups: balconies, retaining walls, basement walls, internal wet areas, roof decks, green roofs and carparks. Over 20 years' experience. Free consultation.",
    eyebrow: "Waterproofing",
    h1: "Waterproofing in Melbourne, <em>20+ years of it.</em>",
    lede: "Internal, external, caulking and screeding. OCJ Groups has over 20 years' experience in waterproofing construction across Victoria, from a bathroom floor to the Grand Hyatt.",
    heroImg: ["wetarea", "Internal wet area waterproofed with a blue membrane"],
  },
  {
    file: "epoxy-garage-floors-melbourne.html",
    nav: "Epoxy & Garage Floors",
    icon: "floor",
    card: "Epoxy for garages, homes, commercial floors and roads. Flake finishes that look sharp and wipe clean.",
    img: "flake",
    title: "Epoxy Garage Floors Melbourne | Epoxy Flooring | OCJ Groups",
    desc: "Epoxy garage floors and epoxy flooring in Melbourne from OCJ Groups. Domestic, commercial and roads. Flake finishes, garage floor coatings and wet-area refinishing. Free consultation.",
    eyebrow: "Epoxy & garage floors",
    h1: "Epoxy floors that make the garage <em>the best room in the house.</em>",
    lede: "From a tired concrete garage to a flake finish you'd happily park on. OCJ Groups lays epoxy for homes, commercial floors and roads.",
    heroImg: ["flake", "Close-up of a flake epoxy floor finish"],
  },
  {
    file: "concrete-resurfacing-melbourne.html",
    nav: "Concrete Resurfacing",
    icon: "drive",
    card: "Driveways, paths, ramps and garage floors given a brand-new surface over the concrete you've already got.",
    img: "drive-dark",
    title: "Concrete Resurfacing Melbourne | Driveways & Paths | OCJ Groups",
    desc: "Concrete resurfacing in Melbourne from OCJ Groups. Tired driveways, paths, ramps and garage floors given a brand-new surface. Free consultation, based in Fawkner.",
    eyebrow: "Concrete resurfacing",
    h1: "Your driveway, <em>brand new again.</em>",
    lede: "Stained, tired or faded concrete doesn't have to be dug up. Resurfacing puts a fresh new surface over the concrete you've already got: driveways, paths, ramps and garage floors.",
    heroImg: ["drive-dark", "Resurfaced driveway in front of a home"],
  },
  {
    file: "road-safety-surfacing.html",
    nav: "Road Safety Surfacing",
    icon: "road",
    card: "High friction surfacing and coloured surface treatments. Bus lanes, plazas, paths and major projects.",
    img: "bus-lane",
    title: "Road Safety Surfacing Melbourne | High Friction & Coloured Surfacing | OCJ Groups",
    desc: "High friction surfacing and coloured surface treatments in Victoria from OCJ Groups. 15 years' experience on bus lanes, road projects, plazas and major projects.",
    eyebrow: "Road safety surfacing",
    h1: "High friction and coloured surfacing, <em>15 years on the road.</em>",
    lede: "Bus lanes, plazas, paths and major projects. OCJ Groups has 15 years' experience in high friction surfacing and coloured surface treatments across Victoria.",
    heroImg: ["bus-lane", "Red coloured bus lane surfacing at an intersection"],
  },
];
const svc = (f) => SERVICES.find((s) => s.file === f);

const ICONS = {
  balcony: '<path d="M4 20h16M6 20v-6h12v6M3 14h18M8 14V9a4 4 0 0 1 8 0v5"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  floor: '<path d="M3 17l9 4 9-4M3 12l9 4 9-4M12 3l9 4-9 4-9-4 9-4z"/>',
  drive: '<path d="M8 21L10 3M16 21L14 3M12 7v2M12 13v2M12 18v1"/>',
  road: '<path d="M4 21L8 3h8l4 18M12 6v3M12 12v3M12 18v2"/>',
  tile: '<rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/>',
  pin: '<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
  fb: '<path d="M15 3h-3a4 4 0 0 0-4 4v3H6v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z"/>',
};
const icon = (k, cls = "ic") =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg>`;

/* ---------- the balcony cross-section (drawn, not photographed: no invented job) ---------- */
function balconyDiagram() {
  // deterministic speckle for the recycled-glass top coat
  let s = 7;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const cols = ["#E0283C", "#F3F1ED", "#7A808A", "#2BA6F5", "#D9B86C", "#15171B"];
  let dots = "";
  for (let i = 0; i < 260; i++) {
    const x = 40 + rnd() * 520, y = 82 + rnd() * 26, r = 1 + rnd() * 2.2;
    dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${cols[Math.floor(rnd() * cols.length)]}"/>`;
  }
  let tiles = "";
  for (let x = 40; x < 560; x += 52) tiles += `<rect x="${x + 1}" y="136" width="50" height="22" rx="2" fill="#6B6258"/>`;
  const badge = (x, y, n) =>
    `<circle cx="${x}" cy="${y}" r="15" fill="#E0283C"/><text x="${x}" y="${y + 5.5}" text-anchor="middle" font-family="Archivo, Arial, sans-serif" font-weight="900" font-size="16" fill="#fff">${n}</text>`;
  return `<svg class="diagram" viewBox="0 0 600 250" role="img" aria-label="Cross-section: your existing balcony stays put, the OCJ system goes over the top, finished with a coloured recycled glass surface">
  <defs><clipPath id="topcoat"><rect x="40" y="80" width="520" height="30" rx="4"/></clipPath></defs>
  <rect x="40" y="160" width="520" height="70" rx="4" fill="#3A3F47"/>
  ${tiles}
  <rect x="40" y="112" width="520" height="22" rx="3" fill="#BF1E2E"/>
  <rect x="40" y="80" width="520" height="30" rx="4" fill="#2A2E35"/>
  <g clip-path="url(#topcoat)">${dots}</g>
  ${badge(40, 52, 1)}<path d="M40 67v13" stroke="#E0283C" stroke-width="2"/>
  ${badge(300, 52, 2)}<path d="M300 67v45" stroke="#E0283C" stroke-width="2" stroke-dasharray="3 3"/>
  ${badge(560, 52, 3)}<path d="M560 67v69" stroke="#E0283C" stroke-width="2" stroke-dasharray="3 3"/>
</svg>
<ol class="legend">
  <li><b>1</b><span><strong>Finished surface</strong>Coloured recycled glass, supplied by CRG</span></li>
  <li><b>2</b><span><strong>The OCJ system</strong>Goes straight over the top</span></li>
  <li><b>3</b><span><strong>Your existing balcony</strong>Stays where it is. Nothing removed.</span></li>
</ol>`;
}

/* ---------- open-tracking beacon: the three gates (armed ?v= / visible / 5s dwell) ---------- */
const BEACON = `<script>
(function(){try{
  if(navigator.webdriver)return;
  var v=new URLSearchParams(location.search).get('v');
  if(!v)return;
  var slug="${SLUG}", label="${LEAD.label}", phone="${LEAD.phone}";
  var k="mpl_seen_"+slug, last=+localStorage.getItem(k)||0;
  if(Date.now()-last<432e5)return;
  var fired=false,dwell=0,t=null;
  function live(){return document.visibilityState==="visible";}
  function send(how){
    if(fired||!live())return; fired=true; if(t)clearInterval(t);
    localStorage.setItem(k,String(Date.now()));
    new Image().src="https://mplaunch.com.au/api/preview-view?slug="+encodeURIComponent(slug)
      +"&label="+encodeURIComponent(label)+"&phone="+encodeURIComponent(phone)
      +"&src="+encodeURIComponent(v)+"&via="+how+"&t="+Date.now();
  }
  function start(){
    t=setInterval(function(){if(!live())return; dwell+=500; if(dwell>=5000)send("dwell");},500);
    ["pointerdown","scroll","keydown"].forEach(function(e){
      addEventListener(e,function(){send("interaction");},{once:true,passive:true});});
  }
  if(document.prerendering){document.addEventListener("prerenderingchange",start,{once:true});}
  else{start();}
}catch(e){}})();
</script>`;

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: BIZ.name,
  url: "https://www.ocjgroups.com.au/",
  telephone: BIZ.joeTel,
  email: BIZ.email,
  address: { "@type": "PostalAddress", addressLocality: BIZ.suburb, addressRegion: BIZ.state, postalCode: BIZ.postcode, addressCountry: "AU" },
  areaServed: { "@type": "State", name: "Victoria" },
  sameAs: [BIZ.insta, BIZ.facebook],
  knowsAbout: ["Waterproofing", "Leaking balcony repair", "Epoxy flooring", "Concrete resurfacing", "Road safety surfacing", "Tiling"],
};

/* ---------- chrome ---------- */
const head = (title, desc) => `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#0E0F11">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<link rel="icon" href="${FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,500..900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
<script>document.documentElement.className+=" js";setTimeout(function(){document.documentElement.classList.add("rv-all")},2500);</script>
<script type="application/ld+json">${JSON.stringify(JSONLD)}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>`;

const cur = (c, f) => (c === f ? ' aria-current="page"' : "");

const header = (current) => `
<div class="topbar"><div class="wrap">
  <span class="hide-sm">Waterproofing &middot; Epoxy &middot; Concrete resurfacing &middot; ${BIZ.suburb}, Melbourne</span>
  <span>Call Joe <a href="tel:${BIZ.joeTel}">${BIZ.joe}</a></span>
</div></div>
<header class="hdr">
  <div class="wrap hdr-in">
    <a class="lockup" href="index.html" aria-label="OCJ Groups, home">${LOGO(74)}</a>
    <input type="checkbox" id="nav-t" aria-hidden="true">
    <label class="burger" for="nav-t" aria-label="Menu"><span></span><span></span><span></span></label>
    <nav class="nav" aria-label="Main">
      <a class="lnk" href="index.html"${cur(current, "index.html")}>Home</a>
      <div class="dd">
        <a class="lnk" href="index.html#services"${svc(current) ? ' aria-current="page"' : ""}>Services</a>
        <div class="dd-menu">${SERVICES.map((s) => `<a href="${s.file}">${icon(s.icon)}${s.nav}</a>`).join("")}</div>
      </div>
      <a class="lnk" href="index.html#work">Our work</a>
      <a class="lnk" href="contact.html"${cur(current, "contact.html")}>Contact</a>
      <a class="btn btn-red" href="contact.html">Free consultation</a>
    </nav>
  </div>
</header>
<main id="main">`;

const serviceOptions = [...SERVICES.map((s) => s.nav), "Tiling"].map((n) => `<option>${n}</option>`).join("");

const ctaBand = (h = "Tell us about the job", sub = "Ring Joe, send a couple of photos, or fill in the form. The consultation is free.") => `
<section class="cta" id="quote">
  <div class="wrap cta-in">
    <div data-r>
      <p class="eyebrow">Free consultation</p>
      <h2 class="h-sec">${h}</h2>
      <p class="lede">${sub}</p>
      <div class="contact-lines">
        <a href="tel:${BIZ.joeTel}">${icon("phone")}<span><small>Joe</small>${BIZ.joe}</span></a>
        <a href="tel:${BIZ.shantTel}">${icon("phone")}<span><small>Shant</small>${BIZ.shant}</span></a>
        <a href="mailto:${BIZ.email}">${icon("mail")}<span><small>Email</small>${BIZ.email}</span></a>
        <div>${icon("pin")}<span><small>Based in</small>${BIZ.suburb}, working across Victoria</span></div>
      </div>
    </div>
    <form class="form" data-r data-d="1" onsubmit="return false">
      <h3>Get a free consultation</h3>
      <div class="f-row">
        <div class="f-field"><label for="q-name">Name</label><input id="q-name" type="text" autocomplete="name"></div>
        <div class="f-field"><label for="q-phone">Phone</label><input id="q-phone" type="tel" autocomplete="tel"></div>
      </div>
      <div class="f-row">
        <div class="f-field"><label for="q-svc">What do you need?</label><select id="q-svc"><option value="">Choose a service</option>${serviceOptions}<option>Something else</option></select></div>
        <div class="f-field"><label for="q-where">Suburb</label><input id="q-where" type="text" autocomplete="address-level2"></div>
      </div>
      <div class="f-field"><label for="q-msg">Tell us about it</label><textarea id="q-msg" rows="3" placeholder="e.g. water coming through the ceiling under our balcony"></textarea></div>
      <a class="btn btn-red btn-block" href="mailto:${BIZ.email}?subject=Free%20consultation%20request">Send enquiry ${icon("arrow")}</a>
      <p class="fnote">Concept note: on the live site this form lands straight in your inbox and texts your phone, with spam protection.</p>
    </form>
  </div>
</section>`;

const footer = `
</main>
<footer class="ftr">
  <div class="wrap ftr-in">
    <div>
      <a class="lockup" href="index.html">${LOGO(96)}</a>
      <p>Waterproofing, epoxy floors, concrete resurfacing and road safety surfacing. Based in ${BIZ.suburb}, working across Victoria.</p>
      <div class="socials">
        <a href="${BIZ.insta}" target="_blank" rel="noopener" aria-label="OCJ Groups on Instagram">${icon("insta")}</a>
        <a href="${BIZ.facebook}" target="_blank" rel="noopener" aria-label="OCJ Groups on Facebook">${icon("fb")}</a>
      </div>
    </div>
    <div>
      <h4>Services</h4>
      <ul>${SERVICES.map((s) => `<li><a href="${s.file}">${s.nav}</a></li>`).join("")}<li><a href="index.html#services">Tiling</a></li></ul>
    </div>
    <div>
      <h4>Contact</h4>
      <ul>
        <li><a href="tel:${BIZ.joeTel}">Joe ${BIZ.joe}</a></li>
        <li><a href="tel:${BIZ.shantTel}">Shant ${BIZ.shant}</a></li>
        <li><a href="mailto:${BIZ.email}">${BIZ.email}</a></li>
        <li><a href="contact.html">${BIZ.suburb}, Melbourne</a></li>
      </ul>
    </div>
  </div>
  <div class="ftr-bar"><div class="wrap">
    <span>&copy; ${BIZ.name} &middot; ${BIZ.suburb}, Victoria</span>
    <span>Website concept by <a href="https://mplaunch.com.au">MP Launch</a></span>
  </div></div>
</footer>
<div class="mbar">
  <a class="btn btn-red" href="tel:${BIZ.joeTel}">${icon("phone")} Call Joe</a>
  <a class="btn btn-ghost" href="contact.html">Free consultation</a>
</div>
<a class="ribbon" href="https://mplaunch.com.au"><i></i>Design concept &middot; MP Launch</a>
<script>
(function(){var els=document.querySelectorAll('[data-r]');if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px'});
els.forEach(function(e){io.observe(e)});
document.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){var t=document.getElementById('nav-t');if(t)t.checked=false})});})();
</script>
${BEACON}
</body>
</html>`;

const gallery = (items) =>
  `<div class="gallery">${items
    .map(([n, cap], i) => `<figure data-r data-d="${(i % 3) + 1}">${pic(n, cap)}<figcaption>${cap}</figcaption></figure>`)
    .join("")}</div>`;

const otherServices = (file) => `
<section class="sec sec-tight">
  <div class="wrap">
    <p class="eyebrow">More from OCJ Groups</p>
    <div class="more">${SERVICES.filter((s) => s.file !== file)
      .map((s) => `<a href="${s.file}" data-r>${icon(s.icon)}<span>${s.nav}</span>${icon("arrow", "ic go")}</a>`)
      .join("")}</div>
  </div>
</section>`;

const pageHero = (s) => `
<section class="phero">
  <div class="wrap phero-in">
    <div data-r>
      <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a> / <a href="index.html#services">Services</a> / <span>${s.nav}</span></nav>
      <p class="eyebrow">${s.eyebrow}</p>
      <h1 class="h-hero h-page">${s.h1}</h1>
      <p class="lede">${s.lede}</p>
      <div class="ctas">
        <a class="btn btn-red" href="tel:${BIZ.joeTel}">${icon("phone")} Call Joe ${BIZ.joe}</a>
        <a class="btn btn-ghost" href="#quote">Free consultation</a>
      </div>
    </div>
    <figure class="phero-img" data-r data-d="1">${pic(s.heroImg[0], s.heroImg[1], { eager: true })}</figure>
  </div>
</section>`;

const points = (arr) =>
  `<div class="points">${arr
    .map(([h, p], i) => `<div class="point" data-r data-d="${(i % 3) + 1}">${icon("check")}<h3>${h}</h3><p>${p}</p></div>`)
    .join("")}</div>`;

const SURFACES = ["Balconies", "Retaining walls", "Basement walls", "Internal wet areas", "Roof decks", "Green roofs", "Carparks"];
const SUPPLIERS = ["Parchem", "Bayset", "APTC Australia", "Omnigrip Direct", "CRG (coloured recycled glass)"];

/* ---------- pages ---------- */
const pages = {};

pages["index.html"] = `${head(
  "OCJ Groups | Waterproofing, Epoxy & Concrete Resurfacing Melbourne",
  "OCJ Groups: waterproofing, leaking balcony repair without demolition, epoxy garage floors, concrete resurfacing and road safety surfacing. Based in Fawkner, working across Melbourne and Victoria. Free consultation.",
)}${header("index.html")}
<section class="hero">
  <div class="hero-tex" aria-hidden="true"></div>
  <div class="wrap hero-in">
    <div class="hero-copy" data-r>
      <p class="eyebrow">Waterproofing &middot; Epoxy &middot; Resurfacing &middot; Melbourne</p>
      <h1 class="h-hero">Stop the leak.<br><em>Keep the balcony.</em></h1>
      <p class="lede">OCJ Groups fixes leaking balconies from the top, with nothing ripped up. We also waterproof wet areas, basements and roof decks, lay epoxy garage floors and bring tired driveways back to new.</p>
      <div class="ctas">
        <a class="btn btn-red btn-lg" href="tel:${BIZ.joeTel}">${icon("phone")} Call Joe ${BIZ.joe}</a>
        <a class="btn btn-ghost btn-lg" href="contact.html">Get a free consultation</a>
      </div>
      <ul class="chips">
        <li>${icon("check")}20+ years waterproofing</li>
        <li>${icon("check")}Residential &amp; commercial</li>
        <li>${icon("check")}Free consultation</li>
      </ul>
    </div>
    <div class="mosaic" data-r data-d="1">
      <figure class="m1">${pic("balcony-membrane", "A balcony sealed by OCJ Groups", { eager: true })}<figcaption>Balcony membrane</figcaption></figure>
      <figure class="m2">${pic("flake", "Flake epoxy floor finish", { eager: true })}<figcaption>Flake epoxy</figcaption></figure>
      <figure class="m3">${pic("drive-dark", "Resurfaced driveway", { eager: true })}<figcaption>Driveway, resurfaced</figcaption></figure>
      <figure class="m4">${pic("van", "The OCJ Groups van", { eager: true })}</figure>
    </div>
  </div>
</section>

<section class="stats">
  <div class="wrap stats-in">
    <div data-r><b>20+</b><span>years in waterproofing construction</span></div>
    <div data-r data-d="1"><b>15</b><span>years in road safety surfacing</span></div>
    <div data-r data-d="2"><b>6</b><span>services, one phone call</span></div>
    <div data-r data-d="3"><b>$0</b><span>for the consultation</span></div>
  </div>
</section>

<section class="feature">
  <div class="wrap feature-in">
    <div data-r>
      <p class="eyebrow">The balcony fix</p>
      <h2 class="h-sec">Leaking balcony? <em>No jackhammers.</em></h2>
      <p class="lede">Most people with a leaking balcony expect the tiles to come up and a lot of mess. OCJ Groups' system goes straight over the top of your existing balcony. Nothing gets removed, and you're left with a clean new finish made with coloured recycled glass.</p>
      <ul class="ticks">
        <li>${icon("check")}Nothing ripped up, nothing removed</li>
        <li>${icon("check")}A finished surface, not a patch job</li>
        <li>${icon("check")}Coloured recycled glass, supplied by CRG</li>
      </ul>
      <div class="ctas">
        <a class="btn btn-red" href="leaking-balcony-repair-melbourne.html">How the balcony fix works ${icon("arrow")}</a>
      </div>
    </div>
    <div class="diagram-card" data-r data-d="1">${balconyDiagram()}</div>
  </div>
</section>

<section class="sec paper" id="services">
  <div class="wrap">
    <div class="sec-head" data-r>
      <p class="eyebrow">What we do</p>
      <h2 class="h-sec">Six services. <em>One call to Joe.</em></h2>
      <p class="lede">Waterproofing, floors and surfaces for homes, businesses and major projects across Victoria.</p>
    </div>
    <div class="cards">
      ${SERVICES.map(
        (s, i) => `<a class="card" href="${s.file}" data-r data-d="${(i % 3) + 1}">
        <div class="card-img">${pic(s.img, s.nav)}</div>
        <div class="card-body">${icon(s.icon)}<h3>${s.nav}</h3><p>${s.card}</p><span class="more-lnk">Learn more ${icon("arrow")}</span></div>
      </a>`,
      ).join("")}
      <a class="card" href="contact.html" data-r data-d="3">
        <div class="card-img">${pic("tiles", "Tile samples laid out on a floor")}</div>
        <div class="card-body">${icon("tile")}<h3>Tiling</h3><p>Install and supply, all types of tiles. Pairs with our wet-area waterproofing.</p><span class="more-lnk">Ask about tiling ${icon("arrow")}</span></div>
      </a>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap split">
    <div data-r>
      <p class="eyebrow">Waterproofing</p>
      <h2 class="h-sec">If water can get in, <em>we can seal it.</em></h2>
      <p class="lede">Internal, external, caulking and screeding, with over 20 years' experience in waterproofing construction.</p>
      <div class="surfaces">${SURFACES.map((x) => `<span>${x}</span>`).join("")}</div>
      <a class="btn btn-ghost" href="waterproofing-melbourne.html">Waterproofing ${icon("arrow")}</a>
    </div>
    <div class="duo" data-r data-d="1">
      <figure>${pic("hyatt", "Waterproofing at the Grand Hyatt Melbourne")}<figcaption>Grand Hyatt Melbourne</figcaption></figure>
      <figure>${pic("wetarea", "Internal wet area membrane")}<figcaption>Internal wet area</figcaption></figure>
    </div>
  </div>
</section>

<section class="quote">
  <div class="wrap" data-r>
    <p class="big">Zero defects. <em>On&nbsp;time.</em> On&nbsp;budget.</p>
    <p class="by">The OCJ Groups standard</p>
  </div>
</section>

<section class="sec" id="work">
  <div class="wrap">
    <div class="sec-head" data-r>
      <p class="eyebrow">Our work</p>
      <h2 class="h-sec">Real jobs. <em>Our photos.</em></h2>
    </div>
    ${gallery([
      ["drive-red", "Red driveway resurfacing"],
      ["drive-dark-2", "Driveway, resurfaced"],
      ["bus-taxi", "Bus and taxi lane surfacing"],
      ["shower", "Shower base, recoated"],
      ["drive-grey", "Garage apron and driveway"],
      ["stadium", "Coloured surfacing, major project"],
      ["retaining-wall", "Retaining wall membrane"],
      ["path", "Garden path"],
      ["plaza", "Plaza surfacing"],
      ["ramp", "Basement ramp"],
      ["red-path", "Coloured path treatment"],
      ["green-surface", "Coloured surface treatment"],
    ])}
  </div>
</section>

<section class="sec paper sec-tight">
  <div class="wrap about">
    <div data-r>
      <p class="eyebrow">About OCJ Groups</p>
      <h2 class="h-sec">Twenty years sealing buildings. <em>Fifteen on the roads.</em></h2>
    </div>
    <div data-r data-d="1">
      <p>OCJ Groups has over 20 years' experience in waterproofing construction and 15 years in road safety surfacing, operating across Victoria out of ${BIZ.suburb}. Residential and commercial, domestic garages to major projects.</p>
      <p>Our determination is to install products that satisfy the needs of our customers. We continually monitor the products we supply and keep improving how we work.</p>
      <p class="suppliers-lbl">Suppliers we work with</p>
      <div class="suppliers">${SUPPLIERS.map((x) => `<span>${x}</span>`).join("")}</div>
    </div>
  </div>
</section>

<section class="insta">
  <div class="wrap insta-in">
    <div data-r>
      <p class="eyebrow">Follow the work</p>
      <h2 class="h-sec">See it done on <em>Instagram.</em></h2>
      <a class="btn btn-ghost" href="${BIZ.insta}" target="_blank" rel="noopener">${icon("insta")} @ocjgroups</a>
    </div>
    <a class="strip" href="${BIZ.insta}" target="_blank" rel="noopener" aria-label="OCJ Groups on Instagram" data-r data-d="1">
      ${["flake", "garage-coat", "shower", "hyatt", "retaining-wall"].map((n) => pic(n, "")).join("")}
    </a>
  </div>
</section>
${ctaBand()}
${footer}`;

/* ---- leaking balconies ---- */
{
  const s = svc("leaking-balcony-repair-melbourne.html");
  pages[s.file] = `${head(s.title, s.desc)}${header(s.file)}${pageHero(s)}
<section class="sec">
  <div class="wrap split split-top">
    <div data-r>
      <p class="eyebrow">How it works</p>
      <h2 class="h-sec">Fixed from the top, <em>not torn up from the bottom.</em></h2>
      <p class="lede">The usual answer to a leaking balcony is to pull everything up and start again. The OCJ Groups system goes straight over the top of the balcony you've already got. Nothing gets removed.</p>
      <p>The finish is made with coloured recycled glass, supplied by CRG, so the balcony ends up looking finished rather than patched.</p>
    </div>
    <div class="diagram-card" data-r data-d="1">${balconyDiagram()}</div>
  </div>
</section>
<section class="sec paper">
  <div class="wrap">
    <div class="sec-head" data-r>
      <p class="eyebrow">Sound familiar?</p>
      <h2 class="h-sec">Signs your balcony is leaking</h2>
    </div>
    ${points([
      ["Water through the ceiling below", "Drips, bubbling paint or a brown stain on the ceiling under the balcony after rain."],
      ["Damp walls or skirting", "Wet patches or mould creeping along the wall where the balcony meets the house."],
      ["Cracked or drummy tiles", "Loose, cracked or hollow-sounding tiles and grout that won't stay put."],
    ])}
  </div>
</section>
<section class="sec">
  <div class="wrap">
    <div class="sec-head" data-r>
      <p class="eyebrow">Three steps</p>
      <h2 class="h-sec">From leak to <em>fixed.</em></h2>
    </div>
    <ol class="steps">
      <li data-r><b>1</b><h3>Send us a photo</h3><p>Ring or text Joe on <a href="tel:${BIZ.joeTel}">${BIZ.joe}</a> with a couple of photos of the balcony and the damage below.</p></li>
      <li data-r data-d="1"><b>2</b><h3>Free consultation</h3><p>We take a look and tell you straight what the job needs. The consultation costs nothing.</p></li>
      <li data-r data-d="2"><b>3</b><h3>Fixed over the top</h3><p>The system goes on over your existing balcony. Nothing removed, and a clean new finish when we're done.</p></li>
    </ol>
  </div>
</section>
<section class="sec paper sec-tight">
  <div class="wrap">
    <div class="sec-head" data-r><p class="eyebrow">Balcony waterproofing</p><h2 class="h-sec">On the job</h2></div>
    ${gallery([
      ["balcony-membrane", "Membrane, balcony floor"],
      ["balcony-membrane-2", "Membrane detail"],
      ["retaining-wall", "Retaining wall membrane"],
    ])}
    <p class="insta-note" data-r><a href="${BIZ.insta}" target="_blank" rel="noopener">${icon("insta")} Watch balcony jobs on Instagram @ocjgroups</a></p>
  </div>
</section>
${ctaBand("Got a leaking balcony?", "Send Joe a photo of the balcony and the damage underneath. The consultation is free.")}
${otherServices(s.file)}
${footer}`;
}

/* ---- waterproofing ---- */
{
  const s = svc("waterproofing-melbourne.html");
  pages[s.file] = `${head(s.title, s.desc)}${header(s.file)}${pageHero(s)}
<section class="sec">
  <div class="wrap split">
    <div data-r>
      <p class="eyebrow">What we waterproof</p>
      <h2 class="h-sec">Every surface <em>water wants to get through.</em></h2>
      <div class="surfaces big">${SURFACES.map((x) => `<span>${x}</span>`).join("")}</div>
    </div>
    <div data-r data-d="1">
      ${points([
        ["Internal", "Bathrooms, laundries and wet areas, sealed before the tiles go down."],
        ["External", "Balconies, roof decks, retaining and basement walls, green roofs and carparks."],
        ["Caulking & screeding", "The joins and the falls, done properly so water goes where it should."],
      ])}
    </div>
  </div>
</section>
<section class="project">
  <div class="wrap project-in">
    <figure data-r>${pic("hyatt", "Waterproofing at the Grand Hyatt Melbourne")}</figure>
    <div data-r data-d="1">
      <p class="eyebrow">Project</p>
      <h2 class="h-sec">Grand Hyatt <em>Melbourne.</em></h2>
      <p class="lede">Waterproofing on the Grand Hyatt in the Melbourne CBD. Big jobs and small ones, from a city hotel to your bathroom.</p>
      <a class="btn btn-ghost" href="${BIZ.insta}" target="_blank" rel="noopener">${icon("insta")} See it on Instagram</a>
    </div>
  </div>
</section>
<section class="sec paper sec-tight">
  <div class="wrap">
    <div class="sec-head" data-r><p class="eyebrow">Recent waterproofing</p><h2 class="h-sec">On the job</h2></div>
    ${gallery([
      ["wetarea", "Internal wet area membrane"],
      ["retaining-wall", "Retaining wall membrane"],
      ["balcony-membrane", "Membrane, balcony floor"],
      ["blue-membrane", "Membrane, walls and floor"],
      ["balcony-membrane-2", "Membrane detail"],
      ["tiles-2", "Tiles ready for install"],
    ])}
  </div>
</section>
${ctaBand("Water getting in somewhere?", "Ring Joe or send the details through. The consultation is free.")}
${otherServices(s.file)}
${footer}`;
}

/* ---- epoxy ---- */
{
  const s = svc("epoxy-garage-floors-melbourne.html");
  pages[s.file] = `${head(s.title, s.desc)}${header(s.file)}${pageHero(s)}
<section class="sec">
  <div class="wrap">
    <div class="sec-head" data-r><p class="eyebrow">Before and after</p><h2 class="h-sec">Same garage. <em>Different floor.</em></h2></div>
    <div class="ba" data-r>
      <figure>${pic("garage-before", "Garage floor before epoxy")}<figcaption><b>Before</b> Bare, stained concrete</figcaption></figure>
      <figure>${pic("garage-coat", "Epoxy going down on a garage floor")}<figcaption><b>During</b> The coating goes down</figcaption></figure>
      <figure>${pic("flake", "Finished flake epoxy floor")}<figcaption><b>The finish</b> Flake epoxy</figcaption></figure>
    </div>
  </div>
</section>
<section class="sec paper">
  <div class="wrap">
    <div class="sec-head" data-r><p class="eyebrow">Where we lay it</p><h2 class="h-sec">Commercial, domestic <em>and roads.</em></h2></div>
    ${points([
      ["Garages at home", "Turn a dusty slab into a floor that sweeps clean and looks the part."],
      ["Commercial floors", "Epoxy for commercial floors and spaces."],
      ["Roads", "Epoxy surfacing for road and traffic projects, backed by 15 years on the roads."],
    ])}
  </div>
</section>
<section class="sec sec-tight">
  <div class="wrap">
    ${gallery([
      ["shower", "Shower base, recoated"],
      ["drive-grey", "Garage apron and driveway"],
      ["ramp", "Basement ramp"],
    ])}
  </div>
</section>
${ctaBand("Want a floor like that?", "Ring Joe with the size of the garage or floor. The consultation is free.")}
${otherServices(s.file)}
${footer}`;
}

/* ---- resurfacing ---- */
{
  const s = svc("concrete-resurfacing-melbourne.html");
  pages[s.file] = `${head(s.title, s.desc)}${header(s.file)}${pageHero(s)}
<section class="sec">
  <div class="wrap split">
    <div data-r>
      <p class="eyebrow">Why resurface</p>
      <h2 class="h-sec">Don't dig it up. <em>Make it new.</em></h2>
      <p class="lede">Concrete that's stained, faded or just tired can be given a completely new surface. Driveways, paths, ramps and garage floors, in a range of colours.</p>
      <div class="surfaces">${["Driveways", "Paths", "Garage floors", "Ramps", "Patios & aprons"].map((x) => `<span>${x}</span>`).join("")}</div>
    </div>
    <div class="ba ba-2" data-r data-d="1">
      <figure>${pic("concrete-before", "Tired, stained concrete before resurfacing")}<figcaption><b>Before</b> Tired concrete</figcaption></figure>
      <figure>${pic("drive-dark-2", "Resurfaced driveway")}<figcaption><b>After</b> Resurfaced</figcaption></figure>
    </div>
  </div>
</section>
<section class="sec paper sec-tight">
  <div class="wrap">
    <div class="sec-head" data-r><p class="eyebrow">Recent resurfacing</p><h2 class="h-sec">Driveways and paths</h2></div>
    ${gallery([
      ["drive-red", "Red driveway resurfacing"],
      ["drive-dark", "Dark driveway resurfacing"],
      ["drive-grey", "Grey garage apron"],
      ["path", "Garden path"],
      ["ramp", "Basement ramp"],
      ["road-curve", "Coloured driveway surfacing"],
    ])}
  </div>
</section>
${ctaBand("Driveway seen better days?", "Send Joe a photo of it. The consultation is free.")}
${otherServices(s.file)}
${footer}`;
}

/* ---- road safety ---- */
{
  const s = svc("road-safety-surfacing.html");
  pages[s.file] = `${head(s.title, s.desc)}${header(s.file)}${pageHero(s)}
<section class="sec">
  <div class="wrap split">
    <div data-r>
      <p class="eyebrow">What we lay</p>
      <h2 class="h-sec">Surfaces that <em>keep people safe.</em></h2>
      ${points([
        ["High friction surfacing", "Extra grip where vehicles need to stop, turn or slow down."],
        ["Coloured surface treatments", "Red bus lanes, coloured plazas and paths that people can read at a glance."],
        ["Epoxy for roads", "Epoxy surfacing for road and traffic projects."],
      ])}
    </div>
    <div class="duo" data-r data-d="1">
      <figure>${pic("bus-taxi", "Bus and taxi only lanes")}<figcaption>Bus and taxi lanes</figcaption></figure>
      <figure>${pic("bus-lane-2", "Red bus lane beside a main road")}<figcaption>Bus lane</figcaption></figure>
    </div>
  </div>
</section>
<section class="sec paper sec-tight">
  <div class="wrap">
    <div class="sec-head" data-r><p class="eyebrow">Major projects</p><h2 class="h-sec">15 years of <em>coloured surfacing.</em></h2></div>
    ${gallery([
      ["stadium", "Coloured surfacing, major project"],
      ["plaza", "Plaza surfacing"],
      ["plaza-2", "Plaza surfacing detail"],
      ["green-surface", "Green coloured surface treatment"],
      ["court-logo", "Coloured court surfacing with logo"],
      ["red-path", "Coloured path treatment"],
    ])}
  </div>
</section>
${ctaBand("Got a road or commercial job?", "Builders, councils and contractors: ring Joe or send the plans through.")}
${otherServices(s.file)}
${footer}`;
}

/* ---- contact ---- */
pages["contact.html"] = `${head(
  "Contact OCJ Groups | Free Consultation | Fawkner, Melbourne",
  "Contact OCJ Groups for a free consultation on waterproofing, leaking balconies, epoxy floors, concrete resurfacing and road safety surfacing. Call Joe on 0422 606 369.",
)}${header("contact.html")}
<section class="phero phero-slim">
  <div class="wrap">
    <div data-r>
      <p class="eyebrow">Contact</p>
      <h1 class="h-hero h-page">Talk to Joe. <em>The consultation is free.</em></h1>
      <p class="lede">The quickest way is a phone call or a text with a couple of photos of the job.</p>
    </div>
  </div>
</section>
${ctaBand("Get in touch", "Call, text, email or use the form. Based in Fawkner and working across Victoria.")}
${footer}`;

for (const [f, html] of Object.entries(pages)) writeFileSync(new URL(`./${f}`, import.meta.url), html);
console.log("wrote", Object.keys(pages).join(", "));

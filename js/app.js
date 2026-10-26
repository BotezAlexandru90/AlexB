/* Reveal entrances on scroll */
(function () {
  var reveals = document.querySelectorAll(".work-row, .intro-col, .about-statement, .portfolio-card, .contact-statement");
  var ro = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          ro.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );
  reveals.forEach(function (el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 600ms ease, transform 600ms ease";
    ro.observe(el);
  });
})();

/* Highlight the nav link of the section in view */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".top-nav a[href^='#']"));
  var items = links.map(function (a) {
    return { link: a, section: document.getElementById(a.getAttribute("href").slice(1)) };
  }).filter(function (i) { return i.section; });
  var ticking = false;

  function update() {
    ticking = false;
    var probe = window.innerHeight * 0.35;
    var current = null;
    items.forEach(function (i) {
      if (i.section.getBoundingClientRect().top <= probe) current = i;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = items[items.length - 1];
    }
    items.forEach(function (i) {
      var active = i === current;
      i.link.classList.toggle("is-active", active);
      if (active) i.link.setAttribute("aria-current", "true");
      else i.link.removeAttribute("aria-current");
    });
  }

  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

/* Reduced motion fallback */
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  var style = document.createElement("style");
  style.textContent = "*, *::before, *::after { transition: none !important; animation: none !important; } .work-row, .intro-col, .about-statement, .portfolio-card, .contact-statement { opacity: 1 !important; transform: none !important; }";
  document.head.appendChild(style);
}

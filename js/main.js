/* ── Nav scroll behaviour ── */
(function () {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  // Scroll: add .scrolled class
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close menu when a link is clicked
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-label", "Open menu");
      document.body.style.overflow = "";
    });
  });
})();

/* ── Collection filter ── */
(function () {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const match =
          filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !match);
      });
    });
  });
})();

/* ── Contact form — client-side validation before mailto submission ── */
(function () {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      note.textContent = "Please fill in all required fields.";
      note.className = "form__note error";
      return;
    }

    // Rely on the browser's built-in email validation (type="email")
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && !emailInput.checkValidity()) {
      e.preventDefault();
      note.textContent = "Please enter a valid email address.";
      note.className = "form__note error";
      return;
    }

    // Allow form to submit via mailto — opens the user's email client
    note.textContent = "Opening your email client…";
    note.className = "form__note success";
  });
})();

/* ── Footer year ── */
(function () {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();

/* ── Reveal on scroll (IntersectionObserver) ── */
(function () {
  if (!("IntersectionObserver" in window)) return;

  const targets = document.querySelectorAll(
    ".card, .step, .about__visual, .about__text"
  );

  const style = document.createElement("style");
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.visible { opacity: 1; transform: none; }
  `;
  document.head.appendChild(style);

  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
})();

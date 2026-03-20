/**
 * scroll-animate.js
 * ─────────────────────────────────────────────────────────────
 * Reusable scroll-triggered fade-in animation utility.
 * Configure animations per element by ID at the BOTTOM of this
 * file — easy to find, easy to edit, separate from all logic.
 * ─────────────────────────────────────────────────────────────
 */


// ═══════════════════════════════════════════════════════════════
//  DIRECTION PRESETS
//  Each preset defines the hidden (start) transform.
//  The visible state is always: opacity 1, transform none.
// ═══════════════════════════════════════════════════════════════

const PRESETS = {
  "fade-up":    { x:   0, y:  60, scale: 1    },
  "fade-down":  { x:   0, y: -40, scale: 1    },
  "fade-left":  { x:  50, y:   0, scale: 1    },
  "fade-right": { x: -50, y:   0, scale: 1    },
  "fade-in":    { x:   0, y:   0, scale: 1    },
  "zoom-in":    { x:   0, y:  20, scale: 0.88 },
  "zoom-out":   { x:   0, y: -20, scale: 1.1  },
};


// ═══════════════════════════════════════════════════════════════
//  CORE ENGINE  (do not edit — configure via ANIMATIONS below)
// ═══════════════════════════════════════════════════════════════

function hide(el, preset) {
  el.style.setProperty("opacity", "0", "important");
  el.style.setProperty("transform", `translate(${preset.x}px, ${preset.y}px) scale(${preset.scale})`, "important");
  el.style.willChange = "opacity, transform";
}

function reveal(el, opts) {
  el.style.transition = [
    `opacity ${opts.duration}ms ${opts.easing} ${opts.delay}ms`,
    `transform ${opts.duration}ms ${opts.easing} ${opts.delay}ms`,
  ].join(", ");

  // Double rAF ensures transition fires after hidden state paints
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("transform", "translate(0, 0) scale(1)", "important");
      el.dataset.animated = "true";
    });
  });
}

/**
 * Registers a single element for scroll-triggered animation.
 *
 * @param {string} id       — The element's HTML id attribute
 * @param {object} config
 *   @param {string}  config.from       "fade-up" | "fade-down" | "fade-left" |
 *                                      "fade-right" | "fade-in" | "zoom-in" | "zoom-out"
 *   @param {number}  config.delay      ms before animation starts        (default: 0)
 *   @param {number}  config.duration   ms the animation lasts            (default: 700)
 *   @param {string}  config.easing     any CSS easing string             (default: ease-out spring)
 *   @param {number}  config.threshold  0–1, visibility to trigger at     (default: 0.15)
 *   @param {number}  config.distance   px distance to travel (overrides preset) (optional)
 *   @param {boolean} config.once       animate only once                 (default: true)
 */
function animate(id, config = {}) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`[scroll-animate] No element found with id "${id}"`);
    return;
  }

  let preset = PRESETS[config.from] ?? PRESETS["fade-up"];
  
  // Allow custom distance override
  if (config.distance !== undefined) {
    preset = { ...preset };
    if (config.from === "fade-up") {
      preset.y = config.distance;
    } else if (config.from === "fade-down") {
      preset.y = -config.distance;
    } else if (config.from === "fade-left") {
      preset.x = config.distance;
    } else if (config.from === "fade-right") {
      preset.x = -config.distance;
    }
  }

  const opts = {
    duration:  config.duration  ?? 700,
    delay:     config.delay     ?? 0,
    easing:    config.easing    ?? "cubic-bezier(0.22, 1, 0.36, 1)",
    threshold: config.threshold ?? 0.15,
    once:      config.once      ?? true,
  };

  hide(el, preset);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(el, opts);
        if (opts.once) observer.unobserve(el);
      });
    },
    {
      threshold:  opts.threshold,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  observer.observe(el);
}

/**
 * Convenience wrapper — animate many elements at once.
 * @param {Array<{ id: string } & object>} items
 */
function animateAll(items = []) {
  items.forEach(({ id, ...config }) => animate(id, config));
}

/**
 * Animates text word by word, with each word's characters fading in from the right.
 *
 * @param {string} id       — The element's HTML id attribute
 * @param {object} config
 *   @param {number}  config.wordDelay    ms delay between each word        (default: 100)
 *   @param {number}  config.charDelay    ms delay between chars in word    (default: 20)
 *   @param {number}  config.startDelay   ms before animation starts        (default: 0)
 *   @param {number}  config.duration     ms each character takes           (default: 500)
 *   @param {number}  config.distance     px to slide from right            (default: 30)
 *   @param {number}  config.threshold    0–1, visibility to trigger at     (default: 0.15)
 *   @param {boolean} config.once         animate only once                 (default: true)
 */
function animateText(id, config = {}) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`[scroll-animate] No element found with id "${id}"`);
    return;
  }

  const opts = {
    wordDelay:  config.wordDelay  ?? 100,
    charDelay:  config.charDelay  ?? 20,
    startDelay: config.startDelay ?? 0,
    duration:   config.duration   ?? 500,
    distance:   config.distance   ?? 30,
    threshold:  config.threshold  ?? 0.15,
    once:       config.once       ?? true,
  };

  // easeOutBack cubic-bezier for bouncy effect
  const easeOutBack = "cubic-bezier(0.34, 1.56, 0.64, 1)";

  // Store original text and clear element
  const originalText = el.textContent;
  el.textContent = "";
  el.style.opacity = "1";
  el.style.perspective = "400px";

  // Split into words
  const words = originalText.split(" ");
  const wordElements = [];

  words.forEach((word, wordIndex) => {
    // Create word wrapper
    const wordWrapper = document.createElement("div");
    wordWrapper.style.position = "relative";
    wordWrapper.style.display = "inline-block";
    
    // Wrap each character in the word
    word.split("").forEach((char) => {
      const charSpan = document.createElement("div");
      charSpan.textContent = char;
      charSpan.style.position = "relative";
      charSpan.style.display = "inline-block";
      charSpan.style.opacity = "0";
      charSpan.style.transform = `translate(${opts.distance}px, 0px)`;
      charSpan.style.transition = `opacity ${opts.duration}ms ${easeOutBack}, transform ${opts.duration}ms ${easeOutBack}`;
      wordWrapper.appendChild(charSpan);
    });

    el.appendChild(wordWrapper);
    wordElements.push(wordWrapper);

    // Add space after word (except last word)
    if (wordIndex < words.length - 1) {
      const space = document.createTextNode(" ");
      el.appendChild(space);
    }
  });

  // Animate words on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Start animation after initial delay
        setTimeout(() => {
          wordElements.forEach((wordEl, wordIndex) => {
            const chars = wordEl.querySelectorAll("div");
            
            setTimeout(() => {
              chars.forEach((char, charIndex) => {
                setTimeout(() => {
                  char.style.opacity = "1";
                  char.style.transform = "translate(0px, 0px)";
                }, charIndex * opts.charDelay);
              });
            }, wordIndex * opts.wordDelay);
          });
        }, opts.startDelay);

        if (opts.once) observer.unobserve(el);
      });
    },
    {
      threshold: opts.threshold,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  observer.observe(el);
}

/** Runs callback once the DOM is ready. */
function ready(fn) {
  if (document.readyState !== "loading") fn();
  else document.addEventListener("DOMContentLoaded", fn);
}


// ═══════════════════════════════════════════════════════════════
//  ↓↓↓  USAGE — ADD YOUR ANIMATIONS HERE  ↓↓↓
//
//  Give any HTML element an id, then call animate() with it.
//
//  animate("your-element-id", {
//    from:      "fade-up",   // where it comes from  (see PRESETS)
//    delay:     0,           // ms — pause before playing
//    duration:  700,         // ms — how long it takes
//    threshold: 0.15,        // 0–1 — how visible before triggering
//    once:      true,        // false = re-animate every time it enters view
//  });
//
//  All fields are optional — only "from" is meaningful to set.
//  Pages that uses the script must put <script src="/src/scripts/name-of-page"></script>
// ═══════════════════════════════════════════════════════════════

ready(() => {

  //  animate("your-element-id", {
//    from:      "fade-up",   // where it comes from  (see PRESETS)
//    delay:     0,           // ms — pause before playing
//    duration:  700,         // ms — how long it takes
//    threshold: 0.15,        // 0–1 — how visible before triggering
//    once:      true,        // false = re-animate every time it enters view
//  });
    animate("trade-solutions", {
    from:      "fade-up",   // where it comes from  (see PRESETS)
    delay:     0,           // ms — pause before playing
    duration:  700,         // ms — how long it takes
    threshold: 0.15,        // 0–1 — how visible before triggering
    once:      true,        // false = re-animate every time it enters view
  });
    animate("title", {
    from:      "fade-up",  
    delay:     0,       
    duration:  700,    
    threshold: 0.15,     
    once:      true,       
  });

  // Industry Trust Bar animations
  animate("trust-header", {
    from:      "fade-up",
    delay:     0,
    duration:  700,
    threshold: 0.15,
    once:      true,
  });

  animate("cert-nate", {
    from:      "fade-up",
    delay:     150,
    duration:  800,
    threshold: 0.1,
    once:      true,
  });

  animate("cert-phcc", {
    from:      "fade-up",
    delay:     300,
    duration:  800,
    threshold: 0.1,
    once:      true,
  });

  animate("cert-google", {
    from:      "fade-up",
    delay:     450,
    duration:  800,
    threshold: 0.1,
    once:      true,
  });

  animate("cert-yelp", {
    from:      "fade-up",
    delay:     600,
    duration:  800,
    threshold: 0.1,
    once:      true,
  });

//------------------------------------------Statistics.astro
  animate("who-we-are-tag", {
    from:      "fade-left",
    delay:     0,
    duration:  700,
    distance:  80,
    threshold: 0.15,
    once:      true,
  });
  animate("our-vision-title", {
    from:      "fade-left",
    delay:     100,
    duration:  700,
    distance:  80,
    threshold: 0.15,
    once:      true,
  });
  animate("our-vision-desc", {
    from:      "fade-left",
    delay:     200,
    duration:  700,
    distance:  80,
    threshold: 0.15,
    once:      true,
  });
  animate("our-mission-desc", {
    from:      "fade-left",
    delay:     400,
    duration:  700,
    distance:  80,
    threshold: 0.15,
    once:      true,
  });
  animate("our-mission-title", {
    from:      "fade-left",
    delay:     300,
    duration:  700,
    distance:  80,
    threshold: 0.15,
    once:      true,
  });
  // Example usage:
  animateText("who-we-are-title", {
    wordDelay:  100,  // delay between words
    charDelay:  20,   // delay between characters in a word
    startDelay: 0,    // initial delay before starting
    duration:   1000,  // animation duration per character
    distance:   30,   // pixels to slide from right
    threshold:  0.15, // scroll trigger point
    once:       true  // animate only once
  });
// Statistics cards animations
  animate("stat-projects", {
    from:      "fade-up",
    delay:     150,
    duration:  800,
    distance:  80,
    threshold: 0.1,
    once:      true,
  });

  animate("stat-experience", {
    from:      "fade-up",
    delay:     300,
    duration:  800,
    distance:  80,
    threshold: 0.1,
    once:      true,
  });

  animate("stat-clients", {
    from:      "fade-up",
    delay:     450,
    duration:  800,
    distance:  80,
    threshold: 0.1,
    once:      true,
  });

  animate("stat-growth", {
    from:      "fade-up",
    delay:     600,
    duration:  800,
    distance:  80,
    threshold: 0.1,
    once:      true,
  });
  
//--------------------------------------------Reviews.astro
  animate("success-stories-tag", {
    from:      "fade-left",
    delay:     0,
    duration:  700,
    distance:  80,
    threshold: 0.15,
    once:      true,
  });
  animateText("success-stories-title", {
    wordDelay:  100,  // delay between words
    charDelay:  20,   // delay between characters in a word
    startDelay: 0,    // initial delay before starting
    duration:   1000,  // animation duration per character
    distance:   30,   // pixels to slide from right
    threshold:  0.15, // scroll trigger point
    once:       true  // animate only once
  });
  animate("success-stories-desc", {
    from:      "fade-left",
    delay:     200,
    duration:  700,
    distance:  80,
    threshold: 0.15,
    once:      true,
  });
  animate("success-stories-carousel", {
    from:      "fade-up",
    delay:     300,
    duration:  700,
    distance:  80,
    threshold: 0.15,
    once:      true,
  });

});
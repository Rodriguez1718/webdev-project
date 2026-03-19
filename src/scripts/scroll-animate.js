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
  "fade-up":    { x:   0, y:  40, scale: 1    },
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
  el.style.opacity    = "0";
  el.style.transform  = `translate(${preset.x}px, ${preset.y}px) scale(${preset.scale})`;
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
      el.style.opacity    = "1";
      el.style.transform  = "translate(0, 0) scale(1)";
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
 *   @param {boolean} config.once       animate only once                 (default: true)
 */
function animate(id, config = {}) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`[scroll-animate] No element found with id "${id}"`);
    return;
  }

  const preset = PRESETS[config.from] ?? PRESETS["fade-up"];

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

});

//------------------------------------------------------------------Mobile burger
document.addEventListener('DOMContentLoaded', function () {
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const tradesDropdownBtn = document.getElementById('tradesDropdownBtn');
  const tradesDropdown = document.getElementById('tradesDropdown');
  const tradesDropdownIcon = document.getElementById('tradesDropdownIcon');

  /**
   * OPTIMIZED: Batch all reads before writes to prevent forced reflow
   * Use requestAnimationFrame to defer layout measurements
   */
  function updateMenuHeight() {
    if (!mobileMenu) return;

    // Batch all reads first (no writes yet)
    const isExpanded = burgerBtn?.getAttribute('aria-expanded') === 'true';
    const menuContent = mobileMenu.querySelector('div');

    // Defer writes to next animation frame to prevent layout thrashing
    requestAnimationFrame(() => {
      if (isExpanded && menuContent) {
        // Read scrollHeight once, then write
        const height = menuContent.scrollHeight;
        mobileMenu.style.maxHeight = height + 'px';
      } else {
        mobileMenu.style.maxHeight = '0px';
      }
    });
  }

  burgerBtn?.addEventListener('click', function () {
    // Batch all reads first
    const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
    const newExpandedState = (!isExpanded).toString();

    // Batch all writes together
    burgerBtn.classList.toggle('open');
    burgerBtn.setAttribute('aria-expanded', newExpandedState);

    // Defer height update to next frame
    updateMenuHeight();
  });

  // Trades dropdown toggle
  tradesDropdownBtn?.addEventListener('click', function () {
    // Batch all reads first
    const isExpanded = tradesDropdownBtn.getAttribute('aria-expanded') === 'true';
    const newExpandedState = (!isExpanded).toString();

    // Batch all writes together
    tradesDropdownBtn.setAttribute('aria-expanded', newExpandedState);
    tradesDropdown?.classList.toggle('hidden');
    tradesDropdownIcon?.classList.toggle('rotate-180');

    // Defer height update to next frame
    updateMenuHeight();
  });

  // Close menu when a link is clicked
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-item[href]');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Batch all writes together
      if (burgerBtn) {
        burgerBtn.setAttribute('aria-expanded', 'false');
        burgerBtn.classList.remove('open');
      }
      if (mobileMenu) {
        mobileMenu.style.maxHeight = '0px';
      }
      if (tradesDropdown) {
        tradesDropdown.classList.add('hidden');
      }
      if (tradesDropdownBtn) {
        tradesDropdownBtn.setAttribute('aria-expanded', 'false');
      }
      if (tradesDropdownIcon) {
        tradesDropdownIcon.classList.remove('rotate-180');
      }
    });
  });
});
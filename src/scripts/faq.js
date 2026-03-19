// FAQ Accordion Script
document.addEventListener("DOMContentLoaded", () => {
    const accordion = document.getElementById("faqAccordion");
    if (!accordion) return;

    const items = accordion.querySelectorAll(".faq-item");

    items.forEach((item) => {
        const header = item.querySelector(".faq-header");
        const content = item.querySelector(".faq-content");

        if (!header || !content) return;

        header.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Close all items
            items.forEach((i) => {
                i.classList.remove("active");
                const itemContent = i.querySelector(".faq-content");
                const itemHeader = i.querySelector(".faq-header");
                if (itemContent) itemContent.classList.add("hidden");
                if (itemHeader) itemHeader.setAttribute("aria-expanded", "false");
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add("active");
                content.classList.remove("hidden");
                header.setAttribute("aria-expanded", "true");
            }
        });
    });
});

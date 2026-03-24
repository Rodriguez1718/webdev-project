/**
 * Trade Icon Mapping
 * Maps each trade category to its SVG icon path
 * Add new trades here and they'll automatically be available throughout the app
 */

export const tradeIcons: Record<string, string> = {
    // Building/construction with hard hat
    'General Construction': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 17h18M12 3C8 3 5 6 5 10v1h14v-1c0-4-3-7-7-7zM5 11h14v2H5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v3M8.5 4.5l1.5 2.5M15.5 4.5L14 7"/>`,

    // Hammer + chisel (remodelling/renovation)
    'Remodelling': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>`,

    // Lightning bolt (electrician)
    'Electrician': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>`,

    // Pipe wrench (plumbing)
    'Plumbing': `
        <g transform="scale(0.48) translate(0, 0)">
            <path fill="currentColor" d="M45.971 44.396c0-1.994-3.638-7.567-3.638-7.567s-3.693 5.573-3.693 7.567c0 1.99 1.642 3.604 3.666 3.604 2.023 0 3.665-1.614 3.665-3.604zm-26.305-31.225h-7.331v-7.227h1.999v-3.944h-13.334v3.944h2v11.17c0 2.904 2.388 5.257 5.333 5.257h11.333v1.972h4.001v-13.142h-4.001v1.97zm27.332 16.428v-11.17c0-2.903-2.387-5.257-5.329-5.257h-11.335v-1.97h-4.001v13.143h4.001v-1.973h7.332v7.227h-1.997v3.944h13.331v-3.944h-2.002z"/>
        </g>`,

    // Thermometer + wind waves (HVAC)
    'HVAC': `
        <g transform="scale(0.0234375) translate(0, 0)">
            <path fill="currentColor" d="M624.9 351.1c176.7-93.5 336.4 13.9 336.4 190.1 0 152.8-101.1 209-211.6 135.3-35.2-24.4-58.1-40.2-74.7-50.9 91.4 175.8-15.8 334.2-191.3 334.2-152.8 0-209-101.1-135.3-211.6 25.6-36.9 41.7-60.3 52.4-77.1-177.2 94.8-337.6-12.7-337.6-189.3 0-152.8 101.1-209 211.6-135.3 35.5 24.6 58.5 40.4 75.1 51.1-91.2-175.7 16-333.9 191.4-333.9 152.8 0 209 101.1 135.3 211.6-25 36-41 59.2-51.7 75.8z"/>
            <path fill="currentColor" d="M513.2 609.8c54.1 0 98-43.9 98-98s-43.9-98-98-98-98 43.9-98 98 43.9 98 98 98zM472.4 655.9c-10.6 26.5-28 52.7-77.4 123.4-48.6 72.8-19.9 124.5 88.7 124.5 146.9 0 227.6-137.2 117.2-291.8 0 0-51.3 25.7-87.8 25.7-11.6 0-22.9-1.6-33.6-4.5-1.7 7.7-4.1 15.2-7.1 22.7zM367 470.4c-26.5-10.6-52.7-28-123.4-77.4-72.8-48.6-124.5-19.9-124.5 88.7 0 147 137.2 227.6 291.8 117.2 0 0-23.7-50.8-23.7-87.2 0-11.7 1.6-23 4.6-33.7-8.4-1.8-16.6-4.3-24.8-7.6zM552.6 367.5c10.6-26.5 28-52.7 77.4-123.4 48.6-72.8 19.9-124.5-88.7-124.5-147 0-227.6 137.2-117.2 291.8 0 0 52.9-25.7 89.2-25.7 11.1 0 21.9 1.4 32.2 4.2 1.7-7.5 4.1-14.9 7.1-22.4zM613.5 424s25.7 50.6 25.7 87.8c0 11.6-1.6 22.9-4.5 33.6 7.7 1.8 15.2 4.2 22.7 7.2 26.5 10.6 52.7 28 123.4 77.4 72.8 48.6 124.5 19.9 124.5-88.7 0-147-137.2-227.7-291.8-117.3z"/>
        </g>`,

    // House with foundation lines (home builders)
    'Home Builders': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>`,

    // Roof triangle with shingles
    'Roofing': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10h2m2 0h2"/>`,
};

/**
 * Get icon for a specific trade
 * @param trade - The trade name
 * @returns SVG path string or default icon if trade not found
 */
export function getTradeIcon(trade: string): string {
    return (
        tradeIcons[trade] ||
        `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>`
    );
}

/**
 * Get all available trades
 * @returns Array of trade names
 */
export function getAllTrades(): string[] {
    return Object.keys(tradeIcons);
}

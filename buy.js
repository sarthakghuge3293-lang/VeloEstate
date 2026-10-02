// ==========================================
// VELOESTATE - BUY PAGE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const locationInput =
        document.getElementById("buyLocation");

    const typeFilter =
        document.getElementById("buyType");

    const budgetFilter =
        document.getElementById("buyBudget");

    const searchForm =
        document.getElementById("buySearchForm");

    const propertiesGrid =
        document.getElementById("buyPropertiesGrid");

    const noResults =
        document.getElementById("buyNoResults");

    const resetButton =
        document.getElementById("resetBuySearch");


    // ==========================================
    // BUY PROPERTIES
    // ==========================================

    const buyProperties = [

        {
            id: "1",
            title: "Modern Luxury Family Home",
            type: "House",
            purpose: "Buy",
            location: "Aurangabad",
            price: "₹1.25 Cr",
            priceValue: 12500000,

            meta: [
                "4 Beds",
                "3 Baths",
                "2,450 sq.ft"
            ],

            image:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
        },


        {
            id: "4",
            title: "Elegant Family Villa",
            type: "Villa",
            purpose: "Buy",
            location: "Nashik",
            price: "₹1.85 Cr",
            priceValue: 18500000,

            meta: [
                "4 Beds",
                "4 Baths",
                "3,100 sq.ft"
            ],

            image:
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"
        },


        {
            id: "6",
            title: "Premium Residential Plot",
            type: "Plot",
            purpose: "Buy",
            location: "Pune",
            price: "₹55 Lakh",
            priceValue: 5500000,

            meta: [
                "Residential",
                "Road Touch",
                "2,000 sq.ft"
            ],

            image:
                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85"
        }

    ];


    // ==========================================
    // USER LISTINGS
    // ==========================================

    function getUserListings() {

        try {

            const listings =
                JSON.parse(
                    localStorage.getItem(
                        "veloestateUserListings"
                    ) || "[]"
                );

            return Array.isArray(listings)
                ? listings
                : [];

        } catch (error) {

            return [];

        }

    }


    // ==========================================
    // PRICE CONVERTER
    // ==========================================

    function extractPrice(price) {

        if (!price) {
            return 0;
        }

        const text =
            String(price)
                .toLowerCase()
                .replace(/₹/g, "")
                .replace(/,/g, "")
                .trim();

        const number =
            parseFloat(text);

        if (isNaN(number)) {
            return 0;
        }

        if (text.includes("cr")) {
            return number * 10000000;
        }

        if (
            text.includes("lakh") ||
            text.includes("lac")
        ) {
            return number * 100000;
        }

        return number;

    }


    // ==========================================
    // CONVERT USER LISTINGS
    // ==========================================

    function convertUserListing(listing) {

        if (
            !listing ||
            listing.purpose !== "Buy"
        ) {
            return null;
        }


        const city =
            listing.location?.city ||
            listing.city ||
            "Unknown";


        const locality =
            listing.location?.locality ||
            listing.locality ||
            "";


        const location =
            locality
                ? `${locality}, ${city}`
                : city;


        const meta = [];


        if (listing.bedrooms) {

            meta.push(
                `${listing.bedrooms} Beds`
            );

        }


        if (listing.bathrooms) {

            meta.push(
                `${listing.bathrooms} Baths`
            );

        }


        if (listing.area) {

            meta.push(
                `${listing.area} sq.ft`
            );

        }


        if (
            Array.isArray(listing.amenities) &&
            listing.amenities.length
        ) {

            meta.push(
                listing.amenities[0]
            );

        }


        return {

            id:
                `user-${listing.id}`,

            title:
                listing.title ||
                "New Property",

            type:
                listing.type ||
                "Property",

            purpose:
                "Buy",

            location,

            price:
                listing.price ||
                "Price on request",

            priceValue:
                extractPrice(
                    listing.price
                ),

            meta,

            image:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"

        };

    }


    // ==========================================
    // ALL BUY PROPERTIES
    // ==========================================

    let properties = [

        ...buyProperties,

        ...getUserListings()
            .map(convertUserListing)
            .filter(Boolean)

    ];


    // ==========================================
    // ESCAPE HTML
    // ==========================================

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    // ==========================================
    // FAVORITES
    // ==========================================

    function getFavorites() {

        try {

            const favorites =
                JSON.parse(
                    localStorage.getItem(
                        "veloestateFavorites"
                    ) || "[]"
                );

            return Array.isArray(favorites)
                ? favorites.map(String)
                : [];

        } catch {

            return [];

        }

    }


    function saveFavorites(favorites) {

        localStorage.setItem(
            "veloestateFavorites",
            JSON.stringify(
                favorites.map(String)
            )
        );

    }


    // ==========================================
    // TOAST
    // ==========================================

    function notify(message) {

        if (
            typeof window.showToast ===
            "function"
        ) {

            window.showToast(message);

        }

    }


    // ==========================================
    // TOGGLE FAVORITE
    // ==========================================

    function toggleFavorite(id) {

        let favorites =
            getFavorites();


        const exists =
            favorites.includes(
                String(id)
            );


        if (exists) {

            favorites =
                favorites.filter(
                    item =>
                        String(item) !==
                        String(id)
                );

            notify(
                "Property removed from favorites."
            );

        } else {

            favorites.push(
                String(id)
            );

            notify(
                "Property added to favorites."
            );

        }


        saveFavorites(favorites);

        renderProperties();

    }


    // ==========================================
    // RENDER
    // ==========================================

    function renderProperties() {

        if (!propertiesGrid) {
            return;
        }


        const location =
            locationInput
                ? locationInput.value
                    .trim()
                    .toLowerCase()
                : "";


        const type =
            typeFilter
                ? typeFilter.value
                : "all";


        const budget =
            budgetFilter
                ? budgetFilter.value
                : "all";


        let filtered =
            properties.filter(property => {


                // Location
                const matchesLocation =
                    !location ||
                    property.location
                        .toLowerCase()
                        .includes(location);


                // Type
                const matchesType =
                    type === "all" ||
                    type === "" ||
                    property.type === type;


                // Budget
                let matchesBudget = true;


                if (
                    budget !== "all" &&
                    budget !== ""
                ) {

                    const maxBudget =
                        parseFloat(budget);


                    if (!isNaN(maxBudget)) {

                        matchesBudget =
                            property.priceValue <=
                            maxBudget;

                    }

                }


                return (
                    matchesLocation &&
                    matchesType &&
                    matchesBudget
                );

            });


        // ======================================
        // EMPTY
        // ======================================

        if (filtered.length === 0) {

            propertiesGrid.innerHTML = "";

            if (noResults) {

                noResults.style.display =
                    "block";

            }

            return;

        }


        if (noResults) {

            noResults.style.display =
                "none";

        }


        // ======================================
        // FAVORITES
        // ======================================

        const favorites =
            getFavorites();


        // ======================================
        // CARDS
        // ======================================

        propertiesGrid.innerHTML =
            filtered
                .map(property => {

                    const isFavorite =
                        favorites.includes(
                            String(property.id)
                        );


                    const metaHTML =
                        property.meta
                            .map(item => `
                                <span>
                                    ${escapeHTML(item)}
                                </span>
                            `)
                            .join("");


                    return `

                        <article class="property-card">

                            <div class="property-image">

                                <img
                                    src="${escapeHTML(
                                        property.image
                                    )}"
                                    alt="${escapeHTML(
                                        property.title
                                    )}"
                                    loading="lazy"
                                >


                                <span class="badge">

                                    Buy

                                </span>


                                <button
                                    type="button"
                                    class="favorite ${
                                        isFavorite
                                            ? "liked"
                                            : ""
                                    }"
                                    data-favorite-id="${escapeHTML(
                                        property.id
                                    )}"
                                >

                                    ${
                                        isFavorite
                                            ? "♥"
                                            : "♡"
                                    }

                                </button>

                            </div>


                            <div class="property-body">

                                <div class="property-type">

                                    ${escapeHTML(
                                        property.type
                                    )}

                                </div>


                                <h3>

                                    ${escapeHTML(
                                        property.title
                                    )}

                                </h3>


                                <p class="location">

                                    📍
                                    ${escapeHTML(
                                        property.location
                                    )}

                                </p>


                                <div class="details">

                                    ${metaHTML}

                                </div>


                                <div class="property-bottom">

                                    <strong class="price">

                                        ${escapeHTML(
                                            property.price
                                        )}

                                    </strong>


                                    <a
                                        href="property-details.html?id=${encodeURIComponent(
                                            property.id
                                        )}"
                                        class="arrow"
                                        title="View Property"
                                    >
                                        →
                                    </a>

                                </div>

                            </div>

                        </article>

                    `;

                })
                .join("");


        // ======================================
        // FAVORITE EVENTS
        // ======================================

        document
            .querySelectorAll(
                "[data-favorite-id]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        event.stopPropagation();


                        toggleFavorite(
                            button.dataset
                                .favoriteId
                        );

                    }
                );

            });

    }


    // ==========================================
    // SEARCH
    // ==========================================

    if (searchForm) {

        searchForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                renderProperties();

            }
        );

    }


    // ==========================================
    // LIVE FILTERS
    // ==========================================

    if (locationInput) {

        locationInput.addEventListener(
            "input",
            renderProperties
        );

    }


    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            renderProperties
        );

    }


    if (budgetFilter) {

        budgetFilter.addEventListener(
            "change",
            renderProperties
        );

    }


    // ==========================================
    // RESET
    // ==========================================

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                if (locationInput) {
                    locationInput.value = "";
                }

                if (typeFilter) {
                    typeFilter.value = "all";
                }

                if (budgetFilter) {
                    budgetFilter.value = "all";
                }

                renderProperties();

            }
        );

    }


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    renderProperties();

});
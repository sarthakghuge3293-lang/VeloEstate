document.addEventListener("DOMContentLoaded", () => {

    const locationInput =
        document.getElementById("commercialLocation");

    const typeFilter =
        document.getElementById("commercialType");

    const budgetFilter =
        document.getElementById("commercialBudget");

    const searchForm =
        document.getElementById("commercialSearchForm");

    const propertiesGrid =
        document.getElementById("commercialPropertiesGrid");

    const noResults =
        document.getElementById("commercialNoResults");

    const resetButton =
        document.getElementById("resetCommercialSearch");


    // ==========================================
    // COMMERCIAL PROPERTIES
    // ==========================================

    const commercialProperties = [

        {
            id: "3",
            title: "Premium Corporate Office",
            type: "Office",
            purpose: "Commercial",
            location: "Mumbai",
            price: "₹2.8 Cr",
            priceValue: 28000000,

            meta: [
                "Furnished",
                "Parking",
                "3,200 sq.ft"
            ],

            image:
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
        },


        {
            id: "5",
            title: "Prime Commercial Shop",
            type: "Shop",
            purpose: "Commercial",
            location: "Aurangabad",
            price: "₹75 Lakh",
            priceValue: 7500000,

            meta: [
                "Ground Floor",
                "Parking",
                "850 sq.ft"
            ],

            image:
                "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
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

        } catch {

            return [];

        }

    }


    // ==========================================
    // PRICE CONVERTER
    // ==========================================

    function extractPrice(price) {

        if (!price) return 0;

        const text =
            String(price)
                .toLowerCase()
                .replace(/₹/g, "")
                .replace(/,/g, "")
                .trim();

        const number =
            parseFloat(text);

        if (isNaN(number)) return 0;

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
    // CONVERT USER LISTING
    // ==========================================

    function convertUserListing(listing) {

        if (
            !listing ||
            listing.purpose !== "Commercial"
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
                "New Commercial Property",

            type:
                listing.type ||
                "Commercial Space",

            purpose:
                "Commercial",

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
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"

        };

    }


    // ==========================================
    // ALL PROPERTIES
    // ==========================================

    let properties = [

        ...commercialProperties,

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
    // FAVORITE
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

        if (!propertiesGrid) return;


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

                const matchesLocation =
                    !location ||
                    property.location
                        .toLowerCase()
                        .includes(location);


                const matchesType =
                    type === "all" ||
                    type === "" ||
                    property.type === type;


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
        // NO RESULTS
        // ======================================

        if (filtered.length === 0) {

            propertiesGrid.innerHTML = "";

            if (noResults) {
                noResults.style.display = "block";
            }

            return;

        }


        if (noResults) {
            noResults.style.display = "none";
        }


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
                                    Commercial
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
    // FILTERS
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
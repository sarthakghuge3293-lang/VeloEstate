// ==========================================
// VELOESTATE - PROPERTIES PAGE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const searchInput =
        document.getElementById("propertySearch");

    const purposeFilter =
        document.getElementById("purposeFilter");

    const typeFilter =
        document.getElementById("typeFilter");

    const locationFilter =
        document.getElementById("locationFilter");

    const sortFilter =
        document.getElementById("sortFilter");

    const propertiesGrid =
        document.getElementById("propertiesGrid");

    const resultCount =
        document.getElementById("resultCount");

    const noResults =
        document.getElementById("noResults");

    const clearFilters =
        document.getElementById("clearFilters");


    // ==========================================
    // DEFAULT PROPERTIES
    // ==========================================

    const defaultProperties = [

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
            id: "2",
            title: "Premium City View Apartment",
            type: "Apartment",
            purpose: "Rent",
            location: "Pune",
            price: "₹45,000/month",
            priceValue: 45000,

            meta: [
                "3 Beds",
                "2 Baths",
                "1,650 sq.ft"
            ],

            image:
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
        },


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
    // CONVERT USER LISTING
    // ==========================================

    function convertUserListing(listing) {

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
                listing.purpose ||
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
                listing.image ||
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",

            userListing: true

        };

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
    // ALL PROPERTIES
    // ==========================================

    let properties = [

        ...defaultProperties,

        ...getUserListings()
            .map(convertUserListing)

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

        } catch (error) {

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
    // FAVORITE TOGGLE
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
                "Removed from favorites"
            );

        } else {

            favorites.push(
                String(id)
            );


            notify(
                "Added to favorites"
            );

        }


        saveFavorites(favorites);

        renderProperties();

    }


    // ==========================================
    // RENDER PROPERTIES
    // ==========================================

    function renderProperties() {

        if (!propertiesGrid) {
            return;
        }


        // --------------------------------------
        // FILTER VALUES
        // --------------------------------------

        const search =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        const purpose =
            purposeFilter
                ? purposeFilter.value
                : "all";


        const type =
            typeFilter
                ? typeFilter.value
                : "all";


        const location =
            locationFilter
                ? locationFilter.value
                : "all";


        const sort =
            sortFilter
                ? sortFilter.value
                : "default";


        // --------------------------------------
        // FILTER
        // --------------------------------------

        let filtered =
            properties.filter(property => {

                const searchableText =
                    [
                        property.title,
                        property.location,
                        property.type,
                        property.purpose
                    ]
                    .join(" ")
                    .toLowerCase();


                const matchesSearch =
                    !search ||
                    searchableText.includes(
                        search
                    );


                const matchesPurpose =
                    purpose === "all" ||
                    purpose === "" ||
                    property.purpose === purpose;


                const matchesType =
                    type === "all" ||
                    type === "" ||
                    property.type === type;


                const matchesLocation =
                    location === "all" ||
                    location === "" ||
                    property.location
                        .toLowerCase()
                        .includes(
                            location.toLowerCase()
                        );


                return (
                    matchesSearch &&
                    matchesPurpose &&
                    matchesType &&
                    matchesLocation
                );

            });


        // --------------------------------------
        // SORT
        // --------------------------------------

        if (sort === "low") {

            filtered.sort(
                (a, b) =>
                    a.priceValue -
                    b.priceValue
            );

        }


        if (sort === "high") {

            filtered.sort(
                (a, b) =>
                    b.priceValue -
                    a.priceValue
            );

        }


        // --------------------------------------
        // RESULT COUNT
        // --------------------------------------

        if (resultCount) {

            resultCount.textContent =
                filtered.length;

        }


        // --------------------------------------
        // EMPTY
        // --------------------------------------

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


        // --------------------------------------
        // FAVORITES
        // --------------------------------------

        const favorites =
            getFavorites();


        // --------------------------------------
        // PROPERTY CARDS
        // --------------------------------------

        propertiesGrid.innerHTML =
            filtered
                .map(property => {

                    const isFavorite =
                        favorites.includes(
                            String(
                                property.id
                            )
                        );


                    const metaHTML =
                        property.meta
                            .map(item => `
                                <span>
                                    ${escapeHTML(
                                        item
                                    )}
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


                                <span class="badge ${
                                    property.purpose
                                        .toLowerCase()
                                }">

                                    ${escapeHTML(
                                        property.purpose
                                    )}

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
                                    aria-label="Save property"
                                    title="Save property"
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


        // --------------------------------------
        // FAVORITE BUTTON EVENTS
        // --------------------------------------

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


        // --------------------------------------
        // IMAGE FALLBACK
        // --------------------------------------

        document
            .querySelectorAll(
                ".property-image img"
            )
            .forEach(image => {

                image.addEventListener(
                    "error",
                    () => {

                        image.src =
                            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85";

                    }
                );

            });

    }


    // ==========================================
    // FILTER EVENTS
    // ==========================================

    [
        searchInput,
        purposeFilter,
        typeFilter,
        locationFilter,
        sortFilter

    ].forEach(element => {

        if (!element) {
            return;
        }


        element.addEventListener(
            "input",
            renderProperties
        );


        element.addEventListener(
            "change",
            renderProperties
        );

    });


    // ==========================================
    // CLEAR FILTERS
    // ==========================================

    if (clearFilters) {

        clearFilters.addEventListener(
            "click",
            () => {

                if (searchInput) {
                    searchInput.value = "";
                }


                if (purposeFilter) {
                    purposeFilter.value = "all";
                }


                if (typeFilter) {
                    typeFilter.value = "all";
                }


                if (locationFilter) {
                    locationFilter.value = "all";
                }


                if (sortFilter) {
                    sortFilter.value = "default";
                }


                renderProperties();

            }
        );

    }


    // ==========================================
    // INITIAL RENDER
    // ==========================================

    renderProperties();

});
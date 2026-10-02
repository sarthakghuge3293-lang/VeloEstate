/* =========================================================
   VELOESTATE - PROPERTY DETAILS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const propertyDetail = document.getElementById("propertyDetail");
    const similarProperties = document.getElementById("similarProperties");
    const breadcrumbTitle = document.getElementById("breadcrumbTitle");

    if (!propertyDetail) return;


    /* =====================================================
       PROPERTY DATA
       ===================================================== */

    const properties = [

        {
            id: "1",
            purpose: "Buy",
            type: "House",
            title: "Modern Luxury Family Home",
            location: "Aurangabad",
            price: "₹1.25 Cr",
            priceValue: 12500000,

            image:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",

            beds: "4 Beds",
            baths: "3 Baths",
            area: "2,450 sq.ft",

            description:
                "A beautifully designed modern family home with spacious interiors, comfortable bedrooms and a premium residential environment.",

            features: [
                "4 Bedrooms",
                "3 Bathrooms",
                "2,450 sq.ft",
                "Modern Kitchen",
                "Parking",
                "Security"
            ]
        },


        {
            id: "2",
            purpose: "Rent",
            type: "Apartment",
            title: "Premium City View Apartment",
            location: "Pune",
            price: "₹45,000/month",
            priceValue: 45000,

            image:
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",

            beds: "3 Beds",
            baths: "2 Baths",
            area: "1,650 sq.ft",

            description:
                "A premium city-view apartment located in a convenient part of Pune with modern interiors and excellent connectivity.",

            features: [
                "3 Bedrooms",
                "2 Bathrooms",
                "1,650 sq.ft",
                "City View",
                "Parking",
                "Security"
            ]
        },


        {
            id: "3",
            purpose: "Commercial",
            type: "Office",
            title: "Premium Corporate Office",
            location: "Mumbai",
            price: "₹2.8 Cr",
            priceValue: 28000000,

            image:
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",

            beds: "Furnished",
            baths: "Parking",
            area: "3,200 sq.ft",

            description:
                "A premium corporate office space located in a strategic Mumbai business location, suitable for modern companies and professional teams.",

            features: [
                "Fully Furnished",
                "Parking",
                "3,200 sq.ft",
                "Conference Room",
                "Reception Area",
                "Security"
            ]
        },


        {
            id: "4",
            purpose: "Buy",
            type: "Villa",
            title: "Elegant Family Villa",
            location: "Nashik",
            price: "₹1.85 Cr",
            priceValue: 18500000,

            image:
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",

            beds: "4 Beds",
            baths: "4 Baths",
            area: "3,100 sq.ft",

            description:
                "An elegant family villa offering spacious rooms, premium finishes and a peaceful residential environment in Nashik.",

            features: [
                "4 Bedrooms",
                "4 Bathrooms",
                "3,100 sq.ft",
                "Private Garden",
                "Parking",
                "Premium Interiors"
            ]
        },


        {
            id: "5",
            purpose: "Commercial",
            type: "Shop",
            title: "Prime Commercial Shop",
            location: "Aurangabad",
            price: "₹75 Lakh",
            priceValue: 7500000,

            image:
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85",

            beds: "Ground Floor",
            baths: "Parking",
            area: "850 sq.ft",

            description:
                "A prime ground-floor commercial shop in Aurangabad suitable for retail, showroom or other business purposes.",

            features: [
                "Ground Floor",
                "Parking",
                "850 sq.ft",
                "Road Facing",
                "Prime Location",
                "Commercial Area"
            ]
        },


        {
            id: "6",
            purpose: "Buy",
            type: "Plot",
            title: "Premium Residential Plot",
            location: "Pune",
            price: "₹55 Lakh",
            priceValue: 5500000,

            image:
                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85",

            beds: "Residential",
            baths: "Road Touch",
            area: "2,000 sq.ft",

            description:
                "A premium residential plot in Pune with road access, suitable for building a modern family home.",

            features: [
                "Residential",
                "Road Touch",
                "2,000 sq.ft",
                "Clear Access",
                "Prime Location",
                "Suitable for Construction"
            ]
        }

    ];


    /* =====================================================
       USER LISTINGS
       ===================================================== */

    function getUserListings() {

        try {

            const saved =
                JSON.parse(
                    localStorage.getItem(
                        "veloestateUserListings"
                    )
                ) || [];

            return saved.map(item => ({

                id: "user-" + item.id,

                purpose: item.purpose || "Buy",

                type: item.type || "Property",

                title:
                    item.title ||
                    "VeloEstate Property",

                location:
                    item.city ||
                    item.locality ||
                    "India",

                price:
                    item.price
                        ? "₹" + item.price
                        : "Price on Request",

                priceValue:
                    parseFloat(
                        String(item.price || "")
                            .replace(/[^0-9.]/g, "")
                    ) || 0,

                image:
                    item.image ||
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",

                beds:
                    item.bedrooms
                        ? `${item.bedrooms} Beds`
                        : "Property",

                baths:
                    item.bathrooms
                        ? `${item.bathrooms} Baths`
                        : "Available",

                area:
                    item.area
                        ? `${item.area} sq.ft`
                        : "Area Available",

                description:
                    item.description ||
                    "Property listed on VeloEstate.",

                features:
                    Array.isArray(item.amenities) &&
                    item.amenities.length
                        ? item.amenities
                        : [
                            "Prime Location",
                            "Verified Listing",
                            "Contact Owner"
                        ]

            }));

        } catch (error) {

            console.error(
                "Unable to load user listings:",
                error
            );

            return [];
        }
    }


    const allProperties = [
        ...properties,
        ...getUserListings()
    ];


    /* =====================================================
       GET ID
       ===================================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );

    const propertyId =
        params.get("id");


    const property =
        allProperties.find(
            item =>
                String(item.id) ===
                String(propertyId)
        );


    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(message) {

        let toast =
            document.getElementById(
                "veloToast"
            );

        if (!toast) {

            toast =
                document.createElement("div");

            toast.id = "veloToast";

            toast.style.position = "fixed";
            toast.style.bottom = "25px";
            toast.style.right = "25px";
            toast.style.zIndex = "9999";
            toast.style.padding = "14px 20px";
            toast.style.borderRadius = "10px";
            toast.style.background = "#092d3a";
            toast.style.color = "#fff";
            toast.style.fontWeight = "600";
            toast.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.2)";

            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.display = "block";

        clearTimeout(window.veloToastTimer);

        window.veloToastTimer =
            setTimeout(() => {

                toast.style.display = "none";

            }, 2500);
    }


    /* =====================================================
       FAVORITES
       ===================================================== */

    function getFavorites() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "veloestateFavorites"
                )
            ) || [];

        } catch {

            return [];
        }
    }


    function saveFavorites(favorites) {

        localStorage.setItem(
            "veloestateFavorites",
            JSON.stringify(favorites)
        );
    }


    function isFavorite(id) {

        return getFavorites()
            .map(String)
            .includes(String(id));
    }


    function toggleFavorite(id) {

        let favorites =
            getFavorites();

        const stringId =
            String(id);

        if (
            favorites
                .map(String)
                .includes(stringId)
        ) {

            favorites =
                favorites.filter(
                    item =>
                        String(item) !==
                        stringId
                );

            showToast(
                "Property removed from favorites."
            );

        } else {

            favorites.push(stringId);

            showToast(
                "Property saved to favorites."
            );
        }

        saveFavorites(favorites);

        renderProperty();
        renderSimilarProperties();
    }


    /* =====================================================
       RENDER PROPERTY
       ===================================================== */

    function renderProperty() {

        if (!property) {

            propertyDetail.innerHTML = `

                <div class="empty-state">

                    <div class="empty-icon">
                        ⌂
                    </div>

                    <h2>
                        Property Not Found
                    </h2>

                    <p>
                        The property you are looking
                        for does not exist.
                    </p>

                    <a
                        href="properties.html"
                        class="btn btn-primary"
                    >
                        View Properties
                    </a>

                </div>

            `;

            return;
        }


        if (breadcrumbTitle) {

            breadcrumbTitle.textContent =
                property.title;
        }


        const favorite =
            isFavorite(property.id);


        propertyDetail.innerHTML = `

            <div class="property-detail-image">

                <img
                    src="${escapeHTML(property.image)}"
                    alt="${escapeHTML(property.title)}"
                >

            </div>


            <div class="property-detail-info">

                <div class="property-type">
                    ${escapeHTML(property.type)}
                </div>

                <h1>
                    ${escapeHTML(property.title)}
                </h1>

                <div class="property-detail-location">
                    📍 ${escapeHTML(property.location)}
                </div>

                <div class="property-detail-price">
                    ${escapeHTML(property.price)}
                </div>

                <div class="property-detail-meta">

                    <span>
                        ${escapeHTML(property.beds)}
                    </span>

                    <span>
                        ${escapeHTML(property.baths)}
                    </span>

                    <span>
                        ${escapeHTML(property.area)}
                    </span>

                </div>


                <div class="property-detail-actions">

                    <button
                        type="button"
                        class="detail-favorite ${favorite ? "active" : ""}"
                        id="detailFavorite"
                    >
                        ${favorite ? "♥ Saved" : "♡ Save Property"}
                    </button>

                    <a
                        href="contact.html?property=${encodeURIComponent(property.id)}&action=contact"
                        class="btn btn-primary"
                    >
                        Contact Agent
                    </a>

                </div>

            </div>


            <div class="property-overview">

                <span class="eyebrow">
                    ABOUT THIS PROPERTY
                </span>

                <h2>
                    Property Overview
                </h2>

                <p>
                    ${escapeHTML(property.description)}
                </p>


                <div class="property-features">

                    <span class="eyebrow">
                        PROPERTY FEATURES
                    </span>

                    <h2>
                        What's Included
                    </h2>

                    <ul>

                        ${
                            property.features
                                .map(
                                    feature => `
                                        <li>
                                            ✓ ${escapeHTML(feature)}
                                        </li>
                                    `
                                )
                                .join("")
                        }

                    </ul>

                </div>


                <div class="property-interest">

                    <span class="eyebrow">
                        INTERESTED?
                    </span>

                    <h2>
                        Want to know more?
                    </h2>

                    <p>
                        Get in touch with our property
                        consultants for more information.
                    </p>

                    <div class="property-detail-actions">

                        <a
                            href="contact.html?property=${encodeURIComponent(property.id)}&action=contact"
                            class="btn btn-primary"
                        >
                            Contact Agent
                        </a>

                        <a
                            href="contact.html?property=${encodeURIComponent(property.id)}&action=schedule"
                            class="btn btn-outline"
                        >
                            Schedule Visit
                        </a>

                    </div>

                </div>

            </div>

        `;


        const favoriteButton =
            document.getElementById(
                "detailFavorite"
            );


        if (favoriteButton) {

            favoriteButton.addEventListener(
                "click",
                () => {

                    toggleFavorite(
                        property.id
                    );

                }
            );
        }
    }


    /* =====================================================
       SIMILAR PROPERTIES
       ===================================================== */

    function renderSimilarProperties() {

        if (
            !similarProperties ||
            !property
        ) return;


        let similar =
            allProperties.filter(
                item =>
                    String(item.id) !==
                    String(property.id) &&
                    (
                        item.purpose ===
                            property.purpose ||
                        item.type ===
                            property.type ||
                        item.location ===
                            property.location
                    )
            );


        similar =
            similar.slice(0, 3);


        if (!similar.length) {

            similarProperties.innerHTML = "";

            return;
        }


        similarProperties.innerHTML =
            similar.map(item => {

                const saved =
                    isFavorite(item.id);


                return `

                    <article class="property-card">

                        <div class="property-image">

                            <img
                                src="${escapeHTML(item.image)}"
                                alt="${escapeHTML(item.title)}"
                            >

                            <span class="property-purpose">
                                ${escapeHTML(item.purpose)}
                            </span>

                            <button
                                type="button"
                                class="favorite-btn ${saved ? "active" : ""}"
                                data-favorite="${escapeHTML(item.id)}"
                            >
                                ${saved ? "♥" : "♡"}
                            </button>

                        </div>


                        <div class="property-content">

                            <span class="property-type">
                                ${escapeHTML(item.type)}
                            </span>

                            <h3>
                                ${escapeHTML(item.title)}
                            </h3>

                            <p class="property-location">
                                📍 ${escapeHTML(item.location)}
                            </p>

                            <div class="property-meta">

                                <span>
                                    ${escapeHTML(item.beds)}
                                </span>

                                <span>
                                    ${escapeHTML(item.baths)}
                                </span>

                                <span>
                                    ${escapeHTML(item.area)}
                                </span>

                            </div>

                            <div class="property-bottom">

                                <strong>
                                    ${escapeHTML(item.price)}
                                </strong>

                                <a
                                    href="property-details.html?id=${encodeURIComponent(item.id)}"
                                    class="text-link"
                                >
                                    View Details →
                                </a>

                            </div>

                        </div>

                    </article>

                `;

            }).join("");


        similarProperties
            .querySelectorAll(".favorite-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();
                        event.stopPropagation();

                        toggleFavorite(
                            button.dataset.favorite
                        );

                    }
                );

            });
    }


    /* =====================================================
       START
       ===================================================== */

    renderProperty();
    renderSimilarProperties();

});
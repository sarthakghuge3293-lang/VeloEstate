document.addEventListener("DOMContentLoaded", () => {
    const favoriteCount = document.getElementById("favoriteCount");
    const clearFavoritesBtn = document.getElementById("clearFavorites");
    const favoritesGrid = document.getElementById("favoritesGrid");
    const favoritesEmpty = document.getElementById("favoritesEmpty");

    const defaultProperties = [
        {
            id: "1",
            title: "Modern Luxury Family Home",
            type: "House",
            purpose: "Buy",
            location: "Aurangabad",
            price: "₹1.25 Cr",
            image: "assets/images/property-1.jpg",
            meta: ["4 Beds", "3 Baths", "2,450 sq.ft"]
        },
        {
            id: "2",
            title: "Premium City View Apartment",
            type: "Apartment",
            purpose: "Rent",
            location: "Pune",
            price: "₹45,000/month",
            image: "assets/images/property-2.jpg",
            meta: ["3 Beds", "2 Baths", "1,650 sq.ft"]
        },
        {
            id: "3",
            title: "Premium Corporate Office",
            type: "Office",
            purpose: "Commercial",
            location: "Mumbai",
            price: "₹2.8 Cr",
            image: "assets/images/property-3.jpg",
            meta: ["Furnished", "Parking", "3,200 sq.ft"]
        },
        {
            id: "4",
            title: "Elegant Family Villa",
            type: "Villa",
            purpose: "Buy",
            location: "Nashik",
            price: "₹1.85 Cr",
            image: "assets/images/property-4.jpg",
            meta: ["4 Beds", "4 Baths", "3,100 sq.ft"]
        },
        {
            id: "5",
            title: "Prime Commercial Shop",
            type: "Shop",
            purpose: "Commercial",
            location: "Aurangabad",
            price: "₹75 Lakh",
            image: "assets/images/property-5.jpg",
            meta: ["Ground Floor", "Parking", "850 sq.ft"]
        },
        {
            id: "6",
            title: "Premium Residential Plot",
            type: "Plot",
            purpose: "Buy",
            location: "Pune",
            price: "₹55 Lakh",
            image: "assets/images/property-6.jpg",
            meta: ["Residential", "Road Touch", "2,000 sq.ft"]
        }
    ];

    function getUserListings() {
        try {
            const saved = JSON.parse(
                localStorage.getItem("veloestateUserListings") || "[]"
            );

            return saved.map(item => ({
                id: `user-${item.id}`,
                title: item.title || "Untitled Property",
                type: item.type || "Property",
                purpose: item.purpose || "Buy",
                location: item.locality
                    ? `${item.locality}, ${item.city || ""}`
                    : item.city || "Location not specified",
                price: item.price
                    ? `₹${Number(item.price).toLocaleString("en-IN")}`
                    : "Price on Request",
                image: item.image || "assets/images/property-1.jpg",
                meta: [
                    item.bedrooms
                        ? `${item.bedrooms} Beds`
                        : null,
                    item.bathrooms
                        ? `${item.bathrooms} Baths`
                        : null,
                    item.area
                        ? `${item.area} sq.ft`
                        : null
                ].filter(Boolean)
            }));
        } catch (error) {
            return [];
        }
    }

    function getAllProperties() {
        return [...defaultProperties, ...getUserListings()];
    }

    function getFavorites() {
        try {
            return JSON.parse(
                localStorage.getItem("veloestateFavorites") || "[]"
            ).map(String);
        } catch (error) {
            return [];
        }
    }

    function saveFavorites(favorites) {
        localStorage.setItem(
            "veloestateFavorites",
            JSON.stringify(favorites)
        );
    }

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function showToast(message) {
        if (typeof window.showToast === "function") {
            window.showToast(message);
            return;
        }

        let toast = document.querySelector(".toast");

        if (!toast) {
            toast = document.createElement("div");
            toast.className = "toast";
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }

    function renderFavorites() {
        const favorites = getFavorites();

        const allProperties = getAllProperties();

        const savedProperties = allProperties.filter(property =>
            favorites.includes(String(property.id))
        );

        if (favoriteCount) {
            favoriteCount.textContent = savedProperties.length;
        }

        if (!savedProperties.length) {
            if (favoritesGrid) {
                favoritesGrid.innerHTML = "";
                favoritesGrid.style.display = "none";
            }

            if (favoritesEmpty) {
                favoritesEmpty.style.display = "block";
            }

            return;
        }

        if (favoritesEmpty) {
            favoritesEmpty.style.display = "none";
        }

        if (favoritesGrid) {
            favoritesGrid.style.display = "grid";

            favoritesGrid.innerHTML = savedProperties
                .map(property => {
                    return `
                        <article class="property-card">

                            <div class="property-image-wrap">
                                <img
                                    src="${escapeHTML(property.image)}"
                                    alt="${escapeHTML(property.title)}"
                                    class="property-image"
                                    onerror="this.style.display='none';"
                                >

                                <span class="property-badge">
                                    ${escapeHTML(property.purpose)}
                                </span>

                                <button
                                    class="favorite-btn active"
                                    data-remove-favorite="${escapeHTML(property.id)}"
                                    aria-label="Remove from favorites"
                                    title="Remove from favorites"
                                >
                                    ♥
                                </button>
                            </div>

                            <div class="property-content">

                                <div class="property-type">
                                    ${escapeHTML(property.type)}
                                </div>

                                <h3>
                                    ${escapeHTML(property.title)}
                                </h3>

                                <p class="property-location">
                                    📍 ${escapeHTML(property.location)}
                                </p>

                                <div class="property-price">
                                    ${escapeHTML(property.price)}
                                </div>

                                <div class="property-meta">
                                    ${property.meta.map(item =>
                                        `<span>${escapeHTML(item)}</span>`
                                    ).join("")}
                                </div>

                                <div class="property-actions">

                                    <a
                                        href="property-details.html?id=${encodeURIComponent(property.id)}"
                                        class="btn btn-primary"
                                    >
                                        View Details
                                    </a>

                                    <button
                                        class="btn btn-outline remove-favorite"
                                        data-remove-favorite="${escapeHTML(property.id)}"
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        </article>
                    `;
                })
                .join("");
        }

        attachRemoveEvents();
    }

    function attachRemoveEvents() {
        document
            .querySelectorAll("[data-remove-favorite]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const propertyId = String(
                        button.dataset.removeFavorite
                    );

                    let favorites = getFavorites();

                    favorites = favorites.filter(
                        id => String(id) !== propertyId
                    );

                    saveFavorites(favorites);

                    showToast("Property removed from favorites");

                    renderFavorites();
                });
            });
    }

    if (clearFavoritesBtn) {
        clearFavoritesBtn.addEventListener("click", () => {

            const favorites = getFavorites();

            if (!favorites.length) {
                showToast("Favorites list is already empty");
                return;
            }

            const confirmClear = confirm(
                "Are you sure you want to remove all favorite properties?"
            );

            if (!confirmClear) return;

            saveFavorites([]);

            showToast("All favorites removed");

            renderFavorites();
        });
    }

    renderFavorites();
});
/* =========================================================
   VELOESTATE — MAIN.JS
========================================================= */


/* =========================================================
   PROPERTY DATA
========================================================= */

const properties = [

    {
        id: 1,
        title: "Modern Luxury Family Home",
        type: "House",
        purpose: "Buy",
        location: "Aurangabad",
        price: 12500000,
        priceText: "₹1.25 Cr",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
        details: ["4 Beds", "3 Baths", "2,450 sq.ft"],
        description:
            "A spacious modern family home with premium interiors, comfortable rooms and excellent connectivity.",
        amenities: [
            "Covered Parking",
            "Modern Kitchen",
            "Garden",
            "Security",
            "Power Backup",
            "Air Conditioning"
        ]
    },

    {
        id: 2,
        title: "Premium City View Apartment",
        type: "Apartment",
        purpose: "Rent",
        location: "Pune",
        price: 45000,
        priceText: "₹45,000 / month",
        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
        details: ["3 Beds", "2 Baths", "1,650 sq.ft"],
        description:
            "A stylish city apartment designed for comfortable urban living with excellent views.",
        amenities: [
            "Lift",
            "Parking",
            "Security",
            "Gym",
            "Swimming Pool",
            "Power Backup"
        ]
    },

    {
        id: 3,
        title: "Premium Corporate Office",
        type: "Office",
        purpose: "Commercial",
        location: "Mumbai",
        price: 28000000,
        priceText: "₹2.8 Cr",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
        details: ["Furnished", "Parking", "3,200 sq.ft"],
        description:
            "A polished corporate workspace suitable for modern teams and growing businesses.",
        amenities: [
            "Reception",
            "Conference Room",
            "Parking",
            "CCTV",
            "High Speed Internet",
            "Power Backup"
        ]
    },

    {
        id: 4,
        title: "Elegant Family Villa",
        type: "Villa",
        purpose: "Buy",
        location: "Nashik",
        price: 18500000,
        priceText: "₹1.85 Cr",
        image:
            "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=85",
        details: ["4 Beds", "4 Baths", "3,100 sq.ft"],
        description:
            "A private villa with generous spaces, premium finishes and a peaceful residential setting.",
        amenities: [
            "Private Garden",
            "Parking",
            "Modular Kitchen",
            "Security",
            "Terrace",
            "Storage"
        ]
    },

    {
        id: 5,
        title: "Prime Commercial Shop",
        type: "Shop",
        purpose: "Commercial",
        location: "Aurangabad",
        price: 7500000,
        priceText: "₹75 Lakh",
        image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
        details: ["Ground Floor", "Parking", "850 sq.ft"],
        description:
            "A practical commercial shop with excellent visibility and easy customer access.",
        amenities: [
            "Ground Floor",
            "Main Road",
            "Parking",
            "Security",
            "Electricity",
            "Washroom"
        ]
    },

    {
        id: 6,
        title: "Premium Residential Plot",
        type: "Plot",
        purpose: "Buy",
        location: "Pune",
        price: 5500000,
        priceText: "₹55 Lakh",
        image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
        details: ["Residential", "Road Touch", "2,000 sq.ft"],
        description:
            "A residential plot suitable for a future home or long-term property investment.",
        amenities: [
            "Road Touch",
            "Residential Zone",
            "Water Connection",
            "Electricity",
            "Clear Road Access",
            "Developed Area"
        ]
    }

];


/* =========================================================
   SELECTORS
========================================================= */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    [...document.querySelectorAll(selector)];


/* =========================================================
   FAVORITES
========================================================= */

let favorites = new Set(
    JSON.parse(
        localStorage.getItem("veloestateFavorites") || "[]"
    )
);


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const old =
        document.querySelector(".toast");

    if (old) {
        old.remove();
    }

    const element =
        document.createElement("div");

    element.className = "toast";

    element.textContent = message;

    document.body.appendChild(element);

    setTimeout(() => {

        element.remove();

    }, 2800);
}


/* =========================================================
   SAVE FAVORITES
========================================================= */

function saveFavorites() {

    localStorage.setItem(
        "veloestateFavorites",
        JSON.stringify(
            [...favorites]
        )
    );
}


/* =========================================================
   FAVORITE BUTTONS
========================================================= */

function setupFavorites() {

    $$("[data-favorite]")
        .forEach(button => {

            const id =
                Number(
                    button.dataset.favorite
                );

            updateFavoriteButton(
                button,
                id
            );


            button.onclick = event => {

                event.preventDefault();

                event.stopPropagation();

                toggleFavorite(
                    id,
                    button
                );

            };

        });

}


function updateFavoriteButton(
    button,
    id
) {

    if (
        favorites.has(id)
    ) {

        button.classList.add("liked");

        button.textContent = "♥";

    } else {

        button.classList.remove("liked");

        button.textContent = "♡";

    }

}


function toggleFavorite(
    id,
    button = null
) {

    if (
        favorites.has(id)
    ) {

        favorites.delete(id);

        showToast(
            "Removed from favorites"
        );

    } else {

        favorites.add(id);

        showToast(
            "Added to favorites ❤️"
        );

    }

    saveFavorites();


    if (button) {

        updateFavoriteButton(
            button,
            id
        );

    }


    /* Update all matching buttons */

    $$(
        `[data-favorite="${id}"]`
    )
    .forEach(
        element =>
            updateFavoriteButton(
                element,
                id
            )
    );
}


/* =========================================================
   SEARCH DATA
========================================================= */

let selectedPurpose = "Buy";


/* =========================================================
   BUDGET FILTER
========================================================= */

function matchesBudget(
    price,
    budget
) {

    if (
        !budget ||
        budget === "all"
    ) {
        return true;
    }

    if (
        budget === "under20"
    ) {
        return price < 2000000;
    }

    if (
        budget === "20to50"
    ) {
        return (
            price >= 2000000 &&
            price <= 5000000
        );
    }

    if (
        budget === "50to100"
    ) {
        return (
            price > 5000000 &&
            price <= 10000000
        );
    }

    if (
        budget === "100to200"
    ) {
        return (
            price > 10000000 &&
            price <= 20000000
        );
    }

    if (
        budget === "above200"
    ) {
        return price > 20000000;
    }

    return true;
}


/* =========================================================
   SEARCH
========================================================= */

function performSearch() {

    const location =
        $("#searchLocation")
            ?.value
            .trim()
            .toLowerCase() || "";


    const type =
        $("#searchType")
            ?.value || "all";


    const budget =
        $("#searchBudget")
            ?.value || "all";


    const results =
        properties.filter(property => {

            const purposeMatch =
                property.purpose ===
                selectedPurpose;


            const typeMatch =
                type === "all" ||
                property.type === type;


            const locationMatch =
                !location ||
                property.location
                    .toLowerCase()
                    .includes(location);


            const budgetMatch =
                matchesBudget(
                    property.price,
                    budget
                );


            return (
                purposeMatch &&
                typeMatch &&
                locationMatch &&
                budgetMatch
            );

        });


    localStorage.setItem(
        "veloestateSearchResults",
        JSON.stringify(
            results.map(
                property => property.id
            )
        )
    );


    window.location.href =
        "properties.html";
}


/* =========================================================
   SEARCH FORM
========================================================= */

const searchForm =
    $("#searchForm");

if (searchForm) {

    searchForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            performSearch();

        }
    );

}


/* =========================================================
   SEARCH TABS
========================================================= */

$$(".search-tab")
    .forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                $$(".search-tab")
                    .forEach(item =>
                        item.classList.remove(
                            "active"
                        )
                    );


                tab.classList.add(
                    "active"
                );


                selectedPurpose =
                    tab.dataset.purpose;


                const type =
                    $("#searchType");

                if (!type) {
                    return;
                }


                if (
                    selectedPurpose ===
                    "Commercial"
                ) {

                    type.innerHTML = `

                        <option value="all">
                            All Commercial
                        </option>

                        <option value="Shop">
                            Shop
                        </option>

                        <option value="Office">
                            Office
                        </option>

                    `;

                } else {

                    type.innerHTML = `

                        <option value="all">
                            All Properties
                        </option>

                        <option value="House">
                            House
                        </option>

                        <option value="Apartment">
                            Apartment
                        </option>

                        <option value="Villa">
                            Villa
                        </option>

                        <option value="Plot">
                            Plot
                        </option>

                    `;

                }

            }
        );

    });


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    $("#menuToggle");

const mobileMenu =
    $("#mobileMenu");


if (
    menuToggle &&
    mobileMenu
) {

    menuToggle.addEventListener(
        "click",
        () => {

            const open =
                mobileMenu.classList.toggle(
                    "open"
                );


            menuToggle.textContent =
                open
                    ? "×"
                    : "☰";


            menuToggle.setAttribute(
                "aria-expanded",
                open
            );

        }
    );


    $$(".mobile-menu a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu
                        .classList
                        .remove("open");

                    menuToggle.textContent =
                        "☰";

                }
            );

        });

}


/* =========================================================
   HEADER SCROLL
========================================================= */

const header =
    $("#siteHeader");


window.addEventListener(
    "scroll",
    () => {

        if (!header) {
            return;
        }


        if (
            window.scrollY > 40
        ) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }


        updateScrollProgress();

    }
);


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function updateScrollProgress() {

    const progressBar =
        $("#scrollProgress");

    if (!progressBar) {
        return;
    }


    const height =
        document.documentElement
            .scrollHeight -
        window.innerHeight;


    const progress =
        height > 0
            ? (
                window.scrollY /
                height
            ) * 100
            : 0;


    progressBar.style.width =
        `${progress}%`;
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");

                    }

                }
            );

        },
        {
            threshold: .12
        }
    );


$$(".reveal")
    .forEach(element => {

        revealObserver.observe(
            element
        );

    });


/* =========================================================
   CLOSE MENU WITH ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            if (
                mobileMenu
            ) {

                mobileMenu
                    .classList
                    .remove("open");

            }


            if (
                menuToggle
            ) {

                menuToggle.textContent =
                    "☰";

            }

        }

    }
);


/* =========================================================
   CATEGORY LINKS
========================================================= */

$$("[data-category]")
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const type =
                    button.dataset.category;

                localStorage.setItem(
                    "veloestateCategory",
                    type
                );

            }
        );

    });


/* =========================================================
   PROPERTY CARD HOVER
========================================================= */

$$(".property-card")
    .forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.zIndex =
                    "2";

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.zIndex =
                    "1";

            }
        );

    });


/* =========================================================
   IMAGE ERROR FALLBACK
========================================================= */

$$("img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.objectFit =
                    "cover";

                image.src =
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80";

            }
        );

    });


/* =========================================================
   INITIALIZE
========================================================= */

setupFavorites();

updateScrollProgress();


console.log(
    "VeloEstate Main JS loaded successfully."
);
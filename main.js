document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // TOAST
    // ==========================================

    window.showToast = function (message) {

        let toast = document.querySelector(".toast");

        if (!toast) {

            toast = document.createElement("div");

            toast.className = "toast";

            document.body.appendChild(toast);
        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(window.veloToastTimer);

        window.veloToastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2200);
    };


    // ==========================================
    // MOBILE MENU
    // ==========================================

    const menuToggle =
        document.getElementById("mobileMenuToggle");

    const mainNav =
        document.getElementById("mainNav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            mainNav.classList.toggle("active");

            menuToggle.classList.toggle("active");

        });


        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                menuToggle.classList.remove("active");

            });

        });
    }


    // ==========================================
    // STICKY HEADER
    // ==========================================

    const header =
        document.querySelector(".site-header");


    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 30) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        });

    }


    // ==========================================
    // FAVORITES
    // ==========================================

    function getFavorites() {

        try {

            const favorites = JSON.parse(
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


    window.veloEstateToggleFavorite =
        function (propertyId, button) {

            const id = String(propertyId);

            let favorites = getFavorites();


            if (favorites.includes(id)) {

                favorites = favorites.filter(
                    item => item !== id
                );

                if (button) {

                    button.classList.remove("active");

                }

                window.showToast(
                    "Removed from favorites"
                );

            } else {

                favorites.push(id);

                if (button) {

                    button.classList.add("active");

                }

                window.showToast(
                    "Added to favorites"
                );
            }


            saveFavorites(favorites);
        };


    // ==========================================
    // FAVORITE BUTTONS
    // ==========================================

    document
        .querySelectorAll("[data-favorite]")
        .forEach(button => {

            const id =
                String(button.dataset.favorite);


            if (getFavorites().includes(id)) {

                button.classList.add("active");

            }


            button.addEventListener("click", event => {

                event.preventDefault();

                event.stopPropagation();

                window.veloEstateToggleFavorite(
                    id,
                    button
                );

            });

        });


    // ==========================================
    // HOMEPAGE SEARCH
    // ==========================================

    const searchForm =
        document.getElementById("searchForm");


    if (searchForm) {

        searchForm.addEventListener("submit", event => {

            event.preventDefault();


            const location =
                document.getElementById(
                    "searchLocation"
                )?.value.trim() || "";


            const type =
                document.getElementById(
                    "searchType"
                )?.value || "";


            const budget =
                document.getElementById(
                    "searchBudget"
                )?.value || "";


            const activeTab =
                document.querySelector(
                    ".search-tab.active"
                );


            const purpose =
                activeTab?.dataset.purpose ||
                "Buy";


            localStorage.setItem(
                "veloestateSearchResults",
                JSON.stringify({
                    location,
                    type,
                    budget,
                    purpose
                })
            );


            window.location.href =
                "properties.html";

        });

    }


    // ==========================================
    // SEARCH TABS
    // ==========================================

    document
        .querySelectorAll(".search-tab")
        .forEach(tab => {

            tab.addEventListener("click", () => {

                document
                    .querySelectorAll(".search-tab")
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                tab.classList.add("active");

            });

        });


    // ==========================================
    // CATEGORY
    // ==========================================

    document
        .querySelectorAll("[data-category]")
        .forEach(category => {

            category.addEventListener("click", () => {

                localStorage.setItem(
                    "veloestateCategory",
                    category.dataset.category
                );

            });

        });


    // ==========================================
    // SCROLL REVEAL
    // ==========================================

    const revealElements =
        document.querySelectorAll(
            ".reveal, .property-card, .category-card, .info-card"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    // ==========================================
    // ACCOUNT NAVIGATION
    // ==========================================

    updateAccountNavigation();


    function updateAccountNavigation() {

        const loggedIn =
            localStorage.getItem(
                "veloestateLoggedIn"
            ) === "true";


        const currentUser =
            getCurrentUser();


        const navActions =
            document.querySelector(
                ".nav-actions"
            );


        if (!navActions) return;


        if (loggedIn && currentUser) {

            const firstName =
                String(
                    currentUser.name || "Account"
                )
                .trim()
                .split(" ")[0];


            navActions.innerHTML = `

                <a
                    href="favorites.html"
                    class="btn btn-outline"
                >
                    ♥ Favorites
                </a>

                <a
                    href="dashboard.html"
                    class="btn btn-outline"
                >
                    ${escapeHTML(firstName)}
                </a>

                <button
                    type="button"
                    id="globalLogoutButton"
                    class="btn btn-primary"
                >
                    Logout
                </button>

            `;


            const logoutButton =
                document.getElementById(
                    "globalLogoutButton"
                );


            if (logoutButton) {

                logoutButton.addEventListener(
                    "click",
                    () => {

                        localStorage.removeItem(
                            "veloestateLoggedIn"
                        );

                        localStorage.removeItem(
                            "veloestateCurrentUser"
                        );

                        localStorage.removeItem(
                            "veloestateRememberedEmail"
                        );


                        window.showToast(
                            "Logged out successfully"
                        );


                        setTimeout(() => {

                            window.location.href =
                                "index.html";

                        }, 400);

                    }
                );

            }


            return;
        }


        // Logged out

        navActions.innerHTML = `

            <a
                href="login.html"
                class="btn btn-outline"
            >
                Login
            </a>

            <a
                href="list-property.html"
                class="btn btn-primary"
            >
                List Property
            </a>

        `;
    }


    // ==========================================
    // CURRENT USER
    // ==========================================

    function getCurrentUser() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "veloestateCurrentUser"
                ) || "null"
            );

        } catch (error) {

            return null;
        }
    }


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

});
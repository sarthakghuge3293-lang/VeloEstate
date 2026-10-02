document.addEventListener("DOMContentLoaded", function () {

    const currentUser =
        JSON.parse(localStorage.getItem("veloestateCurrentUser")) || null;

    const loggedIn =
        localStorage.getItem("veloestateLoggedIn") === "true";


    /* ================================
       LOGIN CHECK
    ================================= */

    if (!loggedIn || !currentUser) {

        window.location.href = "login.html";

        return;
    }


    /* ================================
       USER NAME
    ================================= */

    const userName =
        currentUser.name ||
        currentUser.fullName ||
        "User";


    const dashboardUserName =
        document.getElementById("dashboardUserName");

    const welcomeUser =
        document.getElementById("welcomeUser");


    if (dashboardUserName) {

        dashboardUserName.textContent = userName;

    }


    if (welcomeUser) {

        welcomeUser.textContent =
            "Welcome back, " + userName;

    }


    /* ================================
       LOGOUT
    ================================= */

    const logoutButton =
        document.getElementById("logoutButton");


    if (logoutButton) {

        logoutButton.addEventListener("click", function () {

            localStorage.removeItem(
                "veloestateLoggedIn"
            );

            localStorage.removeItem(
                "veloestateCurrentUser"
            );

            localStorage.removeItem(
                "veloestateRememberedEmail"
            );


            window.location.href =
                "login.html";

        });

    }


    /* ================================
       FAVORITE COUNT
    ================================= */

    const favorites =
        JSON.parse(
            localStorage.getItem(
                "veloestateFavorites"
            )
        ) || [];


    const favoriteCount =
        document.getElementById(
            "dashboardFavoriteCount"
        );


    if (favoriteCount) {

        favoriteCount.textContent =
            favorites.length;

    }


    /* ================================
       USER LISTINGS COUNT
    ================================= */

    const listings =
        JSON.parse(
            localStorage.getItem(
                "veloestateUserListings"
            )
        ) || [];


    const listingCount =
        document.getElementById(
            "dashboardListingCount"
        );


    if (listingCount) {

        listingCount.textContent =
            listings.length;

    }


    /* ================================
       ENQUIRY COUNT
    ================================= */

    const enquiries =
        JSON.parse(
            localStorage.getItem(
                "veloestateInquiries"
            )
        ) || [];


    const enquiryCount =
        document.getElementById(
            "dashboardEnquiryCount"
        );


    if (enquiryCount) {

        enquiryCount.textContent =
            enquiries.length;

    }

});
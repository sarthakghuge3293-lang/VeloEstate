// ==========================================
// VELOESTATE - CONTACT PAGE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("contactForm");

    const nameInput =
        document.getElementById("contactName");

    const emailInput =
        document.getElementById("contactEmail");

    const phoneInput =
        document.getElementById("contactPhone");

    const purposeSelect =
        document.getElementById("contactPurpose");

    const messageInput =
        document.getElementById("contactMessage");


    // ==========================================
    // PROPERTY DATA
    // ==========================================

    const properties = {

        "1": {
            title: "Modern Luxury Family Home",
            location: "Aurangabad",
            price: "₹1.25 Cr"
        },

        "2": {
            title: "Premium City View Apartment",
            location: "Pune",
            price: "₹45,000/month"
        },

        "3": {
            title: "Premium Corporate Office",
            location: "Mumbai",
            price: "₹2.8 Cr"
        },

        "4": {
            title: "Elegant Family Villa",
            location: "Nashik",
            price: "₹1.85 Cr"
        },

        "5": {
            title: "Prime Commercial Shop",
            location: "Aurangabad",
            price: "₹75 Lakh"
        },

        "6": {
            title: "Premium Residential Plot",
            location: "Pune",
            price: "₹55 Lakh"
        }

    };


    // ==========================================
    // GET USER LISTINGS
    // ==========================================

    function getUserListings() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "veloestateUserListings"
                ) || "[]"
            );

        } catch {

            return [];

        }

    }


    // ==========================================
    // GET URL PARAMETERS
    // ==========================================

    const params =
        new URLSearchParams(
            window.location.search
        );


    const propertyId =
        params.get("property");

    const agent =
        params.get("agent");

    const action =
        params.get("action");


    // ==========================================
    // FIND PROPERTY
    // ==========================================

    let selectedProperty =
        propertyId
            ? properties[propertyId]
            : null;


    // ==========================================
    // USER PROPERTY
    // ==========================================

    if (
        !selectedProperty &&
        propertyId &&
        propertyId.startsWith("user-")
    ) {

        const userId =
            propertyId.replace(
                "user-",
                ""
            );


        const listings =
            getUserListings();


        const listing =
            listings.find(
                item =>
                    String(item.id) ===
                    String(userId)
            );


        if (listing) {

            const city =
                listing.location?.city ||
                "";

            const locality =
                listing.location?.locality ||
                "";

            const location =
                locality
                    ? `${locality}, ${city}`
                    : city;


            selectedProperty = {

                title:
                    listing.title ||
                    "Property Listing",

                location:
                    location,

                price:
                    listing.price ||
                    "Price on request"

            };

        }

    }


    // ==========================================
    // AGENT DETAILS
    // ==========================================

    const agents = {

        rahul: {
            name: "Rahul Sharma",
            role: "Senior Property Consultant",
            location: "Pune"
        },

        priya: {
            name: "Priya Mehta",
            role: "Residential Property Advisor",
            location: "Aurangabad"
        },

        amit: {
            name: "Amit Kapoor",
            role: "Commercial Real Estate Advisor",
            location: "Mumbai"
        },

        neha: {
            name: "Neha Patil",
            role: "Property Consultant",
            location: "Nashik"
        }

    };


    const selectedAgent =
        agent
            ? agents[agent]
            : null;


    // ==========================================
    // AUTO-FILL MESSAGE
    // ==========================================

    if (messageInput) {

        let message = "";


        // Property enquiry
        if (selectedProperty) {

            message =
                `Hello VeloEstate, I am interested in the property "${selectedProperty.title}" located in ${selectedProperty.location}. The listed price is ${selectedProperty.price}. Please provide more information.`;

        }


        // Schedule visit
        if (
            selectedProperty &&
            action === "visit"
        ) {

            message =
                `Hello VeloEstate, I would like to schedule a property visit for "${selectedProperty.title}" in ${selectedProperty.location}. Please let me know the available dates and timings.`;

        }


        // Agent enquiry
        if (selectedAgent) {

            message =
                `Hello VeloEstate, I would like to connect with ${selectedAgent.name}, ${selectedAgent.role}, regarding property opportunities in ${selectedAgent.location}.`;

        }


        if (message) {

            messageInput.value =
                message;

        }

    }


    // ==========================================
    // AUTO SELECT PURPOSE
    // ==========================================

    if (
        purposeSelect &&
        selectedProperty
    ) {

        const title =
            selectedProperty.title
                .toLowerCase();


        if (
            title.includes("office") ||
            title.includes("shop") ||
            title.includes("commercial")
        ) {

            purposeSelect.value =
                "Commercial";

        }

    }


    // ==========================================
    // PHONE INPUT
    // ==========================================

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                phoneInput.value =
                    phoneInput.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

            }
        );

    }


    // ==========================================
    // EMAIL VALIDATION
    // ==========================================

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    // ==========================================
    // SHOW MESSAGE
    // ==========================================

    function showFormMessage(
        message,
        type
    ) {

        let box =
            document.getElementById(
                "contactFormMessage"
            );


        if (!box) {

            box =
                document.createElement(
                    "div"
                );

            box.id =
                "contactFormMessage";

            box.className =
                "form-message";

            form.prepend(box);

        }


        box.textContent =
            message;


        box.classList.remove(
            "success-message",
            "error-message"
        );


        box.classList.add(
            type === "success"
                ? "success-message"
                : "error-message"
        );


        box.hidden = false;

    }


    // ==========================================
    // FORM SUBMIT
    // ==========================================

    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";


                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";


                const purpose =
                    purposeSelect
                        ? purposeSelect.value
                        : "";


                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                // ------------------------------
                // VALIDATION
                // ------------------------------

                if (
                    !name ||
                    !email ||
                    !phone ||
                    !message
                ) {

                    showFormMessage(
                        "Please fill in all required fields.",
                        "error"
                    );

                    return;

                }


                if (!isValidEmail(email)) {

                    showFormMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;

                }


                if (
                    !/^[6-9]\d{9}$/.test(phone)
                ) {

                    showFormMessage(
                        "Please enter a valid 10-digit Indian mobile number.",
                        "error"
                    );

                    return;

                }


                // ==================================
                // CREATE INQUIRY
                // ==================================

                const inquiry = {

                    id:
                        Date.now(),

                    name:
                        name,

                    email:
                        email,

                    phone:
                        phone,

                    purpose:
                        purpose,

                    message:
                        message,

                    property:
                        selectedProperty || null,

                    agent:
                        selectedAgent || null,

                    createdAt:
                        new Date().toISOString()

                };


                // ==================================
                // GET OLD INQUIRIES
                // ==================================

                let inquiries = [];


                try {

                    inquiries =
                        JSON.parse(
                            localStorage.getItem(
                                "veloestateInquiries"
                            ) || "[]"
                        );

                } catch {

                    inquiries = [];

                }


                // ==================================
                // SAVE
                // ==================================

                inquiries.push(
                    inquiry
                );


                localStorage.setItem(
                    "veloestateInquiries",
                    JSON.stringify(
                        inquiries
                    )
                );


                // ==================================
                // SUCCESS
                // ==================================

                showFormMessage(
                    "Thank you! Your enquiry has been submitted successfully.",
                    "success"
                );


                if (
                    typeof showToast ===
                    "function"
                ) {

                    showToast(
                        "Enquiry submitted successfully!"
                    );

                }


                // ==================================
                // RESET
                // ==================================

                form.reset();


                // Restore property message
                if (
                    messageInput &&
                    selectedProperty
                ) {

                    if (
                        action === "visit"
                    ) {

                        messageInput.value =
                            `Your visit request for "${selectedProperty.title}" has been submitted.`;

                    } else {

                        messageInput.value =
                            `Your enquiry for "${selectedProperty.title}" has been submitted.`;

                    }

                }

            }
        );

    }

});
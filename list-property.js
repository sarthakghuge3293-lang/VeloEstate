document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("propertyListingForm");
    const imageInput = document.getElementById("listingImage");
    const imagePreview = document.getElementById("imagePreview");

    if (!form) return;

    let selectedImage = "";


    // ==========================================
    // IMAGE UPLOAD + PREVIEW
    // ==========================================

    if (imageInput) {

        imageInput.addEventListener("change", () => {

            const file = imageInput.files[0];

            if (!file) {
                selectedImage = "";
                imagePreview.innerHTML = "";
                return;
            }


            // Check image type
            if (!file.type.startsWith("image/")) {

                showMessage(
                    "Please select a valid image file.",
                    "error"
                );

                imageInput.value = "";
                selectedImage = "";
                imagePreview.innerHTML = "";

                return;
            }


            // Maximum 2 MB
            if (file.size > 2 * 1024 * 1024) {

                showMessage(
                    "Image size must be less than 2 MB.",
                    "error"
                );

                imageInput.value = "";
                selectedImage = "";
                imagePreview.innerHTML = "";

                return;
            }


            const reader = new FileReader();


            reader.onload = function (event) {

                selectedImage = event.target.result;


                imagePreview.innerHTML = `
                    <div class="preview-box">

                        <img
                            src="${selectedImage}"
                            alt="Property Preview"
                        >

                        <button
                            type="button"
                            class="preview-remove"
                            id="removeImage"
                        >
                            Remove Image
                        </button>

                    </div>
                `;


                const removeButton =
                    document.getElementById("removeImage");


                if (removeButton) {

                    removeButton.addEventListener(
                        "click",
                        () => {

                            selectedImage = "";

                            imageInput.value = "";

                            imagePreview.innerHTML = "";

                        }
                    );

                }

            };


            reader.readAsDataURL(file);

        });

    }


    // ==========================================
    // FORM SUBMIT
    // ==========================================

    form.addEventListener("submit", (event) => {

        event.preventDefault();


        // ==========================================
        // GET FORM VALUES
        // ==========================================

        const purpose =
            document.getElementById("listingPurpose").value.trim();

        const type =
            document.getElementById("listingType").value.trim();

        const title =
            document.getElementById("listingTitle").value.trim();

        const description =
            document.getElementById("listingDescription").value.trim();

        const city =
            document.getElementById("listingCity").value.trim();

        const locality =
            document.getElementById("listingLocality").value.trim();

        const address =
            document.getElementById("listingAddress").value.trim();

        const price =
            document.getElementById("listingPrice").value.trim();

        const area =
            document.getElementById("listingArea").value.trim();

        const bedrooms =
            document.getElementById("listingBedrooms").value.trim();

        const bathrooms =
            document.getElementById("listingBathrooms").value.trim();

        const ownerName =
            document.getElementById("ownerName").value.trim();

        const ownerPhone =
            document.getElementById("ownerPhone").value.trim();

        const ownerEmail =
            document.getElementById("ownerEmail").value.trim();


        // ==========================================
        // VALIDATION
        // ==========================================

        if (
            !purpose ||
            !type ||
            !title ||
            !description ||
            !city ||
            !locality ||
            !address ||
            !price ||
            !area ||
            !ownerName ||
            !ownerPhone ||
            !ownerEmail
        ) {

            showMessage(
                "Please fill all required fields.",
                "error"
            );

            return;
        }


        // Phone validation

        if (!/^[6-9]\d{9}$/.test(ownerPhone)) {

            showMessage(
                "Please enter a valid 10-digit Indian mobile number.",
                "error"
            );

            return;
        }


        // Email validation

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerEmail)) {

            showMessage(
                "Please enter a valid email address.",
                "error"
            );

            return;
        }


        // Price validation

        if (Number(price) <= 0) {

            showMessage(
                "Please enter a valid property price.",
                "error"
            );

            return;
        }


        // Area validation

        if (Number(area) <= 0) {

            showMessage(
                "Please enter a valid property area.",
                "error"
            );

            return;
        }


        // ==========================================
        // GET AMENITIES
        // ==========================================

        const amenities = [];


        document
            .querySelectorAll(
                'input[name="amenities"]:checked'
            )
            .forEach((checkbox) => {

                amenities.push(checkbox.value);

            });


        // ==========================================
        // CREATE PROPERTY OBJECT
        // ==========================================

        const listing = {

            id: Date.now(),

            purpose: purpose,

            type: type,

            title: title,

            description: description,

            city: city,

            locality: locality,

            address: address,

            price: Number(price),

            area: Number(area),

            bedrooms: bedrooms,

            bathrooms: bathrooms,

            amenities: amenities,

            ownerName: ownerName,

            ownerPhone: ownerPhone,

            ownerEmail: ownerEmail,

            image: selectedImage || "",

            status: "Pending Review",

            createdAt: new Date().toISOString()

        };


        // ==========================================
        // GET OLD LISTINGS
        // ==========================================

        let listings = [];


        try {

            listings = JSON.parse(
                localStorage.getItem(
                    "veloestateUserListings"
                ) || "[]"
            );

            if (!Array.isArray(listings)) {
                listings = [];
            }

        } catch (error) {

            listings = [];

        }


        // ==========================================
        // ADD NEW LISTING
        // ==========================================

        listings.push(listing);


        // ==========================================
        // SAVE
        // ==========================================

        try {

            localStorage.setItem(
                "veloestateUserListings",
                JSON.stringify(listings)
            );

        } catch (error) {

            showMessage(
                "Could not save the listing. The image may be too large.",
                "error"
            );

            return;
        }


        // ==========================================
        // SUCCESS
        // ==========================================

        showMessage(
            "Property submitted successfully! Your listing is pending review.",
            "success"
        );


        if (typeof window.showToast === "function") {

            window.showToast(
                "Property submitted successfully!"
            );

        }


        // ==========================================
        // RESET FORM
        // ==========================================

        form.reset();

        selectedImage = "";


        if (imagePreview) {
            imagePreview.innerHTML = "";
        }


        // ==========================================
        // SCROLL TO MESSAGE
        // ==========================================

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // ==========================================
    // PHONE INPUT
    // ==========================================

    const phoneInput =
        document.getElementById("ownerPhone");


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
    // MESSAGE FUNCTION
    // ==========================================

    function showMessage(message, type) {

        let messageBox =
            document.getElementById(
                "listingFormMessage"
            );


        if (!messageBox) {

            messageBox =
                document.createElement("div");

            messageBox.id =
                "listingFormMessage";

            form.prepend(messageBox);

        }


        messageBox.textContent = message;


        messageBox.className =
            `form-message ${type}`;


        messageBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

});
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // STORAGE KEYS
    // ==========================================

    const USERS_KEY = "veloestateUsers";
    const LOGGED_IN_KEY = "veloestateLoggedIn";
    const CURRENT_USER_KEY = "veloestateCurrentUser";
    const REMEMBERED_EMAIL_KEY = "veloestateRememberedEmail";


    // ==========================================
    // DEMO ACCOUNT
    // ==========================================

    const DEMO_EMAIL = "demo@veloestate.com";
    const DEMO_PASSWORD = "123456";


    // ==========================================
    // ELEMENTS
    // ==========================================

    const loginForm =
        document.getElementById("loginForm");

    const registerForm =
        document.getElementById("registerForm");


    // ==========================================
    // HELPER FUNCTIONS
    // ==========================================

    function getUsers() {

        try {

            const users = JSON.parse(
                localStorage.getItem(USERS_KEY) || "[]"
            );

            return Array.isArray(users)
                ? users
                : [];

        } catch (error) {

            return [];

        }
    }


    function saveUsers(users) {

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(users)
        );

    }


    function setLoggedIn(user) {

        localStorage.setItem(
            LOGGED_IN_KEY,
            "true"
        );

        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(user)
        );

    }


    function getCurrentUser() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    CURRENT_USER_KEY
                ) || "null"
            );

        } catch (error) {

            return null;

        }

    }


    function showError(element, message) {

        if (!element) return;

        element.textContent = message;

        element.style.display = "block";

    }


    function clearError(element) {

        if (!element) return;

        element.textContent = "";

        element.style.display = "none";

    }


    function showSuccess(message) {

        let box =
            document.getElementById("authSuccess");

        if (!box) {

            box =
                document.createElement("div");

            box.id = "authSuccess";

            box.style.padding = "12px 15px";
            box.style.marginBottom = "15px";
            box.style.borderRadius = "10px";
            box.style.background = "#ecfdf5";
            box.style.color = "#047857";
            box.style.border = "1px solid #a7f3d0";
            box.style.fontWeight = "600";

            const form =
                loginForm || registerForm;

            if (form) {
                form.prepend(box);
            }

        }

        box.textContent = message;

        box.style.display = "block";

    }


    function goToDashboard() {

        window.location.href =
            "dashboard.html";

    }


    // ==========================================
    // CHECK EXISTING LOGIN
    // ==========================================

    const alreadyLoggedIn =
        localStorage.getItem(
            LOGGED_IN_KEY
        ) === "true";


    const currentUser =
        getCurrentUser();


    /*
     * If user is already logged in and opens
     * login/register page, send them to dashboard.
     */

    if (
        alreadyLoggedIn &&
        currentUser &&
        (loginForm || registerForm)
    ) {

        window.location.href =
            "dashboard.html";

        return;
    }


    // ==========================================
    // LOGIN
    // ==========================================

    if (loginForm) {

        const emailInput =
            document.getElementById("loginEmail");

        const passwordInput =
            document.getElementById("loginPassword");

        const rememberCheckbox =
            document.getElementById("rememberMe");

        const loginError =
            document.getElementById("loginError");


        // ------------------------------------------
        // REMEMBERED EMAIL
        // ------------------------------------------

        const rememberedEmail =
            localStorage.getItem(
                REMEMBERED_EMAIL_KEY
            );


        if (
            rememberedEmail &&
            emailInput
        ) {

            emailInput.value =
                rememberedEmail;

            if (rememberCheckbox) {
                rememberCheckbox.checked = true;
            }

        }


        // ------------------------------------------
        // LOGIN SUBMIT
        // ------------------------------------------

        loginForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                clearError(loginError);


                const email =
                    emailInput.value
                        .trim()
                        .toLowerCase();

                const password =
                    passwordInput.value;


                // Basic validation

                if (!email || !password) {

                    showError(
                        loginError,
                        "Please enter email and password."
                    );

                    return;
                }


                if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        .test(email)
                ) {

                    showError(
                        loginError,
                        "Please enter a valid email address."
                    );

                    return;
                }


                // ------------------------------------------
                // DEMO ACCOUNT
                // ------------------------------------------

                if (
                    email === DEMO_EMAIL &&
                    password === DEMO_PASSWORD
                ) {

                    const demoUser = {

                        id: "demo-user",

                        name: "Demo User",

                        email: DEMO_EMAIL,

                        phone: "9999999999"

                    };


                    setLoggedIn(demoUser);


                    if (rememberCheckbox?.checked) {

                        localStorage.setItem(
                            REMEMBERED_EMAIL_KEY,
                            email
                        );

                    } else {

                        localStorage.removeItem(
                            REMEMBERED_EMAIL_KEY
                        );

                    }


                    showSuccess(
                        "Login successful. Opening dashboard..."
                    );


                    setTimeout(
                        goToDashboard,
                        500
                    );


                    return;
                }


                // ------------------------------------------
                // REGISTERED USERS
                // ------------------------------------------

                const users =
                    getUsers();


                const user =
                    users.find(
                        item =>
                            String(item.email)
                                .toLowerCase()
                            === email
                    );


                if (!user) {

                    showError(
                        loginError,
                        "No account found with this email."
                    );

                    return;
                }


                if (
                    String(user.password)
                    !== String(password)
                ) {

                    showError(
                        loginError,
                        "Incorrect password."
                    );

                    return;
                }


                // Login successful

                setLoggedIn(user);


                if (rememberCheckbox?.checked) {

                    localStorage.setItem(
                        REMEMBERED_EMAIL_KEY,
                        email
                    );

                } else {

                    localStorage.removeItem(
                        REMEMBERED_EMAIL_KEY
                    );

                }


                showSuccess(
                    "Login successful. Opening dashboard..."
                );


                setTimeout(
                    goToDashboard,
                    500
                );

            }
        );

    }


    // ==========================================
    // REGISTER
    // ==========================================

    if (registerForm) {

        const nameInput =
            document.getElementById("registerName");

        const emailInput =
            document.getElementById("registerEmail");

        const phoneInput =
            document.getElementById("registerPhone");

        const passwordInput =
            document.getElementById("registerPassword");

        const confirmPasswordInput =
            document.getElementById("confirmPassword");

        const termsAgreement =
            document.getElementById("termsAgreement");

        const registerError =
            document.getElementById("registerError");


        // ------------------------------------------
        // REGISTER SUBMIT
        // ------------------------------------------

        registerForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                clearError(registerError);


                const name =
                    nameInput.value.trim();

                const email =
                    emailInput.value
                        .trim()
                        .toLowerCase();

                const phone =
                    phoneInput.value.trim();

                const password =
                    passwordInput.value;

                const confirmPassword =
                    confirmPasswordInput.value;


                // ------------------------------------------
                // VALIDATION
                // ------------------------------------------

                if (
                    !name ||
                    !email ||
                    !phone ||
                    !password ||
                    !confirmPassword
                ) {

                    showError(
                        registerError,
                        "Please fill all required fields."
                    );

                    return;
                }


                if (name.length < 2) {

                    showError(
                        registerError,
                        "Please enter your full name."
                    );

                    return;
                }


                if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        .test(email)
                ) {

                    showError(
                        registerError,
                        "Please enter a valid email address."
                    );

                    return;
                }


                if (
                    !/^[6-9]\d{9}$/.test(phone)
                ) {

                    showError(
                        registerError,
                        "Please enter a valid 10-digit mobile number."
                    );

                    return;
                }


                if (password.length < 6) {

                    showError(
                        registerError,
                        "Password must contain at least 6 characters."
                    );

                    return;
                }


                if (
                    password !== confirmPassword
                ) {

                    showError(
                        registerError,
                        "Passwords do not match."
                    );

                    return;
                }


                if (
                    termsAgreement &&
                    !termsAgreement.checked
                ) {

                    showError(
                        registerError,
                        "Please accept the terms and conditions."
                    );

                    return;
                }


                // ------------------------------------------
                // CHECK EXISTING USER
                // ------------------------------------------

                const users =
                    getUsers();


                const existingUser =
                    users.find(
                        item =>
                            String(item.email)
                                .toLowerCase()
                            === email
                    );


                if (existingUser) {

                    showError(
                        registerError,
                        "An account with this email already exists."
                    );

                    return;
                }


                // ------------------------------------------
                // CREATE USER
                // ------------------------------------------

                const newUser = {

                    id:
                        "user-" +
                        Date.now(),

                    name,

                    email,

                    phone,

                    password,

                    createdAt:
                        new Date().toISOString()

                };


                users.push(newUser);


                // Save user

                saveUsers(users);


                // Auto login

                setLoggedIn(newUser);


                // Remember email

                localStorage.setItem(
                    REMEMBERED_EMAIL_KEY,
                    email
                );


                // Success

                showSuccess(
                    "Account created successfully. Opening dashboard..."
                );


                setTimeout(
                    goToDashboard,
                    700
                );

            }
        );


        // ------------------------------------------
        // PHONE INPUT
        // ------------------------------------------

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

    }


    // ==========================================
    // PASSWORD TOGGLE
    // ==========================================

    function setupPasswordToggle(
        buttonId,
        inputId
    ) {

        const button =
            document.getElementById(buttonId);

        const input =
            document.getElementById(inputId);


        if (!button || !input) {
            return;
        }


        button.addEventListener(
            "click",
            () => {

                if (
                    input.type === "password"
                ) {

                    input.type = "text";

                    button.textContent =
                        "Hide";

                } else {

                    input.type = "password";

                    button.textContent =
                        "Show";

                }

            }
        );

    }


    setupPasswordToggle(
        "togglePassword",
        "loginPassword"
    );


    setupPasswordToggle(
        "toggleRegisterPassword",
        "registerPassword"
    );


    setupPasswordToggle(
        "toggleConfirmPassword",
        "confirmPassword"
    );


    // ==========================================
    // FORGOT PASSWORD
    // ==========================================

    const forgotPassword =
        document.getElementById("forgotPassword");


    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                alert(
                    "Demo version: Password recovery will be connected to the backend later."
                );

            }
        );

    }


    // ==========================================
    // GOOGLE LOGIN PLACEHOLDER
    // ==========================================

    const googleLogin =
        document.getElementById("googleLogin");


    const googleRegister =
        document.getElementById("googleRegister");


    function googleMessage(event) {

        event.preventDefault();

        alert(
            "Google authentication will be connected when the backend is added."
        );

    }


    if (googleLogin) {

        googleLogin.addEventListener(
            "click",
            googleMessage
        );

    }


    if (googleRegister) {

        googleRegister.addEventListener(
            "click",
            googleMessage
        );

    }


    // ==========================================
    // CLEAR ERROR WHILE TYPING
    // ==========================================

    document
        .querySelectorAll(
            "input, textarea, select"
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                () => {

                    const error =
                        document.getElementById(
                            "loginError"
                        ) ||
                        document.getElementById(
                            "registerError"
                        );


                    if (error) {
                        clearError(error);
                    }

                }
            );

        });

});
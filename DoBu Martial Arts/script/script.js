function validateForm(event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const messageError = document.getElementById("messageError");

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const messageValue = messageInput.value.trim();

    let valid = true;

    if (nameValue === "") {
        nameError.textContent = "Name is required.";
        valid = false;
    } else {
        nameError.textContent = "";
    }

    if (emailValue === "") {
        emailError.textContent = "Email is required.";
        valid = false;
    } else if (!isValidEmail(emailValue)) {
        emailError.textContent = "Invalid email format.";
        valid = false;
    } else {
        emailError.textContent = "";
    }

    if (phoneValue === "") {
        phoneError.textContent = "Phone number is required.";
        valid = false;
    } else if (!isValidPhoneNumber(phoneValue)) {
        phoneError.textContent = "Invalid phone number format.";
        valid = false;
    } else {
        phoneError.textContent = "";
    }

    if (messageValue === "") {
        messageError.textContent = "Message is required.";
        valid = false;
    } else {
        messageError.textContent = "";
    }

    if (valid) {
        console.log("Form is valid");
        alert('Form submitted successfully!');
        document.getElementById("contactForm").reset();

        // Optionally, you can handle form submission here, like sending data to the server
        // document.getElementById("contactForm").submit();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phone) {
    const phoneRegex =  /^\d+$/;
    return phoneRegex.test(phone);
}
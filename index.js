// 1. CONFIGURATION
const FORMSPREE_URL = "https://formspree.io/f/xqekdreq"; // Paste your code here

// 2. MAIN FUNCTION
async function handleSubmit(event) {
    event.preventDefault(); // Stop page from reloading
    
    const status = document.getElementById("formStatus");
    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");

    // UI: Show loading state
    submitBtn.disabled = true;
    status.innerText = "Sending data...";

    // A. PREPARE DATA
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries()); // Converts form to clean JSON object

    // B. SAVE TO LOCAL STORAGE (Backup)
    try {
        localStorage.setItem("userBackup", JSON.stringify(userData));
        console.log("Backup saved to Local Storage.");
    } catch (e) {
        console.warn("Could not save to local storage", e);
    }

    // C. SEND TO FORMSPREE (The Email)
    try {
        const response = await fetch(FORMSPREE_URL="https://formspree.io/f/xqekdreq", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.innerText = "Success! Data sent and saved.";
            status.style.color = "green";
            form.reset(); // Clear the inputs
        } else {
            // If Formspree has an error (like a wrong email)
            const data = await response.json();
            if (Object.hasOwn(data, 'errors')) {
                status.innerText = data["errors"].map(error => error["message"]).join(", ");
            } else {
                status.innerText = "Oops! There was a problem submitting your form.";
            }
            status.style.color = "red";
        }
    } catch (error) {
        status.innerText = "Network error. Please try again.";
        status.style.color = "red";
    }

    // UI: Re-enable button
    submitBtn.disabled = false;
}

// 3. EVENT LISTENER
// This waits for the DOM to load before attaching the listener
document.getElementById("contactForm").addEventListener("submit", handleSubmit);
var timeBox = document.getElementById("timeBox");

// Fill it with the user's local time string
// Example result: "Mon Dec 29 2025 02:00:00 GMT+0530 (India Standard Time)"
timeBox.value = new Date().toString();
    // 2. GET the data from the HTML
    var nameValue = document.getElementById("name").value;
    var fatherValue = document.getElementById("fathername").value;
    var emailValue = document.getElementById("email").value;
var addressValue = document.getElementById("address").value;
    var phoneValue = document.getElementById("phone").value;
    var genderValue = document.querySelector("input[name='gender']:checked").value;
    var stateValue = document.getElementById("stateSelect").value;
    var districtValue = document.getElementById("districtSelect").value;
    var electricityBillValue = document.getElementById("electricitybill").value;
    var idProofValue = document.getElementById("idProof").value;
    var electricityBillFileValue = document.getElementById("electricitybill").value;
    
    // 3. STORE the data in an Object (A digital package)
    var userData = {
        name: nameValue,
        father_name: fatherValue,
        email: emailValue,
        address: addressValue,
        phonenumber: phoneValue,    
        gender: genderValue,
        state: stateValue,
        district: districtValue,
        electricity_bill: electricityBillValue,
        id_proof: idProofValue,
        electricity_bill_file: electricityBillFileValue,
        
        submission_date: new Date().toLocaleDateString()
    };

    // 4. USE the data (For now, we print it to the Console)
    localStorage.setItem("mySavedUser", JSON.stringify(userData));

    // 4. Confirm it worked
    alert("Data Saved Successfully!");
    console.log("Saved to browser memory:", userData);

window.onload = function() {
    var savedData = localStorage.getItem("mySavedUser");
    
    if (savedData) {
        // Turn the text back into an Object
        var user = JSON.parse(savedData);
        
        // Put the values back into the boxes
        document.getElementById("Name").value = user.name;
        document.getElementById("fatherName").value = user.father_name;
        document.getElementById("Email").value = user.email;
        document.getElementById("Address").value = user.address;
        document.getElementById("Phone").value = user.phonenumber;
        document.getElementById("stateSelect").value = user.state;
        document.getElementById("districtSelect").value = user.district;
        document.getElementById("electricityBill").value = user.electricity_bill;
        document.getElementById("idProof").value = user.id_proof;
        document.getElementById("electricitybill").value = user.electricity_bill_file;

        alert("Welcome back, " + user.name + "! I restored your data.");
    }
};
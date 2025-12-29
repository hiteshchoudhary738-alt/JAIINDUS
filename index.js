// --- START OF CLEAN CODE ---

const FORMSPREE_URL = "https://formspree.io/f/xqekdreq";

// 1. WAIT FOR PAGE TO LOAD (Prevents crashes)
document.addEventListener("DOMContentLoaded", function() {
    
    // Connect to the form
    const form = document.getElementById("contactForm");
    
    // Restore data if the user is returning
    restoreData();

    // Attach the submit listener safely
    if (form) {
        form.addEventListener("submit", handleSubmit);
    } else {
        console.error("ERROR: Could not find <form id='contactForm'> in your HTML.");
    }
});

// 2. MAIN SUBMIT FUNCTION
async function handleSubmit(event) {
    event.preventDefault(); // Stop reload
    
    const form = event.target;
    const status = document.getElementById("formStatus");
    // Find button safely (works even if ID is missing)
    const submitBtn = form.querySelector("button[type='submit']");

    // UI: Lock button & show loading
    if(submitBtn) submitBtn.disabled = true;
    if(status) {
        status.innerText = "Sending data...";
        status.style.color = "black";
    }

    // A. PREPARE DATA (Safe way - handles Gender automatically)
    const formData = new FormData(form);
    formData.append("submission_time", new Date().toString());

    // B. SAVE BACKUP (Text only)
    try {
        const objectData = Object.fromEntries(formData.entries());
        localStorage.setItem("userBackup", JSON.stringify(objectData));
    } catch (e) {
        console.warn("Backup warning:", e);
    }

    // C. SEND TO FORMSPREE
    try {
        const response = await fetch(FORMSPREE_URL, {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            if(status) {
                status.innerText = "Success! Form sent.";
                status.style.color = "green";
            }
            form.reset(); // Clear inputs
            localStorage.removeItem("userBackup"); // Clear backup
        } else {
            const data = await response.json();
            if (Object.hasOwn(data, 'errors')) {
                if(status) status.innerText = data["errors"].map(e => e["message"]).join(", ");
            } else {
                if(status) status.innerText = "Error submitting form.";
            }
            if(status) status.style.color = "red";
        }
    } catch (error) {
        if(status) {
            status.innerText = "Network error. Please try again.";
            status.style.color = "red";
        }
    }

    // UI: Unlock button
    if(submitBtn) submitBtn.disabled = false;
}

// 3. RESTORE FUNCTION (Safe version)
function restoreData() {
    const savedData = localStorage.getItem("userBackup");
    if (savedData) {
        try {
            const user = JSON.parse(savedData);
            
            // Helper to fill boxes safely
            const setValue = (id, val) => {
                const el = document.getElementById(id);
                if (el && val) el.value = val;
            };

            // IDs must match your HTML exactly
            setValue("name", user.name);
            setValue("fathername", user.fathername); // check HTML ID
            setValue("email", user.email);
            setValue("address", user.address);
            setValue("phone", user.phone);
            setValue("age", user.age);
            setValue("electricity-bill", user.electricity_bill); // check HTML ID
            
            console.log("Restored data from backup.");
        } catch (e) {
            console.error("Restoring failed", e);
        }
    }
}



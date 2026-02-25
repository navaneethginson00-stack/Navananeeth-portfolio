function toggleMode() {
    document.body.classList.toggle("dark");
}

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("contactForm").addEventListener("submit", async function (e) {
        e.preventDefault(); // Stop page refresh

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        if (name === "" || email === "" || message === "") {
            alert("Please fill all fields!");
            return;
        }

        try {
            const response = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            });

            const data = await response.json();

            if (data.success) {
                document.getElementById("successMsg").innerHTML = "✅ Message Sent Successfully!";
                document.getElementById("successMsg").style.color = "#00ffff";
                document.getElementById("contactForm").reset();
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Server error. Try again.");
        }

    });

});
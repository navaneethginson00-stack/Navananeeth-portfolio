function toggleMode() {
    document.body.classList.toggle("dark");
}
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("contactForm").addEventListener("submit", function(e) {
        e.preventDefault(); // Stop page refresh

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        if(name === "" || email === "" || message === "") {
            alert("Please fill all fields!");
            return;
        }

        document.getElementById("successMsg").innerHTML = "✅ Message Sent Successfully!";
        document.getElementById("successMsg").style.color = "#00ffff";

        document.getElementById("contactForm").reset();
    });
    

});
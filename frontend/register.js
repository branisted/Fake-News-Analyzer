document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, role })
        });

        const data = await response.json();
        if (response.status === 201) {
            alert(data.message);
            // Optionally navigate to another page, then refocus on the input fields
            window.location.href = "login.html"; // Or use navigateTo if using Electron navigation
            // Re-focus on the username field after a successful registration
            document.getElementById("username").focus(); // Focus username field
        } else {
            alert(data.message);
            // Re-focus on the username field if registration fails
            document.getElementById("username").focus(); // Focus username field
        }
    } catch (error) {
        alert("Error: " + error.message);
        // Re-focus on the username field if an error occurs
        document.getElementById("username").focus(); // Focus username field
    }
});

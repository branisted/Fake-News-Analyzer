document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.status === 200) {
            // Store token or data, then navigate to the next page dynamically
            localStorage.setItem("authToken", data.token);
            alert("Login successful!");

            // Optionally navigate to another page, then refocus on the input fields
            window.location.href = "home.html"; // Or use navigateTo if using Electron navigation

            // Re-focus on the username field after a successful login
            document.getElementById("username").focus(); // Focus username field
        } else {
            alert(data.message);
            // Re-focus on the username field if login fails
            document.getElementById("username").focus(); // Focus username field
        }
    } catch (error) {
        alert("Error: " + error.message);
        // Re-focus on the username field if an error occurs
        document.getElementById("username").focus(); // Focus username field
    }
});

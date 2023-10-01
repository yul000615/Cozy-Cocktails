document.addEventListener("DOMContentLoaded", () => {
  var loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    var userEmail = document.querySelector(".userEmail").value;
    var userPassword = document.querySelector(".userPassword").value;

    var formData = {
      email: userEmail,
      password: userPassword,
    };

    try {
      const response = await fetch("/api/account/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success, e.g., redirect the user to another page
        window.location.href = "/success";
      } else {
        // Handle errors, e.g., display an error message
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
    }
  });
});

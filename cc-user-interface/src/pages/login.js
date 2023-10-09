// Create a form element
var form = document.createElement("form");
form.action = "#";
form.method = "POST";
form.id = "loginForm";

// Create and append form elements
var h1 = document.createElement("h1");
h1.textContent = "Welcome";

var emailInput = document.createElement("input");
emailInput.type = "text";
emailInput.placeholder = "Email";
emailInput.className = "userEmail";
emailInput.required = true;

var passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.placeholder = "Password";
passwordInput.className = "userPassword";
passwordInput.required = true;

var rememberForgetDiv = document.createElement("div");
rememberForgetDiv.className = "remember-forget";

var rememberLabel = document.createElement("label");
var rememberCheckbox = document.createElement("input");
rememberCheckbox.type = "checkbox";
rememberLabel.appendChild(rememberCheckbox);
rememberLabel.appendChild(document.createTextNode(" Remember me"));

var forgotPasswordLink = document.createElement("a");
forgotPasswordLink.href = "#";
forgotPasswordLink.textContent = "Forgot password?";

var submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.className = "btn";
submitButton.textContent = "Login";

// Append elements to the form
form.appendChild(h1);
form.appendChild(emailInput);
form.appendChild(passwordInput);
form.appendChild(rememberForgetDiv);
rememberForgetDiv.appendChild(rememberLabel);
rememberForgetDiv.appendChild(forgotPasswordLink);
form.appendChild(submitButton);

// Add the form to the DOM
document.body.appendChild(form);

// Add event listener to the form
form.addEventListener("submit", async (e) => {
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

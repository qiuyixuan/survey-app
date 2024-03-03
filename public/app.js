document.addEventListener("DOMContentLoaded", function () {
    const appContainer = document.getElementById("app");
  
    // Simple login form
    const loginForm = `
      <h2>Login</h2>
      <form id="loginForm">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <br />
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <br />
        <button type="submit">Login</button>
      </form>
    `;
  
    // Append login form to the app container
    appContainer.innerHTML = loginForm;
  
    // Add login form submission logic
    const loginFormElement = document.getElementById("loginForm");
    loginFormElement.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      // Add logic to handle login
    });
  
    // Survey questions form
    const surveyForm = `
    <h2>Survey Questions</h2>
    <form id="surveyForm">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required />
    <br />
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required />
    <br />
    <label for="age">What is your age?</label>
    <input type="number" id="age" name="age" required />
    <br />
    <label for="maritalStatus">Which of the following best describes your marital status?</label>
    <select id="maritalStatus" name="maritalStatus" required>
        <option value="">Select...</option>
        <option value="Single">Single</option>
        <option value="Married">Married</option>
        <option value="Widowed">Widowed</option>
        <option value="Other">Other</option>
    </select>
    <br />
    <div id="otherMaritalStatus" style="display: none;">
        <label for="otherMaritalStatusInput">Please specify:</label>
        <input type="text" id="otherMaritalStatusInput" name="otherMaritalStatusInput" />
    </div>
    <br />
    <label for="seenTherapist">Have you ever seen a therapist for mental health issues?</label>
    <select id="seenTherapist" name="seenTherapist" required>
        <option value="">Select...</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
    </select>
    <br />
    <label for="takingMedication">Are you taking any medications?</label>
    <select id="takingMedication" name="takingMedication" required>
      <option value="">Select...</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>

    <div id="medicationDetails" style="display: none;">
      <label for="medication1">Medication Details:</label>
      <input type="text" class="medicationInput" name="medication1" required />
      <button type="button" id="addMedication">Add a new medication</button>
    </div>
    <button type="submit">Submit</button>
    </form>
    `;

    // Append survey form to the app container
    appContainer.innerHTML += surveyForm;
  
    // Add event listeners and survey form submission logic
    const surveyFormElement = document.getElementById("surveyForm");
    const takingMedicationSelect = document.getElementById("takingMedication");
    const medicationDetailsContainer = document.getElementById("medicationDetails");
    const addMedicationButton = document.getElementById("addMedication");

    let medicationCounter = 1;
  
    takingMedicationSelect.addEventListener("change", function () {
        if (takingMedicationSelect.value === "Yes") {
          medicationDetailsContainer.style.display = "block";
        } else {
          medicationDetailsContainer.style.display = "none";
        }
      });
      
      addMedicationButton.addEventListener("click", function () {
        medicationCounter++;
        const newMedicationInput = document.createElement("div");
        newMedicationInput.innerHTML = `
          <label for="medication${medicationCounter}">Medication Details:</label>
          <input type="text" class="medicationInput" name="medication${medicationCounter}" required />
        `;
        medicationDetailsContainer.appendChild(newMedicationInput);
      });
  
      surveyFormElement.addEventListener("submit", async function (event) {
        event.preventDefault();
  
      // Extract survey data from the form
      const surveyData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value,
        maritalStatus: document.getElementById("maritalStatus").value,
        seenTherapist: document.getElementById("seenTherapist").value,
        takingMedication: document.getElementById("takingMedication").value,
        medications: Array.from(
            document.getElementsByClassName("medicationInput"),
            (input) => input.value
          ),
      };
  
      // Send survey data to the backend
      const response = await fetch("http://localhost:3001/api/submit-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });
  
      // Handle the backend response
      if (response.ok) {
        // Clear the form or redirect to a thank-you page if needed
        surveyFormElement.reset();
  
        // Display success feedback
        displayFeedback("Survey submitted successfully!", true);
      } else {
        // Display error feedback if the backend response is not OK
        const errorMessage = await response.text();
        displayFeedback(`Error: ${errorMessage}`, false);
      }
    });
  });
  
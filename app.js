// Functionality

// first think we wanna listen to the submit btn.
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // Show Loader
  document.getElementById("loading").style.display = "block";
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});
// Calculate Results

function calculateResults() {
  console.log("calculating...");
  //UI Vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  // First create a principle
  // Principal is the amount variable.
  const principal = parseFloat(amount.value);
  const calculatedInteret = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute Monthly payment
  const x = Math.pow(1 + calculatedInteret, calculatedPayments);
  const monthly = (principal * x * calculatedInteret) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    document.getElementById("results").style.display = "block";

    // Hide loading
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please chek your numbers");
  }
}

//Show error function

function showError(error) {
  // Create a div
  const errorDiv = document.createElement("div");
  // Insert it into the DOM.
  // we want the card as a parent div, and we gonna put before heading.
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  // Add class in bootstrap
  errorDiv.classList = "alert alert-danger";

  // create text node and append to DIV
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error function

function clearError() {
  document.querySelector(".alert").remove();
}

let taxDisplay = document.querySelectorAll(".tax-info");
let taxSwitch = document.getElementById("switchCheckReverse");
const priceElement = document.querySelectorAll(".price");

taxSwitch.addEventListener("click", () => {
  for (let i = 0; i < priceElement.length; i++) {
    let el = priceElement[i]; //Get current element
    let basePrice = parseFloat(el.dataset.price); // Get the actual value of listing price

    if (taxSwitch.checked) {
      let taxed = Math.floor(basePrice * 1.18);
      el.innerHTML = `&#8377; ${taxed.toLocaleString("en-IN")} / night`;
      taxDisplay[i].style.display = "inline";   // same as el variable
    } else {
      el.innerHTML = `&#8377; ${basePrice.toLocaleString("en-IN")} / night`;
      taxDisplay[i].style.display = "none";
    }
  }
});

let categories = document.getElementsByClassName("filter");
let listings = document.querySelectorAll(".listing-wrapper");

for (let category of categories) {
  category.addEventListener("click", () => {
    let selectedCategory = category
      .querySelector("p")
      .innerText.trim()
      .toLocaleLowerCase();
    let found = false;

    for (let card of listings) {
      let cardCategory = card.dataset.category.toLocaleLowerCase();
      if (cardCategory === selectedCategory) {
        card.classList.remove("hide");
        found = true;
      } else {
        card.classList.add("hide");
      }
    }
    if (!found) {
      alert("No listings found in this category.");
      window.location.href = "/listings"; // redirect to all listings page if no listings found
    }
  });
}

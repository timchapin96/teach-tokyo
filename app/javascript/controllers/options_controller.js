import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["slider"]
  //The slider was being a pain with loading. So i had to set the whole containing div to display none.
  optionsLoad() {
    let optionsElement = document.querySelector(".options")
    let optionsBody = document.querySelector(".options-body")
    let optionsVis = optionsElement.style.visibility;
    let optionsOpen = optionsVis === "visible";
    optionsElement.style.visibility = optionsOpen ? "hidden" : "visible";
    //Then I toggle display to flex via show-display class
    optionsBody.classList.toggle("show-display")
  }
  projectorMode() {
    let projectorBody = document.querySelector("body");
    let gamesContainer = document.querySelector(".games-container");
    if (this.sliderTarget.checked) {
      projectorBody.classList.add("projector-mode")
      gamesContainer.style.backgroundColor = "rgb(2, 64, 93)";
    }
    else {
      projectorBody.classList.remove("projector-mode")
      gamesContainer.style.backgroundColor = "#0283c0";
    }
  }
  langSwitch(event) {
    const lang = event.target.dataset.optionsArgument;
    fetch('/change_locale,', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale: lang })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Handle success, e.g., display a message or reload the page
          console.log('Locale changed successfully!');
          location.reload(); // Reload the page to reflect the new locale
        } else {
          // Handle error
          console.error('Failed to change language');
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }
}

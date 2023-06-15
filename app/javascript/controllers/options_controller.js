import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["slider"]
  optionsLoad() {
    let optionsElement = document.querySelector(".options")
    let optionsVis = optionsElement.style.visibility;
    let optionsOpen = optionsVis === "visible";
    console.log(optionsOpen);
    optionsElement.style.visibility = optionsOpen ? "hidden" : "visible";
  }
  projectorMode() {
    let projectorBody = document.querySelector("body");
    if(this.sliderTarget.checked) {
      projectorBody.classList.add("projector-mode")
    }
    else {
      projectorBody.classList.remove("projector-mode")
    }
  }
}

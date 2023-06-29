import { Controller } from "@hotwired/stimulus"
export default class extends Controller {
  static targets = ["newGame"]
  displayForm() {
    this.newGameTarget.classList.remove("d-none")
  }
  displayNew() {
    const newForm = document.querySelector("#new-game");
    newForm.classList.remove("d-none");
  }
}

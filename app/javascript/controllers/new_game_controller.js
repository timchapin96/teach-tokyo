import { Controller } from "@hotwired/stimulus"
export default class extends Controller {
  static targets = ["newGame"]
  displayForm() {
    this.newGameTarget.classList.remove("d-none")
  }
}

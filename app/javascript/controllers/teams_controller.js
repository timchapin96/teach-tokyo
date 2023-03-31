import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  select(e) {
    // e.target.classList.toggle("unsellected")
    console.log(e.target.opacity);
  }
}

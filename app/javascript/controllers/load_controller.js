import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  load() {
    let gamesList = document.querySelector(".load-games")
    gamesList.style.display = "block";
    window.onbeforeunload = function() {
      gamesList.style.display = "none";
    }
  }
}

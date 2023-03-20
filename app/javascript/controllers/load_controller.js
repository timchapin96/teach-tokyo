import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  load() {
    console.log("Hi");
    let gamesList = document.querySelector(".load-games")
    gamesList.style.display = "block";
  }
}

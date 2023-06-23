import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const gameCards = document.querySelectorAll(".game-card")
    gameCards.forEach((game) => {
      game.addEventListener('click', this.handleCheckboxChange)
    })
  }

  handleCheckboxChange(e) {
    let selectedGame = e.target;
    let gameCheckbox = selectedGame.querySelector('input');
    gameCheckbox.checked ? gameCheckbox.checked = false : gameCheckbox.checked = true;
    selectedGame.classList.toggle('selected');
  }
}

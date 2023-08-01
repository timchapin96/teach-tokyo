import { Controller } from "@hotwired/stimulus";
let roundLength = 0;
let currentRound = 0;
let currentTurn = 0;

export default class extends Controller {
  static targets = ["roundPopup", "show"];
  static values = {
    teams: Array,
    game: Object,
    round: Number
  };

  connect() {
    const turnOrder = this.gameValue.turn_order.map((team) => {
      return team;
    });
    currentRound = this.gameValue.round;
    roundLength = this.teamsValue.length - 1;
    currentTurn = this.gameValue.round - 1;

    const prefectures = document.querySelectorAll(".pref-select")
    prefectures.forEach((prefecture) => {
      this.turn(prefecture);
    });

  };

  //Team can pick one territory, then it moves on to next teams turn
  turn(prefecture) {
    prefecture.addEventListener("click", e => {
      currentTurn < roundLength ? currentTurn++ : (currentTurn = 0, this.round())
    })

  };

  round() {
    currentRound++;
    this.roundValue = currentRound;
    console.log(this.roundValue);
    let round = document.querySelector("#current-round");
    round.innerHTML = this.roundValue;
  };

  //When round is over add 1 to round start from top of the order
  //When a new round starts display that round.
  newRound() {
    this.roundPopupTarget.showModal();
  }
}

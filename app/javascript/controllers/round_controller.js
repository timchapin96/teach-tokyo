import { Controller } from "@hotwired/stimulus"
let roundLength = 0;

export default class extends Controller {
  static targets = ["roundPopup", "show"];
  static values = {
    teams: Array,
    game: Object
  };

  connect() {
    // const shuffled = this.shuffle();
    // console.log(shuffled);
    roundLength = this.teams.length;
  };

  round() {

  };

  //Team can pick one territory, then it moves on to next teams turn
  turn() {


  };
  //When round is over add 1 to round start from top of the order
  //When a new round starts display that round.
  newRound() {
    this.roundPopupTarget.showModal();
  }
}

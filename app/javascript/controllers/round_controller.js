import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["roundPopup", "show"];

  connect () {

  }
  //Randomize team turn order
  //set round length to number of teams
  //Team can pick one territory, then it moves on to next teams turn
  //When round is over add 1 to round start from top of the order
  //When a new round starts display that round.
  newRound() {
    this.roundPopupTarget.showModal();
  }

}

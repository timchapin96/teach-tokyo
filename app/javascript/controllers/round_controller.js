import { Controller } from "@hotwired/stimulus"
const roundLength = 0;
const turnOrder = [];

export default class extends Controller {
  static targets = ["roundPopup", "show"];
  static values = {
    teams: Array,
    game: Object
  }

  connect() {
    // const shuffled = this.shuffle();
    // console.log(shuffled);
    roundLength = this.teamsValue.length;
  }

  round() {

  }

  //Team can pick one territory, then it moves on to next teams turn
  turn()
  //When round is over add 1 to round start from top of the order
  //When a new round starts display that round.
  newRound() {
    this.roundPopupTarget.showModal();
  }

  //Randomize team turn order
  //Fisher-Yates Shuffle
  shuffle() {
    let teams = this.teamsValue.map((team) => {
      return team.color
    });
    let currentIndex = this.teamsValue.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [teams[currentIndex], teams[randomIndex]] = [
        teams[randomIndex], teams[currentIndex]];
    }

    return teams;
  }
}

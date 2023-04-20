import { Controller } from "@hotwired/stimulus"
export default class extends Controller {
  static values = {
    teams: Array
  };
  connect() {
    const teams = this.teamsValue;
    const teamScores = document.querySelectorAll(".score");
    teams.forEach((team) => {
      let teamScore = document.querySelector(`.${team}-score`);
      teamScore.classList.add("current-team")
      teamScore.style.backgroundColor = `${team}`;
    });
    teamScores.forEach((teamScore) => {
      if (!teamScore.classList.contains("current-team")) {
        teamScore.style.display = "none";
      }
    });
  }
}

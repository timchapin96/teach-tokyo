import { Controller } from "@hotwired/stimulus"
const teams = [];
const location = window.location.pathname
const errorMessage = document.querySelector(".error-message")

export default class extends Controller {
  static target = ["errorMessage"] //Error message not found. Ask about later

  static values = {
    teams: Object
  }

  // Select team colors and add to array
  select(e) {
    let teamColor = e.target.getAttribute("team");
    e.target.classList.toggle("select-opacity");
    if (teams.includes(teamColor)) {
      teams.splice(teams.indexOf(teamColor), 1);
    }
    else {
      teams.push(teamColor);
    }
  }
  //Submit teams and start game
  teamSubmit() {
    //shuffle turn order
    let turnOrder = this.shuffle(teams);
    // Get the div containing the team options
    let teamSelectDiv = document.querySelector(".team-select");
    // Get all the team colors
    let teamColors = document.querySelectorAll(".team-color");

    //If teams Selected is more than 1, submit patch request
    if (teams.length > 1) {
      // Send PATCH request to update the database with the teams selected
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      fetch(`${window.location.pathname}`, {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ teams: teams, turnOrder: turnOrder })
      })
        .then((response) => {
          console.log("Team select submitted successfully");
          window.location.href = window.location.href;
        })
      //For each color remove the opacity class to make them invisible
      teamColors.forEach((color) => {
        color.classList.remove("select-opacity");
      })
      // Make selection invisible to user
      teamSelectDiv.style.display = "none";
      errorMessage.style.visibility = "hidden"
    }
    else {
      errorMessage.style.visibility = "visible"
    }
  }

  //Randomize teams for a random turn order
  //Fisher-Yates Shuffle
  shuffle(teamsArray) {
    let tempTeams = [...teamsArray];
    console.log();

    let currentIndex = tempTeams.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [tempTeams[currentIndex], tempTeams[randomIndex]] = [
        tempTeams[randomIndex], tempTeams[currentIndex]];
    }

    return tempTeams;
  }
}

import { Controller } from "@hotwired/stimulus"
const teamSelect = [];
const location = window.location.pathname

export default class extends Controller {
  // Select team colors and add to array
  select(e) {
    let teamColor = e.target.getAttribute("team");
    e.target.classList.toggle("select-opacity");
    if (teamSelect.includes(teamColor)) {
      teamSelect.splice(teamSelect.indexOf(teamColor), 1);
    }
    else {
      teamSelect.push(teamColor);
    }
  }
  //Submit teams and start game
  teamSubmit() {
    // Get the div containing the team options
    let teamSelectDiv = document.querySelector(".team-select");
    // Get all the team colors
    let teamColors = document.querySelectorAll(".team-color");
    //For each color remove the opacity class to make them invisible
    teamColors.forEach((color) => {
      color.classList.remove("select-opacity");
    })
    // Make selection invisible to user
    teamSelectDiv.style.display = "none";

    //Send PATCH request to update the database with the teams selected
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch(`${window.location.pathname}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken
      },
      body: JSON.stringify({ teamSelect: teamSelect })
    })
      .then((response) => {
        console.log("Team select submitted successfully");
        window.location.href = window.location.href;
      })
  }
}

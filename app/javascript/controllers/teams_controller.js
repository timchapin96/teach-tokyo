import { Controller } from "@hotwired/stimulus"
const teamSelect = [];
const location = window.location.pathname

export default class extends Controller {
  showTeamSelect() {

  }
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
    let teamSelectDiv = document.querySelector(".team-select")
    let teamColors = document.querySelectorAll(".team-color")
    teamColors.forEach((color) => {
      color.classList.remove("select-opacity");
    })
    teamSelectDiv.style.display = "none";

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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting team select:", error);
      });
  }
}

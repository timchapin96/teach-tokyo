import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["japan", "select"];
  static values = {
    game: Object
  };

  connect() {
    this.loadGame();
    this.colorFill();
    this.updateScore();
    this.hover();
  }

  colorFill() {
    const select = document.querySelector(".color-select")
    const teamSelect = document.querySelectorAll("#select div")
    const prefectures = document.querySelectorAll(".st0")
    let selectedPref = "";
    // Get ward selected
    prefectures.forEach((prefecture) => {
      prefecture.addEventListener("click", e => {
        select.style.display = "block";
        selectedPref = document.getElementById(`${e.target.id}`)
      });
    });
    //Change label color on hover

    // On Color click change background of ward to that colors id
    teamSelect.forEach((teamColor) => {
      teamColor.addEventListener("click", e => {
        const team = e.target.getAttribute("team");
        let color = e.target.getAttribute("fill");
        let r = this.hexToRgb(color)["r"] / 1.5;
        let g = this.hexToRgb(color)["g"] / 1.5;
        let b = this.hexToRgb(color)["b"] / 1.5;
        let strokeRGB = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
        selectedPref.style.fill = color;
        selectedPref.style.stroke = strokeRGB;
        selectedPref.setAttribute("team", team);
        this.updateScore();
        const docks = document.querySelectorAll(`.${selectedPref.id}-dock`);
        docks.forEach((dock) => {
          dock.style.fill = color;
        })
        select.style.display = "none";
      })
    })
  }
  loadGame() {
    const array = document.querySelectorAll(".st0");
    console.log(array);
    let board = this.gameValue["boardState"];
    array.forEach((pref) => {
      if (board[pref.id][0]) {
        let prefColor = board[pref.id][0];
        let prefTeam = board[pref.id][1];
        pref.style.fill = prefColor;
        pref.setAttribute("team", prefTeam);
      }
    });

  }
  save(event) {
    event.preventDefault();
    let prefData = []
    const prefectures = document.querySelectorAll(".st0")
    prefectures.forEach((pref) => {
      if (pref.style.fill === "") {
        pref.style.fill = "rgb(128, 128, 128)"
      }
      prefData.push({ prefecture: pref.id, style: pref.style.fill, color: pref.getAttribute("team") });
    });

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch(`${window.location.pathname}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken
      },
      body: JSON.stringify(prefData)

    })
      .then(response => response)
      .then((data) => {
        console.log(data)
      })

  }
  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  hover() {
    const prefectures = document.querySelectorAll(".st0")
    prefectures.forEach((pref) => {
      pref.addEventListener("mouseover", (event) => {
        let prefName = event.target.id;
        let foundPref = document.querySelector(`.${prefName}-title`);
        foundPref.style.fill = "rgb(0,0,0)"
      })
      pref.addEventListener("mouseout", (event) => {
        let prefName = event.target.id;
        let foundPref = document.querySelector(`.${prefName}-title`);
        foundPref.style.fill = "rgb(255,255,255)"
      })
    });
  }

  //Score functions
  tallyScore() {
    const prefectures = document.querySelectorAll(".st0")
    //Define scores Object
    let teamScores = { red: 0, blue: 0, green: 0, purple: 0, orange: 0, black: 0 };
    //Loop through the prefectures and tally the scores
    prefectures.forEach((pref) => {
      console.log(pref.getAttribute("team"));
      let prefTeam = pref.getAttribute("team");
      teamScores[`${prefTeam}`] = parseInt(teamScores[`${prefTeam}`]) + 1
    })
    //Return team scores for save event
    return teamScores;
  }
  //Update score function
  updateScore() {
    let teamScores = this.tallyScore();
    //Get team colors
    const currentTeams = document.querySelectorAll(".score");
    //Loop through all the active teams and set their score counter
    currentTeams.forEach((team) => {
      let teamColor = team.getAttribute("team-color");
      let teamScore = document.querySelector(`.${teamColor}-score`);
      teamScore.innerHTML = teamScores[`${teamColor}`].toString();
    });
  }


}

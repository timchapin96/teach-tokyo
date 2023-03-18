import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["japan", "select"];
  static values = {
    game: Object
  };

  connect() {
    this.loadGame();
    this.colorFill();

    // this.gameValue["boardState"].forEach((pref) => {
    //   console.log(pref);
    // });
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
        let color = e.target.getAttribute("fill");
        let r = this.hexToRgb(color)["r"] / 8;
        let g = this.hexToRgb(color)["g"] / 8;
        let b = this.hexToRgb(color)["b"] / 8;
        let strokeRGB = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
        console.log(strokeRGB);
        selectedPref.style.fill = color;
        selectedPref.style.stroke = strokeRGB;
        // selectedPref.classList.toggle(e.target.id)
        select.style.display = "none";
      })
    })
  }
  loadGame() {
    const prefectures = document.querySelectorAll(".st0")
    let board = this.gameValue["boardState"];
    prefectures.forEach((pref) => {
      let prefColor = board[pref.id];
      pref.style.fill = prefColor;
      // console.log(board[pref.id]);
    });
    // prefectureKeys.forEach((key) => {
    //   let prefColor = board[key];
    // })

  }
  save(event) {
    event.preventDefault();
    let prefData = []
    const prefectures = document.querySelectorAll(".st0")
    prefectures.forEach((pref) => {
      if (pref.style.fill === "") {
        pref.style.fill = "rgb(128, 128, 128)"
      }
      prefData.push({ prefecture: pref.id, style: pref.style.fill });
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


}

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["japan", "select"];
  connect() {
    this.colorFill();
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

    // On Color click change background of ward to that colors id
    teamSelect.forEach((teamColor) => {
      teamColor.addEventListener("click", e => {
        let color = e.target.getAttribute("fill");
        selectedPref.style.fill = color;
        select.style.display = "none";
      })
    })
  }
}

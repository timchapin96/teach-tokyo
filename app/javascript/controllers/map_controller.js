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
        // selectedPref.classList.toggle(e.target.id)
        select.style.display = "none";
      })
    })
  }
  save(event) {
    event.preventDefault();
    let prefData = []
    const prefectures = document.querySelectorAll(".st0")
    prefectures.forEach((pref) => {
      if (pref.style.fill === "") {
        console.log(pref);
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
  load(event) {
    const prefectures = document.querySelectorAll(".st0")

    prefectures.forEach((pref) => {

    });
  }


}

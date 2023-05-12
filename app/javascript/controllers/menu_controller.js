import { Controller } from "@hotwired/stimulus"
export default class extends Controller {

  menuPopup(e) {
    // If user clicks popup menu, toggle dropdown
    let popupMenu = document.querySelector(".popup-menu");
    if(popupMenu.classList.length === 1) {
      popupMenu.classList.add("slide-down");
    }
    else {
      popupMenu.classList.toggle("slide-down")
      popupMenu.classList.toggle("slide-up")
    }
  }
  menuClose(e) {
    const excludedIds = ["load-button", "new-button", "new-game", "game_title", "new_game"];
    //If menu is open and user clicks anywhere else close menu
    let popupMenu = document.querySelector(".popup-menu");
    let popupMenuOpen = popupMenu.classList.contains("slide-down");
    let loadMenu = document.querySelector(".load-games")
    let loadMenuOpen = loadMenu.style.display;
    let newMenu = document.querySelector(".new-game")
    let newMenuClosed = newMenu.classList.contains("d-none")

    if(popupMenuOpen) {
      popupMenu.classList.add("slide-up");
      popupMenu.classList.remove("slide-down");
    }
    // If Load Menu is open and click happens anywhere that isnt load buttons close menu
    if (!excludedIds.includes(e.target.id)) {
      if (loadMenuOpen) {
        loadMenu.style.display = "none";
      }
      if (!newMenuClosed) {
        newMenu.classList.add("d-none");
      }
    }
  }

}

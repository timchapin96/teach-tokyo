import { Controller } from "@hotwired/stimulus"
export default class extends Controller {
  menuPopup(e) {
    // If user clicks popup menu, toggle dropdown
    let popupMenu = document.querySelector(".popup-menu");
    if(popupMenu.classList.contains("slide-down")) {
      popupMenu.classList.add("slide-up");
      popupMenu.classList.remove("slide-down");
    }
    else {
      popupMenu.classList.add("slide-down");
      popupMenu.classList.remove("slide-up");
    }
  }
  // menuClose(e) {
  //   //If menu is open and user clicks anywhere else close menu
  //   let popupMenu = document.querySelector(".popup-menu");
  //   let popupMenuOpen = popupMenu.classList.contains("slide-down");
  //   let loadMenu = document.querySelector(".load-games")
  //   let loadMenuOpen = loadMenu.style.display;
  //   if(popupMenuOpen) {
  //     popupMenu.classList.add("slide-up");
  //     popupMenu.classList.remove("slide-down");
  //   }
  //   // If Load Menu is open and click happens anywhere that isnt load buttons close menu
  //   if(e.target.id !== "load-button" && loadMenuOpen) {
  //     loadMenu.style.display = "none";
  //   }
  // }

}

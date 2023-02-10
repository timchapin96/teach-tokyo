import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  show(e) {
    let base_url = e.srcElement.baseURI
    let list_id = e.currentTarget.getAttribute("data-id")
    window.location.href =`${base_url}/${list_id}`
  }
}

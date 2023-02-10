let cards = document.querySelectorAll("#student_list_cards")

cards.forEach((card) => {
  card.addEventListener("click", () => {
    window.location.href = `http://localhost:3000/student_lists/${card.getAttribute("data-id")}`;
  });
});

// This function toggles the visibility of an HTML element with the given id.
function toggleList(listId) {
  let list = document.getElementById(listId);
  if (list.style.display === "block") {
      list.style.display = "none";
  } else {
      list.style.display = "block";
  }
}

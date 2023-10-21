function toggleList(listId) {
  let list = document.getElementById(listId);
  if (list.style.display === "block") {
      list.style.display = "none";
  } else {
      list.style.display = "block";
  }
}

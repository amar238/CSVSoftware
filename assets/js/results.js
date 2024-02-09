function toggleDetails(button) {
    var row = button.parentNode.parentNode.nextElementSibling;
    row.classList.toggle("hidden-row");
    if (row.classList.contains("hidden-row")) {
        row.style.height = '0';
    } else {
        console.log(row.scrollHeight)
        row.style.height = 'auto';
        console.log(row.style.height);
    }
}
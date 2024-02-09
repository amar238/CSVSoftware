const allocateButtons = document.querySelectorAll('.allocate-btn');

allocateButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const studentId = this.getAttribute('data-student-id');
    const form = document.getElementById(`allocateForm${studentId}`);
    const data = {
        studentId: form.querySelector('input[name="student"]').value
    }

    // Send AJAX request to allocate interview
    fetch(form.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
      if (data.success) {
        // If allocation is successful, remove the row from the table
        const row = this.closest('tr');
        row.parentNode.removeChild(row);
        // update count
        const countElement = document.getElementById('count');
        var count = parseInt(countElement.getAttribute('data-count')) + 1;
        countElement.setAttribute('data-count', count);
        countElement.textContent= 'Count of Scheduled interviews: '+count;
      } else {
        // Handle the case where the update was not successful
        alert('Allocation failed. Please try again.');
      }
    })
    .catch(error => console.error('Error:', error));
  });
});
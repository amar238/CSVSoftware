function editRowStats(button) {
    // Get the parent row
    const row = button.closest('tr');
    
    // Find the cells containing the data to be edited
    const dsaCell = row.querySelector('td:nth-child(4)');
    const webDCell = row.querySelector('td:nth-child(5)');
    const reactCell = row.querySelector('td:nth-child(6)');
    
    // Get the current data
    const dsaData = dsaCell.innerText;
    const webDData = webDCell.innerText;
    const reactData = reactCell.innerText;
    
    // Replace the data with input fields
    dsaCell.innerHTML = `<input type="number" value="${dsaData}">`;
    webDCell.innerHTML = `<input type="number" value="${webDData}">`;
    reactCell.innerHTML = `<input type="number" value="${reactData}">`;
    
    // Hide edit button and show update and cancel buttons
    button.style.display = 'none';
    row.querySelector('.delete-btn').style.display = 'none';
    row.querySelector('.update-btn').style.display = 'inline-block';
    row.querySelector('.cancel-btn').style.display = 'inline-block';
}

function cancelEditStats(button) {
    // Get the parent row
    const row = button.closest('tr');
    
    // Restore the previous state
    const stats = JSON.parse(row.getAttribute('data-stats'));
    row.querySelector('td:nth-child(4)').innerHTML = stats.dsa;
    row.querySelector('td:nth-child(5)').innerHTML = stats.webD;
    row.querySelector('td:nth-child(6)').innerHTML = stats.react;
    
    // Show edit button and hide update and cancel buttons
    row.querySelector('.edit-btn').style.display = 'inline-block';
    row.querySelector('.delete-btn').style.display = 'inline-block';
    row.querySelector('.update-btn').style.display = 'none';
    row.querySelector('.cancel-btn').style.display = 'none';
}

function updateRowStats(button) {
    const allInputs = document.querySelectorAll('input');
    for (const input of allInputs) {
        if (input.value === '' || input.value < 0 || input.value >100) {
            alert('Cannot accept empty fields or negative values or value more than 100');
            return; // Abort the update process
        }
    }
    // Get the parent row
    const row = button.closest('tr');
    // Retrieve the stats id from the data attribute
    const statsData = JSON.parse(row.getAttribute('data-stats'));
    //Get the data from input fields & Prepare the updated data
    const updatedStats = {
        dsa: row.querySelector('td:nth-child(4) input').value,
        webD: row.querySelector('td:nth-child(5) input').value,
        react: row.querySelector('td:nth-child(6) input').value
    };
    // Send an asynchronous request to update the student's information
    fetch(`/course-scores/update/${statsData._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedStats)
    })
    .then(response => response.json())
    .then(data => {
        // on success update data in row in table
        if (data.success) {
            row.querySelector('td:nth-child(4)').innerText = data.stats.dsa;
            row.querySelector('td:nth-child(5)').innerText = data.stats.webD;
            row.querySelector('td:nth-child(6)').innerText = data.stats.react;     
            // Show edit button and hide update and cancel buttons
            row.querySelector('.edit-btn').style.display = 'inline-block';
            row.querySelector('.delete-btn').style.display = 'inline-block';
            row.querySelector('.update-btn').style.display = 'none';
            row.querySelector('.cancel-btn').style.display = 'none';
        }
    })
    .catch(error => {
        console.log('Error updating course scores data:', error);
    });
}

function deleteRowStats(button) {
    // Confirmation box
    if (confirm('Are you sure you want to delete this row?')) {
        // Get the parent row
        const row = button.closest('tr');
        const statsId = button.getAttribute('data-stats-id');
        fetch(`/course-scores/delete/${statsId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Delete response from server:', data);

            // If the deletion was successful, remove the row from the table
            const row = button.closest('tr');
            row.remove();
        })
        .catch(error => {
            console.error('Error during delete request:', error);
            // Handle errors as needed
        });
    }
} 
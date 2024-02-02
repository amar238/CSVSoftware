// Function to cancelling update 
function cancelEdit(button) {
    const row = button.closest('tr');
    const buttons = row.querySelectorAll('button');
    row.querySelectorAll('td:not(:last-child)').forEach((td, index) => {
        // Retrieve the original content from the data attribute
        const originalContent = td.getAttribute(`data-original-${index}`);

        // Set the original content back to the cell
        td.innerHTML = originalContent;
    });
    // Display the edit and delete buttons
    buttons[0].style.display = 'inline-block';
    buttons[1].style.display = 'inline-block';
    buttons[2].style.display = 'none';
    buttons[3].style.display = 'none';
}

// function to update row in table
function updateRow(button) {
    const row = button.closest('tr');
    const buttons = row.querySelectorAll('button');
    // Retrieve the student data from the data attribute
    const studentData = JSON.parse(row.getAttribute('data-student'));
    // Gather updated data from input fields and select dropdowns
    const updatedData = {
        name: row.querySelector('td:nth-child(1) input').value,
        email: row.querySelector('td:nth-child(2) input').value,
        college: row.querySelector('td:nth-child(3) input').value,
        batch: row.querySelector(`#batch-${studentData._id}`).value,
        status: row.querySelector(`#status${studentData._id}`).value
    };
    // Send an asynchronous request to update the student's information
    fetch(`/update/${studentData._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        // on success update data in row in table
        if (data.success) {
            row.querySelector('td:nth-child(1)').innerText = data.student.name;
            row.querySelector('td:nth-child(2)').innerText = data.student.email;
            row.querySelector('td:nth-child(3)').innerText = data.student.college;
            row.querySelector('td:nth-child(4)').innerText = data.student.batch.year + ' - ' + data.student.batch.month;
            row.querySelector('td:nth-child(5)').innerText = data.student.status;    
            // Display the edit and delete buttons
            buttons[0].style.display = 'inline-block';
            buttons[1].style.display = 'inline-block';
            buttons[2].style.display = 'none';
            buttons[3].style.display = 'none';
        } else {
            // Handle the case where the update was not successful
            alert('Update failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error updating student data:', error);
    });
}

// function to delete row
function deleteRow(button) {
    const row = button.closest('tr');
    // Retrieve the student ID from the data attribute
    const studentIdDel = JSON.parse(row.getAttribute('data-student'))._id

    // Prompt the user for confirmation
    const isConfirmed = confirm('Are you sure you want to delete this student?');
    if (isConfirmed) {
        // Perform the deletion
        fetch(`/delete/${studentIdDel}`, {
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
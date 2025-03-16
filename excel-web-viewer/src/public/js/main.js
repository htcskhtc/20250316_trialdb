const fetchData = async () => {
    try {
        // Instead of fetching from an API endpoint, fetch the static JSON file
        const response = await fetch('/data/users.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

const displayData = (data) => {
    const dataContainer = document.getElementById('dataDisplay');
    dataContainer.innerHTML = ''; // Clear previous data

    if (data.length === 0) {
        dataContainer.innerHTML = '<p>No data available</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const usernameHeader = document.createElement('th');
    usernameHeader.textContent = 'Username';
    const passwordHeader = document.createElement('th');
    passwordHeader.textContent = 'Password';
    
    headerRow.appendChild(usernameHeader);
    headerRow.appendChild(passwordHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    data.forEach(user => {
        const row = document.createElement('tr');
        const usernameCell = document.createElement('td');
        usernameCell.textContent = user.username;
        const passwordCell = document.createElement('td');
        passwordCell.textContent = user.password;
        
        row.appendChild(usernameCell);
        row.appendChild(passwordCell);
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    dataContainer.appendChild(table);
};

document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchDataBtn');
    if (fetchButton) {
        fetchButton.addEventListener('click', fetchData);
    } else {
        // If we're on the data page, fetch automatically
        fetchData();
    }
});
const fetchData = async () => {
    try {
        const response = await fetch('/api/data');
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
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = ''; // Clear previous data

    data.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.innerHTML = `<strong>Username:</strong> ${user.username} <strong>Password:</strong> ${user.password}`;
        dataContainer.appendChild(userDiv);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

const themetoggler = document.querySelector(".theme-toggler");
themetoggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themetoggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themetoggler.querySelector('span:nth-child(2)').classList.toggle('active');

})



//For the Comments
document.addEventListener("DOMContentLoaded", function () {
    // Fetching the JSON data
    fetch('comments.json')
        .then(response => response.json()) // Parse the JSON data
        .then(comments => {
            const updatesContainer = document.querySelector('.recent-update');

            // Loop through each comment and create HTML for each
            comments.forEach(comment => {
                const updateDiv = document.createElement('div');
                updateDiv.classList.add('update'); // Add class to the div

                // Insert the comment data into the new div
                updateDiv.innerHTML = `
                    <div class="profile-photo">
                        <img src="img/avatar.png" alt="Profile Photo">
                    </div>
                    <div class="message">
                        <p><b>${comment.name}</b> ${comment.comment}</p>
                        <small class="text-muted">Just Now</small>
                    </div>
                `;

                // Append the new update div to the updates container
                updatesContainer.appendChild(updateDiv);
            });
        })
        .catch(error => {
            console.error('Error loading the JSON data:', error);
        });
});
//for sales
// For total sales
document.addEventListener("DOMContentLoaded", function () {
    const ordersData = JSON.parse(localStorage.getItem('orders')) || []; // Retrieve orders from localStorage
    let totalSales = 0;

    // Loop through each order and calculate total sales
    ordersData.forEach(order => {
        const price = parseFloat(order.price); // Convert the price to a number
        if (!isNaN(price)) {
            totalSales += price;  // Summing the price field of each order
        }
    });

    // Update the total sales amount in the HTML
    document.getElementById("total-sales").textContent = `$${totalSales.toFixed(2)}`;

    // Calculate the sales percentage progress
    let salesGoal = 1000;  // Example sales goal (you can adjust this as needed)
    let salesPercentage = Math.min((totalSales / salesGoal) * 100, 100); // Prevent going over 100%

    // Update the sales percentage text
    document.getElementById("sales-percentage").textContent = `${salesPercentage.toFixed(2)}%`;

    // Optionally, update the SVG circle's stroke-dasharray to reflect progress visually
    const circle = document.querySelector('svg circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (salesPercentage / 100) * circumference;
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${offset}`;
});

// For expenses
document.addEventListener("DOMContentLoaded", function () {
    const booksData = JSON.parse(localStorage.getItem('books')) || []; // Retrieve books from localStorage
    let totalExpenses = 0;

    // Loop through each book and calculate the total expenses
    booksData.forEach(book => {
        const price = parseFloat(book.price); // Convert the price to a number
        if (!isNaN(price)) {
            totalExpenses += price; // Summing up the price field of each book
        }
    });

    // Update the total expenses amount in the HTML
    document.getElementById("total-expenses").textContent = `$${totalExpenses.toFixed(2)}`;

    // Calculate the expenses percentage progress
    let expensesGoal = 50000;  // Example expenses goal (adjustable)
    let expensesPercentage = Math.min((totalExpenses / expensesGoal) * 100, 100); // Prevent going over 100%

    // Update the percentage text
    document.getElementById("expenses-percentage").textContent = `${expensesPercentage.toFixed(2)}%`;

    // Update the progress circle
    const circle = document.querySelectorAll('svg circle')[1];
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (expensesPercentage / 100) * circumference;
    circle.style.strokeDashoffset = `${offset}`;
});

// For income
document.addEventListener("DOMContentLoaded", function () {
    const ordersData = JSON.parse(localStorage.getItem('orders')) || []; // Retrieve orders from localStorage
    const booksData = JSON.parse(localStorage.getItem('books')) || []; // Retrieve books from localStorage
    let totalSales = 0;
    let totalExpenses = 0;

    // Calculate Total Sales
    ordersData.forEach(order => {
        const price = parseFloat(order.price);
        if (!isNaN(price)) {
            totalSales += price;
        }
    });

    // Calculate Total Expenses
    booksData.forEach(book => {
        const price = parseFloat(book.price);
        if (!isNaN(price)) {
            totalExpenses += price;
        }
    });

    // Calculate Total Income
    let totalIncome = totalSales - totalExpenses;
    document.getElementById("totalIncome").textContent = `$${totalIncome.toFixed(2)}`;

    // Calculate the Income Percentage
    let incomePercentage = (totalIncome / totalSales) * 100;
    incomePercentage = Math.min(incomePercentage, 100);
    document.getElementById("income-percentage").textContent = `${incomePercentage.toFixed(2)}%`;

    // Update the Progress Circle
    const circle = document.querySelectorAll('svg circle')[2];
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (incomePercentage / 100) * circumference;
    circle.style.strokeDashoffset = `${offset}`;
});

// For the charts
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve books and recent orders from localStorage
    const booksData = JSON.parse(localStorage.getItem('books')) || [];
    const ordersData = JSON.parse(localStorage.getItem('orders')) || [];

    // Count the number of books
    const booksCount = booksData.length;

    // Create the Books Available Chart
    const ctx1 = document.getElementById('booksChart').getContext('2d');
    new Chart(ctx1, {
        type: 'bar', // Bar chart
        data: {
            labels: ['Books Available'],
            datasets: [{
                label: 'Total Books',
                data: [booksCount], // The number of books
                backgroundColor: '#4caf50',
                borderColor: '#388e3c',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Count the number of orders
    const ordersCount = ordersData.length;

    // Create the Recent Orders Chart
    document.addEventListener("DOMContentLoaded", function () {
        // Fetch orders from localStorage and create the chart
        const ordersData = JSON.parse(localStorage.getItem('orders')) || []; // Retrieve orders from localStorage

        // Debugging: Check the fetched data in the console
        console.log('Orders Data:', ordersData);

        if (ordersData.length === 0) {
            console.log('No orders data available in localStorage');
            return; // Exit if no data is available
        }

        // Create the Recent Orders Chart
        const ctx2 = document.getElementById('recentOrdersChart').getContext('2d');
        new Chart(ctx2, {
            type: 'pie', // Pie chart
            data: {
                labels: ['Done Orders', 'Pending Orders'],
                datasets: [{
                    data: [
                        ordersData.filter(order => order.payment === 'done').length, // Completed orders
                        ordersData.filter(order => order.payment === 'processing').length // Pending orders
                    ],
                    backgroundColor: ['#ff6f61', '#d3d3d3'],
                }]
            },
            options: {
                responsive: true,
            }
        });
    });

});


// For the Order Status Chart (Shipped / Delivered / Pending)
document.addEventListener("DOMContentLoaded", function () {
    // Fetch orders from localStorage
    const ordersData = JSON.parse(localStorage.getItem('orders')) || [];

    // Count the number of orders by status
    const shippedCount = ordersData.filter(order => order.status === 'shipped').length;
    const deliveredCount = ordersData.filter(order => order.status === 'delivered').length;
    const pendingCount = ordersData.filter(order => order.status === 'pending').length;

    // Create the Order Status Chart
    const ctx3 = document.getElementById('orderStatusChart').getContext('2d');
    new Chart(ctx3, {
        type: 'pie', // Pie chart
        data: {
            labels: ['Shipped', 'Delivered', 'Pending'],
            datasets: [{
                data: [shippedCount, deliveredCount, pendingCount], // Counts of each status
                backgroundColor: ['#4caf50', '#ff9800', '#f44336'], // Green, Orange, Red for each status
            }]
        },
        options: {
            responsive: true,
        }
    });
});



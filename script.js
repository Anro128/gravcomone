function fetchCSVandPlot(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n').slice(1); // Skip header row
            const labels = [];
            const values = [[]];

            const columnCount = rows[0].split(',').length - 1;
            for (let i = 0; i < columnCount; i++) {
                values.push([]);
            }

            rows.forEach(row => {
                const columns = row.split(',');
                labels.push(columns[0]);

                // Create an array to store values for each row
                for (let i = 1; i < columns.length; i++) {
                    values[i-1].push(parseFloat(columns[i]));
                }
            });

            console.log(labels);
            console.log(values[1]);
            // Call function to create chart
            createChart(labels, values);
        })
        .catch(error => console.error('Error fetching CSV:', error));
}



function createChart(labels, values) {
    // bar chart
    const ctx = document.getElementById('barChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Data',
                data: values[0],
                backgroundColor: 'rgba(54, 162, 235, 0.5)', // Customize bar color
                borderColor: 'rgba(54, 162, 235, 1)', // Customize border color
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

fetchCSVandPlot('DataPadi.csv');

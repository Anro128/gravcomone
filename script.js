function fetchCSVandPlot(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n').slice(1); // Skip header row
            const labels = [];
            const values = [];

            rows.forEach(row => {
                const columns = row.split(',');
                labels.push(columns[0]);

                // Create an array to store values for each row
                const rowValues = [];
                for (let i = 1; i < columns.length; i++) {
                    rowValues.push(parseFloat(columns[i]));
                }
                values.push(rowValues);
            });

            // Call function to create chart
            createChart(labels, values);
        })
        .catch(error => console.error('Error fetching CSV:', error));
}



function createChart(labels, values) {
    // bar chart
}

fetchCSVandPlot('DataPadi.csv');

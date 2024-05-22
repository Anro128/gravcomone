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
                    values[i - 1].push(parseFloat(columns[i]));
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
    // Bar chart
    const ctx = document.getElementById('barChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Data',
                data: values[0],
                backgroundColor: '#0E8388', // Customize bar color
                borderColor: '#306464', // Customize border color
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            family: 'Poppins', // Set font family for Chart.js chart
                            weight: 'bold' // Set font weight for Chart.js chart
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Luas Panen antar Provinsi di Tahun 2023', // Title for bar chart
                    font: {
                        size: 24,
                        family: 'Poppins', // Set font family for Chart.js chart
                        weight: 'bold' // Set font weight for Chart.js chart
                    }
                }
            }
        }
    });

    const pieColors = ['#0E8388', '#306464', '#FDB034'];

    // Line chart
    const lineLabels = ['2021', '2022', '2023']; // Label tahun
    const lineData = [52.25, 52.38, 52.85]; // Data nilai

    const ctxx = document.getElementById('LineChart').getContext('2d');
    const myLineChart = new Chart(ctxx, {
        type: 'line',
        data: {
            labels: lineLabels,
            datasets: [{
                label: 'Data',
                data: lineData,
                borderColor: '#0E8388', // Warna garis line chart
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 20, // Set step size to 5
                        font: {
                            family: 'Poppins',
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Produktivitas Padi Indonesia Dari Tahun 2021 Sampai 2023',
                    font: {
                        size: 24,
                        family: 'Poppins',
                        weight: 'bold'
                    }
                }
            }
        }
    });

    // Function to create Plotly pie chart
    function createPieChart(elementId, titleText, labelSliceStart, labelSliceEnd, valueSliceStart, valueSliceEnd) {
        const pieData = [{
            labels: labels.slice(labelSliceStart, labelSliceEnd), // Pie chart labels
            values: values[1].slice(valueSliceStart, valueSliceEnd), // Pie chart values
            type: 'pie',
            marker: { colors: pieColors }
        }];

        const layout = {
            font: { size: 18, family: 'Poppins' }, // Set font family for Plotly pie chart
            title: {
                text: titleText, // Title for pie chart
                font: { size: 24, family: 'Poppins', weight: 'bold' }, // Set font properties for title
                xref: 'paper',
                x: 0.5,
                xanchor: 'center'
            },
            responsive: true
        };

        Plotly.newPlot(elementId, pieData, layout);
    }

    // Create Plotly pie charts
    createPieChart('PiePlot1', 'Total Produksi Pulau Sumatera', 1, 8, 1, 8);
    createPieChart('PiePlot2', 'Total Produksi Pulau Jawa', 11, 16, 11, 16);
    createPieChart('PiePlot3', 'Total Produksi Pulau Kalimantan', 20, 24, 20, 24);
    createPieChart('PiePlot4', 'Total Produksi Pulau Sulawesi', 25, 30, 25, 30);
    createPieChart('PiePlot5', 'Total Produksi Pulau Papua', 33, 38, 33, 38);
}

fetchCSVandPlot('DataPadi.csv');

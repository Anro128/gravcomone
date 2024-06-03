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
    const barchart = document.getElementById('barChart');
    var trace = {
        x: labels,
        y: values[0],
        type: 'bar',
        marker: {
            color: '#0E8388', // Bar color
            line: {
                color: 'rgba(54, 162, 235, 1)', // Border color
                width: 1
            }
        }
    };

    var data = [trace];

    var layout = {
        title: {
                display: true,
                text: 'BarChart Luas Panen Setiap Provinsi di Indonesia Tahun 2023',
                font: {
                    size: 24,
                    family: 'Poppins',
                    weight: 'bold'
                }
        },
        yaxis: {
            title: 'Luas Panen (ha)',
            zeroline: true,
            zerolinecolor: '#000',
            zerolinewidth: 1
        },
        xaxis: {
            title: 'Provinsi',
            zeroline: true,
            zerolinecolor: '#000',
            zerolinewidth: 1
        },
        barmode: 'group'
    };

    Plotly.newPlot(barchart, data, layout);

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
                        stepSize: 50, // Set step size to 50
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
            values: values[2].slice(valueSliceStart, valueSliceEnd), // Pie chart values
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

    // Bubble chart
function createBubbleChart(labels, values) {
    const ctx = document.getElementById('bubbleChart').getContext('2d');
    
    // Function to generate random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const dataPoints = values[0].map((x, index) => ({
        x: x,
        y: values[2][index],
        r: values[1][index],
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor()
    }));

    const data = {
        datasets: [{
            label: 'Luas Panen vs Produksi',
            data: dataPoints,
            backgroundColor: dataPoints.map(point => point.backgroundColor),
            borderColor: dataPoints.map(point => point.borderColor),
            borderWidth: 1
        }]
    };
    console.log(data);

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Luas Panen'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Produksi'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Bubble Chart Luas Panen vs Produksi dengan Ukuran Bubble Produktivitas'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const labelIndex = context.dataIndex;
                        const dataLabel = labels[labelIndex]; 
                        return `${dataLabel} ${context.raw.r}`;
                    }
                }
            }
        }
    };

    const myBubbleChart = new Chart(ctx, {
        type: 'bubble',
        data: data,
        options: options
    });
}

createBubbleChart(labels, values);

}

fetchCSVandPlot('DataPadi.csv');

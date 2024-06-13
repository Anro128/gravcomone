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
    const combined = labels.map((label, index) => {
        return { label: label, value: values[0][index] };
    });

    combined.sort((a, b) => b.value - a.value);

    const barlabels = combined.map(item => item.label);
    const barValues = [combined.map(item => item.value)];
    var trace = {
        x: barlabels,
        y: barValues[0],
        type: 'bar',
        marker: {
            color: '#0E8388', // Bar color
            line: {
                color: 'rgba(22, 202, 208, 1)', // Border color
                width: 1
            }
        }
    };

    var data = [trace];

    var layout = {
        yaxis: {
            title: {
                text: 'Luas Panen (ha)',
                standoff: 10
            },
        },
        xaxis: {
            title: {
                text: 'Provinsi',
                standoff: 20
            },
            automargin: true
        },
        barmode: 'group'
    };

    Plotly.newPlot(barchart, data, layout);

    const pieColors = ['#16CAD0', '#0E8388', '#306464', '#6C4406', '#B16E02', '#FDB034', '#D2B98A'];

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
                        stepSize: 50, 
                        font: {
                            family: 'Poppins',
                            weight: 'bold'
                        }
                    }
                }
            },
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
            font: { size: 18, family: 'Poppins' },
            title: {
                text: titleText, 
                font: { size: 18, family: 'Poppins', weight: 'bold' }, 
                xref: 'paper',
                x: 0.5,
                xanchor: 'center'
            },
            responsive: true
        };

        Plotly.newPlot(elementId, pieData, layout);
    }

    // Create Plotly pie charts
    createPieChart('PiePlot1', 'Total Produksi Pulau Sumatera', 0, 10, 0, 10);
    createPieChart('PiePlot2', 'Total Produksi Pulau Jawa', 10, 16, 10, 16);
    createPieChart('PiePlot3', 'Total Produksi Pulau Kalimantan', 19, 24, 19, 24);
    createPieChart('PiePlot4', 'Total Produksi Pulau Sulawesi', 24, 30, 24, 30);
    createPieChart('PiePlot5', 'Total Produksi Pulau Papua', 32, 38, 32, 38);

    // Bubble chart
    function createBubbleChart(labels, values) {
        const ctx = document.getElementById('bubbleChart').getContext('2d');
        const dataPoints = values[0].map((x, index) => ({
            x: x,
            y: values[2][index],
            r: values[1][index]
        }));

        const data = {
            datasets: [{
                label: 'Luas Panen vs Produksi',
                data: dataPoints,
                backgroundColor: 'rgba(14, 131, 136, 0.5)',
                borderColor: 'rgba(22, 202, 208, 1)',
                borderWidth: 2
            }]
        };
        console.log(data);

        const options = {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Luas Panen',
                        font: {
                            family: 'Poppins',
                            size: 13,
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Produksi',
                        font: {
                            family: 'Poppins',
                            size: 13,
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const labelIndex = context.dataIndex;
                            const dataLabel = labels[labelIndex]; 
                            return '${dataLabel} ${context.raw.r}';
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
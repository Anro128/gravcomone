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

    //Pie Chart Pulau Sumatra
    const pieData1 = [{
        labels: labels. slice(1,8), // Pie chart labels
        values: values[1]. slice(1,8), // Pie chart values
        type: 'pie'
        }];
    
    const layout1 = {
        font: {size: 18},
        responsive: true
        };
    
    Plotly.newPlot('PiePlot1', pieData1, layout1);

    
    //Pie Chart Pulau Jawa
    const pieData2 = [{
        labels: labels. slice(11,16), // Pie chart labels
        values: values[1]. slice(11,16), // Pie chart values
        type: 'pie'
        }];
    
    const layout2 = {
        font: {size: 18},
        responsive: true
        };
    
    Plotly.newPlot('PiePlot2', pieData2, layout2);


    //Pie Chart Pulau Kalimantan
    const pieData3 = [{
        labels: labels. slice(20,24), 
        values: values[1]. slice(20,24), 
        type: 'pie'
        }];
    
    const layout3 = {
        font: {size: 18},
        responsive: true
        };
    
    Plotly.newPlot('PiePlot3', pieData3, layout3);

    //Pie Chart Pulau Sulawesi
    const pieData4 = [{
        labels: labels. slice(25,30), 
        values: values[1]. slice(25,30), 
        type: 'pie'
        }];
    
    const layout4 = {
        font: {size: 18},
        responsive: true
        };
    
    Plotly.newPlot('PiePlot4', pieData4, layout4);

    //Pie Chart Pulau Papua
    const pieData5 = [{
        labels: labels. slice(33,38), 
        values: values[1]. slice(33,38), 
        type: 'pie'
        }];
    
    const layout5 = {
        font: {size: 18},
        responsive: true
        };
    
    Plotly.newPlot('PiePlot5', pieData5, layout5);

}

fetchCSVandPlot('DataPadi.csv');

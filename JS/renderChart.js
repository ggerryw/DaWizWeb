function renderChart(chartType) {
  const container = document.getElementById('container');
  container.innerHTML = ''; // Clear previous content
  container.style.width = '80%'; // Set container width

  // Add a chart div
  const chartDiv = document.createElement('div');
  chartDiv.id = 'chart';
  chartDiv.style.width = '100%';
  chartDiv.style.height = '600px';
  container.appendChild(chartDiv);

  // Fetch data and render the chart
  
  fetch('./JSON/data.json')
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then((data) => {
      const tpSeries = data.series.find((series) => series.name === 'TP');
      const gpSeries = data.series.find((series) => series.name === 'GP');

      if (!tpSeries || !gpSeries) {
        throw new Error('Missing TP or GP data in the JSON');
      }

      const tpData = tpSeries.data;
      const gpData = gpSeries.data;
      const categories = data.categories;

      if (tpData.length !== categories.length || gpData.length !== categories.length) {
        throw new Error('Data length mismatch with categories');
      }

      // Calculate Points Per Game (PPG)
      const tpGpRatio = tpData.map((value, index) =>
        gpData[index] ? value / gpData[index] : null
      );

      // Calculate minimum and maximum for left y-axis (TP and GP combined)
      const combinedMin = Math.min(...tpData, ...gpData);
      const combinedMax = Math.max(...tpData, ...gpData);
      const yAxisMin = Math.floor(combinedMin / 50) * 50; // Round down to nearest 50
      const yAxisMax = Math.ceil(combinedMax / 50) * 50;  // Round up to nearest 50

      // TP Bar Chart
      const tpTrace = {
        x: categories,
        y: tpData,
        name: 'TP',
        type: 'bar',
        marker: {
          color: '#1f77b4',
        },
      };

      // GP Bar Chart
      const gpTrace = {
        x: categories,
        y: gpData,
        name: 'GP',
        type: 'bar',
        marker: {
          color: '#ff7f0e',
        },
      };

      // PPG Scatter Plot
      const ppgTrace = {
        x: categories,
        y: tpGpRatio,
        name: 'PPG',
        type: 'scatter',
        mode: 'markers',
        marker: {
          symbol: 'x',
          size: 12,
          color: '#000000',
          line: {
            width: 2,
            color: '#ffffff',
          },
        },
        yaxis: 'y2', // Use secondary y-axis
        hovertemplate: '<b>%{x}</b><br>PPG: %{y:.2f}<extra></extra>',
      };

      // Layout Configuration
      const layout = {
        title: 'TP, GP, and PPG',
        xaxis: {
          title: 'Players',
          tickangle: -45,
        },
        yaxis: {
          title: 'TP / GP',
          titlefont: { color: '#1f77b4' },
          tickfont: { color: '#1f77b4' },
          range: [yAxisMin, yAxisMax], // Explicitly set min and max for the axis
        },
        yaxis2: {
          title: 'PPG',
          titlefont: { color: '#000000' },
          tickfont: { color: '#FF5733' },
          overlaying: 'y',
          side: 'right',
        },
        barmode: 'group', // Group bars for TP and GP
        legend: {
          x: 0.5,
          y: -0.2,
          xanchor: 'center',
          orientation: 'h',
        },
        height: 600,
        width: 800,
      };

      // Combine traces and plot
      const chartData = [tpTrace, gpTrace, ppgTrace];
      Plotly.newPlot('chart', chartData, layout);
    })
    .catch((error) => console.error('Error loading data:', error));
}

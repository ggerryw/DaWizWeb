function renderChart(type) {
  // Fetch the data
  fetch('./JSON/data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      const container = document.getElementById('container');
      container.innerHTML = ''; // Clear previous content

      const chartDiv = document.createElement('div');
      chartDiv.id = 'chart';
      chartDiv.style.width = '80%';
      chartDiv.style.height = '80%';
      container.appendChild(chartDiv);

      // Retrieve TP and GP data
      const tpData = data.data.TP; // Access the 'TP' array
      const gpData = data.data.GP; // Access the 'GP' array

      // Calculate minimum and maximum for y-axis
      const combinedMin = Math.min(...tpData, ...gpData);
      const combinedMax = Math.max(...tpData, ...gpData);
      // Round down to the nearest decade for the minimum
      const yAxisMin = Math.floor(combinedMin / 10) * 10;
      const yAxisMax = Math.ceil(combinedMax / 10) * 10;
      const categories = data.categories;

      // Calculate Points Per Game (PPG)
      const tpGpRatio = tpData.map((value, index) =>
        gpData[index] ? value / gpData[index] : null
      );

      // Define traces for the chart
      const tpTrace = {
        x: categories,
        y: tpData,
        name: 'TP',
        type: 'bar',
        marker: { color: '#1f77b4' },
      };

      const gpTrace = {
        x: categories,
        y: gpData,
        name: 'GP',
        type: 'bar',
        marker: { color: '#ff7f0e' },
      };

      const ppgTrace = {
        x: categories,
        y: tpGpRatio,
        name: 'PPG',
        type: 'scatter',
        mode: 'markers',
        marker: { symbol: 'x', size: 12, color: '#000000' },
        yaxis: 'y2',
      };

      // Layout configuration
      const layout = {
        title: 'TP, GP, and PPG',
        xaxis: { title: 'Players', tickangle: -45 },
        yaxis: {
          title: 'Total Points and Games Played',
          range: [yAxisMin, yAxisMax],
        },
        yaxis2: {
          title: 'Points Per Game',
          overlaying: 'y',
          side: 'right',
        },
        barmode: 'group',
        responsive: true,
      };

      // Plot configuration
      const config = { responsive: true };

      // Render the chart using Plotly
      Plotly.newPlot('chart', [tpTrace, gpTrace, ppgTrace], layout, config);
    })
    .catch((error) => console.error('Error loading or processing data:', error));
}

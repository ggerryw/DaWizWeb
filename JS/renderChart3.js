function renderChart3(chartType) {
    const container = document.getElementById('container');
    container.innerHTML = 'plotly link added'; // Clear previous content

    // Add a chart div
    const chartDiv = document.createElement('div');
    chartDiv.id = 'chart';
    chartDiv.style.width = '100%';
    chartDiv.style.height = '600px';
    container.appendChild(chartDiv);

    // Load data based on chartType
    const chartData = getChartData(chartType);
    if (!chartData) {
        console.error("Chart data not found for type:", chartType);
        return;
    }

    const { categories, series } = chartData;

    // Example: TP, GP, PPG for "tpgpppg"
    const layout = {
        title: `${chartType.toUpperCase()} Chart`,
        xaxis: { title: "Players", tickangle: -45 },
        yaxis: { title: "Values" },
        barmode: "group",
    };

    // Plot data
    Plotly.newPlot('chart', series, layout);
}

// Function to fetch chart data from JSON file
async function getChartData(chartType) {
    try {
      const response = await fetch('tpgpppgData.json'); // Adjust the path if needed
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data[chartType]; // Return the specific chart data by type
    } catch (error) {
      console.error('Error fetching chart data:', error);
      return null; // Handle errors gracefully
    }
  }

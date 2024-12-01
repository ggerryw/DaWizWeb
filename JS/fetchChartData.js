function fetchData(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
      });
  }
  
  function renderChartWithData() {
    fetchData('./JSON/data.json')
      .then((data) => {
        renderChart(data); // Pass the fetched data to the chart rendering function
      })
      .catch((error) => {
        console.error("Error rendering chart:", error);
      });
  }
  
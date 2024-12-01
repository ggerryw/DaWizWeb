    function setupMenuEventListeners() {
        document.querySelectorAll("#menu-container a").forEach(item => {
            item.addEventListener("click", event => {
                event.preventDefault();
                const pageId = event.target.id;

                if (pageId === "bible") {
                        // If the item is for downloading a file
                        downloadFile('/Assets/DaWizBible.xlsx'); // Update the path to your file
                
                    } else if (pages[pageId]?.startsWith("chart:")) {
                        // Render the chart dynamically
                        const chartType = pages[pageId].split(":")[1]; // e.g., "tpgpppg"
                        renderChartWithData(chartType);
                
                    } else if (pages[pageId]) {

                        const targetURL = pages[pageId];

                        if (isExternalLink(targetURL)) {
                            // If it's an external link, navigate to it
                            window.open(targetURL, "_blank"); // Open in a new tab (optional)
                        } else {
                            // If it's an internal link, fetch and display the content
                            fetch(targetURL)
                                .then(response => response.text())
                                .then(data => {
                                    document.getElementById("container").innerHTML = data;
                                })
                                .catch(error => console.error("Error loading internal content:", error));
                        }

                    }   
            });
        });
    }
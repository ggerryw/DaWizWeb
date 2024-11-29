
        function downloadFile(url) {
            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error("Network response was not ok.");
                    return response.blob();
                })
                .then(blob => {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = url.split('/').pop(); // Extract filename from URL
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch(error => console.error("Error downloading file:", error));
        }
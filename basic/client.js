download=()=>{
const url = 'http://localhost:3000/api/files/download/1.msi'; // Adjust to your route
const xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.responseType = 'blob';

xhr.onprogress = function (event) {
    if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        console.log(`Download progress: ${percent.toFixed(2)}%`);
        // Update your progress bar here
    }
};

xhr.onload = function () {
    if (xhr.status === 200) {
        // Download complete, handle the file (e.g., save or display)
        const url = window.URL.createObjectURL(xhr.response);
        const a = document.createElement('a');
        a.href = url;
        a.download = '1.msi'; // Set the file name
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    }
};

xhr.send();
}

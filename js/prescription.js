
window.addEventListener("load", function () {
    const fileSelector = document.getElementById('input-file');
    fileSelector.onchange = () => {
        location.href = './pages/live-tracking.html';
    }
});
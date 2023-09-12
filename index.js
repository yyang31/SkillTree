function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.onload = () => {
    // 0 = static
    // 1 = gamified
    if (randomIntFromInterval(0, 1) == 0) {
        location.replace("/static.html");
    } else {
        location.replace("/gamified.html");
    }
};

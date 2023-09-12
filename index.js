window.onload = () => {
    // true = static
    // false = gamified
    if (Math.random() < 0.5) {
        location.replace("/static.html");
    } else {
        location.replace("/gamified.html");
    }
};

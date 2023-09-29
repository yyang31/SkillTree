function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

window.onload = () => {
    // 0 = traditional
    // 1 = static
    // 2 = gamified

    let randomNumber = getRandomInt(3);

    if (randomNumber == 0) {
        location.replace("/traditional.html");
    } else if (randomNumber == 1) {
        location.replace("/static.html");
    } else if (randomNumber == 2) {
        location.replace("/gamified.html");
    }
};

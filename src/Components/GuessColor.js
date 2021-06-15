function GuessColor() {
var targetColor = document.querySelector(".targetColor");
var colorChoices = document.querySelectorAll(".chooseColor");
var percentages = document.querySelectorAll(".enterPercentage").entries;
var effectColor = document.querySelector(".effectColor");

function randomColor() {
    var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
    return cusColor(red, green, blue);
}

function cusColor(red, green, blue) {
    var rgb = "rgb(" + red + ", " + green + ", " + blue + ")";
    return {rgb, red, green, blue};
}

function generateTargetColor() {
    return randomColor();
}

function easyChoices() {
    var arr = [];
    arr[0] = cusColor(255, 0, 0);
    arr[1] = cusColor(0, 255, 0);
    arr[2] = cusColor(0, 0, 255);
    return arr;
}

function diffChoices() {
    var arr = [];
    arr[0] = randomColor();
    arr[1] = randomColor();
    arr[2] = randomColor();
    return arr;
}

function generateEffectColor() {
    var red = percentages[0] * colorChoices[0][1] + 
                percentages[1] * colorChoices[1][1] + 
                percentages[2] * colorChoices[2][1];
    var green = percentages[0] * colorChoices[0][2] + 
                percentages[1] * colorChoices[1][2] + 
                percentages[2] * colorChoices[2][2];
    var blue = percentages[0] * colorChoices[0][3] + 
                percentages[1] * colorChoices[1][3] + 
                percentages[2] * colorChoices[2][3];
    return cusColor(red, green, blue);
}
}
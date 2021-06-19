function GuessColor() {
//var targetColor = document.querySelector(".targetColor");
var colorChoices = document.querySelectorAll(".chooseColor");
//var effectColor = document.querySelector(".effectColor");

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

function difficultChoices() {
    var arr = [];
    arr[0] = randomColor();
    arr[1] = randomColor();
    arr[2] = randomColor();
    return arr;
}

function generateEffectColor() {
    percentage0 = document.querySelector("#percentage0").value;
    percentage1 = document.querySelector("#percentage1").value;
    percentage2 = document.querySelector("#percentage2").value;

    var red = percentages0 * colorChoices[0][1] + 
                percentages1 * colorChoices[1][1] + 
                percentages2 * colorChoices[2][1];
    var green = percentages0 * colorChoices[0][2] + 
                percentages1 * colorChoices[1][2] + 
                percentages2 * colorChoices[2][2];
    var blue = percentages0 * colorChoices[0][3] + 
                percentages1 * colorChoices[1][3] + 
                percentages2 * colorChoices[2][3];
    return cusColor(red, green, blue);
}
}
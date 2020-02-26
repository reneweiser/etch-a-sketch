const sketchPad = document.querySelector('#sketch-pad');
const randomColorCheckbox = document.querySelector('#random-colors');

const _padSize = 960;

function makePixel(pixelSize) {
    let pixel = document.createElement('div');
    pixel.style.width = `${pixelSize}px`;
    pixel.style.height = `${pixelSize}px`;
    pixel.style.backgroundColor = 'rgb(255,255,255)';
    pixel.className = 'pixel';
    pixel.addEventListener('mouseenter', applyColor);
    return pixel;
}

function applyColor(e) {
    let currentColor = extractColorValues(e.target.style.backgroundColor);
    if (randomColorCheckbox.checked) {
        e.target.style.backgroundColor = makeColorString(addRandomColor(currentColor));
    } else {
        e.target.style.backgroundColor = makeColorString(addColor(currentColor, [20, 20, 20]));
    }
}

function extractColorValues(colorString) {
    // expects rgb(255,255,255)
    return colorString.substring(4, colorString.length - 1)
        .split(',')
        .map(value => parseInt(value, 10));
}

function makeColorString(colorValues) {
    return `rgb(${colorValues.join(',')})`;
}

function addColor(currentColor, colorToAdd) {
    if(currentColor[0] > 0) currentColor[0] -= colorToAdd[0];
    if(currentColor[1] > 0) currentColor[1] -= colorToAdd[1];
    if(currentColor[2] > 0) currentColor[2] -= colorToAdd[2];
    return currentColor;
}

function addRandomColor(currentColor) {
    currentColor[0] = Math.random() * 255;
    currentColor[1] = Math.random() * 255;
    currentColor[2] = Math.random() * 255;
    return currentColor;
}

function buildGrid(size) {
    clearGrid();
    for (let i = 0; i < size * size; i++) {
        sketchPad.appendChild(makePixel(_padSize / size));
    }
}

function clearGrid() {
    let pixel = sketchPad.lastElementChild;
    while (pixel) {
        sketchPad.removeChild(pixel);
        pixel = sketchPad.lastElementChild;
    }
}

const gridSizeInput = document.querySelector('#grid-size-input');
const buildButton = document.querySelector('#build-grid');

buildButton.addEventListener('click', () => buildGrid(gridSizeInput.value));

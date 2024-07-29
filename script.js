const grid = document.querySelector(".grid");
const selectBlack = document.querySelector(".black");
const size = document.querySelector(".size");
const rainbow = document.querySelector(".rainbow");
let currentMode = '';

function sketch(number) {
    grid.innerHTML = '';
    for (let i = 0; i < number; i++) {
        const innerDiv = document.createElement("div");
        innerDiv.style.cssText = "display: flex; background-color: white; flex: 1;";
        grid.appendChild(innerDiv);

        for (let j = 0; j < number; j++) {
            const box = document.createElement("div");
            box.classList.add("color");
            box.style.cssText = "background-color: white;  flex: 1;";
            innerDiv.appendChild(box);
        }
    }
    resetBoxes();
}

function resetBoxes() {
    const boxes = document.querySelectorAll('.color');
    boxes.forEach(box => {
        // Remove all previous event listeners
        box.replaceWith(box.cloneNode(true));
    });
}

function colorBlack() {
    resetBoxes();
    document.querySelectorAll('.color').forEach(box => {
        box.style.backgroundColor = "white";
        box.addEventListener('mouseenter', blackHover);
    });
    currentMode = 'black';
}

function blackHover(event) {
    const box = event.target;
    let currentColor = getComputedStyle(box).backgroundColor;
    let rgbValues = currentColor.match(/\d+/g);
    let [r, g, b] = rgbValues.map(Number);

    if (r === 0 && g === 0 && b === 0) return;

    r = r > 0 ? Math.max(0, r - 26) : Math.floor(Math.random() * 256);
    g = g > 0 ? Math.max(0, g - 26) : Math.floor(Math.random() * 256);
    b = b > 0 ? Math.max(0, b - 26) : Math.floor(Math.random() * 256);

    box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    box.style.border = "none";
}

function colorRainbow() {
    resetBoxes();
    document.querySelectorAll('.color').forEach(box => {
        box.style.backgroundColor = "white";
        box.addEventListener('mouseenter', rainbowHover);
    });
    currentMode = 'rainbow';
}

function rainbowHover(event) {
    const box = event.target;
    let currentColor = getComputedStyle(box).backgroundColor;
    let rgbValues = currentColor.match(/\d+/g);


    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    // Set the new background color
    box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    box.style.border = "none";
}

selectBlack.addEventListener('click', () => {
    colorBlack();
    selectBlack.style.textDecoration = "underline";
    rainbow.style.textDecoration = "none";
});

rainbow.addEventListener('click', () => {
    colorRainbow();
    rainbow.style.textDecoration = "underline";
    selectBlack.style.textDecoration = "none";
});

size.addEventListener("click", () => {
    const number = prompt("Enter your desired grid size (1 to 50)");

    if (number > 50) {
        alert("Entered value is not valid");
    } else {
        sketch(number);
    }
});

// Initial sketch
sketch(16);  // Default grid size





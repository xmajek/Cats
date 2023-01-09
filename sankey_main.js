let animal_data
let cats = []
// JSON
function preload() {
    animal_data = loadJSON('animal-data.json', 'json');
}
function setup() {
    createCanvas(1890, 930);

    clean_data()
}

function draw() {
    noLoop()
    background(255);
    noStroke()
    textSize(16);
    blendMode(MULTIPLY);
    smooth()
    strokeCap(SQUARE);
    create_s()
}



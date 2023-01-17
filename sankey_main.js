let animal_data
let cats = []
let colors = []

function preload() {
    animal_data = loadJSON('animal-data.json', 'json');
}
function setup() {
    createCanvas(1890, 930);
    background(255);
    textSize(16);
    textAlign(CENTER);
    textWrap(WORD);
    // blendMode(MULTIPLY);
    smooth()
    strokeCap(SQUARE);
    ellipseMode(CORNER);
    clean_data()
    count()
    make_connections()
}

function draw() {
    clear()
    noLoop()
    if(colors.length > 0) sankey_mono(colors)
    else create_s()
    // rects = []
}

function mouseClicked(){
    colors = []
    let el = rects.find(el => mouseX >= el.x && mouseX <= el.x + el.width && mouseY >= el.y && mouseY <= el.y + el.height)
    if(el){
        colors.push(color(201, 199, 200, 255))
        el.colorize(el.element)
        colors.push(el.color)
        colors.push(el.element)
    }
    rects = []
    clear()
    redraw()

    return false;
}

function mouseMoved() {
    let el = rects.find(el => mouseX >= el.x && mouseX <= el.x + el.width && mouseY >= el.y && mouseY <= el.y + el.height)
    if(el) {
        el.hovered = true
        noStroke()
        let col = el.color
        fill(col)
        rect(el.x + el.width + 10, el.y + el.height/2 - 45, 90, 90);
        fill(1)
        if(el.element === "Domestic Short Hair" || el.element === "Black") fill(255)
        text(el.element, el.x + el.width + 10, el.y + el.height/2 - 35, 90, 90)
    }
    else{
        rects = []
        clear()
        redraw()
    }
    // prevent default
    return false;
}



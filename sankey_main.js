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

    noStroke()
    fill(1)
    textSize(24)
    textStyle(BOLD)
    text("FEATURES OF CATS THAT HAS BEEN THROUGH THE SHELTER", 40, 20, 1250, 30)
    textSize(12)
    text("GENDER", 75, 80)
    text("AGE", 370, 80)
    text("COLOR", 652, 80)
    text("BREED", 945, 80)
    text("STATUS", 1233, 80)
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

    rects = []
        clear()
        redraw()

    if(el) {
        noStroke()
        let col = el.color
        col.setAlpha(255)
        fill(col)
        rect(el.x + el.width + 10, el.y + el.height/2 - 45, 90, 90);
        fill(255)
        textStyle(BOLD);
        textSize(12)
        text(el.element, el.x + el.width + 10, el.y + el.height/2 - 35, 90, 90)
        textStyle(NORMAL);
        textSize(24)
        text(el.count, el.x + el.width + 10, el.y + el.height/2 + 5, 90, 90)
        
        // if(colors.length > 0){
        //     fill(colors[1])
        //     rect(el.x + el.width + 10, el.bottom - 40, 90, 40)
        //     fill(255)
        //     text(el.percent, el.x + el.width + 10, el.bottom - 15, 90, 40)
        // }
    }
    // else{
    //     rects = []
    //     clear()
    //     redraw()
    // }
    // prevent default
    return false;
}



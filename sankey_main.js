let animal_data
let cats = []
let colors = []
// JSON
function preload() {
    animal_data = loadJSON('animal-data.json', 'json');
}
function setup() {
    createCanvas(1890, 930);
    background(255);
    textSize(16);
    blendMode(MULTIPLY);
    smooth()
    strokeCap(SQUARE);
    clean_data()
    count()
    make_connections()
}

function draw() {
    noLoop()
    create_s(colors)
    colors = []
}

// function mouseClicked(){
//     let el = rects.find(el => mouseX >= el.x && mouseX <= el.x + el.width && mouseY >= el.y && mouseY <= el.y + el.height)
//     if(el){
//         colors.push(color(201, 199, 200, 255))
//         colors.push(el.color)
//         colors.push(el.element)
//         rects = []
//         clear()
//         redraw()
//     }
// }



class SankeyRect{
    constructor(category, element, height, width, count) {
        this.category = category
        this.element = element
        this.height = height
        this.width = width
        this.count = count
        this.color = color(random(50, 200), random(50, 200), random(50, 200))
        this.connected = 0
    }
    draw(x, y){
        noStroke()
        fill(this.color);
        rect(x, y, this.width, this.height)
        this.x = x
        this.y = y
    }

    count_connections(){
        // for
    }
}
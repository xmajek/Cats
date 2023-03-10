class SankeyRect{
    constructor(category, element, height, width, count) {
        this.category = category
        this.element = element
        this.height = height
        this.width = width
        this.count = count
        this.colorize(element)
        this.connected = 0
        this.hovered = false
    }
    draw(x, y){
        fill(this.color);
        rect(x, y, this.width, this.height)
        this.x = x
        this.y = y
        this.connected = y
    }


    colorize(element){
        switch (element){
            case "Female":
                this.color = color("#b7144e")
                break
            case "Male":
                this.color = color("#0091ad")
                break
            case "Unknown":
                this.color = color("#5c4e7d")
                break
            case "Kitten":
                this.color = color("#e89005")
                break
            case "Junior":
                this.color = color("#ec7505")
                break
            case "Adult":
                this.color = color("#d84a05")
                break
            case "Mature":
                this.color = color("#f42b03")
                break
            case "Senior":
                this.color = color("#e70e02")
                break
            case "Super Senior":
                this.color = color("#9b0a00")
                break
            case "Black":
                this.color = color("#1e1e1e")
                break
            case "Grey":
                this.color = color("#838383")
                break
            case "Cream":
                this.color = color("#d7ae6b")
                break
            case "Brown":
                this.color = color("#603819")
                break
            case "Multicolor":
                this.color = color("#5f111e")
                break
            case "Orange":
                this.color = color("#e57c42")
                break
            case "White":
                this.color = color("#c5c3c3")
                break
            case "Other":
                this.color = color("#90e0ef")
                break
            case "Domestic Long Hair":
                this.color = color("#00b4d8")
                break
            case "Domestic Medium Hair":
                this.color = color("#0077b6")
                break
            case "Domestic Short Hair":
                this.color = color("#1a4dab")
                break
            case "Adoption":
                this.color = color("#90a955")
                break
            case "In shelter":
                this.color = color("#172a19")
                break

        }
    }
}
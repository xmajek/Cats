class SankeyRect{
    constructor(category, element, height, width, count) {
        this.category = category
        this.element = element
        this.height = height
        this.width = width
        this.count = count
        this.colorize(element)
        this.connected = 0
    }
    draw(x, y){
        noStroke()
        fill(this.color);
        rect(x, y, this.width, this.height)
        this.x = x
        this.y = y
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
                this.color = color("#2d2d2d")
                break
            case "Grey":
                this.color = color("#8b8b8c")
                break
            case "Cream":
                this.color = color("#fdd490")
                break
            case "Brown":
                this.color = color("#603819")
                break
            case "Multicolor":
                this.color = color("#5f111e")
                break
            case "Orange":
                this.color = color("#ec681c")
                break
            case "White":
                this.color = color("#edeceb")
                break
            case "Maine Coon":
            case "Manx":
            case "Other":
            case "Siamese":
                this.color = color("#90e0ef")
                break
            case "Domestic Long Hair":
                this.color = color("#00b4d8")
                break
            case "Domestic Medium Hair":
                this.color = color("#0077b6")
                break
            case "Domestic Short Hair":
                this.color = color("#03045e")
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
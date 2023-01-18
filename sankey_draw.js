function create_s(){
    let start_x = 40
    let start_y = 40
    let width = 70
    let margin_x = 220
    let margin_y = 0
    let full_h = 700
    let x = start_x
    let y = start_y

    let prev = 0
    let height, y_max, category
    for(let c in counted){
        y = start_y
        category = counted[c]
        y_max = Object.values(category).reduce((a, b) => a + b, 0);
        let new_full_h = full_h - (Object.values(category).length - 1) * margin_y

        for(let k in category){
            height = category[k] / y_max * new_full_h

            let r = new SankeyRect(c, k, height, width, category[k])
            rects.push(r)

            noStroke()
            r.draw(x, y)
            r.connected = y

            let x1, x2, y1, y2
            y2 = y
            if(c !== "sex"){
                for(let p in prev){
                    const con = connections.find(el => (el[0] === p && el[1] === k) || (el[0] === k && el[1] === p))
                    if(con){
                        x1 = x - margin_x
                        let prev_r = rects.find(el => el.element === p)
                        let con_h = con[2] / r.count * r.height
                        y1 = prev_r.connected + con_h/2
                        x2 = x
                        y2 += con_h/2

                        prev_r.connected = y1 + con_h/2
                        noFill();
                        let _color = color(r.color)

                        _color.setAlpha(150)
                        stroke(_color)
                        strokeWeight(con_h)
                        bezier(x1, y1, x1 + 60, y1, x2 - 60, y2, x2, y2)
                        y2 += con_h/2
                        // line(x1, y1, x2, y2)
                    }
                }
            }

            y += height + margin_y

        }
        x += width + margin_x
        new_full_h = full_h
        prev = category
    }
}

function sankey_mono(colors){
    let start_x = 40
    let start_y = 40
    let width = 70
    let margin_x = 220
    let margin_y = 0
    let full_h = 700
    let x = start_x
    let y = start_y
    let clicked_category = find_category(colors[2])

    let prev = 0
    let height, y_max, category, is_conn
    for(let c in counted){
        y = start_y
        category = counted[c]
        y_max = Object.values(category).reduce((a, b) => a + b, 0);
        let new_full_h = full_h

        for(let k in category){
            let poss_con = connections.find(el => (el[0] === k && el[1] === colors[2]) || (el[1] === k && el[0] === colors[2]))

            height = category[k] / y_max * new_full_h

            let r = new SankeyRect(c, k, height, width, category[k])

            rects.push(r)

            // stroke(100)
            // strokeWeight(0.5)

            noStroke()
            let color_storage = r.color
            if(r.element !== colors[2])
                r.color.setAlpha(180)
            r.draw(x, y)
            r.connected = y
            r.bottom = y + height

            let conn_height
            if(poss_con) {
                conn_height = poss_con[2] / category[k] * height
                color_storage = colors[1]
                color_storage.setAlpha(255)
                fill(color_storage)
                let _x = x
                let _y = r.bottom - 4
                while(_y >= y + (height - conn_height) - 5){
                    circle(_x, _y, 4)
                    _x += 6
                    if(_x > x + width - 2){
                        _x = x
                        _y -= 6
                    }
                }

                textSize(20)
                textStyle(BOLD)
                fill(3)
                // let percent =
                let percent = Number.parseFloat(poss_con[2]/category[k] * 100).toFixed(1)
                text(percent + "%", x, _y - 10, width, 40)
            }
            else if (r.category !== find_category(colors[2])) {
                fill(1)
                text("0%", x, r.bottom - 14, width, 40)
            }

            noStroke()

            let x1, x2, y1, y2
            y2 = y
            if(c !== "sex"){
                for(let p in prev){
                    const con = connections.find(el => (el[0] === p && el[1] === k) || (el[0] === k && el[1] === p))
                    if(con){
                        x1 = x - margin_x
                        let prev_r = rects.find(el => el.element === p)
                        let con_h = con[2] / r.count * r.height
                        y1 = prev_r.connected + con_h/2
                        x2 = x
                        y2 += con_h/2

                        prev_r.connected = y1 + con_h/2
                        noFill();
                        let _color = color_storage
                        if(colors[2] === r.element) _color.setAlpha(150)
                        else _color.setAlpha(40)

                        stroke(_color)
                        strokeWeight(con_h)
                        bezier(x1, y1, x1 + 60, y1, x2 - 60, y2, x2, y2)

                        //klikniete
                        if(poss_con) {
                            if (prev_r.category !== clicked_category || prev_r.element === colors[2]) {
                                let weight = poss_con[2] / r.count * con_h
                                let _y1 = y1 + con_h / 2 - weight / 2
                                let _y2 = y2 + con_h / 2 - weight / 2
                                _color = colors[1]
                                _color.setAlpha(150)
                                stroke(_color)
                                strokeWeight(weight)
                                bezier(x1, _y1, x1 + 60, _y1, x2 - 60, _y2, x2, _y2)
                            }
                        }
                        y2 += con_h/2
                    }

                }
            }

            y += height + margin_y

        }
        x += width + margin_x
        new_full_h = full_h
        prev = category
    }
}

function find_category(el){
    switch (el){
        case "Female":
        case "Male":
        case "Unknown":
            return "sex"
        case "Kitten":
        case "Junior":
        case "Adult":
        case "Mature":
        case "Senior":
        // case "Super Senior":
            return "age"
        case "Black":
        case "Grey":
        case "Cream":
        case "Brown":
        case "Multicolor":
        case "Orange":
        case "White":
            return "colors"
        case "Other":
        case "Domestic Long Hair":
        case "Domestic Short Hair":
        case "Domestic Medium Hair":
            return "breeds"
        case "Adoption":
        case "In shelter":
            return "movement"




    }
}
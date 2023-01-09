function create_s(colors){
    let start_x = 10
    let start_y = 10
    let width = 80
    let margin_x = 250
    let margin_y = 0
    let full_h = 800
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
            if(colors.length > 0){
                if(r.element !== colors[2]){
                    // console.log("r: " + r.color + " 1: " + colors[1])
                    r.color = colors[0]
                }
            }
            rects.push(r)

            r.draw(x, y)
            r.connected = y
            fill(31);
            text(k, x + 5, y + height/2 + 5)

            let x1, x2, y1, y2
            y2 = y
            if(c !== "sex"){
                let is_conn = false
                if(colors.length > 0){
                    const con = connections.find(el => (el[0] === k && el[1] === colors[2]) || (el[1] === k && el[0] === colors[2]))
                    if(con){
                        is_conn = true
                    }
                }
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
                        let _color = color(prev_r.color)
                        if(is_conn) _color = colors[1]

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
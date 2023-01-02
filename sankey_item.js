let counted = {
    "breeds": {},
    "colors": {},
    "age": {},
    "sex": {},
    "movement": {}
}
let connections = []
function create_s(){
    let start_x = 10
    let start_y = 10
    let width = 100
    let margin_x = 180
    let margin_y = 10
    let full_h = 800
    let x = start_x
    let y = start_y

    noStroke()

    textSize(16);

    count()
    let height, y_max, category
    for(let i in counted){
        y = start_y
        category = counted[i]
        y_max = Object.values(category).reduce((a, b) => a + b, 0);
        let new_full_h = full_h - (Object.values(category).length - 1) * margin_y

        for(let k in category){
            height = category[k] / y_max * new_full_h
            fill(151);
            rect(x, y, width, height)
            fill(31);
            text(k, x + 5, y + 10)

            y += height + margin_y

        }
        x += width + margin_x
        new_full_h = full_h
    }
    make_connections()
}

function count(){
    // rasy
    const breed_names = [...new Set(cats.map(item => item.breedname))];
    for(let n in breed_names){
        counted.breeds[breed_names[n]] = cats.reduce((acc, cur) => cur.breedname === breed_names[n] ? ++acc : acc, 0);
    }

    // kolory
    const colors = [...new Set(cats.map(item => item.basecolour))];
    for(let n in colors){
        counted.colors[colors[n]] = cats.reduce((acc, cur) => cur.basecolour === colors[n] ? ++acc : acc, 0);
    }

    //wiek
    const age = [...new Set(cats.map(item => item.animalage))];
    for(let n in age){
        counted.age[age[n]] = cats.reduce((acc, cur) => cur.animalage === age[n] ? ++acc : acc, 0);
    }
    //plec
    const sex = [...new Set(cats.map(item => item.sexname))];
    for(let n in sex){
        counted.sex[sex[n]] = cats.reduce((acc, cur) => cur.sexname === sex[n] ? ++acc : acc, 0);
    }

    //status
    const movement = [...new Set(cats.map(item => item.movementtype))];
    for(let n in movement){
        counted.movement[movement[n]] = cats.reduce((acc, cur) => cur.movementtype === movement[n] ? ++acc : acc, 0);
    }
    connections = [breed_names, colors, age, sex, movement]
    // console.log(counted)
}

function make_connections(){
    let cat_pairs = []

    for(let x in connections){
        for(let y in connections){
            if(x > y){
                for(let a in connections[x]){
                    for(let b in connections[y]){
                        cat_pairs.push([connections[x][a], connections[y][b], 0])
                    }
                }
            }
        }
    }

    for(let c in cats){
        for(let p in cat_pairs) {
            let cat = Object.values(cats[c])
            let pair = Object.values(cat_pairs[p])

            if(cat.includes(pair[0]) && cat.includes(pair[1])){
                cat_pairs[p][2]++
            }
        }
    }

    for(let p = cat_pairs.length - 1; p >= 0; p--){
        if(cat_pairs[p][2] === 0){
            cat_pairs.splice(p, 1)
        }
    }

    // console.log(cat_pairs)
}
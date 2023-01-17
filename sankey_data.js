let counted = {
    "sex": {},
    "age": {},
    "colors": {},
    "breeds": {},
    "movement": {}
}
let connections = []

function clean_data(){
    let animal
    for(let x in animal_data) {
        animal = animal_data[x]
        if (animal.speciesname === "Cat") {
            delete animal.intakedate
            delete animal.intakereason
            delete animal.istransfer
            delete animal.sheltercode
            delete animal.identichipnumber
            delete animal.animalname
            delete animal.location
            delete animal.movementdate
            delete animal.istrial
            delete animal.returndate
            delete animal.returnedreason
            delete animal.deceaseddate
            delete animal.deceasedreason
            delete animal.diedoffshelter
            delete animal.puttosleep
            delete animal.isdoa
            delete animal.speciesname
            cats.push(animal)
        }
    }
    cats = cats.filter((value, index, self) =>
            index === self.findIndex((t) =>
                t.id === value.id
            )
    )
    let age, color, breed, movement
    let blacks = ["black", "brindle and black", "black and brown", "black and grey", "black and tan", "black and white", "black tortie", "black, brown and white", "tortie", "tortie point", "tortie and white"]
    let browns = ["brown", "brown and black", "brown and white", "brown, black and white", "chocolate", "chocolate point" ,"tabbico", "torbie", "cinnamon"]
    let oranges = ["buff", "buff and white", "orange", "orange and white", "tabby", "tabby and white", "tan and black", "tan and brown", "tan and white"]
    let others = ["calico", "dilute calico", "tricolour", "various", "blue", "blue point"]
    let creams = ["cream", "fawn", "flame point", "golden", "seal", "seal point"]
    let greys = ["grey", "grey and black", "grey and white", "grey black and white", "lilac", "lilac point", "lynx point", "dilute tortoiseshell", "silver", "silver and black", "siver and black", "smoke"]
    let whites = ["white", "white and black", "white and brown", "white and grey", "white and orange", "white and tabby", "white and tan"]

    let other_breeds = ["american curl", "balinese", "bombay", "british shorthair", "bengal", "calico", "exotic shorthair", "himalayan", "munchkin", "norwegian forest cat", "oriental shorthair", "persian", "ragdoll", "siberian", "snowshoe", "turkish angora"]

    let in_shelter = ["Escaped", "Foster","Reclaimed", "Released To Wild", "Stolen", "Transfer"]

    for(c in cats){
        animal = cats[c]
        delete animal.id

        // wiek
        age = animal.animalage
        if(age.includes("day") || age.includes("week")){
            animal.animalage = "Kitten"
        }
        else if(age.includes("11 years") || age.includes("12 years") || age.includes("13 years") || age.includes("14 years")){
            animal.animalage = "Senior"
        }
        else if(age.includes("1 year") || age.includes("2 years") || age[2] === "m" || age[3] === "m"){
            animal.animalage = "Junior"
        }
        else if(age.includes("3 years") || age.includes("4 years") || age.includes("5 years") || age.includes("6 years")){
            animal.animalage = "Adult"
        }
        else if(age.includes("7 years") || age.includes("8 years") || age.includes("9 years") || age.includes("10 years")){
            animal.animalage = "Mature"
        }
        else {
            animal.animalage = "Senior"
        }

        // kolor
        color = animal.basecolour.toLowerCase()
        if(blacks.includes(color)) animal.basecolour = "Black"
        else if(browns.includes(color)) animal.basecolour = "Brown"
        else if(oranges.includes(color)) animal.basecolour = "Orange"
        else if(others.includes(color)) animal.basecolour = "Multicolor"
        else if(creams.includes(color)) animal.basecolour = "Cream"
        else if(greys.includes(color)) animal.basecolour = "Grey"
        else if(whites.includes(color)) animal.basecolour = "White"

        // rasa
        breed = animal.breedname.toLowerCase()
        if(breed.includes("dlh") || breed.includes("domestic long hair")) animal.breedname = "Domestic Long Hair"
        else if(breed.includes("dmh") || breed.includes("domestic medium hair")) animal.breedname = "Domestic Medium Hair"
        else if(breed.includes("dsh") || breed.includes("domestic short hair")) animal.breedname = "Domestic Short Hair"
        // else if(other_breeds.includes(breed)) animal.breedname = "Other"
        // else if(breed.includes("siamese")) animal.breedname = "Siamese"
        else animal.breedname = "Other"

        // status
        movement = animal.movementtype
        if(in_shelter.includes(movement)) animal.movementtype = "In shelter"
    }
}

function count(){
    // rasy
    const breed_names = [...new Set(cats.map(item => item.breedname))];
    for(let n in breed_names){
        counted.breeds[breed_names[n]] = cats.reduce((acc, cur) => cur.breedname === breed_names[n] ? ++acc : acc, 0);
    }
    counted.breeds = Object.fromEntries(
        Object.entries(counted.breeds).sort(([, a], [, b]) => a - b)
    )

    // kolory
    const colors = [...new Set(cats.map(item => item.basecolour))];
    for(let n in colors){
        counted.colors[colors[n]] = cats.reduce((acc, cur) => cur.basecolour === colors[n] ? ++acc : acc, 0);
    }

    //wiek
    const age = [...new Set(cats.map(item => item.animalage))];
    const age_order = []
    age_order.push(age[4])
    age_order.push(age[3])
    age_order.push(age[2])
    age_order.push(age[0])
    age_order.push(age[1])
    // age_order.push(age[5])

    for(let n in age_order){
        counted.age[age_order[n]] = cats.reduce((acc, cur) => cur.animalage === age_order[n] ? ++acc : acc, 0);
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

    connections = cat_pairs
}

let rects = []


export const CubeShuffle = (level) => {
    let amountOfSteps = 8 * level; // should be depended on level
    let movesArray = []
    let choices = new Array(8).fill(0);
    choices.push(1)
    choices.push(1)
    for (let i = 0; i < amountOfSteps; i++) {
        const randomElement = choices[Math.floor(Math.random() * choices.length)];
        let random_arrow, random_direction, choice;
        if (randomElement === 0) {
            random_arrow = Math.floor(Math.random() * 9) + 1;
            random_direction = Math.floor(Math.random() * 2);
            choice = "a" + random_arrow.toString() + random_direction.toString()
        } else {
            let rotateArrows = ["x", "y", "z"]
            random_arrow = Math.floor(Math.random() * 3);
            random_direction = Math.floor(Math.random() * 2);
            choice = rotateArrows[random_arrow] + random_direction.toString()
        }
        movesArray.push(choice)
    }

    var intr = setInterval(function() {
        let move = movesArray.shift()
        var elements = document.querySelectorAll(`#${move}`);
        elements.forEach(function(element) {
            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            element.dispatchEvent(event);
        });
        if (movesArray.length == 0) clearInterval(intr)
    }, 1000)
}


export const cubesImage = [];
for (let i = 0; i < 900; i++) {
    let new_im = {
        id: i,
        solved: false,
        label: i.toString(),
        img: "/final-cubes/" + i.toString() + ".png",
    };
    cubesImage.push(new_im);
}

export function getCubeIdFromImg(img) {
    const src = img.getAttribute("src");
    const cube_Id = src.split("/").pop();
    return cube_Id.split('.')[0];
}

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
            random_arrow = Math.floor(Math.random() * 8);
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
        let move = movesArray.pop()
        var elements = document.querySelectorAll(`#${move}`);
        console.log(elements)
        elements.forEach(function(element) {
            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            element.dispatchEvent(event);
        });
        if (movesArray.length == 0) clearInterval(intr)
    }, 500)
}
const NUMBER_OF_IMAGES = 900

export const CubeShuffle = (level) => {
    const movesArray = getShuffleCubeMoves(level);

    let index = 0;
    const playMove = () => {
        const move = movesArray[index];
        const elements = document.querySelectorAll(`#${move}`);
        elements.forEach((element) => {
            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
            });
            element.dispatchEvent(event);
        });
        index++;

        if (index === movesArray.length) {
            clearInterval(interval);
        }
    };

    const interval = setInterval(playMove, 500);
};

export const getShuffleCubeMoves = (level) => {
    const amountOfSteps = 8 * level;
    const movesArray = [];

    const randomMove = () => {
        const choices = [
            {type: 'arrow', arrows: 9, directions: 2},
            {type: 'rotate', arrows: ['ax', 'ay', 'az'], directions: 2},
        ];

        const randomChoice = choices[Math.floor(Math.random() * choices.length)];

        if (randomChoice.type === 'arrow') {
            const randomArrow = Math.floor(Math.random() * randomChoice.arrows) + 1;
            const randomDirection = Math.floor(Math.random() * randomChoice.directions);
            return `a${randomArrow}${randomDirection}`;
        } else {
            const randomArrow = randomChoice.arrows[Math.floor(Math.random() * randomChoice.arrows.length)];
            const randomDirection = Math.floor(Math.random() * randomChoice.directions);
            return `${randomArrow}${randomDirection}`;
        }
    };

    for (let i = 0; i < amountOfSteps; i++) {
        const choice = randomMove();
        movesArray.push(choice);
    }

    return movesArray;
};


export function getCubesImages(level) {
    const cubesImage = [];
    for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
        let new_im = {
            id: i,
            solved: false,
            label: i.toString(),
            img: `/final-cubes-${level}/` + i.toString() + ".png",
        };
        cubesImage.push(new_im);
    }
    return cubesImage
}

export function getCubeIdFromImg(img) {
    const src = img.getAttribute("src");
    const cube_Id = src.split("/").pop();
    return cube_Id.split('.')[0];
}

export function createImageObject(id, level) {
    return {
        id: id,
        solved: true,
        label: id.toString(),
        img: `/final-cubes-${level}/` + i.toString() + ".png",
    };
}
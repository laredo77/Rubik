let initializeCubeString = "YYYYYYYYYWWWWWWWWWGGGGGGGGGOOOOOOOOORRRRRRRRRBBBBBBBBB";
let currentCubeState = initializeCubeString;

export const changeCubeStringDefinition = (id) => {
    if (id.length === 4) id = id.slice(0, -1)
    switch (id) {
        case "a10":
            arrow10();
            break;
        case "a11":
            arrow11();
            break;
        case "a20":
            arrow20();
            break;
        case "a21":
            arrow21();
            break;
        case "a30":
            arrow30();
            break;
        case "a31":
            arrow31();
            break;
        case "a40":
            arrow40();
            break;
        case "a41":
            arrow41();
            break;
        case "a50":
            arrow50();
            break;
        case "a51":
            arrow51();
            break;
        case "a60":
            arrow60();
            break;
        case "a61":
            arrow61();
            break;
        case "a70":
            arrow70();
            break;
        case "a71":
            arrow71();
            break;
        case "a80":
            arrow80();
            break;
        case "a81":
            arrow81();
            break;
        case "a90":
            arrow90();
            break;
        case "a91":
            arrow91();
            break;
        case "ax0":
            arrowX0();
            break;
        case "ax1":
            arrowX1();
            break;
        case "ay0":
            arrowY0();
            break;
        case "ay1":
            arrowY1();
            break;
        case "az0":
            arrowZ0();
            break;
        case "az1":
            arrowZ1();
            break;
        default:
            console.log(`Arrow function with ID ${id} not found.`);
    }
};

const swapCubeCell = (indexCellA, indexCellB, indexCellC, indexCellD) => {
    let copyCubeArray = currentCubeState.split(''); // Convert string to array

    let tempStringForCellB = copyCubeArray[indexCellB];
    let tempStringForCellC = copyCubeArray[indexCellC];
    let tempStringForCellD = copyCubeArray[indexCellD];

    copyCubeArray[indexCellB] = currentCubeState[indexCellA];
    copyCubeArray[indexCellC] = tempStringForCellB;
    copyCubeArray[indexCellD] = tempStringForCellC;
    copyCubeArray[indexCellA] = tempStringForCellD;

    currentCubeState = copyCubeArray.join(''); // Convert array back to string
};

const arrow10 = () => {
    swapCubeCell(6, 33, 24, 15);
    swapCubeCell(7, 34, 25, 16);
    swapCubeCell(8, 35, 26, 17);

    swapCubeCell(45, 51, 53, 47);
    swapCubeCell(46, 48, 52, 50);
};

const arrow11 = () => {
    swapCubeCell(6, 15, 24, 33);
    swapCubeCell(7, 16, 25, 34);
    swapCubeCell(8, 17, 26, 35);

    swapCubeCell(45, 47, 53, 51);
    swapCubeCell(46, 50, 52, 48);
};

const arrow20 = () => {
    swapCubeCell(3, 30, 21, 12);
    swapCubeCell(4, 31, 22, 13);
    swapCubeCell(5, 32, 23, 14);
};

const arrow21 = () => {
    swapCubeCell(3, 12, 21, 30);
    swapCubeCell(4, 13, 22, 31);
    swapCubeCell(5, 14, 23, 32);
};

const arrow30 = () => {
    swapCubeCell(0, 27, 18, 9);
    swapCubeCell(1, 28, 19, 10);
    swapCubeCell(2, 29, 20, 11);

    swapCubeCell(44, 42, 36, 38);
    swapCubeCell(43, 39, 37, 41);
};

const arrow31 = () => {
    swapCubeCell(0, 9, 18, 27);
    swapCubeCell(1, 10, 19, 28);
    swapCubeCell(2, 11, 20, 29);

    swapCubeCell(42, 44, 38, 36);
    swapCubeCell(43, 41, 37, 39);
};

const arrow40 = () => {
    swapCubeCell(0, 36, 26, 45);
    swapCubeCell(3, 39, 23, 48);
    swapCubeCell(6, 42, 20, 51);

    swapCubeCell(35, 29, 27, 33);
    swapCubeCell(32, 28, 30, 34);
};

const arrow41 = () => {
    swapCubeCell(0, 45, 26, 36);
    swapCubeCell(3, 48, 23, 39);
    swapCubeCell(6, 51, 20, 42);

    swapCubeCell(29, 35, 33, 27);
    swapCubeCell(32, 34, 30, 28);
};

const arrow50 = () => {
    swapCubeCell(1, 37, 25, 46);
    swapCubeCell(4, 40, 22, 49);
    swapCubeCell(7, 43, 19, 52);
};

const arrow51 = () => {
    swapCubeCell(1, 46, 25, 37);
    swapCubeCell(4, 49, 22, 40);
    swapCubeCell(7, 52, 19, 43);
};

const arrow60 = () => {
    swapCubeCell(2, 38, 24, 47);
    swapCubeCell(5, 41, 21, 50);
    swapCubeCell(8, 44, 18, 53);

    swapCubeCell(15, 9, 11, 17);
    swapCubeCell(12, 10, 14, 16);
};

const arrow61 = () => {
    swapCubeCell(2, 47, 24, 38);
    swapCubeCell(5, 50, 21, 41);
    swapCubeCell(8, 53, 18, 44);

    swapCubeCell(9, 15, 17, 11);
    swapCubeCell(12, 16, 14, 10);
};

const arrow70 = () => {
    swapCubeCell(45, 29, 44, 15);
    swapCubeCell(46, 32, 43, 12);
    swapCubeCell(47, 35, 42, 9);

    swapCubeCell(0, 2, 8, 6);
    swapCubeCell(1, 5, 7, 3);
};

const arrow71 = () => {
    swapCubeCell(45, 15, 44, 29);
    swapCubeCell(46, 12, 43, 32);
    swapCubeCell(47, 9, 42, 35);

    swapCubeCell(0, 6, 8, 2);
    swapCubeCell(1, 3, 7, 5);
};

const arrow80 = () => {
    swapCubeCell(48, 28, 41, 16);
    swapCubeCell(49, 31, 40, 13);
    swapCubeCell(50, 34, 39, 10);
};

const arrow81 = () => {
    swapCubeCell(48, 16, 41, 28);
    swapCubeCell(49, 13, 40, 31);
    swapCubeCell(50, 10, 39, 34);
};

const arrow90 = () => {
    swapCubeCell(51, 27, 38, 17);
    swapCubeCell(52, 30, 37, 14);
    swapCubeCell(53, 33, 36, 11);

    swapCubeCell(26, 20, 18, 24);
    swapCubeCell(25, 23, 19, 21);
};

const arrow91 = () => {
    swapCubeCell(51, 17, 38, 27);
    swapCubeCell(52, 14, 37, 30);
    swapCubeCell(53, 11, 36, 33);

    swapCubeCell(26, 24, 18, 20);
    swapCubeCell(25, 21, 19, 23);
};

const arrowX0 = () => {
    arrow41()
    arrow51()
    arrow61()
};

const arrowX1 = () => {
    arrow40()
    arrow50()
    arrow60()
};

const arrowY0 = () => {
    arrow70()
    arrow80()
    arrow90()
};

const arrowY1 = () => {
    arrow71()
    arrow81()
    arrow91()
};

const arrowZ0 = () => {
    arrow10()
    arrow20()
    arrow30()
};

const arrowZ1 = () => {
    arrow11()
    arrow21()
    arrow31()
};

export const isCubeStringCorrect = () => {
    const colors = currentCubeState.match(/([A-Z])\1{8}/g); // Match sequences of the same color

    if (colors && colors.length === 6) {
        const uniqueColors = new Set(colors);

        return uniqueColors.size === 6;
    }
    return false;
};

// SHOULD REMOVED***************************************************
export const tempFunctionPrintCubeDefinition = () => {
    console.log(currentCubeState)
}


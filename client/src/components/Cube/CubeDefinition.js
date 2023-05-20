let initializeCubeString = "YYYYYYYYYWWWWWWWWWGGGGGGGGGOOOOOOOOORRRRRRRRRBBBBBBBBB";
let currentCubeState = initializeCubeString;

export const changeCubeStringDefinition = (id) => {
    console.log(id)
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
};

const arrow11 = () => {
    swapCubeCell(6, 15, 24, 33);
    swapCubeCell(7, 16, 25, 34);
    swapCubeCell(8, 17, 26, 35);
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
};

const arrow31 = () => {
    swapCubeCell(0, 9, 18, 27);
    swapCubeCell(1, 10, 19, 28);
    swapCubeCell(2, 11, 20, 29);
};

const arrow40 = () => {
    swapCubeCell(0, 36, 26, 45);
    swapCubeCell(3, 39, 23, 48);
    swapCubeCell(6, 42, 20, 51);
};

const arrow41 = () => {
    swapCubeCell(0, 45, 26, 36);
    swapCubeCell(3, 48, 23, 39);
    swapCubeCell(6, 51, 20, 42);
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
};

const arrow61 = () => {
    swapCubeCell(2, 47, 24, 38);
    swapCubeCell(5, 50, 21, 41);
    swapCubeCell(8, 53, 18, 44);
};

const arrow70 = () => {
    swapCubeCell(45, 29, 44, 15);
    swapCubeCell(46, 32, 43, 12);
    swapCubeCell(47, 35, 42, 9);
};

const arrow71 = () => {
    swapCubeCell(45, 15, 44, 29);
    swapCubeCell(46, 12, 43, 32);
    swapCubeCell(47, 9, 42, 35);
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
};

const arrow91 = () => {
    swapCubeCell(51, 17, 38, 27);
    swapCubeCell(52, 14, 37, 30);
    swapCubeCell(53, 11, 36, 33);
};

export const isCubeStringCorrect = () => {
    const colors = currentCubeState.match(/([A-Z])\1{8}/g); // Match sequences of the same color

    if (colors && colors.length === 6) {
        const uniqueColors = new Set(colors);

        return uniqueColors.size === 6;
    }
    return false;
};


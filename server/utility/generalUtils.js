const AsyncLock = require('async-lock');
const lock = new AsyncLock();
const fs = require('fs');
const csv = require('csv-parser');


const generateStr = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


const findStringInCSV = async (fileName, str) => {
    return new Promise((resolve, reject) => {
        lock.acquire('myLock', async function() {
            const rows = [];

            // Read the CSV file and store the data in the rows array
            fs.createReadStream(fileName)
                .pipe(csv())
                .on('data', (row) => {
                    rows.push(row);
                })
                .on('end', () => {
                    // Find the row that contains the given string in the first column
                    let rowIndex = -1;
                    for (let i = 0; i < rows.length; i++) {
                        if (rows[i]['MatchDetails'] === str) {
                            rowIndex = i;
                            break;
                        }
                    }
                    resolve(rowIndex);
                });
        });
    });
};

const getRowFromCsvFile = (filePath, r) => {
    return new Promise((resolve, reject) => {
        const rows = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {
                if (rows.length < 4) {
                    reject("File doesn't have enough rows");
                } else {
                    resolve(rows[r]['MatchDetails']);
                }
            });
    });
};

module.exports = {generateStr, findStringInCSV, getRowFromCsvFile};
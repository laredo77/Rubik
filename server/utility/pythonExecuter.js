const {PythonShell} = require('python-shell');      // Required for executing python script async from JS
const path = require('path');                       // Required to construct file paths
const pythonPath = path.join('C:', 'Users', 'yahav', 'AppData', 'Local', 'Programs', 'Python', 'Python39', 'python.exe');    // Definition of python.exe path
const scriptPath = path.join('D:', 'Projects', 'RubikCube', 'server', 'utility');          // Definition of the script.py path

/**
 * Helper function, used to call a specific function from python script and return its result/prints
 * @param {String} functionName name of the function we want to execute
 * @param {Object} params parameters to be passed into the python function */
function callPythonFunction(functionName, params) {

    // Settings object to be passed to the python script
    const options = {
        mode: 'text',
        pythonPath: pythonPath,    // Changes between diff pc, also make sure python is in PATH and on top priority
        pythonOptions: ['-u'],
        scriptPath: scriptPath,         // Changes between diff pc
        args: [functionName, ...params]
    }

    // Invokes the python async script using the options object, throws an error if there is an error
    return new Promise((resolve, reject) => {
        PythonShell.run(functionName, options, function (err, results) {
            if (err) reject(err);
            resolve(results);
        }).then((r) => {
            console.log(r);
        });
    });
}

/**
 * Function used to receive user input and return a parsed array
 */
function parseTerminalParameters() {
    let parameters = [];

    // Iterate over given input and insert into array
    for (let i = 2; i < process.argv.length; i++) {
        parameters.push(process.argv[i]);
    }

    // Define function name and parameters and return it as array
    let functionName = parameters[0];
    let params = parameters.slice(1)
    return [functionName, params]
}

function executePython() {
    let [functionName, params] = parseTerminalParameters();
    callPythonFunction(functionName, params)
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
}


executePython()
// test in terminal: node .\pythonExecuter.js [python_file_name.py] [params], for example node pythonExecuter.js my_function.py param1 param2
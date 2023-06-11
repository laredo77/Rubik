const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path'); // Required to construct file paths

function executePythonFile(pythonFile, arguments) {
    // Get the full path to the Python file
    const fullPath = path.resolve(__dirname, pythonFile);

    // Try to locate the Python executable path dynamically
    let pythonPath;
    if (process.platform === 'win32') {
        // For Windows, use the default installation path
        pythonPath = 'python';
    } else {
        // For other platforms, assume 'python3' is available in the system path
        pythonPath = 'python3';
    }

    // Build the command to execute the Python file with the argument
    // Extract the word after the action
    const extractedArgument1 = arguments[0];
    const extractedArgument2 = arguments[1];

    const command = `"${pythonPath}" "${fullPath}" "${extractedArgument1}" "${extractedArgument2}"`;
    try {
        execSync(command);
        console.log('Python file executed successfully.');

        // const fileContent = fs.readFileSync('messages_to_user.txt', 'utf8');
        // console.log(`Content from file: ${fileContent}`);
    } catch (error) {
        console.error(`Error executing Python file: ${error}`);
    }
}

module.exports = {
    executePythonFile: executePythonFile
};

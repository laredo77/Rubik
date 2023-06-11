const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path'); // Required to construct file paths
const pythonPath = path.join('C:', 'Users', 'yahav', 'AppData', 'Local', 'Programs', 'Python', 'Python311', 'python.exe');

function executePythonFile(pythonFile, arguments) {
    // Get the full path to the Python file
    const fullPath = path.resolve(__dirname, pythonFile);

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

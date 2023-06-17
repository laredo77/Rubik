const {execSync} = require('child_process');
const path = require('path');
const PYTHON_EXECUTABLE = process.platform === 'win32' ? 'python' : 'python3';

/**
 * Executes a Python file with arguments.
 *
 * @param {string} pythonFile - The path to the Python file.
 * @param {string[]} arguments - The arguments to pass to the Python file.
 */
function executePythonFile(pythonFile, arguments) {
    // Get the full path to the Python file
    const fullPath = path.resolve(__dirname, pythonFile);

    // Build the command to execute the Python file with the arguments
    const command = `"${PYTHON_EXECUTABLE}" "${fullPath}" "${arguments.join('" "')}"`;

    try {
        execSync(command);
        console.log('Python file executed successfully.');
    } catch (error) {
        console.error(`Error executing Python file: ${error}`);
    }
}

module.exports = {
    executePythonFile,
};

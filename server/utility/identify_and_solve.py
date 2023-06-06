import sys
import cv2
import numpy as np
import vision2 as vs
import vision_params
import tkinter as tk
import threading
import kociemba
import os

VALID_STRING_LENGTH = 54
FILE_NAME = 'current_state_string.txt'
CLEAR_STRING_LENGTH = 80


def color_to_letter(colors):
    """
    Converts an array of colors to a string of letters representing those colors.

    Parameters:
    colors (list): A 2D list of color names.

    Returns:
    str: A string of letters representing the colors.
    """
    # Define a dictionary to map color names to letters.
    letter_dict = {'white': 'R', 'yellow': 'U', 'green': 'D', 'blue': 'F', 'red': 'B', 'orange': 'L'}
    letters = ''
    # Loop over each row of colors and each color in the row, and append the corresponding letter to the letters string.
    for row in colors:
        for color in row:
            letters += letter_dict[color]
    return letters


def stop_loop():
    """
    Stops the loop in the `grab_colors` function.
    """
    vision_params.stop_flag = True


def capture_rubik_face():
    """
    Captures the colors of a Rubik's cube face and saves them to a file using a GUI button to stop the loop.

    The function starts a new thread to run the `grab_colors` function, and creates a GUI button to stop the loop.
    """
    t = threading.Thread(target=vs.grab_colors)
    t.daemon = True
    t.start()
    # Create a GUI button to stop the loop.
    root = tk.Tk()
    root.geometry('200x50')
    root.title("Capture Rubik's Cube Face")
    stop_button = tk.Button(root, text="Capture!", command=stop_loop)
    stop_button.pack(side=tk.BOTTOM)
    root.mainloop()
    # The loop in `grab_colors` function will stop when the stop_button is clicked.


def write_message(message):
    with open("messages_to_user.txt", "w") as f:
        f.write(" " * CLEAR_STRING_LENGTH)
        f.seek(0)
        f.write(message)


def modify_and_confirm_file(action, kociemba_string):
    """
    This function takes an action and a string, modifies the Rubik's cube state file accordingly, and returns the
    solution string if the action is 'confirm'.

    Args:
        action (str): The action to perform. Possible values are 'top', 'down', 'front', 'back', 'left', 'right',
            'confirm', and 'clear'.
        kociemba_string (str): The string to be written to the Rubik's cube state file. This argument is used only when
            the action is 'top', 'down', 'front', 'back', or 'left'.

    Returns:
        str: The solution string if the action is 'confirm', None otherwise.
    """

    result = None

    if action == "top":
        start_index, end_index = 0, 8
    elif action == "bottom":
        start_index, end_index = 9, 17
    elif action == "front":
        start_index, end_index = 18, 26
    elif action == "back":
        start_index, end_index = 27, 35
    elif action == "left":
        start_index, end_index = 36, 44
    elif action == "right":
        start_index, end_index = 45, 53

    try:
        # Open the file in read and write mode and move the file pointer to the beginning of the file
        with open(FILE_NAME, 'r+') as f:
            f.seek(0)
            contents = f.read().strip()

            if action == "clear":
                # Clear the entire file if the action is 'clear'
                f.seek(0)
                f.write(" " * VALID_STRING_LENGTH)
                write_message("File cleared!")
            elif action == "confirm":
                if len(contents) == VALID_STRING_LENGTH:
                    # Solve the Rubik's cube using the Kociemba algorithm and return the solution
                    write_message(kociemba.solve(contents))
#                 os.remove(FILE_NAME)
            else:
                # Modify the specified character range
                if len(kociemba_string) == end_index - start_index + 1:
                    new_contents = contents[:start_index] + kociemba_string + contents[end_index+1:]
                    f.seek(0)
                    f.write(new_contents)
                    write_message("Characters modified!")
                else:
                    write_message("Error: Invalid string length for action")

    except Exception as e:
        write_message("An error occurred" + e)

    return result


def capture_solve_print(action):
    """
    Captures a picture of the Rubik's cube face, converts the colors to a string of letters, and
    modifies the specified character range in a text file containing the state of the Rubik's cube.

    Args:
        action (str): The action to perform on the Rubik's cube. Can be one of "top", "down", "front",
            "back", "left", "right", "confirm", or "clear".

    Returns:
        str or None: If the action is "confirm", returns the solution to the Rubik's cube as a string.
            Otherwise, returns None.

    Raises:
        Exception: If an error occurs while capturing the Rubik's cube face, converting the colors to
            a string, or modifying the file.
    """
    kociemba_string = ""
    if action not in ["confirm", "clear"]:
        # Capture a picture of the Rubik's cube face
        capture_rubik_face()
        # Get the captured colors
        colors = vision_params.face_col
        # Convert the colors to a string of letters using the color_to_letter function
        kociemba_string = color_to_letter(colors)

    # Modify the file and confirm the Rubik's cube state if the action is not "clear"
    result = modify_and_confirm_file(action, kociemba_string)

    # Return the solution to the Rubik's cube if the action is "confirm"
    if result is not None:
        return result
    return None


# When this python file invoked, it starts main
if __name__ == "__main__":

    # change the current working directory
    os.chdir('D:\\Projects\\RubikCube\\server\\utility')

# Retrieves the command line arguments passed to the script by the JS function
    action = sys.argv[1]
#     params = sys.argv[3:]
    capture_solve_print(action)


# test in terminal: node .\pythonExecuter.js [python_file_name.py] [action], for example node pythonExecuter.js identify_and_solve.py top







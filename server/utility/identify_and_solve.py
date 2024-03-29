import sys
import cv2
import numpy as np
import vision2 as vs
import vision_params
import tkinter as tk
import threading
import kociemba
import os
import urllib.request
import asyncio
import aiohttp
from scipy.stats import mode
from dotenv import load_dotenv

# Constants
VALID_STRING_LENGTH = 54
FILE_NAME = 'current_state_string.txt'
CLEAR_STRING_LENGTH = 80


async def getCubeDefinitionFromGPT(cubeWig):
    """
    Retrieves the cube definition string for the entire Rubik's Cube using GPT-3.5 Turbo model.

    Args:
        cubeWig (str): Single side of the cube represented by a string.

    Returns:
        str: Cube definition string for the entire Rubik's Cube starting with the provided side.
    """

    apiUrl = 'https://api.openai.com/v1/chat/completions'
    apiKey = ''
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {apiKey}'
    }
    message = (
            f'According to the Rubik Cube rules, it is defined by a string of 54 letters representing the stickers '
            f'on the cube. The available colors are R (red), G (green), B (blue), O (orange), W (white), and Y (yellow). '
            f'I have a single side of the cube with the string "{cubeWig}". Could you provide a valid string definition '
            f'for the entire Rubik Cube starting with my side, while leaving the rest open? Your assistance in '
            f'generating a valid configuration would be greatly appreciated\n\n'
            f'          |*********|\n'
            f'          |*U1**U2**U3*|\n'
            f'          |*********|\n'
            f'          |*U4**U5**U6*|\n'
            f'          |*********|\n'
            f'          |*U7**U8**U9*|\n'
            f'          |*********|\n'
            f'*********|*********|*********|*********\n'
            f'*L1**L2**L3*|*F1**F2**F3*|*R1**R2**R3*|*B1**B2**B3*\n'
            f'*********|*********|*********|*********\n'
            f'*L4**L5**L6*|*F4**F5**F6*|*R4**R5**R6*|*B4**B5**B6*\n'
            f'*********|*********|*********|*********\n'
            f'*L7**L8**L9*|*F7**F8**F9*|*R7**R8**R9*|*B7**B8**B9*\n'
            f'*********|*********|*********|*********\n'
            f'          |*********|\n'
            f'          |*D1**D2**D3*|\n'
            f'          |*********|\n'
            f'          |*D4**D5**D6*|\n'
            f'          |*********|\n'
            f'          |*D7**D8**D9*|\n'
            f'          |*********|\n'
        )

    payload = {
        'model': 'gpt-3.5-turbo',
        'messages': [{'role': 'system', 'content': message}]
    }

    # {'white': 'F', 'yellow': 'D', 'green': 'R', 'blue': 'U', 'red': 'B', 'orange': 'L'}
    color_conversion = {'W': 'F', 'Y': 'D', 'G': 'R', 'B': 'U', 'R': 'B', 'O': 'L'}

    try:
        if len(cubeWig) == 9 and cubeWig.count(cubeWig[0]) == 9:
            return "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB"

        async with aiohttp.ClientSession() as session:
            async with session.post(apiUrl, json=payload, headers=headers) as response:
                response_data = await response.json()
                content = response_data['choices'][0]['message']['content']
                write_message(content)
                full_str = content.split('\n\n')[1]

        converted_str = ''.join(color_conversion.get(c, c) for c in full_str)
        return converted_str

    except Exception as e:
        write_message("An error occurred: " + str(e))


def identify_cube_colors(image_path):
    """
    Identify the colors of a Rubik's Cube from an image.

    Args:
        image_path (str): The path or URL of the image.

    Returns:
        str: A string representation of the colors of the Rubik's Cube.
    """

    try:
        # Download the image from the URL
        req = urllib.request.urlopen(image_path)

        arr = np.asarray(bytearray(req.read()), dtype=np.uint8)

        # Read the image using cv2.imdecode()
        image = cv2.imdecode(arr, -1)

        # Get the dimensions of the image
        height, width, _ = image.shape

        # Divide the image into nine regions (3x3 grid)
        row_height = height // 3
        third_width = width // 3

        # Define the ROI coordinates based on the divided width and height
        roi_coordinates = [(j * third_width, i * row_height, third_width, row_height)
                           for i in range(3) for j in range(3)]

        # Create a zoomed-in version of the image
        zoom_factor = 10
        zoomed_image = cv2.resize(image, None, fx=zoom_factor, fy=zoom_factor)

        # Scale the ROI coordinates based on the zoom factor
        scaled_roi_coordinates = [(int(x * zoom_factor), int(y * zoom_factor),
                                   int(width * zoom_factor), int(height * zoom_factor))
                                  for (x, y, width, height) in roi_coordinates]

        # Draw the ROIs on the zoomed-in image
        for (x, y, width, height) in scaled_roi_coordinates:
            cv2.rectangle(zoomed_image, (x, y), (x + width, y + height), (0, 255, 0), 2)

        # Extract each cube from the image based on the defined ROIs
        cubes = [image[y:y + height, x:x + width] for (x, y, width, height) in roi_coordinates]

        # Store the color labels for each cube
        color_labels = []

        # Loop through each cube
        for cube in cubes:
            # Extract color information from the cube region
            cube_color = extract_color(cube)

            # Assign a color label based on the extracted color
            color_label = assign_color_label(cube_color)

            # Store the color label for each cube
            color_labels.append(color_label)

        # Create a string representation of the colors
        color_string = ''.join(color_labels)

        # Return the color string
        return color_string

    except urllib.error.URLError as e:
        write_message("An error occurred: " + str(e))


def extract_color(cube):
    """
    Extract the color information from a cube region.
    Calculates the most common color of the cube.

    Args:
        cube (ndarray): The image region representing a cube.

    Returns:
        str: The color information of the cube.
    """

    # Reshape the cube to a 2D array of pixels
    pixels = cube.reshape(-1, 3)

    # Compute the mode of the pixels
    mode_color = mode(pixels, axis=0).mode[0]

    return mode_color


def assign_color_label(cube_color):
    """
        Assign a color label based on the extracted color.

        Args:
            cube_color (tuple): The color information of a cube as a BGR tuple.

        Returns:
            str: The color label corresponding to the cube color.
    """

    # Define specific color values for each color label
    # {'white': 'F', 'yellow': 'D', 'green': 'R', 'blue': 'U', 'red': 'B', 'orange': 'L'}
    color_values = {            #BGR
        (255, 255, 255): 'F',   # White
        (246, 129, 61): 'U',    # Orange
        (9, 204, 253): 'D',     # Cyan
        (84, 157, 0): 'R',      # Green
        (47, 66, 220): 'B',     # Blue
        (0, 108, 255): 'L'      # Yellow
    }

    # Convert cube_color to a tuple
    cube_color_tuple = tuple(cube_color)

    # Check if the cube color matches any specific color values
    if cube_color_tuple in color_values:
        return color_values[cube_color_tuple]

    # Return '?' if no matching color label is found
    return '?'


def color_to_letter(colors):
    """
    Converts an array of colors to a string of letters representing those colors.

    Parameters:
    colors (list): A 2D list of color names.

    Returns:
    str: A string of letters representing the colors.
    """
    # Define a dictionary to map color names to letters.
    letter_dict = {'white': 'F', 'yellow': 'D', 'green': 'R', 'blue': 'U', 'red': 'B', 'orange': 'L'}
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
    """
    Write a message to the 'messages_to_user.txt' file.

    Args:
        message (str): The message to be written.

    Returns:
        None
    """
    with open("messages_to_user.txt", "w") as file:
        file.write(" " * CLEAR_STRING_LENGTH)  # Clear the file contents
        file.seek(0)
        file.write(message)  # Write the message to the file


async def modify_and_confirm_file(action, kociemba_string, image_path):
    """
    This function takes an action and a string, modifies the Rubik's cube state file accordingly, and returns the
    solution string if the action is 'confirm'.

    Args:
        action (str): The action to perform. Possible values are 'top', 'down', 'front', 'back', 'left', 'right',
            'confirm', and 'clear'.
        kociemba_string (str): The string to be written to the Rubik's cube state file. This argument is used only when
            the action is 'top', 'down', 'front', 'back', or 'left'.
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
                # Create Rubik's cube string from img
                face_str = identify_cube_colors(image_path)
                if len(contents) == VALID_STRING_LENGTH:
                    full_target_str = await getCubeDefinitionFromGPT(face_str)
                    # Solve the Rubik's cube using the Kociemba algorithm and return the solution
                    write_message(kociemba.solve(contents, full_target_str))
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
        write_message("An error occurred: " + str(e))


async def capture_solve_print(action, image_path):
    """
    Captures a picture of the Rubik's cube face, converts the colors to a string of letters, and
    modifies the specified character range in a text file containing the state of the Rubik's cube.

    Args:
        action (str): The action to perform on the Rubik's cube. Can be one of "top", "down", "front",
            "back", "left", "right", "confirm", or "clear".
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
    await modify_and_confirm_file(action, kociemba_string, image_path)


def main():
    """
    Main entry point of the script.
    Retrieves the command line arguments passed to the script by the JS function,
    and runs the 'capture_solve_print' function asynchronously.
    """
    # Change the current working directory to the location of the script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    # Retrieves the command line arguments passed to the script by the JS function
    action = sys.argv[1]
    imgPath = sys.argv[2]

    loop = asyncio.get_event_loop()
    loop.run_until_complete(capture_solve_print(action, imgPath))
    loop.close()

if __name__ == "__main__":
    main()






import sys
import cv2
import numpy as np
import vision2 as vs
import vision_params
import tkinter as tk
import threading


def python_func(params):
    print("this is the params:", params)
    return 12

def get_kociemba_string(colors):
    #create kociemba strin from colors
    pass

def stop_loop():
    vision_params.stop_flag = True

def capture_rubik_face():
    t = threading.Thread(target=vs.grab_colors)
    t.daemon = True
    t.start()
    # create a GUI button to stop the loop
    root = tk.Tk()
    stop_button = tk.Button(root, text="Capture!", command=stop_loop)
    stop_button.pack()
    root.mainloop()
    # the loop in grab_colors function will stop when the stop_button is clicked



# When this python file invoked, it starts main
if __name__ == "__main__":
# Retrieves the command line arguments passed to the script by the JS function
#     params = sys.argv[2:]
#     result = python_func(params)
#     print(result)

      capture_rubik_face()
      colors = vision_params.face_col
      kociemba_string = get_kociemba_string(colors)
      print(kociemba_string)







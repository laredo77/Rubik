import sys
# import twophase.server as srv
# import twophase.client_gui
# from threading import Thread
import cv2
import numpy as np
import vision2 as vs


def python_func(params):
    print("this is the params:", params)
    return 12

# When this python file invoked, it starts main
if __name__ == "__main__":
# Retrieves the command line arguments passed to the script by the JS function
    params = sys.argv[2:]
    result = python_func(params)
    print(result)
    img_path = "./download.jpg"
    img = vs.grab_colors(img_path)
    print(img)
#     bg = Thread(target=srv.start, args=(8080, 20, 2))
#     bg.start()
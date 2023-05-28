import math
import os
import os.path
import image_slicer
import shutil
from colorthief import ColorThief
from image_slicer import slice, get_basename
from PIL import Image

# Define color constants
blue = (61, 129, 246)
red = (220, 66, 47)
green = (0, 157, 84)
orange = (255, 108, 0)
yellow = (253, 204, 9)
white = (255, 255, 255)

# Define color options
colors = [blue, red, green, orange, yellow, white]

# Function to create a composite image of cubes
def create_cubes_image(img_path):
    parent_dir = os.path.dirname(img_path)
    final_cubes_path = os.path.join(parent_dir, "./final-cubes")
    os.mkdir(final_cubes_path)
    path = os.path.join(parent_dir, "./cube-colors")
    for i, directory in enumerate(os.listdir(path)):
        cube_path = os.path.join(path, str(i))
        images = [Image.open(os.path.join(cube_path, x)) for x in os.listdir(cube_path)]
        total_width = (images[0].size[0] * 3) + 2  # 2 pixels for seperator
        total_height = (images[0].size[1] * 3) + 2  # 2 pixels for seperator
        new_im = Image.new('RGB', (total_width, total_height))
        x_offset = 0
        y_offset = 0
        for j, im in enumerate(images):
            new_im.paste(im, (x_offset, y_offset))
            x_offset += (im.size[0] + 1)
            if j % 3 == 2:
                y_offset += (im.size[1] + 1)
                x_offset = 0

        image_name = str(i) + ".png"
        new_im.save(os.path.join(final_cubes_path, image_name))

# Function to convert slices of the image into cubes with color representation
def parse_to_cube_colors(img_path, n_cubes):
    parent_dir = os.path.dirname(img_path)
    inner_cube_path = os.path.join(parent_dir, "./inner-cube")
    path = os.path.join(parent_dir, "./cube-colors")
    os.mkdir(path)
    for i in range(n_cubes):
        cube_colors_path = os.path.join(path, str(i))
        os.mkdir(cube_colors_path)
        specific_inner_cube_path = os.path.join(inner_cube_path, str(i))
        for img in os.listdir(specific_inner_cube_path):
            image = Image.open(os.path.join(specific_inner_cube_path, img))
            dominant_color = get_dominant_color(image.filename)
            closest_color = get_closest_color(dominant_color)
            cube_colored_img = Image.new('RGB', image.size, closest_color)
            cube_colored_img.save(os.path.join(cube_colors_path, img))

# Function to get the closest color from the given dominant color
def get_closest_color(dc):
    min_distance = float('inf')
    for c in colors:
        rhat = 0.5 * (dc[0] + c[0])
        d = math.sqrt(
            ((2 + (rhat / 256)) * pow((dc[0] - c[0]), 2)) +
            (4 * pow((dc[1] - c[1]), 2)) +
            ((2 + ((255 - rhat) / 256)) * pow((dc[2] - c[2]), 2))
        )
        # d = math.sqrt(pow((dc[0] - c[0]), 2) + pow((dc[1] - c[1]), 2) + pow((dc[2] - c[2]), 2))
        if d < min_distance:
            min_distance = d
            min_c = c
    return min_c

# Function to get the dominant color of an image
def get_dominant_color(img_path):
    color_thief = ColorThief(img_path)
    try:
        dominant_color = color_thief.get_color(quality=1)
    except:
        dominant_color = white
    return dominant_color

# Function to rename the images in a directory to sequential numbers
def rename_images(dir_n):
    for i, file in enumerate(os.listdir(dir_n)):
        old_filepath = os.path.join(dir_n, file)
        new_name = str(i) + ".png"
        new_filepath = os.path.join(dir_n, new_name)
        os.rename(old_filepath, new_filepath)

# Function to slice the main image into cubes and inner cubes
def image_slice(img_path, n_cubes, c_size):
    tiles = slice(img_path, n_cubes, save=False)  # slice the image for cubes
    parent_dir = os.path.dirname(img_path)
    path = os.path.join(parent_dir, "./inner-cube")
    os.mkdir(path)
    path = os.path.join(parent_dir, "./cubes")
    os.mkdir(path)
    image_slicer.save_tiles(
        tiles, prefix=get_basename(img_path), directory=path
    )

    rename_images(path)

    for i in range(len(tiles)):
        fn = path + "/" + str(i) + ".png"
        t = slice(fn, c_size, save=False)  # slice the cube for 9 squares
        inner_cube_path = os.path.dirname(img_path)
        inner_cube_path = inner_cube_path + "./inner-cube" + "/" + str(i)
        os.mkdir(inner_cube_path)
        image_slicer.save_tiles(
            t, prefix=get_basename(img_path), directory=inner_cube_path
        )
        rename_images(inner_cube_path)

# Function to delete temporary directories
def delete_directories():
    shutil.rmtree("./inner-cube", ignore_errors=True)
    shutil.rmtree("./cubes", ignore_errors=True)
    shutil.rmtree("./cube-colors", ignore_errors=True)


if __name__ == '__main__':
    # Set the configuration parameters
    num_of_cubes = 840
    num_of_rows = 5
    num_of_cols = 7
    cube_size = 9
    image_path = "bar-ilan.jpg"

    # Perform the image slicing, color parsing, cube image creation, and cleanup
    image_slice(image_path, num_of_cubes, cube_size)
    parse_to_cube_colors(image_path, num_of_cubes)
    create_cubes_image(image_path)
    delete_directories()

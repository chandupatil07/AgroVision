import cv2
import numpy as np

def is_blurry(image_path, threshold=100):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.Laplacian(gray, cv2.CV_64F).var()
    return blur < threshold


def is_plant_image(image_path):
    img = cv2.imread(image_path)
    mean_green = np.mean(img[:,:,1])
    mean_red = np.mean(img[:,:,2])
    return mean_green > mean_red
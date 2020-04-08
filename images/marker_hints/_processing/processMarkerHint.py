import sys
import os
import shutil
import image_slicer
from PIL import Image

def doCrop(img, targetDir):
    width, height = img.size;
    croppedImage = img.crop((500, 25, width - 500, height-200));
    width, height = croppedImage.size;
    ratio = float(height) / float(width);

    firstResize = croppedImage.resize((300, int(300 * ratio)));

    finalImagePath = targetDir + '/' + file.rsplit('.', 1)[0] + '.jpg';
    finalImage = firstResize;
    finalImage.save(finalImagePath);

def cropImage(file, targetDir):
    print(file)
    img = Image.open(file);
    width, height = img.size;
    if width == 1600 and height == 900:
        doCrop(img, targetDir);
        return;

    if width == 1920 and height == 1080:
        doCrop(img, targetDir);
        return;

    print("ERROR: size mismatch " + file + " == " + str(width) + " x " + str(height));

targetDir = 'out';
if not os.path.exists(targetDir):
        os.makedirs(targetDir)

for file in os.listdir("."):
    if file.endswith(".jpg") or file.endswith(".png"):
        cropImage(file, targetDir);

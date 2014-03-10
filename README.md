# fcrop

Node.js utility to crop images by focus point

## Fast run  
1. Clone the repo
2. Install `gm` module by running `npm install gm`
3. Install [GraphicsMagick](http://www.graphicsmagick.org/) library
4. Go to repo directory and run from command prompt  
`node fcrop.js ./demo/formats.json ./demo/images.json`
5. Check the `out` folder for cropped demo image in different versions

## Illustration of idea
![Illustration of focus-point crop concept](http://img-fotki.yandex.ru/get/9763/1770335.0/0_954c2_5699b180_XL.png)  

## How to use

`node fcrop.js formats.json images.json`

Utility takes all images specified by `images.json` file and crop it to formats specified by `formats.json` file. Result is stored in directory specified by parameter in `images.json`, all files are collected by format name folder, e.g. 200x80. Optionally you can specify rubric for each image set to additionally categorize inside each format.

## formats.json specification

```
{
  "formats": [
    {"width": 200, "height": 135},
    ...
  ]
}
```

## images.json specification

IMPORTANT NOTICE! All paths are calculated relative to `fcrop.js` folder not to json-files.

```
{
  "quality": 70,              // result image quality (from 0 to 100)
  "dest": "./out",            // destination folder, relative to fcrop.js
  "rubric": "Clothes",        // optional. Put all images under this folder in each format, e.g. 200x80/Clothes/1.jpg

  
  "images": [
    {"filename": "1.jpg",     // path to image, relative to fcrop.js
    "focus":[2596, 1100]},    // focus point coordinates, [x, y]
    ...
  ]
  
}
```

## Requirements and installation
Utility requires "GraphicsMagick for node" by Aaron Heckmann. You can find it here https://github.com/aheckmann/gm or just simply install by running from your command prompt `npm install gm`

To process images you need graphics library. GM module can work both with [GraphicsMagick](http://www.graphicsmagick.org/) and [ImageMagick](http://www.imagemagick.org/) 

I used GraphicsMagick, but I think there shouldn't be difference with ImageMagick.

fcrop
=====

Utility to crop images on focus point

![Illustration of focus-point crop concept](http://img-fotki.yandex.ru/get/9763/1770335.0/0_954c2_5699b180_XL.png)  
Illustration of idea

**How to use**

`node fcrop.js ./demo/formats.json ./demo/images.json`

Utility takes all images specified in `images.json` file and crop it to formats specified by `formats.json`file. Result is stored in directory specified in `images.json`, all files are stored collected by format name folder, e.g. 200x80. Optionally you can specify rubric for each image set to additionally categorize inside each format.

**formats.json specification**

```
{
  "formats": [
    {"width": 200, "height": 135},
    ...
  ]
}
```

**images.json specification**

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

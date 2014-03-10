/***
 * Focus crop utility
 * 
 * Command line parameters
 * node fcrop.js <formats_file> <images_file>   
 */
 
var gm = require("gm"),
  fs = require("fs");

var formats_file = process.argv[2] || "./formats.json",
  images_file = process.argv[3] || "./images.json";
  
  // destination formats
  formats = require(formats_file)
  // source images
  src_images = require(images_file),
  images = src_images.images;

/***
 *  Focus crop function
 *  @param {String} filename Source filename
 *  @param {Array} foucs Focus point coordinates [x,y]
 *  @param {Array} resize Destination resize dimensions [w, h]
 *   
 *  Cropping algorithm:
 *  1) calculate destionation proprtion
 *   k = Wr/Hr
 *  2) define max image size that will fit current image
 *   if Wr >= Hr: Wm = Wi, Hm = Wi/k
 *    else Hm = Hi, Wm = Hm*k
 *  3) calculate new focus point coordinates
 *    fx2 = fx*Wm/Wi, 
 *    fy2 = fy*Hm/Hi
 *  4) Perform crop offset and dimensions as max image size
 *   crop(Wm, Hm, (fx-fx2), (fy-fy2))
 *  5) Resize to destination format
 *    resize(Wr, Hr)
 */ 
function focusCrop(filename, focus, resize, callback) {
  console.log("processing", filename, "to", resize.width+"x"+resize.height);
  
  var img = gm("./"+filename)
    .noProfile();
  
  img.size(function(err, size){
    if (err)
      throw err;

    // destination proportion
    var k = resize.width/resize.height;
    
    // define image for crop
    if (resize.width >= resize.height) {
      var Wm = size.width,
        Hm = Math.round(size.width/k); 
    }  else {
      var Hm = size.height,
        Wm = Math.round(size.height*k);
    }
    
    // define new focus point coordinates
    var fx2 = Math.round(focus[0]*Wm/size.width);
    var fy2 = Math.round(focus[1]*Hm/size.height);
    
    // crop
    img.crop(Wm, Hm, focus[0]-fx2, focus[1]-fy2);
    
    // destination resize
    img.resize(resize.width, resize.height, "!");   
  
    img.sharpen(1);
    img.quality(src_images.quality || 70);
    
    var newpath = getNewPath(filename, resize);
    ensurePath(newpath);
     
    img.write(newpath, function(err){
      if (err)
        console.log(err);
      else {
        console.log("done");
        callback.call();
      }
    });
  });
}


/***
 * Construct new path
 * @returns dest/WxH/<rubric>/image.jpg 
 */
function getNewPath(filename, resize) {
  var path = filename.split("/"),
    res = [src_images.dest, resize.width+"x"+resize.height];
  
  if (src_images.rubric)
    res.push(src_images.rubric);
  
  res.push( path[path.length-1] );
  return res.join("/");
}  

/*** 
 * Ensure that path exists, create missed folders
 */ 
function ensurePath(path) {
 var folders = path.split('/'),
  s = "";
  
 folders.length--;
 
 if (folders.length) {
  for (var i=0; i<folders.length; i++) {
    s += folders[i] + "/";
    
    if (! fs.existsSync(s))
      fs.mkdirSync(s)
  }
 }
}


var i=0;
var j=0;

function _callback() {
  j++;
  if (j == formats.formats.length) {
    j=0;
    i++;
    if (i == images.length)
      return;
  }
  focusCrop(images[i].filename, images[i].focus, formats.formats[j], _callback);
}

// run script
focusCrop(images[i].filename, images[i].focus, formats.formats[j], _callback);




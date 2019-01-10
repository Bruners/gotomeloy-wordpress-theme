<?php
$folder = "../../../../static/webcam"; // the folder with images

function getImages($dir) {
    $directory = 'webcam';
    //realpath($dir);
    $allFiles = scandir($dir);
    $files = array_diff($allFiles, array('.', '..'));
    foreach ($files as $f) {
        chmod($dir . '/' . $f, 0644); // uploaded images are set to 0640 and can't be read on a page. Must set CHMOD to 644
    }

    $ignored = array('.', '..');    // ignore this

    $files = array();
    foreach (scandir($dir) as $file) {
        if (in_array($file, $ignored)) continue;
        $files[$file] = fileatime($dir . '/' . $file);
    }

    $files = array_keys($files);    // sort images
    $files = array_reverse($files);

    foreach ($files as $k => $file) {
        if ($k > 99) {               // delete old images, leave 100 freshest on server
            unlink($dir . '/' . $file);
        }
    }

    return ($files[0]) ? $files[0] : false; // return freshest image
}

$filename = getImages($folder);
$imgurl = array('imgURL' => 'https://static.stott.no/webcam/' . $filename);
$imgurl = json_encode($imgurl);
echo $imgurl;

?>
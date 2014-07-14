
function get_query(){
    var url = location.href;
    var qs  = url.substring(url.indexOf('?') + 1).split('&');
    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }

    console.log("result: %o ", result);

    return result;


}

function getImagePath(polopolyImageID, cpYN){
    if(cpYN == 'y' || cpYN == 'Y' ){
        imagePath = 'http://i.cbc.ca/' + polopolyImageID + '!/cpImage/httpImage/image.jpg_gen/derivatives/original_940/*.jpg';
    }
    else{
        imagePath = 'http://i.cbc.ca/' + polopolyImageID + '!/fileImage/httpImage/image.jpg_gen/derivatives/original_940/*.jpg';
    }

    return imagePath;
}

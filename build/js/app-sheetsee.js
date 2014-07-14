
var urlQuery                    = get_query(),
    dataSRC                     = urlQuery.datasrc,
    dataKey                     = urlQuery.key,
    dataPath                    = urlQuery.datapath;

var tooltipColumns      = ["title", "photo-url", "caption", "credit", "description"];

var tooltipTemplate     = ' <div>'
                        + '     <img src="{{photo-url}}">'
                        + '     <p class="credit">({{credit}})</h4>'
                        + '     <p class="caption">{{caption}}</p>'
                        + '     <h4 class="title">{{title}}</h4>'
                        + '     <p class="desc">{{description}}</p>'
                        + ' </div>';

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


document.addEventListener('DOMContentLoaded', function() {

    if(dataSRC == 'gss'){
        var gssKey = dataKey;
    }

    Tabletop.init( { key: gssKey, callback: showInfo, simpleSheet: true } )
})

function showInfo(data) {

    var optionsJSON = tooltipColumns;

    var geoJSON     = Sheetsee.createGeoJSON(data, optionsJSON)
    var map         = Sheetsee.loadMap("map")

    Sheetsee.addTileLayer(map, 'examples.map-h67hf2ic')
    Sheetsee.addMarkerLayer(geoJSON, map, tooltipTemplate)

}


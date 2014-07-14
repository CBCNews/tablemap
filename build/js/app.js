

/************************************************************/
/************************************************************/
/************************************************************/
var urlQuery                    = get_query(),
    dataSRC                     = urlQuery.datasrc,
    dataKey                     = urlQuery.key,
    dataPath                    = urlQuery.datapath;

var popup,
    sidebarEntry;

var tooltip                     = Handlebars.compile(tooltipTemplate);
var sidebarBlock                = Handlebars.compile(sidebarEntryTemplate);



console.log("$(window).width(): " + $(window).width());


/* Set view of Leaflet map based on screen size */
if ($(window).width() < 400) {
    var map = new L.Map('map').setView([mapPresetsLat['300'],mapPresetsLong['300']],mapPresetsZoom['300']);
}
else if ($(window).width() < 626) {
    var map = new L.Map('map').setView([mapPresetsLat['default'],mapPresetsLong['default']],mapPresetsZoom['default']);
}
else {
    var map = new L.Map('map').setView([mapPresetsLat['980'],mapPresetsLong['980']],mapPresetsZoom['980']);
}


/* Leaflet base layer and marker cluster object */
var tileLayer = L.tileLayer(tileLayer, {
    attribution: tileAttribution,
    maxZoom: 16
});
map.addLayer(tileLayer);
var markers = new L.MarkerClusterGroup();


/* Grab data from GSS */
var jqueryNoConflict = jQuery;
jqueryNoConflict(document).ready(function(){

    console.log("dataSRC: " + dataSRC);
    console.log("dataKey: " + dataKey);
    console.log("dataPath: " + dataPath);

    if(dataSRC == 'gss'){
        initializeTabletopObject(dataKey);
    }
});


/* Pull data from Google spreadsheet */
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: startUpLeafet,
        simpleSheet: true,
        debug: false
    });
}


/* Process data feed and create the markers/popups */
function startUpLeafet(tabletopData) {

    for (var num = 0; num < tabletopData.length; num ++) {

        console.log("### tabletopData[num] %o ", tabletopData[num]);

        var title       = tabletopData[num].title;
        var photoid     = tabletopData[num].photoid;
        var caption     = tabletopData[num].caption;
        var credit      = tabletopData[num].credit;
        var description = tabletopData[num].description;

        tooltipContent  = {

            "title"       : tabletopData[num].title,
            "photoid"     : tabletopData[num].photoid,
            "caption"     : tabletopData[num].caption,
            "credit"      : tabletopData[num].credit,
            "description" : tabletopData[num].description

        };

        var dataLat     = tabletopData[num].latitude;
        var dataLong    = tabletopData[num].longitude;

        // console.log("tooltipContent %o", tooltipContent );

        marker_location = new L.LatLng(dataLat, dataLong);
        layer           = new L.Marker(marker_location, {icon: defaultIcon});
        popup           = tooltip(tooltipContent);
        layer.bindPopup(popup);
        markers.addLayer(layer);

        sidebarEntry    = sidebarBlock(tooltipContent);
        $('#sidebar-entries').append(sidebarEntry);

    }

};


/* Cluster the markers if necessary */
map.addLayer(markers);


/* Grab About box content */
isVisibleDescription    = false;
sidebarHeader           = $('.sidebar_header').html();
sidebarContent          = $('.sidebar_content').html();
creditsContent          = $('.leaflet-control-attribution').html();

$('.toggle_about').click(function() {
    if (isVisibleDescription === false) {
        $('.description_box_cover').show();
        $('.description_box_header').html(sidebarHeader + '<div id="scroll_more"><strong>Scroll to read more...</strong></div>');
        $('.description_box_text').html(sidebarContent + '<br />');
        $('#caption_box').html('Credits: ' + creditsContent);
        $('.description_box').show();
        isVisibleDescription = true;
    } else {
        $('.description_box').hide();
        $('.description_box_cover').hide();
        isVisibleDescription = false;
    }
});



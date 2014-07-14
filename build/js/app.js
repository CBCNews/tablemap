

/************************************************************/
/************************************************************/
/************************************************************/
var urlQuery                    = get_query(),
    dataSRC                     = urlQuery.datasrc,
    dataKey                     = urlQuery.key,
    dataPath                    = urlQuery.datapath;

var tooltip         = Handlebars.compile(tooltipTemplate);
var sidebarBlock    = Handlebars.compile(sidebarEntryTemplate);

console.log("$(window).width(): " + $(window).width());
// Set view of Leaflet map based on screen size
if ($(window).width() < 400) {
    var map = new L.Map('map').setView([mapPresetsLat['300'],mapPresetsLong['300']],mapPresetsZoom['300']);
}
else if ($(window).width() < 626) {
    var map = new L.Map('map').setView([mapPresetsLat['default'],mapPresetsLong['default']],mapPresetsZoom['default']);
} else {
    var map = new L.Map('map').setView([mapPresetsLat['980'],mapPresetsLong['980']],mapPresetsZoom['980']);
}

// Leaflet base layer
var tileLayer = L.tileLayer(tileLayer, {
    attribution: tileAttribution,
    maxZoom: 16
});
map.addLayer(tileLayer);

// Set up our marker cluster group
var markers = new L.MarkerClusterGroup();

// Here's the Tabletop feed
// First we'll initialize Tabletop with our spreadsheet
var jqueryNoConflict = jQuery;
jqueryNoConflict(document).ready(function(){

    console.log("dataSRC: " + dataSRC);
    console.log("dataKey: " + dataKey);
    console.log("dataPath: " + dataPath);

    if(dataSRC == 'gss'){
        initializeTabletopObject(dataKey);
    }
});

// Pull data from Google spreadsheet
// And push to our startUpLeaflet function
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: startUpLeafet,
        simpleSheet: true,
        debug: false
    });
}

// This function gets our data from our spreadsheet
// Then gets it ready for Leaflet.
// It creates the marker, sets location
// And plots on it on our map
function startUpLeafet(tabletopData) {
    // Tabletop creates arrays out of our data
    // We'll loop through them and create markers for each
    for (var num = 0; num < tabletopData.length; num ++) {


        console.log("### tabletopData[num] %o ", tabletopData[num]);

        // Our table columns
        // Change 'brewery', 'address', etc.
        // To match table column names in your table
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

        // Pull in our lat, long information
        var dataLat     = tabletopData[num].latitude;
        var dataLong    = tabletopData[num].longitude;


        // console.log("tooltipContent %o", tooltipContent );


        // Add to our marker
        marker_location = new L.LatLng(dataLat, dataLong);
        // Create the marker
        layer = new L.Marker(marker_location, {icon: defaultIcon});

        // Create the popup
        var popup = tooltip(tooltipContent);
        // Add to our marker
        layer.bindPopup(popup);

        /* Add the sidebar entry for more details */
        var sidebarEntry = sidebarBlock(tooltipContent);
        $('#sidebar-entries').append(sidebarEntry);

        // Add marker to our cluster group
        markers.addLayer(layer);
    }
};

// Add our cluster group to our map
map.addLayer(markers);

// Toggle for 'About this map' and X buttons
// Only visible on mobile
isVisibleDescription = false;
// Grab header, then content of sidebar
sidebarHeader = $('.sidebar_header').html();
sidebarContent = $('.sidebar_content').html();
// Then grab credit information
creditsContent = $('.leaflet-control-attribution').html();
$('.toggle_about').click(function() {
    if (isVisibleDescription === false) {
        $('.description_box_cover').show();
        // Add Sidebar header into our description box
        // And 'Scroll to read more...' text on wide mobile screen
        $('.description_box_header').html(sidebarHeader + '<div id="scroll_more"><strong>Scroll to read more...</strong></div>');
        // Add the rest of our sidebar content, credit information
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



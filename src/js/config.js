
/****************************************/
/* Table Mapper Config */
/****************************************/

var mapPresetsLat               = [],
    mapPresetsLong              = [],
    mapPresetsZoom              = [];

    mapPresetsLat['default']    = '42';
    mapPresetsLong['default']   = '-93';
    mapPresetsZoom['default']   = '2';

    mapPresetsLat['300']        = '42';
    mapPresetsLong['300']       = '-93';
    mapPresetsZoom['300']       = '2';

    mapPresetsLat['626']        = '42';
    mapPresetsLong['626']       = '-93';
    mapPresetsZoom['626']       = '3';

    mapPresetsLat['980']        = '42';
    mapPresetsLong['980']       = '-93';
    mapPresetsZoom['980']       = '6';

var tileLayer                   = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    tileAttribution             = '© <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

var tooltipColumns              = [ "title", "photo-url", "cpiimageyn", "caption", "credit", "description" ];

var tooltipTemplate             = ' <div>'
                                + '     <img src="{{photoid}}" class="thumb">'
                                + '     <p class="credit">({{credit}})</h4>'
                                + '     <p class="caption">{{caption}}</p>'
                                + ' </div>';

var sidebarEntryTemplate        = ' <div class="entry">'
                                + '     <h4 class="title">{{title}}</h4>'
                                + '     <p class="desc">{{description}}</p>'
                                + ' </div>';


var defaultIcon                 = L.icon({
                                    iconUrl:    'gfx/marker-icon.png',
                                    shadowUrl:  'gfx/marker-shadow.png',

                                    iconSize:     [25, 41], // size of the icon
                                    shadowSize:   [41, 41], // size of the shadow
                                    iconAnchor:   [3, 3], // point of the icon which will correspond to marker's location
                                    shadowAnchor: [4, 20],  // the same for the shadow
                                    popupAnchor:  [0, 10] // point from which the popup should open relative to the iconAnchor
                                });



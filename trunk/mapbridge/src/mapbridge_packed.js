/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * @author: Nianwei Liu [nianwei at gmail dot com]
 */
(function(){function h(s){document.write('<script type="text/javascript" src="'+s+'"><\/script>')}function o(v){var x=document.getElementsByTagName("script");var B,z;var w={};for(z=0;z<x.length;z++){var s=x[z].src;var A=s.toLowerCase().lastIndexOf(v.toLowerCase());if(A>-1){B=s.substring(0,A);var t=s.indexOf("?",A);if(t>-1){var u=s.substring(t+1).split("&");for(z=0;z<u.length;z++){var y=u[z].split("=");w[y[0]]=y[1]}}break}}return{path:B,params:w}}var a=o("mapbridge");var j=a.path;var l=a.params.key||"your_api_key";h("http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js");h(j+"bridge/FABridge.js");var p;var n;var e="com.google.maps.";var f={};f.createMap=function(v,y,w){var u="__MAPBRIDGE__"+v.id;var s=document.createElement("div");s.id=u;v.appendChild(s);var t={bridgeName:u,key:l};w=w||{};var x=w.swf||j+"MapBridge.swf";swfobject.embedSWF(x,s.id,v.offsetWidth,v.offsetHeight,"9.0.0",false,t);FABridge.addInitializationCallback(u,function(){var A=FABridge[u];var z=A.root();if(!p){p=A;n=z}y(z,A)})};var m={MapBridge:f};function d(u){var s=[];var w=n;if(u){for(var v=0;v<u.length;v++){var t=u[v];if(t.typeName&&t.typeName.indexOf("MapBridge")>-1&&t.bridge){w=t}else{s.push(t)}}}return{map:w,args:s}}function b(u,v){var w;var y=d(v);var t=y.args;if(t.length===1&&(typeof t[0]==="object"&&!t[0].bridge&&!t[0].typeName)){w=y.map.create(e+u,[]);var z=t[0];for(var s in z){if(z.hasOwnProperty(s)){var A="set"+s.substring(0,1).toUpperCase()+s.substring(1);w[A].call(w,z[s])}}}else{w=y.map.create(e+u,t)}return w}function i(s){var t=s.substring(s.lastIndexOf(".")+1);m[t]=function(){return b(s,arguments)}}function c(s){for(var t=0;t<s.length;t++){i(s[t])}}function r(s,u){var t=s.substring(s.lastIndexOf(".")+1);m[t][u]=function(){var v=d(arguments);return v.map.getStatic(e+s,u,v.args)}}function q(s,t){for(var u=0;u<t.length;u++){r(s,t[u])}}function k(t){for(var s in t){if(t.hasOwnProperty(s)){q(s,t[s])}}}c(["Alpha","Color","Copyright","CopyrightCollection","CopyrightNotice","InfoWindowOptions","LatLng","LatLngBounds","Map","Map3D","MapAction","MapAttitudeEvent","MapEvent","MapMouseEvent","MapMoveEvent","MapOptions","MapType","MapTypeOptions","MapZoomEvent","PaneId","ProjectionBase","TileLayerBase","View","controls.ControlBase","controls.ControlPosition","controls.MapTypeControl","controls.MapTypeControlOptions","controls.NavigationControl","controls.NavigationControlOptions","controls.OverviewMapControl","controls.OverviewMapControlOptions","controls.PositionControl","controls.PositionControlOptions","controls.ScaleControl","controls.ScaleControlOptions","controls.ZoomControl","controls.ZoomControlOptions","geom.Attitude","geom.Point3D","geom.TransformationGeometry","overlays.EncodedPolylineData","overlays.GroundOverlay","overlays.GroundOverlayOptions","overlays.Marker","overlays.MarkerOptions","overlays.OverlayBase","overlays.Polygon","overlays.PolygonOptions","overlays.Polyline","overlays.PolylineOptions","overlays.TileLayerOverlay","services.ClientGeocoder","services.ClientGeocoderOptions","services.Directions","services.DirectionsEvent","services.DirectionsOptions","services.GeocodingEvent","services.GeocodingResponse","services.Placemark","services.Route","services.ServiceStatus","services.Step","styles.BevelStyle","styles.ButtonFaceStyle","styles.ButtonStyle","styles.FillStyle","styles.GradientStyle","styles.RectangleStyle","styles.StrokeStyle"]);k({Alpha:["OPAQUE","PERCENT_0","PERCENT_10","PERCENT_100","PERCENT_20","PERCENT_30","PERCENT_40","PERCENT_50","PERCENT_60","PERCENT_70","PERCENT_80","PERCENT_90","UNSEEN"],Color:["BLACK","BLUE","CYAN","DEFAULTLINK","GRAY1","GRAY10","GRAY11","GRAY12","GRAY13","GRAY14","GRAY15","GRAY2","GRAY3","GRAY4","GRAY5","GRAY6","GRAY7","GRAY8","GRAY9","GREEN","MAGENTA","RED","WHITE","YELLOW","toHtml"],InfoWindowOptions:["ALIGN_CENTER","ALIGN_LEFT","ALIGN_RIGHT","getDefaultOptions","setDefaultOptions"],LatLng:["EARTH_RADIUS","fromRadians","fromUrlValue","wrapLatLng"],MapAction:["ACTION_NOTHING","ACTION_PAN","ACTION_PAN_ZOOM_IN","ACTION_ZOOM_IN","DRAGMODE_CAMERA_YAW_PITCH","DRAGMODE_LATLNG","DRAGMODE_MAP_YAW_PITCH","DRAGMODE_PITCH","DRAGMODE_YAW"],MapAttitudeEvent:["ATTITUDE_CHANGE_END","ATTITUDE_CHANGE_START","ATTITUDE_CHANGE_STEP"],MapEvent:["CONTROL_ADDED","CONTROL_REMOVED","COPYRIGHTS_UPDATED","FLY_TO_CANCELED","FLY_TO_DONE","INFOWINDOW_CLOSED","INFOWINDOW_CLOSING","INFOWINDOW_OPENED","MAPTYPE_ADDED","MAPTYPE_CHANGED","MAPTYPE_REMOVED","MAP_PREINITIALIZE","MAP_READY","OVERLAY_BEFORE_REMOVED","OVERLAY_MOVED","OVERLAY_REMOVED","SIZE_CHANGED","TILES_LOADED","TILES_LOADED_PENDING","VIEW_CHANGED","VISIBILITY_CHANGED"],MapMouseEvent:["CLICK","DOUBLE_CLICK","DRAG_END","DRAG_START","DRAG_STEP","MOUSE_DOWN","MOUSE_MOVE","MOUSE_UP","ROLL_OUT","ROLL_OVER"],MapMoveEvent:["MOVE_END","MOVE_START","MOVE_STEP"],MapType:["DEFAULT_MAP_TYPES","HYBRID_MAP_TYPE","NORMAL_MAP_TYPE","PHYSICAL_MAP_TYPE","SATELLITE_MAP_TYPE"],MapTypeOptions:["getDefaultOptions","setDefaultOptions"],MapZoomEvent:["CONTINUOUS_ZOOM_END","CONTINUOUS_ZOOM_START","CONTINUOUS_ZOOM_STEP","ZOOM_CHANGED","ZOOM_RANGE_CHANGED"],PaneId:["PANE_FLOAT","PANE_MAP","PANE_MARKER","PANE_OVERLAYS"],View:["VIEWMODE_2D","VIEWMODE_ORTHOGONAL","VIEWMODE_PERSPECTIVE"],"controls.ControlPosition":["ANCHOR_BOTTOM_LEFT","ANCHOR_BOTTOM_RIGHT","ANCHOR_TOP_LEFT","ANCHOR_TOP_RIGHT","AUTO_ALIGN_NONE","AUTO_ALIGN_X","AUTO_ALIGN_Y"],"controls.MapTypeControlOptions":["ALIGN_HORIZONTALLY","ALIGN_VERTICALLY"],"controls.ScaleControlOptions":["UNITS_BOTH","UNITS_BOTH_PREFER_IMPERIAL","UNITS_BOTH_PREFER_METRIC","UNITS_IMPERIAL_ONLY","UNITS_METRIC_ONLY","UNITS_SINGLE"],"overlays.MarkerOptions":["ALIGN_BOTTOM","ALIGN_HORIZONTAL_CENTER","ALIGN_LEFT","ALIGN_RIGHT","ALIGN_TOP","ALIGN_VERTICAL_CENTER","getDefaultOptions","setDefaultOptions"],"overlays.GroundOverlayOptions":["getDefaultOptions","setDefaultOptions"],"overlays.Polygon":["fromEncoded"],"overlays.PolygonOptions":["getDefaultOptions","setDefaultOptions"],"overlays.Polyline":["fromEncoded"],"overlays.PolylineOptions":["getDefaultOptions","setDefaultOptions"],"services.DirectionsEvent":["DIRECTIONS_ABORTED","DIRECTIONS_FAILURE","DIRECTIONS_SUCCESS"],"services.DirectionsOptions":["TRAVEL_MODE_DRIVING","TRAVEL_MODE_WALKING"],"services.GeocodingEvent":["GEOCODING_FAILURE","GEOCODING_SUCCESS"],"services.ServiceStatus":["GEO_ABORTED_REQUEST","GEO_BAD_KEY","GEO_BAD_REQUEST","GEO_BAD_STATUS_START","GEO_MISSING_ADDRESS","GEO_MISSING_QUERY","GEO_SERVER_ERROR","GEO_SUCCESS","GEO_TOO_MANY_QUERIES","GEO_UNAVAILABLE_ADDRESS","GEO_UNKNOWN_ADDRESS","GEO_UNKNOWN_DIRECTIONS"],"styles.BevelStyle":["BEVEL_LOWERED","BEVEL_NONE","BEVEL_RAISED"],"styles.BevelStyle":["mergeStyles"],"styles.ButtonFaceStyle":["mergeStyles"],"styles.ButtonStyle":["mergeStyles"],"styles.FillStyle":["mergeStyles"],"styles.RectangleStyle":["mergeStyles"],"styles.StrokeStyle":["mergeStyles"]});for(var g in m){if(m.hasOwnProperty(g)){window[g]=m[g]}}})();
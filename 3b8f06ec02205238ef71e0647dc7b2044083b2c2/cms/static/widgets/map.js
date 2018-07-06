cms.registerWidgetHandler("map",new function(){InlineWidget.apply(this,arguments);this.isApiLoaded=false;this.isApiLoadInProgress=false;this.callbacks=[];this.mapsObjects={};this.defaultOptions={width:"",height:200,lat:"48.856614",lng:"2.3522219",zoom:12};this.getName=function(){return"map"};this.getIcon=function(){return"fa-map-o"};this.onClick=false;this.getToolbarButtons=function(){var a=this;return{options:{click:function(c,b){a.openOptionsForm(c,b)}}}};this.getOptionsFormSettings=function(){var a=this;return{onCreate:function(b){$("a.find-coords",b).click(function(c){c.preventDefault();cms.showPromptDialog(a.lang("addressEnter"),a.lang("address"),function(d){a.loadApi(function(e){var f=new e.maps.Geocoder();f.geocode({address:d},function(i,g){if(g!==e.maps.GeocoderStatus.OK){cms.showMessageDialog(a.lang("addressError"));return}var j=i[0].geometry.location.lat();var h=i[0].geometry.location.lng();$(".m-lat",b).val(j);$(".m-lng",b).val(h)})})})})}}};this.onInitWidget=function(c){var a=this.getMapId(c);var b=this;this.loadApi(function(d){b.initWidgetMap(a,c,d)})};this.onCreateWidget=function(c){c.options=$.extend({},this.defaultOptions,c.options);var a=this.getMapId(c);var d=this.getMapCanvas(c);this.dom(c).append(d);var b=this;this.loadApi(function(e){b.initWidgetMap(a,c,e)});return c};this.initWidgetMap=function(c,d,b){var a=new b.maps.LatLng(d.options.lat,d.options.lng);var e=new b.maps.Map(this.dom(d).find("#"+c)[0],{center:a,zoom:Number(d.options.zoom)});e.marker=new b.maps.Marker({map:e,position:a,draggable:true});b.maps.event.addListener(e,"zoom_changed",function(){e.widget.options.zoom=e.getZoom()});b.maps.event.addListener(e.marker,"dragend",function(){var f=e.marker.getPosition();e.widget.options.lat=f.lat();e.widget.options.lng=f.lng();e.setCenter(f)});e.widget=d;this.mapsObjects[c]=e};this.applyOptions=function(c,a){var b=this.getMapId(c);var e=$("#"+b,this.dom(c));var d=this.mapsObjects[b];if(a.width){e.css({width:a.width})}else{e.css({width:""})}if(a.height){e.css({height:a.height})}else{e.css({height:200})}this.loadApi(function(g){var f=new g.maps.LatLng(a.lat,a.lng);g.maps.event.trigger(d,"resize");d.setZoom(Number(a.zoom));d.setCenter(f);d.marker.setPosition(f)})};this.loaded=function(){this.isApiLoaded=true;var a=cms.getFrameWindow().google;while(this.callbacks.length>0){var b=this.callbacks.pop();b(a)}};this.loadApi=function(b){if(this.isApiLoaded){var a=cms.getFrameWindow().google;b(a);return}this.callbacks.push(b);if(!this.isApiLoadInProgress){cms.injectScript("http://maps.googleapis.com/maps/api/js?callback=parent.cms.widgetHandlers.map.loaded&language="+cms.getLanguage());this.isApiLoadInProgress=true}};this.getContent=function(a){return this.getMapCanvas(a)[0].outerHTML};this.getMapId=function(a){return a.domId+"-map"};this.getMapCanvas=function(b){var a=this.getMapId(b);var c=$("<div></div>").attr("id",a).addClass("map-canvas").css({height:b.options.height,width:b.options.width});return c}});
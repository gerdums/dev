function ClusterIcon(t,e){t.getMarkerClusterer().extend(ClusterIcon,google.maps.OverlayView),this.cluster_=t,this.className_=t.getMarkerClusterer().getClusterClass(),this.styles_=e,this.center_=null,this.div_=null,this.sums_=null,this.visible_=!1,this.setMap(t.getMap())}function Cluster(t){this.markerClusterer_=t,this.map_=t.getMap(),this.gridSize_=t.getGridSize(),this.minClusterSize_=t.getMinimumClusterSize(),this.averageCenter_=t.getAverageCenter(),this.markers_=[],this.center_=null,this.bounds_=null,this.clusterIcon_=new ClusterIcon(this,t.getStyles())}function MarkerClusterer(t,e,i){this.extend(MarkerClusterer,google.maps.OverlayView),e=e||[],i=i||{},this.markers_=[],this.clusters_=[],this.listeners_=[],this.activeMap_=null,this.ready_=!1,this.gridSize_=i.gridSize||60,this.minClusterSize_=i.minimumClusterSize||2,this.maxZoom_=i.maxZoom||null,this.styles_=i.styles||[],this.title_=i.title||"",this.zoomOnClick_=!0,void 0!==i.zoomOnClick&&(this.zoomOnClick_=i.zoomOnClick),this.averageCenter_=!1,void 0!==i.averageCenter&&(this.averageCenter_=i.averageCenter),this.ignoreHidden_=!1,void 0!==i.ignoreHidden&&(this.ignoreHidden_=i.ignoreHidden),this.enableRetinaIcons_=!1,void 0!==i.enableRetinaIcons&&(this.enableRetinaIcons_=i.enableRetinaIcons),this.imagePath_=i.imagePath||MarkerClusterer.IMAGE_PATH,this.imageExtension_=i.imageExtension||MarkerClusterer.IMAGE_EXTENSION,this.imageSizes_=i.imageSizes||MarkerClusterer.IMAGE_SIZES,this.calculator_=i.calculator||MarkerClusterer.CALCULATOR,this.batchSize_=i.batchSize||MarkerClusterer.BATCH_SIZE,this.batchSizeIE_=i.batchSizeIE||MarkerClusterer.BATCH_SIZE_IE,this.clusterClass_=i.clusterClass||"cluster",-1!==navigator.userAgent.toLowerCase().indexOf("msie")&&(this.batchSize_=this.batchSizeIE_),this.setupStyles_(),this.addMarkers(e,!0),this.setMap(t)}ClusterIcon.prototype.onAdd=function(){var t,e,i=this;this.div_=document.createElement("div"),this.div_.className=this.className_,this.visible_&&this.show(),this.getPanes().overlayMouseTarget.appendChild(this.div_),this.boundsChangedListener_=google.maps.event.addListener(this.getMap(),"bounds_changed",function(){e=t}),google.maps.event.addDomListener(this.div_,"mousedown",function(){t=!0,e=!1}),google.maps.event.addDomListener(this.div_,"click",function(s){if(t=!1,!e){var o,n,r=i.cluster_.getMarkerClusterer();google.maps.event.trigger(r,"click",i.cluster_),google.maps.event.trigger(r,"clusterclick",i.cluster_),r.getZoomOnClick()&&(n=r.getMaxZoom(),o=i.cluster_.getBounds(),r.getMap().fitBounds(o),setTimeout(function(){r.getMap().fitBounds(o),null!==n&&r.getMap().getZoom()>n&&r.getMap().setZoom(n+1)},100)),s.cancelBubble=!0,s.stopPropagation&&s.stopPropagation()}}),google.maps.event.addDomListener(this.div_,"mouseover",function(){var t=i.cluster_.getMarkerClusterer();google.maps.event.trigger(t,"mouseover",i.cluster_)}),google.maps.event.addDomListener(this.div_,"mouseout",function(){var t=i.cluster_.getMarkerClusterer();google.maps.event.trigger(t,"mouseout",i.cluster_)})},ClusterIcon.prototype.onRemove=function(){this.div_&&this.div_.parentNode&&(this.hide(),google.maps.event.removeListener(this.boundsChangedListener_),google.maps.event.clearInstanceListeners(this.div_),this.div_.parentNode.removeChild(this.div_),this.div_=null)},ClusterIcon.prototype.draw=function(){if(this.visible_){var t=this.getPosFromLatLng_(this.center_);this.div_.style.top=t.y+"px",this.div_.style.left=t.x+"px"}},ClusterIcon.prototype.hide=function(){this.div_&&(this.div_.style.display="none"),this.visible_=!1},ClusterIcon.prototype.show=function(){if(this.div_){var t="",e=this.backgroundPosition_.split(" "),i=parseInt(e[0].replace(/^\s+|\s+$/g,""),10),s=parseInt(e[1].replace(/^\s+|\s+$/g,""),10),o=this.getPosFromLatLng_(this.center_);this.div_.style.cssText=this.createCss(o),t="<img src='"+this.url_+"' style='position: absolute; top: "+s+"px; left: "+i+"px; ",this.cluster_.getMarkerClusterer().enableRetinaIcons_||(t+="clip: rect("+-1*s+"px, "+(-1*i+this.width_)+"px, "+(-1*s+this.height_)+"px, "+-1*i+"px);"),t+="'>",this.div_.innerHTML=t+"<div style='position: absolute;top: "+this.anchorText_[0]+"px;left: "+this.anchorText_[1]+"px;color: "+this.textColor_+";font-size: "+this.textSize_+"px;font-family: "+this.fontFamily_+";font-weight: "+this.fontWeight_+";font-style: "+this.fontStyle_+";text-decoration: "+this.textDecoration_+";text-align: center;width: "+this.width_+"px;line-height:"+this.height_+"px;'>"+this.sums_.text+"</div>","undefined"==typeof this.sums_.title||""===this.sums_.title?this.div_.title=this.cluster_.getMarkerClusterer().getTitle():this.div_.title=this.sums_.title,this.div_.style.display=""}this.visible_=!0},ClusterIcon.prototype.useStyle=function(t){this.sums_=t;var e=Math.max(0,t.index-1);e=Math.min(this.styles_.length-1,e);var i=this.styles_[e];this.url_=i.url,this.height_=i.height,this.width_=i.width,this.anchorText_=i.anchorText||[0,0],this.anchorIcon_=i.anchorIcon||[parseInt(this.height_/2,10),parseInt(this.width_/2,10)],this.textColor_=i.textColor||"black",this.textSize_=i.textSize||11,this.textDecoration_=i.textDecoration||"none",this.fontWeight_=i.fontWeight||"bold",this.fontStyle_=i.fontStyle||"normal",this.fontFamily_=i.fontFamily||"Arial,sans-serif",this.backgroundPosition_=i.backgroundPosition||"0 0"},ClusterIcon.prototype.setCenter=function(t){this.center_=t},ClusterIcon.prototype.createCss=function(t){var e=[];return e.push("cursor: pointer;"),e.push("position: absolute; top: "+t.y+"px; left: "+t.x+"px;"),e.push("width: "+this.width_+"px; height: "+this.height_+"px;"),e.join("")},ClusterIcon.prototype.getPosFromLatLng_=function(t){var e=this.getProjection().fromLatLngToDivPixel(t);return e.x-=this.anchorIcon_[1],e.y-=this.anchorIcon_[0],e.x=parseInt(e.x,10),e.y=parseInt(e.y,10),e},Cluster.prototype.getSize=function(){return this.markers_.length},Cluster.prototype.getMarkers=function(){return this.markers_},Cluster.prototype.getCenter=function(){return this.center_},Cluster.prototype.getMap=function(){return this.map_},Cluster.prototype.getMarkerClusterer=function(){return this.markerClusterer_},Cluster.prototype.getBounds=function(){var t,e=new google.maps.LatLngBounds(this.center_,this.center_),i=this.getMarkers();for(t=0;t<i.length;t++)e.extend(i[t].getPosition());return e},Cluster.prototype.remove=function(){this.clusterIcon_.setMap(null),this.markers_=[],delete this.markers_},Cluster.prototype.addMarker=function(t){var e,i,s;if(this.isMarkerAlreadyAdded_(t))return!1;if(this.center_){if(this.averageCenter_){var o=this.markers_.length+1,n=(this.center_.lat()*(o-1)+t.getPosition().lat())/o,r=(this.center_.lng()*(o-1)+t.getPosition().lng())/o;this.center_=new google.maps.LatLng(n,r),this.calculateBounds_()}}else this.center_=t.getPosition(),this.calculateBounds_();if(t.isAdded=!0,this.markers_.push(t),i=this.markers_.length,s=this.markerClusterer_.getMaxZoom(),null!==s&&this.map_.getZoom()>s)t.getMap()!==this.map_&&t.setMap(this.map_);else if(i<this.minClusterSize_)t.getMap()!==this.map_&&t.setMap(this.map_);else if(i===this.minClusterSize_)for(e=0;i>e;e++)this.markers_[e].setMap(null);else t.setMap(null);return this.updateIcon_(),!0},Cluster.prototype.isMarkerInClusterBounds=function(t){return this.bounds_.contains(t.getPosition())},Cluster.prototype.calculateBounds_=function(){var t=new google.maps.LatLngBounds(this.center_,this.center_);this.bounds_=this.markerClusterer_.getExtendedBounds(t)},Cluster.prototype.updateIcon_=function(){var t=this.markers_.length,e=this.markerClusterer_.getMaxZoom();if(null!==e&&this.map_.getZoom()>e)return void this.clusterIcon_.hide();if(t<this.minClusterSize_)return void this.clusterIcon_.hide();var i=this.markerClusterer_.getStyles().length,s=this.markerClusterer_.getCalculator()(this.markers_,i);this.clusterIcon_.setCenter(this.center_),this.clusterIcon_.useStyle(s),this.clusterIcon_.show()},Cluster.prototype.isMarkerAlreadyAdded_=function(t){var e;if(this.markers_.indexOf)return-1!==this.markers_.indexOf(t);for(e=0;e<this.markers_.length;e++)if(t===this.markers_[e])return!0;return!1},MarkerClusterer.prototype.onAdd=function(){var t=this;this.activeMap_=this.getMap(),this.ready_=!0,this.repaint(),this.listeners_=[google.maps.event.addListener(this.getMap(),"zoom_changed",function(){t.resetViewport_(!1),(this.getZoom()===(this.get("minZoom")||0)||this.getZoom()===this.get("maxZoom"))&&google.maps.event.trigger(this,"idle")}),google.maps.event.addListener(this.getMap(),"idle",function(){t.redraw_()})]},MarkerClusterer.prototype.onRemove=function(){var t;for(t=0;t<this.markers_.length;t++)this.markers_[t].getMap()!==this.activeMap_&&this.markers_[t].setMap(this.activeMap_);for(t=0;t<this.clusters_.length;t++)this.clusters_[t].remove();for(this.clusters_=[],t=0;t<this.listeners_.length;t++)google.maps.event.removeListener(this.listeners_[t]);this.listeners_=[],this.activeMap_=null,this.ready_=!1},MarkerClusterer.prototype.draw=function(){},MarkerClusterer.prototype.setupStyles_=function(){var t,e;if(!(this.styles_.length>0))for(t=0;t<this.imageSizes_.length;t++)e=this.imageSizes_[t],this.styles_.push({url:this.imagePath_+(t+1)+"."+this.imageExtension_,height:e,width:e})},MarkerClusterer.prototype.fitMapToMarkers=function(){var t,e=this.getMarkers(),i=new google.maps.LatLngBounds;for(t=0;t<e.length;t++)i.extend(e[t].getPosition());this.getMap().fitBounds(i)},MarkerClusterer.prototype.getGridSize=function(){return this.gridSize_},MarkerClusterer.prototype.setGridSize=function(t){this.gridSize_=t},MarkerClusterer.prototype.getMinimumClusterSize=function(){return this.minClusterSize_},MarkerClusterer.prototype.setMinimumClusterSize=function(t){this.minClusterSize_=t},MarkerClusterer.prototype.getMaxZoom=function(){return this.maxZoom_},MarkerClusterer.prototype.setMaxZoom=function(t){this.maxZoom_=t},MarkerClusterer.prototype.getStyles=function(){return this.styles_},MarkerClusterer.prototype.setStyles=function(t){this.styles_=t},MarkerClusterer.prototype.getTitle=function(){return this.title_},MarkerClusterer.prototype.setTitle=function(t){this.title_=t},MarkerClusterer.prototype.getZoomOnClick=function(){return this.zoomOnClick_},MarkerClusterer.prototype.setZoomOnClick=function(t){this.zoomOnClick_=t},MarkerClusterer.prototype.getAverageCenter=function(){return this.averageCenter_},MarkerClusterer.prototype.setAverageCenter=function(t){this.averageCenter_=t},MarkerClusterer.prototype.getIgnoreHidden=function(){return this.ignoreHidden_},MarkerClusterer.prototype.setIgnoreHidden=function(t){this.ignoreHidden_=t},MarkerClusterer.prototype.getEnableRetinaIcons=function(){return this.enableRetinaIcons_},MarkerClusterer.prototype.setEnableRetinaIcons=function(t){this.enableRetinaIcons_=t},MarkerClusterer.prototype.getImageExtension=function(){return this.imageExtension_},MarkerClusterer.prototype.setImageExtension=function(t){this.imageExtension_=t},MarkerClusterer.prototype.getImagePath=function(){return this.imagePath_},MarkerClusterer.prototype.setImagePath=function(t){this.imagePath_=t},MarkerClusterer.prototype.getImageSizes=function(){return this.imageSizes_},MarkerClusterer.prototype.setImageSizes=function(t){this.imageSizes_=t},MarkerClusterer.prototype.getCalculator=function(){return this.calculator_},MarkerClusterer.prototype.setCalculator=function(t){this.calculator_=t},MarkerClusterer.prototype.getBatchSizeIE=function(){return this.batchSizeIE_},MarkerClusterer.prototype.setBatchSizeIE=function(t){this.batchSizeIE_=t},MarkerClusterer.prototype.getClusterClass=function(){return this.clusterClass_},MarkerClusterer.prototype.setClusterClass=function(t){this.clusterClass_=t},MarkerClusterer.prototype.getMarkers=function(){return this.markers_},MarkerClusterer.prototype.getTotalMarkers=function(){return this.markers_.length},MarkerClusterer.prototype.getClusters=function(){return this.clusters_},MarkerClusterer.prototype.getTotalClusters=function(){return this.clusters_.length},MarkerClusterer.prototype.addMarker=function(t,e){this.pushMarkerTo_(t),e||this.redraw_()},MarkerClusterer.prototype.addMarkers=function(t,e){var i;for(i in t)t.hasOwnProperty(i)&&this.pushMarkerTo_(t[i]);e||this.redraw_()},MarkerClusterer.prototype.pushMarkerTo_=function(t){if(t.getDraggable()){var e=this;google.maps.event.addListener(t,"dragend",function(){e.ready_&&(this.isAdded=!1,e.repaint())})}t.isAdded=!1,this.markers_.push(t)},MarkerClusterer.prototype.removeMarker=function(t,e){var i=this.removeMarker_(t);return!e&&i&&this.repaint(),i},MarkerClusterer.prototype.removeMarkers=function(t,e){var i,s,o=!1;for(i=0;i<t.length;i++)s=this.removeMarker_(t[i]),o=o||s;return!e&&o&&this.repaint(),o},MarkerClusterer.prototype.removeMarker_=function(t){var e,i=-1;if(this.markers_.indexOf)i=this.markers_.indexOf(t);else for(e=0;e<this.markers_.length;e++)if(t===this.markers_[e]){i=e;break}return-1===i?!1:(t.setMap(null),this.markers_.splice(i,1),!0)},MarkerClusterer.prototype.clearMarkers=function(){this.resetViewport_(!0),this.markers_=[]},MarkerClusterer.prototype.repaint=function(){var t=this.clusters_.slice();this.clusters_=[],this.resetViewport_(!1),this.redraw_(),setTimeout(function(){var e;for(e=0;e<t.length;e++)t[e].remove()},0)},MarkerClusterer.prototype.getExtendedBounds=function(t){var e=this.getProjection(),i=new google.maps.LatLng(t.getNorthEast().lat(),t.getNorthEast().lng()),s=new google.maps.LatLng(t.getSouthWest().lat(),t.getSouthWest().lng()),o=e.fromLatLngToDivPixel(i);o.x+=this.gridSize_,o.y-=this.gridSize_;var n=e.fromLatLngToDivPixel(s);n.x-=this.gridSize_,n.y+=this.gridSize_;var r=e.fromDivPixelToLatLng(o),a=e.fromDivPixelToLatLng(n);return t.extend(r),t.extend(a),t},MarkerClusterer.prototype.redraw_=function(){this.createClusters_(0)},MarkerClusterer.prototype.resetViewport_=function(t){var e,i;for(e=0;e<this.clusters_.length;e++)this.clusters_[e].remove();for(this.clusters_=[],e=0;e<this.markers_.length;e++)i=this.markers_[e],i.isAdded=!1,t&&i.setMap(null)},MarkerClusterer.prototype.distanceBetweenPoints_=function(t,e){var i=6371,s=(e.lat()-t.lat())*Math.PI/180,o=(e.lng()-t.lng())*Math.PI/180,n=Math.sin(s/2)*Math.sin(s/2)+Math.cos(t.lat()*Math.PI/180)*Math.cos(e.lat()*Math.PI/180)*Math.sin(o/2)*Math.sin(o/2),r=2*Math.atan2(Math.sqrt(n),Math.sqrt(1-n)),a=i*r;return a},MarkerClusterer.prototype.isMarkerInBounds_=function(t,e){return e.contains(t.getPosition())},MarkerClusterer.prototype.addToClosestCluster_=function(t){var e,i,s,o,n=4e4,r=null;for(e=0;e<this.clusters_.length;e++)s=this.clusters_[e],o=s.getCenter(),o&&(i=this.distanceBetweenPoints_(o,t.getPosition()),n>i&&(n=i,r=s));r&&r.isMarkerInClusterBounds(t)?r.addMarker(t):(s=new Cluster(this),s.addMarker(t),this.clusters_.push(s))},MarkerClusterer.prototype.createClusters_=function(t){var e,i,s,o=this;if(this.ready_){0===t&&(google.maps.event.trigger(this,"clusteringbegin",this),"undefined"!=typeof this.timerRefStatic&&(clearTimeout(this.timerRefStatic),delete this.timerRefStatic)),s=this.getMap().getZoom()>3?new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(),this.getMap().getBounds().getNorthEast()):new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472,-178.48388434375),new google.maps.LatLng(-85.08136444384544,178.00048865625));var n=this.getExtendedBounds(s),r=Math.min(t+this.batchSize_,this.markers_.length);for(e=t;r>e;e++)i=this.markers_[e],!i.isAdded&&this.isMarkerInBounds_(i,n)&&(!this.ignoreHidden_||this.ignoreHidden_&&i.getVisible())&&this.addToClosestCluster_(i);r<this.markers_.length?this.timerRefStatic=setTimeout(function(){o.createClusters_(r)},0):(delete this.timerRefStatic,google.maps.event.trigger(this,"clusteringend",this))}},MarkerClusterer.prototype.extend=function(t,e){return function(t){var e;for(e in t.prototype)this.prototype[e]=t.prototype[e];return this}.apply(t,[e])},MarkerClusterer.CALCULATOR=function(t,e){for(var i=0,s="",o=t.length.toString(),n=o;0!==n;)n=parseInt(n/10,10),i++;return i=Math.min(i,e),{text:o,index:i,title:s}},MarkerClusterer.BATCH_SIZE=2e3,MarkerClusterer.BATCH_SIZE_IE=500,MarkerClusterer.IMAGE_PATH="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/images/m",MarkerClusterer.IMAGE_EXTENSION="png",MarkerClusterer.IMAGE_SIZES=[53,56,66,78,90];
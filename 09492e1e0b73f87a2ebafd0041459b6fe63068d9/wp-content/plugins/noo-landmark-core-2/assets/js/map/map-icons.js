var MAP_PIN='M0-55.24A20.57,20.57,0,0,0-20.57-34.68C-20.57-23.6-6-6-1.4-.63A1.85,1.85,0,0,0,0,0,1.85,1.85,0,0,0,1.4-.64C6-6,20.57-23.67,20.57-34.68A20.57,20.57,0,0,0,0-55.24Z';var inherits=function(childCtor,parentCtor){function tempCtor(){};tempCtor.prototype=parentCtor.prototype;childCtor.superClass_=parentCtor.prototype;childCtor.prototype=new tempCtor();childCtor.prototype.constructor=childCtor;};function Marker(options){google.maps.Marker.apply(this,arguments);if(options.map_icon_label){this.MarkerLabel=new MarkerLabel({map:this.map,marker:this,text:options.map_icon_label});this.MarkerLabel.bindTo('position',this,'position');}}
inherits(Marker,google.maps.Marker);Marker.prototype.setMap=function(){google.maps.Marker.prototype.setMap.apply(this,arguments);(this.MarkerLabel)&&this.MarkerLabel.setMap.apply(this.MarkerLabel,arguments);};var MarkerLabel=function(options){var self=this;this.setValues(options);this.div=document.createElement('div');this.div.className='map-icon-label';google.maps.event.addDomListener(this.div,'click',function(e){(e.stopPropagation)&&e.stopPropagation();google.maps.event.trigger(self.marker,'click');});};MarkerLabel.prototype=new google.maps.OverlayView;MarkerLabel.prototype.onAdd=function(){var pane=this.getPanes().overlayImage.appendChild(this.div);var self=this;this.listeners=[google.maps.event.addListener(this,'position_changed',function(){self.draw();}),google.maps.event.addListener(this,'text_changed',function(){self.draw();}),google.maps.event.addListener(this,'zindex_changed',function(){self.draw();})];};MarkerLabel.prototype.onRemove=function(){if(this.div.parentNode){this.div.parentNode.removeChild(this.div);for(var i=0,I=this.listeners.length;i<I;++i){google.maps.event.removeListener(this.listeners[i]);}}};MarkerLabel.prototype.draw=function(){var projection=this.getProjection();var position=projection.fromLatLngToDivPixel(this.get('position'));var div=this.div;this.div.innerHTML=this.get('text').toString();div.style.zIndex=this.get('zIndex');div.style.position='absolute';div.style.display='block';div.style.left=(position.x-(div.offsetWidth/2)+2)+'px';div.style.top=(position.y-div.offsetHeight-25)+'px';};
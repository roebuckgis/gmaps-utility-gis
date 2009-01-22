(function(){var j=function(a){var b;switch(a){case'thin':b="2px";break;case'medium':b="4px";break;case'thick':b="6px";break;default:b=a}return b};var l=function(h){var b;var a={};if(document.defaultView&&document.defaultView.getComputedStyle){b=h.ownerDocument.defaultView.getComputedStyle(h,"");if(b){a.top=parseInt(b.borderTopWidth,10)||0;a.bottom=parseInt(b.borderBottomWidth,10)||0;a.left=parseInt(b.borderLeftWidth,10)||0;a.right=parseInt(b.borderRightWidth,10)||0;return a}}else if(document.documentElement.currentStyle){if(h.currentStyle){a.top=parseInt(j(h.currentStyle.borderTopWidth),10)||0;a.bottom=parseInt(j(h.currentStyle.borderBottomWidth),10)||0;a.left=parseInt(j(h.currentStyle.borderLeftWidth),10)||0;a.right=parseInt(j(h.currentStyle.borderRightWidth),10)||0;return a}}a.top=parseInt(h.style["border-top-width"],10)||0;a.bottom=parseInt(h.style["border-bottom-width"],10)||0;a.left=parseInt(h.style["border-left-width"],10)||0;a.right=parseInt(h.style["border-right-width"],10)||0;return a};var k=function(e){var a=0,posY=0;e=e||window.event;if(typeof e.pageX!=="undefined"){a=e.pageX;posY=e.pageY}else if(typeof e.clientX!=="undefined"){a=e.clientX+(typeof document.documentElement.scrollLeft!=="undefined"?document.documentElement.scrollLeft:document.body.scrollLeft);posY=e.clientY+(typeof document.documentElement.scrollTop!=="undefined"?document.documentElement.scrollTop:document.body.scrollTop)}return{left:a,top:posY}};var o=function(h){var a=h.offsetLeft;var b=h.offsetTop;var c=h.offsetParent;while(c!==null){if(c!==document.body&&c!==document.documentElement){a-=c.scrollLeft;b-=c.scrollTop}a+=c.offsetLeft;b+=c.offsetTop;c=c.offsetParent}return{left:a,top:b}};var m=function(a,b){if(a&&b){for(var x in b){if(b.hasOwnProperty(x)){a[x]=b[x]}}}return a};var n=function(a,b){if(typeof b!=='undefined'){a.style.opacity=b}if(typeof a.style.opacity!=='undefined'){a.style.filter="alpha(opacity="+(a.style.opacity*100)+")"}};function DragZoom(b,a){this.map_=b;a=a||{};this.key_=a.key||'shift';this.key_=this.key_.toLowerCase();this.borderWidths_=l(this.map_.getContainer());this.paneDiv_=document.createElement("div");this.paneDiv_.onselectstart=function(){return false};m(this.paneDiv_.style,{backgroundColor:'white',opacity:0.0,cursor:'crosshair'});m(this.paneDiv_.style,a.paneStyle);m(this.paneDiv_.style,{position:'absolute',overflow:'hidden',zIndex:101,display:'none'});if(this.key_==='shift'){this.paneDiv_.style.MozUserSelect="none"}n(this.paneDiv_);if(this.paneDiv_.style.backgroundColor==='transparent'){this.paneDiv_.style.backgroundColor='white';n(this.paneDiv_,0)}this.map_.getContainer().appendChild(this.paneDiv_);this.boxDiv_=document.createElement('div');m(this.boxDiv_.style,{border:'thin solid #FF0000'});m(this.boxDiv_.style,a.boxStyle);m(this.boxDiv_.style,{position:'absolute',display:'none'});n(this.boxDiv_);this.map_.getContainer().appendChild(this.boxDiv_);this.boxBorderWidths_=l(this.boxDiv_);this.keyDownListener_=GEvent.bindDom(document,'keydown',this,this.onKeyDown_);this.keyUpListener_=GEvent.bindDom(document,'keyup',this,this.onKeyUp_);this.mouseDownListener_=GEvent.bindDom(this.paneDiv_,'mousedown',this,this.onMouseDown_);this.mouseMoveListener_=GEvent.bindDom(document,'mousemove',this,this.onMouseMove_);this.mouseUpListener_=GEvent.bindDom(document,'mouseup',this,this.onMouseUp_);this.hotKeyDown_=false;this.dragging_=false;this.startPt_=null;this.endPt_=null;this.mapPosn_=null;this.boxMaxX_=null;this.boxMaxY_=null}DragZoom.prototype.isHotKeyDown_=function(e){var a;e=e||window.event;a=(e.shiftKey&&this.key_==='shift')||(e.altKey&&this.key_==='alt')||(e.ctrlKey&&this.key_==='ctrl');if(!a){switch(e.keyCode){case 16:if(this.key_==='shift'){a=true}break;case 17:if(this.key_==='ctrl'){a=true}break;case 18:if(this.key_==='alt'){a=true}break}}return a};DragZoom.prototype.onKeyDown_=function(e){if(this.map_&&!this.hotKeyDown_&&this.isHotKeyDown_(e)){this.hotKeyDown_=true;var a=this.map_.getSize();this.paneDiv_.style.left=0+'px';this.paneDiv_.style.top=0+'px';this.paneDiv_.style.width=a.width-(this.borderWidths_.left+this.borderWidths_.right)+'px';this.paneDiv_.style.height=a.height-(this.borderWidths_.top+this.borderWidths_.bottom)+'px';this.paneDiv_.style.display='block';this.boxMaxX_=parseInt(this.paneDiv_.style.width,10)-(this.boxBorderWidths_.left+this.boxBorderWidths_.right);this.boxMaxY_=parseInt(this.paneDiv_.style.height,10)-(this.boxBorderWidths_.top+this.boxBorderWidths_.bottom);GEvent.trigger(this,'activate')}};DragZoom.prototype.getMousePoint_=function(e){var a=k(e);var p=new GPoint();p.x=a.left-this.mapPosn_.left-this.borderWidths_.left;p.y=a.top-this.mapPosn_.top-this.borderWidths_.top;p.x=Math.min(p.x,this.boxMaxX_);p.y=Math.min(p.y,this.boxMaxY_);p.x=Math.max(p.x,0);p.y=Math.max(p.y,0);return p};DragZoom.prototype.onMouseDown_=function(e){if(this.map_&&this.hotKeyDown_){this.mapPosn_=o(this.map_.getContainer());this.dragging_=true;this.startPt_=this.endPt_=this.getMousePoint_(e);var a=this.map_.fromContainerPixelToLatLng(this.startPt_);GEvent.trigger(this,'dragstart',a)}};DragZoom.prototype.onMouseMove_=function(e){if(this.dragging_){this.endPt_=this.getMousePoint_(e);var b=Math.min(this.startPt_.x,this.endPt_.x);var a=Math.min(this.startPt_.y,this.endPt_.y);var c=Math.abs(this.startPt_.x-this.endPt_.x);var d=Math.abs(this.startPt_.y-this.endPt_.y);this.boxDiv_.style.left=b+'px';this.boxDiv_.style.top=a+'px';this.boxDiv_.style.width=c+'px';this.boxDiv_.style.height=d+'px';this.boxDiv_.style.display='block';GEvent.trigger(this,'drag',new GPoint(b,a+d),new GPoint(b+c,a))}};DragZoom.prototype.onMouseUp_=function(e){if(this.dragging_){var g=Math.min(this.startPt_.x,this.endPt_.x);var c=Math.min(this.startPt_.y,this.endPt_.y);var h=Math.abs(this.startPt_.x-this.endPt_.x);var a=Math.abs(this.startPt_.y-this.endPt_.y);var b=this.map_.fromContainerPixelToLatLng(new GPoint(g,c+a));var f=this.map_.fromContainerPixelToLatLng(new GPoint(g+h,c));var d=new GLatLngBounds(b,f);var i=this.map_.getBoundsZoomLevel(d);this.map_.setCenter(d.getCenter(),i);this.dragging_=false;this.boxDiv_.style.display='none';GEvent.trigger(this,'dragend',d)}};DragZoom.prototype.onKeyUp_=function(e){if(this.map_&&this.hotKeyDown_){this.hotKeyDown_=false;this.dragging_=false;this.boxDiv_.style.display='none';this.paneDiv_.style.display="none";GEvent.trigger(this,'deactivate')}};GMap2.prototype.enableKeyDragZoom=function(a){this.dragZoom_=new DragZoom(this,a)};GMap2.prototype.disableKeyDragZoom=function(){var d=this.dragZoom_;if(d){GEvent.removeListener(d.mouseDownListener_);GEvent.removeListener(d.mouseMoveListener_);GEvent.removeListener(d.mouseUpListener_);GEvent.removeListener(d.keyUpListener_);GEvent.removeListener(d.keyDownListener_);this.getContainer().removeChild(d.boxDiv_);this.getContainer().removeChild(d.paneDiv_);this.dragZoom_=null}};GMap2.prototype.keyDragZoomEnabled=function(){return this.dragZoom_!==null};GMap2.prototype.getDragZoomObject=function(){return this.dragZoom_}})();
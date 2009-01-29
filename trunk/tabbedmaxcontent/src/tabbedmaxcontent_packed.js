(function(){var j={tabBar:{background:'#F4F4F4 none repeat scroll 0 0',borderBottom:'1px solid #B0B0B0',padding:'6px 8px 4px',marginRight:'13px',whiteSpace:'nowrap',verticalAlign:'bottom'},tabLeft:{},tabRight:{},tabOn:{background:'#FFFFFF none repeat scroll 0 0',padding:'6px 8px 4px',borderTop:'1px solid #B0B0B0',borderLeft:'1px solid #B0B0B0',borderRight:'1px solid #B0B0B0',borderBottom:'2px solid #FFFFFF',color:'#000000',textDecoration:'none',fontWeight:'bold'},tabOff:{background:'#F4F4F4 none repeat scroll 0 0',padding:'6px 8px 4px',color:'#0000FF',border:'none',textDecoration:'underline',fontWeight:'normal'},content:{borderStyle:'none solid solid solid',borderWidth:'1px',borderColor:'#B0B0B0',borderTop:'none',overflow:'auto'},summary:{overflow:'auto',marginBottom:'5px'}};var l=function(a,b){if(a&&b){for(var x in b){if(b.hasOwnProperty(x)){if(a[x]&&typeof b[x]==='object'){a[x]=l(a[x],b[x])}else{a[x]=b[x]}}}}return a};var k=function(f,e,a,c,d){var b=a;if(!a||(a&&typeof a==='string')){b=document.createElement(f);b.innerHTML=a||''}if(c){l(b.style,c)}if(e){l(b,e)}if(d){d.appendChild(b)}return b};var h=function(a,b){var d=0;var e=0;var c=a;while(c&&c!==b){d+=c.offsetLeft;e+=c.offsetTop;c=c.offsetParent}return{left:d,top:e}};function TabbedMaxContent(a){this.infoWindow_=a;GEvent.bind(a,'maximizeclick',this,this.onMaximizeClick_);GEvent.bind(a,'restoreclick',this,this.onRestoreClick_);GEvent.bind(a,'maximizeend',this,this.onMaximizeEnd_);this.style_={};this.maxNode_=null;this.summaryNode_=null;this.navsNode_=null;this.navNodes_=[];this.contentsNode_=null;this.contentNodes_=[]}TabbedMaxContent.prototype.initialize_=function(a,b,d){this.navNodes_=[];this.contentNodes_=[];this.selectedTab_=-1;if(this.maxNode_){GEvent.clearNode(this.maxNode_);this.maxNode_.innerHTML=''}else{this.maxNode_=k('div',{id:'maxcontent'})}d=d||{};var c=d.selectedTab||0;this.style_=l({},j);this.style_=l(this.style_,d.style);this.summaryNode_=k('div',null,a,this.style_.summary,this.maxNode_);this.navsNode_=k('div',null,null,this.style_.tabBar,this.maxNode_);this.contentsNode_=k('div',null,null,null,this.maxNode_);if(b&&b.length){k('span',null,null,this.style_.tabLeft,this.navsNode_);for(var i=0,ct=b.length;i<ct;i++){if(i===c||b[i].name===c){this.selectedTab_=i}this.navNodes_.push(k('span',null,b[i].name,this.style_.tabOff,this.navsNode_));var e=k('div',null,b[i].contentElem,this.style_.content,this.contentsNode_);e.style.display='none';e.name=b[i].name;this.contentNodes_.push(e)}k('span',null,null,this.style_.tabRight,this.navsNode_)}};TabbedMaxContent.prototype.onMaximizeClick_=function(){for(var i=0,ct=this.navNodes_.length;i<ct;i++){GEvent.addDomListener(this.navNodes_[i],'click',GEvent.callback(this,this.selectTab,i))}};TabbedMaxContent.prototype.onRestoreClick_=function(){if(this.maxNode_){GEvent.clearNode(this.maxNode_)}};TabbedMaxContent.prototype.onMaximizeEnd_=function(){this.checkResize()};TabbedMaxContent.prototype.selectTab=function(t){var a=false;for(var i=0,ct=this.navNodes_.length;i<ct;i++){if(i===t||this.contentNodes_[i].name===t){if(this.contentNodes_[i].style.display==='none'){l(this.navNodes_[i].style,this.style_.tabOn);this.contentNodes_[i].style.display='block';this.selectedTab_=i;a=true}}else{l(this.navNodes_[i].style,this.style_.tabOff);this.contentNodes_[i].style.display='none'}}if(a){GEvent.trigger(this,'selecttab',this.contentNodes_[this.selectedTab_].name,this.contentNodes_[this.selectedTab_])}};TabbedMaxContent.prototype.getTabContainer=function(t){for(var i=0,ct=this.contentNodes_.length;i<ct;i++){if(i===t||this.contentNodes_[i].name===t){return this.contentNodes_[i]}}};TabbedMaxContent.prototype.checkResize=function(){var c=this;var f=this.infoWindow_.getContentContainers()[0];var d=this.contentsNode_;var e=this.summaryNode_;var b=this.contentNodes_;setTimeout(function(){var a=h(d,f);for(var i=0,ct=b.length;i<ct;i++){b[i].style.width=f.style.width;b[i].style.height=(parseInt(f.style.height,10)-a.top)+'px'}c.selectTab(c.selectedTab_)},0)};GMap2.prototype.openInfoWindowMaxTabs=function(a,c,b,e,f){var g=this.getInfoWindowMaxContent();var d=f||{};g.initialize_(b,e,d);d.maxContent=g.maxNode_;if(d.style){delete d.style}if(d.selectedTab){delete d.selectedTab}c.style.marginTop='5px';this.openInfoWindow(a,c,d)};GMap2.prototype.openInfoWindowMaxTabsHtml=function(a,b,d,c,e){this.openInfoWindowMaxTabs(a,k('div',null,b),k('div',null,d),c,e)};GMap2.prototype.getInfoWindowMaxContent=function(){this.maxContent_=this.maxContent_||new TabbedMaxContent(this.getInfoWindow());return this.maxContent_};GMarker.prototype.openInfoWindowMaxTabsHtml=function(a,b,d,c,e){a.openInfoWindowMaxTabsHtml(this.getLatLng(),b,d,c,e)};GMarker.prototype.openInfoWindowMaxTabs=function(c,b,a,d,e){c.openInfoWindowMaxTabs(this.getLatLng(),b,a,d,e)}})();
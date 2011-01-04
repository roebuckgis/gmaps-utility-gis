(function(){/*
 http://google-maps-utility-library-v3.googlecode.com
*/
var j, k = Math.PI / 180, aa = 0;
window.ags_jsonp = window.ags_jsonp || {};
var l = google.maps, m, n, o, p = {da:null, X:false}, q = {}, r = {};
function s(a, b, c) {
  var d = b === "" ? 0 : a.indexOf(b);
  return a.substring(d + b.length, c === "" ? a.length : a.indexOf(c, d + b.length))
}
function t(a) {
  return a && typeof a === "string"
}
function u(a, b, c) {
  if(a && b) {
    var d;
    for(d in a) {
      if(c || !(d in b)) {
        b[d] = a[d]
      }
    }
  }
  return b
}
function v() {
  l.event.trigger.apply(this, arguments)
}
function ba(a, b) {
  var c = "";
  if(a) {
    c += a.getTime() - a.getTimezoneOffset() * 6E4
  }
  if(b) {
    c += ", " + (b.getTime() - b.getTimezoneOffset() * 6E4)
  }
  return c
}
function w(a, b) {
  b = Math.min(Math.max(b, 0), 1);
  if(a) {
    var c = a.style;
    if(typeof c.opacity !== "undefined") {
      c.opacity = b
    }
    if(typeof c.filters !== "undefined") {
      c.filters.alpha.opacity = Math.floor(100 * b)
    }
    if(typeof c.filter !== "undefined") {
      c.filter = "alpha(opacity:" + Math.floor(b * 100) + ")"
    }
  }
}
function ca(a) {
  var b = "";
  for(var c in a) {
    if(a.hasOwnProperty(c)) {
      if(b.length > 0) {
        b += ";"
      }
      b += c + ":" + a[c]
    }
  }
  return b
}
function da() {
  if(typeof XMLHttpRequest === "undefined") {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0")
    }catch(a) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0")
    }catch(b) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP")
    }catch(c) {
    }
    throw new Error("This browser does not support XMLHttpRequest.");
  }else {
    return new XMLHttpRequest
  }
}
var x = "esriGeometryPoint", y = "esriGeometryMultipoint", B = "esriGeometryPolyline", C = "esriGeometryPolygon", D = "esriGeometryEnvelope";
function ea(a) {
  var b = a;
  if(a && a.splice && a.length > 0) {
    b = a[0]
  }
  if(b instanceof l.LatLng || b instanceof l.Marker) {
    return a && a.splice && a.length > 1 ? y : x
  }else {
    if(b instanceof l.Polyline) {
      return B
    }else {
      if(b instanceof l.Polygon) {
        return C
      }else {
        if(b instanceof l.LatLngBounds) {
          return D
        }else {
          if(b.x !== undefined && b.y !== undefined) {
            return x
          }else {
            if(b.points) {
              return y
            }else {
              if(b.paths) {
                return B
              }else {
                if(b.rings) {
                  return C
                }
              }
            }
          }
        }
      }
    }
  }
  return null
}
function E(a) {
  var b = a;
  if(a && a.splice && a.length > 0) {
    b = a[0]
  }
  if(b && b.splice && b.length > 0) {
    b = b[0]
  }
  if(b instanceof l.LatLng || b instanceof l.Marker || b instanceof l.Polyline || b instanceof l.Polygon || b instanceof l.LatLngBounds) {
    return true
  }
  return false
}
function F(a, b) {
  for(var c = [], d, e = 0, f = a.getLength();e < f;e++) {
    d = a.getAt(e);
    c.push("[" + d.lng() + "," + d.lat() + "]")
  }
  b && c.length > 0 && c.push("[" + a.getAt(0).lng() + "," + a.getAt(0).lat() + "]");
  return c.join(",")
}
function G(a) {
  var b = q[a.spatialReference.wkid || a.spatialReference.wkt];
  b = b || m;
  var c = b.s([a.xmin, a.ymin]);
  a = b.s([a.xmax, a.ymax]);
  return new l.LatLngBounds(new l.LatLng(c[1], c[0]), new l.LatLng(a[1], a[0]))
}
function H(a) {
  var b;
  if(typeof a === "object") {
    if(a && a.splice) {
      b = [];
      for(var c = 0, d = a.length;c < d;c++) {
        b.push(H(a[c]))
      }
      return"[" + b.join(",") + "]"
    }else {
      if(E(a)) {
        var e;
        d = "{";
        switch(ea(a)) {
          case x:
            e = a && a.splice ? a[0] : a;
            if(e instanceof l.Marker) {
              e = e.getPosition()
            }
            d += "x:" + e.lng() + ",y:" + e.lat();
            break;
          case y:
            c = [];
            for(b = 0;b < a.length;b++) {
              e = a[b] instanceof l.Marker ? a[b].getPosition() : a[b];
              c.push("[" + e.lng() + "," + e.lat() + "]")
            }
            d += "points: [" + c.join(",") + "]";
            break;
          case B:
            c = [];
            a = a && a.splice ? a : [a];
            for(b = 0;b < a.length;b++) {
              c.push("[" + F(a[b].getPath()) + "]")
            }
            d += "paths:[" + c.join(",") + "]";
            break;
          case C:
            c = [];
            e = a && a.splice ? a[0] : a;
            a = e.getPaths();
            for(b = 0;b < a.getLength();b++) {
              c.push("[" + F(a.getAt(b), true) + "]")
            }
            d += "rings:[" + c.join(",") + "]";
            break;
          case D:
            e = a && a.splice ? a[0] : a;
            d += "xmin:" + e.getSouthWest().lng() + ",ymin:" + e.getSouthWest().lat() + ",xmax:" + e.getNorthEast().lng() + ",ymax:" + e.getNorthEast().lat();
            break
        }
        d += ", spatialReference:{wkid:4326}";
        d += "}";
        return d
      }else {
        if(a.toJSON) {
          return a.toJSON()
        }else {
          b = "";
          for(c in a) {
            if(a.hasOwnProperty(c)) {
              if(b.length > 0) {
                b += ", "
              }
              b += c + ":" + H(a[c])
            }
          }
          return"{" + b + "}"
        }
      }
    }
  }
  return a.toString()
}
function I(a) {
  var b = "";
  if(a) {
    a.f = a.f || "json";
    for(var c in a) {
      if(a.hasOwnProperty(c) && a[c] !== null && a[c] !== undefined) {
        var d = H(a[c]);
        b += c + "=" + (escape ? escape(d) : encodeURIComponent(d)) + "&"
      }
    }
  }
  return b
}
function fa(a, b) {
  for(var c = [], d = 2, e = arguments.length;d < e;d++) {
    c.push(arguments[d])
  }
  return function() {
    a.apply(b, c)
  }
}
function J(a, b, c) {
  b.G ? a.push(b.copyrightText) : l.event.addListenerOnce(b, "load", function() {
    K(c)
  })
}
function K(a) {
  var b = null;
  if(a) {
    var c = a.controls[l.ControlPosition.BOTTOM_RIGHT];
    if(c) {
      for(var d = 0, e = c.getLength();d < e;d++) {
        if(c.getAt(d).id === "agsCopyrights") {
          b = c.getAt(d);
          break
        }
      }
    }
    if(!b) {
      b = document.createElement("div");
      b.style.fontFamily = "Arial,sans-serif";
      b.style.fontSize = "10px";
      b.style.textAlign = "right";
      b.id = "agsCopyrights";
      a.controls[l.ControlPosition.BOTTOM_RIGHT].push(b);
      l.event.addListener(a, "maptypeid_changed", function() {
        K(a)
      })
    }
    var f = a.agsOverlays;
    c = [];
    if(f) {
      d = 0;
      for(e = f.getLength();d < e;d++) {
        J(c, f.getAt(d).c, a)
      }
    }
    var g = a.overlayMapTypes;
    if(g) {
      d = 0;
      for(e = g.getLength();d < e;d++) {
        f = g.getAt(d);
        if(f instanceof L) {
          for(var h = 0, i = f.q.length;h < i;h++) {
            J(c, f.q[h].c, a)
          }
        }
      }
    }
    f = a.mapTypes.get(a.getMapTypeId());
    if(f instanceof L) {
      d = 0;
      for(e = f.q.length;d < e;d++) {
        J(c, f.q[d].c, a)
      }
      b.style.color = f.ra ? "#ffffff" : "#000000"
    }
    b.innerHTML = c.join("<br/>")
  }
}
function M(a, b, c, d) {
  var e = "ags_jsonp_" + aa++ + "_" + Math.floor(Math.random() * 1E6), f = null;
  b = b || {};
  b[c || "callback"] = "ags_jsonp." + e;
  b = I(b);
  var g = document.getElementsByTagName("head")[0];
  if(!g) {
    throw new Error("document must have header tag");
  }
  window.ags_jsonp[e] = function() {
    window.ags_jsonp[e] && delete window.ags_jsonp[e];
    f && g.removeChild(f);
    f = null;
    d.apply(null, arguments);
    v(r, "jsonpend", e)
  };
  if((b + a).length < 2E3 && !p.X) {
    f = document.createElement("script");
    f.src = a + (a.indexOf("?") === -1 ? "?" : "&") + b;
    f.id = e;
    g.appendChild(f)
  }else {
    c = window.location;
    c = c.protocol + "//" + c.hostname + (!c.port || c.port === 80 ? "" : ":" + c.port + "/");
    var h = true;
    if(a.toLowerCase().indexOf(c.toLowerCase()) !== -1) {
      h = false
    }
    if(p.X) {
      h = true
    }
    if(h && !p.da) {
      throw new Error("No proxyUrl property in Config is defined");
    }
    var i = da();
    i.onreadystatechange = function() {
      if(i.readyState === 4) {
        if(i.status === 200) {
          eval(i.responseText)
        }else {
          throw new Error("Error code " + i.status);
        }
      }
    };
    i.open("POST", h ? p.da + "?" + a : a, true);
    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    i.send(b)
  }
  v(r, "jsonpstart", e);
  return e
}
r.qa = function(a, b, c, d) {
  M(a, b, c, d)
};
r.W = function(a, b) {
  if(b && b.splice) {
    for(var c, d = 0, e = b.length;d < e;d++) {
      if((c = b[d]) && c.splice) {
        r.W(a, c)
      }else {
        E(c) && c.setMap(a)
      }
    }
  }
};
r.ta = function(a, b) {
  r.W(null, a);
  if(b) {
    a.length = 0
  }
};
function N(a) {
  a = a || {};
  this.wkid = a.wkid;
  this.wkt = a.wkt
}
N.prototype.forward = function(a) {
  return a
};
N.prototype.s = function(a) {
  return a
};
N.prototype.u = function() {
  return 360
};
N.prototype.toJSON = function() {
  return"{" + (this.wkid ? " wkid:" + this.wkid : "wkt: '" + this.wkt + "'") + "}"
};
function O(a) {
  a = a || {};
  N.call(this, a)
}
O.prototype = new N;
function P(a) {
  a = a || {};
  N.call(this, a);
  var b = a.P, c = a.T * k, d = a.U * k, e = a.Q * k;
  this.a = a.v / a.unit;
  this.h = a.t * k;
  this.k = a.N;
  this.l = a.O;
  a = 1 / b;
  b = 2 * a - a * a;
  this.g = Math.sqrt(b);
  a = this.m(c, b);
  b = this.m(d, b);
  e = Q(this, e, this.g);
  c = Q(this, c, this.g);
  d = Q(this, d, this.g);
  this.b = Math.log(a / b) / Math.log(c / d);
  this.L = a / (this.b * Math.pow(c, this.b));
  this.i = this.A(this.a, this.L, e, this.b)
}
P.prototype = new N;
P.prototype.m = function(a, b) {
  var c = Math.sin(a);
  return Math.cos(a) / Math.sqrt(1 - b * c * c)
};
function Q(a, b, c) {
  a = c * Math.sin(b);
  return Math.tan(Math.PI / 4 - b / 2) / Math.pow((1 - a) / (1 + a), c / 2)
}
j = P.prototype;
j.A = function(a, b, c, d) {
  return a * b * Math.pow(c, d)
};
j.z = function(a, b, c) {
  c = b * Math.sin(c);
  return Math.PI / 2 - 2 * Math.atan(a * Math.pow((1 - c) / (1 + c), b / 2))
};
j.S = function(a, b, c) {
  var d = 0;
  c = c;
  for(var e = this.z(a, b, c);Math.abs(e - c) > 1.0E-9 && d < 10;) {
    d++;
    c = e;
    e = this.z(a, b, c)
  }
  return e
};
j.forward = function(a) {
  var b = a[0] * k;
  a = this.A(this.a, this.L, Q(this, a[1] * k, this.g), this.b);
  b = this.b * (b - this.h);
  return[this.k + a * Math.sin(b), this.l + this.i - a * Math.cos(b)]
};
j.s = function(a) {
  var b = a[0] - this.k, c = a[1] - this.l;
  a = Math.atan(b / (this.i - c));
  b = Math.pow((this.b > 0 ? 1 : -1) * Math.sqrt(b * b + (this.i - c) * (this.i - c)) / (this.a * this.L), 1 / this.b);
  return[(a / this.b + this.h) / k, this.S(b, this.g, Math.PI / 2 - 2 * Math.atan(b)) / k]
};
j.u = function() {
  return Math.PI * 2 * this.a
};
function R(a) {
  a = a || {};
  N.call(this, a);
  this.a = a.v / a.unit;
  var b = a.P;
  this.F = a.na;
  var c = a.Q * k;
  this.h = a.t * k;
  this.k = a.N;
  this.l = a.O;
  a = 1 / b;
  this.d = 2 * a - a * a;
  this.C = this.d * this.d;
  this.M = this.C * this.d;
  this.r = this.d / (1 - this.d);
  this.V = this.m(c, this.a, this.d, this.C, this.M)
}
R.prototype = new N;
R.prototype.m = function(a, b, c, d, e) {
  return b * ((1 - c / 4 - 3 * d / 64 - 5 * e / 256) * a - (3 * c / 8 + 3 * d / 32 + 45 * e / 1024) * Math.sin(2 * a) + (15 * d / 256 + 45 * e / 1024) * Math.sin(4 * a) - 35 * e / 3072 * Math.sin(6 * a))
};
R.prototype.forward = function(a) {
  var b = a[1] * k, c = a[0] * k;
  a = this.a / Math.sqrt(1 - this.d * Math.pow(Math.sin(b), 2));
  var d = Math.pow(Math.tan(b), 2), e = this.r * Math.pow(Math.cos(b), 2);
  c = (c - this.h) * Math.cos(b);
  var f = this.m(b, this.a, this.d, this.C, this.M);
  return[this.k + this.F * a * (c + (1 - d + e) * Math.pow(c, 3) / 6 + (5 - 18 * d + d * d + 72 * e - 58 * this.r) * Math.pow(c, 5) / 120), this.l + this.F * (f - this.V) + a * Math.tan(b) * (c * c / 2 + (5 - d + 9 * e + 4 * e * e) * Math.pow(c, 4) / 120 + (61 - 58 * d + d * d + 600 * e - 330 * this.r) * Math.pow(c, 6) / 720)]
};
R.prototype.s = function(a) {
  var b = a[0], c = a[1];
  a = (1 - Math.sqrt(1 - this.d)) / (1 + Math.sqrt(1 - this.d));
  c = (this.V + (c - this.l) / this.F) / (this.a * (1 - this.d / 4 - 3 * this.C / 64 - 5 * this.M / 256));
  a = c + (3 * a / 2 - 27 * Math.pow(a, 3) / 32) * Math.sin(2 * c) + (21 * a * a / 16 - 55 * Math.pow(a, 4) / 32) * Math.sin(4 * c) + 151 * Math.pow(a, 3) / 6 * Math.sin(6 * c) + 1097 * Math.pow(a, 4) / 512 * Math.sin(8 * c);
  c = this.r * Math.pow(Math.cos(a), 2);
  var d = Math.pow(Math.tan(a), 2), e = this.a / Math.sqrt(1 - this.d * Math.pow(Math.sin(a), 2)), f = this.a * (1 - this.d) / Math.pow(1 - this.d * Math.pow(Math.sin(a), 2), 1.5);
  b = (b - this.k) / (e * this.F);
  e = a - e * Math.tan(a) / f * (b * b / 2 - (5 + 3 * d + 10 * c - 4 * c * c - 9 * this.r) * Math.pow(b, 4) / 24 + (61 + 90 * d + 28 * c + 45 * d * d - 252 * this.r - 3 * c * c) * Math.pow(b, 6) / 720);
  return[(this.h + (b - (1 + 2 * d + c) * Math.pow(b, 3) / 6 + (5 - 2 * c + 28 * d - 3 * c * c + 8 * this.r + 24 * d * d) * Math.pow(b, 5) / 120) / Math.cos(a)) / k, e / k]
};
R.prototype.u = function() {
  return Math.PI * 2 * this.a
};
function S(a) {
  a = a || {};
  N.call(this, a);
  this.a = (a.v || 6378137) / (a.unit || 1);
  this.h = (a.t || 0) * k
}
S.prototype = new N;
S.prototype.forward = function(a) {
  var b = a[1] * k;
  return[this.a * (a[0] * k - this.h), this.a / 2 * Math.log((1 + Math.sin(b)) / (1 - Math.sin(b)))]
};
S.prototype.s = function(a) {
  return[(a[0] / this.a + this.h) / k, (Math.PI / 2 - 2 * Math.atan(Math.exp(-a[1] / this.a))) / k]
};
S.prototype.u = function() {
  return Math.PI * 2 * this.a
};
function T(a) {
  a = a || {};
  N.call(this, a);
  var b = a.P, c = a.T * k, d = a.U * k, e = a.Q * k;
  this.a = a.v / a.unit;
  this.h = a.t * k;
  this.k = a.N;
  this.l = a.O;
  a = 1 / b;
  b = 2 * a - a * a;
  this.g = Math.sqrt(b);
  a = this.m(c, b);
  b = this.m(d, b);
  c = U(this, c, this.g);
  d = U(this, d, this.g);
  e = U(this, e, this.g);
  this.b = (a * a - b * b) / (d - c);
  this.K = a * a + this.b * c;
  this.i = this.A(this.a, this.K, this.b, e)
}
T.prototype = new N;
T.prototype.m = function(a, b) {
  var c = Math.sin(a);
  return Math.cos(a) / Math.sqrt(1 - b * c * c)
};
function U(a, b, c) {
  a = c * Math.sin(b);
  return(1 - c * c) * (Math.sin(b) / (1 - a * a) - 1 / (2 * c) * Math.log((1 - a) / (1 + a)))
}
j = T.prototype;
j.A = function(a, b, c, d) {
  return a * Math.sqrt(b - c * d) / c
};
j.z = function(a, b, c) {
  var d = b * Math.sin(c);
  return c + (1 - d * d) * (1 - d * d) / (2 * Math.cos(c)) * (a / (1 - b * b) - Math.sin(c) / (1 - d * d) + Math.log((1 - d) / (1 + d)) / (2 * b))
};
j.S = function(a, b, c) {
  var d = 0;
  c = c;
  for(var e = this.z(a, b, c);Math.abs(e - c) > 1.0E-8 && d < 10;) {
    d++;
    c = e;
    e = this.z(a, b, c)
  }
  return e
};
j.forward = function(a) {
  var b = a[0] * k;
  a = this.A(this.a, this.K, this.b, U(this, a[1] * k, this.g));
  b = this.b * (b - this.h);
  return[this.k + a * Math.sin(b), this.l + this.i - a * Math.cos(b)]
};
j.s = function(a) {
  var b = a[0] - this.k;
  a = a[1] - this.l;
  var c = Math.sqrt(b * b + (this.i - a) * (this.i - a)), d = this.b > 0 ? 1 : -1;
  c = (this.K - c * c * this.b * this.b / (this.a * this.a)) / this.b;
  return[(Math.atan(d * b / (d * this.i - d * a)) / this.b + this.h) / k, this.S(c, this.g, Math.asin(c / 2)) / k]
};
j.u = function() {
  return Math.PI * 2 * this.a
};
j.u = function() {
  return Math.PI * 2 * this.a
};
m = new O({wkid:4326});
n = new O({wkid:4269});
o = new S({wkid:102113, v:6378137, t:0, unit:1});
q = {"4326":m, "4269":n, "102113":o, "102100":new S({wkid:102100, v:6378137, t:0, unit:1})};
r.ma = function(a, b) {
  var c = q["" + a];
  if(c) {
    return c
  }
  if(b instanceof N) {
    c = q["" + a] = b
  }else {
    c = b || a;
    var d = {wkt:a};
    if(a === parseInt(a, 10)) {
      d = {wkid:a}
    }
    var e = s(c, 'PROJECTION["', '"]'), f = s(c, "SPHEROID[", "]").split(",");
    if(e !== "") {
      d.unit = parseFloat(s(s(c, "PROJECTION", ""), "UNIT[", "]").split(",")[1]);
      d.v = parseFloat(f[1]);
      d.P = parseFloat(f[2]);
      d.Q = parseFloat(s(c, '"Latitude_Of_Origin",', "]"));
      d.t = parseFloat(s(c, '"Central_Meridian",', "]"));
      d.N = parseFloat(s(c, '"False_Easting",', "]"));
      d.O = parseFloat(s(c, '"False_Northing",', "]"))
    }
    switch(e) {
      case "":
        c = new N(d);
        break;
      case "Lambert_Conformal_Conic":
        d.T = parseFloat(s(c, '"Standard_Parallel_1",', "]"));
        d.U = parseFloat(s(c, '"Standard_Parallel_2",', "]"));
        c = new P(d);
        break;
      case "Transverse_Mercator":
        d.na = parseFloat(s(c, '"Scale_Factor",', "]"));
        c = new R(d);
        break;
      case "Albers":
        d.T = parseFloat(s(c, '"Standard_Parallel_1",', "]"));
        d.U = parseFloat(s(c, '"Standard_Parallel_2",', "]"));
        c = new T(d);
        break;
      default:
        throw new Error(e + "  not supported");
    }
    if(c) {
      q["" + a] = c
    }
  }
  return c
};
function V(a) {
  this.url = a;
  this.definition = null
}
function W(a, b) {
  this.url = a;
  this.G = false;
  var c = a.split("/");
  this.name = c[c.length - 2].replace(/_/g, " ");
  b = b || {};
  if(b.ia) {
    var d = this;
    window.setTimeout(function() {
      X(d)
    }, b.ia * 1E3)
  }else {
    X(this)
  }
}
function X(a) {
  M(a.url, {}, "", function(b) {
    a.D(b)
  })
}
W.prototype.D = function(a) {
  var b = this;
  u(a, this);
  this.spatialReference = a.spatialReference.wkt ? r.ma(a.spatialReference.wkt) : q[a.spatialReference.wkid];
  a.tables !== undefined ? M(this.url + "/layers", {}, "", function(c) {
    ga(b, c)
  }) : ga(b, a)
};
function ga(a, b) {
  var c = [], d = [];
  a.layers = c;
  if(b.tables) {
    a.tables = d
  }
  var e, f, g, h;
  f = 0;
  for(g = b.layers.length;f < g;f++) {
    h = b.layers[f];
    e = new V(a.url + "/" + h.id);
    u(h, e);
    e.visible = e.defaultVisibility;
    c.push(e)
  }
  if(b.tables) {
    f = 0;
    for(g = b.tables.length;f < g;f++) {
      h = b.tables[f];
      e = new V(a.url + "/" + h.id);
      u(h, e);
      d.push(e)
    }
  }
  f = 0;
  for(g = c.length;f < g;f++) {
    e = c[f];
    if(e.subLayerIds) {
      e.subLayers = [];
      d = 0;
      for(h = e.subLayerIds.length;d < h;d++) {
        var i;
        a: {
          i = e.subLayerIds[d];
          var z = a.layers;
          if(z) {
            for(var A = 0, ka = z.length;A < ka;A++) {
              if(i === z[A].id) {
                i = z[A];
                break a
              }
              if(t(i) && z[A].name.toLowerCase() === i.toLowerCase()) {
                i = z[A];
                break a
              }
            }
          }
          i = null
        }
        e.subLayers.push(i);
        i.sa = e
      }
    }
  }
  a.G = true;
  v(a, "load")
}
function ha(a) {
  var b = {};
  if(a.layers) {
    for(var c = 0, d = a.layers.length;c < d;c++) {
      var e = a.layers[c];
      if(e.definition) {
        b[String(e.id)] = e.definition
      }
    }
  }
  return b
}
function ia(a) {
  var b = [];
  if(a.layers) {
    var c, d, e;
    d = 0;
    for(e = a.layers.length;d < e;d++) {
      c = a.layers[d];
      if(c.subLayers) {
        for(var f = 0, g = c.subLayers.length;f < g;f++) {
          if(c.subLayers[f].visible === false) {
            c.visible = false;
            break
          }
        }
      }
    }
    d = 0;
    for(e = a.layers.length;d < e;d++) {
      c = a.layers[d];
      c.subLayers && c.subLayers.length > 0 || c.visible === true && b.push(c.id)
    }
  }
  return b
}
function ja(a, b, c, d) {
  if(b && b.bounds) {
    var e = {};
    e.f = b.f;
    var f = b.bounds;
    e.bbox = "" + f.getSouthWest().lng() + "," + f.getSouthWest().lat() + "," + f.getNorthEast().lng() + "," + f.getNorthEast().lat();
    e.size = "" + b.width + "," + b.height;
    e.dpi = b.dpi;
    if(b.imageSR) {
      e.imageSR = b.imageSR.wkid ? b.imageSR.wkid : "{wkt:" + b.imageSR.wkt + "}"
    }
    e.bboxSR = "4326";
    e.format = b.format;
    f = b.layerDefinitions;
    if(f === undefined) {
      f = ha(a)
    }
    e.layerDefs = ca(f);
    f = b.layerIds;
    var g = b.layerOption || "show";
    if(f === undefined) {
      f = ia(a)
    }
    if(f.length > 0) {
      e.layers = g + ":" + f.join(",")
    }else {
      if(a.G && c) {
        c({href:null});
        return
      }
    }
    e.transparent = b.transparent === false ? false : true;
    if(b.time) {
      e.time = ba(b.time, b.oa)
    }
    e.ka = b.ka;
    if(e.f === "image") {
      return a.url + "/export?" + I(e)
    }else {
      M(a.url + "/export", e, "", function(h) {
        if(h.extent) {
          h.bounds = G(h.extent);
          delete h.extent;
          c(h)
        }else {
          h = h.error;
          d && h && h.error && d(h.error)
        }
      })
    }
  }
}
function Y(a) {
  this.la = a ? a.lods : null;
  this.w = a ? q[a.spatialReference.wkid || a.spatialReference.wkt] : o;
  if(!this.w) {
    throw new Error("unsupported Spatial Reference");
  }
  this.ea = a ? a.lods[0].resolution : 156543.033928;
  this.minZoom = Math.floor(Math.log(this.w.u() / this.ea / 256) / Math.LN2 + 0.5);
  this.maxZoom = a ? this.minZoom + this.la.length - 1 : 20;
  if(l.Size) {
    this.fa = a ? new l.Size(a.cols, a.rows) : new l.Size(256, 256)
  }
  this.J = Math.pow(2, this.minZoom) * this.ea;
  this.ba = a ? a.origin.x : -2.0037508342787E7;
  this.ca = a ? a.origin.y : 2.0037508342787E7;
  if(a) {
    for(var b, c = 0;c < a.lods.length - 1;c++) {
      b = a.lods[c].resolution / a.lods[c + 1].resolution;
      if(b > 2.001 || b < 1.999) {
        throw new Error("This type of map cache is not supported in V3. \nScale ratio between zoom levels must be 2");
      }
    }
  }
}
Y.prototype.fromLatLngToPoint = function(a, b) {
  if(!a || isNaN(a.lat()) || isNaN(a.lng())) {
    return null
  }
  var c = this.w.forward([a.lng(), a.lat()]), d = b || new l.Point(0, 0);
  d.x = (c[0] - this.ba) / this.J;
  d.y = (this.ca - c[1]) / this.J;
  return d
};
Y.prototype.fromLatLngToPoint = Y.prototype.fromLatLngToPoint;
Y.prototype.fromPointToLatLng = function(a) {
  if(a === null) {
    return null
  }
  a = this.w.s([a.x * this.J + this.ba, this.ca - a.y * this.J]);
  return new l.LatLng(a[1], a[0])
};
var la = new Y;
function Z(a, b) {
  b = b || {};
  if(b.opacity) {
    this.e = b.opacity;
    delete b.opacity
  }
  u(b, this);
  this.c = a instanceof W ? a : new W(a);
  if(b.$) {
    var c = s(this.c.url, "", "://");
    this.ga = c + "://" + b.$ + s(this.c.url, c + "://" + s(this.c.url, "://", "/"), "");
    this.aa = parseInt(s(b.$, "[", "]"), 10)
  }
  this.name = b.name || this.c.name;
  this.maxZoom = b.maxZoom || 19;
  this.minZoom = b.minZoom || 0;
  this.Y = b.Y || this.maxZoom;
  if(this.c.G) {
    this.D(b)
  }else {
    var d = this;
    l.event.addListenerOnce(this.c, "load", function() {
      d.D(b)
    })
  }
  this.j = {};
  this.o = b.map
}
Z.prototype.D = function(a) {
  if(this.c.tileInfo) {
    this.p = new Y(this.c.tileInfo);
    this.minZoom = a.minZoom || this.p.minZoom;
    this.maxZoom = a.maxZoom || this.p.maxZoom
  }
};
Z.prototype.getTileUrl = function(a, b) {
  var c = b - (this.p ? this.p.minZoom : this.minZoom), d = "";
  if(!isNaN(a.x) && !isNaN(a.y) && c >= 0 && a.x >= 0 && a.y >= 0) {
    var e = this.c.url;
    if(this.ga) {
      e = this.ga.replace("[" + this.aa + "]", "" + (a.y + a.x) % this.aa)
    }
    d = this.p || (this.o ? this.o.getProjection() : la);
    if(!d instanceof Y) {
      d = la
    }
    var f = d.fa, g = 1 << b, h = new l.Point(a.x * f.width / g, (a.y + 1) * f.height / g);
    g = new l.Point((a.x + 1) * f.width / g, a.y * f.height / g);
    h = new l.LatLngBounds(d.fromPointToLatLng(h), d.fromPointToLatLng(g));
    g = this.c;
    if(g.fullExtent) {
      g.Z = g.Z || G(g.fullExtent);
      g = g.Z
    }else {
      g = null
    }
    if(this.c.singleFusedMapCache === false || b > this.Y) {
      c = {f:"image"};
      c.bounds = h;
      c.format = "png32";
      c.width = f.width;
      c.height = f.height;
      c.imageSR = d.w;
      d = ja(this.c, c)
    }else {
      d = g && !g.intersects(h) ? "" : e + "/tile/" + c + "/" + a.y + "/" + a.x
    }
  }
  return d
};
Z.prototype.R = function(a) {
  this.e = a;
  var b = this.j;
  for(var c in b) {
    b.hasOwnProperty(c) && w(b[c], a)
  }
};
function L(a, b) {
  b = b || {};
  var c;
  if(b.opacity) {
    this.e = b.opacity;
    delete b.opacity
  }
  u(b, this);
  var d = a;
  if(t(a)) {
    d = [new Z(a, b)]
  }else {
    if(a instanceof W) {
      d = [new Z(a, b)]
    }else {
      if(a instanceof Z) {
        d = [a]
      }else {
        if(a.length > 0 && t(a[0])) {
          d = [];
          for(c = 0;c < a.length;c++) {
            d[c] = new Z(a[c], b)
          }
        }
      }
    }
  }
  this.q = d;
  this.j = {};
  if(b.maxZoom !== undefined) {
    this.maxZoom = b.maxZoom
  }else {
    var e = 0;
    for(c = 0;c < d.length;c++) {
      e = Math.max(e, d[c].maxZoom)
    }
    this.maxZoom = e
  }
  if(d[0].p) {
    this.tileSize = d[0].p.fa;
    this.projection = d[0].p
  }else {
    this.tileSize = new l.Size(256, 256)
  }
  if(!this.name) {
    this.name = d[0].name
  }
}
L.prototype.getTile = function(a, b, c) {
  for(var d = c.createElement("div"), e = "_" + a.x + "_" + a.y + "_" + b, f = 0;f < this.q.length;f++) {
    var g = this.q[f];
    if(b <= g.maxZoom && b >= g.minZoom) {
      var h = g.getTileUrl(a, b);
      if(h) {
        var i = c.createElement(document.all ? "img" : "div");
        i.style.border = "0px none";
        i.style.margin = "0px";
        i.style.padding = "0px";
        i.style.overflow = "hidden";
        i.style.position = "absolute";
        i.style.top = "0px";
        i.style.left = "0px";
        i.style.width = "" + this.tileSize.width + "px";
        i.style.height = "" + this.tileSize.height + "px";
        if(document.all) {
          i.src = h
        }else {
          i.style.backgroundImage = "url(" + h + ")"
        }
        d.appendChild(i);
        g.j[e] = i;
        if(g.e !== undefined) {
          w(i, g.e)
        }else {
          this.e !== undefined && w(i, this.e)
        }
      }
    }
  }
  this.j[e] = d;
  d.setAttribute("tid", e);
  return d
};
L.prototype.getTile = L.prototype.getTile;
L.prototype.releaseTile = function(a) {
  if(a.getAttribute("tid")) {
    a = a.getAttribute("tid");
    this.j[a] && delete this.j[a];
    for(var b = 0;b < this.q.length;b++) {
      var c = this.q[b];
      c.j[a] && delete c.j[a]
    }
  }
};
L.prototype.releaseTile = L.prototype.releaseTile;
L.prototype.R = function(a) {
  this.e = a;
  var b = this.j;
  for(var c in b) {
    if(b.hasOwnProperty(c)) {
      for(var d = b[c].childNodes, e = 0;e < d.length;e++) {
        w(d[e], a)
      }
    }
  }
};
function $(a, b) {
  b = b || {};
  this.c = a instanceof W ? a : new W(a);
  this.minZoom = b.minZoom;
  this.maxZoom = b.maxZoom;
  this.e = b.opacity || 1;
  this.ja = b.pa || {};
  this.H = this.B = false;
  this.n = null;
  b.map && this.setMap(b.map);
  this.o = null
}
$.prototype = new l.OverlayView;
$.prototype.onAdd = function() {
  var a = document.createElement("div");
  a.style.position = "absolute";
  a.style.border = "none";
  this.n = a;
  this.getPanes().overlayLayer.appendChild(a);
  this.e && w(a, this.e);
  this.ha = l.event.addListener(this.getMap(), "bounds_changed", fa(this.I, this));
  a = this.getMap();
  a.agsOverlays = a.agsOverlays || new l.MVCArray;
  a.agsOverlays.push(this);
  K(a);
  this.o = a
};
$.prototype.onAdd = $.prototype.onAdd;
$.prototype.onRemove = function() {
  l.event.removeListener(this.ha);
  this.n.parentNode.removeChild(this.n);
  this.n = null;
  var a = this.o, b = a.agsOverlays;
  if(b) {
    for(var c = 0, d = b.getLength();c < d;c++) {
      if(b.getAt(c) == this) {
        b.removeAt(c);
        break
      }
    }
  }
  K(a);
  this.o = null
};
$.prototype.onRemove = $.prototype.onRemove;
$.prototype.draw = function() {
  if(!this.B || this.H === true) {
    this.I()
  }
};
$.prototype.draw = $.prototype.draw;
$.prototype.R = function(a) {
  this.e = a = Math.min(Math.max(a, 0), 1);
  w(this.n, a)
};
$.prototype.I = function() {
  if(this.B === true) {
    this.H = true
  }else {
    var a = this.getMap(), b = a ? a.getBounds() : null;
    if(b) {
      var c = this.ja;
      c.bounds = b;
      b = o;
      var d = a.getDiv();
      c.width = d.offsetWidth;
      c.height = d.offsetHeight;
      if(!(d.offsetWidth == 0 || d.offsetHeight == 0)) {
        if((a = a.getProjection()) && a instanceof Y) {
          b = a.w
        }
        c.imageSR = b;
        v(this, "drawstart");
        var e = this;
        this.B = true;
        this.n.style.backgroundImage = "";
        ja(this.c, c, function(f) {
          e.B = false;
          if(e.H === true) {
            e.H = false;
            e.I()
          }else {
            if(f.href) {
              var g = e.getProjection(), h = f.bounds, i = g.fromLatLngToDivPixel(h.getSouthWest());
              g = g.fromLatLngToDivPixel(h.getNorthEast());
              h = e.n;
              h.style.left = i.x + "px";
              h.style.top = g.y + "px";
              h.style.width = g.x - i.x + "px";
              h.style.height = i.y - g.y + "px";
              e.n.style.backgroundImage = "url(" + f.href + ")";
              e.R(e.e)
            }
            v(e, "drawend")
          }
        })
      }
    }
  }
};
function ma(a) {
  this.o = a;
  K(a)
}
ma.prototype.I = function() {
  K(this.o)
};
var na = L;window.onload = function() {
  var a = {zoom:13, center:new google.maps.LatLng(45.5, -122.7), mapTypeId:"arcgis", mapTypeControlOptions:{mapTypeIds:["arcgis", google.maps.MapTypeId.ROADMAP]}, streetViewControl:true};
  a = new google.maps.Map(document.getElementById("map_canvas"), a);
  var b = new na("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer", {name:"ArcGIS"});
  a.mapTypes.set("arcgis", b);
  new ma(a);
  (new $("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer")).setMap(a)
};})()

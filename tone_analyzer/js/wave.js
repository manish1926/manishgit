function htmlEntities(e) {
  return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}
function getRGBColor(e, t) {
  for (var n = extractRGBColor(e, t); e.parentNode && "body" !== e.nodeName.toLowerCase() && "html" !== e.nodeName.toLowerCase() && ("transparent" === n.toLowerCase() || "inherit" === n.toLowerCase());)
    e = e.parentNode,
      n = extractRGBColor(e, t);
  return "transparent" !== n && "inherit" !== n || (n = "color" === t ? "000000)" : "ffffff"),
    n
}
function extractRGBColor(e, t) {
  function n(e) {
    return ("0" + parseInt(e).toString(16)).slice(-2)
  }

  if (e.currentStyle)
    var i = e.currentStyle[t];
  else if (window.getComputedStyle)
    var i = document.defaultView.getComputedStyle(e, null).getPropertyValue(t);
  if (i.search("rgb") == -1)
    return i;
  var i = i.match(/rgba?\((\d+), (\d+), (\d+)(, (\d+))?\)/);
  return null == i || void 0 != i[5] && null != i[5] && 0 == i[5] ? "transparent" : n(i[1]) + n(i[2]) + n(i[3])
}
function checkcontrast() {
  var e = null != document.getElementById("normal") ? document.getElementById("normal") : {
      style: {}
    }
    , t = null != document.getElementById("big") ? document.getElementById("big") : {
      style: {}
    }
    , n = null != document.getElementById("contrastratio") ? document.getElementById("contrastratio") : {}
    , i = null != document.getElementById("normalaa") ? document.getElementById("normalaa") : {}
    , a = null != document.getElementById("normalaaa") ? document.getElementById("normalaaa") : {}
    , o = null != document.getElementById("bigaa") ? document.getElementById("bigaa") : {}
    , r = null != document.getElementById("bigaaa") ? document.getElementById("bigaaa") : {}
    , s = getColor("foreground")
    , l = getColor("background")
    , c = getL(s)
    , d = getL(l);
  if (c !== !1 && d !== !1) {
    e.style.color = "#" + s,
      e.style.backgroundColor = "#" + l,
      t.style.color = "#" + s,
      t.style.backgroundColor = "#" + l;
    var u = (Math.max(c, d) + .05) / (Math.min(c, d) + .05);
    n.innerHTML = Math.round(100 * u) / 100 + ":1",
      u >= 4.5 ? (i.innerHTML = "Pass",
          i.className = "pass",
          r.innerHTML = "Pass",
          r.className = "pass") : (i.innerHTML = "Fail",
          i.className = "fail",
          r.innerHTML = "Fail",
          r.className = "fail"),
      u >= 3 ? (o.innerHTML = "Pass",
          o.className = "pass") : (o.innerHTML = "Fail",
          o.className = "fail"),
      u >= 7 ? (a.innerHTML = "Pass",
          a.className = "pass") : (a.innerHTML = "Fail",
          a.className = "fail")
  } else
    e.style.color = "#00f",
      e.style.backgroundColor = "#fff",
      t.style.color = "#00f",
      t.style.backgroundColor = "#fff",
      n.innerHTML = "N/A",
      i.innerHTML = "?",
      a.innerHTML = "?",
      o.innerHTML = "?",
      r.innerHTML = "?"
}
function getColor(e) {
  colorobj = document.getElementById(e);
  var t = null != colorobj ? colorobj.value.replace("#", "") : "";
  return t
}
function getL(e) {
  if (3 == e.length) {
    var t = getsRGB(e.substring(0, 1) + e.substring(0, 1))
      , n = getsRGB(e.substring(1, 2) + e.substring(1, 2))
      , i = getsRGB(e.substring(2, 3) + e.substring(2, 3));
    update = !0
  } else if (6 == e.length) {
    var t = getsRGB(e.substring(0, 2))
      , n = getsRGB(e.substring(2, 4))
      , i = getsRGB(e.substring(4, 6));
    update = !0
  } else
    update = !1;
  if (1 == update) {
    var a = .2126 * t + .7152 * n + .0722 * i;
    return a
  }
  return !1
}
function getsRGB(e) {
  return e = getRGB(e),
  e !== !1 && (e /= 255,
    e = e <= .03928 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4))
}
function getRGB(e) {
  try {
    var e = parseInt(e, 16)
  } catch (t) {
    var e = !1;
    console.log(t)
  }
  return e
}
function changehue(e, t) {
  var n = getColor(e);
  if (3 == n.length)
    var i = n.substring(0, 1) + n.substring(0, 1)
      , a = n.substring(1, 2) + n.substring(1, 2)
      , o = n.substring(2, 3) + n.substring(2, 3);
  else if (6 == n.length) {
    var i = n.substring(0, 2)
      , a = n.substring(2, 4)
      , o = n.substring(4, 6);
    update = !0
  } else
    update = !1;
  i = getRGB(i),
    a = getRGB(a),
    o = getRGB(o),
    HSL = RGBtoHSL(i, a, o);
  var r = HSL[2];
  1 == update && (r = "lighten" == t ? r + 6.25 : r - 6.25,
  r > 100 && (r = 100),
  r < 0 && (r = 0),
    RGB = hslToRgb(HSL[0], HSL[1], r),
    i = RGB[0],
    a = RGB[1],
    o = RGB[2],
  i >= 0 || i <= 255 || (i = 0),
  a >= 0 || a <= 255 || (a = 0),
  o >= 0 || o <= 255 || (o = 0),
    i = i >= 16 ? i.toString(16) : "0" + i.toString(16),
    a = a >= 16 ? a.toString(16) : "0" + a.toString(16),
    o = o >= 16 ? o.toString(16) : "0" + o.toString(16),
    i = 1 == i.length ? i + i : i,
    a = 1 == a.length ? a + a : a,
    o = 1 == o.length ? o + o : o,
    document.getElementById(e).value = "#" + i + a + o,
    checkcontrast())
}
function RGBtoHSL(e, t, n) {
  var i = 0
    , a = 0;
  return e = e / 51 * .2,
    t = t / 51 * .2,
    n = n / 51 * .2,
    a = e >= t ? e : t,
  n > a && (a = n),
    i = e <= t ? e : t,
  n < i && (i = n),
    L = (a + i) / 2,
    a == i ? (S = 0,
        H = 0) : (L < .5 && (S = (a - i) / (a + i)),
      L >= .5 && (S = (a - i) / (2 - a - i)),
      e == a && (H = (t - n) / (a - i)),
      t == a && (H = 2 + (n - e) / (a - i)),
      n == a && (H = 4 + (e - t) / (a - i))),
    H = Math.round(60 * H),
  H < 0 && (H += 360),
  H >= 360 && (H -= 360),
    S = Math.round(100 * S),
    L = Math.round(100 * L),
    [H, S, L]
}
function hslToRgb(e, t, n) {
  var i, a;
  return n /= 100,
    t /= 100,
    a = n <= .5 ? n * (1 + t) : n + t - n * t,
    i = 2 * n - a,
    0 == t ? (R = n,
        G = n,
        B = n) : (R = FindRGB(i, a, e + 120),
        G = FindRGB(i, a, e),
        B = FindRGB(i, a, e - 120)),
    R *= 255,
    G *= 255,
    B *= 255,
    R = Math.round(R),
    G = Math.round(G),
    B = Math.round(B),
    [R, G, B]
}
function FindRGB(e, t, n) {
  return n > 360 && (n -= 360),
  n < 0 && (n += 360),
    n < 60 ? e + (t - e) * n / 60 : n < 180 ? t : n < 240 ? e + (t - e) * (240 - n) / 60 : e
}
function insertCodeIcons(e) {
  for (var t in e)
    for (var n = 0; n < e[t].length; n++)
      $('[data-reportxpath="' + t + '"]').prepend(e[t][n]),
        $('[data-reportxpath-heading="' + t + '"]').prepend(e[t][n].clone(!0))
}
function showContrasts(e) {
  var t = getRGBColor(e.iconElement.parentNode, "color")
    , n = getRGBColor(e.iconElement.parentNode, "background-color");
  "extension" != config.platform || config.isSidebar ? ($("#foreground").val(t),
      $("#foreground").change(),
      $("#background").val(n),
      $("#background").change(),
      checkcontrast()) : reportPageMessaging.fn.setupAndDispatchEvent("contrastDetails", {
      fgcolor: t,
      bgcolor: n
    })
}
function iconClickAction(e) {
  e.scrollTo(),
    wave.iconbox.hide(),
    wave.code.setSelected(e),
  "contrast" === e.data.cat_code && showContrasts(e)
}
function iconImage(e, t, n) {
  var i = {}
    , a = "sidebar" == n ? e.id : e.type
    , o = $("<img>", {
    src: wave.conf.paths.site + "/img/icons/" + a + ".png",
    alt: t + 1,
    style: "cursor:pointer;"
  });
  return config.isSidebar || (i = "sidebar" == n ? wave.report.things.iconsByType(a)[t] : e,
    o.hover(function () {
      wave.code.hoverHighlight(i.target, !0)
    }, function () {
      wave.code.hoverHighlight(i.target, !1)
    })),
    o.click(function () {
      "extension" == config.platform && config.isSidebar ? sidebarMessaging.fn.sendToBackground("selectIcon", {
          iconType: a,
          index: t
        }) : iconClickAction(i)
    }),
  e.hidden && (o.addClass("wave5_hide"),
    o.attr("title", 'This icon or the element it applies to is visually hidden in your page. Select "No Styles" to view it.')),
    o
}
function groupCheckboxEventAction(e, t) {
  e.target.checked ? (wave.report.things.showGroup(t),
      $("#group_list_" + t).show()) : (wave.report.things.hideGroup(t),
      $("#group_list_" + t).hide())
}
function groupCheckboxEventActionChrome(e, t) {
  e.target.checked ? (sidebarMessaging.fn.sendToBackground("toggleGroup", {
      action: "show",
      group: t
    }),
      $("#group_list_" + t).show()) : (sidebarMessaging.fn.sendToBackground("toggleGroup", {
      action: "hide",
      group: t
    }),
      $("#group_list_" + t).hide())
}
function groupCheckbox(e, t) {
  var n = $("<input id='toggle_group_" + e + "' type='checkbox' checked>");
  return n.change(function (e) {
    "contrast" != t && wave.tabs.filterCustom(),
      "extension" == config.platform && config.isSidebar ? groupCheckboxEventActionChrome(e, t) : groupCheckboxEventAction(e, t)
  }),
    n
}
function typeCheckboxEventAction(e, t) {
  var n = wave.report.things.iconsByType(t);
  $.isEmptyObject(n[0].data) || "contrast" == n[0].data.cat_code || wave.tabs.filterCustom(),
    e.currentTarget.checked ? (wave.report.things.showType(t),
        $("#type_list_" + t).show()) : (wave.report.things.hideType(t),
        $("#type_list_" + t).hide())
}
function typeCheckboxEventActionExtension(e, t) {
  wave.tabs.filterCustom(),
    e.currentTarget.checked ? (sidebarMessaging.fn.sendToBackground("toggleType", {
        action: "show",
        type: t
      }),
        $("#type_list_" + t).show()) : (sidebarMessaging.fn.sendToBackground("toggleType", {
        action: "hide",
        type: t
      }),
        $("#type_list_" + t).hide())
}
function typeCheckbox(e) {
  var t = $("<input id='toggle_type_" + e + "' type='checkbox' checked>");
  return t.change(function (t) {
    void 0 != t.currentTarget && ("extension" == config.platform && config.isSidebar ? typeCheckboxEventActionExtension(t, e) : typeCheckboxEventAction(t, e))
  }),
    t
}
var config = {
  debug: !1,
  platform: "web"
};
!function (e, t) {
  function n(e) {
    var t = ge[e] = {};
    return Y.each(e.split(te), function (e, n) {
      t[n] = !0
    }),
      t
  }

  function i(e, n, i) {
    if (i === t && 1 === e.nodeType) {
      var a = "data-" + n.replace(me, "-$1").toLowerCase();
      if (i = e.getAttribute(a),
        "string" == typeof i) {
        try {
          i = "true" === i || "false" !== i && ("null" === i ? null : +i + "" === i ? +i : fe.test(i) ? Y.parseJSON(i) : i)
        } catch (o) {
        }
        Y.data(e, n, i)
      } else
        i = t
    }
    return i
  }

  function a(e) {
    var t;
    for (t in e)
      if (("data" !== t || !Y.isEmptyObject(e[t])) && "toJSON" !== t)
        return !1;
    return !0
  }

  function o() {
    return !1
  }

  function r() {
    return !0
  }

  function s(e) {
    return !e || !e.parentNode || 11 === e.parentNode.nodeType
  }

  function l(e, t) {
    do
      e = e[t];
    while (e && 1 !== e.nodeType);
    return e
  }

  function c(e, t, n) {
    if (t = t || 0,
        Y.isFunction(t))
      return Y.grep(e, function (e, i) {
        var a = !!t.call(e, i, e);
        return a === n
      });
    if (t.nodeType)
      return Y.grep(e, function (e, i) {
        return e === t === n
      });
    if ("string" == typeof t) {
      var i = Y.grep(e, function (e) {
        return 1 === e.nodeType
      });
      if (He.test(t))
        return Y.filter(t, i, !n);
      t = Y.filter(t, i)
    }
    return Y.grep(e, function (e, i) {
      return Y.inArray(e, t) >= 0 === n
    })
  }

  function d(e) {
    var t = Pe.split("|")
      , n = e.createDocumentFragment();
    if (n.createElement)
      for (; t.length;)
        n.createElement(t.pop());
    return n
  }

  function u(e, t) {
    return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
  }

  function h(e, t) {
    if (1 === t.nodeType && Y.hasData(e)) {
      var n, i, a, o = Y._data(e), r = Y._data(t, o), s = o.events;
      if (s) {
        delete r.handle,
          r.events = {};
        for (n in s)
          for (i = 0,
                 a = s[n].length; i < a; i++)
            Y.event.add(t, n, s[n][i])
      }
      r.data && (r.data = Y.extend({}, r.data))
    }
  }

  function p(e, t) {
    var n;
    1 === t.nodeType && (t.clearAttributes && t.clearAttributes(),
    t.mergeAttributes && t.mergeAttributes(e),
      n = t.nodeName.toLowerCase(),
      "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML),
        Y.support.html5Clone && e.innerHTML && !Y.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Qe.test(e.type) ? (t.defaultChecked = t.checked = e.checked,
          t.value !== e.value && (t.value = e.value)) : "option" === n ? t.selected = e.defaultSelected : "input" === n || "textarea" === n ? t.defaultValue = e.defaultValue : "script" === n && t.text !== e.text && (t.text = e.text),
      t.removeAttribute(Y.expando))
  }

  function g(e) {
    return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName("*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll("*") : []
  }

  function f(e) {
    Qe.test(e.type) && (e.defaultChecked = e.checked)
  }

  function m(e, t) {
    if (t in e)
      return t;
    for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, a = vt.length; a--;)
      if (t = vt[a] + n,
        t in e)
        return t;
    return i
  }

  function v(e, t) {
    return e = t || e,
    "none" === Y.css(e, "display") || !Y.contains(e.ownerDocument, e)
  }

  function b(e, t) {
    for (var n, i, a = [], o = 0, r = e.length; o < r; o++)
      n = e[o],
      n.style && (a[o] = Y._data(n, "olddisplay"),
        t ? (!a[o] && "none" === n.style.display && (n.style.display = ""),
          "" === n.style.display && v(n) && (a[o] = Y._data(n, "olddisplay", A(n.nodeName)))) : (i = nt(n, "display"),
          !a[o] && "none" !== i && Y._data(n, "olddisplay", i)));
    for (o = 0; o < r; o++)
      n = e[o],
      n.style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? a[o] || "" : "none"));
    return e
  }

  function _(e, t, n) {
    var i = dt.exec(t);
    return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
  }

  function y(e, t, n, i) {
    for (var a = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; a < 4; a += 2)
      "margin" === n && (o += Y.css(e, n + mt[a], !0)),
        i ? ("content" === n && (o -= parseFloat(nt(e, "padding" + mt[a])) || 0),
          "margin" !== n && (o -= parseFloat(nt(e, "border" + mt[a] + "Width")) || 0)) : (o += parseFloat(nt(e, "padding" + mt[a])) || 0,
          "padding" !== n && (o += parseFloat(nt(e, "border" + mt[a] + "Width")) || 0));
    return o
  }

  function w(e, t, n) {
    var i = "width" === t ? e.offsetWidth : e.offsetHeight
      , a = !0
      , o = Y.support.boxSizing && "border-box" === Y.css(e, "boxSizing");
    if (i <= 0 || null == i) {
      if (i = nt(e, t),
        (i < 0 || null == i) && (i = e.style[t]),
          ut.test(i))
        return i;
      a = o && (Y.support.boxSizingReliable || i === e.style[t]),
        i = parseFloat(i) || 0
    }
    return i + y(e, t, n || (o ? "border" : "content"), a) + "px"
  }

  function A(e) {
    if (pt[e])
      return pt[e];
    var t = Y("<" + e + ">").appendTo(D.body)
      , n = t.css("display");
    return t.remove(),
    "none" !== n && "" !== n || (it = D.body.appendChild(it || Y.extend(D.createElement("iframe"), {
        frameBorder: 0,
        width: 0,
        height: 0
      })),
    at && it.createElement || (at = (it.contentWindow || it.contentDocument).document,
      at.write("<!doctype html><html><body>"),
      at.close()),
      t = at.body.appendChild(at.createElement(e)),
      n = nt(t, "display"),
      D.body.removeChild(it)),
      pt[e] = n,
      n
  }

  function k(e, t, n, i) {
    var a;
    if (Y.isArray(t))
      Y.each(t, function (t, a) {
        n || yt.test(e) ? i(e, a) : k(e + "[" + ("object" == typeof a ? t : "") + "]", a, n, i)
      });
    else if (n || "object" !== Y.type(t))
      i(e, t);
    else
      for (a in t)
        k(e + "[" + a + "]", t[a], n, i)
  }

  function x(e) {
    return function (t, n) {
      "string" != typeof t && (n = t,
        t = "*");
      var i, a, o, r = t.toLowerCase().split(te), s = 0, l = r.length;
      if (Y.isFunction(n))
        for (; s < l; s++)
          i = r[s],
            o = /^\+/.test(i),
          o && (i = i.substr(1) || "*"),
            a = e[i] = e[i] || [],
            a[o ? "unshift" : "push"](n)
    }
  }

  function C(e, n, i, a, o, r) {
    o = o || n.dataTypes[0],
      r = r || {},
      r[o] = !0;
    for (var s, l = e[o], c = 0, d = l ? l.length : 0, u = e === Ht; c < d && (u || !s); c++)
      s = l[c](n, i, a),
      "string" == typeof s && (!u || r[s] ? s = t : (n.dataTypes.unshift(s),
          s = C(e, n, i, a, s, r)));
    return (u || !s) && !r["*"] && (s = C(e, n, i, a, "*", r)),
      s
  }

  function T(e, n) {
    var i, a, o = Y.ajaxSettings.flatOptions || {};
    for (i in n)
      n[i] !== t && ((o[i] ? e : a || (a = {}))[i] = n[i]);
    a && Y.extend(!0, e, a)
  }

  function S(e, n, i) {
    var a, o, r, s, l = e.contents, c = e.dataTypes, d = e.responseFields;
    for (o in d)
      o in i && (n[d[o]] = i[o]);
    for (; "*" === c[0];)
      c.shift(),
      a === t && (a = e.mimeType || n.getResponseHeader("content-type"));
    if (a)
      for (o in l)
        if (l[o] && l[o].test(a)) {
          c.unshift(o);
          break
        }
    if (c[0] in i)
      r = c[0];
    else {
      for (o in i) {
        if (!c[0] || e.converters[o + " " + c[0]]) {
          r = o;
          break
        }
        s || (s = o)
      }
      r = r || s
    }
    if (r)
      return r !== c[0] && c.unshift(r),
        i[r]
  }

  function L(e, t) {
    var n, i, a, o, r = e.dataTypes.slice(), s = r[0], l = {}, c = 0;
    if (e.dataFilter && (t = e.dataFilter(t, e.dataType)),
        r[1])
      for (n in e.converters)
        l[n.toLowerCase()] = e.converters[n];
    for (; a = r[++c];)
      if ("*" !== a) {
        if ("*" !== s && s !== a) {
          if (n = l[s + " " + a] || l["* " + a],
              !n)
            for (i in l)
              if (o = i.split(" "),
                o[1] === a && (n = l[s + " " + o[0]] || l["* " + o[0]])) {
                n === !0 ? n = l[i] : l[i] !== !0 && (a = o[0],
                    r.splice(c--, 0, a));
                break
              }
          if (n !== !0)
            if (n && e["throws"])
              t = n(t);
            else
              try {
                t = n(t)
              } catch (d) {
                return {
                  state: "parsererror",
                  error: n ? d : "No conversion from " + s + " to " + a
                }
              }
        }
        s = a
      }
    return {
      state: "success",
      data: t
    }
  }

  function E() {
    try {
      return new e.XMLHttpRequest
    } catch (t) {
    }
  }

  function I() {
    try {
      return new e.ActiveXObject("Microsoft.XMLHTTP")
    } catch (t) {
    }
  }

  function $() {
    return setTimeout(function () {
      Ut = t
    }, 0),
      Ut = Y.now()
  }

  function W(e, t) {
    Y.each(t, function (t, n) {
      for (var i = (Zt[t] || []).concat(Zt["*"]), a = 0, o = i.length; a < o; a++)
        if (i[a].call(e, t, n))
          return
    })
  }

  function N(e, t, n) {
    var i, a = 0, o = Yt.length, r = Y.Deferred().always(function () {
      delete s.elem
    }), s = function () {
      for (var t = Ut || $(), n = Math.max(0, l.startTime + l.duration - t), i = 1 - (n / l.duration || 0), a = 0, o = l.tweens.length; a < o; a++)
        l.tweens[a].run(i);
      return r.notifyWith(e, [l, i, n]),
        i < 1 && o ? n : (r.resolveWith(e, [l]),
            !1)
    }, l = r.promise({
      elem: e,
      props: Y.extend({}, t),
      opts: Y.extend(!0, {
        specialEasing: {}
      }, n),
      originalProperties: t,
      originalOptions: n,
      startTime: Ut || $(),
      duration: n.duration,
      tweens: [],
      createTween: function (t, n, i) {
        var a = Y.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
        return l.tweens.push(a),
          a
      },
      stop: function (t) {
        for (var n = 0, i = t ? l.tweens.length : 0; n < i; n++)
          l.tweens[n].run(1);
        return t ? r.resolveWith(e, [l, t]) : r.rejectWith(e, [l, t]),
          this
      }
    }), c = l.props;
    for (G(c, l.opts.specialEasing); a < o; a++)
      if (i = Yt[a].call(l, e, c, l.opts))
        return i;
    return W(l, c),
    Y.isFunction(l.opts.start) && l.opts.start.call(e, l),
      Y.fx.timer(Y.extend(s, {
        anim: l,
        queue: l.opts.queue,
        elem: e
      })),
      l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
  }

  function G(e, t) {
    var n, i, a, o, r;
    for (n in e)
      if (i = Y.camelCase(n),
          a = t[i],
          o = e[n],
        Y.isArray(o) && (a = o[1],
          o = e[n] = o[0]),
        n !== i && (e[i] = o,
          delete e[n]),
          r = Y.cssHooks[i],
        r && "expand" in r) {
        o = r.expand(o),
          delete e[i];
        for (n in o)
          n in e || (e[n] = o[n],
            t[n] = a)
      } else
        t[i] = a
  }

  function B(e, t, n) {
    var i, a, o, r, s, l, c, d, u = this, h = e.style, p = {}, g = [], f = e.nodeType && v(e);
    n.queue || (c = Y._queueHooks(e, "fx"),
    null == c.unqueued && (c.unqueued = 0,
        d = c.empty.fire,
        c.empty.fire = function () {
          c.unqueued || d()
        }
    ),
      c.unqueued++,
      u.always(function () {
        u.always(function () {
          c.unqueued--,
          Y.queue(e, "fx").length || c.empty.fire()
        })
      })),
    1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [h.overflow, h.overflowX, h.overflowY],
    "inline" === Y.css(e, "display") && "none" === Y.css(e, "float") && (Y.support.inlineBlockNeedsLayout && "inline" !== A(e.nodeName) ? h.zoom = 1 : h.display = "inline-block")),
    n.overflow && (h.overflow = "hidden",
    Y.support.shrinkWrapBlocks || u.done(function () {
      h.overflow = n.overflow[0],
        h.overflowX = n.overflow[1],
        h.overflowY = n.overflow[2]
    }));
    for (i in t)
      if (o = t[i],
          Qt.exec(o)) {
        if (delete t[i],
          o === (f ? "hide" : "show"))
          continue;
        g.push(i)
      }
    if (r = g.length)
      for (s = Y._data(e, "fxshow") || Y._data(e, "fxshow", {}),
             f ? Y(e).show() : u.done(function () {
                 Y(e).hide()
               }),
             u.done(function () {
               var t;
               Y.removeData(e, "fxshow", !0);
               for (t in p)
                 Y.style(e, t, p[t])
             }),
             i = 0; i < r; i++)
        a = g[i],
          l = u.createTween(a, f ? s[a] : 0),
          p[a] = s[a] || Y.style(e, a),
        a in s || (s[a] = l.start,
        f && (l.end = l.start,
          l.start = "width" === a || "height" === a ? 1 : 0))
  }

  function H(e, t, n, i, a) {
    return new H.prototype.init(e, t, n, i, a)
  }

  function j(e, t) {
    var n, i = {
      height: e
    }, a = 0;
    for (t = t ? 1 : 0; a < 4; a += 2 - t)
      n = mt[a],
        i["margin" + n] = i["padding" + n] = e;
    return t && (i.opacity = i.width = e),
      i
  }

  function M(e) {
    return Y.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
  }

  var P, R, D = e.document, F = e.location, O = e.navigator, q = e.jQuery, z = e.$, X = Array.prototype.push, U = Array.prototype.slice, V = Array.prototype.indexOf, Q = Object.prototype.toString, J = Object.prototype.hasOwnProperty, K = String.prototype.trim, Y = function (e, t) {
    return new Y.fn.init(e, t, P)
  }, Z = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, ee = /\S/, te = /\s+/, ne = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ie = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, ae = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, oe = /^[\],:{}\s]*$/, re = /(?:^|:|,)(?:\s*\[)+/g, se = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, le = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, ce = /^-ms-/, de = /-([\da-z])/gi, ue = function (e, t) {
    return (t + "").toUpperCase()
  }, he = function () {
    D.addEventListener ? (D.removeEventListener("DOMContentLoaded", he, !1),
        Y.ready()) : "complete" === D.readyState && (D.detachEvent("onreadystatechange", he),
        Y.ready())
  }, pe = {};
  Y.fn = Y.prototype = {
    constructor: Y,
    init: function (e, n, i) {
      var a, o, r;
      if (!e)
        return this;
      if (e.nodeType)
        return this.context = this[0] = e,
          this.length = 1,
          this;
      if ("string" == typeof e) {
        if (a = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ie.exec(e),
          a && (a[1] || !n)) {
          if (a[1])
            return n = n instanceof Y ? n[0] : n,
              r = n && n.nodeType ? n.ownerDocument || n : D,
              e = Y.parseHTML(a[1], r, !0),
            ae.test(a[1]) && Y.isPlainObject(n) && this.attr.call(e, n, !0),
              Y.merge(this, e);
          if (o = D.getElementById(a[2]),
            o && o.parentNode) {
            if (o.id !== a[2])
              return i.find(e);
            this.length = 1,
              this[0] = o
          }
          return this.context = D,
            this.selector = e,
            this
        }
        return !n || n.jquery ? (n || i).find(e) : this.constructor(n).find(e)
      }
      return Y.isFunction(e) ? i.ready(e) : (e.selector !== t && (this.selector = e.selector,
          this.context = e.context),
          Y.makeArray(e, this))
    },
    selector: "",
    jquery: "1.8.2",
    length: 0,
    size: function () {
      return this.length
    },
    toArray: function () {
      return U.call(this)
    },
    get: function (e) {
      return null == e ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
    },
    pushStack: function (e, t, n) {
      var i = Y.merge(this.constructor(), e);
      return i.prevObject = this,
        i.context = this.context,
        "find" === t ? i.selector = this.selector + (this.selector ? " " : "") + n : t && (i.selector = this.selector + "." + t + "(" + n + ")"),
        i
    },
    each: function (e, t) {
      return Y.each(this, e, t)
    },
    ready: function (e) {
      return Y.ready.promise().done(e),
        this
    },
    eq: function (e) {
      return e = +e,
        e === -1 ? this.slice(e) : this.slice(e, e + 1)
    },
    first: function () {
      return this.eq(0)
    },
    last: function () {
      return this.eq(-1)
    },
    slice: function () {
      return this.pushStack(U.apply(this, arguments), "slice", U.call(arguments).join(","))
    },
    map: function (e) {
      return this.pushStack(Y.map(this, function (t, n) {
        return e.call(t, n, t)
      }))
    },
    end: function () {
      return this.prevObject || this.constructor(null)
    },
    push: X,
    sort: [].sort,
    splice: [].splice
  },
    Y.fn.init.prototype = Y.fn,
    Y.extend = Y.fn.extend = function () {
      var e, n, i, a, o, r, s = arguments[0] || {}, l = 1, c = arguments.length, d = !1;
      for ("boolean" == typeof s && (d = s,
        s = arguments[1] || {},
        l = 2),
           "object" != typeof s && !Y.isFunction(s) && (s = {}),
           c === l && (s = this,
             --l); l < c; l++)
        if (null != (e = arguments[l]))
          for (n in e)
            i = s[n],
              a = e[n],
            s !== a && (d && a && (Y.isPlainObject(a) || (o = Y.isArray(a))) ? (o ? (o = !1,
                  r = i && Y.isArray(i) ? i : []) : r = i && Y.isPlainObject(i) ? i : {},
                s[n] = Y.extend(d, r, a)) : a !== t && (s[n] = a));
      return s
    }
    ,
    Y.extend({
      noConflict: function (t) {
        return e.$ === Y && (e.$ = z),
        t && e.jQuery === Y && (e.jQuery = q),
          Y
      },
      isReady: !1,
      readyWait: 1,
      holdReady: function (e) {
        e ? Y.readyWait++ : Y.ready(!0)
      },
      ready: function (e) {
        if (e === !0 ? !--Y.readyWait : !Y.isReady) {
          if (!D.body)
            return setTimeout(Y.ready, 1);
          Y.isReady = !0,
          e !== !0 && --Y.readyWait > 0 || (R.resolveWith(D, [Y]),
          Y.fn.trigger && Y(D).trigger("ready").off("ready"))
        }
      },
      isFunction: function (e) {
        return "function" === Y.type(e)
      },
      isArray: Array.isArray || function (e) {
        return "array" === Y.type(e)
      }
      ,
      isWindow: function (e) {
        return null != e && e == e.window
      },
      isNumeric: function (e) {
        return !isNaN(parseFloat(e)) && isFinite(e)
      },
      type: function (e) {
        return null == e ? String(e) : pe[Q.call(e)] || "object"
      },
      isPlainObject: function (e) {
        if (!e || "object" !== Y.type(e) || e.nodeType || Y.isWindow(e))
          return !1;
        try {
          if (e.constructor && !J.call(e, "constructor") && !J.call(e.constructor.prototype, "isPrototypeOf"))
            return !1
        } catch (n) {
          return !1
        }
        var i;
        for (i in e)
          ;
        return i === t || J.call(e, i)
      },
      isEmptyObject: function (e) {
        var t;
        for (t in e)
          return !1;
        return !0
      },
      error: function (e) {
        throw new Error(e)
      },
      parseHTML: function (e, t, n) {
        var i;
        return e && "string" == typeof e ? ("boolean" == typeof t && (n = t,
            t = 0),
            t = t || D,
            (i = ae.exec(e)) ? [t.createElement(i[1])] : (i = Y.buildFragment([e], t, n ? null : []),
                Y.merge([], (i.cacheable ? Y.clone(i.fragment) : i.fragment).childNodes))) : null
      },
      parseJSON: function (t) {
        return t && "string" == typeof t ? (t = Y.trim(t),
            e.JSON && e.JSON.parse ? e.JSON.parse(t) : oe.test(t.replace(se, "@").replace(le, "]").replace(re, "")) ? new Function("return " + t)() : void Y.error("Invalid JSON: " + t)) : null
      },
      parseXML: function (n) {
        var i, a;
        if (!n || "string" != typeof n)
          return null;
        try {
          e.DOMParser ? (a = new DOMParser,
              i = a.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"),
              i.async = "false",
              i.loadXML(n))
        } catch (o) {
          i = t
        }
        return (!i || !i.documentElement || i.getElementsByTagName("parsererror").length) && Y.error("Invalid XML: " + n),
          i
      },
      noop: function () {
      },
      globalEval: function (t) {
        t && ee.test(t) && (e.execScript || function (t) {
            e.eval.call(e, t)
          }
        )(t)
      },
      camelCase: function (e) {
        return e.replace(ce, "ms-").replace(de, ue)
      },
      nodeName: function (e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
      },
      each: function (e, n, i) {
        var a, o = 0, r = e.length, s = r === t || Y.isFunction(e);
        if (i)
          if (s) {
            for (a in e)
              if (n.apply(e[a], i) === !1)
                break
          } else
            for (; o < r && n.apply(e[o++], i) !== !1;)
              ;
        else if (s) {
          for (a in e)
            if (n.call(e[a], a, e[a]) === !1)
              break
        } else
          for (; o < r && n.call(e[o], o, e[o++]) !== !1;)
            ;
        return e
      },
      trim: K && !K.call("\ufeff ") ? function (e) {
          return null == e ? "" : K.call(e)
        }
        : function (e) {
          return null == e ? "" : (e + "").replace(ne, "")
        }
      ,
      makeArray: function (e, t) {
        var n, i = t || [];
        return null != e && (n = Y.type(e),
          null == e.length || "string" === n || "function" === n || "regexp" === n || Y.isWindow(e) ? X.call(i, e) : Y.merge(i, e)),
          i
      },
      inArray: function (e, t, n) {
        var i;
        if (t) {
          if (V)
            return V.call(t, e, n);
          for (i = t.length,
                 n = n ? n < 0 ? Math.max(0, i + n) : n : 0; n < i; n++)
            if (n in t && t[n] === e)
              return n
        }
        return -1
      },
      merge: function (e, n) {
        var i = n.length
          , a = e.length
          , o = 0;
        if ("number" == typeof i)
          for (; o < i; o++)
            e[a++] = n[o];
        else
          for (; n[o] !== t;)
            e[a++] = n[o++];
        return e.length = a,
          e
      },
      grep: function (e, t, n) {
        var i, a = [], o = 0, r = e.length;
        for (n = !!n; o < r; o++)
          i = !!t(e[o], o),
          n !== i && a.push(e[o]);
        return a
      },
      map: function (e, n, i) {
        var a, o, r = [], s = 0, l = e.length, c = e instanceof Y || l !== t && "number" == typeof l && (l > 0 && e[0] && e[l - 1] || 0 === l || Y.isArray(e));
        if (c)
          for (; s < l; s++)
            a = n(e[s], s, i),
            null != a && (r[r.length] = a);
        else
          for (o in e)
            a = n(e[o], o, i),
            null != a && (r[r.length] = a);
        return r.concat.apply([], r)
      },
      guid: 1,
      proxy: function (e, n) {
        var i, a, o;
        return "string" == typeof n && (i = e[n],
          n = e,
          e = i),
          Y.isFunction(e) ? (a = U.call(arguments, 2),
              o = function () {
                return e.apply(n, a.concat(U.call(arguments)))
              }
              ,
              o.guid = e.guid = e.guid || Y.guid++,
              o) : t
      },
      access: function (e, n, i, a, o, r, s) {
        var l, c = null == i, d = 0, u = e.length;
        if (i && "object" == typeof i) {
          for (d in i)
            Y.access(e, n, d, i[d], 1, r, a);
          o = 1
        } else if (a !== t) {
          if (l = s === t && Y.isFunction(a),
            c && (l ? (l = n,
                  n = function (e, t, n) {
                    return l.call(Y(e), n)
                  }
              ) : (n.call(e, a),
                n = null)),
              n)
            for (; d < u; d++)
              n(e[d], i, l ? a.call(e[d], d, n(e[d], i)) : a, s);
          o = 1
        }
        return o ? e : c ? n.call(e) : u ? n(e[0], i) : r
      },
      now: function () {
        return (new Date).getTime()
      }
    }),
    Y.ready.promise = function (t) {
      if (!R)
        if (R = Y.Deferred(),
          "complete" === D.readyState)
          setTimeout(Y.ready, 1);
        else if (D.addEventListener)
          D.addEventListener("DOMContentLoaded", he, !1),
            e.addEventListener("load", Y.ready, !1);
        else {
          D.attachEvent("onreadystatechange", he),
            e.attachEvent("onload", Y.ready);
          var n = !1;
          try {
            n = null == e.frameElement && D.documentElement
          } catch (i) {
          }
          n && n.doScroll && function a() {
            if (!Y.isReady) {
              try {
                n.doScroll("left")
              } catch (e) {
                return setTimeout(a, 50)
              }
              Y.ready()
            }
          }()
        }
      return R.promise(t)
    }
    ,
    Y.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (e, t) {
      pe["[object " + t + "]"] = t.toLowerCase()
    }),
    P = Y(D);
  var ge = {};
  Y.Callbacks = function (e) {
    e = "string" == typeof e ? ge[e] || n(e) : Y.extend({}, e);
    var i, a, o, r, s, l, c = [], d = !e.once && [], u = function (t) {
      for (i = e.memory && t,
             a = !0,
             l = r || 0,
             r = 0,
             s = c.length,
             o = !0; c && l < s; l++)
        if (c[l].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
          i = !1;
          break
        }
      o = !1,
      c && (d ? d.length && u(d.shift()) : i ? c = [] : h.disable())
    }, h = {
      add: function () {
        if (c) {
          var t = c.length;
          !function n(t) {
            Y.each(t, function (t, i) {
              var a = Y.type(i);
              "function" !== a || e.unique && h.has(i) ? i && i.length && "string" !== a && n(i) : c.push(i)
            })
          }(arguments),
            o ? s = c.length : i && (r = t,
                u(i))
        }
        return this
      },
      remove: function () {
        return c && Y.each(arguments, function (e, t) {
          for (var n; (n = Y.inArray(t, c, n)) > -1;)
            c.splice(n, 1),
            o && (n <= s && s--,
            n <= l && l--)
        }),
          this
      },
      has: function (e) {
        return Y.inArray(e, c) > -1
      },
      empty: function () {
        return c = [],
          this
      },
      disable: function () {
        return c = d = i = t,
          this
      },
      disabled: function () {
        return !c
      },
      lock: function () {
        return d = t,
        i || h.disable(),
          this
      },
      locked: function () {
        return !d
      },
      fireWith: function (e, t) {
        return t = t || [],
          t = [e, t.slice ? t.slice() : t],
        c && (!a || d) && (o ? d.push(t) : u(t)),
          this
      },
      fire: function () {
        return h.fireWith(this, arguments),
          this
      },
      fired: function () {
        return !!a
      }
    };
    return h
  }
    ,
    Y.extend({
      Deferred: function (e) {
        var t = [["resolve", "done", Y.Callbacks("once memory"), "resolved"], ["reject", "fail", Y.Callbacks("once memory"), "rejected"], ["notify", "progress", Y.Callbacks("memory")]]
          , n = "pending"
          , i = {
          state: function () {
            return n
          },
          always: function () {
            return a.done(arguments).fail(arguments),
              this
          },
          then: function () {
            var e = arguments;
            return Y.Deferred(function (n) {
              Y.each(t, function (t, i) {
                var o = i[0]
                  , r = e[t];
                a[i[1]](Y.isFunction(r) ? function () {
                    var e = r.apply(this, arguments);
                    e && Y.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o + "With"](this === a ? n : this, [e])
                  }
                  : n[o])
              }),
                e = null
            }).promise()
          },
          promise: function (e) {
            return null != e ? Y.extend(e, i) : i
          }
        }
          , a = {};
        return i.pipe = i.then,
          Y.each(t, function (e, o) {
            var r = o[2]
              , s = o[3];
            i[o[1]] = r.add,
            s && r.add(function () {
              n = s
            }, t[1 ^ e][2].disable, t[2][2].lock),
              a[o[0]] = r.fire,
              a[o[0] + "With"] = r.fireWith
          }),
          i.promise(a),
        e && e.call(a, a),
          a
      },
      when: function (e) {
        var t, n, i, a = 0, o = U.call(arguments), r = o.length, s = 1 !== r || e && Y.isFunction(e.promise) ? r : 0, l = 1 === s ? e : Y.Deferred(), c = function (e, n, i) {
          return function (a) {
            n[e] = this,
              i[e] = arguments.length > 1 ? U.call(arguments) : a,
              i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
          }
        };
        if (r > 1)
          for (t = new Array(r),
                 n = new Array(r),
                 i = new Array(r); a < r; a++)
            o[a] && Y.isFunction(o[a].promise) ? o[a].promise().done(c(a, i, o)).fail(l.reject).progress(c(a, n, t)) : --s;
        return s || l.resolveWith(i, o),
          l.promise()
      }
    }),
    Y.support = function () {
      var t, n, i, a, o, r, s, l, c, d, u, h = D.createElement("div");
      if (h.setAttribute("className", "t"),
          h.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
          n = h.getElementsByTagName("*"),
          i = h.getElementsByTagName("a")[0],
          i.style.cssText = "top:1px;float:left;opacity:.5",
        !n || !n.length)
        return {};
      a = D.createElement("select"),
        o = a.appendChild(D.createElement("option")),
        r = h.getElementsByTagName("input")[0],
        t = {
          leadingWhitespace: 3 === h.firstChild.nodeType,
          tbody: !h.getElementsByTagName("tbody").length,
          htmlSerialize: !!h.getElementsByTagName("link").length,
          style: /top/.test(i.getAttribute("style")),
          hrefNormalized: "/a" === i.getAttribute("href"),
          opacity: /^0.5/.test(i.style.opacity),
          cssFloat: !!i.style.cssFloat,
          checkOn: "on" === r.value,
          optSelected: o.selected,
          getSetAttribute: "t" !== h.className,
          enctype: !!D.createElement("form").enctype,
          html5Clone: "<:nav></:nav>" !== D.createElement("nav").cloneNode(!0).outerHTML,
          boxModel: "CSS1Compat" === D.compatMode,
          submitBubbles: !0,
          changeBubbles: !0,
          focusinBubbles: !1,
          deleteExpando: !0,
          noCloneEvent: !0,
          inlineBlockNeedsLayout: !1,
          shrinkWrapBlocks: !1,
          reliableMarginRight: !0,
          boxSizingReliable: !0,
          pixelPosition: !1
        },
        r.checked = !0,
        t.noCloneChecked = r.cloneNode(!0).checked,
        a.disabled = !0,
        t.optDisabled = !o.disabled;
      try {
        delete h.test
      } catch (p) {
        t.deleteExpando = !1
      }
      if (!h.addEventListener && h.attachEvent && h.fireEvent && (h.attachEvent("onclick", u = function () {
            t.noCloneEvent = !1
          }
        ),
          h.cloneNode(!0).fireEvent("onclick"),
          h.detachEvent("onclick", u)),
          r = D.createElement("input"),
          r.value = "t",
          r.setAttribute("type", "radio"),
          t.radioValue = "t" === r.value,
          r.setAttribute("checked", "checked"),
          r.setAttribute("name", "t"),
          h.appendChild(r),
          s = D.createDocumentFragment(),
          s.appendChild(h.lastChild),
          t.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked,
          t.appendChecked = r.checked,
          s.removeChild(r),
          s.appendChild(h),
          h.attachEvent)
        for (c in {
          submit: !0,
          change: !0,
          focusin: !0
        })
          l = "on" + c,
            d = l in h,
          d || (h.setAttribute(l, "return;"),
            d = "function" == typeof h[l]),
            t[c + "Bubbles"] = d;
      return Y(function () {
        var n, i, a, o, r = "padding:0;margin:0;border:0;display:block;overflow:hidden;", s = D.getElementsByTagName("body")[0];
        s && (n = D.createElement("div"),
          n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",
          s.insertBefore(n, s.firstChild),
          i = D.createElement("div"),
          n.appendChild(i),
          i.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
          a = i.getElementsByTagName("td"),
          a[0].style.cssText = "padding:0;margin:0;border:0;display:none",
          d = 0 === a[0].offsetHeight,
          a[0].style.display = "",
          a[1].style.display = "none",
          t.reliableHiddenOffsets = d && 0 === a[0].offsetHeight,
          i.innerHTML = "",
          i.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
          t.boxSizing = 4 === i.offsetWidth,
          t.doesNotIncludeMarginInBodyOffset = 1 !== s.offsetTop,
        e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(i, null) || {}).top,
          t.boxSizingReliable = "4px" === (e.getComputedStyle(i, null) || {
              width: "4px"
            }).width,
          o = D.createElement("div"),
          o.style.cssText = i.style.cssText = r,
          o.style.marginRight = o.style.width = "0",
          i.style.width = "1px",
          i.appendChild(o),
          t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)),
        "undefined" != typeof i.style.zoom && (i.innerHTML = "",
          i.style.cssText = r + "width:1px;padding:1px;display:inline;zoom:1",
          t.inlineBlockNeedsLayout = 3 === i.offsetWidth,
          i.style.display = "block",
          i.style.overflow = "visible",
          i.innerHTML = "<div></div>",
          i.firstChild.style.width = "5px",
          t.shrinkWrapBlocks = 3 !== i.offsetWidth,
          n.style.zoom = 1),
          s.removeChild(n),
          n = i = a = o = null)
      }),
        s.removeChild(h),
        n = i = a = o = r = s = h = null,
        t
    }();
  var fe = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/
    , me = /([A-Z])/g;
  Y.extend({
    cache: {},
    deletedIds: [],
    uuid: 0,
    expando: "jQuery" + (Y.fn.jquery + Math.random()).replace(/\D/g, ""),
    noData: {
      embed: !0,
      object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      applet: !0
    },
    hasData: function (e) {
      return e = e.nodeType ? Y.cache[e[Y.expando]] : e[Y.expando],
      !!e && !a(e)
    },
    data: function (e, n, i, a) {
      if (Y.acceptData(e)) {
        var o, r, s = Y.expando, l = "string" == typeof n, c = e.nodeType, d = c ? Y.cache : e, u = c ? e[s] : e[s] && s;
        if (u && d[u] && (a || d[u].data) || !l || i !== t)
          return u || (c ? e[s] = u = Y.deletedIds.pop() || Y.guid++ : u = s),
          d[u] || (d[u] = {},
          c || (d[u].toJSON = Y.noop)),
          "object" != typeof n && "function" != typeof n || (a ? d[u] = Y.extend(d[u], n) : d[u].data = Y.extend(d[u].data, n)),
            o = d[u],
          a || (o.data || (o.data = {}),
            o = o.data),
          i !== t && (o[Y.camelCase(n)] = i),
            l ? (r = o[n],
              null == r && (r = o[Y.camelCase(n)])) : r = o,
            r
      }
    },
    removeData: function (e, t, n) {
      if (Y.acceptData(e)) {
        var i, o, r, s = e.nodeType, l = s ? Y.cache : e, c = s ? e[Y.expando] : Y.expando;
        if (l[c]) {
          if (t && (i = n ? l[c] : l[c].data)) {
            Y.isArray(t) || (t in i ? t = [t] : (t = Y.camelCase(t),
                t = t in i ? [t] : t.split(" ")));
            for (o = 0,
                   r = t.length; o < r; o++)
              delete i[t[o]];
            if (!(n ? a : Y.isEmptyObject)(i))
              return
          }
          (n || (delete l[c].data,
            a(l[c]))) && (s ? Y.cleanData([e], !0) : Y.support.deleteExpando || l != l.window ? delete l[c] : l[c] = null)
        }
      }
    },
    _data: function (e, t, n) {
      return Y.data(e, t, n, !0)
    },
    acceptData: function (e) {
      var t = e.nodeName && Y.noData[e.nodeName.toLowerCase()];
      return !t || t !== !0 && e.getAttribute("classid") === t
    }
  }),
    Y.fn.extend({
      data: function (e, n) {
        var a, o, r, s, l, c = this[0], d = 0, u = null;
        if (e === t) {
          if (this.length && (u = Y.data(c),
            1 === c.nodeType && !Y._data(c, "parsedAttrs"))) {
            for (r = c.attributes,
                   l = r.length; d < l; d++)
              s = r[d].name,
              s.indexOf("data-") || (s = Y.camelCase(s.substring(5)),
                i(c, s, u[s]));
            Y._data(c, "parsedAttrs", !0)
          }
          return u
        }
        return "object" == typeof e ? this.each(function () {
            Y.data(this, e)
          }) : (a = e.split(".", 2),
            a[1] = a[1] ? "." + a[1] : "",
            o = a[1] + "!",
            Y.access(this, function (n) {
              return n === t ? (u = this.triggerHandler("getData" + o, [a[0]]),
                u === t && c && (u = Y.data(c, e),
                  u = i(c, e, u)),
                  u === t && a[1] ? this.data(a[0]) : u) : (a[1] = n,
                  void this.each(function () {
                    var t = Y(this);
                    t.triggerHandler("setData" + o, a),
                      Y.data(this, e, n),
                      t.triggerHandler("changeData" + o, a)
                  }))
            }, null, n, arguments.length > 1, null, !1))
      },
      removeData: function (e) {
        return this.each(function () {
          Y.removeData(this, e)
        })
      }
    }),
    Y.extend({
      queue: function (e, t, n) {
        var i;
        if (e)
          return t = (t || "fx") + "queue",
            i = Y._data(e, t),
          n && (!i || Y.isArray(n) ? i = Y._data(e, t, Y.makeArray(n)) : i.push(n)),
          i || []
      },
      dequeue: function (e, t) {
        t = t || "fx";
        var n = Y.queue(e, t)
          , i = n.length
          , a = n.shift()
          , o = Y._queueHooks(e, t)
          , r = function () {
          Y.dequeue(e, t)
        };
        "inprogress" === a && (a = n.shift(),
          i--),
        a && ("fx" === t && n.unshift("inprogress"),
          delete o.stop,
          a.call(e, r, o)),
        !i && o && o.empty.fire()
      },
      _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return Y._data(e, n) || Y._data(e, n, {
            empty: Y.Callbacks("once memory").add(function () {
              Y.removeData(e, t + "queue", !0),
                Y.removeData(e, n, !0)
            })
          })
      }
    }),
    Y.fn.extend({
      queue: function (e, n) {
        var i = 2;
        return "string" != typeof e && (n = e,
          e = "fx",
          i--),
          arguments.length < i ? Y.queue(this[0], e) : n === t ? this : this.each(function () {
                var t = Y.queue(this, e, n);
                Y._queueHooks(this, e),
                "fx" === e && "inprogress" !== t[0] && Y.dequeue(this, e)
              })
      },
      dequeue: function (e) {
        return this.each(function () {
          Y.dequeue(this, e)
        })
      },
      delay: function (e, t) {
        return e = Y.fx ? Y.fx.speeds[e] || e : e,
          t = t || "fx",
          this.queue(t, function (t, n) {
            var i = setTimeout(t, e);
            n.stop = function () {
              clearTimeout(i)
            }
          })
      },
      clearQueue: function (e) {
        return this.queue(e || "fx", [])
      },
      promise: function (e, n) {
        var i, a = 1, o = Y.Deferred(), r = this, s = this.length, l = function () {
          --a || o.resolveWith(r, [r])
        };
        for ("string" != typeof e && (n = e,
          e = t),
               e = e || "fx"; s--;)
          i = Y._data(r[s], e + "queueHooks"),
          i && i.empty && (a++,
            i.empty.add(l));
        return l(),
          o.promise(n)
      }
    });
  var ve, be, _e, ye = /[\t\r\n]/g, we = /\r/g, Ae = /^(?:button|input)$/i, ke = /^(?:button|input|object|select|textarea)$/i, xe = /^a(?:rea|)$/i, Ce = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, Te = Y.support.getSetAttribute;
  Y.fn.extend({
    attr: function (e, t) {
      return Y.access(this, Y.attr, e, t, arguments.length > 1)
    },
    removeAttr: function (e) {
      return this.each(function () {
        Y.removeAttr(this, e)
      })
    },
    prop: function (e, t) {
      return Y.access(this, Y.prop, e, t, arguments.length > 1)
    },
    removeProp: function (e) {
      return e = Y.propFix[e] || e,
        this.each(function () {
          try {
            this[e] = t,
              delete this[e]
          } catch (n) {
          }
        })
    },
    addClass: function (e) {
      var t, n, i, a, o, r, s;
      if (Y.isFunction(e))
        return this.each(function (t) {
          Y(this).addClass(e.call(this, t, this.className))
        });
      if (e && "string" == typeof e)
        for (t = e.split(te),
               n = 0,
               i = this.length; n < i; n++)
          if (a = this[n],
            1 === a.nodeType)
            if (a.className || 1 !== t.length) {
              for (o = " " + a.className + " ",
                     r = 0,
                     s = t.length; r < s; r++)
                o.indexOf(" " + t[r] + " ") < 0 && (o += t[r] + " ");
              a.className = Y.trim(o)
            } else
              a.className = e;
      return this
    },
    removeClass: function (e) {
      var n, i, a, o, r, s, l;
      if (Y.isFunction(e))
        return this.each(function (t) {
          Y(this).removeClass(e.call(this, t, this.className))
        });
      if (e && "string" == typeof e || e === t)
        for (n = (e || "").split(te),
               s = 0,
               l = this.length; s < l; s++)
          if (a = this[s],
            1 === a.nodeType && a.className) {
            for (i = (" " + a.className + " ").replace(ye, " "),
                   o = 0,
                   r = n.length; o < r; o++)
              for (; i.indexOf(" " + n[o] + " ") >= 0;)
                i = i.replace(" " + n[o] + " ", " ");
            a.className = e ? Y.trim(i) : ""
          }
      return this
    },
    toggleClass: function (e, t) {
      var n = typeof e
        , i = "boolean" == typeof t;
      return Y.isFunction(e) ? this.each(function (n) {
          Y(this).toggleClass(e.call(this, n, this.className, t), t)
        }) : this.each(function () {
          if ("string" === n)
            for (var a, o = 0, r = Y(this), s = t, l = e.split(te); a = l[o++];)
              s = i ? s : !r.hasClass(a),
                r[s ? "addClass" : "removeClass"](a);
          else
            "undefined" !== n && "boolean" !== n || (this.className && Y._data(this, "__className__", this.className),
              this.className = this.className || e === !1 ? "" : Y._data(this, "__className__") || "")
        })
    },
    hasClass: function (e) {
      for (var t = " " + e + " ", n = 0, i = this.length; n < i; n++)
        if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(ye, " ").indexOf(t) >= 0)
          return !0;
      return !1
    },
    val: function (e) {
      var n, i, a, o = this[0];
      {
        if (arguments.length)
          return a = Y.isFunction(e),
            this.each(function (i) {
              var o, r = Y(this);
              1 === this.nodeType && (o = a ? e.call(this, i, r.val()) : e,
                null == o ? o = "" : "number" == typeof o ? o += "" : Y.isArray(o) && (o = Y.map(o, function (e) {
                      return null == e ? "" : e + ""
                    })),
                n = Y.valHooks[this.type] || Y.valHooks[this.nodeName.toLowerCase()],
              n && "set" in n && n.set(this, o, "value") !== t || (this.value = o))
            });
        if (o)
          return n = Y.valHooks[o.type] || Y.valHooks[o.nodeName.toLowerCase()],
            n && "get" in n && (i = n.get(o, "value")) !== t ? i : (i = o.value,
                "string" == typeof i ? i.replace(we, "") : null == i ? "" : i)
      }
    }
  }),
    Y.extend({
      valHooks: {
        option: {
          get: function (e) {
            var t = e.attributes.value;
            return !t || t.specified ? e.value : e.text
          }
        },
        select: {
          get: function (e) {
            var t, n, i, a, o = e.selectedIndex, r = [], s = e.options, l = "select-one" === e.type;
            if (o < 0)
              return null;
            for (n = l ? o : 0,
                   i = l ? o + 1 : s.length; n < i; n++)
              if (a = s[n],
                a.selected && (Y.support.optDisabled ? !a.disabled : null === a.getAttribute("disabled")) && (!a.parentNode.disabled || !Y.nodeName(a.parentNode, "optgroup"))) {
                if (t = Y(a).val(),
                    l)
                  return t;
                r.push(t)
              }
            return l && !r.length && s.length ? Y(s[o]).val() : r
          },
          set: function (e, t) {
            var n = Y.makeArray(t);
            return Y(e).find("option").each(function () {
              this.selected = Y.inArray(Y(this).val(), n) >= 0
            }),
            n.length || (e.selectedIndex = -1),
              n
          }
        }
      },
      attrFn: {},
      attr: function (e, n, i, a) {
        var o, r, s, l = e.nodeType;
        if (e && 3 !== l && 8 !== l && 2 !== l)
          return a && Y.isFunction(Y.fn[n]) ? Y(e)[n](i) : "undefined" == typeof e.getAttribute ? Y.prop(e, n, i) : (s = 1 !== l || !Y.isXMLDoc(e),
              s && (n = n.toLowerCase(),
                r = Y.attrHooks[n] || (Ce.test(n) ? be : ve)),
                i !== t ? null === i ? void Y.removeAttr(e, n) : r && "set" in r && s && (o = r.set(e, i, n)) !== t ? o : (e.setAttribute(n, i + ""),
                        i) : r && "get" in r && s && null !== (o = r.get(e, n)) ? o : (o = e.getAttribute(n),
                      null === o ? t : o))
      },
      removeAttr: function (e, t) {
        var n, i, a, o, r = 0;
        if (t && 1 === e.nodeType)
          for (i = t.split(te); r < i.length; r++)
            a = i[r],
            a && (n = Y.propFix[a] || a,
              o = Ce.test(a),
            o || Y.attr(e, a, ""),
              e.removeAttribute(Te ? a : n),
            o && n in e && (e[n] = !1))
      },
      attrHooks: {
        type: {
          set: function (e, t) {
            if (Ae.test(e.nodeName) && e.parentNode)
              Y.error("type property can't be changed");
            else if (!Y.support.radioValue && "radio" === t && Y.nodeName(e, "input")) {
              var n = e.value;
              return e.setAttribute("type", t),
              n && (e.value = n),
                t
            }
          }
        },
        value: {
          get: function (e, t) {
            return ve && Y.nodeName(e, "button") ? ve.get(e, t) : t in e ? e.value : null
          },
          set: function (e, t, n) {
            return ve && Y.nodeName(e, "button") ? ve.set(e, t, n) : void (e.value = t)
          }
        }
      },
      propFix: {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
      },
      prop: function (e, n, i) {
        var a, o, r, s = e.nodeType;
        if (e && 3 !== s && 8 !== s && 2 !== s)
          return r = 1 !== s || !Y.isXMLDoc(e),
          r && (n = Y.propFix[n] || n,
            o = Y.propHooks[n]),
            i !== t ? o && "set" in o && (a = o.set(e, i, n)) !== t ? a : e[n] = i : o && "get" in o && null !== (a = o.get(e, n)) ? a : e[n]
      },
      propHooks: {
        tabIndex: {
          get: function (e) {
            var n = e.getAttributeNode("tabindex");
            return n && n.specified ? parseInt(n.value, 10) : ke.test(e.nodeName) || xe.test(e.nodeName) && e.href ? 0 : t
          }
        }
      }
    }),
    be = {
      get: function (e, n) {
        var i, a = Y.prop(e, n);
        return a === !0 || "boolean" != typeof a && (i = e.getAttributeNode(n)) && i.nodeValue !== !1 ? n.toLowerCase() : t
      },
      set: function (e, t, n) {
        var i;
        return t === !1 ? Y.removeAttr(e, n) : (i = Y.propFix[n] || n,
          i in e && (e[i] = !0),
            e.setAttribute(n, n.toLowerCase())),
          n
      }
    },
  Te || (_e = {
    name: !0,
    id: !0,
    coords: !0
  },
    ve = Y.valHooks.button = {
      get: function (e, n) {
        var i;
        return i = e.getAttributeNode(n),
          i && (_e[n] ? "" !== i.value : i.specified) ? i.value : t
      },
      set: function (e, t, n) {
        var i = e.getAttributeNode(n);
        return i || (i = D.createAttribute(n),
          e.setAttributeNode(i)),
          i.value = t + ""
      }
    },
    Y.each(["width", "height"], function (e, t) {
      Y.attrHooks[t] = Y.extend(Y.attrHooks[t], {
        set: function (e, n) {
          if ("" === n)
            return e.setAttribute(t, "auto"),
              n
        }
      })
    }),
    Y.attrHooks.contenteditable = {
      get: ve.get,
      set: function (e, t, n) {
        "" === t && (t = "false"),
          ve.set(e, t, n)
      }
    }),
  Y.support.hrefNormalized || Y.each(["href", "src", "width", "height"], function (e, n) {
    Y.attrHooks[n] = Y.extend(Y.attrHooks[n], {
      get: function (e) {
        var i = e.getAttribute(n, 2);
        return null === i ? t : i
      }
    })
  }),
  Y.support.style || (Y.attrHooks.style = {
    get: function (e) {
      return e.style.cssText.toLowerCase() || t
    },
    set: function (e, t) {
      return e.style.cssText = t + ""
    }
  }),
  Y.support.optSelected || (Y.propHooks.selected = Y.extend(Y.propHooks.selected, {
    get: function (e) {
      var t = e.parentNode;
      return t && (t.selectedIndex,
      t.parentNode && t.parentNode.selectedIndex),
        null
    }
  })),
  Y.support.enctype || (Y.propFix.enctype = "encoding"),
  Y.support.checkOn || Y.each(["radio", "checkbox"], function () {
    Y.valHooks[this] = {
      get: function (e) {
        return null === e.getAttribute("value") ? "on" : e.value
      }
    }
  }),
    Y.each(["radio", "checkbox"], function () {
      Y.valHooks[this] = Y.extend(Y.valHooks[this], {
        set: function (e, t) {
          if (Y.isArray(t))
            return e.checked = Y.inArray(Y(e).val(), t) >= 0
        }
      })
    });
  var Se = /^(?:textarea|input|select)$/i
    , Le = /^([^\.]*|)(?:\.(.+)|)$/
    , Ee = /(?:^|\s)hover(\.\S+|)\b/
    , Ie = /^key/
    , $e = /^(?:mouse|contextmenu)|click/
    , We = /^(?:focusinfocus|focusoutblur)$/
    , Ne = function (e) {
    return Y.event.special.hover ? e : e.replace(Ee, "mouseenter$1 mouseleave$1")
  };
  Y.event = {
    add: function (e, n, i, a, o) {
      var r, s, l, c, d, u, h, p, g, f, m;
      if (3 !== e.nodeType && 8 !== e.nodeType && n && i && (r = Y._data(e))) {
        for (i.handler && (g = i,
          i = g.handler,
          o = g.selector),
             i.guid || (i.guid = Y.guid++),
               l = r.events,
             l || (r.events = l = {}),
               s = r.handle,
             s || (r.handle = s = function (e) {
               return "undefined" == typeof Y || e && Y.event.triggered === e.type ? t : Y.event.dispatch.apply(s.elem, arguments)
             }
               ,
               s.elem = e),
               n = Y.trim(Ne(n)).split(" "),
               c = 0; c < n.length; c++)
          d = Le.exec(n[c]) || [],
            u = d[1],
            h = (d[2] || "").split(".").sort(),
            m = Y.event.special[u] || {},
            u = (o ? m.delegateType : m.bindType) || u,
            m = Y.event.special[u] || {},
            p = Y.extend({
              type: u,
              origType: d[1],
              data: a,
              handler: i,
              guid: i.guid,
              selector: o,
              needsContext: o && Y.expr.match.needsContext.test(o),
              namespace: h.join(".")
            }, g),
            f = l[u],
          f || (f = l[u] = [],
            f.delegateCount = 0,
          m.setup && m.setup.call(e, a, h, s) !== !1 || (e.addEventListener ? e.addEventListener(u, s, !1) : e.attachEvent && e.attachEvent("on" + u, s))),
          m.add && (m.add.call(e, p),
          p.handler.guid || (p.handler.guid = i.guid)),
            o ? f.splice(f.delegateCount++, 0, p) : f.push(p),
            Y.event.global[u] = !0;
        e = null
      }
    },
    global: {},
    remove: function (e, t, n, i, a) {
      var o, r, s, l, c, d, u, h, p, g, f, m = Y.hasData(e) && Y._data(e);
      if (m && (h = m.events)) {
        for (t = Y.trim(Ne(t || "")).split(" "),
               o = 0; o < t.length; o++)
          if (r = Le.exec(t[o]) || [],
              s = l = r[1],
              c = r[2],
              s) {
            for (p = Y.event.special[s] || {},
                   s = (i ? p.delegateType : p.bindType) || s,
                   g = h[s] || [],
                   d = g.length,
                   c = c ? new RegExp("(^|\\.)" + c.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                   u = 0; u < g.length; u++)
              f = g[u],
              (a || l === f.origType) && (!n || n.guid === f.guid) && (!c || c.test(f.namespace)) && (!i || i === f.selector || "**" === i && f.selector) && (g.splice(u--, 1),
              f.selector && g.delegateCount--,
              p.remove && p.remove.call(e, f));
            0 === g.length && d !== g.length && ((!p.teardown || p.teardown.call(e, c, m.handle) === !1) && Y.removeEvent(e, s, m.handle),
              delete h[s])
          } else
            for (s in h)
              Y.event.remove(e, s + t[o], n, i, !0);
        Y.isEmptyObject(h) && (delete m.handle,
          Y.removeData(e, "events", !0))
      }
    },
    customEvent: {
      getData: !0,
      setData: !0,
      changeData: !0
    },
    trigger: function (n, i, a, o) {
      if (!a || 3 !== a.nodeType && 8 !== a.nodeType) {
        var r, s, l, c, d, u, h, p, g, f, m = n.type || n, v = [];
        if (We.test(m + Y.event.triggered))
          return;
        if (m.indexOf("!") >= 0 && (m = m.slice(0, -1),
            s = !0),
          m.indexOf(".") >= 0 && (v = m.split("."),
            m = v.shift(),
            v.sort()),
          (!a || Y.event.customEvent[m]) && !Y.event.global[m])
          return;
        if (n = "object" == typeof n ? n[Y.expando] ? n : new Y.Event(m, n) : new Y.Event(m),
            n.type = m,
            n.isTrigger = !0,
            n.exclusive = s,
            n.namespace = v.join("."),
            n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            u = m.indexOf(":") < 0 ? "on" + m : "",
            !a) {
          r = Y.cache;
          for (l in r)
            r[l].events && r[l].events[m] && Y.event.trigger(n, i, r[l].handle.elem, !0);
          return
        }
        if (n.result = t,
          n.target || (n.target = a),
            i = null != i ? Y.makeArray(i) : [],
            i.unshift(n),
            h = Y.event.special[m] || {},
          h.trigger && h.trigger.apply(a, i) === !1)
          return;
        if (g = [[a, h.bindType || m]],
          !o && !h.noBubble && !Y.isWindow(a)) {
          for (f = h.delegateType || m,
                 c = We.test(f + m) ? a : a.parentNode,
                 d = a; c; c = c.parentNode)
            g.push([c, f]),
              d = c;
          d === (a.ownerDocument || D) && g.push([d.defaultView || d.parentWindow || e, f])
        }
        for (l = 0; l < g.length && !n.isPropagationStopped(); l++)
          c = g[l][0],
            n.type = g[l][1],
            p = (Y._data(c, "events") || {})[n.type] && Y._data(c, "handle"),
          p && p.apply(c, i),
            p = u && c[u],
          p && Y.acceptData(c) && p.apply && p.apply(c, i) === !1 && n.preventDefault();
        return n.type = m,
        !o && !n.isDefaultPrevented() && (!h._default || h._default.apply(a.ownerDocument, i) === !1) && ("click" !== m || !Y.nodeName(a, "a")) && Y.acceptData(a) && u && a[m] && ("focus" !== m && "blur" !== m || 0 !== n.target.offsetWidth) && !Y.isWindow(a) && (d = a[u],
        d && (a[u] = null),
          Y.event.triggered = m,
          a[m](),
          Y.event.triggered = t,
        d && (a[u] = d)),
          n.result
      }
    },
    dispatch: function (n) {
      n = Y.event.fix(n || e.event);
      var i, a, o, r, s, l, c, d, u, h = (Y._data(this, "events") || {})[n.type] || [], p = h.delegateCount, g = U.call(arguments), f = !n.exclusive && !n.namespace, m = Y.event.special[n.type] || {}, v = [];
      if (g[0] = n,
          n.delegateTarget = this,
        !m.preDispatch || m.preDispatch.call(this, n) !== !1) {
        if (p && (!n.button || "click" !== n.type))
          for (o = n.target; o != this; o = o.parentNode || this)
            if (o.disabled !== !0 || "click" !== n.type) {
              for (s = {},
                     c = [],
                     i = 0; i < p; i++)
                d = h[i],
                  u = d.selector,
                s[u] === t && (s[u] = d.needsContext ? Y(u, this).index(o) >= 0 : Y.find(u, this, null, [o]).length),
                s[u] && c.push(d);
              c.length && v.push({
                elem: o,
                matches: c
              })
            }
        for (h.length > p && v.push({
          elem: this,
          matches: h.slice(p)
        }),
               i = 0; i < v.length && !n.isPropagationStopped(); i++)
          for (l = v[i],
                 n.currentTarget = l.elem,
                 a = 0; a < l.matches.length && !n.isImmediatePropagationStopped(); a++)
            d = l.matches[a],
            (f || !n.namespace && !d.namespace || n.namespace_re && n.namespace_re.test(d.namespace)) && (n.data = d.data,
              n.handleObj = d,
              r = ((Y.event.special[d.origType] || {}).handle || d.handler).apply(l.elem, g),
            r !== t && (n.result = r,
            r === !1 && (n.preventDefault(),
              n.stopPropagation())));
        return m.postDispatch && m.postDispatch.call(this, n),
          n.result
      }
    },
    props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
          e
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function (e, n) {
        var i, a, o, r = n.button, s = n.fromElement;
        return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || D,
          a = i.documentElement,
          o = i.body,
          e.pageX = n.clientX + (a && a.scrollLeft || o && o.scrollLeft || 0) - (a && a.clientLeft || o && o.clientLeft || 0),
          e.pageY = n.clientY + (a && a.scrollTop || o && o.scrollTop || 0) - (a && a.clientTop || o && o.clientTop || 0)),
        !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement : s),
        !e.which && r !== t && (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0),
          e
      }
    },
    fix: function (e) {
      if (e[Y.expando])
        return e;
      var t, n, i = e, a = Y.event.fixHooks[e.type] || {}, o = a.props ? this.props.concat(a.props) : this.props;
      for (e = Y.Event(i),
             t = o.length; t;)
        n = o[--t],
          e[n] = i[n];
      return e.target || (e.target = i.srcElement || D),
      3 === e.target.nodeType && (e.target = e.target.parentNode),
        e.metaKey = !!e.metaKey,
        a.filter ? a.filter(e, i) : e
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        delegateType: "focusin"
      },
      blur: {
        delegateType: "focusout"
      },
      beforeunload: {
        setup: function (e, t, n) {
          Y.isWindow(this) && (this.onbeforeunload = n)
        },
        teardown: function (e, t) {
          this.onbeforeunload === t && (this.onbeforeunload = null)
        }
      }
    },
    simulate: function (e, t, n, i) {
      var a = Y.extend(new Y.Event, n, {
        type: e,
        isSimulated: !0,
        originalEvent: {}
      });
      i ? Y.event.trigger(a, null, t) : Y.event.dispatch.call(t, a),
      a.isDefaultPrevented() && n.preventDefault()
    }
  },
    Y.event.handle = Y.event.dispatch,
    Y.removeEvent = D.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
      }
      : function (e, t, n) {
        var i = "on" + t;
        e.detachEvent && ("undefined" == typeof e[i] && (e[i] = null),
          e.detachEvent(i, n))
      }
    ,
    Y.Event = function (e, t) {
      return this instanceof Y.Event ? (e && e.type ? (this.originalEvent = e,
            this.type = e.type,
            this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? r : o) : this.type = e,
        t && Y.extend(this, t),
          this.timeStamp = e && e.timeStamp || Y.now(),
          this[Y.expando] = !0,
          void 0) : new Y.Event(e, t)
    }
    ,
    Y.Event.prototype = {
      preventDefault: function () {
        this.isDefaultPrevented = r;
        var e = this.originalEvent;
        e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
      },
      stopPropagation: function () {
        this.isPropagationStopped = r;
        var e = this.originalEvent;
        e && (e.stopPropagation && e.stopPropagation(),
          e.cancelBubble = !0)
      },
      stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = r,
          this.stopPropagation()
      },
      isDefaultPrevented: o,
      isPropagationStopped: o,
      isImmediatePropagationStopped: o
    },
    Y.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    }, function (e, t) {
      Y.event.special[e] = {
        delegateType: t,
        bindType: t,
        handle: function (e) {
          var n, i = this, a = e.relatedTarget, o = e.handleObj;
          o.selector;
          return a && (a === i || Y.contains(i, a)) || (e.type = o.origType,
            n = o.handler.apply(this, arguments),
            e.type = t),
            n
        }
      }
    }),
  Y.support.submitBubbles || (Y.event.special.submit = {
    setup: function () {
      return !Y.nodeName(this, "form") && void Y.event.add(this, "click._submit keypress._submit", function (e) {
          var n = e.target
            , i = Y.nodeName(n, "input") || Y.nodeName(n, "button") ? n.form : t;
          i && !Y._data(i, "_submit_attached") && (Y.event.add(i, "submit._submit", function (e) {
            e._submit_bubble = !0
          }),
            Y._data(i, "_submit_attached", !0))
        })
    },
    postDispatch: function (e) {
      e._submit_bubble && (delete e._submit_bubble,
      this.parentNode && !e.isTrigger && Y.event.simulate("submit", this.parentNode, e, !0))
    },
    teardown: function () {
      return !Y.nodeName(this, "form") && void Y.event.remove(this, "._submit")
    }
  }),
  Y.support.changeBubbles || (Y.event.special.change = {
    setup: function () {
      return Se.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (Y.event.add(this, "propertychange._change", function (e) {
          "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
        }),
          Y.event.add(this, "click._change", function (e) {
            this._just_changed && !e.isTrigger && (this._just_changed = !1),
              Y.event.simulate("change", this, e, !0)
          })),
          !1) : void Y.event.add(this, "beforeactivate._change", function (e) {
          var t = e.target;
          Se.test(t.nodeName) && !Y._data(t, "_change_attached") && (Y.event.add(t, "change._change", function (e) {
            this.parentNode && !e.isSimulated && !e.isTrigger && Y.event.simulate("change", this.parentNode, e, !0)
          }),
            Y._data(t, "_change_attached", !0))
        })
    },
    handle: function (e) {
      var t = e.target;
      if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type)
        return e.handleObj.handler.apply(this, arguments)
    },
    teardown: function () {
      return Y.event.remove(this, "._change"),
        !Se.test(this.nodeName)
    }
  }),
  Y.support.focusinBubbles || Y.each({
    focus: "focusin",
    blur: "focusout"
  }, function (e, t) {
    var n = 0
      , i = function (e) {
      Y.event.simulate(t, e.target, Y.event.fix(e), !0)
    };
    Y.event.special[t] = {
      setup: function () {
        0 === n++ && D.addEventListener(e, i, !0)
      },
      teardown: function () {
        0 === --n && D.removeEventListener(e, i, !0)
      }
    }
  }),
    Y.fn.extend({
      on: function (e, n, i, a, r) {
        var s, l;
        if ("object" == typeof e) {
          "string" != typeof n && (i = i || n,
            n = t);
          for (l in e)
            this.on(l, n, i, e[l], r);
          return this
        }
        if (null == i && null == a ? (a = n,
              i = n = t) : null == a && ("string" == typeof n ? (a = i,
                i = t) : (a = i,
                i = n,
                n = t)),
          a === !1)
          a = o;
        else if (!a)
          return this;
        return 1 === r && (s = a,
          a = function (e) {
            return Y().off(e),
              s.apply(this, arguments)
          }
          ,
          a.guid = s.guid || (s.guid = Y.guid++)),
          this.each(function () {
            Y.event.add(this, e, a, i, n)
          })
      },
      one: function (e, t, n, i) {
        return this.on(e, t, n, i, 1)
      },
      off: function (e, n, i) {
        var a, r;
        if (e && e.preventDefault && e.handleObj)
          return a = e.handleObj,
            Y(e.delegateTarget).off(a.namespace ? a.origType + "." + a.namespace : a.origType, a.selector, a.handler),
            this;
        if ("object" == typeof e) {
          for (r in e)
            this.off(r, n, e[r]);
          return this
        }
        return n !== !1 && "function" != typeof n || (i = n,
          n = t),
        i === !1 && (i = o),
          this.each(function () {
            Y.event.remove(this, e, i, n)
          })
      },
      bind: function (e, t, n) {
        return this.on(e, null, t, n)
      },
      unbind: function (e, t) {
        return this.off(e, null, t)
      },
      live: function (e, t, n) {
        return Y(this.context).on(e, this.selector, t, n),
          this
      },
      die: function (e, t) {
        return Y(this.context).off(e, this.selector || "**", t),
          this
      },
      delegate: function (e, t, n, i) {
        return this.on(t, e, n, i)
      },
      undelegate: function (e, t, n) {
        return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
      },
      trigger: function (e, t) {
        return this.each(function () {
          Y.event.trigger(e, t, this)
        })
      },
      triggerHandler: function (e, t) {
        if (this[0])
          return Y.event.trigger(e, t, this[0], !0)
      },
      toggle: function (e) {
        var t = arguments
          , n = e.guid || Y.guid++
          , i = 0
          , a = function (n) {
          var a = (Y._data(this, "lastToggle" + e.guid) || 0) % i;
          return Y._data(this, "lastToggle" + e.guid, a + 1),
            n.preventDefault(),
          t[a].apply(this, arguments) || !1
        };
        for (a.guid = n; i < t.length;)
          t[i++].guid = n;
        return this.click(a)
      },
      hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e)
      }
    }),
    Y.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
      Y.fn[t] = function (e, n) {
        return null == n && (n = e,
          e = null),
          arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
      }
        ,
      Ie.test(t) && (Y.event.fixHooks[t] = Y.event.keyHooks),
      $e.test(t) && (Y.event.fixHooks[t] = Y.event.mouseHooks)
    }),
    function (e, t) {
      function n(e, t, n, i) {
        n = n || [],
          t = t || $;
        var a, o, r, s, l = t.nodeType;
        if (!e || "string" != typeof e)
          return n;
        if (1 !== l && 9 !== l)
          return [];
        if (r = w(t),
          !r && !i && (a = ne.exec(e)))
          if (s = a[1]) {
            if (9 === l) {
              if (o = t.getElementById(s),
                !o || !o.parentNode)
                return n;
              if (o.id === s)
                return n.push(o),
                  n
            } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(s)) && A(t, o) && o.id === s)
              return n.push(o),
                n
          } else {
            if (a[2])
              return H.apply(n, j.call(t.getElementsByTagName(e), 0)),
                n;
            if ((s = a[3]) && he && t.getElementsByClassName)
              return H.apply(n, j.call(t.getElementsByClassName(s), 0)),
                n
          }
        return f(e.replace(K, "$1"), t, n, i, r)
      }

      function i(e) {
        return function (t) {
          var n = t.nodeName.toLowerCase();
          return "input" === n && t.type === e
        }
      }

      function a(e) {
        return function (t) {
          var n = t.nodeName.toLowerCase();
          return ("input" === n || "button" === n) && t.type === e
        }
      }

      function o(e) {
        return P(function (t) {
          return t = +t,
            P(function (n, i) {
              for (var a, o = e([], n.length, t), r = o.length; r--;)
                n[a = o[r]] && (n[a] = !(i[a] = n[a]))
            })
        })
      }

      function r(e, t, n) {
        if (e === t)
          return n;
        for (var i = e.nextSibling; i;) {
          if (i === t)
            return -1;
          i = i.nextSibling
        }
        return 1
      }

      function s(e, t) {
        var i, a, o, r, s, l, c, d = F[E][e];
        if (d)
          return t ? 0 : d.slice(0);
        for (s = e,
               l = [],
               c = _.preFilter; s;) {
          i && !(a = Z.exec(s)) || (a && (s = s.slice(a[0].length)),
            l.push(o = [])),
            i = !1,
          (a = ee.exec(s)) && (o.push(i = new I(a.shift())),
            s = s.slice(i.length),
            i.type = a[0].replace(K, " "));
          for (r in _.filter)
            (a = se[r].exec(s)) && (!c[r] || (a = c[r](a, $, !0))) && (o.push(i = new I(a.shift())),
              s = s.slice(i.length),
              i.type = r,
              i.matches = a);
          if (!i)
            break
        }
        return t ? s.length : s ? n.error(e) : F(e, l).slice(0)
      }

      function l(e, t, n) {
        var i = t.dir
          , a = n && "parentNode" === t.dir
          , o = G++;
        return t.first ? function (t, n, o) {
            for (; t = t[i];)
              if (a || 1 === t.nodeType)
                return e(t, n, o)
          }
          : function (t, n, r) {
            if (r) {
              for (; t = t[i];)
                if ((a || 1 === t.nodeType) && e(t, n, r))
                  return t
            } else
              for (var s, l = N + " " + o + " ", c = l + v; t = t[i];)
                if (a || 1 === t.nodeType) {
                  if ((s = t[E]) === c)
                    return t.sizset;
                  if ("string" == typeof s && 0 === s.indexOf(l)) {
                    if (t.sizset)
                      return t
                  } else {
                    if (t[E] = c,
                        e(t, n, r))
                      return t.sizset = !0,
                        t;
                    t.sizset = !1
                  }
                }
          }
      }

      function c(e) {
        return e.length > 1 ? function (t, n, i) {
            for (var a = e.length; a--;)
              if (!e[a](t, n, i))
                return !1;
            return !0
          }
          : e[0]
      }

      function d(e, t, n, i, a) {
        for (var o, r = [], s = 0, l = e.length, c = null != t; s < l; s++)
          (o = e[s]) && (n && !n(o, i, a) || (r.push(o),
          c && t.push(s)));
        return r
      }

      function u(e, t, n, i, a, o) {
        return i && !i[E] && (i = u(i)),
        a && !a[E] && (a = u(a, o)),
          P(function (o, r, s, l) {
            if (!o || !a) {
              var c, u, h, p = [], f = [], m = r.length, v = o || g(t || "*", s.nodeType ? [s] : s, [], o), b = !e || !o && t ? v : d(v, p, e, s, l), _ = n ? a || (o ? e : m || i) ? [] : r : b;
              if (n && n(b, _, s, l),
                  i)
                for (h = d(_, f),
                       i(h, [], s, l),
                       c = h.length; c--;)
                  (u = h[c]) && (_[f[c]] = !(b[f[c]] = u));
              if (o)
                for (c = e && _.length; c--;)
                  (u = _[c]) && (o[p[c]] = !(r[p[c]] = u));
              else
                _ = d(_ === r ? _.splice(m, _.length) : _),
                  a ? a(null, r, _, l) : H.apply(r, _)
            }
          })
      }

      function h(e) {
        for (var t, n, i, a = e.length, o = _.relative[e[0].type], r = o || _.relative[" "], s = o ? 1 : 0, d = l(function (e) {
          return e === t
        }, r, !0), p = l(function (e) {
          return M.call(t, e) > -1
        }, r, !0), g = [function (e, n, i) {
          return !o && (i || n !== T) || ((t = n).nodeType ? d(e, n, i) : p(e, n, i))
        }
        ]; s < a; s++)
          if (n = _.relative[e[s].type])
            g = [l(c(g), n)];
          else {
            if (n = _.filter[e[s].type].apply(null, e[s].matches),
                n[E]) {
              for (i = ++s; i < a && !_.relative[e[i].type]; i++)
                ;
              return u(s > 1 && c(g), s > 1 && e.slice(0, s - 1).join("").replace(K, "$1"), n, s < i && h(e.slice(s, i)), i < a && h(e = e.slice(i)), i < a && e.join(""))
            }
            g.push(n)
          }
        return c(g)
      }

      function p(e, t) {
        var i = t.length > 0
          , a = e.length > 0
          , o = function (r, s, l, c, u) {
          var h, p, g, f = [], m = 0, b = "0", y = r && [], w = null != u, A = T, k = r || a && _.find.TAG("*", u && s.parentNode || s), x = N += null == A ? 1 : Math.E;
          for (w && (T = s !== $ && s,
            v = o.el); null != (h = k[b]); b++) {
            if (a && h) {
              for (p = 0; g = e[p]; p++)
                if (g(h, s, l)) {
                  c.push(h);
                  break
                }
              w && (N = x,
                v = ++o.el)
            }
            i && ((h = !g && h) && m--,
            r && y.push(h))
          }
          if (m += b,
            i && b !== m) {
            for (p = 0; g = t[p]; p++)
              g(y, f, s, l);
            if (r) {
              if (m > 0)
                for (; b--;)
                  !y[b] && !f[b] && (f[b] = B.call(c));
              f = d(f)
            }
            H.apply(c, f),
            w && !r && f.length > 0 && m + t.length > 1 && n.uniqueSort(c)
          }
          return w && (N = x,
            T = A),
            y
        };
        return o.el = 0,
          i ? P(o) : o
      }

      function g(e, t, i, a) {
        for (var o = 0, r = t.length; o < r; o++)
          n(e, t[o], i, a);
        return i
      }

      function f(e, t, n, i, a) {
        var o, r, l, c, d, u = s(e);
        u.length;
        if (!i && 1 === u.length) {
          if (r = u[0] = u[0].slice(0),
            r.length > 2 && "ID" === (l = r[0]).type && 9 === t.nodeType && !a && _.relative[r[1].type]) {
            if (t = _.find.ID(l.matches[0].replace(re, ""), t, a)[0],
                !t)
              return n;
            e = e.slice(r.shift().length)
          }
          for (o = se.POS.test(e) ? -1 : r.length - 1; o >= 0 && (l = r[o],
            !_.relative[c = l.type]); o--)
            if ((d = _.find[c]) && (i = d(l.matches[0].replace(re, ""), ie.test(r[0].type) && t.parentNode || t, a))) {
              if (r.splice(o, 1),
                  e = i.length && r.join(""),
                  !e)
                return H.apply(n, j.call(i, 0)),
                  n;
              break
            }
        }
        return k(e, u)(i, t, a, n, ie.test(e)),
          n
      }

      function m() {
      }

      var v, b, _, y, w, A, k, x, C, T, S = !0, L = "undefined", E = ("sizcache" + Math.random()).replace(".", ""), I = String, $ = e.document, W = $.documentElement, N = 0, G = 0, B = [].pop, H = [].push, j = [].slice, M = [].indexOf || function (e) {
          for (var t = 0, n = this.length; t < n; t++)
            if (this[t] === e)
              return t;
          return -1
        }
        , P = function (e, t) {
        return e[E] = null == t || t,
          e
      }, R = function () {
        var e = {}
          , t = [];
        return P(function (n, i) {
          return t.push(n) > _.cacheLength && delete e[t.shift()],
            e[n] = i
        }, e)
      }, D = R(), F = R(), O = R(), q = "[\\x20\\t\\r\\n\\f]", z = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", X = z.replace("w", "w#"), U = "([*^$|!~]?=)", V = "\\[" + q + "*(" + z + ")" + q + "*(?:" + U + q + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + X + ")|)|)" + q + "*\\]", Q = ":(" + z + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + V + ")|[^:]|\\\\.)*|.*))\\)|)", J = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + q + "*((?:-\\d)?\\d*)" + q + "*\\)|)(?=[^-]|$)", K = new RegExp("^" + q + "+|((?:^|[^\\\\])(?:\\\\.)*)" + q + "+$", "g"), Z = new RegExp("^" + q + "*," + q + "*"), ee = new RegExp("^" + q + "*([\\x20\\t\\r\\n\\f>+~])" + q + "*"), te = new RegExp(Q), ne = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, ie = /[\x20\t\r\n\f]*[+~]/, ae = /h\d/i, oe = /input|select|textarea|button/i, re = /\\(?!\\)/g, se = {
        ID: new RegExp("^#(" + z + ")"),
        CLASS: new RegExp("^\\.(" + z + ")"),
        NAME: new RegExp("^\\[name=['\"]?(" + z + ")['\"]?\\]"),
        TAG: new RegExp("^(" + z.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + V),
        PSEUDO: new RegExp("^" + Q),
        POS: new RegExp(J, "i"),
        CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + q + "*(even|odd|(([+-]|)(\\d*)n|)" + q + "*(?:([+-]|)" + q + "*(\\d+)|))" + q + "*\\)|)", "i"),
        needsContext: new RegExp("^" + q + "*[>+~]|" + J, "i")
      }, le = function (e) {
        var t = $.createElement("div");
        try {
          return e(t)
        } catch (n) {
          return !1
        } finally {
          t = null
        }
      }, ce = le(function (e) {
        return e.appendChild($.createComment("")),
          !e.getElementsByTagName("*").length
      }), de = le(function (e) {
        return e.innerHTML = "<a href='#'></a>",
        e.firstChild && typeof e.firstChild.getAttribute !== L && "#" === e.firstChild.getAttribute("href")
      }), ue = le(function (e) {
        e.innerHTML = "<select></select>";
        var t = typeof e.lastChild.getAttribute("multiple");
        return "boolean" !== t && "string" !== t
      }), he = le(function (e) {
        return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
        !(!e.getElementsByClassName || !e.getElementsByClassName("e").length) && (e.lastChild.className = "e",
        2 === e.getElementsByClassName("e").length)
      }), pe = le(function (e) {
        e.id = E + 0,
          e.innerHTML = "<a name='" + E + "'></a><div name='" + E + "'></div>",
          W.insertBefore(e, W.firstChild);
        var t = $.getElementsByName && $.getElementsByName(E).length === 2 + $.getElementsByName(E + 0).length;
        return b = !$.getElementById(E),
          W.removeChild(e),
          t
      });
      try {
        j.call(W.childNodes, 0)[0].nodeType
      } catch (ge) {
        j = function (e) {
          for (var t, n = []; t = this[e]; e++)
            n.push(t);
          return n
        }
      }
      n.matches = function (e, t) {
        return n(e, null, null, t)
      }
        ,
        n.matchesSelector = function (e, t) {
          return n(t, null, null, [e]).length > 0
        }
        ,
        y = n.getText = function (e) {
          var t, n = "", i = 0, a = e.nodeType;
          if (a) {
            if (1 === a || 9 === a || 11 === a) {
              if ("string" == typeof e.textContent)
                return e.textContent;
              for (e = e.firstChild; e; e = e.nextSibling)
                n += y(e)
            } else if (3 === a || 4 === a)
              return e.nodeValue
          } else
            for (; t = e[i]; i++)
              n += y(t);
          return n
        }
        ,
        w = n.isXML = function (e) {
          var t = e && (e.ownerDocument || e).documentElement;
          return !!t && "HTML" !== t.nodeName
        }
        ,
        A = n.contains = W.contains ? function (e, t) {
            var n = 9 === e.nodeType ? e.documentElement : e
              , i = t && t.parentNode;
            return e === i || !!(i && 1 === i.nodeType && n.contains && n.contains(i))
          }
          : W.compareDocumentPosition ? function (e, t) {
              return t && !!(16 & e.compareDocumentPosition(t))
            }
            : function (e, t) {
              for (; t = t.parentNode;)
                if (t === e)
                  return !0;
              return !1
            }
        ,
        n.attr = function (e, t) {
          var n, i = w(e);
          return i || (t = t.toLowerCase()),
            (n = _.attrHandle[t]) ? n(e) : i || ue ? e.getAttribute(t) : (n = e.getAttributeNode(t),
                  n ? "boolean" == typeof e[t] ? e[t] ? t : null : n.specified ? n.value : null : null)
        }
        ,
        _ = n.selectors = {
          cacheLength: 50,
          createPseudo: P,
          match: se,
          attrHandle: de ? {} : {
              href: function (e) {
                return e.getAttribute("href", 2)
              },
              type: function (e) {
                return e.getAttribute("type")
              }
            },
          find: {
            ID: b ? function (e, t, n) {
                if (typeof t.getElementById !== L && !n) {
                  var i = t.getElementById(e);
                  return i && i.parentNode ? [i] : []
                }
              }
              : function (e, n, i) {
                if (typeof n.getElementById !== L && !i) {
                  var a = n.getElementById(e);
                  return a ? a.id === e || typeof a.getAttributeNode !== L && a.getAttributeNode("id").value === e ? [a] : t : []
                }
              }
            ,
            TAG: ce ? function (e, t) {
                if (typeof t.getElementsByTagName !== L)
                  return t.getElementsByTagName(e)
              }
              : function (e, t) {
                var n = t.getElementsByTagName(e);
                if ("*" === e) {
                  for (var i, a = [], o = 0; i = n[o]; o++)
                    1 === i.nodeType && a.push(i);
                  return a
                }
                return n
              }
            ,
            NAME: pe && function (e, t) {
              if (typeof t.getElementsByName !== L)
                return t.getElementsByName(name)
            }
            ,
            CLASS: he && function (e, t, n) {
              if (typeof t.getElementsByClassName !== L && !n)
                return t.getElementsByClassName(e)
            }
          },
          relative: {
            ">": {
              dir: "parentNode",
              first: !0
            },
            " ": {
              dir: "parentNode"
            },
            "+": {
              dir: "previousSibling",
              first: !0
            },
            "~": {
              dir: "previousSibling"
            }
          },
          preFilter: {
            ATTR: function (e) {
              return e[1] = e[1].replace(re, ""),
                e[3] = (e[4] || e[5] || "").replace(re, ""),
              "~=" === e[2] && (e[3] = " " + e[3] + " "),
                e.slice(0, 4)
            },
            CHILD: function (e) {
              return e[1] = e[1].toLowerCase(),
                "nth" === e[1] ? (e[2] || n.error(e[0]),
                    e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * ("even" === e[2] || "odd" === e[2])),
                    e[4] = +(e[6] + e[7] || "odd" === e[2])) : e[2] && n.error(e[0]),
                e
            },
            PSEUDO: function (e) {
              var t, n;
              return se.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[3] : (t = e[4]) && (te.test(t) && (n = s(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n),
                    e[0] = e[0].slice(0, n)),
                    e[2] = t),
                  e.slice(0, 3))
            }
          },
          filter: {
            ID: b ? function (e) {
                return e = e.replace(re, ""),
                  function (t) {
                    return t.getAttribute("id") === e
                  }
              }
              : function (e) {
                return e = e.replace(re, ""),
                  function (t) {
                    var n = typeof t.getAttributeNode !== L && t.getAttributeNode("id");
                    return n && n.value === e
                  }
              }
            ,
            TAG: function (e) {
              return "*" === e ? function () {
                  return !0
                }
                : (e = e.replace(re, "").toLowerCase(),
                    function (t) {
                      return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                )
            },
            CLASS: function (e) {
              var t = D[E][e];
              return t || (t = D(e, new RegExp("(^|" + q + ")" + e + "(" + q + "|$)"))),
                function (e) {
                  return t.test(e.className || typeof e.getAttribute !== L && e.getAttribute("class") || "")
                }
            },
            ATTR: function (e, t, i) {
              return function (a, o) {
                var r = n.attr(a, e);
                return null == r ? "!=" === t : !t || (r += "",
                    "=" === t ? r === i : "!=" === t ? r !== i : "^=" === t ? i && 0 === r.indexOf(i) : "*=" === t ? i && r.indexOf(i) > -1 : "$=" === t ? i && r.substr(r.length - i.length) === i : "~=" === t ? (" " + r + " ").indexOf(i) > -1 : "|=" === t && (r === i || r.substr(0, i.length + 1) === i + "-"))
              }
            },
            CHILD: function (e, t, n, i) {
              return "nth" === e ? function (e) {
                  var t, a, o = e.parentNode;
                  if (1 === n && 0 === i)
                    return !0;
                  if (o)
                    for (a = 0,
                           t = o.firstChild; t && (1 !== t.nodeType || (a++,
                    e !== t)); t = t.nextSibling)
                      ;
                  return a -= i,
                  a === n || a % n === 0 && a / n >= 0
                }
                : function (t) {
                  var n = t;
                  switch (e) {
                    case "only":
                    case "first":
                      for (; n = n.previousSibling;)
                        if (1 === n.nodeType)
                          return !1;
                      if ("first" === e)
                        return !0;
                      n = t;
                    case "last":
                      for (; n = n.nextSibling;)
                        if (1 === n.nodeType)
                          return !1;
                      return !0
                  }
                }
            },
            PSEUDO: function (e, t) {
              var i, a = _.pseudos[e] || _.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
              return a[E] ? a(t) : a.length > 1 ? (i = [e, e, "", t],
                      _.setFilters.hasOwnProperty(e.toLowerCase()) ? P(function (e, n) {
                          for (var i, o = a(e, t), r = o.length; r--;)
                            i = M.call(e, o[r]),
                              e[i] = !(n[i] = o[r])
                        }) : function (e) {
                          return a(e, 0, i)
                        }
                  ) : a
            }
          },
          pseudos: {
            not: P(function (e) {
              var t = []
                , n = []
                , i = k(e.replace(K, "$1"));
              return i[E] ? P(function (e, t, n, a) {
                  for (var o, r = i(e, null, a, []), s = e.length; s--;)
                    (o = r[s]) && (e[s] = !(t[s] = o))
                }) : function (e, a, o) {
                  return t[0] = e,
                    i(t, null, o, n),
                    !n.pop()
                }
            }),
            has: P(function (e) {
              return function (t) {
                return n(e, t).length > 0
              }
            }),
            contains: P(function (e) {
              return function (t) {
                return (t.textContent || t.innerText || y(t)).indexOf(e) > -1
              }
            }),
            enabled: function (e) {
              return e.disabled === !1;
            },
            disabled: function (e) {
              return e.disabled === !0
            },
            checked: function (e) {
              var t = e.nodeName.toLowerCase();
              return "input" === t && !!e.checked || "option" === t && !!e.selected
            },
            selected: function (e) {
              return e.parentNode && e.parentNode.selectedIndex,
              e.selected === !0
            },
            parent: function (e) {
              return !_.pseudos.empty(e)
            },
            empty: function (e) {
              var t;
              for (e = e.firstChild; e;) {
                if (e.nodeName > "@" || 3 === (t = e.nodeType) || 4 === t)
                  return !1;
                e = e.nextSibling
              }
              return !0
            },
            header: function (e) {
              return ae.test(e.nodeName)
            },
            text: function (e) {
              var t, n;
              return "input" === e.nodeName.toLowerCase() && "text" === (t = e.type) && (null == (n = e.getAttribute("type")) || n.toLowerCase() === t)
            },
            radio: i("radio"),
            checkbox: i("checkbox"),
            file: i("file"),
            password: i("password"),
            image: i("image"),
            submit: a("submit"),
            reset: a("reset"),
            button: function (e) {
              var t = e.nodeName.toLowerCase();
              return "input" === t && "button" === e.type || "button" === t
            },
            input: function (e) {
              return oe.test(e.nodeName)
            },
            focus: function (e) {
              var t = e.ownerDocument;
              return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && (!!e.type || !!e.href)
            },
            active: function (e) {
              return e === e.ownerDocument.activeElement
            },
            first: o(function (e, t, n) {
              return [0]
            }),
            last: o(function (e, t, n) {
              return [t - 1]
            }),
            eq: o(function (e, t, n) {
              return [n < 0 ? n + t : n]
            }),
            even: o(function (e, t, n) {
              for (var i = 0; i < t; i += 2)
                e.push(i);
              return e
            }),
            odd: o(function (e, t, n) {
              for (var i = 1; i < t; i += 2)
                e.push(i);
              return e
            }),
            lt: o(function (e, t, n) {
              for (var i = n < 0 ? n + t : n; --i >= 0;)
                e.push(i);
              return e
            }),
            gt: o(function (e, t, n) {
              for (var i = n < 0 ? n + t : n; ++i < t;)
                e.push(i);
              return e
            })
          }
        },
        x = W.compareDocumentPosition ? function (e, t) {
            return e === t ? (C = !0,
                0) : (e.compareDocumentPosition && t.compareDocumentPosition ? 4 & e.compareDocumentPosition(t) : e.compareDocumentPosition) ? -1 : 1
          }
          : function (e, t) {
            if (e === t)
              return C = !0,
                0;
            if (e.sourceIndex && t.sourceIndex)
              return e.sourceIndex - t.sourceIndex;
            var n, i, a = [], o = [], s = e.parentNode, l = t.parentNode, c = s;
            if (s === l)
              return r(e, t);
            if (!s)
              return -1;
            if (!l)
              return 1;
            for (; c;)
              a.unshift(c),
                c = c.parentNode;
            for (c = l; c;)
              o.unshift(c),
                c = c.parentNode;
            n = a.length,
              i = o.length;
            for (var d = 0; d < n && d < i; d++)
              if (a[d] !== o[d])
                return r(a[d], o[d]);
            return d === n ? r(e, o[d], -1) : r(a[d], t, 1)
          }
        ,
        [0, 0].sort(x),
        S = !C,
        n.uniqueSort = function (e) {
          var t, n = 1;
          if (C = S,
              e.sort(x),
              C)
            for (; t = e[n]; n++)
              t === e[n - 1] && e.splice(n--, 1);
          return e
        }
        ,
        n.error = function (e) {
          throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ,
        k = n.compile = function (e, t) {
          var n, i = [], a = [], o = O[E][e];
          if (!o) {
            for (t || (t = s(e)),
                   n = t.length; n--;)
              o = h(t[n]),
                o[E] ? i.push(o) : a.push(o);
            o = O(e, p(a, i))
          }
          return o
        }
        ,
      $.querySelectorAll && function () {
        var e, t = f, i = /'|\\/g, a = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, o = [":focus"], r = [":active", ":focus"], l = W.matchesSelector || W.mozMatchesSelector || W.webkitMatchesSelector || W.oMatchesSelector || W.msMatchesSelector;
        le(function (e) {
          e.innerHTML = "<select><option selected=''></option></select>",
          e.querySelectorAll("[selected]").length || o.push("\\[" + q + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),
          e.querySelectorAll(":checked").length || o.push(":checked")
        }),
          le(function (e) {
            e.innerHTML = "<p test=''></p>",
            e.querySelectorAll("[test^='']").length && o.push("[*^$]=" + q + "*(?:\"\"|'')"),
              e.innerHTML = "<input type='hidden'/>",
            e.querySelectorAll(":enabled").length || o.push(":enabled", ":disabled")
          }),
          o = new RegExp(o.join("|")),
          f = function (e, n, a, r, l) {
            if (!(r || l || o && o.test(e))) {
              var c, d, u = !0, h = E, p = n, g = 9 === n.nodeType && e;
              if (1 === n.nodeType && "object" !== n.nodeName.toLowerCase()) {
                for (c = s(e),
                       (u = n.getAttribute("id")) ? h = u.replace(i, "\\$&") : n.setAttribute("id", h),
                       h = "[id='" + h + "'] ",
                       d = c.length; d--;)
                  c[d] = h + c[d].join("");
                p = ie.test(e) && n.parentNode || n,
                  g = c.join(",")
              }
              if (g)
                try {
                  return H.apply(a, j.call(p.querySelectorAll(g), 0)),
                    a
                } catch (f) {
                } finally {
                  u || n.removeAttribute("id")
                }
            }
            return t(e, n, a, r, l)
          }
          ,
        l && (le(function (t) {
            e = l.call(t, "div");
            try {
              l.call(t, "[test!='']:sizzle"),
                r.push("!=", Q)
            } catch (n) {
            }
          }),
            r = new RegExp(r.join("|")),
            n.matchesSelector = function (t, i) {
              if (i = i.replace(a, "='$1']"),
                  !(w(t) || r.test(i) || o && o.test(i)))
                try {
                  var s = l.call(t, i);
                  if (s || e || t.document && 11 !== t.document.nodeType)
                    return s
                } catch (c) {
                }
              return n(i, null, null, [t]).length > 0
            }
        )
      }(),
        _.pseudos.nth = _.pseudos.eq,
        _.filters = m.prototype = _.pseudos,
        _.setFilters = new m,
        n.attr = Y.attr,
        Y.find = n,
        Y.expr = n.selectors,
        Y.expr[":"] = Y.expr.pseudos,
        Y.unique = n.uniqueSort,
        Y.text = n.getText,
        Y.isXMLDoc = n.isXML,
        Y.contains = n.contains
    }(e);
  var Ge = /Until$/
    , Be = /^(?:parents|prev(?:Until|All))/
    , He = /^.[^:#\[\.,]*$/
    , je = Y.expr.match.needsContext
    , Me = {
    children: !0,
    contents: !0,
    next: !0,
    prev: !0
  };
  Y.fn.extend({
    find: function (e) {
      var t, n, i, a, o, r, s = this;
      if ("string" != typeof e)
        return Y(e).filter(function () {
          for (t = 0,
                 n = s.length; t < n; t++)
            if (Y.contains(s[t], this))
              return !0
        });
      for (r = this.pushStack("", "find", e),
             t = 0,
             n = this.length; t < n; t++)
        if (i = r.length,
            Y.find(e, this[t], r),
          t > 0)
          for (a = i; a < r.length; a++)
            for (o = 0; o < i; o++)
              if (r[o] === r[a]) {
                r.splice(a--, 1);
                break
              }
      return r
    },
    has: function (e) {
      var t, n = Y(e, this), i = n.length;
      return this.filter(function () {
        for (t = 0; t < i; t++)
          if (Y.contains(this, n[t]))
            return !0
      })
    },
    not: function (e) {
      return this.pushStack(c(this, e, !1), "not", e)
    },
    filter: function (e) {
      return this.pushStack(c(this, e, !0), "filter", e)
    },
    is: function (e) {
      return !!e && ("string" == typeof e ? je.test(e) ? Y(e, this.context).index(this[0]) >= 0 : Y.filter(e, this).length > 0 : this.filter(e).length > 0)
    },
    closest: function (e, t) {
      for (var n, i = 0, a = this.length, o = [], r = je.test(e) || "string" != typeof e ? Y(e, t || this.context) : 0; i < a; i++)
        for (n = this[i]; n && n.ownerDocument && n !== t && 11 !== n.nodeType;) {
          if (r ? r.index(n) > -1 : Y.find.matchesSelector(n, e)) {
            o.push(n);
            break
          }
          n = n.parentNode
        }
      return o = o.length > 1 ? Y.unique(o) : o,
        this.pushStack(o, "closest", e)
    },
    index: function (e) {
      return e ? "string" == typeof e ? Y.inArray(this[0], Y(e)) : Y.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
    },
    add: function (e, t) {
      var n = "string" == typeof e ? Y(e, t) : Y.makeArray(e && e.nodeType ? [e] : e)
        , i = Y.merge(this.get(), n);
      return this.pushStack(s(n[0]) || s(i[0]) ? i : Y.unique(i))
    },
    addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
  }),
    Y.fn.andSelf = Y.fn.addBack,
    Y.each({
      parent: function (e) {
        var t = e.parentNode;
        return t && 11 !== t.nodeType ? t : null
      },
      parents: function (e) {
        return Y.dir(e, "parentNode")
      },
      parentsUntil: function (e, t, n) {
        return Y.dir(e, "parentNode", n)
      },
      next: function (e) {
        return l(e, "nextSibling")
      },
      prev: function (e) {
        return l(e, "previousSibling")
      },
      nextAll: function (e) {
        return Y.dir(e, "nextSibling")
      },
      prevAll: function (e) {
        return Y.dir(e, "previousSibling")
      },
      nextUntil: function (e, t, n) {
        return Y.dir(e, "nextSibling", n)
      },
      prevUntil: function (e, t, n) {
        return Y.dir(e, "previousSibling", n)
      },
      siblings: function (e) {
        return Y.sibling((e.parentNode || {}).firstChild, e)
      },
      children: function (e) {
        return Y.sibling(e.firstChild)
      },
      contents: function (e) {
        return Y.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : Y.merge([], e.childNodes)
      }
    }, function (e, t) {
      Y.fn[e] = function (n, i) {
        var a = Y.map(this, t, n);
        return Ge.test(e) || (i = n),
        i && "string" == typeof i && (a = Y.filter(i, a)),
          a = this.length > 1 && !Me[e] ? Y.unique(a) : a,
        this.length > 1 && Be.test(e) && (a = a.reverse()),
          this.pushStack(a, e, U.call(arguments).join(","))
      }
    }),
    Y.extend({
      filter: function (e, t, n) {
        return n && (e = ":not(" + e + ")"),
          1 === t.length ? Y.find.matchesSelector(t[0], e) ? [t[0]] : [] : Y.find.matches(e, t)
      },
      dir: function (e, n, i) {
        for (var a = [], o = e[n]; o && 9 !== o.nodeType && (i === t || 1 !== o.nodeType || !Y(o).is(i));)
          1 === o.nodeType && a.push(o),
            o = o[n];
        return a
      },
      sibling: function (e, t) {
        for (var n = []; e; e = e.nextSibling)
          1 === e.nodeType && e !== t && n.push(e);
        return n
      }
    });
  var Pe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
    , Re = / jQuery\d+="(?:null|\d+)"/g
    , De = /^\s+/
    , Fe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
    , Oe = /<([\w:]+)/
    , qe = /<tbody/i
    , ze = /<|&#?\w+;/
    , Xe = /<(?:script|style|link)/i
    , Ue = /<(?:script|object|embed|option|style)/i
    , Ve = new RegExp("<(?:" + Pe + ")[\\s/>]", "i")
    , Qe = /^(?:checkbox|radio)$/
    , Je = /checked\s*(?:[^=]|=\s*.checked.)/i
    , Ke = /\/(java|ecma)script/i
    , Ye = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g
    , Ze = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    legend: [1, "<fieldset>", "</fieldset>"],
    thead: [1, "<table>", "</table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    area: [1, "<map>", "</map>"],
    _default: [0, "", ""]
  }
    , et = d(D)
    , tt = et.appendChild(D.createElement("div"));
  Ze.optgroup = Ze.option,
    Ze.tbody = Ze.tfoot = Ze.colgroup = Ze.caption = Ze.thead,
    Ze.th = Ze.td,
  Y.support.htmlSerialize || (Ze._default = [1, "X<div>", "</div>"]),
    Y.fn.extend({
      text: function (e) {
        return Y.access(this, function (e) {
          return e === t ? Y.text(this) : this.empty().append((this[0] && this[0].ownerDocument || D).createTextNode(e))
        }, null, e, arguments.length)
      },
      wrapAll: function (e) {
        if (Y.isFunction(e))
          return this.each(function (t) {
            Y(this).wrapAll(e.call(this, t))
          });
        if (this[0]) {
          var t = Y(e, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && t.insertBefore(this[0]),
            t.map(function () {
              for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;)
                e = e.firstChild;
              return e
            }).append(this)
        }
        return this
      },
      wrapInner: function (e) {
        return Y.isFunction(e) ? this.each(function (t) {
            Y(this).wrapInner(e.call(this, t))
          }) : this.each(function () {
            var t = Y(this)
              , n = t.contents();
            n.length ? n.wrapAll(e) : t.append(e)
          })
      },
      wrap: function (e) {
        var t = Y.isFunction(e);
        return this.each(function (n) {
          Y(this).wrapAll(t ? e.call(this, n) : e)
        })
      },
      unwrap: function () {
        return this.parent().each(function () {
          Y.nodeName(this, "body") || Y(this).replaceWith(this.childNodes)
        }).end()
      },
      append: function () {
        return this.domManip(arguments, !0, function (e) {
          (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(e)
        })
      },
      prepend: function () {
        return this.domManip(arguments, !0, function (e) {
          (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(e, this.firstChild)
        })
      },
      before: function () {
        if (!s(this[0]))
          return this.domManip(arguments, !1, function (e) {
            this.parentNode.insertBefore(e, this)
          });
        if (arguments.length) {
          var e = Y.clean(arguments);
          return this.pushStack(Y.merge(e, this), "before", this.selector)
        }
      },
      after: function () {
        if (!s(this[0]))
          return this.domManip(arguments, !1, function (e) {
            this.parentNode.insertBefore(e, this.nextSibling)
          });
        if (arguments.length) {
          var e = Y.clean(arguments);
          return this.pushStack(Y.merge(this, e), "after", this.selector)
        }
      },
      remove: function (e, t) {
        for (var n, i = 0; null != (n = this[i]); i++)
          e && !Y.filter(e, [n]).length || (!t && 1 === n.nodeType && (Y.cleanData(n.getElementsByTagName("*")),
            Y.cleanData([n])),
          n.parentNode && n.parentNode.removeChild(n));
        return this
      },
      empty: function () {
        for (var e, t = 0; null != (e = this[t]); t++)
          for (1 === e.nodeType && Y.cleanData(e.getElementsByTagName("*")); e.firstChild;)
            e.removeChild(e.firstChild);
        return this
      },
      clone: function (e, t) {
        return e = null != e && e,
          t = null == t ? e : t,
          this.map(function () {
            return Y.clone(this, e, t)
          })
      },
      html: function (e) {
        return Y.access(this, function (e) {
          var n = this[0] || {}
            , i = 0
            , a = this.length;
          if (e === t)
            return 1 === n.nodeType ? n.innerHTML.replace(Re, "") : t;
          if ("string" == typeof e && !Xe.test(e) && (Y.support.htmlSerialize || !Ve.test(e)) && (Y.support.leadingWhitespace || !De.test(e)) && !Ze[(Oe.exec(e) || ["", ""])[1].toLowerCase()]) {
            e = e.replace(Fe, "<$1></$2>");
            try {
              for (; i < a; i++)
                n = this[i] || {},
                1 === n.nodeType && (Y.cleanData(n.getElementsByTagName("*")),
                  n.innerHTML = e);
              n = 0
            } catch (o) {
            }
          }
          n && this.empty().append(e)
        }, null, e, arguments.length)
      },
      replaceWith: function (e) {
        return s(this[0]) ? this.length ? this.pushStack(Y(Y.isFunction(e) ? e() : e), "replaceWith", e) : this : Y.isFunction(e) ? this.each(function (t) {
              var n = Y(this)
                , i = n.html();
              n.replaceWith(e.call(this, t, i))
            }) : ("string" != typeof e && (e = Y(e).detach()),
              this.each(function () {
                var t = this.nextSibling
                  , n = this.parentNode;
                Y(this).remove(),
                  t ? Y(t).before(e) : Y(n).append(e)
              }))
      },
      detach: function (e) {
        return this.remove(e, !0)
      },
      domManip: function (e, n, i) {
        e = [].concat.apply([], e);
        var a, o, r, s, l = 0, c = e[0], d = [], h = this.length;
        if (!Y.support.checkClone && h > 1 && "string" == typeof c && Je.test(c))
          return this.each(function () {
            Y(this).domManip(e, n, i)
          });
        if (Y.isFunction(c))
          return this.each(function (a) {
            var o = Y(this);
            e[0] = c.call(this, a, n ? o.html() : t),
              o.domManip(e, n, i)
          });
        if (this[0]) {
          if (a = Y.buildFragment(e, this, d),
              r = a.fragment,
              o = r.firstChild,
            1 === r.childNodes.length && (r = o),
              o)
            for (n = n && Y.nodeName(o, "tr"),
                   s = a.cacheable || h - 1; l < h; l++)
              i.call(n && Y.nodeName(this[l], "table") ? u(this[l], "tbody") : this[l], l === s ? r : Y.clone(r, !0, !0));
          r = o = null,
          d.length && Y.each(d, function (e, t) {
            t.src ? Y.ajax ? Y.ajax({
                  url: t.src,
                  type: "GET",
                  dataType: "script",
                  async: !1,
                  global: !1,
                  "throws": !0
                }) : Y.error("no ajax") : Y.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Ye, "")),
            t.parentNode && t.parentNode.removeChild(t)
          })
        }
        return this
      }
    }),
    Y.buildFragment = function (e, n, i) {
      var a, o, r, s = e[0];
      return n = n || D,
        n = !n.nodeType && n[0] || n,
        n = n.ownerDocument || n,
      1 === e.length && "string" == typeof s && s.length < 512 && n === D && "<" === s.charAt(0) && !Ue.test(s) && (Y.support.checkClone || !Je.test(s)) && (Y.support.html5Clone || !Ve.test(s)) && (o = !0,
        a = Y.fragments[s],
        r = a !== t),
      a || (a = n.createDocumentFragment(),
        Y.clean(e, n, a, i),
      o && (Y.fragments[s] = r && a)),
        {
          fragment: a,
          cacheable: o
        }
    }
    ,
    Y.fragments = {},
    Y.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    }, function (e, t) {
      Y.fn[e] = function (n) {
        var i, a = 0, o = [], r = Y(n), s = r.length, l = 1 === this.length && this[0].parentNode;
        if ((null == l || l && 11 === l.nodeType && 1 === l.childNodes.length) && 1 === s)
          return r[t](this[0]),
            this;
        for (; a < s; a++)
          i = (a > 0 ? this.clone(!0) : this).get(),
            Y(r[a])[t](i),
            o = o.concat(i);
        return this.pushStack(o, e, r.selector)
      }
    }),
    Y.extend({
      clone: function (e, t, n) {
        var i, a, o, r;
        if (Y.support.html5Clone || Y.isXMLDoc(e) || !Ve.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (tt.innerHTML = e.outerHTML,
              tt.removeChild(r = tt.firstChild)),
            !(Y.support.noCloneEvent && Y.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Y.isXMLDoc(e)))
          for (p(e, r),
                 i = g(e),
                 a = g(r),
                 o = 0; i[o]; ++o)
            a[o] && p(i[o], a[o]);
        if (t && (h(e, r),
            n))
          for (i = g(e),
                 a = g(r),
                 o = 0; i[o]; ++o)
            h(i[o], a[o]);
        return i = a = null,
          r
      },
      clean: function (e, t, n, i) {
        var a, o, r, s, l, c, u, h, p, g, m, v = t === D && et, b = [];
        for (t && "undefined" != typeof t.createDocumentFragment || (t = D),
               a = 0; null != (r = e[a]); a++)
          if ("number" == typeof r && (r += ""),
              r) {
            if ("string" == typeof r)
              if (ze.test(r)) {
                for (v = v || d(t),
                       u = t.createElement("div"),
                       v.appendChild(u),
                       r = r.replace(Fe, "<$1></$2>"),
                       s = (Oe.exec(r) || ["", ""])[1].toLowerCase(),
                       l = Ze[s] || Ze._default,
                       c = l[0],
                       u.innerHTML = l[1] + r + l[2]; c--;)
                  u = u.lastChild;
                if (!Y.support.tbody)
                  for (h = qe.test(r),
                         p = "table" !== s || h ? "<table>" !== l[1] || h ? [] : u.childNodes : u.firstChild && u.firstChild.childNodes,
                         o = p.length - 1; o >= 0; --o)
                    Y.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(p[o]);
                !Y.support.leadingWhitespace && De.test(r) && u.insertBefore(t.createTextNode(De.exec(r)[0]), u.firstChild),
                  r = u.childNodes,
                  u.parentNode.removeChild(u)
              } else
                r = t.createTextNode(r);
            r.nodeType ? b.push(r) : Y.merge(b, r)
          }
        if (u && (r = u = v = null),
            !Y.support.appendChecked)
          for (a = 0; null != (r = b[a]); a++)
            Y.nodeName(r, "input") ? f(r) : "undefined" != typeof r.getElementsByTagName && Y.grep(r.getElementsByTagName("input"), f);
        if (n)
          for (g = function (e) {
            if (!e.type || Ke.test(e.type))
              return i ? i.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e)
          }
                 ,
                 a = 0; null != (r = b[a]); a++)
            Y.nodeName(r, "script") && g(r) || (n.appendChild(r),
            "undefined" != typeof r.getElementsByTagName && (m = Y.grep(Y.merge([], r.getElementsByTagName("script")), g),
              b.splice.apply(b, [a + 1, 0].concat(m)),
              a += m.length));
        return b
      },
      cleanData: function (e, t) {
        for (var n, i, a, o, r = 0, s = Y.expando, l = Y.cache, c = Y.support.deleteExpando, d = Y.event.special; null != (a = e[r]); r++)
          if ((t || Y.acceptData(a)) && (i = a[s],
              n = i && l[i])) {
            if (n.events)
              for (o in n.events)
                d[o] ? Y.event.remove(a, o) : Y.removeEvent(a, o, n.handle);
            l[i] && (delete l[i],
              c ? delete a[s] : a.removeAttribute ? a.removeAttribute(s) : a[s] = null,
              Y.deletedIds.push(i))
          }
      }
    }),
    function () {
      var e, t;
      Y.uaMatch = function (e) {
        e = e.toLowerCase();
        var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
        return {
          browser: t[1] || "",
          version: t[2] || "0"
        }
      }
        ,
        e = Y.uaMatch(O.userAgent),
        t = {},
      e.browser && (t[e.browser] = !0,
        t.version = e.version),
        t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0),
        Y.browser = t,
        Y.sub = function () {
          function e(t, n) {
            return new e.fn.init(t, n)
          }

          Y.extend(!0, e, this),
            e.superclass = this,
            e.fn = e.prototype = this(),
            e.fn.constructor = e,
            e.sub = this.sub,
            e.fn.init = function n(n, i) {
              return i && i instanceof Y && !(i instanceof e) && (i = e(i)),
                Y.fn.init.call(this, n, i, t)
            }
            ,
            e.fn.init.prototype = e.fn;
          var t = e(D);
          return e
        }
    }();
  var nt, it, at, ot = /alpha\([^)]*\)/i, rt = /opacity=([^)]*)/, st = /^(top|right|bottom|left)$/, lt = /^(none|table(?!-c[ea]).+)/, ct = /^margin/, dt = new RegExp("^(" + Z + ")(.*)$", "i"), ut = new RegExp("^(" + Z + ")(?!px)[a-z%]+$", "i"), ht = new RegExp("^([-+])=(" + Z + ")", "i"), pt = {}, gt = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  }, ft = {
    letterSpacing: 0,
    fontWeight: 400
  }, mt = ["Top", "Right", "Bottom", "Left"], vt = ["Webkit", "O", "Moz", "ms"], bt = Y.fn.toggle;
  Y.fn.extend({
    css: function (e, n) {
      return Y.access(this, function (e, n, i) {
        return i !== t ? Y.style(e, n, i) : Y.css(e, n)
      }, e, n, arguments.length > 1)
    },
    show: function () {
      return b(this, !0)
    },
    hide: function () {
      return b(this)
    },
    toggle: function (e, t) {
      var n = "boolean" == typeof e;
      return Y.isFunction(e) && Y.isFunction(t) ? bt.apply(this, arguments) : this.each(function () {
          (n ? e : v(this)) ? Y(this).show() : Y(this).hide()
        })
    }
  }),
    Y.extend({
      cssHooks: {
        opacity: {
          get: function (e, t) {
            if (t) {
              var n = nt(e, "opacity");
              return "" === n ? "1" : n
            }
          }
        }
      },
      cssNumber: {
        fillOpacity: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0
      },
      cssProps: {
        "float": Y.support.cssFloat ? "cssFloat" : "styleFloat"
      },
      style: function (e, n, i, a) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
          var o, r, s, l = Y.camelCase(n), c = e.style;
          if (n = Y.cssProps[l] || (Y.cssProps[l] = m(c, l)),
              s = Y.cssHooks[n] || Y.cssHooks[l],
            i === t)
            return s && "get" in s && (o = s.get(e, !1, a)) !== t ? o : c[n];
          if (r = typeof i,
            "string" === r && (o = ht.exec(i)) && (i = (o[1] + 1) * o[2] + parseFloat(Y.css(e, n)),
              r = "number"),
              !(null == i || "number" === r && isNaN(i) || ("number" === r && !Y.cssNumber[l] && (i += "px"),
              s && "set" in s && (i = s.set(e, i, a)) === t)))
            try {
              c[n] = i
            } catch (d) {
            }
        }
      },
      css: function (e, n, i, a) {
        var o, r, s, l = Y.camelCase(n);
        return n = Y.cssProps[l] || (Y.cssProps[l] = m(e.style, l)),
          s = Y.cssHooks[n] || Y.cssHooks[l],
        s && "get" in s && (o = s.get(e, !0, a)),
        o === t && (o = nt(e, n)),
        "normal" === o && n in ft && (o = ft[n]),
          i || a !== t ? (r = parseFloat(o),
              i || Y.isNumeric(r) ? r || 0 : o) : o
      },
      swap: function (e, t, n) {
        var i, a, o = {};
        for (a in t)
          o[a] = e.style[a],
            e.style[a] = t[a];
        i = n.call(e);
        for (a in t)
          e.style[a] = o[a];
        return i
      }
    }),
    e.getComputedStyle ? nt = function (t, n) {
        var i, a, o, r, s = e.getComputedStyle(t, null), l = t.style;
        return s && (i = s[n],
        "" === i && !Y.contains(t.ownerDocument, t) && (i = Y.style(t, n)),
        ut.test(i) && ct.test(n) && (a = l.width,
          o = l.minWidth,
          r = l.maxWidth,
          l.minWidth = l.maxWidth = l.width = i,
          i = s.width,
          l.width = a,
          l.minWidth = o,
          l.maxWidth = r)),
          i
      }
      : D.documentElement.currentStyle && (nt = function (e, t) {
          var n, i, a = e.currentStyle && e.currentStyle[t], o = e.style;
          return null == a && o && o[t] && (a = o[t]),
          ut.test(a) && !st.test(t) && (n = o.left,
            i = e.runtimeStyle && e.runtimeStyle.left,
          i && (e.runtimeStyle.left = e.currentStyle.left),
            o.left = "fontSize" === t ? "1em" : a,
            a = o.pixelLeft + "px",
            o.left = n,
          i && (e.runtimeStyle.left = i)),
            "" === a ? "auto" : a
        }
      ),
    Y.each(["height", "width"], function (e, t) {
      Y.cssHooks[t] = {
        get: function (e, n, i) {
          if (n)
            return 0 === e.offsetWidth && lt.test(nt(e, "display")) ? Y.swap(e, gt, function () {
                return w(e, t, i)
              }) : w(e, t, i)
        },
        set: function (e, n, i) {
          return _(e, n, i ? y(e, t, i, Y.support.boxSizing && "border-box" === Y.css(e, "boxSizing")) : 0)
        }
      }
    }),
  Y.support.opacity || (Y.cssHooks.opacity = {
    get: function (e, t) {
      return rt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
    },
    set: function (e, t) {
      var n = e.style
        , i = e.currentStyle
        , a = Y.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : ""
        , o = i && i.filter || n.filter || "";
      n.zoom = 1,
      t >= 1 && "" === Y.trim(o.replace(ot, "")) && n.removeAttribute && (n.removeAttribute("filter"),
      i && !i.filter) || (n.filter = ot.test(o) ? o.replace(ot, a) : o + " " + a)
    }
  }),
    Y(function () {
      Y.support.reliableMarginRight || (Y.cssHooks.marginRight = {
        get: function (e, t) {
          return Y.swap(e, {
            display: "inline-block"
          }, function () {
            if (t)
              return nt(e, "marginRight")
          })
        }
      }),
      !Y.support.pixelPosition && Y.fn.position && Y.each(["top", "left"], function (e, t) {
        Y.cssHooks[t] = {
          get: function (e, n) {
            if (n) {
              var i = nt(e, t);
              return ut.test(i) ? Y(e).position()[t] + "px" : i
            }
          }
        }
      })
    }),
  Y.expr && Y.expr.filters && (Y.expr.filters.hidden = function (e) {
      return 0 === e.offsetWidth && 0 === e.offsetHeight || !Y.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || nt(e, "display"))
    }
      ,
      Y.expr.filters.visible = function (e) {
        return !Y.expr.filters.hidden(e)
      }
  ),
    Y.each({
      margin: "",
      padding: "",
      border: "Width"
    }, function (e, t) {
      Y.cssHooks[e + t] = {
        expand: function (n) {
          var i, a = "string" == typeof n ? n.split(" ") : [n], o = {};
          for (i = 0; i < 4; i++)
            o[e + mt[i] + t] = a[i] || a[i - 2] || a[0];
          return o
        }
      },
      ct.test(e) || (Y.cssHooks[e + t].set = _)
    });
  var _t = /%20/g
    , yt = /\[\]$/
    , wt = /\r?\n/g
    , At = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i
    , kt = /^(?:select|textarea)/i;
  Y.fn.extend({
    serialize: function () {
      return Y.param(this.serializeArray())
    },
    serializeArray: function () {
      return this.map(function () {
        return this.elements ? Y.makeArray(this.elements) : this
      }).filter(function () {
        return this.name && !this.disabled && (this.checked || kt.test(this.nodeName) || At.test(this.type))
      }).map(function (e, t) {
        var n = Y(this).val();
        return null == n ? null : Y.isArray(n) ? Y.map(n, function (e, n) {
              return {
                name: t.name,
                value: e.replace(wt, "\r\n")
              }
            }) : {
              name: t.name,
              value: n.replace(wt, "\r\n")
            }
      }).get()
    }
  }),
    Y.param = function (e, n) {
      var i, a = [], o = function (e, t) {
        t = Y.isFunction(t) ? t() : null == t ? "" : t,
          a[a.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
      };
      if (n === t && (n = Y.ajaxSettings && Y.ajaxSettings.traditional),
        Y.isArray(e) || e.jquery && !Y.isPlainObject(e))
        Y.each(e, function () {
          o(this.name, this.value)
        });
      else
        for (i in e)
          k(i, e[i], n, o);
      return a.join("&").replace(_t, "+")
    }
  ;
  var xt, Ct, Tt = /#.*$/, St = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Lt = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, Et = /^(?:GET|HEAD)$/, It = /^\/\//, $t = /\?/, Wt = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, Nt = /([?&])_=[^&]*/, Gt = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Bt = Y.fn.load, Ht = {}, jt = {}, Mt = ["*/"] + ["*"];
  try {
    Ct = F.href
  } catch (Pt) {
    Ct = D.createElement("a"),
      Ct.href = "",
      Ct = Ct.href
  }
  xt = Gt.exec(Ct.toLowerCase()) || [],
    Y.fn.load = function (e, n, i) {
      if ("string" != typeof e && Bt)
        return Bt.apply(this, arguments);
      if (!this.length)
        return this;
      var a, o, r, s = this, l = e.indexOf(" ");
      return l >= 0 && (a = e.slice(l, e.length),
        e = e.slice(0, l)),
        Y.isFunction(n) ? (i = n,
            n = t) : n && "object" == typeof n && (o = "POST"),
        Y.ajax({
          url: e,
          type: o,
          dataType: "html",
          data: n,
          complete: function (e, t) {
            i && s.each(i, r || [e.responseText, t, e])
          }
        }).done(function (e) {
          r = arguments,
            s.html(a ? Y("<div>").append(e.replace(Wt, "")).find(a) : e)
        }),
        this
    }
    ,
    Y.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, t) {
      Y.fn[t] = function (e) {
        return this.on(t, e)
      }
    }),
    Y.each(["get", "post"], function (e, n) {
      Y[n] = function (e, i, a, o) {
        return Y.isFunction(i) && (o = o || a,
          a = i,
          i = t),
          Y.ajax({
            type: n,
            url: e,
            data: i,
            success: a,
            dataType: o
          })
      }
    }),
    Y.extend({
      getScript: function (e, n) {
        return Y.get(e, t, n, "script")
      },
      getJSON: function (e, t, n) {
        return Y.get(e, t, n, "json")
      },
      ajaxSetup: function (e, t) {
        return t ? T(e, Y.ajaxSettings) : (t = e,
            e = Y.ajaxSettings),
          T(e, t),
          e
      },
      ajaxSettings: {
        url: Ct,
        isLocal: Lt.test(xt[1]),
        global: !0,
        type: "GET",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        processData: !0,
        async: !0,
        accepts: {
          xml: "application/xml, text/xml",
          html: "text/html",
          text: "text/plain",
          json: "application/json, text/javascript",
          "*": Mt
        },
        contents: {
          xml: /xml/,
          html: /html/,
          json: /json/
        },
        responseFields: {
          xml: "responseXML",
          text: "responseText"
        },
        converters: {
          "* text": e.String,
          "text html": !0,
          "text json": Y.parseJSON,
          "text xml": Y.parseXML
        },
        flatOptions: {
          context: !0,
          url: !0
        }
      },
      ajaxPrefilter: x(Ht),
      ajaxTransport: x(jt),
      ajax: function (e, n) {
        function i(e, n, i, r) {
          var c, u, b, _, w, k = n;
          2 !== y && (y = 2,
          l && clearTimeout(l),
            s = t,
            o = r || "",
            A.readyState = e > 0 ? 4 : 0,
          i && (_ = S(h, A, i)),
            e >= 200 && e < 300 || 304 === e ? (h.ifModified && (w = A.getResponseHeader("Last-Modified"),
              w && (Y.lastModified[a] = w),
                w = A.getResponseHeader("Etag"),
              w && (Y.etag[a] = w)),
                304 === e ? (k = "notmodified",
                    c = !0) : (c = L(h, _),
                    k = c.state,
                    u = c.data,
                    b = c.error,
                    c = !b)) : (b = k,
              k && !e || (k = "error",
              e < 0 && (e = 0))),
            A.status = e,
            A.statusText = (n || k) + "",
            c ? f.resolveWith(p, [u, k, A]) : f.rejectWith(p, [A, k, b]),
            A.statusCode(v),
            v = t,
          d && g.trigger("ajax" + (c ? "Success" : "Error"), [A, h, c ? u : b]),
            m.fireWith(p, [A, k]),
          d && (g.trigger("ajaxComplete", [A, h]),
          --Y.active || Y.event.trigger("ajaxStop")))
        }

        "object" == typeof e && (n = e,
          e = t),
          n = n || {};
        var a, o, r, s, l, c, d, u, h = Y.ajaxSetup({}, n), p = h.context || h, g = p !== h && (p.nodeType || p instanceof Y) ? Y(p) : Y.event, f = Y.Deferred(), m = Y.Callbacks("once memory"), v = h.statusCode || {}, b = {}, _ = {}, y = 0, w = "canceled", A = {
          readyState: 0,
          setRequestHeader: function (e, t) {
            if (!y) {
              var n = e.toLowerCase();
              e = _[n] = _[n] || e,
                b[e] = t
            }
            return this
          },
          getAllResponseHeaders: function () {
            return 2 === y ? o : null
          },
          getResponseHeader: function (e) {
            var n;
            if (2 === y) {
              if (!r)
                for (r = {}; n = St.exec(o);)
                  r[n[1].toLowerCase()] = n[2];
              n = r[e.toLowerCase()]
            }
            return n === t ? null : n
          },
          overrideMimeType: function (e) {
            return y || (h.mimeType = e),
              this
          },
          abort: function (e) {
            return e = e || w,
            s && s.abort(e),
              i(0, e),
              this
          }
        };
        if (f.promise(A),
            A.success = A.done,
            A.error = A.fail,
            A.complete = m.add,
            A.statusCode = function (e) {
              if (e) {
                var t;
                if (y < 2)
                  for (t in e)
                    v[t] = [v[t], e[t]];
                else
                  t = e[A.status],
                    A.always(t)
              }
              return this
            }
            ,
            h.url = ((e || h.url) + "").replace(Tt, "").replace(It, xt[1] + "//"),
            h.dataTypes = Y.trim(h.dataType || "*").toLowerCase().split(te),
          null == h.crossDomain && (c = Gt.exec(h.url.toLowerCase()) || !1,
            h.crossDomain = c && c.join(":") + (c[3] ? "" : "http:" === c[1] ? 80 : 443) !== xt.join(":") + (xt[3] ? "" : "http:" === xt[1] ? 80 : 443)),
          h.data && h.processData && "string" != typeof h.data && (h.data = Y.param(h.data, h.traditional)),
            C(Ht, h, n, A),
          2 === y)
          return A;
        if (d = h.global,
            h.type = h.type.toUpperCase(),
            h.hasContent = !Et.test(h.type),
          d && 0 === Y.active++ && Y.event.trigger("ajaxStart"),
          !h.hasContent && (h.data && (h.url += ($t.test(h.url) ? "&" : "?") + h.data,
            delete h.data),
            a = h.url,
          h.cache === !1)) {
          var k = Y.now()
            , x = h.url.replace(Nt, "$1_=" + k);
          h.url = x + (x === h.url ? ($t.test(h.url) ? "&" : "?") + "_=" + k : "")
        }
        (h.data && h.hasContent && h.contentType !== !1 || n.contentType) && A.setRequestHeader("Content-Type", h.contentType),
        h.ifModified && (a = a || h.url,
        Y.lastModified[a] && A.setRequestHeader("If-Modified-Since", Y.lastModified[a]),
        Y.etag[a] && A.setRequestHeader("If-None-Match", Y.etag[a])),
          A.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Mt + "; q=0.01" : "") : h.accepts["*"]);
        for (u in h.headers)
          A.setRequestHeader(u, h.headers[u]);
        if (!h.beforeSend || h.beforeSend.call(p, A, h) !== !1 && 2 !== y) {
          w = "abort";
          for (u in {
            success: 1,
            error: 1,
            complete: 1
          })
            A[u](h[u]);
          if (s = C(jt, h, n, A)) {
            A.readyState = 1,
            d && g.trigger("ajaxSend", [A, h]),
            h.async && h.timeout > 0 && (l = setTimeout(function () {
              A.abort("timeout")
            }, h.timeout));
            try {
              y = 1,
                s.send(b, i)
            } catch (T) {
              if (!(y < 2))
                throw T;
              i(-1, T)
            }
          } else
            i(-1, "No Transport");
          return A
        }
        return A.abort()
      },
      active: 0,
      lastModified: {},
      etag: {}
    });
  var Rt = []
    , Dt = /\?/
    , Ft = /(=)\?(?=&|$)|\?\?/
    , Ot = Y.now();
  Y.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var e = Rt.pop() || Y.expando + "_" + Ot++;
      return this[e] = !0,
        e
    }
  }),
    Y.ajaxPrefilter("json jsonp", function (n, i, a) {
      var o, r, s, l = n.data, c = n.url, d = n.jsonp !== !1, u = d && Ft.test(c), h = d && !u && "string" == typeof l && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Ft.test(l);
      if ("jsonp" === n.dataTypes[0] || u || h)
        return o = n.jsonpCallback = Y.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback,
          r = e[o],
          u ? n.url = c.replace(Ft, "$1" + o) : h ? n.data = l.replace(Ft, "$1" + o) : d && (n.url += (Dt.test(c) ? "&" : "?") + n.jsonp + "=" + o),
          n.converters["script json"] = function () {
            return s || Y.error(o + " was not called"),
              s[0]
          }
          ,
          n.dataTypes[0] = "json",
          e[o] = function () {
            s = arguments
          }
          ,
          a.always(function () {
            e[o] = r,
            n[o] && (n.jsonpCallback = i.jsonpCallback,
              Rt.push(o)),
            s && Y.isFunction(r) && r(s[0]),
              s = r = t
          }),
          "script"
    }),
    Y.ajaxSetup({
      accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
      },
      contents: {
        script: /javascript|ecmascript/
      },
      converters: {
        "text script": function (e) {
          return Y.globalEval(e),
            e
        }
      }
    }),
    Y.ajaxPrefilter("script", function (e) {
      e.cache === t && (e.cache = !1),
      e.crossDomain && (e.type = "GET",
        e.global = !1)
    }),
    Y.ajaxTransport("script", function (e) {
      if (e.crossDomain) {
        var n, i = D.head || D.getElementsByTagName("head")[0] || D.documentElement;
        return {
          send: function (a, o) {
            n = D.createElement("script"),
              n.async = "async",
            e.scriptCharset && (n.charset = e.scriptCharset),
              n.src = e.url,
              n.onload = n.onreadystatechange = function (e, a) {
                (a || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null,
                i && n.parentNode && i.removeChild(n),
                  n = t,
                a || o(200, "success"))
              }
              ,
              i.insertBefore(n, i.firstChild)
          },
          abort: function () {
            n && n.onload(0, 1)
          }
        }
      }
    });
  var qt, zt = !!e.ActiveXObject && function () {
      for (var e in qt)
        qt[e](0, 1)
    }
    , Xt = 0;
  Y.ajaxSettings.xhr = e.ActiveXObject ? function () {
      return !this.isLocal && E() || I()
    }
    : E,
    function (e) {
      Y.extend(Y.support, {
        ajax: !!e,
        cors: !!e && "withCredentials" in e
      })
    }(Y.ajaxSettings.xhr()),
  Y.support.ajax && Y.ajaxTransport(function (n) {
    if (!n.crossDomain || Y.support.cors) {
      var i;
      return {
        send: function (a, o) {
          var r, s, l = n.xhr();
          if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async),
              n.xhrFields)
            for (s in n.xhrFields)
              l[s] = n.xhrFields[s];
          n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType),
          !n.crossDomain && !a["X-Requested-With"] && (a["X-Requested-With"] = "XMLHttpRequest");
          try {
            for (s in a)
              l.setRequestHeader(s, a[s])
          } catch (c) {
          }
          l.send(n.hasContent && n.data || null),
            i = function (e, a) {
              var s, c, d, u, h;
              try {
                if (i && (a || 4 === l.readyState))
                  if (i = t,
                    r && (l.onreadystatechange = Y.noop,
                    zt && delete qt[r]),
                      a)
                    4 !== l.readyState && l.abort();
                  else {
                    s = l.status,
                      d = l.getAllResponseHeaders(),
                      u = {},
                      h = l.responseXML,
                    h && h.documentElement && (u.xml = h);
                    try {
                      u.text = l.responseText
                    } catch (e) {
                    }
                    try {
                      c = l.statusText
                    } catch (p) {
                      c = ""
                    }
                    s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = u.text ? 200 : 404
                  }
              } catch (g) {
                a || o(-1, g)
              }
              u && o(s, c, u, d)
            }
            ,
            n.async ? 4 === l.readyState ? setTimeout(i, 0) : (r = ++Xt,
                zt && (qt || (qt = {},
                  Y(e).unload(zt)),
                  qt[r] = i),
                  l.onreadystatechange = i) : i()
        },
        abort: function () {
          i && i(0, 1)
        }
      }
    }
  });
  var Ut, Vt, Qt = /^(?:toggle|show|hide)$/, Jt = new RegExp("^(?:([-+])=|)(" + Z + ")([a-z%]*)$", "i"), Kt = /queueHooks$/, Yt = [B], Zt = {
    "*": [function (e, t) {
      var n, i, a = this.createTween(e, t), o = Jt.exec(t), r = a.cur(), s = +r || 0, l = 1, c = 20;
      if (o) {
        if (n = +o[2],
            i = o[3] || (Y.cssNumber[e] ? "" : "px"),
          "px" !== i && s) {
          s = Y.css(a.elem, e, !0) || n || 1;
          do
            l = l || ".5",
              s /= l,
              Y.style(a.elem, e, s + i);
          while (l !== (l = a.cur() / r) && 1 !== l && --c)
        }
        a.unit = i,
          a.start = s,
          a.end = o[1] ? s + (o[1] + 1) * n : n
      }
      return a
    }
    ]
  };
  Y.Animation = Y.extend(N, {
    tweener: function (e, t) {
      Y.isFunction(e) ? (t = e,
          e = ["*"]) : e = e.split(" ");
      for (var n, i = 0, a = e.length; i < a; i++)
        n = e[i],
          Zt[n] = Zt[n] || [],
          Zt[n].unshift(t)
    },
    prefilter: function (e, t) {
      t ? Yt.unshift(e) : Yt.push(e)
    }
  }),
    Y.Tween = H,
    H.prototype = {
      constructor: H,
      init: function (e, t, n, i, a, o) {
        this.elem = e,
          this.prop = n,
          this.easing = a || "swing",
          this.options = t,
          this.start = this.now = this.cur(),
          this.end = i,
          this.unit = o || (Y.cssNumber[n] ? "" : "px")
      },
      cur: function () {
        var e = H.propHooks[this.prop];
        return e && e.get ? e.get(this) : H.propHooks._default.get(this)
      },
      run: function (e) {
        var t, n = H.propHooks[this.prop];
        return this.options.duration ? this.pos = t = Y.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
          this.now = (this.end - this.start) * t + this.start,
        this.options.step && this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : H.propHooks._default.set(this),
          this
      }
    },
    H.prototype.init.prototype = H.prototype,
    H.propHooks = {
      _default: {
        get: function (e) {
          var t;
          return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = Y.css(e.elem, e.prop, !1, ""),
              t && "auto" !== t ? t : 0) : e.elem[e.prop]
        },
        set: function (e) {
          Y.fx.step[e.prop] ? Y.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Y.cssProps[e.prop]] || Y.cssHooks[e.prop]) ? Y.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
        }
      }
    },
    H.propHooks.scrollTop = H.propHooks.scrollLeft = {
      set: function (e) {
        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
      }
    },
    Y.each(["toggle", "show", "hide"], function (e, t) {
      var n = Y.fn[t];
      Y.fn[t] = function (i, a, o) {
        return null == i || "boolean" == typeof i || !e && Y.isFunction(i) && Y.isFunction(a) ? n.apply(this, arguments) : this.animate(j(t, !0), i, a, o)
      }
    }),
    Y.fn.extend({
      fadeTo: function (e, t, n, i) {
        return this.filter(v).css("opacity", 0).show().end().animate({
          opacity: t
        }, e, n, i)
      },
      animate: function (e, t, n, i) {
        var a = Y.isEmptyObject(e)
          , o = Y.speed(t, n, i)
          , r = function () {
          var t = N(this, Y.extend({}, e), o);
          a && t.stop(!0)
        };
        return a || o.queue === !1 ? this.each(r) : this.queue(o.queue, r)
      },
      stop: function (e, n, i) {
        var a = function (e) {
          var t = e.stop;
          delete e.stop,
            t(i)
        };
        return "string" != typeof e && (i = n,
          n = e,
          e = t),
        n && e !== !1 && this.queue(e || "fx", []),
          this.each(function () {
            var t = !0
              , n = null != e && e + "queueHooks"
              , o = Y.timers
              , r = Y._data(this);
            if (n)
              r[n] && r[n].stop && a(r[n]);
            else
              for (n in r)
                r[n] && r[n].stop && Kt.test(n) && a(r[n]);
            for (n = o.length; n--;)
              o[n].elem === this && (null == e || o[n].queue === e) && (o[n].anim.stop(i),
                t = !1,
                o.splice(n, 1));
            (t || !i) && Y.dequeue(this, e)
          })
      }
    }),
    Y.each({
      slideDown: j("show"),
      slideUp: j("hide"),
      slideToggle: j("toggle"),
      fadeIn: {
        opacity: "show"
      },
      fadeOut: {
        opacity: "hide"
      },
      fadeToggle: {
        opacity: "toggle"
      }
    }, function (e, t) {
      Y.fn[e] = function (e, n, i) {
        return this.animate(t, e, n, i)
      }
    }),
    Y.speed = function (e, t, n) {
      var i = e && "object" == typeof e ? Y.extend({}, e) : {
          complete: n || !n && t || Y.isFunction(e) && e,
          duration: e,
          easing: n && t || t && !Y.isFunction(t) && t
        };
      return i.duration = Y.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in Y.fx.speeds ? Y.fx.speeds[i.duration] : Y.fx.speeds._default,
      null != i.queue && i.queue !== !0 || (i.queue = "fx"),
        i.old = i.complete,
        i.complete = function () {
          Y.isFunction(i.old) && i.old.call(this),
          i.queue && Y.dequeue(this, i.queue)
        }
        ,
        i
    }
    ,
    Y.easing = {
      linear: function (e) {
        return e
      },
      swing: function (e) {
        return .5 - Math.cos(e * Math.PI) / 2
      }
    },
    Y.timers = [],
    Y.fx = H.prototype.init,
    Y.fx.tick = function () {
      for (var e, t = Y.timers, n = 0; n < t.length; n++)
        e = t[n],
        !e() && t[n] === e && t.splice(n--, 1);
      t.length || Y.fx.stop()
    }
    ,
    Y.fx.timer = function (e) {
      e() && Y.timers.push(e) && !Vt && (Vt = setInterval(Y.fx.tick, Y.fx.interval))
    }
    ,
    Y.fx.interval = 13,
    Y.fx.stop = function () {
      clearInterval(Vt),
        Vt = null
    }
    ,
    Y.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400
    },
    Y.fx.step = {},
  Y.expr && Y.expr.filters && (Y.expr.filters.animated = function (e) {
      return Y.grep(Y.timers, function (t) {
        return e === t.elem
      }).length
    }
  );
  var en = /^(?:body|html)$/i;
  Y.fn.offset = function (e) {
    if (arguments.length)
      return e === t ? this : this.each(function (t) {
          Y.offset.setOffset(this, e, t)
        });
    var n, i, a, o, r, s, l, c = {
      top: 0,
      left: 0
    }, d = this[0], u = d && d.ownerDocument;
    if (u)
      return (i = u.body) === d ? Y.offset.bodyOffset(d) : (n = u.documentElement,
          Y.contains(n, d) ? ("undefined" != typeof d.getBoundingClientRect && (c = d.getBoundingClientRect()),
              a = M(u),
              o = n.clientTop || i.clientTop || 0,
              r = n.clientLeft || i.clientLeft || 0,
              s = a.pageYOffset || n.scrollTop,
              l = a.pageXOffset || n.scrollLeft,
              {
                top: c.top + s - o,
                left: c.left + l - r
              }) : c)
  }
    ,
    Y.offset = {
      bodyOffset: function (e) {
        var t = e.offsetTop
          , n = e.offsetLeft;
        return Y.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(Y.css(e, "marginTop")) || 0,
          n += parseFloat(Y.css(e, "marginLeft")) || 0),
          {
            top: t,
            left: n
          }
      },
      setOffset: function (e, t, n) {
        var i = Y.css(e, "position");
        "static" === i && (e.style.position = "relative");
        var a, o, r = Y(e), s = r.offset(), l = Y.css(e, "top"), c = Y.css(e, "left"), d = ("absolute" === i || "fixed" === i) && Y.inArray("auto", [l, c]) > -1, u = {}, h = {};
        d ? (h = r.position(),
            a = h.top,
            o = h.left) : (a = parseFloat(l) || 0,
            o = parseFloat(c) || 0),
        Y.isFunction(t) && (t = t.call(e, n, s)),
        null != t.top && (u.top = t.top - s.top + a),
        null != t.left && (u.left = t.left - s.left + o),
          "using" in t ? t.using.call(e, u) : r.css(u)
      }
    },
    Y.fn.extend({
      position: function () {
        if (this[0]) {
          var e = this[0]
            , t = this.offsetParent()
            , n = this.offset()
            , i = en.test(t[0].nodeName) ? {
              top: 0,
              left: 0
            } : t.offset();
          return n.top -= parseFloat(Y.css(e, "marginTop")) || 0,
            n.left -= parseFloat(Y.css(e, "marginLeft")) || 0,
            i.top += parseFloat(Y.css(t[0], "borderTopWidth")) || 0,
            i.left += parseFloat(Y.css(t[0], "borderLeftWidth")) || 0,
            {
              top: n.top - i.top,
              left: n.left - i.left
            }
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (var e = this.offsetParent || D.body; e && !en.test(e.nodeName) && "static" === Y.css(e, "position");)
            e = e.offsetParent;
          return e || D.body
        })
      }
    }),
    Y.each({
      scrollLeft: "pageXOffset",
      scrollTop: "pageYOffset"
    }, function (e, n) {
      var i = /Y/.test(n);
      Y.fn[e] = function (a) {
        return Y.access(this, function (e, a, o) {
          var r = M(e);
          return o === t ? r ? n in r ? r[n] : r.document.documentElement[a] : e[a] : void (r ? r.scrollTo(i ? Y(r).scrollLeft() : o, i ? o : Y(r).scrollTop()) : e[a] = o)
        }, e, a, arguments.length, null)
      }
    }),
    Y.each({
      Height: "height",
      Width: "width"
    }, function (e, n) {
      Y.each({
        padding: "inner" + e,
        content: n,
        "": "outer" + e
      }, function (i, a) {
        Y.fn[a] = function (a, o) {
          var r = arguments.length && (i || "boolean" != typeof a)
            , s = i || (a === !0 || o === !0 ? "margin" : "border");
          return Y.access(this, function (n, i, a) {
            var o;
            return Y.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement,
                  Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : a === t ? Y.css(n, i, a, s) : Y.style(n, i, a, s)
          }, n, r ? a : t, r, null)
        }
      })
    }),
    e.jQuery = e.$ = Y,
  "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () {
    return Y
  })
}(window);
var wave = {
  allTags: null,
  api: {},
  engine: {},
  fn: {},
  page: null,
  report: {},
  results: {},
  util: {},
  xpath: {},
  init: function () {
    var e = wave.fn.initialize();
    return e
  }
};
wave.fn.assignWaveIds = function (e) {
  try {
    for (var t = 0; t < e.length; t++)
      e[t].setAttribute("data-waveid", t + 1)
  } catch (n) {
    console.log("Failed to assign waveids", n)
  }
}
  ,
  wave.fn.removeWaveIds = function () {
    try {
      for (var e = 0; e < wave.allTags.length; e++)
        wave.allTags[e].removeAttribute("data-waveid", e + 1)
    } catch (t) {
      console.log("Failed to remove waveids", t)
    }
  }
  ,
  wave.fn.setIconList = function (e) {
    e.success ? (wave.report.iconlist = e.categories,
        wave.report.title = e.statistics.pagetitle,
        wave.engine.icons.setStats(e.statistics)) : (wave.tabs.showError(e.error.details),
        wave.errors.die("Could not get the report results. Please try your request again."))
  }
  ,
  wave.fn.setupTags = function () {
    wave.allTags = wave.page.getElementsByTagName("*"),
      wave.fn.assignWaveIds(wave.allTags),
      wave.xpath.calculateXPath(wave.page.documentElement),
      wave.engine.fn.setupResultStack()
  }
  ,
  wave.fn.applyRules = function () {
    var e = {};
    e.statistics = {};
    try {
      e.categories = wave.engine.run(),
        e.statistics = wave.engine.statistics;
      wave.engine.ruleTimes;
      e.statistics.pagetitle = wave.page.title,
        e.statistics.totalelements = wave.allTags.length,
        e.success = !0
    } catch (t) {
      console.log(t)
    }
    return e
  }
  ,
  $(function () {
    wave.init()
  }),
  wave.util.parseHash = function (e) {
    var t = $.trim(location.href.split("#/")[1] || "");
    wave.url = decodeURIComponent(t),
      wave.fn.newReport(),
      $("#input_url").val(t)
  }
  ,
  wave.util.setHash = function (e) {
    window.location.hash = "/" + $.trim(e)
  }
  ,
  wave.fn.waveButton = function () {
    var e = $.trim(location.href.split("#/")[1] || "")
      , t = $("#input_url").val()
      , t = $.trim(t);
    return $("#input_url").val(t),
      e != t ? wave.util.setHash(t) : wave.fn.newReport(decodeURIComponent(t)),
      !1
  }
  ,
  wave.fn.resizeReportWindow = function () {
    var e = $(window).height()
      , t = $("#wave5topbar").height()
      , n = $("#wave5bottombar").height()
      , i = e - t - n;
    if ($("#report").css({
        height: i
      }),
      "iPad" == navigator.platform || "iPhone" == navigator.platform || "iPod" == navigator.platform) {
      var a = $("#report_container").css("width");
      $("#wave5bottombar").css({
        position: "fixed",
        "margin-left": "251px",
        width: a
      })
    }
  }
  ,
  wave.fn.loadResources = function (e) {
    var t = {};
    return 1 == e.success ? (wave.report.reportkey = e.reportkey,
        wave.report.contenttype = e.contenttype,
        t = wave.fn.setupPage()) : e.error.details ? wave.tabs.showError(e.error.details) : wave.tabs.showError("An error has occurred when trying to access or analyze this page. Please check the URL and try your request again.<br><br>WAVE cannot  evaluate pages that are not publicly available. For intranet or other non-public pages, or if the error persists, please use the <a href='http://wave.webaim.org/extension'>WAVE Firefox or Chrome extension</a>."),
      t
  }
  ,
  wave.fn.insertIconBoxForChromeExtension = function () {
    $(document.body).append('<div id="wave5_iconbox"><div id="wave5_title"><div id="wave5_iconbox_title">Icon Title</div></div><div id="wave5_details"><div id="wave5_iconbox_summary"></div><div id="wave5_iconbox_doclink"></div><div id="wave5_iconbox_arrow"></div></div></div>')
  }
  ,
  wave.fn.loadPage = function () {
    var e = $.Deferred();
    return $("#report").load(function (t) {
      $("#report").unbind(t),
        e.resolve()
    }),
      $("#report")[0].contentWindow.location.replace("/data/getpage.php?reportkey=" + encodeURIComponent(wave.report.reportkey) + "&contenttype=" + encodeURIComponent(wave.report.contenttype)),
      e.promise()
  }
  ,
  wave.fn.showLoadingAnimation = function () {
    var e = "<div id='wave5_loading'><img src='/img/loading.gif' alt=''/></div>";
    $("body").append(e),
      $("body").fadeTo(200, .5)
  }
  ,
  wave.fn.UrlIsValid = function (e) {
    var t = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
    return $.trim(e).match(t)
  }
  ,
  wave.fn.setDocumentTitle = function () {
    var e = "UNTITLED";
    wave.report.title && "" != wave.report.title && (e = wave.report.title),
      document.title = "WAVE Report of " + e
  }
  ,
  wave.code = null,
  wave.error = {
    hasError: !1
  },
  wave.rules = {},
  wave.rulesCategories = {},
  wave.tabs = {},
  wave.url = null,
  wave.utilities = {},
  wave.fn.initialize = function () {
    var e = {};
    return "api" == config.platform ? (wave.conf = {
        paths: {
          site: "http://" + document.domain
        }
      },
        e = wave.fn.newReport()) : ($("#noscript").remove(),
        $("#sidebar_container").css("display", "block"),
        $("#report_container").css("display", "block"),
        $.ajaxSetup({
          cache: !1
        }),
        wave.conf = {
          paths: {
            site: "http://" + document.domain
          }
        },
        $("#button_wave").click(wave.fn.waveButton),
        $("#waveform").submit(function (e) {
          e.preventDefault(),
            wave.fn.waveButton()
        }),
        wave.util.parseHash(),
        $(window).hashchange(wave.util.parseHash)),
      e
  }
  ,
  wave.fn.reset = function () {
    "web" == config.platform && ($("#pageoutline").empty(),
      $("#report").contents().empty(),
      $("#iconlist").contents().empty(),
      $("#summary #error span").html("?"),
      $("#summary #alert span").html("?"),
      $("#summary #feature span").html("?"),
      $("#summary #structure span").html("?"),
      $("#summary #html5 span").html("?"),
      $("#summary #contrast span").html("?"),
      $("#wave5topbar").empty(),
      $("#wave5_iconbox").hide(),
      $("#wave5topbar").click(function () {
        wave.iconbox.hide()
      }),
      $("#pageoutline").contents().empty(),
    config.isSidebar || (wave.code = new wave.Code,
      wave.errors = new wave.Errors,
      wave.engine.fn.resetEngine()),
      wave.fn.resizeReportWindow(),
      wave.tabs.resetPanels()),
      wave.allTags = null,
      wave.hasError = !1,
      wave.report = {},
      wave.xpath.mappedElementsByXPath = {}
  }
  ,
  wave.fn.newReport = function () {
    wave.fn.reset();
    var e = {};
    if (!config.isSidebar)
      if ("api" == config.platform) {
        var t = {
          success: !0
        };
        e = wave.fn.loadResources(t)
      } else {
        if (wave.url.indexOf("http://") == -1 && wave.url.indexOf("https://") == -1 && (wave.url = "http://" + wave.url),
            !wave.fn.UrlIsValid(wave.url))
          return alert("Please enter a valid URL"),
            $("#input_url").focus(),
            $("#input_url").select(),
            !1;
        wave.fn.showLoadingAnimation();
        $.ajax({
          url: "/data/request.php",
          dataType: "json",
          type: "POST",
          data: {
            source: wave.url
          },
          success: function (e) {
            wave.fn.loadResources(e)
          },
          timeout: 15e3,
          error: function (e, t, n) {
            wave.tabs.showError("The page cannot be accessed or the request timed out. Please check the URL or refresh the page to try again."),
              wave.errors.die("The page cannot be accessed or the request timed out. Please check the URL or refresh the page to try again.")
          }
        })
      }
    return e
  }
  ,
  wave.fn.setupPage = function () {
    var e = {};
    return "api" == config.platform ? (wave.page = document,
        e = wave.fn.run()) : $.when(wave.fn.loadPage()).done(function () {
        wave.page = document.getElementById("report").contentDocument,
          e = wave.fn.run()
      }).fail(function () {
        wave.tabs.showError("There was an error in processing this page. Please check the URL or refresh the page to try again.")
      }),
      e
  }
  ,
  wave.fn.run = function () {
    return wave.fn.setupTags(),
      wave.results = wave.fn.applyRules(),
      wave.fn.setIconList(wave.results),
    "web" == config.platform && (wave.fn.showThings(),
      wave.tabs.updatePanels(wave.report.iconlist)),
      wave.results
  }
  ,
  wave.fn.showThings = function () {
    if ("web" == config.platform)
      try {
        $("#report")[0].contentDocument.location.href
      } catch (e) {
        var t = document.getElementById("report");
        return t.parentNode.removeChild(t),
          $("#report_container").after('<iframe id="report"></iframe>'),
          wave.tabs.showError("There was an error in processing this page. The page redirects or is not available."),
          void wave.errors.die("The page redirects. Cross-site security failed.")
      }
    var n = wave.report.iconlist
      , i = wave.engine.icons.docs
      , a = {
      xpath: !1
    };
    wave.report.things = new wave.manager.ThingManager(n, i, wave.page, a),
      wave.tabs.buildOutline(),
      wave.fn.reportReadyEvent()
  }
  ,
  wave.fn.reportReadyEvent = function () {
    config.debug && console.log("Start reportReadyEvent"),
      wave.fn.removeWaveIds(wave.allTags),
      wave.tabs.removeLoadingAnimation(),
      wave.fn.showCode(),
    "web" == config.platform && wave.fn.setDocumentTitle(),
      wave.iconbox = new wave.manager.IconBox,
      wave.fn.rewriteLinks(),
      wave.tabs.doResize(),
    wave.hasError || wave.tabs.changeMode(wave.tabs.mode),
    config.debug && console.log("End reportReadyEvent")
  }
  ,
  wave.fn.rewriteLinks = function () {
    $("a", wave.page).click(function (e) {
      e.preventDefault(),
        wave.util.setHash($(this).prop("href"))
    })
  }
  ,
  wave.fn.showCode = function () {
    wave.code.setHtmlRoot(wave.page.documentElement),
      wave.code.displayTree()
  }
  ,
  wave.utilities = {},
  wave.utilities.trim = function (e) {
    return e = e.replace(/(^\s*)|(\s*$)/gi, ""),
      e = e.replace(/[ ]{2,}/gi, " "),
      e = e.replace(/\n /, "\n")
  }
  ,
  wave.utilities.objectSize = function (e) {
    var t, n = 0;
    for (t in e)
      e.hasOwnProperty(t) && n++;
    return n
  }
  ,
  String.prototype.repeat = function (e) {
    return new Array(e + 1).join(this)
  }
  ,
  wave.manager = {},
  wave.manager.style = {},
  wave.manager.style.icon = {
    border: "none",
    verticalAlign: "bottom",
    cursor: "pointer",
    maxWidth: "44px",
    maxHeight: "25px",
    zIndex: 1e4
  },
  wave.manager.style.text = {
    display: "inline",
    backgroundColor: "#5E8C4E",
    color: "#fff",
    border: "1px solid #ccc",
    height: "auto",
    width: "auto",
    zIndex: 10,
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "normal",
    fontFamily: "Helvetica,Arial,sans-serif",
    margin: "0",
    padding: "0"
  },
  wave.manager.ThingManager = function (e, t, n, i) {
    this.contextPage = n,
      this.pageWideContextPage = document,
      this.allTagsCached = {},
      this.iconProperties = {},
      this.extraElements = {},
      this.iconList = [],
      this.iconBaseXpaths = {},
      this._iconGroups = [],
      this._iconsByGroup = {},
      this._typesByGroup = {},
      this._iconsByType = {},
      this._iconsByLevel = {},
      this.allTagsCached = wave.xpath.mappedElementsByXPath,
      this.allTagsCached["#"] = $("#wave5topbar")[0];
    for (var a in e)
      if (wave.engine.icons.stats[a] = e[a].count,
        e[a].count > 0)
        for (var o in e[a].items) {
          var r = e[a].items[o]
            , s = t[r.id];
          if (void 0 !== s)
            for (var l = 0; l < r.xpaths.length; l++) {
              var c = r.xpaths[l]
                , d = new wave.manager.Icon(r.id, s, c, this.allTagsCached[c], r.text[l]);
              if (this.attach(d),
                  this.iconList.push(d),
                void 0 === this.iconBaseXpaths[c] && (this.iconBaseXpaths[c] = []),
                  this.iconBaseXpaths[c].push(d),
                  !$.isEmptyObject(s.levels))
                for (var u in s.levels)
                  void 0 === this._iconsByLevel[u] && (this._iconsByLevel[u] = {
                    icons: []
                  }),
                    this._iconsByLevel[u].icons.push(d);
              this._iconsByGroup[a] || (this._iconsByGroup[a] = []),
                this._iconsByGroup[a].push(d),
              this._typesByGroup[a] || (this._typesByGroup[a] = []),
              this._typesByGroup[a].indexOf(r.id) == -1 && (this._typesByGroup[a].push(r.id),
                this._iconsByType[r.id] = []),
                this._iconsByType[r.id].push(d)
            }
        }
  }
  ,
  wave.manager.ThingManager.prototype.attach = function (e) {
    e.create(this.pageWideContextPage);
    var t = this.$(e.target)
      , n = t.prop("tagName")
      , i = e.iconElement
      , a = {};
    switch (e.position) {
      case "before":
        a = t.before(i);
        break;
      case "after":
        a = t.after(i);
        break;
      case "first":
        if (n && n.search(/(INPUT|IMG)$/i) !== -1) {
          a = t.before(i);
          break
        }
        a = t.prepend(i);
        break;
      case "last":
        if (n && n.search(/(INPUT|IMG)$/i) !== -1) {
          a = t.after(i);
          break
        }
        a = t.append(i);
        break;
      default:
        throw "Unknown insert position: " + position
    }
    var o = e.text();
    return void 0 != o ? this.$(i).after(e.textElement) : a
  }
  ,
  wave.manager.ThingManager.prototype.$ = function (e) {
    return $(e, this.contextPage)
  }
  ,
  wave.manager.ThingManager.prototype.icons = function () {
    return this.iconList
  }
  ,
  wave.manager.ThingManager.prototype.typesByGroup = function (e) {
    return this._typesByGroup[e]
  }
  ,
  wave.manager.ThingManager.prototype.iconsByType = function (e) {
    return this._iconsByType[e]
  }
  ,
  wave.manager.ThingManager.prototype.iconsByGroup = function (e) {
    return this._iconsByGroup[e]
  }
  ,
  wave.manager.ThingManager.prototype.filterLevel = function (e) {
    if (wave.tabs.filter = e,
      99 == e)
      return void wave.tabs.toggleContrast();
    if (88 == e)
      this.hideAll(),
        wave.tabs.filter = 0;
    else if (0 == e) {
      this.hideAll();
      for (var t = called_types = {}, n = 0; n < this.iconList.length; n++)
        t[this.iconList[n].data.cat_code] || ($("#toggle_group_" + this.iconList[n].data.cat_code).prop("checked", !0).trigger("change"),
          t[this.iconList[n].data.cat_code] = !0),
          this.iconList[n].show(),
        called_types[this.iconList[n].type] || ($("#toggle_type_" + this.iconList[n].type).prop("checked", !0).trigger("change"),
          called_types[this.iconList[n].type] = !0)
    } else if (3 == e) {
      this.hideAll();
      for (var i = 2; i <= 3; i++)
        for (var a = this._iconsByLevel[i].icons, n = 0; n < a.length; n++)
          $("#toggle_group_" + a[n].data.cat_code).attr("checked") || $("#toggle_group_" + a[n].data.cat_code).prop("checked", !0).trigger("change"),
          $("#toggle_type_" + a[n].type).attr("checked") || $("#toggle_type_" + a[n].type).prop("checked", !0).trigger("change"),
            a[n].show()
    } else {
      this.hideAll();
      for (var a = this._iconsByLevel[e].icons, n = 0; n < a.length; n++)
        $("#toggle_group_" + a[n].data.cat_code).attr("checked") || $("#toggle_group_" + a[n].data.cat_code).prop("checked", !0).trigger("change"),
        $("#toggle_type_" + a[n].type).attr("checked") || $("#toggle_type_" + a[n].type).prop("checked", !0).trigger("change"),
          a[n].show()
    }
    wave.tabs.toggleContrast(),
      wave.tabs.filterReset(e),
      this.updateTopbar()
  }
  ,
  wave.manager.ThingManager.prototype.hideAll = function () {
    for (var e = 0; e < this.iconList.length; e++)
      this.iconList[e].hide();
    for (var t in this._iconsByType)
      $("#toggle_type_" + t).prop("checked", !1).trigger("change");
    this.updateTopbar()
  }
  ,
  wave.manager.ThingManager.prototype.showType = function (e) {
    for (var t = this.iconsByType(e), n = 0; n < t.length; n++)
      t[n].show();
    this.updateTopbar()
  }
  ,
  wave.manager.ThingManager.prototype.hideType = function (e) {
    for (var t = this.iconsByType(e), n = 0; n < t.length; n++)
      t[n].hide();
    this.updateTopbar()
  }
  ,
  wave.manager.ThingManager.prototype.showGroup = function (e) {
    for (var t = this.iconsByGroup(e), n = 0; n < t.length; n++)
      t[n].show();
    this.updateTopbar()
  }
  ,
  wave.manager.ThingManager.prototype.hideGroup = function (e) {
    for (var t = this.iconsByGroup(e), n = 0; n < t.length; n++)
      t[n].hide();
    this.updateTopbar()
  }
  ,
  wave.manager.ThingManager.prototype.updateTopbar = function () {
    var e = !1
      , t = $("#wave5topbar");
    t.find("img").each(function (t, n) {
      0 == e && "none" != $(n).css("display") && "hidden" != $(n).css("visibility") && (e = !0)
    }),
      e ? (t.show(),
        $("#pagewide_txt").length || $("#wave5topbar").prepend($('<div id="pagewide_txt">The following apply to the entire page: </div>'))) : t.hide(),
      wave.fn.resizeReportWindow()
  }
  ,
  wave.manager.Icon = function (e, t, n, i, a) {
    this.thingType = "icon",
      this.type = e,
      this.data = t,
      this.waveid = n,
      this.target = i,
      this.hasText = void 0 !== a[0] && 0 != a.length,
      this.iconText = a,
      this.position = this.data.position,
      this.hidden = !("#" === n || !$(i).is(":hidden")),
      this.textElement = {}
  }
  ,
  wave.manager.Icon.prototype.create = function (e) {
    var t = this.jIconElement = $("<img>", e);
    if (this.iconElement = this.jIconElement[0],
        t.attr("src", wave.conf.paths.site + "/img/icons/" + this.type + ".png"),
        t.attr("class", "wave5icon"),
        t.attr("tabindex", 0),
        t.removeAttr("style").css(wave.manager.style.icon),
        wave.engine.icons.docs[this.type]) {
      var n = wave.engine.icons.docs[this.type].category.toUpperCase() + ": " + wave.engine.icons.docs[this.type].title;
      t.attr("alt", n)
    } else
      t.attr("alt", "");
    if (this.iconElement.height > 0 && (this.jIconElement.css("height", this.iconElement.height),
        this.jIconElement.css("width", this.iconElement.width)),
        this.hasText) {
      var i = this.jTextElement = $("<span></span>", e).html("*" + this.iconText.join(", ") + "*");
      this.textElement = this.jTextElement[0],
        i.attr("class", "wave5text"),
        i.css(wave.manager.style.text)
    }
  }
  ,
  wave.manager.Icon.prototype.element = function () {
    return this.jIconElement
  }
  ,
  wave.manager.Icon.prototype.text = function () {
    return this.jTextElement
  }
  ,
  wave.manager.Icon.prototype.hide = function () {
    try {
      this.element().hide(),
      this.hasText && $(this.textElement).hide()
    } catch (e) {
      console.log("Could not hide element: " + e)
    }
  }
  ,
  wave.manager.Icon.prototype.show = function () {
    try {
      this.element().show(),
      this.hasText && $(this.textElement).show()
    } catch (e) {
      console.log("Could not hide element: " + e)
    }
  }
  ,
  wave.manager.Icon.prototype.scrollTo = function () {
    "extension" == config.platform ? $("html").animate({
        scrollTop: $(this.iconElement).offset().top - 110
      }, 250) : $(wave.page.body).animate({
        scrollTop: $(this.iconElement).offset().top - 110
      }, 250),
      $(this.iconElement).css("opacity", 0).animate({
        opacity: 1
      }, 150).animate({
        opacity: .2
      }, 150).animate({
        opacity: 1
      }, 150).animate({
        opacity: .2
      }, 150).animate({
        opacity: 1
      }, 150)
  }
  ,
  wave.manager.IconBox = function () {
    var e = this;
    this.iconbox = $("#wave5_iconbox"),
      this.hide();
    var t = wave.page;
    $(t).scroll(function () {
      e.hide()
    }),
      $(t).click(function (t) {
        e.hide()
      }),
      this.iconbox.click(function (e) {
        e.stopPropagation()
      }),
      $(t).keyup(function (t) {
        27 == t.keyCode && e.isVisible() && e.hide()
      });
    for (var n = wave.report.things.icons(), i = 0; i < n.length; i++)
      "icon" == n[i].thingType && (n[i].element().on("focus mouseenter", function (e) {
        return function () {
          wave.code.hoverHighlight(e.target, !0)
        }
      }(n[i])),
        n[i].element().on("blur mouseleave", function (e) {
          return function () {
            wave.code.hoverHighlight(e.target, !1)
          }
        }(n[i])),
        n[i].element().on("click keyup", function (e, n) {
          return function (n) {
            if ("click" == n.type || "keyup" == n.type && (13 == n.keyCode || 32 == n.keyCode)) {
              wave.code.setSelected(e, t),
              "contrast" != e.data.name && "contrast" != e.type || showContrasts(e),
              "tab-documentation" == wave.tabs.current && ("extension" == config.platform ? reportPageMessaging.fn.setupAndDispatchEvent("moreInfo", e.data.name) : wave.tabs.moreInfo(e.type)),
                $("#wave5_iconbox_title").html(wave.engine.icons.docs[e.type].title),
                $("#wave5_iconbox_summary").html(wave.engine.icons.docs[e.type].summary);
              var i = $("#wave5_iconbox_doclink");
              i.html("");
              var a = $("<a href='#'>More Information</a>");
              i.append(a),
                a.click(function (e) {
                  return function () {
                    return wave.tabs.moreInfo(e),
                      !1
                  }
                }(e.data.name));
              var o = $("#wave5_iconbox")
                , r = o.height()
                , s = o.width()
                , l = t.offsetWidth
                , c = 0
                , d = 0;
              1 != e.data.page_rule && ("extension" == config.platform ? (c = 0,
                  d = $(document).scrollTop() * -1 + $("#wave5topbar").height()) : c = d = $("#report").contents().scrollTop() * -1 + $("#wave5topbar").height());
              var u, h = $(this).offset();
              if (h.top + d < r + 16) {
                var p = "top+35";
                u = "t"
              } else {
                var p = "bottom-11px";
                u = "b"
              }
              if (h.left + 10 > l - s) {
                var g = "right+30";
                u += "r"
              } else {
                var g = "left-11px";
                u += "l"
              }
              var f, m = g + " " + p;
              f = 1 == e.data.page_rule || "extension" == config.platform ? 0 : $("#sidebar_container")[0].offsetWidth,
                wave.tabs.iconBoxInitiated = !0;
              var v = f + " " + c;
              o.show(),
                $("#wave5_iconbox_arrow").attr("class", u);
              var b = this;
              return wave.manager.setIconBoxPosition(o, b, m, v),
              Math.abs(o.offset().left - $(this).offset().left) > 200 && wave.manager.setIconBoxPosition(o, b, m, v),
                !1
            }
          }
        }(n[i])))
  }
  ,
  wave.manager.setIconBoxPosition = function (e, t, n, i) {
    e.position({
      at: "left top",
      of: t,
      my: n,
      offset: i,
      collision: "none"
    }),
      e.css({
        opacity: "1",
        overflow: ""
      })
  }
  ,
  wave.manager.IconBox.prototype.isVisible = function () {
    return "none" != this.iconbox.css("display")
  }
  ,
  wave.manager.IconBox.prototype.hide = function () {
    "extension" == config.platform && (this.iconbox = $("#wave5_iconbox")),
    1 == this.iconbox.css("opacity") && (wave.code.unhighlight(),
      this.iconbox.css("opacity", 0),
      this.iconbox.delay(250).hide(0))
  }
  ,
Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
    "use strict";
    if (void 0 === this || null === this)
      throw new TypeError;
    var t = Object(this)
      , n = t.length >>> 0;
    if (0 === n)
      return -1;
    var i = 0;
    if (arguments.length > 0 && (i = Number(arguments[1]),
        i !== i ? i = 0 : 0 !== i && i !== 1 / 0 && i !== -(1 / 0) && (i = (i > 0 || -1) * Math.floor(Math.abs(i)))),
      i >= n)
      return -1;
    for (var a = i >= 0 ? i : Math.max(n - Math.abs(i), 0); a < n; a++)
      if (a in t && t[a] === e)
        return a;
    return -1
  }
),
  function (e, t, n) {
    function i(e) {
      return e = e || location.href,
      "#" + e.replace(/^[^#]*#?(.*)$/, "$1")
    }

    var a, o = "hashchange", r = document, s = e.event.special, l = r.documentMode, c = "on" + o in t && (l === n || l > 7);
    e.fn[o] = function (e) {
      return e ? this.bind(o, e) : this.trigger(o)
    }
      ,
      e.fn[o].delay = 50,
      s[o] = e.extend(s[o], {
        setup: function () {
          return !c && void e(a.start)
        },
        teardown: function () {
          return !c && void e(a.stop)
        }
      }),
      a = function () {
        function a() {
          var n = i()
            , r = p(d);
          n !== d ? (h(d = n, r),
              e(t).trigger(o)) : r !== d && (location.href = location.href.replace(/#.*/, "") + r),
            s = setTimeout(a, e.fn[o].delay)
        }

        var s, l = {}, d = i(), u = function (e) {
          return e
        }, h = u, p = u;
        return l.start = function () {
          s || a()
        }
          ,
          l.stop = function () {
            s && clearTimeout(s),
              s = n
          }
          ,
        e.browser.msie && !c && function () {
          var t, n;
          l.start = function () {
            t || (n = e.fn[o].src,
                n = n && n + i(),
                t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
                  n || h(i()),
                    a()
                }).attr("src", n || "javascript:0").insertAfter("body")[0].contentWindow,
                r.onpropertychange = function () {
                  try {
                    "title" === event.propertyName && (t.document.title = r.title)
                  } catch (e) {
                  }
                }
            )
          }
            ,
            l.stop = u,
            p = function () {
              return i(t.location.href)
            }
            ,
            h = function (n, i) {
              var a = t.document
                , s = e.fn[o].domain;
              n !== i && (a.title = r.title,
                a.open(),
              s && a.write('<script>document.domain="' + s + '"</script>'),
                a.close(),
                t.location.hash = n)
            }
        }(),
          l
      }()
  }(jQuery, this),
  function (e, t, n) {
    function i(e, t, n) {
      for (var i = [], a = 0; a < e.length; a++) {
        var o = tinycolor(e[a])
          , r = .5 > o.toHsl().l ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light"
          , r = r + (tinycolor.equals(t, e[a]) ? " sp-thumb-active" : "")
          , s = c ? "background-color:" + o.toRgbString() : "filter:" + o.toFilter();
        i.push('<span title="' + o.toRgbString() + '" data-color="' + o.toRgbString() + '" class="' + r + '"><span class="sp-thumb-inner" style="' + s + ';" /></span>')
      }
      return "<div class='sp-cf " + n + "'>" + i.join("") + "</div>"
    }

    function a(e, n) {
      var i = e.outerWidth()
        , a = e.outerHeight()
        , o = n.outerHeight()
        , r = e[0].ownerDocument
        , s = r.documentElement
        , l = s.clientWidth + t(r).scrollLeft()
        , r = s.clientHeight + t(r).scrollTop()
        , s = n.offset();
      return s.top += o,
        s.left -= Math.min(s.left, s.left + i > l && l > i ? Math.abs(s.left + i - l) : 0),
        s.top -= Math.min(s.top, s.top + a > r && r > a ? Math.abs(a + o - 0) : 0),
        s
    }

    function o() {
    }

    function r(e) {
      e.stopPropagation()
    }

    function s(e, t) {
      var n = Array.prototype.slice
        , i = n.call(arguments, 2);
      return function () {
        return e.apply(t, i.concat(n.call(arguments)))
      }
    }

    function l(n, i, a, o) {
      function r(e) {
        e.stopPropagation && e.stopPropagation(),
        e.preventDefault && e.preventDefault(),
          e.returnValue = !1
      }

      function s(e) {
        if (d) {
          if (h && 9 > document.documentMode && !e.button)
            return l();
          var t = e.originalEvent.touches
            , a = t ? t[0].pageY : e.pageY
            , t = Math.max(0, Math.min((t ? t[0].pageX : e.pageX) - u.left, g))
            , a = Math.max(0, Math.min(a - u.top, p));
          f && r(e),
            i.apply(n, [t, a, e])
        }
      }

      function l() {
        d && (t(c).unbind(m),
          t(c.body).removeClass("sp-dragging"),
          o.apply(n, arguments)),
          d = !1
      }

      i = i || function () {
        }
        ,
        a = a || function () {
          }
        ,
        o = o || function () {
          }
      ;
      var c = n.ownerDocument || document
        , d = !1
        , u = {}
        , p = 0
        , g = 0
        , f = "ontouchstart" in e
        , m = {};
      m.selectstart = r,
        m.dragstart = r,
        m[f ? "touchmove" : "mousemove"] = s,
        m[f ? "touchend" : "mouseup"] = l,
        t(n).bind(f ? "touchstart" : "mousedown", function (e) {
          (e.which ? 3 == e.which : 2 == e.button) || d || !1 === a.apply(n, arguments) || (d = !0,
            p = t(n).height(),
            g = t(n).width(),
            u = t(n).offset(),
            t(c).bind(m),
            t(c.body).addClass("sp-dragging"),
          f || s(e),
            r(e))
        })
    }

    var c, d = {
      beforeShow: o,
      move: o,
      change: o,
      show: o,
      hide: o,
      color: !1,
      flat: !1,
      showInput: !1,
      showButtons: !0,
      clickoutFiresChange: !1,
      showInitial: !1,
      showPalette: !1,
      showPaletteOnly: !1,
      showSelectionPalette: !0,
      localStorageKey: !1,
      maxSelectionSize: 7,
      cancelText: "cancel",
      chooseText: "choose",
      preferredFormat: !1,
      className: "",
      showAlpha: !1,
      theme: "sp-light",
      palette: ["fff", "000"],
      selectionPalette: [],
      disabled: !1
    }, u = [], h = !!/msie/i.exec(e.navigator.userAgent), p = document.createElement("div").style;
    p.cssText = "background-color:rgba(0,0,0,.5)",
      c = !!~("" + p.backgroundColor).indexOf("rgba") || !!~("" + p.backgroundColor).indexOf("hsla");
    var g, p = "";
    if (h)
      for (var f = 1; 6 >= f; f++)
        p += "<div class='sp-" + f + "'></div>";
    g = ["<div class='sp-container'><div class='sp-palette-container'><div class='sp-palette sp-thumb sp-cf'></div></div><div class='sp-picker-container'><div class='sp-top sp-cf'><div class='sp-fill'></div><div class='sp-top-inner'><div class='sp-color'><div class='sp-sat'><div class='sp-val'><div class='sp-dragger'></div></div></div></div><div class='sp-hue'><div class='sp-slider'></div>", p, "</div></div><div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div></div><div class='sp-input-container sp-cf'><input class='sp-input' type='text' spellcheck='false'  /></div><div class='sp-initial sp-thumb sp-cf'></div><div class='sp-button-container sp-cf'><a class='sp-cancel' href='#'></a><button class='sp-choose'></button></div></div></div>"].join(""),
      t.fn.spectrum = function (o, p) {
        if ("string" == typeof o) {
          var f = this
            , m = Array.prototype.slice.call(arguments, 1);
          return this.each(function () {
            var e = u[t(this).data("spectrum.id")];
            if (e) {
              var n = e[o];
              if (!n)
                throw Error("Spectrum: no such method: '" + o + "'");
              "get" == o ? f = e.get() : "container" == o ? f = e.container : "option" == o ? f = e.option.apply(e, m) : "destroy" == o ? (e.destroy(),
                        t(this).removeData("spectrum.id")) : n.apply(e, m)
            }
          }),
            f
        }
        return this.spectrum("destroy").each(function () {
          var p, f = function () {
            se.toggleClass("sp-flat", j),
              se.toggleClass("sp-input-disabled", !N.showInput),
              se.toggleClass("sp-alpha-enabled", N.showAlpha),
              se.toggleClass("sp-buttons-disabled", !N.showButtons || j),
              se.toggleClass("sp-palette-disabled", !N.showPalette),
              se.toggleClass("sp-palette-only", N.showPaletteOnly),
              se.toggleClass("sp-initial-disabled", !N.showInitial),
              se.addClass(N.className),
              W()
          }, m = function (n) {
            if (M && (n = tinycolor(n).toRgbString(),
              -1 === t.inArray(n, ne) && ne.push(n),
              P && e.localStorage))
              try {
                e.localStorage[P] = ne.join(";")
              } catch (i) {
              }
          }, v = function () {
            var e, t = [], n = ne, i = {};
            if (N.showPalette) {
              for (var a = 0; a < te.length; a++)
                for (var o = 0; o < te[a].length; o++)
                  e = tinycolor(te[a][o]).toRgbString(),
                    i[e] = !0;
              for (a = 0; a < n.length; a++)
                e = tinycolor(n[a]).toRgbString(),
                i.hasOwnProperty(e) || (t.push(n[a]),
                  i[e] = !0)
            }
            return t.reverse().slice(0, N.maxSelectionSize)
          }, b = function () {
            var e = S()
              , n = t.map(te, function (t, n) {
              return i(t, e, "sp-palette-row sp-palette-row-" + n)
            });
            ne && n.push(i(v(), e, "sp-palette-row sp-palette-row-selection")),
              me.html(n.join(""))
          }, _ = function () {
            if (N.showInitial) {
              var e = Te
                , t = S();
              ve.html(i([e, t], t, "sp-palette-row-initial"))
            }
          }, y = function () {
            (0 === z || 0 === q || 0 === U) && W(),
              se.addClass(ie)
          }, w = function () {
            se.removeClass(ie)
          }, A = function () {
            var e = tinycolor(fe.val());
            e.ok ? T(e) : fe.addClass("sp-validation-error")
          }, k = function () {
            O ? C() : x()
          }, x = function () {
            if (O)
              W();
            else if (!1 !== D.beforeShow(S())) {
              for (var n = 0; n < u.length; n++)
                u[n] && u[n].hide();
              O = !0,
                t(ae).bind("click.spectrum", C),
                t(e).bind("resize.spectrum", B),
                Ae.addClass("sp-active"),
                se.show(),
              N.showPalette && b(),
                W(),
                E(),
                Te = S(),
                _(),
                D.show(Te)
            }
          }, C = function (n) {
            n && "click" == n.type && 2 == n.button || !O || j || (O = !1,
              t(ae).unbind("click.spectrum", C),
              t(e).unbind("resize.spectrum", B),
              Ae.removeClass("sp-active"),
              se.hide(),
            tinycolor.equals(S(), Te) || (Ee && "cancel" !== n ? $(!0) : T(Te, !0)),
              D.hide(S()))
          }, T = function (e, t) {
            if (!tinycolor.equals(e, S())) {
              var n = tinycolor(e)
                , i = n.toHsv();
              K = i.h,
                Y = i.s,
                Z = i.v,
                ee = i.a,
                E(),
              t || (Le = Se || n.format)
            }
          }, S = function () {
            return tinycolor.fromRatio({
              h: K,
              s: Y,
              v: Z,
              a: Math.round(100 * ee) / 100
            })
          }, L = function () {
            E(),
              D.move(S())
          }, E = function () {
            fe.removeClass("sp-validation-error"),
              I();
            var e = tinycolor({
              h: K,
              s: "1.0",
              v: "1.0"
            });
            le.css("background-color", e.toHexString()),
              e = Le,
            1 > ee && ("hex" === e || "name" === e) && (e = "rgb");
            var t = S()
              , n = t.toHexString()
              , i = t.toRgbString();
            if (c || 1 === t.alpha ? xe.css("background-color", i) : (xe.css("background-color", "transparent"),
                  xe.css("filter", t.toFilter())),
                N.showAlpha) {
              i = t.toRgb(),
                i.a = 0;
              var i = tinycolor(i).toRgbString()
                , a = "linear-gradient(left, " + i + ", " + n + ")";
              h ? he.css("filter", tinycolor(i).toFilter({
                  gradientType: 1
                }, n)) : (he.css("background", "-webkit-" + a),
                  he.css("background", "-moz-" + a),
                  he.css("background", "-ms-" + a),
                  he.css("background", a))
            }
            N.showInput && (1 > ee && ("hex" === e || "name" === e) && (e = "rgb"),
              fe.val(t.toString(e))),
            N.showPalette && b(),
              _()
          }, I = function () {
            var e = Y * q
              , t = z - Z * z
              , e = Math.max(-X, Math.min(q - X, e - X))
              , t = Math.max(-X, Math.min(z - X, t - X));
            ce.css({
              top: t,
              left: e
            }),
              ge.css({
                left: ee * V - Q / 2
              }),
              ue.css({
                top: K * U - J
              })
          }, $ = function (e) {
            var t = S();
            ye && oe.val(t.toString(Le)).change();
            var n = !tinycolor.equals(t, Te);
            Te = t,
              m(t),
            e && n && D.change(t)
          }, W = function () {
            q = le.width(),
              z = le.height(),
              X = ce.height(),
              de.width(),
              U = de.height(),
              J = ue.height(),
              V = pe.width(),
              Q = ge.width(),
            j || se.offset(a(se, ke)),
              I()
          };
          p = function () {
            C(),
              re = !0,
              oe.attr("disabled", !0),
              ke.addClass("sp-disabled")
          }
          ;
          var N, G = t.extend({}, d, o);
          G.callbacks = {
            move: s(G.move, this),
            change: s(G.change, this),
            show: s(G.show, this),
            hide: s(G.hide, this),
            beforeShow: s(G.beforeShow, this)
          },
            N = G;
          var B, H, j = N.flat, M = N.showSelectionPalette, P = N.localStorageKey, R = N.theme, D = N.callbacks, F = W;
          B = function () {
            var e = this
              , t = arguments;
            H || (H = setTimeout(function () {
              H = null,
                F.apply(e, t)
            }, 10))
          }
          ;
          var O = !1
            , q = 0
            , z = 0
            , X = 0
            , U = 0
            , V = 0
            , Q = 0
            , J = 0
            , K = 0
            , Y = 0
            , Z = 0
            , ee = 1
            , G = N.palette.slice(0)
            , te = t.isArray(G[0]) ? G : [G]
            , ne = N.selectionPalette.slice(0)
            , ie = "sp-dragging"
            , ae = this.ownerDocument
            , G = ae.body
            , oe = t(this)
            , re = !1
            , se = t(g, ae).addClass(R)
            , le = se.find(".sp-color")
            , ce = se.find(".sp-dragger")
            , de = se.find(".sp-hue")
            , ue = se.find(".sp-slider")
            , he = se.find(".sp-alpha-inner")
            , pe = se.find(".sp-alpha")
            , ge = se.find(".sp-alpha-handle")
            , fe = se.find(".sp-input")
            , me = se.find(".sp-palette")
            , ve = se.find(".sp-initial")
            , be = se.find(".sp-cancel")
            , _e = se.find(".sp-choose")
            , ye = oe.is("input")
            , we = ye && !j
            , Ae = we ? t("<div class='sp-replacer'><div class='sp-preview'><div class='sp-preview-inner'></div></div><div class='sp-dd'>&#9660;</div></div>").addClass(R) : t([])
            , ke = we ? Ae : oe
            , xe = Ae.find(".sp-preview-inner")
            , Ce = N.color || ye && oe.val()
            , Te = !1
            , Se = N.preferredFormat
            , Le = Se
            , Ee = !N.showButtons || N.clickoutFiresChange
            , R = function (e) {
            return e.data && e.data.ignore ? (T(t(this).data("color")),
                L()) : (T(t(this).data("color")),
                $(!0),
                L(),
                C()),
              !1
          };
          if (h && se.find("*:not(input)").attr("unselectable", "on"),
              f(),
            we && oe.hide().after(Ae),
              j ? oe.after(se).hide() : t(G).append(se.hide()),
            P && e.localStorage) {
            try {
              var Ie = e.localStorage[P].split(",#");
              1 < Ie.length && (delete e.localStorage[P],
                t.each(Ie, function (e, t) {
                  m(t)
                }))
            } catch ($e) {
            }
            try {
              ne = e.localStorage[P].split(";")
            } catch (We) {
            }
          }
          ke.bind("click.spectrum touchstart.spectrum", function (e) {
            re || k(),
              e.stopPropagation(),
            t(e.target).is("input") || e.preventDefault()
          }),
          (oe.is(":disabled") || !0 === N.disabled) && p(),
            se.click(r),
            fe.change(A),
            fe.bind("paste", function () {
              setTimeout(A, 1)
            }),
            fe.keydown(function (e) {
              13 == e.keyCode && A()
            }),
            be.text(N.cancelText),
            be.bind("click.spectrum", function (e) {
              e.stopPropagation(),
                e.preventDefault(),
                C("cancel")
            }),
            _e.text(N.chooseText),
            _e.bind("click.spectrum", function (e) {
              e.stopPropagation(),
                e.preventDefault(),
              fe.hasClass("sp-validation-error") || ($(!0),
                C())
            }),
            l(pe, function (e, t, n) {
              ee = e / V,
              n.shiftKey && (ee = Math.round(10 * ee) / 10),
                L()
            }),
            l(de, function (e, t) {
              K = parseFloat(t / U),
                L()
            }, y, w),
            l(le, function (e, t) {
              Y = parseFloat(e / q),
                Z = parseFloat((z - t) / z),
                L()
            }, y, w),
            Ce ? (T(Ce),
                E(),
                Le = Se || tinycolor(Ce).format,
                m(Ce)) : E(),
          j && x(),
            y = h ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum",
            me.delegate(".sp-thumb-el", y, R),
            ve.delegate(".sp-thumb-el:nth-child(1)", y, {
              ignore: !0
            }, R);
          var Ne = {
            show: x,
            hide: C,
            toggle: k,
            reflow: W,
            option: function (e, i) {
              return e === n ? t.extend({}, N) : i === n ? N[e] : (N[e] = i,
                    void f())
            },
            enable: function () {
              re = !1,
                oe.attr("disabled", !1),
                ke.removeClass("sp-disabled")
            },
            disable: p,
            set: function (e) {
              T(e),
                $()
            },
            get: S,
            destroy: function () {
              oe.show(),
                ke.unbind("click.spectrum touchstart.spectrum"),
                se.remove(),
                Ae.remove(),
                u[Ne.id] = null
            },
            container: se
          };
          Ne.id = u.push(Ne) - 1,
            p = Ne,
            t(this).data("spectrum.id", p.id)
        })
      }
      ,
      t.fn.spectrum.load = !0,
      t.fn.spectrum.loadOpts = {},
      t.fn.spectrum.draggable = l,
      t.fn.spectrum.defaults = d,
      t.spectrum = {},
      t.spectrum.localization = {},
      t.spectrum.palettes = {},
      t.fn.spectrum.processNativeColorInputs = function () {
        var e = t("<input type='color' value='#ffffff' />")[0];
        "color" === e.type && "!" != e.value || t("input[type=color]").spectrum({
          preferredFormat: "hex6"
        })
      }
    ;
    var m = function (e) {
      var t, n, i, a, o;
      if ("object" == typeof e && e.hasOwnProperty("_tc_id"))
        return e;
      n = e;
      var r = 0
        , s = 0
        , l = 0;
      e = 1;
      var c = !1
        , d = !1;
      if ("string" == typeof n)
        e: {
          n = n.replace(A, "").replace(k, "").toLowerCase();
          var u = !1;
          if (W[n])
            n = W[n],
              u = !0;
          else if ("transparent" == n) {
            n = {
              r: 0,
              g: 0,
              b: 0,
              a: 0
            };
            break e
          }
          n = (t = G.rgb.exec(n)) ? {
              r: t[1],
              g: t[2],
              b: t[3]
            } : (t = G.rgba.exec(n)) ? {
                r: t[1],
                g: t[2],
                b: t[3],
                a: t[4]
              } : (t = G.hsl.exec(n)) ? {
                  h: t[1],
                  s: t[2],
                  l: t[3]
                } : (t = G.hsla.exec(n)) ? {
                    h: t[1],
                    s: t[2],
                    l: t[3],
                    a: t[4]
                  } : (t = G.hsv.exec(n)) ? {
                      h: t[1],
                      s: t[2],
                      v: t[3]
                    } : (t = G.hex6.exec(n)) ? {
                        r: parseInt(t[1], 16),
                        g: parseInt(t[2], 16),
                        b: parseInt(t[3], 16),
                        format: u ? "name" : "hex"
                      } : !!(t = G.hex3.exec(n)) && {
                        r: parseInt(t[1] + "" + t[1], 16),
                        g: parseInt(t[2] + "" + t[2], 16),
                        b: parseInt(t[3] + "" + t[3], 16),
                        format: u ? "name" : "hex"
                      }
        }
      "object" == typeof n && (n.hasOwnProperty("r") && n.hasOwnProperty("g") && n.hasOwnProperty("b") ? (r = 255 * y(n.r, 255),
          s = 255 * y(n.g, 255),
          l = 255 * y(n.b, 255),
          c = !0,
          d = "rgb") : n.hasOwnProperty("h") && n.hasOwnProperty("s") && n.hasOwnProperty("v") ? (d = n.h,
            s = n.s,
            l = n.v,
            d = 6 * y(d, 360),
            s = y(s, 100),
            l = y(l, 100),
            r = C.floor(d),
            c = d - r,
            d = l * (1 - s),
            t = l * (1 - c * s),
            c = l * (1 - (1 - c) * s),
            u = r % 6,
            r = 255 * [l, t, d, d, c, l][u],
            s = 255 * [c, l, l, t, d, d][u],
            l = 255 * [d, d, c, l, l, t][u],
            c = !0,
            d = "hsv") : n.hasOwnProperty("h") && n.hasOwnProperty("s") && n.hasOwnProperty("l") && (r = n.h,
            d = n.s,
            l = n.l,
            s = function (e, t, n) {
              return 0 > n && (n += 1),
              1 < n && (n -= 1),
                n < 1 / 6 ? e + 6 * (t - e) * n : .5 > n ? t : n < 2 / 3 ? e + 6 * (t - e) * (2 / 3 - n) : e
            }
            ,
            r = y(r, 360),
            d = y(d, 100),
            l = y(l, 100),
            0 === d ? d = l = t = l : (t = .5 > l ? l * (1 + d) : l + d - l * d,
                c = 2 * l - t,
                d = s(c, t, r + 1 / 3),
                l = s(c, t, r),
                t = s(c, t, r - 1 / 3)),
            r = 255 * d,
            s = 255 * l,
            l = 255 * t,
            c = !0,
            d = "hsl"),
      n.hasOwnProperty("a") && (e = n.a)),
        r = S(255, L(r, 0)),
        s = S(255, L(s, 0)),
        l = S(255, L(l, 0)),
      1 > r && (r = T(r)),
      1 > s && (s = T(s)),
      1 > l && (l = T(l)),
        t = c,
        n = n && n.format || d,
        i = r,
        a = s,
        o = l;
      var h = I(e);
      return {
        ok: t,
        format: n,
        _tc_id: x++,
        alpha: h,
        toHsv: function () {
          var e = b(i, a, o);
          return {
            h: e.h,
            s: e.s,
            v: e.v,
            a: h
          }
        },
        toHsvString: function () {
          var e = b(i, a, o)
            , t = T(360 * e.h)
            , n = T(100 * e.s)
            , e = T(100 * e.v);
          return 1 == h ? "hsv(" + t + ", " + n + "%, " + e + "%)" : "hsva(" + t + ", " + n + "%, " + e + "%, " + h + ")"
        },
        toHsl: function () {
          var e = v(i, a, o);
          return {
            h: e.h,
            s: e.s,
            l: e.l,
            a: h
          }
        },
        toHslString: function () {
          var e = v(i, a, o)
            , t = T(360 * e.h)
            , n = T(100 * e.s)
            , e = T(100 * e.l);
          return 1 == h ? "hsl(" + t + ", " + n + "%, " + e + "%)" : "hsla(" + t + ", " + n + "%, " + e + "%, " + h + ")"
        },
        toHex: function () {
          return _(i, a, o)
        },
        toHexString: function (e) {
          return "#" + _(i, a, o, e)
        },
        toRgb: function () {
          return {
            r: T(i),
            g: T(a),
            b: T(o),
            a: h
          }
        },
        toRgbString: function () {
          return 1 == h ? "rgb(" + T(i) + ", " + T(a) + ", " + T(o) + ")" : "rgba(" + T(i) + ", " + T(a) + ", " + T(o) + ", " + h + ")"
        },
        toName: function () {
          return B[_(i, a, o)] || !1
        },
        toFilter: function (e, t) {
          var n = _(i, a, o, !0)
            , r = n
            , s = Math.round(255 * I(h)).toString(16)
            , l = s
            , c = e && e.gradientType ? "GradientType = 1, " : "";
          return t && (l = m(t),
            r = l.toHex(),
            l = Math.round(255 * I(l.alpha)).toString(16)),
          "progid:DXImageTransform.Microsoft.gradient(" + c + "startColorstr=#" + w(s) + n + ",endColorstr=#" + w(l) + r + ")"
        },
        toString: function (e) {
          e = e || this.format;
          var t = !1;
          return "rgb" === e && (t = this.toRgbString()),
          "hex" === e && (t = this.toHexString()),
          "hex6" === e && (t = this.toHexString(!0)),
          "name" === e && (t = this.toName()),
          "hsl" === e && (t = this.toHslString()),
          "hsv" === e && (t = this.toHsvString()),
          t || this.toHexString(!0)
        }
      }
    }
      , v = function (e, t, n) {
      e = y(e, 255),
        t = y(t, 255),
        n = y(n, 255);
      var i, a = L(e, t, n), o = S(e, t, n), r = (a + o) / 2;
      if (a == o)
        i = o = 0;
      else {
        var s = a - o
          , o = .5 < r ? s / (2 - a - o) : s / (a + o);
        switch (a) {
          case e:
            i = (t - n) / s + (t < n ? 6 : 0);
            break;
          case t:
            i = (n - e) / s + 2;
            break;
          case n:
            i = (e - t) / s + 4
        }
        i /= 6
      }
      return {
        h: i,
        s: o,
        l: r
      }
    }
      , b = function (e, t, n) {
      e = y(e, 255),
        t = y(t, 255),
        n = y(n, 255);
      var i, a = L(e, t, n), o = S(e, t, n), r = a - o;
      if (a == o)
        i = 0;
      else {
        switch (a) {
          case e:
            i = (t - n) / r + (t < n ? 6 : 0);
            break;
          case t:
            i = (n - e) / r + 2;
            break;
          case n:
            i = (e - t) / r + 4
        }
        i /= 6
      }
      return {
        h: i,
        s: 0 === a ? 0 : r / a,
        v: a
      }
    }
      , _ = function (e, t, n, i) {
      return e = [w(T(e).toString(16)), w(T(t).toString(16)), w(T(n).toString(16))],
        i || e[0].charAt(0) != e[0].charAt(1) || e[1].charAt(0) != e[1].charAt(1) || e[2].charAt(0) != e[2].charAt(1) ? e.join("") : e[0].charAt(0) + e[1].charAt(0) + e[2].charAt(0)
    }
      , y = function (e, t) {
      "string" == typeof e && -1 != e.indexOf(".") && 1 === I(e) && (e = "100%");
      var n = "string" == typeof e && -1 != e.indexOf("%");
      return e = S(t, L(0, I(e))),
      n && (e *= t / 100),
        1e-6 > C.abs(e - t) ? 1 : 1 <= e ? e % t / I(t) : e
    }
      , w = function (e) {
      return 1 == e.length ? "0" + e : "" + e
    }
      , A = /^[\s,#]+/
      , k = /\s+$/
      , x = 0
      , C = Math
      , T = C.round
      , S = C.min
      , L = C.max
      , E = C.random
      , I = this.parseFloat;
    m.fromRatio = function (e) {
      if ("object" == typeof e)
        for (var t in e)
          1 === e[t] && (e[t] = "1.0");
      return m(e)
    }
      ,
      m.equals = function (e, t) {
        return !(!e || !t) && m(e).toRgbString() == m(t).toRgbString()
      }
      ,
      m.random = function () {
        return m.fromRatio({
          r: E(),
          g: E(),
          b: E()
        })
      }
      ,
      m.desaturate = function (e, t) {
        var n = m(e).toHsl();
        return n.s -= (t || 10) / 100,
          n.s = S(1, L(0, n.s)),
          m(n)
      }
      ,
      m.saturate = function (e, t) {
        var n = m(e).toHsl();
        return n.s += (t || 10) / 100,
          n.s = S(1, L(0, n.s)),
          m(n)
      }
      ,
      m.greyscale = function (e) {
        return m.desaturate(e, 100)
      }
      ,
      m.lighten = function (e, t) {
        var n = m(e).toHsl();
        return n.l += (t || 10) / 100,
          n.l = S(1, L(0, n.l)),
          m(n)
      }
      ,
      m.darken = function (e, t) {
        var n = m(e).toHsl();
        return n.l -= (t || 10) / 100,
          n.l = S(1, L(0, n.l)),
          m(n)
      }
      ,
      m.complement = function (e) {
        return e = m(e).toHsl(),
          e.h = (e.h + .5) % 1,
          m(e)
      }
      ,
      m.triad = function (e) {
        var t = m(e).toHsl()
          , n = 360 * t.h;
        return [m(e), m({
          h: (n + 120) % 360,
          s: t.s,
          l: t.l
        }), m({
          h: (n + 240) % 360,
          s: t.s,
          l: t.l
        })]
      }
      ,
      m.tetrad = function (e) {
        var t = m(e).toHsl()
          , n = 360 * t.h;
        return [m(e), m({
          h: (n + 90) % 360,
          s: t.s,
          l: t.l
        }), m({
          h: (n + 180) % 360,
          s: t.s,
          l: t.l
        }), m({
          h: (n + 270) % 360,
          s: t.s,
          l: t.l
        })]
      }
      ,
      m.splitcomplement = function (e) {
        var t = m(e).toHsl()
          , n = 360 * t.h;
        return [m(e), m({
          h: (n + 72) % 360,
          s: t.s,
          l: t.l
        }), m({
          h: (n + 216) % 360,
          s: t.s,
          l: t.l
        })]
      }
      ,
      m.analogous = function (e, t, n) {
        t = t || 6,
          n = n || 30;
        var i = m(e).toHsl();
        for (n = 360 / n,
               e = [m(e)],
               i.h *= 360,
               i.h = (i.h - (n * t >> 1) + 720) % 360; --t;)
          i.h = (i.h + n) % 360,
            e.push(m(i));
        return e
      }
      ,
      m.monochromatic = function (e, t) {
        t = t || 6;
        for (var n = m(e).toHsv(), i = n.h, a = n.s, n = n.v, o = [], r = 1 / t; t--;)
          o.push(m({
            h: i,
            s: a,
            v: n
          })),
            n = (n + r) % 1;
        return o
      }
      ,
      m.readable = function (e, t) {
        var n = m(e).toRgb()
          , i = m(t).toRgb();
        return 10404 < (i.r - n.r) * (i.r - n.r) + (i.g - n.g) * (i.g - n.g) + (i.b - n.b) * (i.b - n.b)
      }
    ;
    var $, W = m.names = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "0ff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "00f",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      burntsienna: "ea7e5d",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "0ff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "f0f",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32"
    }, p = m, f = W, N = {};
    for ($ in f)
      f.hasOwnProperty($) && (N[f[$]] = $);
    var G, B = p.hexNames = N;
    G = {
      rgb: RegExp("rgb[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
      rgba: RegExp("rgba[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
      hsl: RegExp("hsl[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
      hsla: RegExp("hsla[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
      hsv: RegExp("hsv[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
      hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    },
      this.tinycolor = m,
      t(function () {
        t.fn.spectrum.load && t.fn.spectrum.processNativeColorInputs()
      })
  }(window, jQuery),
  function (e, t, n) {
    function i() {
      a = t[s](function () {
        o.each(function () {
          var t = e(this)
            , n = t.width()
            , i = t.height()
            , a = e.data(this, c);
          n === a.w && i === a.h || t.trigger(l, [a.w = n, a.h = i])
        }),
          i()
      }, r[d])
    }

    var a, o = e([]), r = e.resize = e.extend(e.resize, {}), s = "setTimeout", l = "resize", c = l + "-special-event", d = "delay", u = "throttleWindow";
    r[d] = 250,
      r[u] = !0,
      e.event.special[l] = {
        setup: function () {
          if (!r[u] && this[s])
            return !1;
          var t = e(this);
          o = o.add(t),
            e.data(this, c, {
              w: t.width(),
              h: t.height()
            }),
          1 === o.length && i()
        },
        teardown: function () {
          if (!r[u] && this[s])
            return !1;
          var t = e(this);
          o = o.not(t),
            t.removeData(c),
          o.length || clearTimeout(a)
        },
        add: function (t) {
          function i(t, i, o) {
            var r = e(this)
              , s = e.data(this, c);
            s.w = i !== n ? i : r.width(),
              s.h = o !== n ? o : r.height(),
              a.apply(this, arguments)
          }

          if (!r[u] && this[s])
            return !1;
          var a;
          return e.isFunction(t) ? (a = t,
              i) : (a = t.handler,
              void (t.handler = i))
        }
      }
  }(jQuery, this),
  function (e) {
    function t(e) {
      return "object" == typeof e ? e : {
          top: e,
          left: e
        }
    }

    var n = e.scrollTo = function (t, n, i) {
        e(window).scrollTo(t, n, i)
      }
      ;
    n.defaults = {
      axis: "xy",
      duration: parseFloat(e.fn.jquery) >= 1.3 ? 0 : 1,
      limit: !0
    },
      n.window = function (t) {
        return e(window)._scrollable()
      }
      ,
      e.fn._scrollable = function () {
        return this.map(function () {
          var t = this
            , n = !t.nodeName || e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
          if (!n)
            return t;
          var i = (t.contentWindow || t).document || t.ownerDocument || t;
          return /webkit/i.test(navigator.userAgent) || "BackCompat" == i.compatMode ? i.body : i.documentElement
        })
      }
      ,
      e.fn.scrollTo = function (i, a, o) {
        return "object" == typeof a && (o = a,
          a = 0),
        "function" == typeof o && (o = {
          onAfter: o
        }),
        "max" == i && (i = 9e9),
          o = e.extend({}, n.defaults, o),
          a = a || o.duration,
          o.queue = o.queue && o.axis.length > 1,
        o.queue && (a /= 2),
          o.offset = t(o.offset),
          o.over = t(o.over),
          this._scrollable().each(function () {
            function r(e) {
              c.animate(u, a, o.easing, e && function () {
                  e.call(this, i, o)
                }
              )
            }

            if (null != i) {
              var s, l = this, c = e(l), d = i, u = {}, h = c.is("html,body");
              switch (typeof d) {
                case "number":
                case "string":
                  if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(d)) {
                    d = t(d);
                    break
                  }
                  if (d = e(d, this),
                      !d.length)
                    return;
                case "object":
                  (d.is || d.style) && (s = (d = e(d)).offset())
              }
              e.each(o.axis.split(""), function (e, t) {
                var i = "x" == t ? "Left" : "Top"
                  , a = i.toLowerCase()
                  , p = "scroll" + i
                  , g = l[p]
                  , f = n.max(l, t);
                if (s)
                  u[p] = s[a] + (h ? 0 : g - c.offset()[a]),
                  o.margin && (u[p] -= parseInt(d.css("margin" + i)) || 0,
                    u[p] -= parseInt(d.css("border" + i + "Width")) || 0),
                    u[p] += o.offset[a] || 0,
                  o.over[a] && (u[p] += d["x" == t ? "width" : "height"]() * o.over[a]);
                else {
                  var m = d[a];
                  u[p] = m.slice && "%" == m.slice(-1) ? parseFloat(m) / 100 * f : m
                }
                o.limit && /^\d+$/.test(u[p]) && (u[p] = u[p] <= 0 ? 0 : Math.min(u[p], f)),
                !e && o.queue && (g != u[p] && r(o.onAfterFirst),
                  delete u[p])
              }),
                r(o.onAfter)
            }
          }).end()
      }
      ,
      n.max = function (t, n) {
        var i = "x" == n ? "Width" : "Height"
          , a = "scroll" + i;
        if (!e(t).is("html,body"))
          return t[a] - e(t)[i.toLowerCase()]();
        var o = "client" + i
          , r = t.ownerDocument.documentElement
          , s = t.ownerDocument.body;
        return Math.max(r[a], s[a]) - Math.min(r[o], s[o])
      }
  }(jQuery);
var AriaTabs3b = function () {
  $(function () {
    $("#tabs").each(function (e) {
      var t = $(this);
      $(t).find(">div").attr({
        "class": "tabPanel",
        role: "tabpanel",
        "aria-hidden": "true"
      }).hide(),
        $(".tabPanel").attr("tabindex", "0");
      var n = $(this).find("ul:first").attr({
        "class": "tabsList",
        role: "tablist"
      });
      $(n).find("li>a").each(function (e) {
        var i = "tab-" + $(this).attr("href").slice(1);
        $(this).attr({
          id: i,
          role: "tab",
          "aria-selected": "false",
          tabindex: "-1"
        }).parent().attr("role", "presentation"),
          $(t).find(".tabPanel").eq(e).attr("aria-labelledby", i),
          $(this).click(function (e) {
            e.preventDefault(),
              $(n).find(">li.current").removeClass("current").find(">a").attr({
                "aria-selected": "false",
                tabindex: "-1"
              }),
              $(t).find(".tabPanel:visible").attr("aria-hidden", "true").hide(),
              $(t).find(".tabPanel").eq($(this).parent().index()).attr("aria-hidden", "false").show(),
              $(this).attr({
                "aria-selected": "true",
                tabindex: "0"
              }).parent().addClass("current"),
              $(this).focus(),
            "extension" == config.platform && config.isSidebar && sidebarMessaging.fn.sendToBackground("setCurrentTab", i),
              wave.tabs.current = i
          })
      }),
        $(n).delegate("a", "keydown", function (e) {
          switch (e.which) {
            case 37:
            case 38:
              0 != $(this).parent().prev().length ? $(this).parent().prev().find(">a").click() : $(n).find("li:last>a").click();
              break;
            case 39:
            case 40:
              0 != $(this).parent().next().length ? $(this).parent().next().find(">a").click() : $(n).find("li:first>a").click()
          }
        }),
        $(t).find(".tabPanel:first").attr("aria-hidden", "false").show(),
        $(n).find("li:first").addClass("current").find(">a").attr({
          "aria-selected": "true",
          tabindex: "0"
        })
    })
  })
}();
jQuery.easing.jswing = jQuery.easing.swing,
  jQuery.extend(jQuery.easing, {
    def: "easeOutQuart",
    swing: function (e, t, n, i, a) {
      return jQuery.easing[jQuery.easing.def](e, t, n, i, a)
    },
    easeOutQuart: function (e, t, n, i, a) {
      return -i * ((t = t / a - 1) * t * t * t - 1) + n
    }
  }),
  function (e, t) {
    function n(e, t, n) {
      return [parseInt(e[0], 10) * (h.test(e[0]) ? t / 100 : 1), parseInt(e[1], 10) * (h.test(e[1]) ? n / 100 : 1)]
    }

    function i(t, n) {
      return parseInt(e.css(t, n), 10) || 0
    }

    e.ui = e.ui || {};
    var a, o = Math.max, r = Math.abs, s = Math.round, l = /left|center|right/, c = /top|center|bottom/, d = /[\+\-]\d+%?/, u = /^\w+/, h = /%$/, p = e.fn.position;
    e.position = {
      scrollbarWidth: function () {
        if (a !== t)
          return a;
        var n, i, o = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), r = o.children()[0];
        return e("body").append(o),
          n = r.offsetWidth,
          o.css("overflow", "scroll"),
          i = r.offsetWidth,
        n === i && (i = o[0].clientWidth),
          o.remove(),
          a = n - i
      },
      getScrollInfo: function (t) {
        var n = t.isWindow ? "" : t.element.css("overflow-x")
          , i = t.isWindow ? "" : t.element.css("overflow-y")
          , a = "scroll" === n || "auto" === n && t.width < t.element[0].scrollWidth
          , o = "scroll" === i || "auto" === i && t.height < t.element[0].scrollHeight;
        return {
          width: a ? e.position.scrollbarWidth() : 0,
          height: o ? e.position.scrollbarWidth() : 0
        }
      },
      getWithinInfo: function (t) {
        var n = e(t || window)
          , i = e.isWindow(n[0]);
        return {
          element: n,
          isWindow: i,
          offset: n.offset() || {
            left: 0,
            top: 0
          },
          scrollLeft: n.scrollLeft(),
          scrollTop: n.scrollTop(),
          width: i ? n.width() : n.outerWidth(),
          height: i ? n.height() : n.outerHeight()
        }
      }
    },
      e.fn.position = function (t) {
        if (!t || !t.of)
          return p.apply(this, arguments);
        t = e.extend({}, t);
        var a, h, g, f, m, v = e(t.of), b = e.position.getWithinInfo(t.within), _ = e.position.getScrollInfo(b), y = v[0], w = (t.collision || "flip").split(" "), A = {};
        return 9 === y.nodeType ? (h = v.width(),
            g = v.height(),
            f = {
              top: 0,
              left: 0
            }) : e.isWindow(y) ? (h = v.width(),
              g = v.height(),
              f = {
                top: v.scrollTop(),
                left: v.scrollLeft()
              }) : y.preventDefault ? (t.at = "left top",
                h = g = 0,
                f = {
                  top: y.pageY,
                  left: y.pageX
                }) : (h = v.outerWidth(),
                g = v.outerHeight(),
                f = v.offset()),
          m = e.extend({}, f),
          e.each(["my", "at"], function () {
            var e, n, i = (t[this] || "").split(" ");
            1 === i.length && (i = l.test(i[0]) ? i.concat(["center"]) : c.test(i[0]) ? ["center"].concat(i) : ["center", "center"]),
              i[0] = l.test(i[0]) ? i[0] : "center",
              i[1] = c.test(i[1]) ? i[1] : "center",
              e = d.exec(i[0]),
              n = d.exec(i[1]),
              A[this] = [e ? e[0] : 0, n ? n[0] : 0],
              t[this] = [u.exec(i[0])[0], u.exec(i[1])[0]]
          }),
        1 === w.length && (w[1] = w[0]),
          "right" === t.at[0] ? m.left += h : "center" === t.at[0] && (m.left += h / 2),
          "bottom" === t.at[1] ? m.top += g : "center" === t.at[1] && (m.top += g / 2),
          a = n(A.at, h, g),
          m.left += a[0],
          m.top += a[1],
          this.each(function () {
            var l, c, d = e(this), u = d.outerWidth(), p = d.outerHeight(), y = i(this, "marginLeft"), k = i(this, "marginTop"), x = u + y + i(this, "marginRight") + _.width, C = p + k + i(this, "marginBottom") + _.height, T = e.extend({}, m), S = n(A.my, d.outerWidth(), d.outerHeight());
            "right" === t.my[0] ? T.left -= u : "center" === t.my[0] && (T.left -= u / 2),
              "bottom" === t.my[1] ? T.top -= p : "center" === t.my[1] && (T.top -= p / 2),
              T.left += S[0],
              T.top += S[1],
            e.support.offsetFractions || (T.left = s(T.left),
              T.top = s(T.top)),
              l = {
                marginLeft: y,
                marginTop: k
              },
              e.each(["left", "top"], function (n, i) {
                e.ui.position[w[n]] && e.ui.position[w[n]][i](T, {
                  targetWidth: h,
                  targetHeight: g,
                  elemWidth: u,
                  elemHeight: p,
                  collisionPosition: l,
                  collisionWidth: x,
                  collisionHeight: C,
                  offset: [a[0] + S[0], a[1] + S[1]],
                  my: t.my,
                  at: t.at,
                  within: b,
                  elem: d
                })
              }),
            e.fn.bgiframe && d.bgiframe(),
            t.using && (c = function (e) {
                var n = f.left - T.left
                  , i = n + h - u
                  , a = f.top - T.top
                  , s = a + g - p
                  , l = {
                  target: {
                    element: v,
                    left: f.left,
                    top: f.top,
                    width: h,
                    height: g
                  },
                  element: {
                    element: d,
                    left: T.left,
                    top: T.top,
                    width: u,
                    height: p
                  },
                  horizontal: i < 0 ? "left" : n > 0 ? "right" : "center",
                  vertical: s < 0 ? "top" : a > 0 ? "bottom" : "middle"
                };
                h < u && r(n + i) < h && (l.horizontal = "center"),
                g < p && r(a + s) < g && (l.vertical = "middle"),
                  o(r(n), r(i)) > o(r(a), r(s)) ? l.important = "horizontal" : l.important = "vertical",
                  t.using.call(this, e, l)
              }
            ),
              d.offset(e.extend(T, {
                using: c
              }))
          })
      }
      ,
      e.ui.position = {
        fit: {
          left: function (e, t) {
            var n, i = t.within, a = i.isWindow ? i.scrollLeft : i.offset.left, r = i.width, s = e.left - t.collisionPosition.marginLeft, l = a - s, c = s + t.collisionWidth - r - a;
            t.collisionWidth > r ? l > 0 && c <= 0 ? (n = e.left + l + t.collisionWidth - r - a,
                  e.left += l - n) : c > 0 && l <= 0 ? e.left = a : l > c ? e.left = a + r - t.collisionWidth : e.left = a : l > 0 ? e.left += l : c > 0 ? e.left -= c : e.left = o(e.left - s, e.left)
          },
          top: function (e, t) {
            var n, i = t.within, a = i.isWindow ? i.scrollTop : i.offset.top, r = t.within.height, s = e.top - t.collisionPosition.marginTop, l = a - s, c = s + t.collisionHeight - r - a;
            t.collisionHeight > r ? l > 0 && c <= 0 ? (n = e.top + l + t.collisionHeight - r - a,
                  e.top += l - n) : c > 0 && l <= 0 ? e.top = a : l > c ? e.top = a + r - t.collisionHeight : e.top = a : l > 0 ? e.top += l : c > 0 ? e.top -= c : e.top = o(e.top - s, e.top)
          }
        },
        flip: {
          left: function (e, t) {
            var n, i, a = t.within, o = a.offset.left + a.scrollLeft, s = a.width, l = a.isWindow ? a.scrollLeft : a.offset.left, c = e.left - t.collisionPosition.marginLeft, d = c - l, u = c + t.collisionWidth - s - l, h = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0, p = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0, g = -2 * t.offset[0];
            d < 0 ? (n = e.left + h + p + g + t.collisionWidth - s - o,
              (n < 0 || n < r(d)) && (e.left += h + p + g)) : u > 0 && (i = e.left - t.collisionPosition.marginLeft + h + p + g - l,
              (i > 0 || r(i) < u) && (e.left += h + p + g))
          },
          top: function (e, t) {
            var n, i, a = t.within, o = a.offset.top + a.scrollTop, s = a.height, l = a.isWindow ? a.scrollTop : a.offset.top, c = e.top - t.collisionPosition.marginTop, d = c - l, u = c + t.collisionHeight - s - l, h = "top" === t.my[1], p = h ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0, g = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0, f = -2 * t.offset[1];
            d < 0 ? (i = e.top + p + g + f + t.collisionHeight - s - o,
              e.top + p + g + f > d && (i < 0 || i < r(d)) && (e.top += p + g + f)) : u > 0 && (n = e.top - t.collisionPosition.marginTop + p + g + f - l,
              e.top + p + g + f > u && (n > 0 || r(n) < u) && (e.top += p + g + f))
          }
        },
        flipfit: {
          left: function () {
            e.ui.position.flip.left.apply(this, arguments),
              e.ui.position.fit.left.apply(this, arguments)
          },
          top: function () {
            e.ui.position.flip.top.apply(this, arguments),
              e.ui.position.fit.top.apply(this, arguments)
          }
        }
      },
      function () {
        var t, n, i, a, o, r = document.getElementsByTagName("body")[0], s = document.createElement("div");
        t = document.createElement(r ? "div" : "body"),
          i = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
          },
        r && e.extend(i, {
          position: "absolute",
          left: "-1000px",
          top: "-1000px"
        });
        for (o in i)
          t.style[o] = i[o];
        t.appendChild(s),
          n = r || document.documentElement,
          n.insertBefore(t, n.firstChild),
          s.style.cssText = "position: absolute; left: 10.7432222px;",
          a = e(s).offset().left,
          e.support.offsetFractions = a > 10 && a < 11,
          t.innerHTML = "",
          n.removeChild(t)
      }(),
    e.uiBackCompat !== !1 && function (e) {
      var n = e.fn.position;
      e.fn.position = function (i) {
        if (!i || !i.offset)
          return n.call(this, i);
        var a = i.offset.split(" ")
          , o = i.at.split(" ");
        return 1 === a.length && (a[1] = a[0]),
        /^\d/.test(a[0]) && (a[0] = "+" + a[0]),
        /^\d/.test(a[1]) && (a[1] = "+" + a[1]),
        1 === o.length && (/left|center|right/.test(o[0]) ? o[1] = "center" : (o[1] = o[0],
            o[0] = "center")),
          n.call(this, e.extend(i, {
            at: o[0] + a[0] + " " + o[1] + a[1],
            offset: t
          }))
      }
    }(jQuery)
  }(jQuery),
  wave.xpath = {
    mappedElementsByXPath: {},
    XPath: {}
  },
  wave.xpath.getElementByXPath = function (e) {
    return this.mappedElementsByXPath[e]
  }
  ,
  wave.xpath.waveIdtoXPath = function (e) {
    return this.XPath[e]
  }
  ,
  wave.xpath.convertIconListToXPathOutput = function (e) {
    var t = {};
    for (var n in e) {
      t[n] || (t[n] = {});
      for (var i in e[n])
        "0" != i && (t[n][this.XPath[i]] = e[n][i])
    }
    return t["#"] = e[n][0] ? e[n][0] : [],
      t
  }
  ,
  wave.xpath.getXPathByElement = function (e) {
    if (!e)
      return null;
    for (var t = ""; e && 1 == e.nodeType; e = e.parentNode)
      if (1 == e.parentNode.nodeType) {
        var n = [].filter.call(e.parentNode.children, function (t) {
          return t.tagName == e.tagName
        });
        id = "[" + ([].indexOf.call(n, e) + 1) + "]",
        "HTML" != e.tagName && (t = "/" + e.tagName.toUpperCase() + id + t)
      }
    return t
  }
  ,
  wave.xpath.calculateXPath = function (e) {
    if (!e)
      return "/";
    if ("0" == e.getAttribute("data-waveid"))
      return "#";
    this.XPath[e.getAttribute("data-waveid")] = "/",
      this.mappedElementsByXPath["/"] = e;
    for (var t = {}, n = 0; e.children && n < e.children.length; n++)
      null == t[e.children[n].nodeName] && (t[e.children[n].nodeName] = 0),
        t[e.children[n].nodeName]++,
        wave.xpath.calculateXPathPrivate(e.children[n], "/" + e.children[n].nodeName + "[" + t[e.children[n].nodeName] + "]")
  }
  ,
  wave.xpath.calculateXPathPrivate = function (e, t) {
    if (e) {
      this.XPath[e.getAttribute("data-waveid")] = t,
        this.mappedElementsByXPath[t] = e;
      for (var n = {}, i = 0; e.children && i < e.children.length; i++)
        null == n[e.children[i].nodeName] && (n[e.children[i].nodeName] = 0),
          n[e.children[i].nodeName]++,
          wave.xpath.calculateXPathPrivate(e.children[i], t + "/" + e.children[i].nodeName + "[" + n[e.children[i].nodeName] + "]")
    }
  }
  ,
  wave.Code = function () {
    $("#wave5code").empty(),
      this.xpaths = {},
      this.htmlRoot = null,
      this.selectedElement = null,
      this.selectedXpath = ""
  }
  ,
  wave.Code.prototype.setHtmlRoot = function (e) {
    this.htmlRoot = e
  }
  ,
  wave.Code.prototype.setSelected = function (e) {
    $('[data-reportxpath="' + this.selectedXpath + '"]').removeClass("selectedcode"),
      $('[data-reportxpath="' + e.waveid + '"]').addClass("selectedcode"),
      this.unhighlight();
    var t = $('[data-reportxpath="' + e.waveid + '"]');
    t.length > 0 && $("#wave5code").scrollTo(t, 250, {
      offset: {
        top: -30,
        left: 0
      },
      axis: "y"
    }),
      this.selectedElement = e.target,
      this.selectedXpath = e.waveid,
      this.highlight()
  }
  ,
  wave.Code.prototype.displayTree = function () {
    this.codeIcons = {};
    var e = $("#wave5code")
      , t = $("#report");
    this.size || (this.size = t.height());
    try {
      e.html(this.displayTreePrivate(this.htmlRoot, "", 0))
    } catch (n) {
      console.log("error creating code panel invalid characters on page:"),
        console.log(n)
    }
    return "extension" != config.platform || config.isSidebar ? insertCodeIcons(this.codeIcons) : (reportPageMessaging.fn.setupAndDispatchEvent("outlineIcons", this.codeIcons),
        insertCodeIcons(this.codeIcons)),
      !0
  }
  ,
  wave.Code.prototype.highlight = function () {
    this.selectedElement == document.getElementById("wave5topbar") ? $("#report").css("outline", "2px dashed red") : $(this.selectedElement).css("outline", "2px dashed red")
  }
  ,
  wave.Code.prototype.unhighlight = function () {
    this.selectedElement == document.getElementById("wave5topbar") ? $("#report").css("outline", "") : $(this.selectedElement).css("outline", "")
  }
  ,
  wave.Code.prototype.hoverHighlight = function (e, t) {
    return wave.iconbox.isVisible() || (this.selectedElement = e,
      t ? this.highlight() : this.unhighlight()),
      !1
  }
  ,
  wave.Code.prototype.displayTreePrivate = function (e, t) {
    if (!e || $(e).hasClass("wave5icon") || $(e).hasClass("wave5text") || "wave5bottombar" == $(e).attr("id"))
      return "";
    if (1 !== e.nodeType && 9 !== e.nodeType && 10 !== e.nodeType) {
      var n = wave.utilities.trim(e.nodeValue)
        , i = "";
      return i = 8 === e.nodeType ? "<div class='wave5comment'>" + htmlEntities("<!-- " + n + "-->") + "</div>" : n.length > 0 ? "<br><span class='wave5codetext'>" + htmlEntities(n) + "</span><br>" : ""
    }
    for (var a = "", o = 0; e.attributes && o < e.attributes.length; o++)
      if (e.attributes[o].nodeName.indexOf("data-waveid") == -1) {
        var r = "wave5style" == e.attributes[o].nodeName ? "style" : e.attributes[o].nodeName;
        ("style" == r && "" != e.attributes[o].value || "style" != r) && (a += " <span class='wave5attribute'>" + r + "=\"<span class='wave5value'>" + e.attributes[o].value + '</span>"</span>')
      }
    e == this.selectedElement && (t += "<div id='wave5selectedcode'>");
    var s = wave.xpath.getXPathByElement(e)
      , l = "";
    if (void 0 !== wave.report.things.iconBaseXpaths[s]) {
      l = 'data-reportxpath="' + s + '"';
      for (var c = 0; c < wave.report.things.iconBaseXpaths[s].length; c++) {
        var d = wave.report.things.iconBaseXpaths[s][c];
        void 0 !== d.data && (void 0 == this.codeIcons[s] && (this.codeIcons[s] = []),
          this.codeIcons[s].push(iconImage(d, 0, "codepanel")))
      }
    }
    l && (t += "<div " + l + ">"),
      t += "<span class='wave5element'>" + htmlEntities("<" + e.nodeName.toLowerCase()) + a + ">";
    for (var o = 0; o < e.childNodes.length; o++)
      t += this.displayTreePrivate(e.childNodes[o], "");
    return t += e.innerHTML && e.innerHTML.length > 0 ? htmlEntities("</" + e.nodeName.toLowerCase() + ">") + "</span>" : "</span>",
    l && (t += "</div>"),
      t
  }
  ,
  wave.Errors = function () {
  }
  ,
  wave.Errors.prototype.log = function (e) {
    console.log(e)
  }
  ,
  wave.Errors.prototype.die = function (e) {
    wave.hasError = !0
  }
  ,
  wave.tabs = {
    mode: "styles",
    filter: 0,
    current: "tab-summary",
    iconBoxInitiated: !1
  },
  $(document).ready(function () {
    var e = $("#input_url").val();
    $("#input_url").bind("keyup", function () {
      $("#input_url").val() != e ? $("#button_wave").addClass("new") : $("#button_wave").removeClass("new")
    }),
      $("#filter").bind("change", function () {
        var e = $(this).val();
        "extension" == config.platform && config.isSidebar ? (sidebarMessaging.fn.sendToBackground("setFilter", e),
            wave.manager.ThingManager.prototype.filterLevel(e)) : wave.report.things.filterLevel(e)
      }),
    void 0 == wave.conf && (wave.conf = {
      paths: {
        site: "http://" + document.domain
      }
    });
    var t = [wave.conf.paths.site + "/img/submit_on.png", wave.conf.paths.site + "/img/refresh_on.png"];
    $(t).each(function () {
      $("<img />").attr("src", this)
    }),
      $("#foregroundpicker").spectrum({
        clickoutFiresChange: !0,
        showInitial: !0,
        showButtons: !1,
        preferredFormat: "hex6",
        color: "0000ff",
        move: function (e) {
          $("#foreground").val(e.toHexString().replace("#", "")),
            checkcontrast()
        }
      }),
      $("#backgroundpicker").spectrum({
        clickoutFiresChange: !0,
        showInitial: !0,
        showButtons: !1,
        preferredFormat: "hex6",
        color: "ffffff",
        move: function (e) {
          $("#background").val(e.toHexString().replace("#", "")),
            checkcontrast()
        }
      }),
      $("#foreground").change(function () {
        $("#foregroundpicker").spectrum("set", $("#foreground").val()),
          checkcontrast()
      }),
      $("#background").change(function () {
        $("#backgroundpicker").spectrum("set", $("#background").val()),
          checkcontrast()
      }),
      $("#fglighten").click(function (e) {
        e.preventDefault(),
          changehue("foreground", "lighten"),
          $("#foregroundpicker").spectrum("set", $("#foreground").val())
      }),
      $("#fgdarken").click(function (e) {
        e.preventDefault(),
          changehue("foreground", "darken"),
          $("#foregroundpicker").spectrum("set", $("#foreground").val())
      }),
      $("#bglighten").click(function (e) {
        e.preventDefault(),
          changehue("background", "lighten"),
          $("#backgroundpicker").spectrum("set", $("#background").val())
      }),
      $("#bgdarken").click(function (e) {
        e.preventDefault(),
          changehue("background", "darken"),
          $("#backgroundpicker").spectrum("set", $("#background").val())
      }),
    ($.browser.msie || /Trident\/7\./.test(navigator.userAgent)) && $("#desaturate").hide(),
      $("#desaturate").click(function (e) {
        e.preventDefault(),
          "Desaturate page" == $("#desaturate").text() ? ("extension" == config.platform && config.isSidebar ? sidebarMessaging.fn.sendToBackground("toggleSaturation", {
                action: "desaturate"
              }) : $("#report").css("filter", "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale\")").css("filter", "gray").css("webkitFilter", "grayscale(100%)"),
              $("#desaturate").text("Resaturate page")) : ("extension" == config.platform && config.isSidebar ? sidebarMessaging.fn.sendToBackground("toggleSaturation", {
                action: "resaturate"
              }) : $("#report").removeAttr("style"),
              $("#desaturate").text("Desaturate page"))
      }),
      checkcontrast()
  }),
  $(function () {
    $(window).resize(function () {
      wave.tabs.doResize(),
        wave.fn.resizeReportWindow()
    }),
    "extension" == config.platform && 1 != config.isSidebar || $("#modes a").click(function (e) {
      e.preventDefault(),
        $("#modes a.pressed").removeClass("pressed"),
        $(this).addClass("pressed"),
        wave.tabs.mode = this.id,
      void 0 != wave.iconbox && wave.iconbox.hide(),
        wave.tabs.changeMode(this.id)
    }),
    ("extension" != config.platform || config.isSidebar) && $(".tabs_docs_showindex_link").click(function (e) {
      e.preventDefault(),
        wave.tabs.showIndex()
    }),
      $("#wave5codetoggle a").click(function (e) {
        var t, n = "extension" == config.platform ? $("body") : $("#report"), i = Math.round(parseFloat($("#wave5bottombar").css("height")));
        i <= 1 ? ($("#wave5codetoggle").toggleClass("wave5_open"),
            t = "extension" == config.platform ? n.height() + 200 : n.height() - 200,
            n.animate({
              height: t + "px"
            }, 500, "easeOutQuart"),
            $("#wave5bottombar").animate({
              height: "200px"
            }, 500, "easeOutQuart"),
          "extension" == config.platform && $("#wave5bottombar").css({
            width: "100%",
            "float": "left",
            position: "fixed",
            "z-index": "2147483647",
            "border-top": "inset 1px #737c70",
            height: "0px",
            bottom: "-1px",
            right: "0px",
            left: "268px",
            overflow: "visible"
          })) : (t = "extension" == config.platform ? n.height() - 200 : n.height() + 200,
            n.animate({
              height: t + "px"
            }, 500, "easeOutQuart"),
            $("#wave5bottombar").animate({
              height: "0px"
            }, 500, "easeOutQuart"),
            $("#wave5codetoggle").toggleClass("wave5_open"),
          "extension" == config.platform && $("#wave5bottombar").css({
            width: "100%",
            "float": "left",
            position: "fixed",
            "z-index": "2147483647",
            "border-top": "inset 1px #737c70",
            height: "0px",
            bottom: "-1px",
            right: "0px",
            left: "268px",
            overflow: "visible"
          })),
        "extension" == config.platform && n.css({
          height: t,
          overflow: "scroll"
        }),
          e.preventDefault()
      }),
      $("#modes #styles").addClass("pressed")
  }),
  wave.tabs.resetPanels = function () {
    $("#tab-summary").click(),
      $("#tab_docs_container").hide(),
      $("#tab_docs_placeholder").show(),
      this.hideError()
  }
  ,
  wave.tabs.toggleSaturation = function (e) {
    "desaturate" == e ? $("body").css("filter", "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale\")").css("filter", "gray").css("webkitFilter", "grayscale(100%)") : $("body").removeAttr("style")
  }
  ,
  wave.tabs.updatePanels = function (e) {
    "extension" != config.platform || config.isSidebar ? ($("#error span").html(e.error.count),
        $("#alert span").html(e.alert.count),
        $("#feature span").html(e.feature.count),
        $("#structure span").html(e.structure.count),
        $("#html5 span").html(e.html5.count),
        $("#contrast span").html(e.contrast.count),
        wave.tabs.showDetails()) : reportPageMessaging.fn.setupAndDispatchEvent("waveResults", e),
    config.debug && console.log("End updatePanels")
  }
  ,
  wave.tabs.uncheckAllCheckboxes = function () {
    for (var e in wave.report.iconlist)
      for (var t in wave.report.iconlist[e].items)
        $("#toggle_type_" + t).prop("checked", !1).trigger("change")
  }
  ,
  wave.tabs.toggleCheckboxesForFilter = function (e) {
    if (wave.tabs.filter = e,
      88 == wave.tabs.filter)
      wave.tabs.uncheckAllCheckboxes(),
        wave.tabs.filter = 0;
    else if (0 == id)
      for (var t in wave.report.iconlist)
        for (var n in wave.report.iconlist[t].items)
          $("#toggle_type_" + n).prop("checked", !0).trigger("change");
    else if (3 == id) {
      wave.tabs.uncheckAllCheckboxes();
      for (var i = 2; i <= 3; i++)
        for (var a = this._iconsByLevel[i].icons, o = 0; o < a.length; o++)
          $("#toggle_group_" + a[o].data.cat_code).attr("checked") || $("#toggle_group_" + a[o].data.cat_code).prop("checked", !0).trigger("change"),
          $("#toggle_type_" + a[o].type).attr("checked") || $("#toggle_type_" + a[o].type).prop("checked", !0).trigger("change"),
            a[o].show()
    } else {
      wave.tabs.uncheckAllCheckboxes();
      for (var a = this._iconsByLevel[id].icons, o = 0; o < a.length; o++)
        $("#toggle_group_" + a[o].data.cat_code).attr("checked") || $("#toggle_group_" + a[o].data.cat_code).prop("checked", !0).trigger("change"),
        $("#toggle_type_" + a[o].type).attr("checked") || $("#toggle_type_" + a[o].type).prop("checked", !0).trigger("change"),
          a[o].show()
    }
  }
  ,
  wave.tabs.showError = function (e) {
    $("#sidebar_wrapper").hide(),
      $("#modes").hide(),
      wave.tabs.removeLoadingAnimation(),
      $("#wave5_error").html(e),
      $("#sidebar_error").show(),
      $("#report").contents().empty()
  }
  ,
  wave.tabs.hideError = function () {
    $("#sidebar_wrapper").show(),
      $("#modes").show(),
      $("#sidebar_error").hide()
  }
  ,
  wave.tabs.removeLoadingAnimation = function () {
    $("body").fadeTo("fast", 1),
      $("#wave5_loading").remove()
  }
  ,
  wave.tabs.filterCustom = function () {
    0 == $("#filter option[value=99]").length && $("#filter").prepend('<option value="99">Custom</option>'),
      $("#filter option[value=99]").prop("selected", "selected"),
      wave.tabs.filter = 99,
    "extension" == config.platform && config.isSidebar && sidebarMessaging.fn.sendToBackground("setFilter", wave.tabs.filter)
  }
  ,
  wave.tabs.filterReset = function (e) {
    $("#filter option[value=99]").remove(),
      $("#filter option[value=" + e + "]").prop("selected", "selected")
  }
  ,
  wave.tabs.doResize = function () {
    var e = $(window).height()
      , t = $("#sidebar_controls").height()
      , n = e - t - 45;
    $("#tabs>div").css({
      maxHeight: n
    })
  }
  ,
  wave.tabs.changeMode = function (e) {
    var t = $(wave.page).contents();
    wave.tabs.mode = e,
      "extension" == config.platform && config.isSidebar ? (sidebarMessaging.fn.sendToBackground("changeMode", e),
          window.scrollTo(0, 0)) : (wave.iconbox.hide(),
          "styles" == e || "contrast" == e ? (t.find(".wave5_hide_off").attr("title", 'This icon or the element it applies to is visually hidden in your page. Select "No Styles" to view it.').addClass("wave5_hide").removeClass("wave5_hide_off"),
              $("table, tbody, td, tfoot, th, thead, tr", t).css({
                display: "",
                "text-align": ""
              }),
              $("style", t).prop("disabled", !1),
              $('link[rel="stylesheet"]', t).each(function () {
                $(this).prop("disabled", !1)
              }),
              $("[wave5style]", t).each(function () {
                $(this).attr({
                  style: $(this).attr("wave5style")
                }),
                  $(this).removeAttr("wave5style")
              })) : "nostyles" == e && ("extension" != config.platform || config.isSidebar || (wave.tabs.iconBoxInitiated = !1),
              t.find(".wave5_hide").attr("title", "").addClass("wave5_hide_off").removeClass("wave5_hide"),
              $("style", t).prop("disabled", !0),
              $('link[rel="stylesheet"]', t).each(function () {
                this.href.indexOf("chrome-extension://") == -1 && this.href.indexOf("moz-extension://") == -1 && $(this).prop("disabled", !0)
              }),
              $("[style]", t).not("#wave_sidebar_container, #wave5bottombar, .wave5icon, .wave5text, .wave5text a").each(function () {
                $(this).attr({
                  wave5style: $(this).attr("style")
                }),
                  $(this).removeAttr("style")
              }),
              $("table, tbody, td, tfoot, th, thead, tr", t).css({
                display: "block",
                "text-align": "left"
              }))),
      "contrast" == e ? ($("#iconlist").hide(),
          $("#filterbox").hide(),
          $("#contrasttools").show(),
          $("#tab-details").trigger("click"),
          wave.manager.ThingManager.prototype.updateTopbar(),
        config.isSidebar || wave.report.things.filterLevel(88),
          $("#filter").val(88)) : ($("#iconlist").show(),
          $("#filterbox").show(),
          $("#contrasttools").hide(),
          wave.manager.ThingManager.prototype.updateTopbar(),
        void 0 == wave.tabs.filter && (wave.tabs.filter = 0),
        "extension" != config.platform && (wave.tabs.filter = $("#filter option:selected").val()),
        config.isSidebar || wave.report.things.filterLevel(wave.tabs.filter))
  }
  ,
  wave.tabs.setContrastDetails = function (e, t) {
    $("#foreground").val("#" + e),
      $("#foreground").change(),
      $("#background").val("#" + t),
      $("#background").change(),
      checkcontrast()
  }
  ,
  wave.tabs.toggleContrast = function () {
    var e = "contrast" == wave.tabs.mode
      , t = wave.report.things.iconsByGroup("contrast");
    if (e && ($("#toggle_group_contrast_errors").prop("checked", !0),
        $("#toggle_group_contrast_errors").prop("disabled", !0),
        $("#toggle_group_contrast_errors").hide()),
        $("#toggle_type_contrast").prop("checked", e).trigger("change"),
        $("#toggle_type_contrast").prop("disabled", !0),
        $("#toggle_type_contrast").hide(),
        !$.isEmptyObject(t))
      for (var n = 0; n < t.length; n++)
        e ? t[n].show() : t[n].hide()
  }
  ,
  wave.tabs.isHeaderTag = function (e, t) {
    return e.indexOf(t) > -1
  }
  ,
  wave.tabs.isSkippedHeadingLevel = function (e) {
  }
  ,
  wave.tabs.handleOutlineData = function (e) {
    void 0 != wave.report.iconlist ? wave.tabs.buildOutline(e) : (console.log("outline data not yet set."),
        setTimeout(function () {
          wave.tabs.handleOutlineData(e)
        }, 100))
  }
  ,
  wave.tabs.buildOutline = function (e) {
    "undefined" == typeof e && (e = wave.tabs.buildOutlineHtml()),
      "extension" != config.platform || config.isSidebar ? "extension" == config.platform && config.isSidebar ? ($("#pageoutline").append(e),
            setTimeout(function () {
              wave.tabs.attachOutlineIcons()
            }, 1)) : $("#pageoutline").append(e) : reportPageMessaging.fn.setupAndDispatchEvent("buildHeadings", e)
  }
  ,
  wave.tabs.attachOutlineIcons = function () {
    var e = {
      alert: ["heading_skipped"],
      structure: ["h1", "h2", "h3", "h4", "h5", "h6"]
    };
    for (var t in e)
      for (var n in e[t])
        if (void 0 !== wave.report.iconlist[t] && void 0 !== wave.report.iconlist[t].items[e[t][n]])
          for (var i = wave.report.iconlist[t].items[e[t][n]].xpaths, a = 0; a < i.length; a++)
            $('[data-reportxpath-heading="' + i[a] + '"]').prepend(iconImage(wave.report.iconlist[t].items[e[t][n]], a, "sidebar").clone(!0).attr("alt", e[t][n]))
  }
  ,
  wave.tabs.buildOutlineHtml = function () {
    var e = ""
      , t = ["H1", "H2", "H3", "H4", "H5", "H6"];
    for (var n in wave.report.things.allTagsCached)
      if (wave.report.things.allTagsCached.hasOwnProperty(n)) {
        var i = wave.report.things.allTagsCached[n]
          , a = i.tagName.toUpperCase();
        if (wave.tabs.isHeaderTag(t, a)) {
          var o = $(i).text().trim();
          e += "<div class='outline_" + a + "' data-reportxpath-heading='" + n + "'> " + o + "</div>"
        }
      }
    return e
  }
  ,
  wave.tabs.moreInfo = function (e) {
    if ("extension" != config.platform || config.isSidebar) {
      $("#tab_docs_index").empty(),
        $("#tab_docs_container").show(),
        $("#tab_docs_placeholder").hide();
      var t = wave.engine.icons.docs[e];
      if ($("#tab_docs_type").html(t.category),
          $("#tab_docs_icon").html('<img src="' + wave.conf.paths.site + "/img/icons/" + e + '.png" />'),
          $("#tab_docs_title").html(t.title),
          $("#tab_docs_summary").html(t.summary),
          $("#tab_docs_purpose").html(t.purpose),
          $("#tab_docs_actions").html(t.actions),
          $("#tab_docs_details").html(t.details),
          $.isEmptyObject(t.guidelines))
        $("#tab_docs_guidelines").html("None");
      else {
        $("#tab_docs_guidelines").html("");
        for (var n in t.guidelines)
          $("#tab_docs_guidelines").append('<li><a href="' + t.guidelines[n].link + '" target="_blank">' + t.guidelines[n].name + "</a></li>")
      }
      $("#documentation").scrollTop(0),
        $("#tab-documentation").trigger("click")
    } else
      reportPageMessaging.fn.setupAndDispatchEvent("moreInfo", e)
  }
  ,
  wave.tabs.showIndex = function () {
    $("#tab_docs_placeholder").hide(),
      $("#tab_docs_container").hide(),
      $("#tab_docs_index").empty();
    var e = wave.engine.icons.docs
      , t = "";
    $.each(e, function (e, n) {
      var i = n.category;
      i != t && $("#tab_docs_index").append("<h3>" + i + "</h3>"),
        t = i;
      var a = $("<a href='#'></a>")
        , o = $("<img>", {
        src: wave.conf.paths.site + "/img/icons/" + e + ".png",
        alt: "",
        title: n.title
      });
      a.click(function (t) {
        t.preventDefault(),
          wave.tabs.moreInfo(e)
      }),
        a.append(o),
        $("#tab_docs_index").append(a)
    })
  }
  ,
  wave.tabs.getIconListTypesForExtension = function (e, t) {
    var n = [];
    for (var i in e[t].items)
      n.push(i);
    return n
  }
  ,
  wave.tabs.showDetails = function () {
    try {
      var e = $("#iconlist");
      e.empty();
      var t = wave.report.iconlist;
      for (var n in t)
        if (0 != t[n].count) {
          var i = [];
          i = "extension" == config.platform ? wave.tabs.getIconListTypesForExtension(t, n) : wave.report.things.typesByGroup(n);
          for (var a = $('<ul id="group_list_' + n + '"></ul>'), o = 0; o < i.length; o++) {
            for (var r = wave.report.iconlist[n].items[i[o]], s = r.count, l = $('<ul id="type_list_' + i[o] + '"></ul>'), c = 0; c < s; c++) {
              var d = $("<li></li>");
              d.append(iconImage(r, c, "sidebar")),
                l.append(d)
            }
            var u = $("<h4></h4>");
            "contrast" != i[5] && u.append(typeCheckbox(i[o]));
            var h = $("<label for='toggle_type_" + i[o] + "'></label>");
            h.append(s).append(" X "),
              h.append(wave.engine.icons.docs[i[o]].title),
              u.append(h);
            var p = $("<a href='#'></a>");
            p.append("<img class='docs' src='/img/icon_documentation.png' alt='More information'></a>"),
              p.click(function (e) {
                return function () {
                  return wave.tabs.moreInfo(e),
                    !1
                }
              }(r.id)),
              u.append(p);
            var g = $("<li class='icon_type'></li>");
            g.append(u),
              g.append(l),
              a.append(g)
          }
          var f = $("<h3 id='group_" + n + "'></h3>");
          f.append(groupCheckbox(n, n));
          var m = $("<label for='toggle_group_" + n + "'></label>")
            , v = t[n].description;
          m.append(v),
            m.append(" (").append(t[n].count).append(")"),
            f.append(m);
          var b = $("<li class='icon_group'></li>");
          b.append(f),
            b.append(a),
            "contrast" == n ? ($("#iconlist_contrast").empty(),
                $("#iconlist_contrast").append(b)) : ($("#iconlist_contrast").html('<p class="contrast_title"> No contrast issues were detected. </p>'),
                e.append(b))
        }
    } catch (_) {
      console.log("showDetails error:"),
        console.log(_)
    }
  }
  ,
  wave.engine = {
    iconList: {},
    ruleTimes: {},
    statistics: {
      allitemcount: 0
    },
    icons: {
      docs: {},
      stats: {},
      groups: {},
      setStats: function (e) {
        this.stats = e
      },
      getStats: function (e) {
        return this.stats[e]
      }
    },
    results: {},
    overrides: {},
    overriddenby: {},
    contrast: [],
    fn: {}
  },
  wave.engine.fn.setupResultStack = function () {
    for (var e in wave.engine.icons.docs) {
      var t = wave.engine.icons.docs[e].cat_code;
      void 0 === wave.engine.results[t] && (wave.engine.results[t] = {
        description: wave.engine.icons.docs[e].category,
        count: 0,
        items: {}
      })
    }
  }
  ,
  wave.engine.fn.resetEngine = function () {
    wave.engine.icons = {
      docs: wave.engine.icons.docs,
      stats: {},
      groups: {},
      setStats: function (e) {
        this.stats = e
      },
      getStats: function (e) {
        return this.stats[e]
      }
    },
      wave.engine.contrast = {},
      wave.engine.results = {},
      wave.engine.iconList = {},
      wave.engine.statistics = {
        allitemcount: 0,
        totalelements: 0
      }
  }
  ,
  wave.engine.run = function (e) {
    var t = new Date
      , n = null
      , i = null
      , a = new Date;
    wave.engine.fn.calculateContrast(this.fn.getBody());
    var o = new Date
      , r = wave.rules
      , s = $(wave.page);
    if (e)
      r[e] && r[e](s);
    else
      for (e in r) {
        n = new Date;
        try {
          r[e](s)
        } catch (l) {
          console.log("RULE FAILURE(" + e + "): " + l.stack)
        }
        i = new Date,
          this.ruleTimes[e] = i - n,
        config.debug && console.log("RULE: " + e + " (" + this.ruleTimes[e] + "ms)")
      }
    return EndTimer = new Date,
    config.debug && console.log("TOTAL RULE TIME: " + (EndTimer - t) + "ms"),
      a = new Date,
      wave.engine.fn.structureOutput(),
      o = new Date,
      wave.engine.results
  }
  ,
  wave.engine.fn.getBody = function () {
    return wave.page.body
  }
  ,
  wave.engine.fn.override = function (e, t) {
    for (wave.engine.overrides[e] || (wave.engine.overrides[e] = {}),
           i = 0; i < t.length; i++)
      wave.engine.overrides[e][t[i]] = !0
  }
  ,
  wave.engine.fn.overrideby = function (e, t) {
    for (wave.engine.overriddenby[e] || (wave.engine.overriddenby[e] = {}),
           i = 0; i < t.length; i++)
      wave.engine.overriddenby[e][t[i]] = !0
  }
  ,
  wave.engine.fn.structureOutput = function () {
    for (var e in wave.engine.iconList) {
      var t = wave.engine.icons.docs[e];
      for (var n in wave.engine.iconList[e].items) {
        var i = t.cat_code;
        wave.engine.statistics.allitemcount || (wave.engine.statistics.allitemcount = 0),
          wave.engine.statistics.allitemcount++,
        wave.engine.results[i].count || (wave.engine.results[i].count = 0),
          wave.engine.results[i].count++,
          wave.engine.results[i].items[e] ? (wave.engine.results[i].items[e].count++,
              wave.engine.results[i].items[e].xpaths.push(n),
              wave.engine.results[i].items[e].text.push(wave.engine.iconList[e].items[n].text)) : wave.engine.results[i].items[e] = {
              id: e,
              description: t.title,
              count: 1,
              xpaths: [n],
              text: [wave.engine.iconList[e].items[n].text]
            }
      }
    }
  }
  ,
  wave.engine.fn.hasTextContent = function (e) {
    var t = !1
      , n = $(e).filter(function () {
      return 8 !== this.nodeType
    }).text();
    return n.length > 0 && n.search(/^\s+$/i) == -1 ? t = !0 : $(e).find("img").each(function (e, n) {
        var i = n.getAttribute("alt");
        i && i.search(/^\s+$/i) == -1 && (t = !0)
      }),
      t
  }
  ,
  wave.engine.fn.isLabeledByTag = function (e, t) {
    e = $(e),
      t = $(t);
    var n = !1
      , i = e.attr("id")
      , a = e.parents("label");
    if (t.find('label[for="' + i + '"]').length > 0)
      n = !0;
    else if (1 == a.length) {
      var o = a.find("input:not(:image,:submit,:reset,:button,[type=hidden]), select, textarea");
      1 == o.length && (a.attr("for") ? a.attr("for") == i && (n = !0) : n = !0)
    }
    return n
  }
  ,
  wave.engine.fn.isLabeled = function (e, t) {
    var n = $(e);
    return n.attr("title") || n.attr("aria-labelledby") || n.attr("aria-label") || wave.engine.fn.isLabeledByTag(n, t)
  }
  ,
  wave.engine.fn.addThing = function (e, t, n, i, a, o, r) {
    var s = "#" == e ? 0 : e.getAttribute("data-waveid")
      , l = wave.engine.icons.docs[t]
      , c = 0 === s ? "#" : wave.xpath.XPath[s];
    if (l) {
      if (wave.engine.overrides[t]) {
        for (var d in wave.engine.overrides[t])
          if ("undefined" != typeof wave.engine.iconList[d] && "undefined" != typeof wave.engine.iconList[d].items[c]) {
            delete wave.engine.iconList[d].items[c];
            break
          }
      } else if (wave.engine.overriddenby[t])
        for (var d in wave.engine.overriddenby[t])
          if ("undefined" != typeof wave.engine.iconList[d] && "undefined" != typeof wave.engine.iconList[d].items[c])
            return;
      wave.engine.iconList[t] || (wave.engine.iconList[t] = {
        items: {}
      }),
        void 0 == wave.engine.iconList[t].items[c] ? wave.engine.iconList[t].items[c] = {
            id: t,
            description: l.title,
            text: [o]
          } : wave.engine.iconList[t].items[c].text.push(o)
    }
  }
  ,
  wave.engine.fn.addProperty = function (e, t, n) {
    this.addThing(e, t, "property", null, n, null)
  }
  ,
  wave.engine.fn.addIcon = function (e, t, n, i) {
    this.addThing(e, t, "icon", null, null, n, i)
  }
  ,
  wave.engine.fn.addPagewideIcon = function (e) {
    this.addThing("#", e)
  }
  ,
  wave.engine.fn.elementHasText = function (e) {
    var t = !1;
    if (!e)
      return !1;
    for (var n = e.childNodes, i = 0; i < n.length; i++)
      if (3 == n[i].nodeType && n[i].nodeValue.length > 0 && n[i].nodeValue.search(/^\s+$/i) == -1) {
        t = !0;
        break
      }
    return t
  }
  ,
  wave.engine.fn.addText = function (e, t, n, i, a) {
    this.addThing(e, t, "text", n, i, null, a)
  }
  ,
  wave.engine.fn.trim = function (e) {
    return e = e.replace(/(^\s*)|(\s*$)/gi, ""),
      e = e.replace(/[ ]{2,}/gi, " "),
      e = e.replace(/\n /, "\n")
  }
  ,
  wave.engine.fn.getContrast = function (e) {
    return wave.engine.contrast[e.getAttribute("data-waveid")]
  }
  ,
  wave.engine.fn.calculateContrast = function (e) {
    wave.engine.contrast[e.getAttribute("data-waveid")] = this.checkContrast(this.getForegroundColor(e), this.getBgColor(e)),
      wave.engine.fn.calculateContrastPrivate(e, this.getBgColor(e))
  }
  ,
  wave.engine.fn.calculateContrastPrivate = function (e, t) {
    if (null != e)
      for (var n = 0; e.children && n < e.children.length; n++) {
        var i = this.getForegroundColor(e.children[n])
          , a = this.getBgColor(e.children[n]);
        !a && t ? (wave.engine.contrast[e.children[n].getAttribute("data-waveid")] = this.checkContrast(i, t),
            wave.engine.fn.calculateContrastPrivate(e.children[n], t)) : (wave.engine.contrast[e.children[n].getAttribute("data-waveid")] = this.checkContrast(i, a),
            wave.engine.fn.calculateContrastPrivate(e.children[n], a)),
          wave.engine.contrast[e.children[n].getAttribute("data-waveid")].tag = e.children[n]
      }
  }
  ,
  wave.engine.fn.getForegroundColor = function (e) {
    return this.getColor(e, "color")
  }
  ,
  wave.engine.fn.getBgColor = function (e) {
    return this.getColor(e, "background-color")
  }
  ,
  wave.engine.fn.getColor = function (e, t) {
    var n = $(e)
      , i = n.css(t);
    return "rgba(0, 0, 0, 0)" !== i && "transparent" !== i ? i : n.is("body") || n.is("html") ? "rgba(255, 255, 255, 1)" : this.getColor(n.parent().get(0), t)
  }
  ,
  wave.engine.fn.checkContrast = function (e, t) {
    var n = {
      contrastratio: "N/A"
    }
      , i = "";
    e || (e = "rgb(0, 0, 0, 1)"),
    t || (t = "rgb(255, 255, 255, 1)");
    var a = new ColorManager(e)
      , o = new ColorManager(t);
    ratioobject = a.contrast(o);
    var r = ratioobject.ratio;
    return i = r ? r + ":1" : "N/A",
      n.ratio = Number(r),
      n.contrastratio = i,
      n
  }
;
var ColorManager = function (e) {
  if ("transparent" === e)
    e = [0, 0, 0, 0];
  else if ("string" == typeof e) {
    var t = e;
    if (e = t.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)/),
        !e)
      throw new Error("Invalid string: " + t);
    e.shift()
  }
  void 0 === e[3] && (e[3] = 1),
    e = e.map(function (e) {
      return Math.round(e, 3)
    }),
    this.rgba = e
};
ColorManager.BLACK = new ColorManager([0, 0, 0]),
  ColorManager.GRAY = new ColorManager([127.5, 127.5, 127.5]),
  ColorManager.WHITE = new ColorManager([255, 255, 255]),
  ColorManager.prototype = {
    get rgb() {
      return this.rgba.slice(0, 3)
    },
    get alpha() {
      return this.rgba[3]
    },
    set alpha(e) {
      this.rgba[3] = e
    },
    get luminance() {
      for (var e = this.rgba.slice(), t = 0; t < 3; t++) {
        var n = e[t];
        n /= 255,
          n = n < .03928 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4),
          e[t] = n
      }
      return .2126 * e[0] + .7152 * e[1] + .0722 * e[2]
    },
    get inverse() {
      return new ColorManager([255 - this.rgba[0], 255 - this.rgba[1], 255 - this.rgba[2], this.alpha])
    },
    toString: function () {
      return "rgb" + (this.alpha < 1 ? "a" : "") + "(" + this.rgba.slice(0, this.alpha >= 1 ? 3 : 4).join(", ") + ")"
    },
    clone: function () {
      return new ColorManager(this.rgba)
    },
    overlayOn: function (e) {
      var t = this.clone()
        , n = this.alpha;
      if (n >= 1)
        return t;
      for (var i = 0; i < 3; i++)
        t.rgba[i] = t.rgba[i] * n + e.rgba[i] * e.rgba[3] * (1 - n);
      return t.rgba[3] = n + e.rgba[3] * (1 - n),
        t
    },
    contrast: function (e) {
      var t = this.alpha;
      if (t >= 1) {
        e.alpha < 1 && (e = e.overlayOn(this));
        var n = this.luminance + .05
          , i = e.luminance + .05
          , a = n / i;
        return i > n && (a = 1 / a),
          {
            ratio: a,
            error: 0,
            min: a,
            max: a
          }
      }
      var o = this.overlayOn(ColorManager.BLACK).contrast(e).ratio
        , r = this.overlayOn(ColorManager.WHITE).contrast(e).ratio
        , s = Math.max(o, r)
        , l = this.rgb.map(function (n, i) {
        return Math.min(Math.max(0, (e.rgb[i] - n * t) / (1 - t)), 255)
      });
      l = new ColorManager(l);
      var c = this.overlayOn(l).contrast(e).ratio;
      return {
        ratio: Math.round((c + s) / 2, 2),
        error: Math.round((s - c) / 2, 2),
        min: c,
        max: s,
        closest: l,
        farthest: r == s ? ColorManager.WHITE : ColorManager.BLACK
      }
    }
  },
  Math.round = function () {
    var e = Math.round;
    return function (t, n) {
      n = +n || 0;
      var i = Math.pow(10, n);
      return e(t * i) / i
    }
  }(),
  function () {
    var e = self.Color = function (e) {
        if ("transparent" === e)
          e = [0, 0, 0, 0];
        else if ("string" == typeof e) {
          var t = e;
          if (e = t.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)/),
              !e)
            throw new Error("Invalid string: " + t);
          e.shift()
        }
        void 0 === e[3] && (e[3] = 1),
          e = e.map(function (e) {
            return Math.round(e, 3)
          }),
          this.rgba = e
      }
      ;
    e.prototype = {
      get rgb() {
        return this.rgba.slice(0, 3)
      },
      get alpha() {
        return this.rgba[3]
      },
      set alpha(e) {
        this.rgba[3] = e
      },
      get luminance() {
        for (var e = this.rgba.slice(), t = 0; t < 3; t++) {
          var n = e[t];
          n /= 255,
            n = n < .03928 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4),
            e[t] = n
        }
        return .2126 * e[0] + .7152 * e[1] + .0722 * e[2]
      },
      get inverse() {
        return new e([255 - this.rgba[0], 255 - this.rgba[1], 255 - this.rgba[2], this.alpha])
      },
      toString: function () {
        return "rgb" + (this.alpha < 1 ? "a" : "") + "(" + this.rgba.slice(0, this.alpha >= 1 ? 3 : 4).join(", ") + ")"
      },
      clone: function () {
        return new e(this.rgba)
      },
      overlayOn: function (e) {
        var t = this.clone()
          , n = this.alpha;
        if (n >= 1)
          return t;
        for (var i = 0; i < 3; i++)
          t.rgba[i] = t.rgba[i] * n + e.rgba[i] * e.rgba[3] * (1 - n);
        return t.rgba[3] = n + e.rgba[3] * (1 - n),
          t
      },
      contrast: function (t) {
        var n = this.alpha;
        if (n >= 1) {
          t.alpha < 1 && (t = t.overlayOn(this));
          var i = this.luminance + .05
            , a = t.luminance + .05
            , o = i / a;
          return a > i && (o = 1 / o),
            {
              ratio: o,
              error: 0,
              min: o,
              max: o
            }
        }
        var r = this.overlayOn(e.BLACK).contrast(t).ratio
          , s = this.overlayOn(e.WHITE).contrast(t).ratio
          , l = Math.max(r, s)
          , c = this.rgb.map(function (e, i) {
          return Math.min(Math.max(0, (t.rgb[i] - e * n) / (1 - n)), 255)
        });
        c = new e(c);
        var d = this.overlayOn(c).contrast(t).ratio;
        return {
          ratio: (d + l) / 2,
          error: (l - d) / 2,
          min: d,
          max: l,
          closest: c,
          farthest: s == l ? e.WHITE : e.BLACK
        }
      }
    },
      e.BLACK = new e([0, 0, 0]),
      e.GRAY = new e([127.5, 127.5, 127.5]),
      e.WHITE = new e([255, 255, 255])
  }(),
  wave.engine.icons.docs = {
    alt_missing: {
      id: "1",
      name: "alt_missing",
      title: "Missing alternative text",
      category: "Errors",
      cat_code: "error",
      summary: "Image alternative text is not present.",
      purpose: "Each image must have an alt attribute. Without alternative text, the content of an image will not be available to screen reader users or when the image is unavailable.",
      actions: 'Add an alt attribute to the image. The attribute value should accurately and succinctly present the content and function of the image. If the content of the image is conveyed in the context or surroundings of the image, or if the image does not convey content or have a function, it should be given empty/null alternative text (alt="").',
      details: "An image does not have an alt attribute.",
      resources: "http://webaim.org/techniques/alttext/ Appropriate Use of Alternative Text [WebAIM]",
      icon_order: "1",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_missing",
          icon_id: "1",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "alt_missing",
          icon_id: "1",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    alt_link_missing: {
      id: "21",
      name: "alt_link_missing",
      title: "Linked image missing alternative text",
      category: "Errors",
      cat_code: "error",
      summary: "An image without alternative text results in an empty link.",
      purpose: "Images that are the only thing within a link must have descriptive alternative text. If an image is within a link that contains no text and that image does not provide alternative text, a screen reader has no content to present to the user regarding the function of the link.",
      actions: "Add appropriate alternative text that presents the content of the image and/or the function of the link.",
      details: "An image without alternative text (missing alt attribute or an alt value that is null/empty or only space characters) is within a link that contains no text and no images with alternative text.",
      resources: "",
      icon_order: "2",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_link_missing",
          icon_id: "21",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "alt_link_missing",
          icon_id: "21",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        52: {
          icon_name: "alt_link_missing",
          icon_id: "21",
          guideline_id: "52",
          code: "2.4.4",
          name: "2.4.4 Link Purpose (In Context) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.4"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    alt_spacer_missing: {
      id: "8",
      name: "alt_spacer_missing",
      title: "Spacer image missing alternative text",
      category: "Errors",
      cat_code: "error",
      summary: "A layout spacer image (which should have null/empty alternative text) does not have an alt attribute.",
      purpose: 'Spacer images are used to maintain layout. They do not convey content and should be given null/empty alternative text (alt="") so they are not presented to users and are ignored by screen readers.',
      actions: 'If the image is a spacer image, give the image null/empty alternative text (alt=""). Alternatively, consider using CSS instead of spacer images to control positioning and layout.',
      details: 'An image is missing an alt attribute and has a width or height of 3 pixels or less or has a file name starting with "spacer.*", "space.*", or "blank.*". ',
      resources: "",
      icon_order: "3",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_spacer_missing",
          icon_id: "8",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "alt_spacer_missing",
          icon_id: "8",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    alt_input_missing: {
      id: "22",
      name: "alt_input_missing",
      title: "Image button missing alternative text",
      category: "Errors",
      cat_code: "error",
      summary: "Alternative text is not present for a form image button.",
      purpose: "Image buttons provide important functionality that must be presented in alternative text. Without alternative text, the function of an image button is not made available to screen reader users or when images are disabled or unavailable.",
      actions: 'Add appropriate alternative text that presents the function of the image button (e.g., &lt;input src="button.gif" type="image" alt="Submit search"&gt;).',
      details: 'An image button (&lt;input type="image"&gt;) does not have an alt attribute or has an alt value that is null/empty (alt="") or only space characters.',
      resources: "",
      icon_order: "4",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_input_missing",
          icon_id: "22",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "alt_input_missing",
          icon_id: "22",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        52: {
          icon_name: "alt_input_missing",
          icon_id: "22",
          guideline_id: "52",
          code: "2.4.4",
          name: "2.4.4 Link Purpose (In Context) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.4"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    alt_area_missing: {
      id: "2",
      name: "alt_area_missing",
      title: "Image map area missing alternative text",
      category: "Errors",
      cat_code: "error",
      summary: "Alternative text is not present for an image map area (hot spot).",
      purpose: "Image map areas or clickable hot spots provide important functionality that must be provided in alternative text. Without alternative text, the function of the area is not made available to screen reader users or when images are unavailable.",
      actions: "Add a descriptive alt attribute value to each area element. Additionally, ensure that the area elements are listed in the code in a logical, intuitive order (e.g., matching the visual order, alphabetically, etc.).",
      details: 'An area element does not have the alt attribute or has an alt value that is null/empty (alt="") or only space characters.',
      resources: "",
      icon_order: "5",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_area_missing",
          icon_id: "2",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        6: {
          icon_name: "alt_area_missing",
          icon_id: "2",
          guideline_id: "6",
          code: "f",
          name: "Section 508 (f)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardf"
        },
        17: {
          icon_name: "alt_area_missing",
          icon_id: "2",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        52: {
          icon_name: "alt_area_missing",
          icon_id: "2",
          guideline_id: "52",
          code: "2.4.4",
          name: "2.4.4 Link Purpose (In Context) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.4"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    alt_map_missing: {
      id: "23",
      name: "alt_map_missing",
      title: "Image map missing alt attribute",
      category: "Errors",
      cat_code: "error",
      summary: "An image that has hot spots does not have an alt attribute.",
      purpose: "Any content or function of an image that uses an image map (hot spots) and does not have an alt attribute will not be available to screen reader users or if the image is unavailable.",
      actions: 'Add an alt attribute to the image. Ensure the alt attribute value for the image map image is appropriate. The alternative text is typically null/empty (alt=""), unless the image conveys content not conveyed in the hot spot areas (e.g., "Map of the United States").',
      details: "An image element has the usemap attribute and no alt attribute.",
      resources: "",
      icon_order: "6",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_map_missing",
          icon_id: "23",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        6: {
          icon_name: "alt_map_missing",
          icon_id: "23",
          guideline_id: "6",
          code: "f",
          name: "Section 508 (f)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardf"
        },
        17: {
          icon_name: "alt_map_missing",
          icon_id: "23",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    server_image_map: {
      id: "25",
      name: "server_image_map",
      title: "Server-side image map",
      category: "Errors",
      cat_code: "error",
      summary: "A server-side image map is present.",
      purpose: "Server-side images maps cannot be made accessible to keyboard-only users.",
      actions: "Replace the server-side image map (an image that, when clicked with the mouse, sends the X and Y coordinates of the click position to a server for analysis) with a client-side map.",
      details: "An image has the ismap attribute.",
      resources: "",
      icon_order: "7",
      position: "after",
      page_rule: "0",
      guidelines: {
        5: {
          icon_name: "server_image_map",
          icon_id: "25",
          guideline_id: "5",
          code: "e",
          name: "Section 508 (e)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarde"
        },
        6: {
          icon_name: "server_image_map",
          icon_id: "25",
          guideline_id: "6",
          code: "f",
          name: "Section 508 (f)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardf"
        },
        39: {
          icon_name: "server_image_map",
          icon_id: "25",
          guideline_id: "39",
          code: "2.1.1",
          name: "2.1.1 Keyboard (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.1.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    longdesc_invalid: {
      id: "34",
      name: "longdesc_invalid",
      title: "Invalid longdesc",
      category: "Errors",
      cat_code: "error",
      summary: "The longdesc attribute is not a URL.",
      purpose: "The longdesc attribute of an image must be a valid URL of a page that contains a description of the image content. A longdesc value that contains image description text will not provide any accessibility information.",
      actions: "Make the longdesc attribute value a valid URL/filename or remove the longdesc attribute. Because of poor browser support for longdesc, it is recommended that it always be used in conjunction with a standard link to the long description page. Because of poor browser support for longdesc, it is recommended that longdesc always be used in conjunction with a standard link to the long description page.",
      details: "The longdesc attribute value:\r\n<ul>\r\n<li>is empty</li>\r\n<li>is not a URL or filename</li>\r\n<li>is a URL or filename with an extension of .jpg, .gif, or .png</li>\r\n</ul>",
      resources: "",
      icon_order: "8",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "longdesc_invalid",
          icon_id: "34",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "longdesc_invalid",
          icon_id: "34",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    label_missing: {
      id: "29",
      name: "label_missing",
      title: "Missing form label",
      category: "Errors",
      cat_code: "error",
      summary: "A form control does not have a corresponding label.",
      purpose: "If a form control does not have a properly associated text label, the function or purpose of that form control may not be presented to screen reader users. Form labels also provide visible descriptions and larger clickable targets for form controls.",
      actions: "If a text label for a form control is visible, use the &lt;label&gt; element to associate it with its respective form control. If there is no visible label, either provide an associated label, add a descriptive title attribute to the form control, or reference the label(s) using aria-labelledby. Labels are not required for image, submit, reset, button, or hidden form controls.",
      details: "An &lt;input&gt; (except types of image, submit, reset, button, or hidden), &lt;select&gt;, or &lt;textarea&gt; does not have a properly associated label text. A properly associated label is:\r\n<ul>\r\n<li>a &lt;label&gt; element with a for attribute value that is equal to the id of a unique form control\r\n<li>a &lt;label&gt; element that surrounds the form control, does not surround any other form controls, and does not reference another element with its for attribute\r\n<li>a non-empty title attribute, or\r\n<li>a non-empty aria-labelledby attribute.\r\n</ul>",
      resources: "",
      icon_order: "9",
      position: "after",
      page_rule: "0",
      guidelines: {
        14: {
          icon_name: "label_missing",
          icon_id: "29",
          guideline_id: "14",
          code: "n",
          name: "Section 508 (n)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardn"
        },
        17: {
          icon_name: "label_missing",
          icon_id: "29",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        27: {
          icon_name: "label_missing",
          icon_id: "29",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        54: {
          icon_name: "label_missing",
          icon_id: "29",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        },
        71: {
          icon_name: "label_missing",
          icon_id: "29",
          guideline_id: "71",
          code: "3.3.2",
          name: "3.3.2 Labels or Instructions (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc3.3.2"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    label_empty: {
      id: "28",
      name: "label_empty",
      title: "Empty form label",
      category: "Errors",
      cat_code: "error",
      summary: "A form label is present, but does not contain any content.",
      purpose: "A &lt;label&gt; element that is associated to a form control but does not contain text will not present any information about the form control to the user.",
      actions: "Ensure that the form label contains text that describes the function of the associated form control. Labels are not required for image, submit, reset, button, or hidden form controls. If a label is not necessary visually, a descriptive title attribute may be added to the form control.",
      details: "A form label is present and associated with an existing form control (using for/id or surrounds the form control), but does not contain any text or images with alternative text.",
      resources: "",
      icon_order: "10",
      position: "after",
      page_rule: "0",
      guidelines: {
        14: {
          icon_name: "label_empty",
          icon_id: "28",
          guideline_id: "14",
          code: "n",
          name: "Section 508 (n)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardn"
        },
        17: {
          icon_name: "label_empty",
          icon_id: "28",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        27: {
          icon_name: "label_empty",
          icon_id: "28",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        54: {
          icon_name: "label_empty",
          icon_id: "28",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        },
        71: {
          icon_name: "label_empty",
          icon_id: "28",
          guideline_id: "71",
          code: "3.3.2",
          name: "3.3.2 Labels or Instructions (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc3.3.2"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    label_multiple: {
      id: "30",
      name: "label_multiple",
      title: "Multiple form labels",
      category: "Errors",
      cat_code: "error",
      summary: "A form control has more than one label associated with it.",
      purpose: "A form control should have at most one associated label element. If more than one label element is associated to the control, assistive technology may not read the appropriate label.",
      actions: "Ensure that at most one label element is associated to the form control. If multiple form labels are necessary, use aria-labelledby.",
      details: "Two or more &lt;label&gt;s are associated to a single &lt;input&gt; (except types of image, submit, reset, button, or hidden), &lt;select&gt;, or &lt;textarea&gt;.",
      resources: "",
      icon_order: "11",
      position: "after",
      page_rule: "0",
      guidelines: {
        14: {
          icon_name: "label_multiple",
          icon_id: "30",
          guideline_id: "14",
          code: "n",
          name: "Section 508 (n)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardn"
        },
        17: {
          icon_name: "label_multiple",
          icon_id: "30",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        27: {
          icon_name: "label_multiple",
          icon_id: "30",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        54: {
          icon_name: "label_multiple",
          icon_id: "30",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        },
        71: {
          icon_name: "label_multiple",
          icon_id: "30",
          guideline_id: "71",
          code: "3.3.2",
          name: "3.3.2 Labels or Instructions (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc3.3.2"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    title_invalid: {
      id: "58",
      name: "title_invalid",
      title: "Missing or uninformative page title",
      category: "Errors",
      cat_code: "error",
      summary: "The page title is missing or not descriptive.",
      purpose: "A descriptive title helps users understand a page's purpose or content. Without a proper title, many users (especially those using screen readers or other assistive technology) may have difficulty orienting themselves to the page.",
      actions: "Add a brief, descriptive page title.",
      details: 'The page title is missing, empty, contains only whitespace characters, or begins with "untitled".',
      resources: "",
      icon_order: "12",
      position: "last",
      page_rule: "1",
      guidelines: {
        50: {
          icon_name: "title_invalid",
          icon_id: "58",
          guideline_id: "50",
          code: "2.4.2",
          name: "2.4.2 Page Titled (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.2"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    language_missing: {
      id: "116",
      name: "language_missing",
      title: "Document language missing",
      category: "Errors",
      cat_code: "error",
      summary: "The language of the document is not identified.",
      purpose: "Identifying the language of the page allows screen readers to read the content in the appropriate language. It also facilitates automatic translation of content.",
      actions: 'Identify the document language using the &lt;html lang&gt; attribute (e.g., &lt;html lang="en"&gt;).',
      details: "The &lt;html lang&gt; attribute is missing or is empty.",
      resources: "",
      icon_order: "13",
      position: "last",
      page_rule: "1",
      guidelines: {
        59: {
          icon_name: "language_missing",
          icon_id: "116",
          guideline_id: "59",
          code: "3.1.1",
          name: "3.1.1 Language of Page (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc3.1.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    meta_refresh: {
      id: "69",
      name: "meta_refresh",
      title: "Page refreshes or redirects",
      category: "Errors",
      cat_code: "error",
      summary: "The page is set to automatically change location or refresh using a &lt;meta&gt; tag.",
      purpose: "Pages that automatically change location or refresh pose significant usability issues, particularly for screen reader and keyboard users.",
      actions: "Remove the &lt;meta&gt; refresh and give the user control over time-sensitive content changes.",
      details: 'A &lt;meta http-equiv="refresh"&gt; tag is present.',
      resources: "",
      icon_order: "15",
      position: "last",
      page_rule: "1",
      guidelines: {
        16: {
          icon_name: "meta_refresh",
          icon_id: "69",
          guideline_id: "16",
          code: "p",
          name: "Section 508 (p)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardp"
        },
        42: {
          icon_name: "meta_refresh",
          icon_id: "69",
          guideline_id: "42",
          code: "2.2.1",
          name: "2.2.1 Timing Adjustable (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.2.1"
        },
        43: {
          icon_name: "meta_refresh",
          icon_id: "69",
          guideline_id: "43",
          code: "2.2.2",
          name: "2.2.2 Pause, Stop, Hide (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.2.2"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    heading_empty: {
      id: "49",
      name: "heading_empty",
      title: "Empty heading",
      category: "Errors",
      cat_code: "error",
      summary: "A heading contains no content.",
      purpose: "Some users, especially keyboard and screen reader users, often navigate by heading elements. An empty heading will present no information and may introduce confusion.",
      actions: "Ensure that all headings contain informative content.",
      details: "A heading element is present that contains no text (or only spaces) and no images with alternative text.",
      resources: "",
      icon_order: "16",
      position: "first",
      page_rule: "0",
      guidelines: {
        15: {
          icon_name: "heading_empty",
          icon_id: "49",
          guideline_id: "15",
          code: "o",
          name: "Section 508 (o)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardo"
        },
        27: {
          icon_name: "heading_empty",
          icon_id: "49",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "heading_empty",
          icon_id: "49",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        },
        54: {
          icon_name: "heading_empty",
          icon_id: "49",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    button_empty: {
      id: "121",
      name: "button_empty",
      title: "Empty button",
      category: "Errors",
      cat_code: "error",
      summary: "A button is empty or has no value text.",
      purpose: "When navigating to a button, descriptive text must be presented to screen reader users to indicate the function of the button.",
      actions: "Place text content within the &lt;button&gt; element or give the &lt;input&gt; element a value attribute.",
      details: 'A &lt;button&gt; element is present that contains no text content (or alternative text), or an &lt;input type="submit"&gt;, &lt;input type="button"&gt;, or &lt;input type="reset"&gt; has an empty or missing value attribute.',
      resources: "",
      icon_order: "17",
      position: "after",
      page_rule: "0",
      guidelines: {
        17: {
          icon_name: "button_empty",
          icon_id: "121",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        52: {
          icon_name: "button_empty",
          icon_id: "121",
          guideline_id: "52",
          code: "2.4.4",
          name: "2.4.4 Link Purpose (In Context) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.4"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    link_empty: {
      id: "50",
      name: "link_empty",
      title: "Empty link",
      category: "Errors",
      cat_code: "error",
      summary: "A link contains no text.",
      purpose: "If a link contains no text, the function or purpose of the link will not be presented to the user. This can introduce confusion for keyboard and screen reader users.",
      actions: "Remove the empty link or provide text within the link that describes the functionality and/or target of that link.",
      details: "An anchor element has an href attribute, but contains no text (or only spaces) and no images with alternative text.",
      resources: "",
      icon_order: "18",
      position: "last",
      page_rule: "0",
      guidelines: {
        52: {
          icon_name: "link_empty",
          icon_id: "50",
          guideline_id: "52",
          code: "2.4.4",
          name: "2.4.4 Link Purpose (In Context) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.4"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    link_skip_broken: {
      id: "47",
      name: "link_skip_broken",
      title: "Broken skip link",
      category: "Errors",
      cat_code: "error",
      summary: "A skip navigation link exists, but the target for the link does not exist or the link is not keyboard accessible.",
      purpose: "A link to jump over navigation or jump to the main content of the page assists keyboard users only if the link is properly functioning and is keyboard accessible.",
      actions: "Ensure that the target for the link exists and that the link is not hidden with CSS display:none or visibility:hidden.",
      details: 'An in-page link contains the words "skip" or "jump" and is hidden with CSS display:none or visibility:hidden, or the link has an href attribute that does not match the id value of another element within the page or the name attribute value of an anchor element within the page.',
      resources: "",
      icon_order: "19",
      position: "last",
      page_rule: "0",
      guidelines: {
        15: {
          icon_name: "link_skip_broken",
          icon_id: "47",
          guideline_id: "15",
          code: "o",
          name: "Section 508 (o)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardo"
        },
        49: {
          icon_name: "link_skip_broken",
          icon_id: "47",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    th_empty: {
      id: "32",
      name: "th_empty",
      title: "Empty table header",
      category: "Errors",
      cat_code: "error",
      summary: "A &lt;th&gt; (table header) contains no text.",
      purpose: "The &lt;th&gt; element helps associate table cells with the correct row/column headers. A &lt;th&gt; that contains no text may result in cells with missing or incorrect header information.",
      actions: "If the table cell is a header, provide text within the cell that describes the column or row. If the cell is not a header or must remain empty (such as the top-left cell in a data table), make the cell a &lt;td&gt; rather than a &lt;th&gt;.",
      details: "A &lt;th&gt; element does not contain any text (or contains only spaces) and no images with alternative text.",
      resources: "",
      icon_order: "20",
      position: "first",
      page_rule: "0",
      guidelines: {
        7: {
          icon_name: "th_empty",
          icon_id: "32",
          guideline_id: "7",
          code: "g",
          name: "Section 508 (g)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardg"
        },
        8: {
          icon_name: "th_empty",
          icon_id: "32",
          guideline_id: "8",
          code: "h",
          name: "Section 508 (h)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardh"
        },
        27: {
          icon_name: "th_empty",
          icon_id: "32",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    blink: {
      id: "57",
      name: "blink",
      title: "Blinking content",
      category: "Errors",
      cat_code: "error",
      summary: "Blinking content is present.",
      purpose: "Blinking content can be distracting and confusing to users, particularly those with certain cognitive disabilities.",
      actions: "Remove the blinking effect (&lt;blink&gt; element or text-decoration:blink style). Important text can be styled in other ways.",
      details: "A non-empty &lt;blink&gt; element or other text has CSS text-decoration:blink styling.",
      resources: "",
      icon_order: "21",
      position: "after",
      page_rule: "0",
      guidelines: {
        43: {
          icon_name: "blink",
          icon_id: "57",
          guideline_id: "43",
          code: "2.2.2",
          name: "2.2.2 Pause, Stop, Hide (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.2.2"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    marquee: {
      id: "56",
      name: "marquee",
      title: "Marquee",
      category: "Errors",
      cat_code: "error",
      summary: "A &lt;marquee&gt; element is present.",
      purpose: "A marquee element presents scrolling text that the user cannot stop. Scrolling animated content can be distracting and confusing to users, particularly for those with certain cognitive disabilities.",
      actions: "Remove the marquee element. If content must scroll, use an alternative scrolling mechanism that allows the user to pause or stop the animation.",
      details: "A &lt;marquee&gt; element is present.",
      resources: "",
      icon_order: "22",
      position: "after",
      page_rule: "0",
      guidelines: {
        43: {
          icon_name: "marquee",
          icon_id: "56",
          guideline_id: "43",
          code: "2.2.2",
          name: "2.2.2 Pause, Stop, Hide (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.2.2"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    aria_reference_broken: {
      id: "131",
      name: "aria_reference_broken",
      title: "Broken ARIA reference",
      category: "Errors",
      cat_code: "error",
      summary: "An aria-labelledby or aria-describedby reference exists, but the target for the reference does not exist.",
      purpose: "ARIA labels and descriptions will not be presented if the element referenced does not exist in the page.",
      actions: "Ensure the element referenced in the aria-labelledby or aria-describedby attribute value is present within the page and presents a proper label or description.",
      details: "An element has an aria-labelledby or aria-describedby value that does not match the id attribute value of another element in the page.",
      resources: "",
      icon_order: "12",
      position: "last",
      page_rule: "0",
      guidelines: {
        27: {
          icon_name: "aria_reference_broken",
          icon_id: "132",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    alt_suspicious: {
      id: "27",
      name: "alt_suspicious",
      title: "Suspicious alternative text",
      category: "Alerts",
      cat_code: "alert",
      summary: "Alternative text is likely insufficient or contains extraneous information.",
      purpose: "If the alternative text for an image does not provide the same content or information conveyed by the image, that content will not be available to screen reader users and when images are unavailable.",
      actions: 'Ensure that the alternative text for the image or image input provides a succinct, yet equivalent alternative to the content and function of the image. Screen readers and browser presentation inform the user that the object is an image, so alternative text of "image of..." (and similar) should be avoided. If the image does not convey content or if the content is presented in nearby text (e.g., a caption), null/empty alternative text (alt="") is appropriate.',
      details: 'The alt text value of an image or image button:\r\n<ul>\r\n<li>begins with "graphic of", "bullet", or "image of",\r\n<li>ends with "image" or "graphic",\r\n<li>contains only space characters (alt=" "),\r\n<li>is an image file name (e.g. alt="photo.gif"), or\r\n<li>is one of the following: "image", "graphic", "photo", "photograph", "drawing", "painting", "artwork", "logo", "bullet", "button", "arrow", "more", "spacer", "blank", "chart", "table", "diagram", "graph", or "*".\r\n</ul>',
      resources: "",
      icon_order: "1",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_suspicious",
          icon_id: "27",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "alt_suspicious",
          icon_id: "27",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    alt_redundant: {
      id: "31",
      name: "alt_redundant",
      title: "Redundant alternative text",
      category: "Alerts",
      cat_code: "alert",
      summary: "The alternative text for an image is the same as nearby or adjacent text.",
      purpose: "Alternative text that is the same as nearby or adjacent text will be presented multiple times to screen readers or when images are unavailable.",
      actions: 'Change either the alternative text or the adjacent text to eliminate the redundancy. In most cases, you can give the image empty/null alternative text (alt="") because the content of the image is already provided in context through text. Linked images may often be combined with the adjacent text into one link, in which case the image may be given null/empty alternative text (alt="").',
      details: "The alternative text is the same as text that is within 15 characters of the image.",
      resources: "",
      icon_order: "2",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_redundant",
          icon_id: "31",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "alt_redundant",
          icon_id: "31",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    alt_duplicate: {
      id: "36",
      name: "alt_duplicate",
      title: "A nearby image has the same alternative text",
      category: "Alerts",
      cat_code: "alert",
      summary: "Two images near each other have the same alternative text.",
      purpose: "When two images have the same alternative text, this often causes redundancy or indicates incorrect alternative text.",
      actions: 'Ensure that the alternative text for each image or image button is appropriate while removing unnecessary redundancy. If the content of the image is already conveyed elsewhere (through text or the alternative text of a nearby image) or if the image does not convey content, the image may generally be given empty/null alternative text (alt=""). Image buttons always convey a specific function, and thus cannot be given null alternative text.',
      details: "The same alternative text (case insensitive, but not null/empty) is present for two images or image buttons (&lt;input type='image'&gt;) near each other (no more than 2 other images separate them).",
      resources: "",
      icon_order: "3",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_duplicate",
          icon_id: "36",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "alt_duplicate",
          icon_id: "36",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    alt_long: {
      id: "41",
      name: "alt_long",
      title: "Long alternative text",
      category: "Alerts",
      cat_code: "alert",
      summary: "An image has very long alternative text.",
      purpose: "Alternative text should be succinct, yet descriptive of the content and function of an image. Lengthy alternative text (more than around 100 characters) often indicates that extraneous content or content that is not available to sighted users is being presented.",
      actions: "Ensure the alternative text is succinct, yet descriptive. Ensure that no content is being presented in alternative text that is not available to sighted users viewing the image. When possible, either shorten the alternative text or provide the text alternative via another method (e.g., in text near the image, through a separate description page, etc.).",
      details: "The image's alt attribute value is more than 100 characters. Note that the 100 character limit is a rough and somewhat arbitrary length. For images that present complex content or lengthy text, alternative text longer than 100 characters may be appropriate.",
      resources: "",
      icon_order: "4",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_long",
          icon_id: "41",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "alt_long",
          icon_id: "41",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    label_orphaned: {
      id: "35",
      name: "label_orphaned",
      title: "Orphaned form label",
      category: "Alerts",
      cat_code: "alert",
      summary: "A form label is present, but it is not correctly associated with a form control.",
      purpose: "An incorrectly associated label does not provide functionality or information about the form control to the user. It usually indicates a coding or other form labeling issues.",
      actions: "Properly associate the label with its corresponding form control. If there is no corresponding form control, remove the label. Labels are not appropriate for image, submit, reset, button, or hidden form controls.",
      details: "A &lt;label&gt; element:\r\n<ul>\r\n<li>does not surround a form control and the for attribute is missing/empty\r\n<li>references an element that is not present in the page\r\n<li>references an element that is not an &lt;input&gt;, &lt;select&gt; or &lt;textarea&gt; element\r\n<li>references an &lt;input&gt; element with image, submit, reset, button, or hidden type\r\n</ul>",
      resources: "",
      icon_order: "5",
      position: "last",
      page_rule: "0",
      guidelines: {
        14: {
          icon_name: "label_orphaned",
          icon_id: "35",
          guideline_id: "14",
          code: "n",
          name: "Section 508 (n)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardn"
        },
        17: {
          icon_name: "label_orphaned",
          icon_id: "35",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        27: {
          icon_name: "label_orphaned",
          icon_id: "35",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        54: {
          icon_name: "label_orphaned",
          icon_id: "35",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        },
        71: {
          icon_name: "label_orphaned",
          icon_id: "35",
          guideline_id: "71",
          code: "3.3.2",
          name: "3.3.2 Labels or Instructions (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc3.3.2"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    fieldset_missing: {
      id: "7",
      name: "fieldset_missing",
      title: "Missing fieldset",
      category: "Alerts",
      cat_code: "alert",
      summary: "A group of check boxes or radio buttons is not enclosed in a fieldset.",
      purpose: "A fieldset provides a visual and structural grouping of related form elements. It is typically necessary for groups of check boxes or radio buttons where a higher level description (called a legend) is necessary to understand the function of the check boxes or radio buttons. The description will be identified by a screen reader only if provided in a fieldset legend.",
      actions: "Determine whether the grouping of check boxes or radio buttons has or needs text that explains the purpose of the check boxes or radio button grouping. If so, mark up the group within a fieldset and put the group description in a legend element.",
      details: "Two or more checkbox or radio input elements within a form have the same name value, but are not enclosed in a fieldset.",
      resources: "",
      icon_order: "6",
      position: "before",
      page_rule: "0",
      guidelines: {
        14: {
          icon_name: "fieldset_missing",
          icon_id: "7",
          guideline_id: "14",
          code: "n",
          name: "Section 508 (n)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardn"
        },
        17: {
          icon_name: "fieldset_missing",
          icon_id: "7",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        27: {
          icon_name: "fieldset_missing",
          icon_id: "7",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        54: {
          icon_name: "fieldset_missing",
          icon_id: "7",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        },
        71: {
          icon_name: "fieldset_missing",
          icon_id: "7",
          guideline_id: "71",
          code: "3.3.2",
          name: "3.3.2 Labels or Instructions (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc3.3.2"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    legend_missing: {
      id: "3",
      name: "legend_missing",
      title: "Fieldset missing legend",
      category: "Alerts",
      cat_code: "alert",
      summary: "A fieldset does not have a legend.",
      purpose: "A fieldset legend presents a description of the form elements within a fieldset and is especially useful to screen reader users. A legend should be provided when a higher level description is necessary for groups of check boxes, radio buttons, or other form controls.",
      actions: "If a higher level description is necessary for the user to understand the function or purpose of the controls within the fieldset, provide this description within the &lt;legend&gt;. If this description or grouping is not necessary, the fieldset should probably be removed. Note that the legend is repeated to screen reader users for each form control within the fieldset.",
      details: "A fieldset does not have a legend or the legend is empty.",
      resources: "",
      icon_order: "7",
      position: "first",
      page_rule: "0",
      guidelines: {
        14: {
          icon_name: "legend_missing",
          icon_id: "3",
          guideline_id: "14",
          code: "n",
          name: "Section 508 (n)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardn"
        },
        17: {
          icon_name: "legend_missing",
          icon_id: "3",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        27: {
          icon_name: "legend_missing",
          icon_id: "3",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        54: {
          icon_name: "legend_missing",
          icon_id: "3",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        },
        71: {
          icon_name: "legend_missing",
          icon_id: "3",
          guideline_id: "71",
          code: "3.3.2",
          name: "3.3.2 Labels or Instructions (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc3.3.2"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    label_title: {
      id: "51",
      name: "label_title",
      title: "Unlabeled form element with title",
      category: "Alerts",
      cat_code: "alert",
      summary: "A form control does not have a label, but has a title.",
      purpose: "The title attribute value for unlabeled form controls will be presented to screen reader users. However, a properly associated text label provides better usability and accessibility and should be used unless the purpose of the form control is intuitive without the label.",
      actions: "If a visible text label is available for the form control, associate the text label to the form control using the label element. This provides additional functionality for end users because if the label is clicked it will set focus to the form control. If the form control is intuitive without a &lt;label&gt;, the title attribute value may be used. Note that the title attribute value will not generally be read by a screen reader if the control has a label and may not be available to sighted users, particularly keyboard-only users.",
      details: "An &lt;input&gt; (except types of image, submit, reset, button, or hidden), &lt;textarea&gt;, or &lt;select&gt; element has a non-empty title attribute value and is missing a label or valid aria-labelledby reference.",
      resources: "",
      icon_order: "8",
      position: "after",
      page_rule: "0",
      guidelines: {
        14: {
          icon_name: "label_title",
          icon_id: "51",
          guideline_id: "14",
          code: "n",
          name: "Section 508 (n)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardn"
        },
        17: {
          icon_name: "label_title",
          icon_id: "51",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        27: {
          icon_name: "label_title",
          icon_id: "51",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        54: {
          icon_name: "label_title",
          icon_id: "51",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        },
        71: {
          icon_name: "label_title",
          icon_id: "51",
          guideline_id: "71",
          code: "3.3.2",
          name: "3.3.2 Labels or Instructions (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc3.3.2"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    heading_missing: {
      id: "70",
      name: "heading_missing",
      title: "No heading structure",
      category: "Alerts",
      cat_code: "alert",
      summary: "The page has no headings.",
      purpose: "Headings (&lt;h1&gt;-&lt;h6&gt;) provide important document structure, outlines, and navigation functionality to assistive technology users. ",
      actions: "Provide a clear, consistent heading structure, generally one &lt;h1&gt; and sub-headings as appropriate. Except for very simple pages, most web pages should have a heading structure.",
      details: "No &lt;h1&gt;-&lt;h6&gt; elements are present in the page.",
      resources: "",
      icon_order: "9",
      position: "last",
      page_rule: "1",
      guidelines: {
        15: {
          icon_name: "heading_missing",
          icon_id: "70",
          guideline_id: "15",
          code: "o",
          name: "Section 508 (o)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardo"
        },
        27: {
          icon_name: "heading_missing",
          icon_id: "70",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        50: {
          icon_name: "heading_missing",
          icon_id: "70",
          guideline_id: "50",
          code: "2.4.2",
          name: "2.4.2 Page Titled (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.2"
        },
        54: {
          icon_name: "heading_missing",
          icon_id: "70",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    h1_missing: {
      id: "119",
      name: "h1_missing",
      title: "Missing first level heading",
      category: "Alerts",
      cat_code: "alert",
      summary: "A page does not have a first level heading.",
      purpose: "Headings facilitate page navigation for users of many assistive technologies. They also provide semantic and visual meaning and structure to the document. A first level heading (&lt;h1&gt;) should be present on nearly all pages. It should contain the most important heading on the page (generally the document title).",
      actions: "If the page presents a main heading, place it within an &lt;h1&gt; element. Add other sub-headings as necessary.",
      details: "A page does not have an &lt;h1&gt; element.",
      resources: "",
      icon_order: "10",
      position: "last",
      page_rule: "1",
      guidelines: {
        15: {
          icon_name: "h1_missing",
          icon_id: "119",
          guideline_id: "15",
          code: "o",
          name: "Section 508 (o)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardo"
        },
        27: {
          icon_name: "h1_missing",
          icon_id: "119",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        50: {
          icon_name: "h1_missing",
          icon_id: "119",
          guideline_id: "50",
          code: "2.4.2",
          name: "2.4.2 Page Titled (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.2"
        },
        54: {
          icon_name: "h1_missing",
          icon_id: "119",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    heading_skipped: {
      id: "62",
      name: "heading_skipped",
      title: "Skipped heading level",
      category: "Alerts",
      cat_code: "alert",
      summary: "A heading level is skipped.",
      purpose: "Headings provide document structure and facilitate keyboard navigation by users of assistive technology. These users may be confused or experience difficulty navigating when heading levels are skipped.",
      actions: "Restructure the document headings to ensure that heading levels are not skipped.",
      details: "A heading level is skipped (e.g., an &lt;h1&gt; is followed by an &lt;h3&gt;, with no intermediate &lt;h2&gt;). Note that an &lt;h1&gt; is not required to be the first heading within the document.",
      resources: "",
      icon_order: "11",
      position: "first",
      page_rule: "0",
      guidelines: {
        15: {
          icon_name: "heading_skipped",
          icon_id: "62",
          guideline_id: "15",
          code: "o",
          name: "Section 508 (o)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardo"
        },
        27: {
          icon_name: "heading_skipped",
          icon_id: "62",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "heading_skipped",
          icon_id: "62",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        },
        54: {
          icon_name: "heading_skipped",
          icon_id: "62",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    heading_possible: {
      id: "61",
      name: "heading_possible",
      title: "Possible heading",
      category: "Alerts",
      cat_code: "alert",
      summary: "Text appears to be a heading but is not a heading element.",
      purpose: "Heading elements (&lt;h1&gt;-&lt;h6&gt;) provide important document structure, outlines, and navigation functionality to assistive technology users. If heading text is not a true heading, this information and functionality will not be available for that text.",
      actions: "If the paragraph is a section heading, use a heading element instead (&lt;h1&gt;-&lt;h6&gt;).",
      details: "A &lt;p&gt; element contains less than 50 characters and is either:\r\n<ul>\r\n<li>20 pixels or bigger, or\r\n<li>16 pixels or bigger and bold and/or italicized.\r\n</ul>",
      resources: "",
      icon_order: "12",
      position: "first",
      page_rule: "0",
      guidelines: {
        15: {
          icon_name: "heading_possible",
          icon_id: "61",
          guideline_id: "15",
          code: "o",
          name: "Section 508 (o)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardo"
        },
        27: {
          icon_name: "heading_possible",
          icon_id: "61",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "heading_possible",
          icon_id: "61",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        },
        54: {
          icon_name: "heading_possible",
          icon_id: "61",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    table_caption_possible: {
      id: "114",
      name: "table_caption_possible",
      title: "Possible table caption",
      category: "Alerts",
      cat_code: "alert",
      summary: "Text appears to be a table caption, but is not a caption element.",
      purpose: "A table caption should be associated with a table using the &lt;caption&gt; element so it will be read by a screen reader with the table content.",
      actions: "If the text is a description of the table, associate the text with the table using the &lt;caption&gt; element (&lt;caption&gt; should be the first element within the &lt;table&gt;).",
      details: "A data table (has at least one table header) that does not already have a caption has:\r\n- A colspan attribute value of 3 or greater on the first cell of the table.\r\n- A <p> element immediately before the table that contains less than 50 characters or contains less than 100 characters and is bold and/or centered.\r\n",
      resources: "",
      icon_order: "13",
      position: "first",
      page_rule: "0",
      guidelines: {
        27: {
          icon_name: "table_caption_possible",
          icon_id: "114",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    link_internal_broken: {
      id: "104",
      name: "link_internal_broken",
      title: "Broken same-page link",
      category: "Alerts",
      cat_code: "alert",
      summary: "A link to another location within the page is present but does not have a corresponding target.",
      purpose: "A link to jump to another position within the the page assists users in navigating the web page, but only if the link target exists.",
      actions: "Ensure that the target for the link exists or remove the the same-page link.",
      details: "An in-page link has an href attribute (starting with a #), but does not match either the id value of another element or the name attribute value of an anchor element within the page.",
      resources: "",
      icon_order: "15",
      position: "last",
      page_rule: "0",
      guidelines: {
        39: {
          icon_name: "link_internal_broken",
          icon_id: "104",
          guideline_id: "39",
          code: "2.1.1",
          name: "2.1.1 Keyboard (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.1.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    link_suspicious: {
      id: "48",
      name: "link_suspicious",
      title: "Suspicious link text",
      category: "Alerts",
      cat_code: "alert",
      summary: "Link text contains extraneous text or may not make sense out of context.",
      purpose: 'Links, which are often read out of context, should clearly describe the destination or function of the link. Ambiguous text, text that does not make sense out of context, and extraneous text (such as "click here") can cause confusion and should be avoided.',
      actions: 'Where appropriate, reword the link text so that it is more descriptive of its destination when read out of context. Remove any extraneous text (such as "click here").',
      details: 'A link (including alt text of linked images) contains the phrase "click here" or "click", or the link text is "click here", "here", "more", "more...", "details", "more details", "link", "this page", "continue", "continue reading", "read more", or "button".',
      resources: "",
      icon_order: "16",
      position: "last",
      page_rule: "0",
      guidelines: {
        52: {
          icon_name: "link_suspicious",
          icon_id: "48",
          guideline_id: "52",
          code: "2.4.4",
          name: "2.4.4 Link Purpose (In Context) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.4"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    link_redundant: {
      id: "120",
      name: "link_redundant",
      title: "Redundant link",
      category: "Alerts",
      cat_code: "alert",
      summary: "Adjacent links go to the same URL.",
      purpose: "When adjacent links go to the same location (such as a linked product image and an adjacent linked product name that go to the same product page) this results in additional navigation and repetition for keyboard and screen reader users.",
      actions: 'If possible, combine the redundant links into one link and remove any redundant text or alternative text (for example, if a product image and product name are in the same link, the image can usually be given alt="").',
      details: "Two adjacent links go to the same URL.",
      resources: "",
      icon_order: "17",
      position: "last",
      page_rule: "0",
      guidelines: {
        52: {
          icon_name: "link_redundant",
          icon_id: "120",
          guideline_id: "52",
          code: "2.4.4",
          name: "2.4.4 Link Purpose (In Context) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.4"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    link_word: {
      id: "75",
      name: "link_word",
      title: "Link to Word document",
      category: "Alerts",
      cat_code: "alert",
      summary: "A link to a Microsoft Word document is present.",
      purpose: "Unless authored with accessibility in mind, Microsoft Word documents often have accessibility issues. Additionally, Word documents are typically viewed using a separate application, and can thus cause confusion and navigation difficulties.",
      actions: "Ensure that the Word document is natively accessible. Additionally, inform the user that the link will open a Word document. Because Word documents have limitations in accessibility (particularly for complex content) and require a separate program, HTML content should usually be used in place of or in addition to the Word document.",
      details: "A link to a .doc or .docx file is present.",
      resources: "",
      icon_order: "18",
      position: "last",
      page_rule: "0",
      guidelines: {
        13: {
          icon_name: "link_word",
          icon_id: "75",
          guideline_id: "13",
          code: "m",
          name: "Section 508 (m)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardm"
        }
      },
      levels: {
        1: "Section 508"
      }
    },
    link_excel: {
      id: "83",
      name: "link_excel",
      title: "Link to Excel spreadsheet",
      category: "Alerts",
      cat_code: "alert",
      summary: "A link to a Microsoft Excel spreadsheet is present.",
      purpose: "Unless authored with accessibility in mind, Microsoft Excel spreadsheets often have accessibility issues. Additionally, Excel documents are typically viewed using a separate application, and can thus cause confusion and navigation difficulties.",
      actions: "Ensure the Excel spreadsheet is natively accessible. Additionally, inform the user that the link will open an Excel spreadsheet. Because Excel spreadsheets have limitations in accessibility (particularly for complex content) and require a separate program, HTML content should usually be used in place of or in addition to the Excel spreadsheet.",
      details: "A link to a .xls or .xlsx file is present.",
      resources: "",
      icon_order: "19",
      position: "last",
      page_rule: "0",
      guidelines: {
        13: {
          icon_name: "link_excel",
          icon_id: "83",
          guideline_id: "13",
          code: "m",
          name: "Section 508 (m)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardm"
        }
      },
      levels: {
        1: "Section 508"
      }
    },
    link_powerpoint: {
      id: "84",
      name: "link_powerpoint",
      title: "Link to PowerPoint document",
      category: "Alerts",
      cat_code: "alert",
      summary: "A link to a Microsoft PowerPoint presentation is present.",
      purpose: "Unless authored with accessibility in mind, PowerPoint documents often have accessibility issues. Additionally, PowerPoint documents are typically viewed using a separate application, and can thus cause confusion and navigation difficulties.",
      actions: "Ensure the PowerPoint presentation is natively accessible. Additionally, inform the user that the link will open a PowerPoint document. Because PowerPoint documents have limitations in accessibility (particularly for complex content) and require a separate program, HTML content or an alternative accessible version (e.g., tagged PDF) should usually be used in place of or in addition to the PowerPoint presentation.",
      details: "A link to a .ppt, .pptx, .pps, or .ppsx file is present.",
      resources: "",
      icon_order: "20",
      position: "last",
      page_rule: "0",
      guidelines: {
        13: {
          icon_name: "link_powerpoint",
          icon_id: "84",
          guideline_id: "13",
          code: "m",
          name: "Section 508 (m)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardm"
        }
      },
      levels: {
        1: "Section 508"
      }
    },
    link_pdf: {
      id: "82",
      name: "link_pdf",
      title: "Link to PDF document",
      category: "Alerts",
      cat_code: "alert",
      summary: "A link to a PDF document is present.",
      purpose: "Unless authored with accessibility in mind, PDF documents often have accessibility issues. Additionally, PDF documents are typically viewed using a separate application or plug-in, and can thus cause confusion and navigation difficulties.",
      actions: "Ensure the PDF document is natively accessible. Additionally, inform the user that the link will open a PDF document. Because PDF documents may have limitations in accessibility (particularly for complex content) and require a separate program, HTML content should often be used in place of or in addition to the PDF document.",
      details: "A link to a .pdf file is present.",
      resources: "",
      icon_order: "21",
      position: "last",
      page_rule: "0",
      guidelines: {
        13: {
          icon_name: "link_pdf",
          icon_id: "82",
          guideline_id: "13",
          code: "m",
          name: "Section 508 (m)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardm"
        }
      },
      levels: {
        1: "Section 508"
      }
    },
    link_document: {
      id: "95",
      name: "link_document",
      title: "Link to document",
      category: "Alerts",
      cat_code: "alert",
      summary: "A link to a non-HTML document is present.",
      purpose: "Unless authored with accessibility in mind, documents that are not HTML often have accessibility issues. Additionally, these documents are typically viewed using a separate application, and can thus cause confusion and navigation difficulties.",
      actions: "Ensure the document is authored to be accessible, if possible. Additionally, inform the user that the link will open in a separate program. Because these documents have limitations in accessibility (particularly for complex content) and require a separate program, an accessible format should usually be used in place of or in addition to the document.",
      details: "A link to a .rtf, .wpd, .ods, .odt, .odp, .sxw, .sxc, .sxd, .sxi, .pages, or .key file is present. Word, PowerPoint, Excel, and PDF are identified with separate icons.",
      resources: "",
      icon_order: "22",
      position: "last",
      page_rule: "0",
      guidelines: {
        13: {
          icon_name: "link_document",
          icon_id: "95",
          guideline_id: "13",
          code: "m",
          name: "Section 508 (m)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardm"
        }
      },
      levels: {
        1: "Section 508"
      }
    },
    text_justified: {
      id: "1139",
      name: "text_justified",
      title: "Justified text",
      category: "Alerts",
      cat_code: "alert",
      summary: "Fully justified text is present.",
      purpose: "Large blocks of justified text can negatively impact readability due to varying word/letter spacing and 'rivers of white' that flow through the text.",
      actions: "Remove the full justification from the text.",
      details: "A &lt;p&gt;, &lt;div&gt;, or &lt;td&gt; element has more than 500 characters and is styled with text-align:justify.",
      resources: "",
      icon_order: "34",
      position: "first",
      page_rule: "0",
      guidelines: [],
      levels: []
    },
    audio_video: {
      id: "73",
      name: "audio_video",
      title: "Audio/Video",
      category: "Alerts",
      cat_code: "alert",
      summary: "An audio or video file or link is present.",
      purpose: "Audio content must be presented in a text format to be fully accessible to users who are deaf and hard of hearing. Video content with audio must have synchronized captions and a transcript. Audio-only content must have a transcript.",
      actions: "For video content, ensure that synchronized captioning and a transcript is provided. For audio-only content, ensure that a transcript is provided.",
      details: "An embedded QuickTime, Windows Media Player, or RealPlayer movie is present or a link is present to a file with one of the following extensions: 3gp, aif, aiff, asf, asx, avi, flv, m4a, m4p, mov, mp2, mp3, mp4, mpa, mpeg, mpeg2, mpg, mpv, ogg, ogv, qtl, ra, ram, smi, smil, wav, wax, webm, wma, wmp, or wmx.",
      resources: "",
      icon_order: "23",
      position: "after",
      page_rule: "0",
      guidelines: {
        2: {
          icon_name: "audio_video",
          icon_id: "73",
          guideline_id: "2",
          code: "b",
          name: "Section 508 (b)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardb"
        },
        13: {
          icon_name: "audio_video",
          icon_id: "73",
          guideline_id: "13",
          code: "m",
          name: "Section 508 (m)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardm"
        },
        18: {
          icon_name: "audio_video",
          icon_id: "73",
          guideline_id: "18",
          code: "1.2.1",
          name: "1.2.1 Prerecorded Audio-only and Video-only (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.2.1"
        },
        19: {
          icon_name: "audio_video",
          icon_id: "73",
          guideline_id: "19",
          code: "1.2.2",
          name: "1.2.2 Captions (Prerecorded) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.2.2"
        },
        20: {
          icon_name: "audio_video",
          icon_id: "73",
          guideline_id: "20",
          code: "1.2.3",
          name: "1.2.3 Audio Description or Media Alternative (Prerecorded) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.2.3"
        },
        22: {
          icon_name: "audio_video",
          icon_id: "73",
          guideline_id: "22",
          code: "1.2.5",
          name: "1.2.5 Audio Description (Prerecorded) (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc1.2.5"
        },
        31: {
          icon_name: "audio_video",
          icon_id: "73",
          guideline_id: "31",
          code: "1.4.2",
          name: "1.4.2 Audio Control (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.4.2"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    flash: {
      id: "4",
      name: "flash",
      title: "Flash",
      category: "Alerts",
      cat_code: "alert",
      summary: "Flash content is present.",
      purpose: "Flash content, if not authored to be accessible, will typically introduce significant accessibility issues.",
      actions: "If the Flash object does not present content, hide it from screen readers. If content is presented, provide an HTML alternative and/or make the Flash object natively accessible, including providing captions/transcripts when necessary and ensuring that the Flash object is keyboard-accessible.",
      details: 'An &lt;object&gt; element is present that has a classid attribute value of "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" or a type attribute value of "application/x-shockwave-flash", or an &lt;embed&gt; element is present that has a src attribute value of a .swf file or a type attribute value of "application/x-shockwave-flash".',
      resources: '<a href="http://webaim.org/techniques/flash/techniques#hiding">hide it from screen readers</a>',
      icon_order: "24",
      position: "after",
      page_rule: "0",
      guidelines: {
        2: {
          icon_name: "flash",
          icon_id: "4",
          guideline_id: "2",
          code: "b",
          name: "Section 508 (b)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardb"
        },
        13: {
          icon_name: "flash",
          icon_id: "4",
          guideline_id: "13",
          code: "m",
          name: "Section 508 (m)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardm"
        },
        18: {
          icon_name: "flash",
          icon_id: "4",
          guideline_id: "18",
          code: "1.2.1",
          name: "1.2.1 Prerecorded Audio-only and Video-only (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.2.1"
        },
        19: {
          icon_name: "flash",
          icon_id: "4",
          guideline_id: "19",
          code: "1.2.2",
          name: "1.2.2 Captions (Prerecorded) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.2.2"
        },
        20: {
          icon_name: "flash",
          icon_id: "4",
          guideline_id: "20",
          code: "1.2.3",
          name: "1.2.3 Audio Description or Media Alternative (Prerecorded) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.2.3"
        },
        22: {
          icon_name: "flash",
          icon_id: "4",
          guideline_id: "22",
          code: "1.2.5",
          name: "1.2.5 Audio Description (Prerecorded) (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc1.2.5"
        },
        40: {
          icon_name: "flash",
          icon_id: "4",
          guideline_id: "40",
          code: "2.1.2",
          name: "2.1.2 No Keyboard Trap (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.1.2"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    applet: {
      id: "74",
      name: "applet",
      title: "Java Applet",
      category: "Alerts",
      cat_code: "alert",
      summary: "A Java applet is present.",
      purpose: "Java applets will typically introduce significant accessibility issues.",
      actions: "Where possible, replace the Java content with a more accessible format. If Java is necessary, author the applet to support accessibility to the extent possible.",
      details: "An &lt;applet&gt; element is present.",
      resources: "",
      icon_order: "25",
      position: "after",
      page_rule: "0",
      guidelines: {
        13: {
          icon_name: "applet",
          icon_id: "74",
          guideline_id: "13",
          code: "m",
          name: "Section 508 (m)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardm"
        }
      },
      levels: {
        1: "Section 508"
      }
    },
    plugin: {
      id: "76",
      name: "plugin",
      title: "Plugin",
      category: "Alerts",
      cat_code: "alert",
      summary: "An unidentified plugin is present.",
      purpose: "Plugins allow the introduction of non-HTML content, media players, etc. Because of limitations in non-HTML content, these often introduce accessibility issues.",
      actions: "Provide an HTML alternative or ensure the plugin content is accessible. Provide a link to download any required software.",
      details: "An &lt;object&gt; or &lt;embed&gt; element is present that is not identified as Flash, Quicktime, RealPlayer, or Windows Media Player.",
      resources: "",
      icon_order: "26",
      position: "after",
      page_rule: "0",
      guidelines: {
        13: {
          icon_name: "plugin",
          icon_id: "76",
          guideline_id: "13",
          code: "m",
          name: "Section 508 (m)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardm"
        }
      },
      levels: {
        1: "Section 508"
      }
    },
    noscript: {
      id: "72",
      name: "noscript",
      title: "Noscript element",
      category: "Alerts",
      cat_code: "alert",
      summary: "A &lt;noscript&gt; element is present.",
      purpose: "Content within &lt;noscript&gt; is presented if JavaScript is disabled. Because nearly all users (including users of screen readers and other assistive technologies) have JavaScript enabled, &lt;noscript&gt; cannot be used to provide an accessible version of inaccessible scripted content.",
      actions: "Ensure that scripted content is accessible. The &lt;noscript&gt; content will be presented to very few users, but must be accessible if used.",
      details: "A &lt;noscript&gt; element is present.",
      resources: "",
      icon_order: "27",
      position: "before",
      page_rule: "0",
      guidelines: {
        12: {
          icon_name: "noscript",
          icon_id: "72",
          guideline_id: "12",
          code: "l",
          name: "Section 508 (l)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardl"
        }
      },
      levels: {
        1: "Section 508"
      }
    },
    event_handler: {
      id: "71",
      name: "event_handler",
      title: "Device dependent event handler",
      category: "Alerts",
      cat_code: "alert",
      summary: "An event handler is present that may not be accessible.",
      purpose: "The JavaScript events in use do not appear to be accessible to both mouse and keyboard users. To be fully accessible, critical JavaScript interaction should be device independent.",
      actions: "Ensure that critical functionality and content is accessible by using a device independent event handler (which responds to both keyboard and mouse) or by using both a mouse dependent and a keyboard dependent event handler.",
      details: "One of the following are present:\r\n<ul>\r\n<li>an onmouseover event but not an onfocus event</li>\r\n<li>an onclick event on something other than a link, form control, or element with a tabindex value of 0</li>\r\n<li>ondblclick</li>\r\n</ul>",
      resources: "",
      icon_order: "28",
      position: "last",
      page_rule: "0",
      guidelines: {
        12: {
          icon_name: "event_handler",
          icon_id: "71",
          guideline_id: "12",
          code: "l",
          name: "Section 508 (l)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardl"
        }
      },
      levels: {
        1: "Section 508"
      }
    },
    javascript_jumpmenu: {
      id: "52",
      name: "javascript_jumpmenu",
      title: "JavaScript jump menu",
      category: "Alerts",
      cat_code: "alert",
      summary: "A JavaScript jump menu may be present.",
      purpose: "A JavaScript jump menu is a select element that triggers a new web page with the onchange event handler. When navigating with the keyboard, each change in the select menu triggers a page change in some web browsers, thus making navigation very difficult.",
      actions: "If the onchange event handler triggers a new web page, eliminate the JavaScript jump menu and allow the user to change the select menu, then activate an adjacent button to trigger the new page.",
      details: "The onchange attribute is present on a &lt;select&gt; element.",
      resources: "",
      icon_order: "29",
      position: "after",
      page_rule: "0",
      guidelines: {
        12: {
          icon_name: "javascript_jumpmenu",
          icon_id: "52",
          guideline_id: "12",
          code: "l",
          name: "Section 508 (l)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardl"
        },
        39: {
          icon_name: "javascript_jumpmenu",
          icon_id: "52",
          guideline_id: "39",
          code: "2.1.1",
          name: "2.1.1 Keyboard (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.1.1"
        },
        66: {
          icon_name: "javascript_jumpmenu",
          icon_id: "52",
          guideline_id: "66",
          code: "3.2.2",
          name: "3.2.2 On Input (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc3.2.2"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    accesskey: {
      id: "67",
      name: "accesskey",
      title: "Accesskey",
      category: "Alerts",
      cat_code: "alert",
      summary: "An accesskey attribute is present.",
      purpose: "Accesskey provides a way to define shortcut keys for web page elements. Accesskeys often conflict with user or assistive technology shortcut keys and should be avoided or implemented with care.",
      actions: "Remove the accesskey or be aware that the accesskey may conflict with user shortcut keys.",
      details: "An element has an accesskey attribute.",
      resources: "",
      icon_order: "30",
      position: "last",
      page_rule: "0",
      guidelines: {
        49: {
          icon_name: "accesskey",
          icon_id: "67",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    tabindex: {
      id: "68",
      name: "tabindex",
      title: "Tabindex",
      category: "Alerts",
      cat_code: "alert",
      summary: "A positive tabindex value is present.",
      purpose: "Tabindex values of 1 or greater specify an explicit tab/navigation order for page elements. Because it modifies the default tab order, cause confusion, and result in decreased keyboard accessibility, it should be avoided.",
      actions: "If the natural tab order is already logical, remove the tabindex. Otherwise, consider restructuring the page so that tabindex is not needed. If tabindex is maintained, ensure that the resulting navigation is logical and complete.",
      details: "A tabindex attribute is present and has a positive value.",
      resources: "",
      icon_order: "31",
      position: "last",
      page_rule: "0",
      guidelines: {
        51: {
          icon_name: "tabindex",
          icon_id: "68",
          guideline_id: "51",
          code: "2.4.3",
          name: "2.4.3 Focus Order (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.3"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    text_small: {
      id: "65",
      name: "text_small",
      title: "Very small text",
      category: "Alerts",
      cat_code: "alert",
      summary: "Text is very small.",
      purpose: "Text which is very small is difficult to read, particularly for those with low vision.",
      actions: "Increase the text to a more readable size.",
      details: "Text is present that is sized 10 pixels or smaller.",
      resources: "",
      icon_order: "33",
      position: "first",
      page_rule: "0",
      guidelines: [],
      levels: []
    },
    underline: {
      id: "113",
      name: "underline",
      title: "Underlined text",
      category: "Alerts",
      cat_code: "alert",
      summary: "Underlined text is present.",
      purpose: "Underlines almost universally indicates linked text. Consider removing the underline from the non-link text. Other styling (e.g., bold or italics) can be used to differentiate the text.",
      actions: "Unless there is a distinct need for the underlined text, remove the underline from it. ",
      details: "A &lt;u&gt; element is present.",
      resources: "",
      icon_order: "34",
      position: "last",
      page_rule: "0",
      guidelines: [],
      levels: []
    },
    title_redundant: {
      id: "117",
      name: "title_redundant",
      title: "Redundant title text",
      category: "Alerts",
      cat_code: "alert",
      summary: "Title attribute text is the same as text or alternative text.",
      purpose: "The title attribute value is used to provide <i>advisory</i> information. It typically appears when the users hovers the mouse over an element. The advisory information presented should not be identical to or very similar to the element text or alternative text.",
      actions: "In most cases the title attribute can be removed, otherwise modify it to provide advisory, but not redundant information. Note that the title text may or may not be read by a screen reader and is typically inaccessible to sighted keyboard users. ",
      details: "A title attribute value is identical to element text or image alternative text.",
      resources: "",
      icon_order: "35",
      position: "last",
      page_rule: "0",
      guidelines: [],
      levels: []
    },
    alt: {
      id: "26",
      name: "alt",
      title: "Alternative text",
      category: "Features",
      cat_code: "feature",
      summary: "Image alternative text is present.",
      purpose: "Alternative text presents the content or function of an image to screen reader users or in other situations where images cannot be seen or are unavailable.",
      actions: "Ensure that the alternative text conveys the content and function of the image accurately and succinctly. The alt attribute should be equivalent, accurate, and succinct.",
      details: "A non-empty alt attribute is present on an image.",
      resources: "",
      icon_order: "1",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt",
          icon_id: "26",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "alt",
          icon_id: "26",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    alt_null: {
      id: "37",
      name: "alt_null",
      title: "Null or empty alternative text",
      category: "Features",
      cat_code: "feature",
      summary: 'Alternative text is null or empty (alt="").',
      purpose: 'If an image does not convey content or if the content of the image is conveyed elsewhere (such as in a caption or nearby text), the image should have empty/null alternative text (alt="") to ensure that it is ignored by a screen reader and is hidden when images are disabled or unavailable.',
      actions: "Ensure that the image does not convey content or that the content of the image is conveyed in nearby text (e.g., a caption).",
      details: 'An image has alt="".',
      resources: "",
      icon_order: "2",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_null",
          icon_id: "37",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "alt_null",
          icon_id: "37",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    alt_spacer: {
      id: "39",
      name: "alt_spacer",
      title: "Null or empty alternative text on spacer",
      category: "Features",
      cat_code: "feature",
      summary: 'Alternative text is null or empty (alt="") on a spacer image.',
      purpose: 'Spacer images are used to control layout or positioning. Because they do not convey content, they should be given empty/null alternative text (alt="") to ensure that the content is not presented to screen reader users and is hidden when images are disabled or unavailable.',
      actions: "Ensure that the image is a spacer image and that it does not convey content. Consider using CSS instead of spacer images for better control of positioning and layout.",
      details: 'An images with width and/or height of 3 pixels or less or file name of spacer.*, space.*, or blank.* has empty/null alt attribute value (alt="").',
      resources: "",
      icon_order: "3",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_spacer",
          icon_id: "39",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "alt_spacer",
          icon_id: "39",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    alt_link: {
      id: "9",
      name: "alt_link",
      title: "Linked image with alternative text",
      category: "Features",
      cat_code: "feature",
      summary: "Alternative text is present for an image that is within a link.",
      purpose: "Including appropriate alternative text on an image within a link ensures that the function and purpose of the link and the content of the image is available to screen reader users or when images are unavailable.",
      actions: 'Ensure that the alternative text presents the content of the image and/or the function of the link. If the full content and function of the link is presented in text within the link (an image and a text caption both within the same link, for example), then the image should generally be given empty/null alternative text (alt="") to avoid redundancy.',
      details: "An image element has non-empty alternative text, is within a link, and no other text (or images with alternative text) is present within the link.",
      resources: "",
      icon_order: "4",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_link",
          icon_id: "9",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "alt_link",
          icon_id: "9",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        52: {
          icon_name: "alt_link",
          icon_id: "9",
          guideline_id: "52",
          code: "2.4.4",
          name: "2.4.4 Link Purpose (In Context) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.4"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    alt_input: {
      id: "46",
      name: "alt_input",
      title: "Image button with alternative text",
      category: "Features",
      cat_code: "feature",
      summary: "Alternative text is present for an image input element.",
      purpose: "Providing the functionality of image buttons in alternative text ensures that the button function is available to all users.",
      actions: "Ensure that the alt attribute value presents the content and function of the image input element. If the image presents text, typically this text should be provided in the alt attribute.",
      details: 'An &lt;input type="image"&gt; element has a non-empty alt attribute value.',
      resources: "",
      icon_order: "5",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_input",
          icon_id: "46",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "alt_input",
          icon_id: "46",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        52: {
          icon_name: "alt_input",
          icon_id: "46",
          guideline_id: "52",
          code: "2.4.4",
          name: "2.4.4 Link Purpose (In Context) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.4"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    alt_map: {
      id: "24",
      name: "alt_map",
      title: "Image map with alt attribute",
      category: "Features",
      cat_code: "feature",
      summary: "An alt attribute is present for an image that has hot spots.",
      purpose: "If an image that uses an image map provides content or a function that is not already available through the hot spots (and their respective alternative texts), that information must be in the image's alt attribute in order for it to be available to screen reader users or when images are disabled.",
      actions: 'Ensure that the alternative text for the image map image is appropriate. The alternative text is typically empty (alt=""), unless the image conveys content not conveyed in the hot spot areas (e.g., "Map of the United States").',
      details: "An &lt;img&gt; element has both usemap and alt attributes.",
      resources: "",
      icon_order: "6",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_map",
          icon_id: "24",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        6: {
          icon_name: "alt_map",
          icon_id: "24",
          guideline_id: "6",
          code: "f",
          name: "Section 508 (f)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardf"
        },
        17: {
          icon_name: "alt_map",
          icon_id: "24",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    alt_area: {
      id: "42",
      name: "alt_area",
      title: "Image map area with alternative text",
      category: "Features",
      cat_code: "feature",
      summary: "Alternative text is present for an image map area (hot spot).",
      purpose: "Presenting the functionality of image map areas (hot spots) in the &lt;area&gt; element's alt attribute value ensures that this information is presented to screen reader users or when images are disabled or unavailable.",
      actions: "Ensure the alternative text for the area element describes the function of the image map hot spot. Additionally, ensure that the area elements are listed in the code in a logical, intuitive order (e.g., matching the visual order, alphabetically, etc.).",
      details: "An image uses an image map containing an area element with a non-empty alt attribute value.",
      resources: "",
      icon_order: "7",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "alt_area",
          icon_id: "42",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        6: {
          icon_name: "alt_area",
          icon_id: "42",
          guideline_id: "6",
          code: "f",
          name: "Section 508 (f)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardf"
        },
        17: {
          icon_name: "alt_area",
          icon_id: "42",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        52: {
          icon_name: "alt_area",
          icon_id: "42",
          guideline_id: "52",
          code: "2.4.4",
          name: "2.4.4 Link Purpose (In Context) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.4"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    longdesc: {
      id: "43",
      name: "longdesc",
      title: "Long description",
      category: "Features",
      cat_code: "feature",
      summary: "The longdesc attribute is present for an image.",
      purpose: "If the content and function of a complex image cannot be adequately presented in succinct alternative text, the longdesc attribute may be used to provide access to a description of the image content.",
      actions: "Because of poor browser support for longdesc, it is generally not the best way to provide the description of complex images. The description may be provided:\r\n<ul>\r\n<li>in the alt attribute, if possible. Alt text should be succinct (generally no more than ~100 characters).\r\n<li>in nearby text (e.g., a caption, data table, etc.)\r\n<li>via a link to a separate description page that contains an accurate and equivalent description and (optionally) the longdesc attribute. The longdesc attribute must be the URL of the description page.\r\n</ul>",
      details: "An image has a longdesc attribute containing a valid URL.",
      resources: "",
      icon_order: "8",
      position: "after",
      page_rule: "0",
      guidelines: {
        1: {
          icon_name: "longdesc",
          icon_id: "43",
          guideline_id: "1",
          code: "a",
          name: "Section 508 (a)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standarda"
        },
        17: {
          icon_name: "longdesc",
          icon_id: "43",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    label: {
      id: "53",
      name: "label",
      title: "Form label",
      category: "Features",
      cat_code: "feature",
      summary: "A form label is present and associated with a form control.",
      purpose: "A properly associated form label is presented to a screen reader user when the form control is accessed. Additionally, a label can be clicked with the mouse to set focus to the form control.",
      actions: "Ensure that the label is accurate, descriptive, succinct, and that it is associated with the correct form control element.",
      details: "A &lt;label&gt; element is present and properly associated to &lt;input&gt; (except types of image, submit, reset, button, or hidden), &lt;textarea&gt;, or &lt;select&gt; element.",
      resources: "",
      icon_order: "9",
      position: "last",
      page_rule: "0",
      guidelines: {
        14: {
          icon_name: "label",
          icon_id: "53",
          guideline_id: "14",
          code: "n",
          name: "Section 508 (n)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardn"
        },
        17: {
          icon_name: "label",
          icon_id: "53",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        27: {
          icon_name: "label",
          icon_id: "53",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        54: {
          icon_name: "label",
          icon_id: "53",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    fieldset: {
      id: "54",
      name: "fieldset",
      title: "Fieldset",
      category: "Features",
      cat_code: "feature",
      summary: "A fieldset is present.",
      purpose: "A fieldset provides a visual and structural grouping of related form elements. If present, a fieldset legend presents a description of the grouped form elements to screen reader users. A fieldset and legend are typically necessary for groups of check boxes or radio buttons.",
      actions: "Ensure that the fieldset encloses the proper form elements. Most fieldsets should have an accurate, descriptive, and succinct legend. Note that the legend is repeated to screen reader users for each form control within the fieldsets.",
      details: "A fieldset element is present.",
      resources: "",
      icon_order: "10",
      position: "first",
      page_rule: "0",
      guidelines: {
        14: {
          icon_name: "fieldset",
          icon_id: "54",
          guideline_id: "14",
          code: "n",
          name: "Section 508 (n)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardn"
        },
        17: {
          icon_name: "fieldset",
          icon_id: "54",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        27: {
          icon_name: "fieldset",
          icon_id: "54",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        54: {
          icon_name: "fieldset",
          icon_id: "54",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    link_skip: {
      id: "78",
      name: "link_skip",
      title: "Skip link",
      category: "Features",
      cat_code: "feature",
      summary: "A link is present which allows users to skip over navigation or other content.",
      purpose: "A link that provides functionality for the user to jump over navigation or other elements or jump to the main content of the page greatly assists keyboard users in navigating the web page.",
      actions: "Ensure that the link is functioning properly and that the link text adequately describes the link functionality. If the skip link is hidden from sighted users, it should be made visible within the page when it has keyboard focus and must be accessible via the keyboard (do not use CSS display:none or visibility:hidden).",
      details: 'An in-page link:\r\n<ul>\r\n<li>starts with the words "skip" or "jump"\r\n<li>has an href attribute value and that value matches the id value of another element within the page or the name attribute value of an anchor element within the page.\r\n<li>is NOT hidden with CSS display:none or visibility:hidden (this would result in a inaccessible "skip" link).\r\n</ul>',
      resources: "http://webaim.org/techniques/css/invisiblecontent/#skipnavlinks",
      icon_order: "12",
      position: "last",
      page_rule: "0",
      guidelines: {
        15: {
          icon_name: "link_skip",
          icon_id: "78",
          guideline_id: "15",
          code: "o",
          name: "Section 508 (o)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardo"
        },
        49: {
          icon_name: "link_skip",
          icon_id: "78",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    link_skip_target: {
      id: "60",
      name: "link_skip_target",
      title: "Skip link target",
      category: "Features",
      cat_code: "feature",
      summary: 'A target for a "skip" link is present.',
      purpose: 'A "skip" target identifies the location within the page where reading and navigation will resume after a "skip" link is activated.',
      actions: "Ensure that the element is at the appropriate place within the page.",
      details: 'An id value for any element or a name value for an anchor element matches the href value of a "skip" link within the page.',
      resources: "",
      icon_order: "13",
      position: "first",
      page_rule: "0",
      guidelines: {
        15: {
          icon_name: "link_skip_target",
          icon_id: "60",
          guideline_id: "15",
          code: "o",
          name: "Section 508 (o)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardo"
        },
        49: {
          icon_name: "link_skip_target",
          icon_id: "60",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    lang: {
      id: "127",
      name: "lang",
      title: "Element language",
      category: "Features",
      cat_code: "feature",
      summary: "The language of a page element or part is identified.",
      purpose: "Identifying the language of an element or portion of page that is in a different language than the page itself allows screen readers to read the content appropriately.",
      actions: "Ensure the lang attribute is necessary (it is different than the page's language) and the attribute value is a valid language code.",
      details: "An element has a non-empty lang attribute value.",
      resources: "",
      icon_order: "14",
      position: "first",
      page_rule: "0",
      guidelines: {
        60: {
          icon_name: "lang",
          icon_id: "127",
          guideline_id: "60",
          code: "3.1.2",
          name: "3.1.2 Language of Parts (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc3.1.2"
        }
      },
      levels: {
        3: "WCAG 2.0 AA"
      }
    },
    table_layout: {
      id: "81",
      name: "table_layout",
      title: "Layout table",
      category: "Structural Elements",
      cat_code: "structure",
      summary: "A layout table is present.",
      purpose: "While tables are primarily intended for the presentation of tabular information or data, they are often used to control page layout and formatting. Layout tables can introduce reading and navigation order issues and must not contain header (&lt;th&gt;) cells.",
      actions: "Ensure that the table is indeed a layout table and that it does not contain tabular data. If it is a data table, provide appropriate header (&lt;th&gt;) cells. Verify that the reading and navigation order of table content (based on underlying source code order) is logical.",
      details: "A &lt;table&gt; element is present that does not contain any header (&lt;th&gt;) cells.",
      resources: "",
      icon_order: "1",
      position: "first",
      page_rule: "0",
      guidelines: [],
      levels: []
    },
    table_data: {
      id: "87",
      name: "table_data",
      title: "Data table",
      category: "Structural Elements",
      cat_code: "structure",
      summary: "A data table is present.",
      purpose: "Data tables present tabular data. Data tables should contain table header cells that identify the content of their respective row and/or columns. Tables with proper table headers provide additional information and navigation for screen reader users.",
      actions: "Ensure that the table contains tabular data and that it is not used merely for page layout. Ensure that all column and row headers are &lt;th&gt; elements and ensure the data cells are associated with their proper header cells (typically by assigning scope to the table headers). Where appropriate, associate a descriptive caption (&lt;caption&gt; element) to the table.",
      details: "A &lt;table&gt; element is present that contains at least one table header cell (&lt;th&gt;).",
      resources: "headers/id article.",
      icon_order: "2",
      position: "before",
      page_rule: "0",
      guidelines: {
        7: {
          icon_name: "table_data",
          icon_id: "87",
          guideline_id: "7",
          code: "g",
          name: "Section 508 (g)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardg"
        },
        8: {
          icon_name: "table_data",
          icon_id: "87",
          guideline_id: "8",
          code: "h",
          name: "Section 508 (h)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardh"
        },
        27: {
          icon_name: "table_data",
          icon_id: "87",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    table_caption: {
      id: "115",
      name: "table_caption",
      title: "Table caption",
      category: "Structural Elements",
      cat_code: "structure",
      summary: "A table caption is present.",
      purpose: "An associated table caption will be read by a screen reader with the table content.",
      actions: "Ensure the table caption is properly associated with the correct table (&lt;caption&gt; should be the first element within the &lt;table&gt;) and that it provides a succinct description of the table.",
      details: "A &lt;caption&gt; element is present.",
      resources: "",
      icon_order: "3",
      position: "last",
      page_rule: "0",
      guidelines: {
        27: {
          icon_name: "table_caption",
          icon_id: "115",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    th: {
      id: "88",
      name: "th",
      title: "Table header cell",
      category: "Structural Elements",
      cat_code: "structure",
      summary: "A table header cell (&lt;th&gt;) is present.",
      purpose: "Table headers describe the content of their respective row or column. They can be identified by screen readers when data cells are encountered.",
      actions: 'Ensure the cell is a table header, otherwise change it to a data cell (&lt;td&gt;). For complex tables (particularly when there are spanned cells), the relationship between header and data cells may need to be defined using scope (e.g., &lt;th scope="col"&gt; or &lt;th scope="row"&gt;) or headers and id attributes.',
      details: 'A &lt;th&gt; element is present that does not have a scope attribute value of "row" or "col".',
      resources: "",
      icon_order: "4",
      position: "first",
      page_rule: "0",
      guidelines: {
        7: {
          icon_name: "th",
          icon_id: "88",
          guideline_id: "7",
          code: "g",
          name: "Section 508 (g)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardg"
        },
        8: {
          icon_name: "th",
          icon_id: "88",
          guideline_id: "8",
          code: "h",
          name: "Section 508 (h)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardh"
        },
        27: {
          icon_name: "th",
          icon_id: "88",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    th_col: {
      id: "90",
      name: "th_col",
      title: "Column header cell",
      category: "Structural Elements",
      cat_code: "structure",
      summary: 'A table column header (&lt;th scope="col"&gt;) is present.',
      purpose: "Adding a column scope to a table header ensures the cells within that column will be programmatically associated to that header, particularly with complex tables. This facilitates screen reader navigation and orientation within the data table.",
      actions: "Ensure that the cell is actually a header cell for tabular data and that it is a column header.",
      details: 'A table header cell (&lt;th&gt;) is present that has a scope attribute value of "col".',
      resources: "",
      icon_order: "5",
      position: "first",
      page_rule: "0",
      guidelines: {
        7: {
          icon_name: "th_col",
          icon_id: "90",
          guideline_id: "7",
          code: "g",
          name: "Section 508 (g)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardg"
        },
        8: {
          icon_name: "th_col",
          icon_id: "90",
          guideline_id: "8",
          code: "h",
          name: "Section 508 (h)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardh"
        },
        27: {
          icon_name: "th_col",
          icon_id: "90",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    th_row: {
      id: "89",
      name: "th_row",
      title: "Row header cell",
      category: "Structural Elements",
      cat_code: "structure",
      summary: 'A table row header (&lt;th scope="row"&gt;) is present.',
      purpose: "Adding a row scope to a table header ensures the cells within that row will be programmatically associated to that header, particularly with complex tables. This facilitates screen reader navigation and orientation within the data table.",
      actions: "Ensure that the cell is actually a header cell for tabular data and that it is a row header.",
      details: 'A table header cell (&lt;th&gt;) is present that has a scope attribute value of "row".',
      resources: "",
      icon_order: "6",
      position: "first",
      page_rule: "0",
      guidelines: {
        7: {
          icon_name: "th_row",
          icon_id: "89",
          guideline_id: "7",
          code: "g",
          name: "Section 508 (g)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardg"
        },
        8: {
          icon_name: "th_row",
          icon_id: "89",
          guideline_id: "8",
          code: "h",
          name: "Section 508 (h)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardh"
        },
        27: {
          icon_name: "th_row",
          icon_id: "89",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A"
      }
    },
    h1: {
      id: "91",
      name: "h1",
      title: "Heading level 1",
      category: "Structural Elements",
      cat_code: "structure",
      summary: "A first level heading (&lt;h1&gt; element) is present.",
      purpose: "Headings facilitate page navigation for users of assistive technologies. They also provide semantic and visual meaning and structure to the document. First level headings should contain the most important heading(s) on the page (generally the document title).",
      actions: "Ensure that the text in question is truly a heading and that it is structured correctly in the page outline.",
      details: "An &lt;h1&gt; element is present.",
      resources: "",
      icon_order: "7",
      position: "first",
      page_rule: "0",
      guidelines: {
        15: {
          icon_name: "h1",
          icon_id: "91",
          guideline_id: "15",
          code: "o",
          name: "Section 508 (o)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardo"
        },
        27: {
          icon_name: "h1",
          icon_id: "91",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "h1",
          icon_id: "91",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        },
        54: {
          icon_name: "h1",
          icon_id: "91",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    h2: {
      id: "96",
      name: "h2",
      title: "Heading level 2",
      category: "Structural Elements",
      cat_code: "structure",
      summary: "A second level heading (&lt;h2&gt; element) is present.",
      purpose: "Headings facilitate page navigation for users of assistive technologies. They also provide semantic and visual meaning and structure to the document.",
      actions: "Ensure that the text in question is truly a heading and that it is structured correctly in the page outline.",
      details: "An &lt;h2&gt; element is present.",
      resources: "",
      icon_order: "8",
      position: "first",
      page_rule: "0",
      guidelines: {
        15: {
          icon_name: "h2",
          icon_id: "96",
          guideline_id: "15",
          code: "o",
          name: "Section 508 (o)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardo"
        },
        27: {
          icon_name: "h2",
          icon_id: "96",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "h2",
          icon_id: "96",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        },
        54: {
          icon_name: "h2",
          icon_id: "96",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    h3: {
      id: "97",
      name: "h3",
      title: "Heading level 3",
      category: "Structural Elements",
      cat_code: "structure",
      summary: "A third level heading (&lt;h3&gt; element) is present.",
      purpose: "Headings facilitate page navigation for users of assistive technologies. They also provide semantic and visual meaning and structure to the document.",
      actions: "Ensure that the text in question is truly a heading and that it is structured correctly in the page outline.",
      details: "An &lt;h3&gt; element is present.",
      resources: "",
      icon_order: "9",
      position: "first",
      page_rule: "0",
      guidelines: {
        15: {
          icon_name: "h3",
          icon_id: "97",
          guideline_id: "15",
          code: "o",
          name: "Section 508 (o)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardo"
        },
        27: {
          icon_name: "h3",
          icon_id: "97",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "h3",
          icon_id: "97",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        },
        54: {
          icon_name: "h3",
          icon_id: "97",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    h4: {
      id: "98",
      name: "h4",
      title: "Heading level 4",
      category: "Structural Elements",
      cat_code: "structure",
      summary: "A fourth level heading (&lt;h4&gt; element) is present.",
      purpose: "Headings facilitate page navigation for users of assistive technologies. They also provide semantic and visual meaning and structure to the document.",
      actions: "Ensure that the text in question is truly a heading and that it is structured correctly in the page outline.",
      details: "An &lt;h4&gt; element is present.",
      resources: "",
      icon_order: "10",
      position: "first",
      page_rule: "0",
      guidelines: {
        15: {
          icon_name: "h4",
          icon_id: "98",
          guideline_id: "15",
          code: "o",
          name: "Section 508 (o)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardo"
        },
        27: {
          icon_name: "h4",
          icon_id: "98",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "h4",
          icon_id: "98",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        },
        54: {
          icon_name: "h4",
          icon_id: "98",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    h5: {
      id: "99",
      name: "h5",
      title: "Heading level 5",
      category: "Structural Elements",
      cat_code: "structure",
      summary: "A fifth level heading (&lt;h5&gt; element) is present.",
      purpose: "Headings facilitate page navigation for users of assistive technologies. They also provide semantic and visual meaning and structure to the document.",
      actions: "Ensure that the text in question is truly a heading and that it is structured correctly in the page outline.",
      details: "An &lt;h5&gt; element is present.",
      resources: "",
      icon_order: "11",
      position: "first",
      page_rule: "0",
      guidelines: {
        15: {
          icon_name: "h5",
          icon_id: "99",
          guideline_id: "15",
          code: "o",
          name: "Section 508 (o)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardo"
        },
        27: {
          icon_name: "h5",
          icon_id: "99",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "h5",
          icon_id: "99",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        },
        54: {
          icon_name: "h5",
          icon_id: "99",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    h6: {
      id: "100",
      name: "h6",
      title: "Heading level 6",
      category: "Structural Elements",
      cat_code: "structure",
      summary: "A sixth level heading (&lt;h6&gt; element) is present.",
      purpose: "Headings facilitate page navigation for users of assistive technologies. They also provide semantic and visual meaning and structure to the document.",
      actions: "Ensure that the text in question is truly a heading and that it is structured correctly in the page outline.",
      details: "An &lt;h6&gt; element is present.",
      resources: "",
      icon_order: "12",
      position: "first",
      page_rule: "0",
      guidelines: {
        15: {
          icon_name: "h6",
          icon_id: "100",
          guideline_id: "15",
          code: "o",
          name: "Section 508 (o)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardo"
        },
        27: {
          icon_name: "h6",
          icon_id: "100",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "h6",
          icon_id: "100",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        },
        54: {
          icon_name: "h6",
          icon_id: "100",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    ol: {
      id: "92",
      name: "ol",
      title: "Ordered list",
      category: "Structural Elements",
      cat_code: "structure",
      summary: "An ordered (numbered) list (&lt;ol&gt; element) is present.",
      purpose: "Ordered lists present a group of related sequential items. Users of assistive technologies can navigate by and within lists.",
      actions: "Ensure that an ordered (numbered) list is appropriate for the context. If list items are parallel or the order of the items is not important, an unordered list (&lt;ul&gt;) is likely more appropriate.",
      details: "An &lt;ol&gt; element is present.",
      resources: "",
      icon_order: "13",
      position: "first",
      page_rule: "0",
      guidelines: {
        27: {
          icon_name: "ol",
          icon_id: "92",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    ul: {
      id: "93",
      name: "ul",
      title: "Unordered list",
      category: "Structural Elements",
      cat_code: "structure",
      summary: "An unordered (bulleted) list (&lt;ul&gt; element) is present.",
      purpose: "Ordered lists present a group of related, parallel items. Users of many assistive technologies can navigate by and within lists.",
      actions: "Ensure that an unordered (bulleted) list is appropriate for the context. If list items are sequential or numbered, an ordered list (&lt;ol&gt;) is likely more appropriate.",
      details: "A &lt;ul&gt; element is present.",
      resources: "",
      icon_order: "14",
      position: "first",
      page_rule: "0",
      guidelines: {
        27: {
          icon_name: "ul",
          icon_id: "93",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    dl: {
      id: "94",
      name: "dl",
      title: "Definition/description list",
      category: "Structural Elements",
      cat_code: "structure",
      summary: "A definition/description list (&lt;dl&gt; element) is present.",
      purpose: "Definition lists (called description lists in HTML5) present the descriptions for terms or name/value pairs. Users of many assistive technologies can navigate by and within lists.",
      actions: "Ensure that the list is appropriate for the context (it is used for definitions or name/value pairs) and that definition terms (&lt;dt&gt;) and descriptions (&lt;dd&gt;) are provided.",
      details: "A &lt;dl&gt; element is present. ",
      resources: "",
      icon_order: "15",
      position: "first",
      page_rule: "0",
      guidelines: {
        27: {
          icon_name: "dl",
          icon_id: "94",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    iframe: {
      id: "40",
      name: "iframe",
      title: "Inline Frame",
      category: "Structural Elements",
      cat_code: "structure",
      summary: "An inline frame (&lt;iframe&gt;) is present. \t",
      purpose: "The content of an inline frame is read as if it were part of the page that contains it. The content of the iframe must be accessible. A title attribute value for the iframe will generally be read by a screen reader when the iframe is encountered.",
      actions: "Ensure that the content within the iframe is accessible. Optionally, a title attribute value can be added to provide a brief, advisory description of the iframe.",
      details: "An &lt;iframe&gt; element is present.",
      resources: "",
      icon_order: "16",
      position: "after",
      page_rule: "0",
      guidelines: [],
      levels: []
    },
    html5_header: {
      id: "108",
      name: "html5_header",
      title: "Header",
      category: "HTML5 and ARIA",
      cat_code: "html5",
      summary: "A &lt;header&gt; element or banner landmark is present.",
      purpose: "Headers identify page introduction or navigation. They typically surrounds the site or page name, logo, top navigation, or other header content. Headers facilitate page semantics and navigation.",
      actions: "Ensure the header surrounds and defines page header content.",
      details: 'A &lt;header&gt; element or role="banner" is present.',
      resources: "",
      icon_order: "1",
      position: "first",
      page_rule: "0",
      guidelines: {
        27: {
          icon_name: "html5_header",
          icon_id: "108",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "html5_header",
          icon_id: "108",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    html5_nav: {
      id: "107",
      name: "html5_nav",
      title: "Navigation",
      category: "HTML5 and ARIA",
      cat_code: "html5",
      summary: "A &lt;nav&gt; element or navigation landmark is present.",
      purpose: "The navigation identifies a section of navigation links and can facilitate page semantics and navigation.",
      actions: "Ensure the element defines page navigation. Multiple navigation elements on one page can be differentiated with ARIA labels.",
      details: 'A &lt;nav&gt; element or role="navigation" is present.',
      resources: "",
      icon_order: "2",
      position: "first",
      page_rule: "0",
      guidelines: {
        27: {
          icon_name: "html5_nav",
          icon_id: "107",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "html5_nav",
          icon_id: "107",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    html5_main: {
      id: "128",
      name: "html5_main",
      title: "Main content",
      category: "HTML5 and ARIA",
      cat_code: "html5",
      summary: "A &lt;main&gt; element or main landmark is present.",
      purpose: 'The &lt;main&gt; element or role="main" attribute identifies the main content for the page. This facilitate page semantics and navigation.',
      actions: "Ensure the element surrounds and defines page main content.",
      details: 'A &lt;main&gt; element or role="main"is present.',
      resources: "",
      icon_order: "3",
      position: "first",
      page_rule: "0",
      guidelines: {
        27: {
          icon_name: "html5_main",
          icon_id: "128",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "html5_main",
          icon_id: "128",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    html5_footer: {
      id: "109",
      name: "html5_footer",
      title: "Footer",
      category: "HTML5 and ARIA",
      cat_code: "html5",
      summary: "A &lt;footer&gt; element or contentinfo landmark is present.",
      purpose: "Footers identify a footer for the page or a page section. It typically identifies authorship, related links, copyright date, or other footer content. Footers facilitate page semantics and navigation.",
      actions: "Ensure the element surrounds and defines page or page section footer content.",
      details: 'A &lt;footer&gt; element or role="contentinfo" is present.',
      resources: "",
      icon_order: "4",
      position: "first",
      page_rule: "0",
      guidelines: {
        27: {
          icon_name: "html5_footer",
          icon_id: "109",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "html5_footer",
          icon_id: "109",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    html5_aside: {
      id: "130",
      name: "html5_aside",
      title: "Aside",
      category: "HTML5 and ARIA",
      cat_code: "html5",
      summary: "An &lt;aside&gt; element or complementary landmark is present.",
      purpose: "An aside identifies secondary, related, or complementary content. It is typically presented in a sidebar.",
      actions: "Ensure the aside surrounds and defines secondary, related, or complementary content.",
      details: 'An &lt;aside&gt; element or role="complementary" is present.',
      resources: "",
      icon_order: "4",
      position: "first",
      page_rule: "0",
      guidelines: {
        27: {
          icon_name: "html5_aside",
          icon_id: "130",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "html5_aside",
          icon_id: "130",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    html5_video_audio: {
      id: "110",
      name: "html5_video_audio",
      title: "HTML5 video or audio",
      category: "HTML5 and ARIA",
      cat_code: "html5",
      summary: "A &lt;video&gt; or &lt;audio&gt; element is present.",
      purpose: "lt;video&gt; defines video, such as a movie clip or other video streams. lt;audio&gt; defines sound, such as music or other audio streams. Audio content must be presented in a text format to be fully accessible to users who are deaf and hard of hearing. Video content with audio must have synchronized captions and a transcript. Audio-only content must have a transcript.",
      actions: "For video content with audio, ensure that synchronized captioning and a transcript is provided. For audio-only content, ensure that a transcript is provided.",
      details: "A &lt;video&gt; or &lt;audio&gt; element is present. Note that WAVE does not analyze fall-back content within the &lt;video&gt; or &lt;audio&gt; element. This content should be accessible because it will be presented to the user if the video or audio content is not supported.",
      resources: "",
      icon_order: "5",
      position: "after",
      page_rule: "0",
      guidelines: {
        2: {
          icon_name: "html5_video_audio",
          icon_id: "110",
          guideline_id: "2",
          code: "b",
          name: "Section 508 (b)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardb"
        },
        13: {
          icon_name: "html5_video_audio",
          icon_id: "110",
          guideline_id: "13",
          code: "m",
          name: "Section 508 (m)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardm"
        },
        18: {
          icon_name: "html5_video_audio",
          icon_id: "110",
          guideline_id: "18",
          code: "1.2.1",
          name: "1.2.1 Prerecorded Audio-only and Video-only (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.2.1"
        },
        19: {
          icon_name: "html5_video_audio",
          icon_id: "110",
          guideline_id: "19",
          code: "1.2.2",
          name: "1.2.2 Captions (Prerecorded) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.2.2"
        },
        20: {
          icon_name: "html5_video_audio",
          icon_id: "110",
          guideline_id: "20",
          code: "1.2.3",
          name: "1.2.3 Audio Description or Media Alternative (Prerecorded) (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.2.3"
        },
        22: {
          icon_name: "html5_video_audio",
          icon_id: "110",
          guideline_id: "22",
          code: "1.2.5",
          name: "1.2.5 Audio Description (Prerecorded) (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc1.2.5"
        },
        31: {
          icon_name: "html5_video_audio",
          icon_id: "110",
          guideline_id: "31",
          code: "1.4.2",
          name: "1.4.2 Audio Control (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.4.2"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    aria: {
      id: "80",
      name: "aria",
      title: "ARIA",
      category: "HTML5 and ARIA",
      cat_code: "html5",
      summary: "An ARIA role, state, or property is present.",
      purpose: "ARIA provides enhanced semantics and accessibility for web content.",
      actions: "Ensure the ARIA role, state, or property is used correctly. Use standard HTML accessibility features when possible. Be aware that support for ARIA is limited in older browsers and assistive technologies.",
      details: "An ARIA role, state, or property is present, excluding landmark roles, aria-labelledby, or aria-describedby which have distinct icons.",
      resources: "",
      icon_order: "6",
      position: "last",
      page_rule: "0",
      guidelines: [],
      levels: []
    },
    aria_search: {
      id: "131",
      name: "aria_search",
      title: "Search",
      category: "HTML5 and ARIA",
      cat_code: "html5",
      summary: "An ARIA search landmark is present.",
      purpose: "The search landmark identifies the search area within the page and facilitates keyboard navigation to the search area.",
      actions: "Ensure the search landmark is implemented properly and surrounds the search area of the page.",
      details: 'An element has role="search".',
      resources: "",
      icon_order: "7",
      position: "first",
      page_rule: "0",
      guidelines: {
        27: {
          icon_name: "aria_search",
          icon_id: "131",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        49: {
          icon_name: "aria_search",
          icon_id: "131",
          guideline_id: "49",
          code: "2.4.1",
          name: "2.4.1 Bypass Blocks (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    aria_label: {
      id: "105",
      name: "aria_label",
      title: "ARIA label or description",
      category: "HTML5 and ARIA",
      cat_code: "html5",
      summary: "An aria-label, aria-labelledby, or aria-describedby attribute is present.",
      purpose: "ARIA labels and descriptions allow elements to be associated with other content. These labels and descriptions will generally be read by screen readers. They may be used when HTML associations (label, alternative text, etc.) are not sufficient.",
      actions: "Ensure the aria-labelledby or aria-describedby attribute references an element that provides a correct label or description. When possible, use standard HTML &lt;label&gt; or other markup to make the association.",
      details: "An aria-label, aria-labelledby, or aria-describedby attribute is present.",
      resources: "",
      icon_order: "8",
      position: "last",
      page_rule: "0",
      guidelines: {
        14: {
          icon_name: "aria_label",
          icon_id: "105",
          guideline_id: "14",
          code: "n",
          name: "Section 508 (n)",
          level_id: "1",
          level_name: "Section 508",
          link: "http://webaim.org/standards/508/checklist#standardn"
        },
        17: {
          icon_name: "aria_label",
          icon_id: "105",
          guideline_id: "17",
          code: "1.1.1",
          name: "1.1.1 Non-text Content (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.1.1"
        },
        27: {
          icon_name: "aria_label",
          icon_id: "105",
          guideline_id: "27",
          code: "1.3.1",
          name: "1.3.1 Info and Relationships (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc1.3.1"
        },
        54: {
          icon_name: "aria_label",
          icon_id: "105",
          guideline_id: "54",
          code: "2.4.6",
          name: "2.4.6 Headings and Labels (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc2.4.6"
        }
      },
      levels: {
        1: "Section 508",
        2: "WCAG 2.0 A",
        3: "WCAG 2.0 AA"
      }
    },
    aria_tabindex: {
      id: "112",
      name: "aria_tabindex",
      title: "ARIA tabindex",
      category: "HTML5 and ARIA",
      cat_code: "html5",
      summary: "A tabindex value of 0 or less is present.",
      purpose: "Tabindex can facilitate keyboard navigation for interactive elements. A tabindex attribute value of 0 places an item into the keyboard navigation order (i.e., you can navigate to it using the Tab key). A value of less than 0 (typically -1) removes an element from the keyboard flow (you cannot Tab to it), but allows it to receive programmatic focus (e.g., via scripting). ",
      actions: "Ensure that tabindex is being used correctly by navigating and interacting with the elements using only the keyboard. Positive tabindex values specify a distinct tab order and should typically be avoided.",
      details: "A tabindex attribute is present and has a value of 0 or less.",
      resources: "",
      icon_order: "9",
      position: "last",
      page_rule: "0",
      guidelines: {
        39: {
          icon_name: "aria_tabindex",
          icon_id: "112",
          guideline_id: "39",
          code: "2.1.1",
          name: "2.1.1 Keyboard (Level A)",
          level_id: "2",
          level_name: "WCAG 2.0 A",
          link: "http://webaim.org/standards/wcag/checklist#sc2.1.1"
        }
      },
      levels: {
        2: "WCAG 2.0 A"
      }
    },
    contrast: {
      id: "126",
      name: "contrast",
      title: "Very Low Contrast",
      category: "Contrast Errors",
      cat_code: "contrast",
      summary: "Very low contrast between foreground and background colors.",
      purpose: "Adequate contrast is necessary for all users, especially users with low vision.",
      actions: "Increase the contrast between the foreground (text) color and the background color. Large text (larger than 18 point or 14 point bold) does not require as much contrast as smaller text.",
      details: "Text is present that has a contrast ratio less than 4.5:1, or large text (larger than 18 point or 14 point bold) has a contrast ratio less than 3:1. Elements with background images must have a background color defined that provides adequate contrast when images are disabled or unavailable.",
      resources: "",
      icon_order: "2",
      position: "first",
      page_rule: "0",
      guidelines: {
        32: {
          icon_name: "contrast",
          icon_id: "126",
          guideline_id: "32",
          code: "1.4.3",
          name: "1.4.3 Contrast (Minimum) (Level AA)",
          level_id: "3",
          level_name: "WCAG 2.0 AA",
          link: "http://webaim.org/standards/wcag/checklist#sc1.4.3"
        }
      },
      levels: {
        3: "WCAG 2.0 AA"
      }
    }
  },
  wave.rules = {},
  wave.rules.text_justified = function (e) {
    e.find("p, div, td").each(function (t, n) {
      var i = e.find(n);
      "justify" == i.css("text-align") && wave.engine.fn.addIcon(n, "text_justified")
    })
  }
  ,
  wave.rules.alt_missing = function (e) {
    wave.engine.fn.overrideby("alt_missing", ["alt_link_missing", "alt_map_missing", "alt_spacer_missing"]),
      e.find("img:not([alt])").each(function (e, t) {
        var n = $(t);
        void 0 != n.attr("title") && 0 != n.attr("title").length || wave.engine.fn.addIcon(t, "alt_missing")
      })
  }
  ,
  wave.rules.alt_link_missing = function (e) {
    wave.engine.fn.override("alt_link_missing", ["alt", "alt_missing", "alt_spacer_missing", "alt_null", "alt_spacer", "link_empty"]);
    var t = !1;
    e.find("a").each(function (n, i) {
      if (!wave.engine.fn.hasTextContent(i)) {
        var a = [];
        if (t = !1,
            e.find(i).children("img").each(function (e, n) {
              var i = n.getAttribute("alt");
              null === i || i.search(/^ *$/) !== -1 ? a.push(n) : t = !0
            }),
            t)
          return void (a = []);
        for (no_alt_image in a)
          wave.engine.fn.addIcon(a[no_alt_image], "alt_link_missing")
      }
    })
  }
  ,
  wave.rules.alt_spacer_missing = function (e) {
    wave.engine.fn.override("alt_spacer_missing", ["alt_missing"]),
      wave.engine.fn.overrideby("alt_spacer_missing", ["alt_link_missing"]),
      e.find("img:not([alt])").each(function (t, n) {
        var i = e.find(n).css("height")
          , a = e.find(n).css("width")
          , o = Number(i.substring(0, i.length - 2))
          , r = Number(a.substring(0, a.length - 2))
          , s = n.getAttribute("src");
        return s && (s = n.getAttribute("src").split("/"),
          s = s[s.length - 1].split("\\"),
          s = s[s.length - 1],
        s.search(/^(spacer|space|blank)\..+$/i) !== -1) ? void wave.engine.fn.addIcon(n, "alt_spacer_missing") : void ((null !== o && o > 0 && o <= 3 && "auto" !== i || null !== r && r > 0 && r <= 3 && "auto" !== a) && wave.engine.fn.addIcon(n, "alt_spacer_missing"))
      })
  }
  ,
  wave.rules.alt_input_missing = function (e) {
    e.find("input:image").each(function (e, t) {
      var n = t.getAttribute("alt");
      n && n.search(/^ *$/) === -1 || wave.engine.fn.addIcon(t, "alt_input_missing")
    })
  }
  ,
  wave.rules.alt_area_missing = function (e) {
    e.find("area").each(function (t, n) {
      var i = n.getAttribute("alt");
      if (!i || i.search(/^ *$/) !== -1) {
        var a = e.find(n).parents("map")[0].getAttribute("name");
        e.find("img[usemap=#" + a + "]").each(function (e, t) {
          wave.engine.fn.addIcon(t, "alt_area_missing")
        })
      }
    })
  }
  ,
  wave.rules.alt_map_missing = function (e) {
    wave.engine.fn.override("alt_map_missing", ["alt_missing"]),
      e.find("img[usemap]:not([alt])").each(function (e, t) {
        wave.engine.fn.addIcon(t, "alt_map_missing")
      })
  }
  ,
  wave.rules.server_image_map = function (e) {
    e.find("input[ismap]").each(function (e, t) {
      wave.engine.fn.addIcon(t, "server_image_map")
    })
  }
  ,
  wave.rules.longdesc_invalid = function (e) {
    wave.engine.fn.override("longdesc_invalid", ["longdesc"]),
      e.find("[longdesc]").each(function (e, t) {
        var n = new RegExp("(([a-zA-Z0-9]|\\|/))+")
          , i = new RegExp("(.html|.htm)$")
          , a = new RegExp("(.jpg|.gif|.png)$")
          , o = t.getAttribute("longdesc");
        n.test(o) && (0 == o.length || a.test(o) || o.indexOf(" ") != -1 && !i.test(o)) && wave.engine.fn.addIcon(t, "longdesc_invalid", o)
      })
  }
  ,
  wave.rules.label_missing = function (e) {
    var t = !1;
    return e.find("input:not([type=image],[type=submit],[type=reset],[type=button],[type=hidden]), select, textarea").each(function (n, i) {
      wave.engine.fn.isLabeled(i, e) || (wave.engine.fn.addIcon(i, "label_missing"),
        t = !0)
    }),
      t
  }
  ,
  wave.rules.label_empty = function (e) {
    wave.engine.fn.override("label_empty", ["label", "label_orphaned"]),
      e.find("label").each(function (t, n) {
        var i = e.find(n)
          , a = i.children("input, select, textarea")
          , o = n.getAttribute("for");
        (!wave.engine.fn.hasTextContent(i) || (a.length > 0 && wave.engine.fn.isLabeled(a[0], e) || null != o) && !wave.engine.fn.hasTextContent(n)) && wave.engine.fn.addIcon(n, "label_empty")
      })
  }
  ,
  wave.rules.label_multiple = function (e) {
    e.find("input:not([type=image],[type=submit],[type=reset],[type=button],[type=hidden]), select, textarea").each(function (t, n) {
      var i = n.getAttribute("id")
        , a = e.find(n).parents("label")
        , o = null != i ? e.find("label[for=" + i + "]") : null;
      o && (o.length > 1 || 1 == a.length && 1 == o.length && a[0] !== o[0]) && wave.engine.fn.addIcon(n, "label_multiple")
    })
  }
  ,
  wave.rules.title_invalid = function (e) {
    return 0 === e.find("title").length ? void wave.engine.fn.addPagewideIcon("title_invalid") : void e.find("title").each(function (t, n) {
        var i = e.find(n).text();
        0 !== i.length && i.search(/(^ +$)|(^untitled.*$)/i) === -1 || wave.engine.fn.addPagewideIcon("title_invalid")
      })
  }
  ,
  wave.rules.language_missing = function (e) {
    var t = !1;
    return e.find("html:not([lang])").each(function (e, n) {
      n.hasAttribute("xml:lang") || (t = !0,
        wave.engine.fn.addPagewideIcon("language_missing"))
    }),
      t
  }
  ,
  wave.rules.meta_refresh = function (e) {
    e.find('meta[http-equiv="refresh"]').each(function (e, t) {
      wave.engine.fn.addPagewideIcon("meta_refresh")
    })
  }
  ,
  wave.rules.heading_empty = function (e) {
    e.find(":header").each(function (e, t) {
      wave.engine.fn.hasTextContent(t) || wave.engine.fn.addIcon(t, "heading_empty")
    })
  }
  ,
  wave.rules.button_empty = function (e) {
    e.find("button").each(function (e, t) {
      wave.engine.fn.hasTextContent(t) || wave.engine.fn.addIcon(t, "button_empty")
    }),
      e.find("input[type='submit'], input[type='button'], input[type='reset']").each(function (e, t) {
        var n = t.getAttribute("value");
        (!n || n && 0 === n.length) && wave.engine.fn.addIcon(t, "button_empty")
      })
  }
  ,
  wave.rules.link_empty = function (e) {
    wave.engine.fn.overrideby("link_empty", ["alt_link_missing"]),
      e.find("a[href]").each(function (t, n) {
        var i = e.find(n);
        0 != i.find("img").length || wave.engine.fn.hasTextContent(n) || wave.engine.fn.addIcon(n, "link_empty")
      })
  }
  ,
  wave.rules.link_skip_broken = function (e) {
    wave.engine.fn.override("link_skip_broken", ["link_skip", "link_internal_broken"]);
    var t = !1;
    return e.find("a[href^='#']").each(function (n, i) {
      var a = i.getAttribute("href");
      if ($(i).text().search(/^(skip|jump).*/gi) !== -1) {
        if ("none" == $(i).css("display") || "hidden" == $(i).css("visibility"))
          t = !0;
        else {
          var o = a.replace("#", "");
          0 === e.find('[id="' + o + '"]').length && 0 === e.find('a[name="' + o + '"]').length && (t = !0)
        }
        t && wave.engine.fn.addIcon(i, "link_skip_broken")
      }
    }),
      t
  }
  ,
  wave.rules.th_empty = function (e) {
    e.find("th").each(function (e, t) {
      wave.engine.fn.hasTextContent(t) || wave.engine.fn.addIcon(t, "th_empty")
    })
  }
  ,
  wave.rules.blink = function (e) {
    e.find("p, span, div, td, th, dd, ul, ol, h1, h2, h3, h4, h5, h6, blink").each(function (e, t) {
      var n = t.getAttribute("style")
        , i = new RegExp("s*text-decorations*:s*blinks*");
      n && i.test(n) && wave.engine.fn.addIcon(t, "blink")
    }),
      e.find("blink").each(function (e, t) {
        wave.engine.fn.addIcon(t, "blink")
      })
  }
  ,
  wave.rules.marquee = function (e) {
    e.find("marquee").each(function (e, t) {
      wave.engine.fn.addIcon(t, "marquee")
    })
  }
  ,
  wave.rules.alt_redundant = function (e) {
    wave.engine.fn.override("alt_redundant", ["alt"]),
      wave.engine.fn.overrideby("alt_redundant", ["alt_suspicious"]),
      e.find("img:not([alt=''])[alt]").each(function (e, t) {
        var n = t.getAttribute("alt");
        if (!(n && n.length > 0 && n.search(/^ +$/i) !== -1 || n && n.length < 3)) {
          for (var i = "", a = t; i.length < 15;)
            if (a.nodeType == a.TEXT_NODE && (i += a.nodeValue.toLowerCase()),
                a.lastChild)
              a = a.lastChild;
            else if (a.previousSibling)
              a = a.previousSibling;
            else {
              if (!a.parentNode || !a.parentNode.previousSibling)
                break;
              a = a.parentNode.previousSibling
            }
          for (var o = "", a = t; o.length < 15;)
            if (a.nodeType == a.TEXT_NODE && (o += a.nodeValue.toLowerCase()),
                a.firstChild)
              a = a.firstChild;
            else if (a.nextSibling)
              a = a.nextSibling;
            else {
              if (!a.parentNode || !a.parentNode.nextSibling)
                break;
              a = a.parentNode.nextSibling
            }
          i = i.substring(i.length - 15 - n.toLowerCase().length, i.length - 1),
            o = o.substring(0, 14 + n.toLowerCase().length),
          i.indexOf(n.toLowerCase()) == -1 && o.indexOf(n.toLowerCase()) == -1 || wave.engine.fn.addIcon(t, "alt_redundant", n)
        }
      })
  }
  ,
  wave.rules.alt_suspicious = function (e) {
    wave.engine.fn.override("alt_suspicious", ["alt", "alt_redundant"]),
      e.find("img[alt]").each(function (e, t) {
        var n = t.getAttribute("alt");
        n && n.length > 0 && (n.search(/^(image|graphic|photo|photograph|drawing|painting|artwork|logo|bullet|button|arrow|more|spacer|blank|chart|table|diagram|graph|\*)$/i) !== -1 || n.search(/(^(graphic of|bullet|image of).*)|(.*(image|graphic)$)|(^ +$)|.*(\.png|\.gif|\.jpeg|\.jpg|\.bmp)$/i) !== -1) && wave.engine.fn.addIcon(t, "alt_suspicious", n)
      })
  }
  ,
  wave.rules.alt_duplicate = function (e) {
    wave.engine.fn.override("alt_duplicate", ["alt", "alt_missing"]);
    for (var t = e.find("img, input[type='image']"), n = 0; n < t.length; n++)
      if (t[n].hasAttribute("alt") && "" != t[n].getAttribute("alt"))
        for (j = n + 1; j <= n + 2 && j < t.length; j++)
          if (t[j].hasAttribute("alt") && t[j].getAttribute("alt").toLowerCase() == t[n].getAttribute("alt").toLowerCase() && t[j].getAttribute("src").toLowerCase() !== t[n].getAttribute("src").toLowerCase()) {
            wave.engine.fn.addIcon(t[j], "alt_duplicate", t[j].getAttribute("alt"));
            break
          }
  }
  ,
  wave.rules.alt_long = function (e) {
    e.find("img[alt]").each(function (e, t) {
      var n = t.getAttribute("alt");
      n && n.length > 100 && wave.engine.fn.addIcon(t, "alt_long", n)
    })
  }
  ,
  wave.rules.label_orphaned = function (e) {
    var t = !1;
    return wave.engine.fn.overrideby("label_orphaned", ["label_empty"]),
      e.find("label").each(function (n, i) {
        var a = i.getAttribute("for")
          , o = e.find(i).find("input:not(:image,:submit,:reset,:button), select, textarea")
          , r = null;
        null != a && (r = e.find(e.context.getElementById(a)).filter("input:not(:image,:submit,:reset,:button), select, textarea")),
        0 != o.length || null != r && 0 != r.length || (t = !0,
          wave.engine.fn.addIcon(i, "label_orphaned"))
      }),
      t
  }
  ,
  wave.rules.fieldset_missing = function (e) {
    var t = {};
    e.find("body").find("input[name]:checkbox, input[name]:radio").not("fieldset input").each(function (e, n) {
      var i = n.getAttribute("name");
      null == t[i] && (t[i] = []),
      t[i].length < 2 && t[i].push(n)
    });
    for (var n in t)
      if (2 == t[n].length) {
        var i = t[n][0].getAttribute("id")
          , a = e.find(t[n][0]).closest("label");
        if (a.length > 0)
          wave.engine.fn.addIcon(a.get(0), "fieldset_missing");
        else if (i) {
          var o = e.find("[for='" + i + "']").filter("label");
          o.length > 0 && wave.engine.fn.addIcon(o.get(0), "fieldset_missing")
        } else
          wave.engine.fn.addIcon(t[n][0], "fieldset_missing")
      }
  }
  ,
  wave.rules.legend_missing = function (e) {
    wave.engine.fn.override("legend_missing", ["fieldset"]),
      e.find("fieldset").each(function (t, n) {
        0 === e.find(n).find("legend").length && wave.engine.fn.addIcon(n, "legend_missing")
      })
  }
  ,
  wave.rules.label_title = function (e) {
    e.find("input[title]:not([type=image],[type=submit],[type=reset],[type=button],[type=hidden]), select[title], textarea[title]").each(function (t, n) {
      n.getAttribute("aria-labelledby") || wave.engine.fn.isLabeledByTag(n, e) || wave.engine.fn.addIcon(n, "label_title")
    })
  }
  ,
  wave.rules.heading_missing = function (e) {
    wave.engine.fn.override("heading_missing", ["h1_missing"]);
    var t = e.find(":header").length;
    0 === t && wave.engine.fn.addPagewideIcon("heading_missing")
  }
  ,
  wave.rules.h1_missing = function (e) {
    wave.engine.fn.overrideby("h1_missing", ["heading_missing"]);
    var t = e.find("h1").length;
    0 === t && wave.engine.fn.addPagewideIcon("h1_missing")
  }
  ,
  wave.rules.heading_skipped = function (e) {
    var t = 0
      , n = 0;
    e.find(":header").each(function (e, i) {
      n = Number(i.nodeName[1]),
      0 != t && t - n < -1 && wave.engine.fn.addIcon(i, "heading_skipped"),
        t = n
    })
  }
  ,
  wave.rules.heading_possible = function (e) {
    e.find("p").each(function (t, n) {
      var i = e.find(n)
        , a = parseInt(i.css("font-size"), 10);
      i.text().length < 50 && (a > 20 || a > 16 && ("bold" == i.css("font-weight") || "italic" == i.css("font-style"))) && wave.engine.fn.addIcon(n, "heading_possible")
    })
  }
  ,
  wave.rules.table_caption_possible = function (e) {
    e.find("table").each(function (t, n) {
      var i = e.find(n);
      if (i.find("th").length > 0 && 0 == i.find("caption").length) {
        var a = i.prev("p")
          , o = i.find("td");
        if (o.length > 0) {
          var r = o.get(0).getAttribute("colspan");
          if (r && r >= 3)
            wave.engine.fn.addIcon(o.get(0), "table_caption_possible");
          else if (a.length > 0) {
            var s = a.text();
            s.length < 50 ? wave.engine.fn.addIcon(a.get(0), "table_caption_possible") : s.length < 100 && "bold" == a.css("font-weight") && "center" == a.css("text-align") && wave.engine.fn.addIcon(a.get(0), "table_caption_possible")
          }
        }
      }
    })
  }
  ,
  wave.rules.link_internal_broken = function (e) {
    wave.engine.fn.overrideby("link_internal_broken", ["link_skip_broken"]),
      e.find("a[href^='#']").each(function (t, n) {
        var i = n.getAttribute("href")
          , a = i.replace("#", "");
        i[0] && "#" != i && 0 === e.find('[id="' + a + '"]').length && 0 === e.find('a[name="' + a + '"]').length && wave.engine.fn.addIcon(n, "link_internal_broken")
      })
  }
  ,
  wave.rules.link_suspicious = function (e) {
    e.find("a[href]").each(function (t, n) {
      var i = e.find(n).text();
      !i || i.search(/(click)/i) === -1 && i.search(/^.?.?.?(here|more|more\.\.\.|details|more details|link|this page|continue|continue reading|read more|button).?.?.?$/i) === -1 || wave.engine.fn.addIcon(n, "link_suspicious")
    })
  }
  ,
  wave.rules.link_redundant = function (e) {
    var t = null;
    e.find("a[href]:not(a[href^='#'])").each(function (e, n) {
      t && t.search(/^\s*$/i) && t == n.getAttribute("href") ? (t = n.getAttribute("href"),
          wave.engine.fn.addIcon(n, "link_redundant")) : t = n.getAttribute("href")
    })
  }
  ,
  wave.rules.link_word = function (e) {
    e.find("a[href]").each(function (e, t) {
      var n = t.getAttribute("href");
      n && n.search(/(\.doc|\.docx)$/i) !== -1 && wave.engine.fn.addIcon(t, "link_word")
    })
  }
  ,
  wave.rules.link_excel = function (e) {
    e.find("a[href]").each(function (e, t) {
      var n = t.getAttribute("href");
      n && n.search(/(\.xls|\.xlsx)$/i) !== -1 && wave.engine.fn.addIcon(t, "link_excel")
    })
  }
  ,
  wave.rules.link_powerpoint = function (e) {
    e.find("a[href]").each(function (e, t) {
      var n = t.getAttribute("href");
      n && n.search(/(\.ppt|\.pptx|\.pps|\.ppsx)$/i) !== -1 && wave.engine.fn.addIcon(t, "link_powerpoint")
    })
  }
  ,
  wave.rules.link_pdf = function (e) {
    e.find("a[href]").each(function (e, t) {
      var n = t.getAttribute("href");
      n && n.search(/(\.pdf)$/i) !== -1 && wave.engine.fn.addIcon(t, "link_pdf")
    })
  }
  ,
  wave.rules.link_document = function (e) {
    e.find("a[href]").each(function (e, t) {
      var n = t.getAttribute("href");
      n && n.search(/(\.rtf|\.wpd|\.ods|\.odt|\.odp|\.sxw|\.sxc|\.sxd|\.sxi|\.pages|\.key)$/i) !== -1 && wave.engine.fn.addIcon(t, "link_document")
    })
  }
  ,
  wave.rules.audio_video = function (e) {
    wave.engine.fn.override("audio_video", ["plugin"]),
      e.find("embed").each(function (e, t) {
        var n = t.getAttribute("src");
        n && n.search(/(\.mov|\.asx|\.wvx|\.wax|\.wmv|\.wma|\.ram|\.rpm|\.ra|\.rm)$/i) !== -1 && wave.engine.fn.addIcon(t, "audio_video")
      }),
      e.find("embed[type='video/quicktime'], object[classid='clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B'], embed[type='application/x-mplayer2'], object[classid='clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95'], object[classid='clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6'], embed[type='audio/x-pn-realaudio-plugin'], object[classid='clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA']").each(function (e, t) {
        wave.engine.fn.addIcon(t, "audio_video")
      }),
      e.find("a[href]").each(function (e, t) {
        var n = t.getAttribute("href");
        n && n.search(/(\.3gp|\.aif|\.aiff|\.asf|\.asx|\.avi|\.flv|\.m4a|\.m4p|\.mov|\.mp2|\.mp3|\.mp4|\.mpa|\.mpeg|\.mpeg2|\.mpg|\.mpv|\.ogg|\.ogv|\.qtl|\.ra|\.ram|\.smi|\.smil|\.wav|\.wax|\.webm|\.wma|\.wmp|\.wmx)$/i) !== -1 && wave.engine.fn.addIcon(t, "audio_video")
      })
  }
  ,
  wave.rules.flash = function (e) {
    wave.engine.fn.override("flash", ["plugin"]),
      e.find("embed[src], embed[type='application/x-shockwave-flash']").each(function (e, t) {
        var n = t.getAttribute("src");
        if (n && n.search(/(\.swf)$/i) !== -1)
          wave.engine.fn.addIcon(t, "flash");
        else {
          var i = t.getAttribute("type");
          i && "application/x-shockwave-flash" === i && wave.engine.fn.addIcon(t, "flash")
        }
      }),
      e.find("object[type='application/x-shockwave-flash'], object[classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'], object[classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000']").each(function (e, t) {
        wave.engine.fn.addIcon(t, "flash")
      })
  }
  ,
  wave.rules.applet = function (e) {
    e.find("applet").each(function (e, t) {
      wave.engine.fn.addIcon(t, "applet")
    })
  }
  ,
  wave.rules.plugin = function (e) {
    wave.engine.fn.overrideby("plugin", ["flash", "audio_video"]),
      e.find("object,embed").each(function (e, t) {
        wave.engine.fn.addIcon(t, "plugin")
      })
  }
  ,
  wave.rules.noscript = function (e) {
    e.find("noscript").each(function (e, t) {
      wave.engine.fn.addIcon(t, "noscript")
    })
  }
  ,
  wave.rules.event_handler = function (e) {
    e.find("[onmouseover],[onclick],[ondblclick]").each(function (e, t) {
      var n = t.getAttribute("onmouseover")
        , i = t.getAttribute("onfocus")
        , a = t.getAttribute("onclick")
        , o = t.getAttribute("ondblclick")
        , r = t.nodeName.toLowerCase()
        , s = t.getAttribute("tabindex");
      n && !i ? wave.engine.fn.addIcon(t, "event_handler") : o ? wave.engine.fn.addIcon(t, "event_handler") : a && "a" !== r && "input" !== r && "button" !== r && "select" !== r && "option" !== r && "textarea" !== r && (s && "0" === s || wave.engine.fn.addIcon(t, "event_handler"))
    })
  }
  ,
  wave.rules.javascript_jumpmenu = function (e) {
    e.find("select[onchange]").each(function (e, t) {
      wave.engine.fn.addIcon(t, "javascript_jumpmenu")
    })
  }
  ,
  wave.rules.accesskey = function (e) {
    e.find("[accesskey]").each(function (e, t) {
      wave.engine.fn.addIcon(t, "accesskey", t.getAttribute("accesskey"))
    })
  }
  ,
  wave.rules.tabindex = function (e) {
    e.find("[tabindex]").each(function (e, t) {
      var n = t.getAttribute("tabindex");
      "NaN" !== Number(n) && Number(n) > 0 && wave.engine.fn.addIcon(t, "tabindex")
    })
  }
  ,
  wave.rules.focus_indicator_missing = function (e) {
  }
  ,
  wave.rules.text_small = function (e) {
    e.find("p, span, div, td, th, dd, ul, ol, h1, h2, h3, h4, h5, h6, font, i").each(function (t, n) {
      var i = e.find(n);
      wave.engine.fn.elementHasText(n) && parseInt(i.css("font-size"), 10) < 10 && wave.engine.fn.addIcon(n, "text_small")
    })
  }
  ,
  wave.rules.underline = function (e) {
    e.find("p, span, div, td, th, dd, li, u").each(function (t, n) {
      var i = e.find(n);
      "underline" == i.css("text-decoration") && wave.engine.fn.addIcon(n, "underline")
    })
  }
  ,
  wave.rules.title_redundant = function (e) {
    e.find("[title]:not(img)").each(function (t, n) {
      var i = n.getAttribute("title");
      i && i.length > 0 && e.find(n).text() == i && wave.engine.fn.addIcon(n, "title_redundant")
    }),
      e.find("img[title]").each(function (e, t) {
        var n = t.getAttribute("title");
        n && n.length > 0 && t.getAttribute("alt") == n && wave.engine.fn.addIcon(t, "title_redundant")
      })
  }
  ,
  wave.rules.alt = function (e) {
    wave.engine.fn.overrideby("alt", ["alt_redundant", "alt_duplicate", "alt_link", "alt_spacer", "alt_map", "alt_suspicious"]),
      e.find("img[alt]").each(function (e, t) {
        var n = t.getAttribute("alt");
        n && n.length > 0 && n.length <= 100 && wave.engine.fn.addIcon(t, "alt", n)
      })
  }
  ,
  wave.rules.alt_null = function (e) {
    wave.engine.fn.overrideby("alt_null", ["alt_link_missing", "alt_spacer"]),
      e.find("img[alt='']").each(function (e, t) {
        wave.engine.fn.addIcon(t, "alt_null")
      })
  }
  ,
  wave.rules.alt_spacer = function (e) {
    wave.engine.fn.override("alt_spacer", ["alt", "alt_missing", "alt_null"]),
      wave.engine.fn.overrideby("alt_spacer", ["alt_link_missing"]),
      e.find("img[alt='']").each(function (t, n) {
        var i = n.getAttribute("alt");
        if ("" == i) {
          var a = e.find(n).css("height")
            , o = e.find(n).css("width")
            , r = Number(a.substring(0, a.length - 2))
            , s = Number(o.substring(0, o.length - 2))
            , l = n.getAttribute("src");
          return l && (l = n.getAttribute("src").split("/"),
            l = l[l.length - 1].split("\\"),
            l = l[l.length - 1],
          l.search(/^(spacer|space|blank)\..+$/i) !== -1) ? void wave.engine.fn.addIcon(n, "alt_spacer") : void ((null !== r && r > 0 && r <= 3 && "auto" !== a || null !== s && s > 0 && s <= 3 && "auto" !== o) && wave.engine.fn.addIcon(n, "alt_spacer"))
        }
      })
  }
  ,
  wave.rules.alt_link = function (e) {
    wave.engine.fn.override("alt_link", ["alt", "alt_missing"]),
      e.find("a").each(function (t, n) {
        if (wave.engine.fn.hasTextContent(n)) {
          var i = null;
          e.find(n).find("img[alt]").each(function (e, t) {
            var n = t.getAttribute("alt");
            if (n && n.length > 0) {
              if (null !== i)
                return void (i = null);
              i = t
            }
          }),
          null !== i && wave.engine.fn.addIcon(i, "alt_link", i.getAttribute("alt"))
        }
      })
  }
  ,
  wave.rules.alt_input = function (e) {
    e.find("input[type='image'][alt]").each(function (e, t) {
      var n = t.getAttribute("alt");
      n && n.length > 0 && wave.engine.fn.addIcon(t, "alt_input", n)
    })
  }
  ,
  wave.rules.alt_map = function (e) {
    wave.engine.fn.override("alt_map", ["alt", "alt_missing"]),
      e.find("img[alt][usemap]").each(function (e, t) {
        var n = t.getAttribute("alt");
        n && n.length > 0 && n.search(/^ +$/i) === -1 ? wave.engine.fn.addIcon(t, "alt_map", n) : wave.engine.fn.addIcon(t, "alt_map")
      })
  }
  ,
  wave.rules.alt_area = function (e) {
    var t = 0;
    e.find("area").each(function (n, i) {
      var a = i.getAttribute("alt");
      if (a && a.search(/^\s*$/) == -1) {
        var o = e.find(i).parents("map").get(0).getAttribute("name");
        e.find("img[usemap='#" + o + "']").each(function (e, n) {
          wave.engine.fn.addIcon(n, "alt_area"),
            t++
        })
      }
    })
  }
  ,
  wave.rules.longdesc = function (e) {
    wave.engine.fn.overrideby("longdesc", ["longdesc_invalid"]),
      e.find("[longdesc]").each(function (e, t) {
        var n = t.getAttribute("longdesc");
        wave.engine.fn.addIcon(t, "longdesc", n)
      })
  }
  ,
  wave.rules.label = function (e) {
    wave.engine.fn.overrideby("label", ["label_empty"]),
      e.find("label").each(function (t, n) {
        if (wave.engine.fn.hasTextContent(n)) {
          var i = e.find(n).children("input, select, textarea")
            , a = n.getAttribute("for");
          i.length > 0 && wave.engine.fn.isLabeled(i[0], e) ? a ? wave.engine.fn.addIcon(n, "label") : wave.engine.fn.addIcon(n, "label") : a && 1 == e.find("input[id=" + a + "], select[id=" + a + "], textarea[id=" + a + "]").length && wave.engine.fn.addIcon(n, "label")
        }
      })
  }
  ,
  wave.rules.fieldset = function (e) {
    wave.engine.fn.overrideby("fieldset", ["legend_missing"]),
      e.find("fieldset").each(function (t, n) {
        var i = e.find(n).find("legend");
        wave.engine.fn.addIcon(i.length > 0 ? i[0] : n, "fieldset")
      })
  }
  ,
  wave.rules.link_skip = function (e) {
    wave.engine.fn.overrideby("link_skip", ["link_skip_broken"]);
    var t = !1;
    return e.find("a[href]").each(function (t, n) {
      var i = n.getAttribute("href");
      if (i && 0 != i.length && "#" == i[0]) {
        var a = e.find(n);
        if ("none" != a.css("display") && "hidden" != a.css("visibility"))
          var o = i.replace("#", "");
        if (e.find(n).text().search(/^(skip|jump).*/gi) !== -1 && i && (e.find(i).length > 0 || e.find('[name="' + o + '"]').length > 0)) {
          wave.engine.fn.addIcon(n, "link_skip")
        }
      }
    }),
      t
  }
  ,
  wave.rules.link_skip_target = function (e) {
    e.find("a[href]").each(function (t, n) {
      var i = n.getAttribute("href");
      if (i && 0 != i.length && "#" == i[0]) {
        var a = e.find(n);
        if ("none" != a.css("display") && "hidden" != a.css("visibility"))
          var o = i.replace("#", "");
        e.find(n).text().search(/^(skip|jump).*/gi) !== -1 && (i && e.find(i).length > 0 && wave.engine.fn.addIcon(e.find(i).get(0), "link_skip_target"),
        e.find('[name="' + o + '"]').length > 0 && wave.engine.fn.addIcon(e.find('[name="' + o + '"]').get(0), "link_skip_target"))
      }
    })
  }
  ,
  wave.rules.lang = function (e) {
    var t = e.find("body").get(0);
    t.getAttribute("lang") && t.getAttribute("lang").length > 0 && wave.engine.fn.addIcon(t, "lang"),
      e.find(t).find("*").each(function (e, t) {
        var n = t.getAttribute("lang");
        n && n.length > 0 && wave.engine.fn.addIcon(t, "lang")
      })
  }
  ,
  wave.rules.table_layout = function (e) {
    e.find("table").each(function (t, n) {
      if (0 == e.find(n).not(":has(table)").find("th").length) {
        var i = e.find(n).find("td");
        i.length > 0 ? wave.engine.fn.addIcon(i.get(0), "table_layout") : wave.engine.fn.addIcon(n, "table_layout")
      }
    })
  }
  ,
  wave.rules.table_data = function (e) {
    e.find("table").each(function (t, n) {
      var i = e.find(n).not(":has(table)").find("th");
      i.length > 0 && wave.engine.fn.addIcon(n, "table_data")
    })
  }
  ,
  wave.rules.table_caption = function (e) {
    e.find("caption").each(function (e, t) {
      wave.engine.fn.addIcon(t, "table_caption")
    })
  }
  ,
  wave.rules.th = function (e) {
    e.find("th:not([scope])").each(function (e, t) {
      wave.engine.fn.hasTextContent(t) && wave.engine.fn.addIcon(t, "th")
    })
  }
  ,
  wave.rules.th_col = function (e) {
    e.find("th[scope='col']").each(function (e, t) {
      wave.engine.fn.addIcon(t, "th_col")
    })
  }
  ,
  wave.rules.th_row = function (e) {
    e.find("th[scope='row']").each(function (e, t) {
      wave.engine.fn.addIcon(t, "th_row")
    })
  }
  ,
  wave.rules.h1 = function (e) {
    e.find("h1").each(function (e, t) {
      wave.engine.fn.addIcon(t, "h1")
    })
  }
  ,
  wave.rules.h2 = function (e) {
    e.find("h2").each(function (e, t) {
      wave.engine.fn.addIcon(t, "h2")
    })
  }
  ,
  wave.rules.h3 = function (e) {
    e.find("h3").each(function (e, t) {
      wave.engine.fn.addIcon(t, "h3")
    })
  }
  ,
  wave.rules.h4 = function (e) {
    e.find("h4").each(function (e, t) {
      wave.engine.fn.addIcon(t, "h4")
    })
  }
  ,
  wave.rules.h5 = function (e) {
    e.find("h5").each(function (e, t) {
      wave.engine.fn.addIcon(t, "h5")
    })
  }
  ,
  wave.rules.h6 = function (e) {
    e.find("h6").each(function (e, t) {
      wave.engine.fn.addIcon(t, "h6")
    })
  }
  ,
  wave.rules.ol = function (e) {
    e.find("ol").each(function (e, t) {
      wave.engine.fn.addIcon(t, "ol")
    })
  }
  ,
  wave.rules.ul = function (e) {
    e.find("ul").each(function (e, t) {
      wave.engine.fn.addIcon(t, "ul")
    })
  }
  ,
  wave.rules.dl = function (e) {
    e.find("dl").each(function (e, t) {
      wave.engine.fn.addIcon(t, "dl")
    })
  }
  ,
  wave.rules.iframe = function (e) {
    e.find("iframe").each(function (e, t) {
      "wave_sidebar_container" != t.id && wave.engine.fn.addIcon(t, "iframe")
    })
  }
  ,
  wave.rules.html5_header = function (e) {
    e.find("header,[role='banner']").each(function (e, t) {
      wave.engine.fn.addIcon(t, "html5_header")
    })
  }
  ,
  wave.rules.html5_nav = function (e) {
    e.find("nav,[role='navigation']").each(function (e, t) {
      wave.engine.fn.addIcon(t, "html5_nav")
    })
  }
  ,
  wave.rules.aria_search = function (e) {
    e.find("[role='search']").each(function (e, t) {
      wave.engine.fn.addIcon(t, "aria_search")
    })
  }
  ,
  wave.rules.html5_main = function (e) {
    e.find("main,[role='main']").each(function (e, t) {
      wave.engine.fn.addIcon(t, "html5_main")
    })
  }
  ,
  wave.rules.html5_footer = function (e) {
    e.find("footer,[role='contentinfo']").each(function (e, t) {
      wave.engine.fn.addIcon(t, "html5_footer")
    })
  }
  ,
  wave.rules.html5_aside = function (e) {
    e.find("aside,[role='complementary']").each(function (e, t) {
      wave.engine.fn.addIcon(t, "html5_aside")
    })
  }
  ,
  wave.rules.html5_video_audio = function (e) {
    e.find("audio, video").each(function (e, t) {
      wave.engine.fn.addIcon(t, "html5_video_audio")
    })
  }
  ,
  wave.rules.aria = function (e) {
    e.find("*:not([role='banner']):not([role='complementary']):not([role='contentinfo']):not([role='main']):not([role='navigation']):not([role='search']):not([aria-label]):not([aria-labelledby]):not([aria-describedby])").each(function (e, t) {
      for (var n = 0; n < t.attributes.length; n++)
        (t.attributes[n].name.search(/^aria-/i) !== -1 || t.getAttribute("role")) && (t.attributes[n].name.search(/^aria-/i) !== -1 ? wave.engine.fn.addIcon(t, "aria", t.attributes[n].name + '="' + t.attributes[n].value + '"') : "role" == t.attributes[n].name && wave.engine.fn.addIcon(t, "aria", 'role="' + t.attributes[n].value + '"'))
    })
  }
,
wave.rules.aria_label = function (e) {
  wave.engine.fn.override("aria_label", ["link_empty", "button_empty"]),
    e.find("[aria-labelledby], [aria-describedby], [aria-label]").each(function (e, t) {
      for (var n = 0, i = 0; i < t.attributes.length; i++)
        if (t.attributes[i].name.search(/^aria-/i) !== -1) {
          var a = t.attributes[i].name + '="' + t.attributes[i].value + '"';
          wave.engine.fn.addIcon(t, "aria_label", a),
            n++
        }
      0 == n && wave.engine.fn.addIcon(t, "aria_label")
    })
}
,
wave.rules.aria_tabindex = function (e) {
  e.find("[tabindex]").each(function (e, t) {
    var n = t.getAttribute("tabindex");
    "NaN" !== Number(n) && Number(n) < 1 && wave.engine.fn.addIcon(t, "aria_tabindex")
  })
}
,
wave.rules.aria_reference_broken = function (e) {
  var t = !1;
  return e.find("*[aria-labelledby], *[aria-describedby]").each(function (n, i) {
    t = !1;
    var a = i.getAttribute("aria-labelledby");
    if (null != a) {
      a = a.split(" ");
      for (var o = 0; o < a.length; o++)
        if (0 === e.find('[id="' + a[o] + '"]').length) {
          t = !0;
          break
        }
    }
    if (!t) {
      var r = i.getAttribute("aria-describedby");
      if (null != r) {
        r = r.split(" ");
        for (var o = 0; o < r.length; o++)
          if (0 === e.find('[id="' + r[o] + '"]').length) {
            t = !0;
            break
          }
      }
    }
    t && wave.engine.fn.addIcon(i, "aria_reference_broken")
  }),
    t
}
,
wave.rules.contrast = function (e) {
  var t = {}
    , n = function (t) {
    var n = wave.engine.fn.getContrast(t);
    if (n) {
      if ($(t).css("background").indexOf("linear-gradient") > -1)
        return !1;
      var i = e.find(t);
      if ("body" != t.nodeName.toLowerCase() && "html" != t.nodeName.toLowerCase() || null != i && void 0 != i.css("font-size")) {
        var a = 72 * Number(i.css("font-size").substring(0, i.css("font-size").length - 2)) / 96
          , o = wave.engine.fn.trim(i.text());
        if (o.length > 0 && o.search(/^\s+$/i) == -1 && "N/A" !== n.contrastratio && (n.ratio = parseFloat(n.ratio),
          n.ratio < parseFloat(4.5)))
          if (a >= 18 || a >= 14 && "bold" == i.css("font-weight")) {
            var r = !1;
            i.not(":hidden").text();
            if (wave.engine.fn.elementHasText(t) && (r = !0),
              n.ratio < 3 && r && !$(t).is(":hidden"))
              return !0
          } else if (a <= 18) {
            var r = !1;
            i.not(":hidden").text();
            if (wave.engine.fn.elementHasText(t) && (r = !0),
              !(a > 14 && "bold" == i.css("font-weight")) && r && !$(t).is(":hidden"))
              return !0
          }
        return !1
      }
    }
  }
    , i = function (e) {
    if (null != e && "wave5bottombar" != e.getAttribute("id")) {
      for (var a = 0; e.children && a < e.children.length; a++)
        i(e.children[a]) && (t[e.children[a].getAttribute("data-waveid")] = !0);
      n(e) && (t[e.getAttribute("data-waveid")] = !0)
    }
  }
    , a = function (e) {
    i(e)
  }
    , o = function (e, n) {
    if (null != e) {
      var i = t[e.getAttribute("data-waveid")];
      n || i && wave.engine.fn.addIcon(e, "contrast");
      for (var a = 0; e.children && a < e.children.length; a++)
        o(e.children[a], i)
    }
  }
    , r = function (e) {
    o(e, !1)
  };
  a(e.find("body").get(0)),
    r(e.find("body").get(0))
}
;

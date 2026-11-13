/* Everything 4D — seasonal theme switch.
 *
 * Loaded (synchronously, in <head>) by every page alongside assets/seasonal.css.
 * When today's date falls inside the window below, it adds the class "xmas" to
 * <html> before the page paints, then adds the greeting strip and snowfall once
 * the DOM is ready. Outside the window it does nothing, and seasonal.css has no
 * effect because every rule in it is scoped under html.xmas.
 *
 * Dates use the visitor's local clock.
 *
 * Preview any time of year:  any-page.html?season=christmas
 * Force it off:              any-page.html?season=off
 * Either override lasts until the browser tab is closed; ?season=auto clears it.
 */
(function () {
  var CHRISTMAS = {
    start: [12, 1], // [month, day] — theme on from 00:00 on 1 December
    end:   [1, 5],  // [month, day] — theme off from 00:00 on 5 January (before Twelfth Night)
    greeting: "Season’s greetings from all of us at Everything 4D"
  };

  function inWindow(now, start, end) {
    var k = (now.getMonth() + 1) * 100 + now.getDate();
    var s = start[0] * 100 + start[1];
    var e = end[0] * 100 + end[1];
    // Window may wrap the new year (Dec → Jan).
    return s <= e ? (k >= s && k < e) : (k >= s || k < e);
  }

  // A ?season= override is remembered for the rest of the browser tab's
  // session, so a preview survives clicking through the site's links.
  var override = null;
  try {
    override = new URLSearchParams(location.search).get("season");
    if (override) sessionStorage.setItem("e4d-season", override);
    else override = sessionStorage.getItem("e4d-season");
  } catch (e) {}

  var on = override === "christmas" ||
           (override !== "off" && inWindow(new Date(), CHRISTMAS.start, CHRISTMAS.end));
  if (!on) return;

  document.documentElement.classList.add("xmas");

  function addBanner() {
    var strip = document.createElement("div");
    strip.className = "xmas-banner";
    strip.setAttribute("role", "note");
    strip.innerHTML = '<span aria-hidden="true">❄</span> ' +
      CHRISTMAS.greeting + ' <span aria-hidden="true">❄</span>';
    document.body.insertBefore(strip, document.body.firstChild);
  }

  function addSnow() {
    if (!window.matchMedia || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var canvas = document.createElement("canvas");
    canvas.className = "xmas-snow";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var w, h, dpr, flakes = [];
    function flake(anywhere) {
      var r = 1 + Math.random() * 2.4;
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : -10,
        r: r,
        vy: 0.25 + r * 0.22 + Math.random() * 0.2,
        sway: Math.random() * Math.PI * 2,
        a: 0.35 + Math.random() * 0.4
      };
    }
    function resize() {
      dpr = window.devicePixelRatio || 1;
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var target = Math.min(70, Math.round(w * h / 20000));
      while (flakes.length < target) flakes.push(flake(true));
      flakes.length = target;
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < flakes.length; i++) {
        var f = flakes[i];
        f.y += f.vy;
        f.sway += 0.01;
        f.x += Math.sin(f.sway) * 0.3;
        if (f.y > h + 10) flakes[i] = f = flake(false);
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(143,174,245," + f.a + ")";
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    resize();
    window.addEventListener("resize", resize);
    requestAnimationFrame(tick);
  }

  function ready() { addBanner(); addSnow(); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
})();

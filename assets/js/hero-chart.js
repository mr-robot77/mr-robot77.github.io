(function () {
  "use strict";

  var figure = document.querySelector(".hero-chart");
  if (!figure) {
    return;
  }

  var svg = figure.querySelector("svg");
  var url = figure.getAttribute("data-series");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function token(name, fallback) {
    var value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }

  function fail() {
    var note = document.createElement("p");
    note.className = "chart-summary";
    note.textContent = "Bitcoin chart data did not load.";
    figure.appendChild(note);
  }

  function element(name, attrs) {
    var node = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.keys(attrs).forEach(function (key) {
      node.setAttribute(key, attrs[key]);
    });
    return node;
  }

  function seriesPath(points, xAt, yAt, key) {
    var commands = [];
    points.forEach(function (point, index) {
      if (point[key] === null || point[key] === undefined) {
        return;
      }
      var command = commands.length === 0 ? "M" : "L";
      commands.push(command + xAt(index).toFixed(2) + " " + yAt(point[key]).toFixed(2));
    });
    return commands.join(" ");
  }

  function paint(path, dashed) {
    var length = path.getTotalLength();
    if (dashed && reduce) {
      path.style.strokeDasharray = "6 5";
      path.style.strokeDashoffset = "0";
      return;
    }
    path.style.strokeDasharray = length + " " + length;
    path.style.strokeDashoffset = reduce ? "0" : String(length);
    if (reduce) {
      return;
    }
    path.getBoundingClientRect();
    window.requestAnimationFrame(function () {
      path.style.transition = "stroke-dashoffset 1.4s ease";
      path.style.strokeDashoffset = "0";
    });
    if (!dashed) {
      return;
    }
    path.addEventListener("transitionend", function onEnd(event) {
      if (event.propertyName !== "stroke-dashoffset") {
        return;
      }
      path.removeEventListener("transitionend", onEnd);
      path.style.transition = "none";
      path.style.strokeDasharray = "6 5";
      path.style.strokeDashoffset = "0";
    });
  }

  function draw(points) {
    var closes = points.map(function (point) { return point.close; });
    var emas = points.filter(function (point) {
      return point.ema !== null && point.ema !== undefined;
    }).map(function (point) { return point.ema; });
    var values = closes.concat(emas);
    var min = Math.min.apply(null, values);
    var max = Math.max.apply(null, values);
    var pad = (max - min) * 0.08 || 1;
    min -= pad;
    max += pad;

    var width = 720;
    var height = 420;
    var padX = 12;
    var padY = 16;
    var last = Math.max(points.length - 1, 1);

    function xAt(index) {
      return padX + (index / last) * (width - padX * 2);
    }

    function yAt(value) {
      var span = max - min || 1;
      return padY + (1 - (value - min) / span) * (height - padY * 2);
    }

    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    var closeColor = token("--mint", "#5EEAD4");
    var emaColor = token("--coral", "#FF8A6B");
    var group = element("g", { fill: "none", "stroke-width": "2.5", "stroke-linejoin": "round", "stroke-linecap": "round" });

    var closePath = element("path", {
      d: seriesPath(points, xAt, yAt, "close"),
      stroke: closeColor,
      "class": "chart-line chart-line-close"
    });
    var emaPath = element("path", {
      d: seriesPath(points, xAt, yAt, "ema"),
      stroke: emaColor,
      "class": "chart-line chart-line-ema"
    });

    group.appendChild(closePath);
    group.appendChild(emaPath);
    svg.appendChild(group);
    paint(closePath, false);
    paint(emaPath, true);
  }

  fetch(url).then(function (response) {
    if (!response.ok) {
      throw new Error(String(response.status));
    }
    return response.json();
  }).then(function (data) {
    if (!data.points || !data.points.length) {
      throw new Error("empty");
    }
    draw(data.points);
  }).catch(fail);
}());

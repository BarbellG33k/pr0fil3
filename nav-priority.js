// Priority-ordered navigation with an overflow menu.
//
// The portfolio navs declared a single breakpoint and dropped every link at
// once below it, which meant the link set either overflowed and wrapped into a
// colliding row or vanished entirely. This drops links one at a time from the
// least important end, and puts whatever is hidden behind a menu so nothing
// becomes unreachable.
//
// Priority is keyed off the section href rather than the visible label,
// because the variants alias their labels: About/Overview, Experience/Timeline,
// Skills/Metrics, Contact/Terminal. The href is the stable identity.
//
// Progressive enhancement: without this script the links container keeps its
// Tailwind responsive display classes and behaves as before. The script takes
// control only once it runs.
(function () {
  "use strict";

  // Least important first - the order links are dropped as the nav runs out of
  // room.
  var DROP_ORDER = [
    "#skills",
    "#credentials",
    "#initiatives",
    "#case-studies",
    "#frameworks",
    "#experience",
    "#contact",
  ];

  // Never dropped from the bar at any width. The Back link and the PDF control
  // are pinned too, but they live outside the links container so they are not
  // this module's concern.
  var PINNED = ["#about"];

  var OVERFLOW_TOLERANCE_PX = 1;

  function droppableByPriority(links) {
    // Anything the drop order does not mention is dropped last, so a section
    // added later is never silently hidden ahead of the ones listed above.
    return links
      .filter(function (a) {
        return PINNED.indexOf(a.getAttribute("href")) === -1;
      })
      .sort(function (a, b) {
        var ai = DROP_ORDER.indexOf(a.getAttribute("href"));
        var bi = DROP_ORDER.indexOf(b.getAttribute("href"));
        return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
      });
  }

  function setUp(nav) {
    var row = nav.firstElementChild;
    var linksBox = nav.querySelector("[data-nav-links]");
    var toggle = nav.querySelector("[data-nav-toggle]");
    var panel = nav.querySelector("[data-nav-panel]");
    if (!row || !linksBox || !toggle || !panel) return;

    var links = Array.prototype.slice.call(linksBox.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;
    var ordered = droppableByPriority(links);

    // Take control from the Tailwind responsive classes now that JS is running.
    linksBox.style.display = "flex";

    var panelLinkClass = panel.getAttribute("data-link-class") || "";
    var open = false;

    function closePanel() {
      if (!open) return;
      open = false;
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }

    function openPanel() {
      if (open) return;
      open = true;
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    }

    function overflowing() {
      return row.scrollWidth > row.clientWidth + OVERFLOW_TOLERANCE_PX;
    }

    function layout() {
      // Start from everything visible, then hide until the row fits. Measuring
      // rather than trusting a breakpoint is what makes this work across two
      // design languages and four different link counts.
      links.forEach(function (a) {
        a.style.display = "";
      });
      toggle.hidden = true;

      var hidden = [];
      if (overflowing()) {
        // Reveal the menu button before dropping anything. It occupies width
        // itself, so links have to be measured against the space left once it
        // is present - otherwise the last link is dropped, the row is declared
        // to fit, and then the button reappears and overflows it again.
        toggle.hidden = false;
        for (var i = 0; i < ordered.length && overflowing(); i++) {
          ordered[i].style.display = "none";
          hidden.push(ordered[i]);
        }
      }

      // Rebuild the menu from whatever is currently hidden, in the nav's own
      // reading order rather than in drop order.
      panel.innerHTML = "";
      var inPanel = links.filter(function (a) {
        return hidden.indexOf(a) !== -1;
      });
      inPanel.forEach(function (a) {
        var item = document.createElement("a");
        item.href = a.getAttribute("href");
        item.textContent = a.textContent.trim();
        if (panelLinkClass) item.className = panelLinkClass;
        item.addEventListener("click", closePanel);
        panel.appendChild(item);
      });

      var needMenu = inPanel.length > 0;
      toggle.hidden = !needMenu;
      if (!needMenu) closePanel();
    }

    toggle.setAttribute("aria-controls", panel.id);
    toggle.setAttribute("aria-expanded", "false");
    panel.hidden = true;

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (open) closePanel();
      else openPanel();
    });

    document.addEventListener("click", function (e) {
      if (!open) return;
      if (!panel.contains(e.target) && !toggle.contains(e.target)) closePanel();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && open) {
        closePanel();
        toggle.focus();
      }
    });

    var pending;
    window.addEventListener("resize", function () {
      window.clearTimeout(pending);
      pending = window.setTimeout(layout, 100);
    });

    layout();

    // Web fonts change text metrics after first paint, which can flip a link
    // from fitting to not fitting. Re-run once they settle.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(layout).catch(function () {});
    }
  }

  function init() {
    var nav = document.querySelector("nav");
    if (nav) setUp(nav);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

const pieces = [
  {
    title: "Moon Field",
    slug: "moon-field",
    description:
      "Link and Skull Kid sit beneath a lone tree inside the Moon. Move your cursor to guide Tatl and Tael.",
    versions: [
      { number: 1, href: "/gallery/src/pieces/moon-field/v1/index.html" },
      { number: 2, href: "/gallery/src/pieces/moon-field/v2/index.html" },
    ],
  },
  {
    title: "Deep Dive",
    slug: "deep-dive",
    version: 1,
    description:
      "DK and Pauline plummet through geological strata toward a glowing core. Move your cursor to guide their fall.",
    href: "/gallery/src/pieces/deep-dive/index.html",
  },
];

function revealPixelated(canvas, img) {
  const ctx = canvas.getContext("2d");
  const steps = [8, 16, 32, 64, 128, canvas.width];
  let i = 0;
  function step() {
    const w = steps[i];
    const h = Math.round(w * (canvas.height / canvas.width));
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, w, h);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
    i++;
    if (i < steps.length) setTimeout(step, 70);
  }
  step();
}

function cacheKey(slug, versionNumber) {
  return `thumb:${slug}:v${versionNumber}`;
}

function resolveActive(piece) {
  if (piece.versions) {
    const v = piece.versions[piece.versions.length - 1];
    return { href: v.href, version: v.number };
  }
  return { href: piece.href, version: piece.version };
}

const list = document.getElementById("gallery-list");

pieces.toReversed().forEach((piece, i) => {
  const active = resolveActive(piece);
  const entry = document.createElement("a");
  entry.className = "gallery-entry";
  entry.href = active.href;

  const number = String(pieces.length - i).padStart(3, "0");

  let versionHTML = "";
  if (piece.versions) {
    const pills = piece.versions
      .map((v, idx) => {
        const isActive = idx === piece.versions.length - 1;
        return `<button class="version-pill${isActive ? " active" : ""}" data-version="${idx}">v${v.number}</button>`;
      })
      .join("");
    versionHTML = `<div class="version-selector">${pills}</div>`;
  }

  entry.innerHTML = `
    <div class="entry-info">
      <span class="entry-number">${number}</span>
      <h2 class="entry-title">${piece.title}</h2>
      <p class="entry-desc">${piece.description}</p>
      ${versionHTML}
    </div>
    <div class="entry-preview"></div>
  `;

  const preview = entry.querySelector(".entry-preview");
  let iframe = null;
  let bootIframe = null;
  let activeVersion = active.version;

  const snapshot = document.createElement("canvas");
  snapshot.className = "entry-snapshot";
  snapshot.width = 300;
  snapshot.height = 188;
  preview.appendChild(snapshot);
  const snapshotCtx = snapshot.getContext("2d");

  function showSnapshot(dataURL) {
    const img = new Image();
    img.onload = () => revealPixelated(snapshot, img);
    img.src = dataURL;
  }

  function captureSnapshot() {
    try {
      const canvas = iframe.contentDocument.querySelector("canvas");
      if (canvas) {
        snapshotCtx.drawImage(canvas, 0, 0, snapshot.width, snapshot.height);
        try {
          localStorage.setItem(cacheKey(piece.slug, activeVersion), canvas.toDataURL());
        } catch (_) { /* storage may be unavailable */ }
      }
    } catch (_) { /* cross-origin canvas */ }
  }

  function cleanupBootIframe() {
    if (bootIframe) {
      bootIframe.remove();
      bootIframe = null;
    }
  }

  function loadPreview(href, version) {
    cleanupBootIframe();

    // Try localStorage cache first
    let cached = null;
    try {
      cached = localStorage.getItem(cacheKey(piece.slug, version));
    } catch (_) { /* storage may be unavailable */ }

    // Reset snapshot opacity in case it was hidden by a previous hover
    snapshot.style.transition = "none";
    snapshot.style.opacity = "1";
    snapshot.offsetHeight;
    snapshot.style.transition = "";

    if (cached) {
      showSnapshot(cached);
    } else {
      snapshotCtx.clearRect(0, 0, snapshot.width, snapshot.height);

      bootIframe = document.createElement("iframe");
      bootIframe.src = href;
      bootIframe.tabIndex = -1;
      bootIframe.setAttribute("aria-hidden", "true");
      bootIframe.style.opacity = "0";
      preview.appendChild(bootIframe);

      const currentBoot = bootIframe;
      currentBoot.addEventListener("load", () => {
        setTimeout(() => {
          if (currentBoot !== bootIframe) return; // stale
          try {
            const canvas = currentBoot.contentDocument.querySelector("canvas");
            if (canvas) {
              const dataURL = canvas.toDataURL();
              showSnapshot(dataURL);
              try {
                localStorage.setItem(cacheKey(piece.slug, version), dataURL);
              } catch (_) { /* storage may be unavailable */ }
            }
          } catch (_) { /* cross-origin canvas */ }
          currentBoot.remove();
          if (bootIframe === currentBoot) bootIframe = null;
        }, 500);
      });
    }
  }

  // Initial preview load
  loadPreview(active.href, active.version);

  // Version pill click handlers
  if (piece.versions) {
    const pills = entry.querySelectorAll(".version-pill");
    pills.forEach((pill) => {
      pill.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const idx = Number(pill.dataset.version);
        const v = piece.versions[idx];

        // Update active pill
        pills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");

        // Update entry link and active version
        entry.href = v.href;
        activeVersion = v.number;

        // Remove any live iframe
        if (iframe) {
          iframe.remove();
          iframe = null;
        }

        // Swap preview
        loadPreview(v.href, v.number);
      });
    });
  }

  entry.addEventListener("mouseenter", () => {
    if (iframe) {
      iframe.remove();
      iframe = null;
    }
    iframe = document.createElement("iframe");
    iframe.src = entry.href;
    iframe.tabIndex = -1;
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.opacity = "0";
    preview.appendChild(iframe);
    iframe.addEventListener("load", () => {
      setTimeout(() => {
        if (iframe) {
          iframe.style.opacity = "1";
          snapshot.style.opacity = "0";
        }
      }, 100);
    });
  });

  entry.addEventListener("mouseleave", () => {
    if (iframe) {
      captureSnapshot();
      snapshot.style.transition = "none";
      snapshot.style.opacity = "1";
      iframe.remove();
      iframe = null;
      snapshot.offsetHeight;
      snapshot.style.transition = "";
    }
  });

  list.appendChild(entry);
});

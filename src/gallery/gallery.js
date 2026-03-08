const pieces = [
  {
    title: "Moon Field",
    slug: "moon-field",
    version: 1,
    description:
      "Link and Skull Kid sit beneath a lone tree inside the Moon. Move your cursor to guide Tatl and Tael.",
    href: "/gallery/src/pieces/majoras-field/index.html",
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


function cacheKey(piece) {
  return `thumb:${piece.slug}:v${piece.version}`;
}

const list = document.getElementById("gallery-list");

pieces.forEach((piece, i) => {
  const entry = document.createElement("a");
  entry.className = "gallery-entry";
  entry.href = piece.href;

  const number = String(i + 1).padStart(3, "0");

  entry.innerHTML = `
    <div class="entry-info">
      <span class="entry-number">${number}</span>
      <h2 class="entry-title">${piece.title}</h2>
      <p class="entry-desc">${piece.description}</p>
    </div>
    <div class="entry-preview"></div>
  `;

  const preview = entry.querySelector(".entry-preview");
  let iframe = null;

  const snapshot = document.createElement("canvas");
  snapshot.className = "entry-snapshot";
  snapshot.width = 300;
  snapshot.height = 188;
  preview.appendChild(snapshot);

  function showSnapshot(dataURL) {
    const img = new Image();
    img.onload = () => revealPixelated(snapshot, img);
    img.src = dataURL;
  }

  function captureSnapshot() {
    try {
      const canvas = iframe.contentDocument.querySelector("canvas");
      if (canvas) {
        const ctx = snapshot.getContext("2d");
        ctx.drawImage(canvas, 0, 0, snapshot.width, snapshot.height);
        try {
          localStorage.setItem(cacheKey(piece), canvas.toDataURL());
        } catch (_) {}
      }
    } catch (_) {}
  }

  // Try localStorage cache first
  let cached = null;
  try {
    cached = localStorage.getItem(cacheKey(piece));
  } catch (_) {}

  if (cached) {
    showSnapshot(cached);
  } else {
    // Load iframe briefly to capture an initial thumbnail
    const bootIframe = document.createElement("iframe");
    bootIframe.src = piece.href;
    bootIframe.tabIndex = -1;
    bootIframe.setAttribute("aria-hidden", "true");
    bootIframe.style.opacity = "0";
    preview.appendChild(bootIframe);
    bootIframe.addEventListener("load", () => {
      setTimeout(() => {
        try {
          const canvas = bootIframe.contentDocument.querySelector("canvas");
          if (canvas) {
            const dataURL = canvas.toDataURL();
            showSnapshot(dataURL);
            try {
              localStorage.setItem(cacheKey(piece), dataURL);
            } catch (_) {}
          }
        } catch (_) {}
        bootIframe.remove();
      }, 500);
    });
  }

  entry.addEventListener("mouseenter", () => {
    if (iframe) {
      iframe.remove();
      iframe = null;
    }
    iframe = document.createElement("iframe");
    iframe.src = piece.href;
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

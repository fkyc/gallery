const pieces = [
  {
    title: "Moon Field",
    description:
      "Link and Skull Kid sit beneath a lone tree inside the Moon. Move your cursor to guide Tatl and Tael.",
    href: "/gallery/src/pieces/majoras-field/index.html",
  },
];

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

  list.appendChild(entry);
});

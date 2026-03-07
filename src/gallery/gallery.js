const pieces = [
  {
    title: "Majora's Field",
    description:
      'Young Link and Skull Kid sit beneath a lone tree inside the Moon. Move your cursor to guide Tatl the fairy.',
    href: '/gallery/src/pieces/majoras-field/index.html',
    thumbnail: null, // placeholder for now
  },
];

const grid = document.getElementById('gallery-grid');

for (const piece of pieces) {
  const card = document.createElement('a');
  card.className = 'gallery-card';
  card.href = piece.href;

  const imageHTML = piece.thumbnail
    ? `<img class="card-image" src="${piece.thumbnail}" alt="${piece.title}" />`
    : `<div class="card-placeholder">&#127912;</div>`;

  card.innerHTML = `
    ${imageHTML}
    <div class="card-body">
      <h2 class="card-title">${piece.title}</h2>
      <p class="card-desc">${piece.description}</p>
    </div>
  `;

  grid.appendChild(card);
}

export const sketch04 = (p, canvasW, canvasH) => {
  let tree;
  let growing = true;

  p.setup = () => {
    p.createCanvas(canvasW, canvasH);
    p.frameRate(30);
    resetTree();
  };

  function resetTree() {
    tree = new ColonizationTree(canvasW, canvasH);
    growing = true;
    p.loop();
  }

  p.draw = () => {
    p.background(13);

    if (growing) {
      const done = tree.grow();
      if (done) {
        growing = false;
        p.noLoop();
      }
    }

    tree.draw(p);
  };

  p.mousePressed = () => {
    if (p.mouseX >= 0 && p.mouseX <= canvasW && p.mouseY >= 0 && p.mouseY <= canvasH) {
      resetTree();
    }
  };
};

class Node {
  constructor(x, y, parent) {
    this.x = x;
    this.y = y;
    this.parent = parent;
  }
}

class ColonizationTree {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.attractors = [];
    this.nodes = [];

    const cx = w / 2;
    const cy = h * 0.35;
    const rx = w * 0.3;
    const ry = h * 0.28;

    for (let i = 0; i < 300; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random());
      this.attractors.push({
        x: cx + Math.cos(angle) * r * rx,
        y: cy + Math.sin(angle) * r * ry,
        active: true,
      });
    }

    this.nodes.push(new Node(cx, h - 30, null));

    let current = this.nodes[0];
    const trunkTop = h * 0.55;
    while (current.y > trunkTop) {
      const next = new Node(current.x + (Math.random() - 0.5) * 2, current.y - 8, current);
      this.nodes.push(next);
      current = next;
    }

    this.segmentLen = 5;
    this.attractionDist = 80;
    this.killDist = 8;
    this.stepsPerFrame = 3;
  }

  grow() {
    for (let s = 0; s < this.stepsPerFrame; s++) {
      const dirs = new Map();

      for (const att of this.attractors) {
        if (!att.active) continue;
        let closestNode = null;
        let closestDist = Infinity;

        for (const node of this.nodes) {
          const d = Math.hypot(att.x - node.x, att.y - node.y);
          if (d < closestDist) {
            closestDist = d;
            closestNode = node;
          }
        }

        if (closestDist < this.killDist) {
          att.active = false;
          continue;
        }

        if (closestNode && closestDist < this.attractionDist) {
          const idx = this.nodes.indexOf(closestNode);
          if (!dirs.has(idx)) dirs.set(idx, { x: 0, y: 0, count: 0 });
          const entry = dirs.get(idx);
          entry.x += (att.x - closestNode.x) / closestDist;
          entry.y += (att.y - closestNode.y) / closestDist;
          entry.count++;
        }
      }

      if (dirs.size === 0) return true;

      for (const [idx, dir] of dirs) {
        const node = this.nodes[idx];
        const dx = dir.x / dir.count;
        const dy = dir.y / dir.count;
        const len = Math.hypot(dx, dy);
        if (len > 0) {
          const nx = node.x + (dx / len) * this.segmentLen;
          const ny = node.y + (dy / len) * this.segmentLen;
          this.nodes.push(new Node(nx, ny, node));
        }
      }
    }
    return false;
  }

  draw(p) {
    for (const node of this.nodes) {
      if (!node.parent) continue;
      p.stroke(100, 75, 50, 180);
      p.strokeWeight(1.5);
      p.line(node.x, node.y, node.parent.x, node.parent.y);
    }

    const childSet = new Set(this.nodes.filter(n => n.parent).map(n => n.parent));
    for (const node of this.nodes) {
      if (!childSet.has(node) && node.parent) {
        p.noStroke();
        p.fill(60, 140, 50, 120);
        p.ellipse(node.x, node.y, 6, 6);
      }
    }
  }
}

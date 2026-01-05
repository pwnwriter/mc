export const javascriptPreset = `// Welcome to Muco - where code becomes music
// Start typing to hear your code come alive

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const melody = [1, 2, 3, 5, 8, 13, 21];

for (const note of melody) {
  console.log(\`Playing note: \${fibonacci(note)}\`);
}

class Composer {
  constructor(name) {
    this.name = name;
    this.compositions = [];
  }

  compose(title) {
    const piece = {
      title,
      notes: this.generateNotes(),
      tempo: Math.random() * 60 + 80
    };
    this.compositions.push(piece);
    return piece;
  }

  generateNotes() {
    return Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 12)
    );
  }
}

const artist = new Composer("Muco");
artist.compose("First Symphony");
`;

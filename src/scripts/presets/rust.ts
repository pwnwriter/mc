export const rustPreset = `// Welcome to Muco - where code becomes music
// Start typing to hear your code come alive

fn fibonacci(n: u32) -> u32 {
    match n {
        0 | 1 => n,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

struct Composer {
    name: String,
    compositions: Vec<Composition>,
}

struct Composition {
    title: String,
    notes: Vec<u8>,
    tempo: u32,
}

impl Composer {
    fn new(name: &str) -> Self {
        Composer {
            name: name.to_string(),
            compositions: Vec::new(),
        }
    }

    fn compose(&mut self, title: &str) -> &Composition {
        let piece = Composition {
            title: title.to_string(),
            notes: self.generate_notes(),
            tempo: 120,
        };
        self.compositions.push(piece);
        self.compositions.last().unwrap()
    }

    fn generate_notes(&self) -> Vec<u8> {
        (0..8).map(|i| (i * 3) % 12).collect()
    }
}

fn main() {
    let melody = [1, 2, 3, 5, 8, 13, 21];

    for note in melody.iter() {
        println!("Playing note: {}", fibonacci(*note));
    }

    let mut artist = Composer::new("Muco");
    artist.compose("First Symphony");
}
`;

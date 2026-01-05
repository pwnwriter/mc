export const pythonPreset = `# Welcome to Muco - where code becomes music
# Start typing to hear your code come alive

def fibonacci(n):
    """Generate the nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

melody = [1, 2, 3, 5, 8, 13, 21]

for note in melody:
    print(f"Playing note: {fibonacci(note)}")

class Composer:
    def __init__(self, name):
        self.name = name
        self.compositions = []

    def compose(self, title):
        piece = {
            "title": title,
            "notes": self.generate_notes(),
            "tempo": random.randint(80, 140)
        }
        self.compositions.append(piece)
        return piece

    def generate_notes(self):
        import random
        return [random.randint(0, 11) for _ in range(8)]

artist = Composer("Muco")
artist.compose("First Symphony")
`;

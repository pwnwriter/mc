![mc](/public/mc.png)


## MC - Type code and generate sound waves.  

### Dev Setup

#### With Nix (recommended)

If you have [Nix](https://nixos.org/) with flakes enabled:

```bash
nix develop
```

Or with [direnv](https://direnv.net/):

```bash
direnv allow
```

This gives you bun and language servers automatically.

#### Without Nix

Install [bun](https://bun.sh/) manually, then:

```bash
bun install
```

#### Run

```bash
bun run dev      # Start dev server
bun run build    # Build for production
bun run preview  # Preview production build
```

#### Stack

- Astro 5
- CodeMirror 6
- Tone.js
- Bun



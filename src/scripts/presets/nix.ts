export const nixPreset = `# Welcome to MC — where code becomes music
# Every derivation is a beat, every eval is a loop

{
  description = "Hello, MC";

  outputs = { self, nixpkgs }: {
    defaultPackage.x86_64-linux =
      nixpkgs.legacyPackages.x86_64-linux.hello;
  };
}
`;

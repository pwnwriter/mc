export const zigPreset = `// Welcome to Muco - where code becomes music
// Start typing to hear your code come alive

const std = @import("std");

fn fibonacci(n: u32) u32 {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const Composition = struct {
    title: []const u8,
    notes: [8]u8,
    tempo: u32,
};

const Composer = struct {
    name: []const u8,
    compositions: std.ArrayList(Composition),

    pub fn init(allocator: std.mem.Allocator, name: []const u8) Composer {
        return .{
            .name = name,
            .compositions = std.ArrayList(Composition).init(allocator),
        };
    }

    pub fn compose(self: *Composer, title: []const u8) !*Composition {
        const piece = Composition{
            .title = title,
            .notes = generateNotes(),
            .tempo = 120,
        };
        try self.compositions.append(piece);
        return &self.compositions.items[self.compositions.items.len - 1];
    }

    fn generateNotes() [8]u8 {
        var notes: [8]u8 = undefined;
        for (&notes, 0..) |*note, i| {
            note.* = @intCast((i * 3) % 12);
        }
        return notes;
    }
};

pub fn main() !void {
    const melody = [_]u32{ 1, 2, 3, 5, 8, 13, 21 };

    for (melody) |note| {
        std.debug.print("Playing note: {}\\n", .{fibonacci(note)});
    }
}
`;

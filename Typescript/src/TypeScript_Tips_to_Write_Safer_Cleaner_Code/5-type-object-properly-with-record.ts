// const config: Object = new Date(); // No error
const also: Object = 42;

const what: {} = "hello";

// GOOD
type Config = Record<string, unknown>;

const config: Config = {
    apiUrl: "http://api.example.com",
    timeout: 5000,
    debug: true,
}

type Role = "admin" | "editor" | "viewer";

type Permission = Record<Role, string[]>;

const perm: Permission = {
    admin: ["read", "write", "delete"],
    editor: ["read", "write"],
    viewer: ["read"],
    // superadmin: ["all"]  ← Error: not in Role
}

type Size = "sm" | "md" | "lg";
type Color = "primary" | "secondary" | "danger";

type ButtonVariant = `${Size}-${Color}`;

const btn: ButtonVariant = "md-primary";

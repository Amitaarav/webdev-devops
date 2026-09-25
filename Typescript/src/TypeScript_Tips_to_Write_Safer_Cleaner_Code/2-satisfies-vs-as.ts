type Color = "red" | "green" | "blue"

type Theme = {
    primary: Color;
    secondary: Color;
    surface: string;
}

const broken1 = {
    primary: "red",
    secondary: "green",
    surface: "#fff",
} as Theme;

const broken = {
    primary: "red",
    secondary: "green",
    surface: "#fff",
} satisfies Theme;
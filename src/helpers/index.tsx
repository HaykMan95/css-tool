export type TailwindMap = Record<string, string>;

export function cssToTailwind(cssString: string): TailwindMap {
  const result: TailwindMap = {};

  // Remove CSS comments
  const cleaned = cssString.replace(/\/\*[\s\S]*?\*\//g, "").trim();

  // Match `.selector { ... }`
  const blocks = cleaned.match(/([^{]+)\{([^}]+)\}/g) ?? [];

  for (const block of blocks) {
    const match = block.match(/([^{]+)\{([^}]+)\}/);
    if (!match) continue;

    const selector = match[1].trim();
    const body = match[2].trim();

    const rules = body
      .split(";")
      .map((r) => r.trim())
      .filter(Boolean);

    const tw: string[] = [];

    for (const rule of rules) {
      const [prop, value] = rule.split(":").map((s) => s.trim());
      if (!prop || !value) continue;
      tw.push(convertToTailwind(prop, value));
    }

    result[selector] = tw.join(" ");
  }

  return result;
}

// ----------------------------------------------
// Property Converter
// ----------------------------------------------

function convertToTailwind(prop: string, value: string): string {
  switch (prop) {
    case "padding":
      return splitPadding(value);
    case "padding-top":
      return `pt-[${value}]`;
    case "padding-bottom":
      return `pb-[${value}]`;
    case "padding-left":
      return `pl-[${value}]`;
    case "padding-right":
      return `pr-[${value}]`;

    case "margin":
      return splitMargin(value);

    case "background-color":
      return `bg-[${value}]`;

    case "color":
      return `text-[${value}]`;

    case "border":
      return splitBorder(value);
    case "border-color":
      return `border-[${value}]`;
    case "border-width":
      return `border-[${value}]`;
    case "border-style":
      return `border-[${value}]`;

    case "cursor":
      return `cursor-${value}`;

    default:
      return `[${prop}:${value}]`;
  }
}

// ----------------------------------------------
// Helpers for multi-value props
// ----------------------------------------------

function splitPadding(value: string): string {
  const parts = value.split(/\s+/);

  switch (parts.length) {
    case 1:
      return `p-[${parts[0]}]`;
    case 2:
      return `py-[${parts[0]}] px-[${parts[1]}]`;
    case 4:
      return `pt-[${parts[0]}] pr-[${parts[1]}] pb-[${parts[2]}] pl-[${parts[3]}]`;
    default:
      return `[padding:${value}]`;
  }
}

function splitMargin(value: string): string {
  const parts = value.split(/\s+/);

  switch (parts.length) {
    case 1:
      return `m-[${parts[0]}]`;
    case 2:
      return `my-[${parts[0]}] mx-[${parts[1]}]`;
    case 4:
      return `mt-[${parts[0]}] mr-[${parts[1]}] mb-[${parts[2]}] ml-[${parts[3]}]`;
    default:
      return `[margin:${value}]`;
  }
}

function splitBorder(value: string): string {
  const parts = value.split(/\s+/);

  return parts
    .map((p) => {
      if (/^\d/.test(p)) return `border-[${p}]`;
      if (["solid", "dashed", "dotted", "double"].includes(p))
        return `border-[${p}]`;
      if (p.startsWith("#")) return `border-[${p}]`;
      return `[border:${p}]`;
    })
    .join(" ");
}

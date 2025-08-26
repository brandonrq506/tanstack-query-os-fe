export const colors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "fuchsia",
  "pink",
  "rose",
] as const;

export type Colors = (typeof colors)[number];

export const isColor = (color: string): color is Colors => {
  return colors.includes(color as Colors);
};

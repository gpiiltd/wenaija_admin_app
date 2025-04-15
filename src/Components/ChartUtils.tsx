export const Utils = {
  numbers: ({ min = -100, max = 100, count = 8, decimals = 2 }: any) =>
    Array.from({ length: count }, () =>
      parseFloat((Math.random() * (max - min) + min).toFixed(decimals)),
    ),

  months: ({ count = 12 }: any) =>
    Array.from({ length: count }, (_, i) => `Month ${i + 1}`),

  transparentize: (color: string, opacity: number = 0.5) => {
    const alpha = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0");
    return `${color}${alpha}`;
  },

  CHART_COLORS: {
    red: "#FF6384",
    blue: "#36A2EB",
  },
};

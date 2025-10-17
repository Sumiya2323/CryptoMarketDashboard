export const formatPrice = (price: string): string => {
  const num = parseFloat(price);
  if (isNaN(num)) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: num < 0.01 ? 8 : 2,
    maximumFractionDigits: 8,
  }).format(num);
};
export const formatVolume = (volume: string): string => {
  const num = parseFloat(volume);
  if (isNaN(num)) return "N/A";

  const absNum = Math.abs(num);

  if (absNum >= 1.0e9) return (num / 1.0e9).toFixed(2) + "B";
  if (absNum >= 1.0e6) return (num / 1.0e6).toFixed(2) + "M";
  if (absNum >= 1.0e3) return (num / 1.0e3).toFixed(2) + "K";

  return num.toFixed(0);
};
export const formatPercent = (percent: string): string => {
  const num = parseFloat(percent);
  if (isNaN(num)) return "N/A";
  return num.toFixed(2) + "%";
};

export const formatMarketCap = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumSignificantDigits: 3,
  }).format(value);
};

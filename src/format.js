export const formatMoney = (value) =>
  `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

export const formatDate = (isoDate) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function formatRussianPhone(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) return "";

  const national =
    digits.startsWith("7") || digits.startsWith("8")
      ? digits.slice(1, 11)
      : digits.slice(0, 10);

  let formatted = "+7";
  if (!national.length) return formatted;

  formatted += ` (${national.slice(0, 3)}`;
  if (national.length < 3) return formatted;

  formatted += `) ${national.slice(3, 6)}`;
  if (national.length < 6) return formatted;

  formatted += `-${national.slice(6, 8)}`;
  if (national.length < 8) return formatted;

  formatted += `-${national.slice(8, 10)}`;
  return formatted;
}

export function normalizeRussianPhone(value: string) {
  const formatted = formatRussianPhone(value);
  return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formatted)
    ? formatted
    : "";
}

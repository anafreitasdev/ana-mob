/**
* Formats a numeric value in Brazilian currency (R$).

*
* @param value The numeric value to be formatted.

* @returns The value formatted as Brazilian currency.
 */
export function formatPtBrMoney(value: string): string {
  const digits = clampPtBrMoneyCentsDigits(value.replace(/\D/g, ''));
  if (!digits) {
    return '';
  }

  const centsValue = digits.padStart(3, '0');
  const integerPart = centsValue.slice(0, -2);
  const decimalPart = centsValue.slice(-2);

  const normalizedIntegerPart = integerPart.replace(/^0+(?=\d)/, '');
  const formattedIntegerPart = (normalizedIntegerPart || '0').replace(
    /\B(?=(\d{3})+(?!\d))/g,
    '.',
  );

  return `R$ ${formattedIntegerPart},${decimalPart}`;
}

/**
* Parses a Brazilian currency value (R$) to a numeric value.

*
* @param value The Brazilian currency value to be parsed.

* @returns The parsed numeric value.
 */
export function parsePtBrMoneyToNumber(value: string): number {
  const digits = clampPtBrMoneyCentsDigits(value.replace(/\D/g, ''));
  if (!digits) {
    return NaN;
  }

  return Number(digits) / 100;
}

const MAX_PT_BR_MONEY_CENTS_DIGITS = '100000000000';

function clampPtBrMoneyCentsDigits(value: string): string {
  const normalized = value.replace(/^0+/, '') || '0';

  if (normalized.length > MAX_PT_BR_MONEY_CENTS_DIGITS.length) {
    return MAX_PT_BR_MONEY_CENTS_DIGITS;
  }

  if (
    normalized.length === MAX_PT_BR_MONEY_CENTS_DIGITS.length &&
    normalized > MAX_PT_BR_MONEY_CENTS_DIGITS
  ) {
    return MAX_PT_BR_MONEY_CENTS_DIGITS;
  }

  return normalized === '0' ? '' : normalized;
}

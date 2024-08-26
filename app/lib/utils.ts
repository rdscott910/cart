// @/app/lib/utils.ts
// contains the following functions: 
// - formatDateToLocal
// - dbTimeForHuman
// - formatCurrency
// - formatDescription
// - calcItemPrice
// - calcTotal
// - calcPriceToDollars
// Stream Utils (toDataString)
// - isNil
// - isObject
// - isUndefined
// - toDataString
//
export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const dbTimeForHuman = (str: string) => {
  return str.replace('T', ' ').substring(0, 16);
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDescription = (description: string) => {
  if (!description) {
    return '';
  }
  const maxLength = 50; // Example length, adjust based on your needs
  let trimmedDescription = description.trim();

  if (trimmedDescription.length > maxLength) {
    let shortDescription = trimmedDescription.substring(0, maxLength).trim();
    // remove non-word characters from the end of the string
    shortDescription = shortDescription.replace(/[\W_]+$/, '');
    return `${shortDescription}...`;
  }
  return trimmedDescription;
};

/**
 * Calculates the price of an individual item including its modifiers recursively.
 * - Also used for calculating and displaying parent modifiers that contain nested modifiers prices.
 *
 * @param {object} item - The item || modifier object.
 * @returns {number} - The total price of the item || modifier including its modifiers.
 */
interface Item {
  price?: number | string;
  qty?: number | string;
  modifierGroups?: ModifierGroup[];
}

interface ModifierGroup {
  modifiers?: Item[];
}

export const calcItemPrice = (item: Item): number => {
  const basePrice = Number(item.price) || 0;
  const quantity = Number(item.qty) || 1;

  // Validate base price and quantity to ensure they are not NaN
  if (isNaN(basePrice) || isNaN(quantity)) {
    console.error('Invalid price or quantity for item:', item);
    return 0; // Return 0 if either is invalid
  }

  let itemTotal = basePrice * quantity;

  // Process and sum the cost of all modifiers recursively
  const modifierGroups = item.modifierGroups ?? [];
  if (modifierGroups.length > 0) {
    modifierGroups.forEach((modGroup: ModifierGroup) => {
      const modifiers = modGroup.modifiers ?? [];
      if (modifiers.length > 0) {
        modifiers.forEach((mod: Item) => {
          itemTotal += calcItemPrice(mod); // Recursively calculate modifier price
        });
      }
    });
  }

  return itemTotal;
}

export const calcTotal = (cart: object) => {
  let totalPrice = 0;

  Object.values(cart).forEach((item) => {
    totalPrice += calcItemPrice(item);
  });

  return totalPrice;
}

/**
 * Calculates the total price as dollars from pennies
 * @param {object} item - The item || modifier object.
 * @returns {number} - The total price in dollars to 2 decimal points.
 */
export const calcPriceToDollars = (item: object) => {
  let price = calcItemPrice(item);
  price = price * 0.01;
  return parseFloat(price.toFixed(2));
}

export const isNil = (val: any): val is null | undefined =>
  isUndefined(val) || val === null

export const isObject = (fn: any): fn is Record<string, unknown> =>
  !isNil(fn) && typeof fn === 'object'

export const isUndefined = (obj: any): obj is undefined =>
  typeof obj === 'undefined'

export function toDataString(data: string | Record<string, unknown>): string {
  if (isObject(data)) {
    return toDataString(JSON.stringify(data))
  }

  return data
    .split(/\r\n|\r|\n/)
    .map((line) => `data: ${line}\n\n`)
    .join('')
}
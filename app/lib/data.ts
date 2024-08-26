// @/app/lib/data.ts
export type cartData = {data: {}}; // Initialize cartData as an empty object


// Function to update cartData
// expects a json object and inserts it into cookies
export function updateCartData(data: {data: {}}) {
  console.log('Updating cart data:', data);
  // cartProducts = data;
  const cookies = document.cookie.split(';');
  const cartData = cookies.find((cookie) => cookie.includes('cartData'));
  if (cartData) {
    document.cookie = `cartData=${JSON.stringify(data)}`;
  } else {
    document.cookie = `cartData=${JSON.stringify(data)}; path=/`;
  }
}

// Function to get cartData
// returns the cartData object from cookies if cartID matches the one passed in
// otherwise returns an empty object
export function getCartData(cartID: string) {
  const cookies = document.cookie.split(';');
  const cartData = cookies.find((cookie) => cookie.includes('cartData'));
  if (cartData) {
    const parsedCartData = JSON.parse(cartData.split('=')[1]);
    if (parsedCartData.data.cartID === cartID) {
      return parsedCartData;
    }
  }
  return {};
}
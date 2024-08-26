import { z } from 'zod';

// Define the Modifier schema
const modifierSchema = z.object({
  id: z.string(),
  name: z.string(),
  plu: z.string(),
  qty: z.number().optional(),
  price: z.number().optional(),
});

// Define the ModifierGroup schema
const modifierGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  plu: z.string(),
  modifiers: z.array(modifierSchema),
});

// Define the Item schema
const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  plu: z.string(),
  qty: z.number(),
  price: z.number(),
  image: z.string().optional(),
  modifierGroups: z.array(modifierGroupSchema),
});

// Define the Cart schema
export const cartSchema = z.record(itemSchema);

// Example payload
const payload = {
  "1": {
    "id": "6616bd6bdfcf744da94334f8",
    "name": "Margherita Pizza",
    "plu": "PIZZ-01",
    "qty": 1,
    "price": 500,
    "modifierGroups": [
      {
        "id": "6616bd6bdfcf744da94334f6",
        "name": "Choose your Toppings",
        "plu": "TOPPINGS",
        "modifiers": [
          {
            "id": "6616bd6bdfcf744da94334f5",
            "name": "Extra Cheese",
            "plu": "CHEESE-#O1#-",
            "qty": 1,
            "price": 50
          }
        ]
      }
    ]
  },
  "2": {
    "id": "6616bd6bdfcf744da94334fa",
    "name": "Build your own Pizza",
    "plu": "PIZZ-00",
    "qty": 1,
    "price": 800,
    "image": "https://resizer.staging.deliverect.com/5MNyMulYy0dkj6MCoS6gHsUS19zzouI3Y_y3J39soD4/rt:fill/w:1024/h:1024/g:ce/el:0/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2lrb25hLWJ1Y2tldC1zdGFnaW5nL2ltYWdlcy81ZmY2ZWUwODkzMjhjOGFlZmVlYWJlMzMvaGF3YWlpYW4tNjIyODU1YzdiMzAzZmMwM2ExNDhkZTQ4LmpwZWc=",
    "modifierGroups": [
      {
        "id": "6616bd6bdfcf744da94334f3",
        "name": "Choose your First Topping",
        "plu": "FREE-TOP",
        "modifiers": [
          {
            "id": "6616bd6bdfcf744da94334f0",
            "name": "Red Onion",
            "plu": "RONION-#O0#-"
          }
        ]
      }
    ]
  }
};

// Validate the payload
try {
  cartSchema.parse(payload);
  console.log("Payload is valid");
} catch (e: any) {
  console.error("Payload validation failed:", e.errors);
}
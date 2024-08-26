import { NextRequest, NextResponse } from 'next/server';
import { closeConnection, getCartData, updateCartData, deleteCartData } from '@/app/lib/actions';
// import { z } from 'zod';
// import { EventNotifier, getSSEWriter } from '@/app/lib/stream';
// import { cartSchema } from './types';

// import { getCustomWriter } from '@/app/lib/stream';

// export const dynamic = 'force-dynamic';


// define post and get request methods for the /api/events route
// post request: insert json payload into cookies and send success response
// get request: send the json payload stored in cookies

export async function POST(request: NextRequest) {
  try {
    const payloadData = await request.json();
    const cartID = payloadData.cartID;
    await updateCartData(cartID, payloadData);
    return new NextResponse("Cart data updated successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error updating cart data: ${error.message}`, { status: 500 });
  }
}

// export async function GET(request: NextRequest) {
//   try {
//     await client.connect();
//     const client_db = client.db('cartDB');
//     const url = new URL(request.url);
//     const cartID = url.searchParams.get('cartID')?.toString() || '';
//     const cartData = await getCartData(client_db, cartID);
//     return new NextResponse(JSON.stringify(cartData), { status: 200 });
//   } catch {
//     return new NextResponse("Error fetching cart data", { status: 500 });
//   } finally {
//     await closeConnection(client);
//   }
// }

// type SyncEvents = EventNotifier<{
//   update: {
//     data: z.infer<typeof cartSchema>
//     event: 'update'
//   }
//   complete: {
//     data: z.infer<typeof cartSchema>
//     event: 'update'
//   }
//   close: {
//     data: never
//   }
//   error: {
//     data: never
//   }
// }>

// export async function POST(request: NextRequest) {
//   const payloadData = await request.json();
//   updateCartData(payloadData);
  
//   // Update the cartData with the new data from the webhook
//   const responseStream = new TransformStream();
//   const writer = responseStream.writable.getWriter();
//   const encoder = new TextEncoder();
//   let abort = false;
//   request.signal.onabort = () => {
//     abort = true;
//     writer.close();
//   }
//   const beforeFn = (message: { data: object; event: 'update' }) => {
//     cartSchema.parse(message.data)
//     if (abort) {
//       throw new Error('Abort!')
//     }
//   }

//   // Define the types
//   type Modifier = {
//     id: string;
//     name: string;
//     plu: string;
//     qty?: number;
//     price?: number;
//   };

//   type ModifierGroup = {
//     id: string;
//     name: string;
//     plu: string;
//     modifiers: Modifier[];
//   };

//   type Item = {
//     id: string;
//     name: string;
//     plu: string;
//     qty: number;
//     price: number;
//     image?: string;
//     modifierGroups: ModifierGroup[];
//   };

//   type Cart = Record<string, Item>;

//   const payload: Cart = {
//     1: {
//       id: "6616bd6bdfcf744da94334f8",
//       name: "Margherita Pizza",
//       plu: "PIZZ-01",
//       qty: 1,
//       price: 500,
//       modifierGroups: [
//         {
//           id: "6616bd6bdfcf744da94334f6",
//           name: "Choose your Toppings",
//           plu: "TOPPINGS",
//           modifiers: [
//             {
//               id: "6616bd6bdfcf744da94334f5",
//               name: "Extra Cheese",
//               plu: "CHEESE-#O1#-",
//               qty: 1,
//               price: 50
//             }
//           ]
//         }
//       ]
//     },
//     2: {
//       id: "6616bd6bdfcf744da94334fa",
//       name: "Build your own Pizza",
//       plu: "PIZZ-00",
//       qty: 1,
//       price: 800,
//       image: "https://resizer.staging.deliverect.com/5MNyMulYy0dkj6MCoS6gHsUS19zzouI3Y_y3J39soD4/rt:fill/w:1024/h:1024/g:ce/el:0/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2lrb25hLWJ1Y2tldC1zdGFnaW5nL2ltYWdlcy81ZmY2ZWUwODkzMjhjOGFlZmVlYWJlMzMvaGF3YWlpYW4tNjIyODU1YzdiMzAzZmMwM2ExNDhkZTQ4LmpwZWc=",
//       modifierGroups: [
//         {
//           id: "6616bd6bdfcf744da94334f3",
//           name: "Choose your First Topping",
//           plu: "FREE-TOP",
//           modifiers: [
//             {
//               id: "6616bd6bdfcf744da94334f0",
//               name: "Red Onion",
//               plu: "RONION-#O0#-"
//             }
//           ]
//         }
//       ]
//     }
//   };

//   const syncStatusStream = async (notifier: SyncEvents) => {
//     await new Promise ((resolve) => setTimeout(resolve, 1000));
//     notifier.update({ data: payloadData, event: 'update' }, { beforeFn });
//   }

//   syncStatusStream(getSSEWriter(writer, encoder));

//   return new NextResponse("Cart data updated successfully", { status: 200 });
// }

// export async function GET(request: NextRequest) {
//   const responseStream = new TransformStream();
//   const writer = responseStream.writable.getWriter();
//   const encoder = new TextEncoder();
//   let abort = false;

//   request.signal.onabort = () => {
//     abort = true;
//     writer.close();
//   }
//   const beforeFn = (message: { data: object; event: 'update' }) => {
//     cartSchema.parse(message.data)
//     if (abort) {
//       throw new Error('Abort!')
//     }
//   }

//   // Define the types
//   type Modifier = {
//     id: string;
//     name: string;
//     plu: string;
//     qty?: number;
//     price?: number;
//   };

//   type ModifierGroup = {
//     id: string;
//     name: string;
//     plu: string;
//     modifiers: Modifier[];
//   };

//   type Item = {
//     id: string;
//     name: string;
//     plu: string;
//     qty: number;
//     price: number;
//     image?: string;
//     modifierGroups: ModifierGroup[];
//   };

//   type Cart = Record<string, Item>;

//   const payload: Cart = {
//     1: {
//       id: "6616bd6bdfcf744da94334f8",
//       name: "Margherita Pizza",
//       plu: "PIZZ-01",
//       qty: 1,
//       price: 500,
//       modifierGroups: [
//         {
//           id: "6616bd6bdfcf744da94334f6",
//           name: "Choose your Toppings",
//           plu: "TOPPINGS",
//           modifiers: [
//             {
//               id: "6616bd6bdfcf744da94334f5",
//               name: "Extra Cheese",
//               plu: "CHEESE-#O1#-",
//               qty: 1,
//               price: 50
//             }
//           ]
//         }
//       ]
//     },
//     2: {
//       id: "6616bd6bdfcf744da94334fa",
//       name: "Build your own Pizza",
//       plu: "PIZZ-00",
//       qty: 1,
//       price: 800,
//       image: "https://resizer.staging.deliverect.com/5MNyMulYy0dkj6MCoS6gHsUS19zzouI3Y_y3J39soD4/rt:fill/w:1024/h:1024/g:ce/el:0/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2lrb25hLWJ1Y2tldC1zdGFnaW5nL2ltYWdlcy81ZmY2ZWUwODkzMjhjOGFlZmVlYWJlMzMvaGF3YWlpYW4tNjIyODU1YzdiMzAzZmMwM2ExNDhkZTQ4LmpwZWc=",
//       modifierGroups: [
//         {
//           id: "6616bd6bdfcf744da94334f3",
//           name: "Choose your First Topping",
//           plu: "FREE-TOP",
//           modifiers: [
//             {
//               id: "6616bd6bdfcf744da94334f0",
//               name: "Red Onion",
//               plu: "RONION-#O0#-"
//             }
//           ]
//         }
//       ]
//     }
//   };

//   const syncStatusStream = async (notifier: SyncEvents) => {
//     // stringify the payload

//     await new Promise ((resolve) => setTimeout(resolve, 1000));
//     notifier.update({ data: payload, event: 'update' }, { beforeFn });
//   }

//   syncStatusStream(getSSEWriter(writer, encoder));

//   return new NextResponse(responseStream.readable, {
//     headers: {
//       'Content-Type': 'text/event-stream',
//       'Cache-Control': 'no-cache, no-transform',
//       'Connection': 'keep-alive',
//     },
//   });
// }



// export async function POST(request: Request) {
//   const encoder = new TextEncoder()
  
//   // Create a streaming response
//   const customReadable = new ReadableStream({
//     start(controller) {
//       const message = 'successful connection.';
//       controller.enqueue(encoder.encode(`data: ${message}\n\n`));
//     },
//   });
//   // Return the stream response and keep the connection alive
//   return new Response(customReadable, {
//     // Set the headers for Server-Sent Events (SSE)
//     headers: {
//       Connection: "keep-alive",
//       "Content-Encoding": "none",
//       "Cache-Control": "no-cache, no-transform",
//       "Content-Type": "text/event-stream; charset=utf-8",
//     },
//   })
// }

// export async function POST(request: Request, response: NextResponse) {
//   // Use the writable stream to send data to the client
//   // You can write data to the stream using the write() method
//   const data = await request.json();
//   const writer = getCustomWriter();
//   writer.write(`data: ${JSON.stringify(data)}\n\n`);
//   updateCartData(data);
//   await writer.close();

//   // Remember to end the response when you're done sending data
//   // response.end();
//   return new Response("Cart data updated successfully", { status: 200, headers: {
//     "Content-Encoding": "none",
//     "Cache-Control": "no-cache, no-transform",
//     "Content-Type": "text/event-stream; charset=utf-8",
//   } });
// }


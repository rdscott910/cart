import { NextApiRequest, NextApiResponse } from 'next';
import { updateCartData } from '@/app/lib/data';
const db_client = require('mongodb').MongoClient;
const { MONGODB_URI } = process.env;
const client = new db_client(MONGODB_URI);
let db: any;
let collection: any;
client.connect((err: any) => {
  if (err) {
    console.error(err);
  }
  db = client.db('cartData');
  collection = db.collection('cartData');
});
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { data } = req.body;
    updateCartData(data);
    res.status(200).json({ message: 'Cart data updated successfully' });
  } else if (req.method === 'GET') {
    // get cart data from the database by cartID in request query
    const cartID = req.query.cartID;
    collection.findOne({ cartID }, (
      err: any,
      result: any
    ) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching cart data' });
      } else {
        res.status(200).json(result);
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}



// // Set the allowed methods for the webhook
// const allowedMethods = ['POST'];

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { data } = req.body;

//     // Update the cartData with the new data from the webhook
//     updateCartData(data);

//     // Set the allowed methods in the response header
//     res.setHeader('Allow', allowedMethods);

//     // Send a response back to the webhook sender
//     res.status(200).json({ message: 'Cart data updated successfully' });
//   } else {
//     res.setHeader('Allow', allowedMethods);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { data } = req.body;

//     // Update the cartData with the new data from the webhook
//     updateCartData(data);

//     // Send a response back to the webhook sender
//     res.status(200).json({ message: 'Cart data updated successfully' });
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// Set the allowed methods for the webhook
// const allowedMethods = ['POST'];

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const { data } = req.body;

//   // Update the cartData with the new data from the webhook
//   updateCartData(data);

//   // Set the allowed methods in the response header
//   res.setHeader('Allow', allowedMethods);

//   // Send a response back to the webhook sender
//   res.status(200).json({ message: 'Cart data updated successfully' });
// }

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     return POST(req, res);
//   } else {
//     res.setHeader('Allow', allowedMethods);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// export const dynamic = 'force-dynamic';

// export async function POST(request: Request, response: Response) {
//   // Your code here

//   const writableStream = new WritableStream();
//   const defaultWriter = writableStream.getWriter();
//   const encoder = new TextEncoder();
//   const data = await request.json();
//   const encoded = encoder.encode(data)

//   encoded.forEach((chunk) => {
//     defaultWriter.ready
//       .then(() => defaultWriter.write(chunk))
//       .then(() => {
//         console.log("Chunk written to sink.");
//       })
//       .catch((err) => {
//         console.log("Chunk error:", err);
//       });
//   });

//   // Call ready again to ensure that all chunks are written
//   //   before closing the writer.
//   defaultWriter.ready
//     .then(() => {
//       defaultWriter.close();
//     })
//     .then(() => {
//       console.log("All chunks written");
//     })
//     .catch((err) => {
//       console.log("Stream error:", err);
//     });

  
//   // Create a writable stream to send data to the client
//   const customWritable = new WritableStream({
//     write(chunk) {
//       // Process the received data here
//       // You can send the data to the client using the response object
//       const writer = response.body?.getWriter();
//       writer.write(chunk);
//     },
//   });
  
//   // Use the writable stream to send data to the client
//   // You can write data to the stream using the write() method
  
//   // Remember to end the response when you're done sending data
//   response.end();
// }

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // const data = JSON.parse(text);
    updateCartData(data);
  } catch (error: any) {
    return new Response(`Error parsing the request body ${error.message}`, { status: 400 });
  }
  return new Response('ok', { status: 200 });
}


// const list = document.querySelector("ul");

// function sendMessage(message: string, writableStream: WritableStream) {
//   // defaultWriter is of type WritableStreamDefaultWriter
//   const defaultWriter = writableStream.getWriter();
//   const encoder = new TextEncoder();
//   const encoded = encoder.encode(message);
//   encoded.forEach((chunk) => {
//     defaultWriter.ready
//       .then(() => defaultWriter.write(chunk))
//       .then(() => {
//         console.log("Chunk written to sink.");
//       })
//       .catch((err) => {
//         console.log("Chunk error:", err);
//       });
//   });
//   // Call ready again to ensure that all chunks are written
//   //   before closing the writer.
//   defaultWriter.ready
//     .then(() => {
//       defaultWriter.close();
//     })
//     .then(() => {
//       console.log("All chunks written");
//     })
//     .catch((err) => {
//       console.log("Stream error:", err);
//     });
// }



// sendMessage("Hello, world.", writableStream);

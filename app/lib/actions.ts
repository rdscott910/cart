'use server';
// @/app/lib/actions.ts
import { revalidatePath } from 'next/cache';

const mongodb = require('mongodb').MongoClient;
const { MONGODB_URI } = process.env;


// functions: 
  // openConnectionToCartDB,
  // closeConnection,
  // getCollection, 
  // getCartData,
  // updateCartData,
  // deleteCartData,
  // getCartItems,
  // updateCartItems
//

export async function openConnectionToCartDB(client: any) {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log('Connected to MongoDB');
    return client.db('cartDB');
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
  }
  
  return client.db('cartDB');
}

export async function closeConnection(db_client: any) {
  await db_client.close();
}

export async function getCollection(collectionName: string) {
  
}

// getCartData
export async function getCartData( cartID: string) {
  const client = new mongodb(MONGODB_URI);
  await client.connect();
  const db = client.db('cartDB');
  const collection = db.collection('cart');
  try {
    // const collection = await getCollection('cart');
    const cartData = await collection.findOne({ cartID });
    if (cartData) {
      console.log('Cart data found in db: ', cartData);
      revalidatePath(`/cart/${cartID}`);
      return JSON.parse(JSON.stringify(cartData.data));
    } else {
      console.log('Cart data not found in db');
      return {
        cartID,
        data: {}
      };
    }
  } catch (error){
    console.error('Error fetching cart data: ', error);
  }
}

// updateCartData
export async function updateCartData(cartID: string, data: any) {
  const client = new mongodb(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('cartDB');
    const collection = db.collection('cart');
    const existingCart = await collection.findOne({ cartID });
    if (existingCart) {
      const updateResult = await collection.updateOne({ cartID }, { $set: { data } });
      console.log('Data updated in cart collection db: ', updateResult.modifiedCount);
    } else {
      const insertResult = await collection.insertOne({ cartID, data });
      console.log('Data inserted in cart collection db: ', insertResult.insertedId);
    }
  } catch (error) {
    console.error('Error updating cart data: ', error);
  } finally {
    return true;
  }
  
}

// deleteCartData
export async function deleteCartData(cartID: string) {
  const client = new mongodb(MONGODB_URI);
  await client.connect();
  const db = client.db('cartDB');
  const collection = db.collection('cart');
  await collection.deleteOne({ cartID });
}

// getCartItems
export async function getCartItems(cartID: string) {
  const client = new mongodb(MONGODB_URI);
  await client.connect();
  const db = client.db('cartDB');
  const collection = db.collection('cart');
  const cartItems = await collection.find({ cartID }).toArray();
  return cartItems;
}

// updateCartItems
export async function updateCartItems(cartID: string, items: any[]) {
  const client = new mongodb(MONGODB_URI);
  await client.connect();
  const db = client.db('cartDB');
  const collection = db.collection('cart');
  await collection.deleteMany({ cartID });
  await collection.insertMany(items.map((item) => ({ ...item, cartID })));
}
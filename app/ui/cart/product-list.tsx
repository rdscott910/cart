'use client';
import { getCartData } from "@/app/lib/actions";
import { useState, useEffect } from "react";
import Image  from "next/image";
import { set } from "zod";


export default function ProductList({ cartID }: { cartID: string }) {
  const [cartData, setCartData] = useState(
    { 
      cartID: '', 
      products: []
    }
  );

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartData = await getCartData(cartID);
        setCartData(cartData);
      } catch (error) {
        console.error('Error fetching cart data: ', error);
      }
    };

    const interval = setInterval(fetchCartData, 5000); // Fetch every 5 seconds

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [cartID]);

  


  return (
    <div>
      <div>
          {!cartData.products && <div>No products in your cart.</div>}
          {cartData.products.map((product: any, index: number) => (
            <div key={index}>
              <div className="items-center border-b py-4 gap-1 flex align-top">
                <div className="flex justify-center">
                  <Image src={product.image} alt={product.name} width={16} height={16} className="w-16 h-16 object-cover rounded-lg" />
                </div>
                <div className="grow">
                  <h3 className="font-semibold ml-4 text-left">{product.name}</h3>
                </div>
                <div className="text-lg font-semibold">${product.price}</div>
              </div>
            </div>
          ))}
          <div className="py-2 mt-8 flex justify-end items-center">
            <div className="text-gray-500">Subtotal:</div>
            <div className="font-semibold pl-2 text-right">$42.42</div>
          </div>
        </div>
        <div className="bg-tertiary bg-opacity-30 text-white p-6 mt-2 rounded-lg">
          <h2 className="font-semibold">Checkout</h2>
          <button className="bg-primary m-2 p-4 rounded text-white" type="submit">
            Pay $39.92
          </button>
        </div>
      <pre>{cartID}</pre>
    </div>
  );
}
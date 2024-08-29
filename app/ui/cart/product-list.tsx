'use client';
import { getCartData } from "@/app/lib/actions";
import { useState, useEffect } from "react";
import Image  from "next/image";
import Link from "next/link";
import { calcItemPrice, calcModifierPrice, calcTotal, formatCurrency } from "@/app/lib/utils";


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
    fetchCartData();
    const interval = setInterval(fetchCartData, 5000); // Fetch every 5 seconds

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [cartID]);

  return (
    <div>
      <div>
        {!cartData.products.length && <div className="italic text-gray-400 font-semibold text-lg">No products in your cart.</div>}
        {cartData.products.map((product: any, index: number) => (
          <div key={index} className="border-b-2 border-gray-300 border-dashed pb-2">
            <div className="items-center pt-4 gap-1 flex align-top">
              <div className="flex justify-center">
                <Image src={product.image} alt={product.name} width={40} height={40} className="w-16 h-16 object-cover rounded-lg" />
              </div>
              <div className="grow">
                <h3 className="font-semibold ml-4 text-left">{product.name}</h3>
              </div>
              <div className="text-lg font-semibold">{formatCurrency(calcItemPrice(product))}</div>
            </div>
            {product.modifierGroups && product.modifierGroups.map((modifierGroup: any, index: number) => (
              <div key={index} className="flex justify-between align-top pl-8">
                {modifierGroup.modifiers && modifierGroup.modifiers.map((modifier: any, index: number) => (
                  <div key={index} className="flex justify-between items-center align-top pl-8">
                    <div className="ml-5 text-gray-400">- {modifier.name}</div>
                    <div className="ml-5 text-sm text-gray-400 font-semibold">{formatCurrency(calcModifierPrice(modifier))}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
        <div className="py-2 mt-8 flex justify-end items-center">
          <div className="text-gray-500">Subtotal:</div>
          <div className="font-semibold pl-2 text-right">{formatCurrency(calcTotal(cartData.products))}</div>
        </div>
      </div>
      <div className="bg-tertiary bg-opacity-30 text-white p-6 mt-2 rounded-lg">
        <h2 className="font-semibold">Checkout</h2>
        <Link href={`/cart/${cartID}/success`}>
          <button className="bg-primary m-2 p-4 rounded text-white" type="submit">Pay {formatCurrency(calcTotal(cartData.products))}</button>
        </Link>
      </div>
    </div>
  );
}
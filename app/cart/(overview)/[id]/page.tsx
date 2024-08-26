// app/cart/[id]/page.tsx
import { calcTotal } from '@/app/lib/utils';
import SectionHeaders from '@/app/ui/section-headers';
// import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { cartData } from '@/app/lib/data';
import { cartSchema } from '@/app/api/cart/types';
import { revalidatePath } from 'next/cache';
import { getCartData } from '@/app/lib/actions';
import ProductList from '@/app/ui/cart/product-list';

let cartProducts: any[] = []; // Initialize cartProducts as an empty array

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log(params.id);
  // const { id } = useParams();
  // const client = openNewConnection();
  // const cartProducts = getCartData(client, id.toString());
  // console.log(cartProducts);

  // get cart id from url param [id] and fetch cart data from mongodb
  // useEffect(() => {
  //   const fetchCartData = () => {
  //     console.log("Fetching cart data...");
  //     if (id) {
  //       fetch(`/api/cart/${id}`)
  //         .then(response => response.json())
  //         .then(data => {
  //           // Refresh the route with the response data
  //           // You can use the data to update the state or perform any other actions
  //           console.log(data);
  //           // revalidatePath(`/cart/${id}`);
  //         })
  //         .catch(error => {
  //           console.error("Error fetching cart data:", error);
  //         });
  //     }
  //   };

  //   const interval = setInterval(fetchCartData, 120000); // Fetch every 2 minutes

  //   return () => {
  //     clearInterval(interval); // Clear the interval when the component unmounts
  //   };
  // }, [id]);

  // useEffect(() => {
  //   if (id) {
  //     const eventSource = new EventSource("/api/events");
  //     console.log(eventSource);
  
  //     eventSource.onmessage = (event) => {
  //       try {
  //         const data = JSON.parse(event.data);
  //         setCartData(data);
  //         revalidatePath(`/cart/${id}`);
  //       } catch (error) {
  //         console.error("Invalid JSON format:", error);
  //       }
  //     };
  
  //     eventSource.onerror = (error) => {
  //       console.error("Error connecting to /api/events:", error);
  //     };
  
  //     return () => {
  //       eventSource.close();
  //     };
  //   }
  // }, [id]);

  // const [cart, setCart] = useState<cartData>({});
  
  // const obtainAPIResponse = async (apiRoute: string, apiData: any) => {
  //   // Initiate the first call to connect to SSE API
  //   const apiResponse = await fetch(apiRoute, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "text/event-stream",
  //     },
  //     body: JSON.stringify(apiData),
  //   });
 
  //   if (!apiResponse.body) return;
 
  //   // To decode incoming data as a string
  //   const reader = apiResponse.body
  //     .pipeThrough(new TextDecoderStream())
  //     .getReader();

  //   let incomingData = "";
 
  //   while (true) {
  //     const { value, done } = await reader.read();
  //     if (done) {
  //       setCart({data: JSON.parse(incomingData)});
  //       break;
  //     }
  //     if (value) {
  //       // Do something
  //     }
  //   }
  // };

  // useEffect(() => {
  //   obtainAPIResponse("/api/events", { event: "update" });
  // }, []);

  return (
    <section className="mt-8 block text-center">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className='mt-8'>
        <ProductList cartID={params.id.toString()} />
      </div>
    </section>
  );
}
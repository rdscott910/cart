// app/cart/[id]/page.tsx
import SectionHeaders from '@/app/ui/section-headers';
import ProductList from '@/app/ui/cart/product-list';

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
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
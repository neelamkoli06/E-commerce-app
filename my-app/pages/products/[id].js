import ProductDetails from "@/components/ProductDetails";
import { fetchProductById } from "@/api/Api"; // Import your API function

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const product = await fetchProductById(id);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default function ProductPage({ product }) {
  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetails product={product} />;
}

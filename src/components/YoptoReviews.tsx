import { useEffect, useMemo } from "react";
import { GetSingleProduct_product, GetSingleProduct_product_variants_edges_node } from "../queries/__generated__/GetSingleProduct";
import { Eyebrow } from "./Typography";

interface YoptoProps {
  product: GetSingleProduct_product;
  variant?: GetSingleProduct_product_variants_edges_node;
}

function YoptoReviews({
  product,
  variant
}: YoptoProps) {

  useEffect(() => {
    window.yotpo?.refreshWidgets();
  }, [product])

  const productId = useMemo(() => {
    return Buffer.from(product.id, 'base64').toString('ascii').split('/').pop();
  }, [product.id]);

  return (
    <section className="container max-w-screen-xl mx-auto px-6 font-sans xl:px-0 mt-12 md:mt-24 md:flex">
      <div className="w-full md:w-1/3 pt-10">
        <Eyebrow className="mb-2">What people are saying</Eyebrow>
        <h2 className="font-sans text-4xl md:text-6xl font-bold mb-3 md:mb-4 text-gray-800">
          Product<br/>Reviews
        </h2>
        <div className="yotpo bottomLine text-gray-800 hidden md:block" data-product-id={productId} />
      </div>

      <div className="md:pl-12 w-full md:w-2/3">
        <div className="yotpo yotpo-main-widget"
          data-product-id={productId}
          data-name={product.title}
          data-url={`/shop/${product.handle}`}
          data-image-url={variant?.image?.transformedSrc}>
        </div>
      </div>
    </section>
  );
}

export default YoptoReviews;

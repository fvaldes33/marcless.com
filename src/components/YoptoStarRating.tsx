import { useEffect, useMemo } from "react";
import { GetSingleProduct_product, GetSingleProduct_product_variants_edges_node } from "../queries/__generated__/GetSingleProduct";

interface YoptoProps {
  product: GetSingleProduct_product;
  variant?: GetSingleProduct_product_variants_edges_node;
}

function YoptoStarRating({
  product,
}: YoptoProps) {

  useEffect(() => {
    window.yotpo?.refreshWidgets();
  }, [product])

  const productId = useMemo(() => {
    return Buffer.from(product.id, 'base64').toString('ascii').split('/').pop();
  }, [product.id]);

  return (
    <div className="yotpo bottomLine" data-product-id={productId} />
  )
}

export default YoptoStarRating;

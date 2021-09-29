declare namespace ShopifyBuy {
  export interface Product extends GraphModel {
    /**
     * A product description.
     */
    description: string;

    /**
     * Product unique ID
     */
    id: string | number;

    /**
     * Product unique ID
     */
    handle: string | number;

    /**
     * An Array of Objects that contain meta data about an image including src of the images.
     */
    images: Array<Image>;

    /**
     * All variants of a product.
     */
    variants: Array<ProductVariant>;

    /**
     * Get an array of Product Options. Product Options can be used to define
     * the currently selectedVariant from which you can get a checkout url (ProductVariant.checkoutUrl)
     * or can be added to a cart (Cart.createLineItemsFromVariants).
     */
    options: Array<Option>;

    /**
     * Retrieve variant for currently selected options. By default the first value in each option is selected
     * which means selectedVariant will never be null. With a selectedVariant you can
     * create checkout url (ProductVariant.checkoutUrl) or
     * it can be added to a cart (Cart.createLineItemsFromVariants).
     */
    selectedVariant: ProductVariant;

    /**
     * Retrieve image for currently selected variantImage.
     */
    selectedVariantImage: Image;

    /**
     * A read only Array of Strings represented currently selected option values. eg. ["Large", "Red"]
     */
    selections: Array<string>;

    /**
     * The product title
     */
    title: string;

    /**
     * The product’s vendor name
     */
    vendor: string;
  }

  export interface ProductVariant extends GraphModel {
    /**
     * Variant in stock. Always true if inventory tracking is disabled.
     */
    available: boolean;

    /**
     * Compare at price for variant. The compareAtPrice would be the price of the
     * product previously before the product went on sale.
     */
    compareAtPrice: string;

    /**
     * Price of variant, formatted according to shop currency format string. For instance "$10.00"
     */
    formattedPrice: string;

    /**
     * Variant weight in grams. If no weight is defined grams will be 0.
     */
    grams: number;

    /**
     * Variant unique ID
     */
    id: string | number;

    /**
     * Image for variant
     */

    image: Image;

    /**
     * Image variants available for a variant.
     */
    imageVariant: Array<ImageVariant>;

    /**
     * Option values associated with this variant, ex {name: "color", value: "Blue"}
     */
    optionValues: Array<OptionValue>;

    /**
     * Price of the variant. The price will be in the following form: "10.00"
     */
    price: string;

    /**
     * Variant parent product
     */
    product: Product;

    /**
     * ID of product variant belongs to
     */
    productId: string | number;

    /**
     * Title of product variant belongs to
     */
    productTitle: string;

    /**
     * Title of variant
     */
    title: string;

    /**
     * Sku of variant
     */
    sku: string;

    /*
     * Get a checkout url for a specific product variant.
     * You can optionally pass a quantity.
     * If no quantity is passed then quantity will default to 1.
     */
    checkoutUrl(quantitiy: number): string;
  }

  export interface LineItem extends GraphModel {
    /**
     * Compare at price for variant. The compareAtPrice would be the price of the product
     * previously before the product went on sale.
     * If no compareAtPrice is set then this value will be null. An example value: "5.00".
     */
    compareAtPrice: string | null;

    /**
     * Variant's weight in grams. If no weight is set then 0 is returned.
     */
    grams: number;

    /**
     * A line item ID.
     */
    id: string | number;

    /**
     * Variant's image.
     */
    image: Image;

    /**
     * The total price for this line item. For instance if the variant costs 1.50 and you have a
     * quantity of 2 then line_price will be 3.00.
     */
    linePrice: string;

    /**
     * Price of the variant. For example: "5.00".
     */
    price: string;

    /**
     * ID of variant's product.
     */
    productId: string | number;

    /**
     * Count of variants to order.
     */
    quantity: number;

    /**
     * Product title of variant's parent product.
     */
    title: string;

    /**
     * Variant object
     */
    variant: ProductVariant;

    /**
     * ID of line item variant.
     */
    variantId: string | number;

    /**
     * Title of variant.
     */
    variantTitle: string;
  }

  /**
   * Internal Image description
   */
  export interface Image extends GraphModel {
    id: string | number;
    created_at: string;
    position: number;
    updated_at: string;
    product_id: string;
    src: string;
    altText?: string;
    variant_ids: Array<string>;
  }

  export interface Cart extends GraphModel {
    /**
     * Get checkout URL for current cart
     */
    checkoutUrl: string;

    /**
     * Get checkout URL for current cart
     */
    webUrl: string;

    /**
     * get ID for current cart
     */
    id: string | number;

    /**
     * Gets the total quantity of all line items. Example: you've added two variants
     * with quantities 3 and 2. lineItemCount will be 5.
     */
    lineItemCount: number;

    /**
     * Get an Array of CartLineItemModel's
     */
    lineItems: LineItem[];

    /**
     * Get current subtotal price for all line items, before shipping, taxes, and discounts.
     * Example: two items have been added to the cart that cost $1.25 then the subtotal will be 2.50
     */
    subtotalPrice: string;

    /**
     * Get current subtotal price for all line items, before shipping, taxes, and discounts.
     * Example: two items have been added to the cart that cost $1.25 then the subtotal will be 2.50
     */
    totalTax: string;

    /**
     * Get current subtotal price for all line items, before shipping, taxes, and discounts.
     * Example: two items have been added to the cart that cost $1.25 then the subtotal will be 2.50
     */
    totalPrice: string;

    /**
     * Get completed at date.
     */
    completedAt: string | null;
  }
}

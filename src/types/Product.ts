export type Product = {
  id: ProductID;
  title: ProductTitle;
  description: ProductDescription;
  price: ProductPrice;
  discountPercentage: ProductDiscountPercentage;
  rating: ProductRating;
  stock: ProductStock;
  brand: ProductBrand;
  category: ProductCategory;
  thumbnail: ProductThumbnail;
  images: ProductImages;
};

export type ProductInCart = Product & {
  quantity: ProductQuantity;
  subTotal: SubTotal;
};

export type Cart = {
  subTotal: SubTotal;
  currency: string;
  products: ProductsInCart;
  totalItems: number;
};

export type SubTotal = {
    withDiscount: number;
    withoutDiscount: number;
};

export type Products = Product[];
export type ProductsInCart = ProductInCart[];

export type ProductID = string | number;
export type ProductTitle = string;
export type ProductDescription = string;
export type ProductPrice = number;
export type ProductDiscountPercentage = number;
export type ProductRating = number;
export type ProductStock = number;
export type ProductBrand = string;
export type ProductCategory = string;
export type ProductThumbnail = ImageURL;
export type ProductImage = ImageURL;
export type ProductImages = ProductImage[];
export type ProductQuantity = number;

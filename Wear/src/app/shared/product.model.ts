export class Product {
  productId: number;
  gender: string;
  category: string;
  subCategory: string;
  productType: string;
  color: string;
  usage: string;
  productTitle: string;
  productImg: string;
  price: number;

  constructor(
    productId: number,
    gender: string,
    category: string,
    subCategory: string,
    productType: string,
    color: string,
    usage: string,
    productTitle: string,
    productImg: string,
    price: number
  ) {
    this.productId = productId;
    this.gender = gender;
    this.category = category;
    this.subCategory = subCategory;
    this.productType = productType;
    this.color = color;
    this.usage = usage;
    this.productTitle = productTitle;
    this.productImg = productImg;
    this.price = price;
  }
}

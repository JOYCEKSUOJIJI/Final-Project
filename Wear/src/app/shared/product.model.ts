export class Product {
  ProductId: number;
  Gender: string;
  Category: string;
  SubCategory: string;
  ProductType: string;
  Colour: string;
  Usage: string;
  ProductTitle: string;
  ImageURL: string;
  Price: number;

  constructor(
    ProductId: number,
    Gender: string,
    Category: string,
    SubCategory: string,
    ProductType: string,
    Colour: string,
    Usage: string,
    ProductTitle: string,
    ImageURL: string,
    Price: number
  ) {
    this.ProductId = ProductId;
    this.Gender = Gender;
    this.Category = Category;
    this.SubCategory = SubCategory;
    this.ProductType = ProductType;
    this.Colour = Colour;
    this.Usage = Usage;
    this.ProductTitle = ProductTitle;
    this.ImageURL = ImageURL;
    this.Price = Price;
  }
}

import { ProductInputType } from "./ProductInputType";
import { Product } from "../../entities/Product";
import { createResolver } from "../shared/BaseResolver";

export const CreateProductResolver = createResolver(
  "Product",
  Product,
  ProductInputType,
  Product
);
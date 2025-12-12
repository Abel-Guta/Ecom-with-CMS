import { type SchemaTypeDefinition } from "sanity";
import { productType } from "./productType";
import { categoryType } from "./categoryType";
import { orderType } from "./orderType";
import { saleType } from "./saleType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, orderType, saleType],
};

import { popularProducts } from "../data";
import Product from "./Product";
import { ContainerProducts } from "./Styled_components";

const Products = () => {
  return (
    <ContainerProducts>
      {popularProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </ContainerProducts>
  );
};

export default Products;

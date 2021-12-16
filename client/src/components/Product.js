import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import {
  InfoProduct,
  ContainerProduct,
  CircleProduct,
  ImageProduct,
  IconProduct,
} from "./Styled_components";
import { Link } from "react-router-dom";

const Product = ({ value }) => {
  return (
    <ContainerProduct>
      <CircleProduct />
      <ImageProduct src={value.img} />
      <InfoProduct>
        <IconProduct>
          <ShoppingCartOutlined />
        </IconProduct>
        <IconProduct>
          <Link to={`/product/${value.id}`}>
            <SearchOutlined />
          </Link>
        </IconProduct>
        <IconProduct>
          <FavoriteBorderOutlined />
        </IconProduct>
      </InfoProduct>
    </ContainerProduct>
  );
};

export default Product;

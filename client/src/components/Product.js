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

const Product = ({ item }) => {
  return (
    <ContainerProduct>
      <CircleProduct />
      <ImageProduct src={item.img} />
      <InfoProduct>
        <IconProduct>
          <ShoppingCartOutlined />
        </IconProduct>
        <IconProduct>
          <Link to={`/product/${item._id}`}>
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

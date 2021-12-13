import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import {
  ContainerNavbar,
  WrapperNavbar,
  LeftNavbar,
  GenreNavbar,
  SearchContainerNavbar,
  InputNavbar,
  ButtonNavbar,
  CenterNavbar,
  RightNavbar,
  MenuItemNavbar,
} from "./Styled_components";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ContainerNavbar>
      <WrapperNavbar>
        <LeftNavbar>
          <GenreNavbar></GenreNavbar>
          <SearchContainerNavbar>
            <InputNavbar placeholder="Búsqueda" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainerNavbar>
        </LeftNavbar>
        <CenterNavbar>
          <Link to={`/`}>
            <ButtonNavbar>Cidenet Shop</ButtonNavbar>
          </Link>
        </CenterNavbar>
        <RightNavbar>
          <MenuItemNavbar>REGISTER</MenuItemNavbar>
          <MenuItemNavbar>SIGN IN</MenuItemNavbar>
          <Link to="/cart">
            <MenuItemNavbar>
              <Badge badgeContent={2} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItemNavbar>
          </Link>
        </RightNavbar>
      </WrapperNavbar>
    </ContainerNavbar>
  );
};

export default Navbar;

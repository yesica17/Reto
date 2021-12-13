import { Add, Remove } from "@material-ui/icons";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  ContainerProd,
  WrapperProd,
  ImgContainerProd,
  ImageProd,
  InfoContainer,
  TitleProd,
  DescProd,
  Price,
  FilterContainer,
  Filter,
  FilterTitle,
  FilterColor,
  FilterSize,
  FilterSizeOption,
  AmountContainer,
  Amount,
  AddContainer,
  ButtonProd,
} from "../components/Styled_components";

const Product = () => {
  return (
    <ContainerProd>
      <Navbar />
      <Announcement />
      <WrapperProd>
        <ImgContainerProd>
          <ImageProd src="https://i.ibb.co/S6qMxwr/jean.jpg" />
        </ImgContainerProd>
        <InfoContainer>
          <TitleProd>Denim Jumpsuit</TitleProd>
          <DescProd>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
            iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
            tristique tortor pretium ut. Curabitur elit justo, consequat id
            condimentum ac, volutpat ornare.
          </DescProd>
          <Price>$ 20</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>1</Amount>
              <Add />
            </AmountContainer>
            <ButtonProd>ADD TO CART</ButtonProd>
          </AddContainer>
        </InfoContainer>
      </WrapperProd>
      <Footer />
    </ContainerProd>
  );
};

export default Product;

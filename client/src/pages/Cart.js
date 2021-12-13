import { Add, Remove } from "@material-ui/icons";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  ContainerCart,
  WrapperCart,
  TitleCart,
  TopCart,
  TopButtonCart,
  TopTexts,
  TopText,
  BottomCart,
  InfoCart,
  ProductCart,
  ProductDetail,
  ImageCart,
  DetailsCart,
  ProductName,
  ProductId,
  ProductColor,
  ProductSize,
  PriceDetail,
  ProductAmountContainer,
  ProductAmount,
  ProductPrice,
  HrCart,
  Summary,
  SummaryTitle,
  SummaryItem,
  SummaryItemText,
  SummaryItemPrice,
  ButtonCart,
} from "../components/Styled_components";

const Cart = () => {
  return (
    <ContainerCart>
      <Navbar />
      <Announcement />
      <WrapperCart>
        <TitleCart>YOUR BAG</TitleCart>
        <TopCart>
          <TopButtonCart>CONTINUE SHOPPING</TopButtonCart>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
          </TopTexts>
          <TopButtonCart type="filled">CHECKOUT NOW</TopButtonCart>
        </TopCart>
        <BottomCart>
          <InfoCart>
            <ProductCart>
              <ProductDetail>
                <ImageCart src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" />
                <DetailsCart>
                  <ProductName>
                    <b>Product:</b> JESSIE THUNDER SHOES
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                  <ProductColor color="black" />
                  <ProductSize>
                    <b>Size:</b> 37.5
                  </ProductSize>
                  <TopButtonCart>Eliminar producto</TopButtonCart>
                </DetailsCart>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>2</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$ 30</ProductPrice>
              </PriceDetail>
            </ProductCart>
            <HrCart />
          </InfoCart>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <ButtonCart>CHECKOUT NOW</ButtonCart>
          </Summary>
        </BottomCart>
      </WrapperCart>
      <Footer />
    </ContainerCart>
  );
};

export default Cart;

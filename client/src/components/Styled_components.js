import styled, { css } from "styled-components";
import { mobile } from "../responsive";

// --------------------------Announcement------------------------
export const ContainerAnnouncement = styled.div`
  height: 35px;
  background-color: CadetBlue;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

// -------------------------------Footer-----------------------
export const ContainerFooter = styled.div`
  display: flex;
  background-color: black;
  ${mobile({ flexDirection: "column" })}
`;

export const LeftFooter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const LogoFooter = styled.h5`
color: white;
`;

export const DescFooter = styled.p`
  margin: 20px 0px;
  text-align: justify;  
  
`;

export const SocialContainerFooter = styled.div`
  display: flex;
`;

export const SocialIconFooter = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

export const CenterFooter = styled.div`
  flex: 1;
  padding: 10px;
  ${mobile({ display: "none" })}
`;

export const TitleFooter = styled.h5`
  margin-bottom: 30px;
  color: white;
`;
export const RightFooter = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

export const ContactItemFooter = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

// ---------------------------Navbar------------------------
export const ContainerNavbar = styled.div`
  height: 70px;
  ${mobile({ height: "50px" })}
`;

export const WrapperNavbar = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

export const LeftNavbar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const SearchContainerNavbar = styled.div`
  border: 0.5px solid lightgray;
  width:35%;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

export const InputNavbar = styled.input`
  border: none;
  width:100%;
  ${mobile({ width: "50px" })}
`;

export const ButtonNavbar = styled.button`
  padding: 10px;
  font-size: 30px;
  color: white;
  font-weight: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const CenterNavbar = styled.div`
  flex: 1;
  text-align: center;
`;

export const RightNavbar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

export const MenuItemNavbar = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

// --------------Product---------------------
export const InfoProduct = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;  
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

export const ContainerProduct = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 450px;
  display: flex;  
  flex-direction: column;  
  align-items: center;
  justify-content: center;  
  background-color: white;
  position: relative;
  &:hover ${InfoProduct} {
    opacity: 1;
  }
`;

export const CircleProduct = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

export const ImageProduct = styled.img`
  height: 75%;
  z-index: 2;
`;

export const IconProduct = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: MintCream;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #fff7f7;
    transform: scale(1.1);
  }
`;

export const ColorOption = styled.div`
  width: 20px;
  height: 20px;   
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  border-color: SlateGrey;  
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

export const FilterList= styled.div`
  display: flex;
  align-items: center;
`;

//-------------Products-----------------
export const ContainerProducts = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

//-------------Slider-------------------
export const ContainerSlider = styled.div`
  width: 100%;
  height: 75vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

export const ArrowSlider = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

export const WrapperSlider = styled.div`
  height: 100%;
  display: flex;
  background-color: #fff7f7;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

export const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-size: 100% 100%;
  background-repeat:no-repeat;
  background-size: cover;
  background-image: url(${(props) => props.img});
`;

export const ImgContainerSlider = styled.div`
  height: 100%;
  flex: 1;
`;

export const ImageSlider = styled.img`
  height: 80%;
`;

export const InfoContainerSlider = styled.div`
  flex: 1;
  padding: 70px;  
  
`;

export const TitleSlider = styled.h1`
  font-size: 60px;
  color: white;
  text-align: right;
  text-shadow: 2px 2px 2px gray;
`;

export const DescSlider = styled.p`
  margin: 30px 300px;
  font-size: 20px;
  font-weight: 500;
  text-align: justify;
  letter-spacing: 3px;
  color: white;
`;

export const DescCollection = styled.p`
  margin: 10px 0px;
  text-align: right;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 3px;
  color: white;
`;

export const ButtonSlider = styled.button`
  padding: 10px;
  margin: 10px 500px;
  color: white;
  border-width: 1px;
  border-style: solid;
  border-color: white;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

//-----------------Slider Popular Products--------
export const SlideProducts = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;  
  background-color: white;
`;

//-----------------Login------------------
export const ContainerLogin = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.ibb.co/9pfzxj2/pexels-daniel-adesina-833052.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrapperLogin = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  border-radius: 7px;     
  ${mobile({ width: "75%" })}
`;

export const TitleLogin = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const FormLogin = styled.div`
  display: flex;
  flex-direction: column;  
  align-items: center; 
`;

export const InputLogin = styled.input`
  flex: 1;
  min-width: 80%;
  margin: 10px 0;
  padding: 10px; 
`;

export const ButtonLogin = styled.button`
  width: 60%;
  padding: 10px;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-weight: 600;
  box-shadow: 3px 3px 3px gray;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const LinkLogin = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  font-weight: bolder;
  text-decoration: underline;
  cursor: pointer;
`;

//----------------Register-----------------
export const ContainerRegister = styled.div`
  width: 100vw;
  height: 120vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.ibb.co/DGs3Fmk/pexels-isabella-mariana-1988681.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrapperRegister = styled.div`
  width: 30%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

export const TitleRegister = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const FormRegister = styled.form`
  display: flex;
  flex-wrap: wrap;  
  width: 70%;
  margin: 0 auto;
  justify-content: center;
  border-radius: 7px;
  border-width: 2px;
  border-style: solid;
  border-color: black;
`;

export const InputRegister = styled.input`
  flex: 0.1;
  min-width: 80%;
  margin: 10px 10px 0px 0px;
  padding: 5px;
  &:invalid ~ span {
    display: block;
  }
`;

export const FilterID = styled.select`
  flex: 0.5;
  min-width: 80%;
  margin: 20px 10px 0px 0px;
  padding: 7px;
`;

export const FilterIDOption = styled.option``;

export const AgreementRegister = styled.span`
  font-size: 14px;
  margin: 30px 35px;
  text-align: justify;
  color: LightSlateGray;
`;

export const ButtonRegister = styled.button`
  width: 50%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-weight: 600;
  box-shadow: 3px 3px 3px gray;
`;

export const Error = styled.span`
  font-size: 13px;
  padding: 3px;
  margin-left: 30px;
  margin-right: 40px;
  color: DarkRed;
  font-weight: bold;
  display: none;
  text-align: justify;
`;

//---------------Cart--------------------------
export const ContainerCart = styled.div``;

export const WrapperCart = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

export const TitleCart = styled.h3`
  font-weight: 300;    
  text-align: center;
`;

export const TopCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const TopButtonCart = styled.button`
  padding: 10px;
  width: 60%;
  font-weight: 600;
  cursor: pointer;
  border:-color: yellow;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  box-shadow: 2px 2px 2px black;
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: black;
`;

export const EditButton= styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: DarkBlue
`;


export const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
export const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

export const BottomCart = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

export const InfoCart = styled.div`
  flex: 3; 
`;

export const ProductCart = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;  
  ${mobile({ flexDirection: "column" })}
`;

export const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

export const ImageCart = styled.img`
  width: 200px;
`;

export const DetailsCart = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ProductName = styled.span``;

export const ProductId = styled.span``;

export const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  border-color: SlateGrey; 
  background-color: ${(props) => props.color};
`;

export const ProductSize = styled.span``;

export const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProductAmount = styled.div`
  font-size: 14px;
  margin: 10px;
  ${mobile({ margin: "5px 15px" })}
`;

export const ProductPrice = styled.div`
  font-size: 16px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

export const HrCart = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

export const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

export const SummaryTitle = styled.h1`
  font-weight: bold;
  font-size: 24px;
`;

export const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

export const SummaryItemText = styled.span``;

export const SummaryItemPrice = styled.span``;

export const ButtonCart = styled.button`
  width: 60%;
  padding: 10px;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-weight: 600;
  box-shadow: 3px 3px 3px gray;
`;

//--------------Order----------------
export const ButtonOrder = styled.button`
  width: 30%;
  padding: 10px;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-weight: 600;
  box-shadow: 3px 3px 3px gray;
`;

export const InfoOrder = styled.div`
  flex: 3; 
`;

export const ProductOrder = styled.div`
  display: flex;
  justify-content: space-between; 
  height: 30vh;
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: black;  
  ${mobile({ flexDirection: "column" })}
`;

export const ProductDetailOrder = styled.div`
  flex: 2.5;
  display: flex;  
`;

export const ImageOrder = styled.img`
  width: 150px;
`;

export const ProductTitle = styled.span`
    font-size: 14px;
`;

export const PriceOrder = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

export const DetailsOrder = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

//------------------Product--------------------
export const ContainerProd = styled.div``;

export const WrapperProd = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

export const ImgContainerProd = styled.div`
  flex: 1;
`;

export const ImageProd = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

export const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

export const TitleProd = styled.h3`
  font-weight: bold;
`;

export const DescProd = styled.p`
  margin: 20px 0px;
`;

export const Price = styled.span`
  font-weight: 100;
  font-size: 35px;
`;

export const FilterContainer = styled.div`
  width: 100%;
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

export const Filter = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

export const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

export const FilterColor = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

export const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

export const FilterColorOption = styled.option``;

export const FilterSizeOption = styled.option``;

export const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

export const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

export const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

export const ButtonProd = styled.button`
  padding: 15px;
  background-color: black;
  border-radius: 5px;
  box-shadow: 3px 3px 3px gray;
  color: white;
  cursor: pointer;
  font-weight: 500;
  &:disabled {
    background-color: gainsboro;
    color: gray;
  }
`;

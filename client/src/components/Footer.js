import {
  ContainerFooter,
  LeftFooter,
  LogoFooter,
  DescFooter,
  SocialContainerFooter,
  SocialIconFooter,
  CenterFooter,
  TitleFooter,
  RightFooter,
  ContactItemFooter,
} from "./Styled_components";

import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";

const Footer = () => {
  return (
    <ContainerFooter>
      <LeftFooter>
        <LogoFooter>Cidenet Shop</LogoFooter>
        <DescFooter>
          Cidenet Shop ofrece la moda más actual a los
          mejores precios. Tenemos a su disposición una gran variedad de
          productos, los cuales son renovados cada temporada. Tenemos un equipo que está dedicado a satisfacer tus necesidades y que te contestará a tus dudas con la mayor brevedad posible.
        </DescFooter>
        <SocialContainerFooter>
          <SocialIconFooter color="3B5999">
            <Facebook />
          </SocialIconFooter>
          <SocialIconFooter color="E4405F">
            <Instagram />
          </SocialIconFooter>
          <SocialIconFooter color="55ACEE">
            <Twitter />
          </SocialIconFooter>
          <SocialIconFooter color="E60023">
            <Pinterest />
          </SocialIconFooter>
        </SocialContainerFooter>
      </LeftFooter>
      <CenterFooter></CenterFooter>
      <RightFooter>
        <TitleFooter>Contacto</TitleFooter>
        <ContactItemFooter>
          <Room style={{ marginRight: "10px" }} /> Medellín , Colombia
        </ContactItemFooter>
        <ContactItemFooter>
          <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
        </ContactItemFooter>
        <ContactItemFooter>
          <MailOutline style={{ marginRight: "10px" }} /> contact@cidenet.co
        </ContactItemFooter>
      </RightFooter>
    </ContainerFooter>
  );
};

export default Footer;

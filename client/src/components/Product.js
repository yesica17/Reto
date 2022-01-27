import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { InfoProduct, ContainerProduct, CircleProduct, ImageProduct, IconProduct, ColorOption, FilterList} from "./Styled_components";
import { Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";


const Product = (props) => {   
  
  
  return (
    <ContainerProduct>          
      <ImageProduct src={props.value.img} />     
      <InfoProduct>        
        <IconProduct>
          <Link to={`/product/${props.value.id_product}`}>
            <SearchOutlined />
          </Link>
        </IconProduct>                          
      </InfoProduct> 
      <br/>
      <FilterList>
      {
                   [...new Set(props.value.color)].map((value) => (
      <ColorOption color={value}></ColorOption> ))} </FilterList><br/>
      
      <div style={{ fontSize: 14 }} > <b>{props.value.style} {" "}
          {props.value.brand}{" "} {props.value.category}</b>
      </div>
      
      <div style={{ fontSize: 20 }} ><b>$</b> {(props.value.price / 1000).toFixed(3)}
      </div>
      
      
       
    </ContainerProduct>
  );
};


export default Product;

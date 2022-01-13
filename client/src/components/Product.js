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
          <ShoppingCartOutlined />
        </IconProduct>
        <IconProduct>
          <Link to={`/product/${props.value.id}`}>
            <SearchOutlined />
          </Link>
        </IconProduct>        
        <IconProduct>
          <FavoriteBorderOutlined />
        </IconProduct>                  
      </InfoProduct> 
      <br/>
      <FilterList>
      {[
                    ...new Map(
                      props.value.stock
                        .map((value) => value.color)
                        .map((value) => {
                          return [value.id, value];
                        })
                    ).values(),
                  ].map((value) => (
      <ColorOption color={value.color}></ColorOption> ))} </FilterList><br/>
      
      <div style={{ fontSize: 14 }} > <b>{props.value.styles[0].name} {" "}
          {props.value.brands[0].name}{" "}
          {props.value.categories[0].name}</b>
      </div>
      
      <div style={{ fontSize: 20 }} ><b>$</b> {(props.value.price / 1000).toFixed(3)}
      </div>
      
      
       
    </ContainerProduct>
  );
};


export default Product;

import {Edit, Delete, RemoveRedEye} from "@material-ui/icons";

import { InfoProduct, ContainerProduct, CircleProduct, ImageProduct, IconProduct, ColorOption, FilterList} from "./Styled_components";
import { Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";


const ProductAdmin = (props) => {   
  
  
  return (
    <ContainerProduct>          
      <ImageProduct src={props.value.img} /><br/>     
      <InfoProduct>        
        <IconProduct>          
            <Delete style={{color: "LightSlateGray", fontSize: 20}}/>          
        </IconProduct> 
        <IconProduct>          
            <Edit style={{color: "LightSlateGray", fontSize: 20}}/>          
        </IconProduct>
        <IconProduct>          
            <RemoveRedEye style={{color: "LightSlateGray", fontSize: 20}}/>          
        </IconProduct>                         
      </InfoProduct>   
    </ContainerProduct>
  );
};


export default ProductAdmin;

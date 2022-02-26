import { Input } from "@material-ui/icons";
import { InfoProduct, ContainerProduct, ImageProduct, IconProduct, ColorOption, FilterList } from "./style";
import { Link } from "react-router-dom";

const Product = (props) => {     

    const title = (props.value.style + " " + props.value.brand + " " + props.value.category )
    
  return (
        <ContainerProduct>          
                <ImageProduct src={props.value.img} />     
                <InfoProduct>        
                    <IconProduct>
                    <Link to={`/product/${props.value.id_product}`}>
                        <Input style={{color: "LightSlateGray"}}/>
                    </Link>
                    </IconProduct>                          
                </InfoProduct><br/>
                <FilterList>
                         { [...new Set(props.value.color)].map((value) => (
                            <ColorOption color={value}></ColorOption> ))} 
                </FilterList><br/>        
                <div style={{ fontSize: 14 }} > <p style={{textTransform:"capitalize"}}><b>{title}</b></p></div>                
                <div style={{ fontSize: 20 }} ><b>$</b> {(props.value.price / 1000).toFixed(3)}</div>        
        </ContainerProduct>
  );
};

export default Product;

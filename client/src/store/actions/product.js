import * as creators from "../creators/product";
import { GETData, SETData } from "../../services/WebServices";

import { Alert } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

export const setProduct = (payload) => {
  return {
    type: creators.SET_DETAIL_PRODUCT,
    payload,
  };
};

export const loadProduct = (payload) => {
  return async (dispatch, getState) => {
    await GETData(`product/${payload}`, "GET")
      .then((response) => {
        if (response !== null) {
          dispatch(setProduct(response));
          
        }
      })
      .catch((response) => console.error(response));
  };
};

export const createCart = (payload) => {
  return async (dispatch, getState) => {
    const stock = {
      user: { id: getState().login.user.id },   
      product: { id: getState().product.product.id },
      order: { id: "" },
      req_quantity: payload.req_quantity,
      state_cart: payload.state_cart,
      size: payload.size,
      color: payload.color,
    };
   
    await SETData(`cart`, "POST", stock)
      .then((response) => {
        if (response !== null) {          
          console.log(response);
          if(response === true){
            Alert.error("El producto ya fue agregado")
          }else{Alert.success("El producto ha sido agregado al carrito")}
        } 
      })
      .catch((response) => console.error(response));
  };
};

export const updateViews = (payload) => {
  return async (dispatch, getState) => {
    const data = {
      views: payload.views,      
    };
    await SETData(`product/${payload.id}`, "PUT", data)
      .then((response) => {
        if (response !== null) {
          console.log(response);          
        }
      })
      .catch((response) => console.error(response));
  };
};

export const setStockDto = (payload) => {
  return {
    type: creators.SET_STOCKDTO,
    payload,
  };
};

export const loadStockDto = () => {
  return async (dispatch, getState) => {
    await GETData(`stock/load`, "GET")
      .then((response) => {
        if (response !== null) {
          dispatch(setStockDto(response));         
        }
      })
      .catch((response) => console.error(response));
  };
};

export const createStock = (payload) => {
  return async (dispatch, getState) => {
    await SETData(`stock`, "POST", payload)
      .then((response) => {
       if (response !== null) {          
          console.log(response);
          if(response === true){
            Alert.error("El registro ya existe")
          }else{Alert.success("El registro se ha generado con éxito")}
        } 
      })
      .catch((response) => console.error(response));
  };
};

export const createProduct = (payload) => {
  return async (dispatch, getState) => {
    await SETData(`product`, "POST", payload)
      .then((response) => {
       if (response !== null) {          
          console.log(response);
          Alert.success("El producto ha sido añadido con éxito!")
          
        }else{console.log("fallo")}
      })
      .catch((response) => console.error(response));
  };
};

export const updateProductStatus = (payload) => {
  return async (dispatch, getState) => {
    const data = {
      status_product: false,      
    };
    await SETData(`product/${payload}`, "PUT", data)
      .then((response) => {
        if (response !== null) {
          console.log(response);          
        }
      })
      .catch((response) => console.error(response));
  };
};

export const activeProduct= (payload) => {
  return async (dispatch, getState) => {
    const data = {
      status_product: true,      
    };
    await SETData(`product/${payload}`, "PUT", data)
      .then((response) => {
        if (response !== null) {
          console.log(response);          
        }
      })
      .catch((response) => console.error(response));
  };
};

export const updateProduct = (payload) => {
  return async (dispatch, getState) => {
      const data = {
       desc: payload.desc, 
       img: payload.img,
       price: payload.price,
       categories: [{id: payload.categories[0].id}],
        styles: [{id: payload.styles[0].id}],
        brands: [{id: payload.brands[0].id}]   
    };

    console.log("data update", data)

    await SETData(`product/${payload.id}`, "PUT", data)
      .then((response) => {
          console.log("res actualizado", response)
        if (response !== null) {
          console.log(response);  
          Alert.success("El producto se actualizo con éxito!");       
        }
      })
      .catch((response) => console.error(response));
  };
};


export const deleteStock= (payload) => {
  return async (dispatch, getState) => {
   const data = {
      status_stock: false,    
      available_quantity: 0  
    };
    await SETData(`stock/${payload}`, "PUT", data)
      .then((response) => {
        if (response !== null) {
          console.log(response); 
          Alert.success("El registro se elimino con éxito")         
        }
      })
      .catch((response) => console.error(response));
  };
};

export const updateStock = (payload) => {
  return async (dispatch, getState) => {
    const data = {
      available_quantity: payload.available_quantity,       
    };
    await SETData(`stock/${payload.id}`, "PUT", data)
      .then((response) => {
        if (response !== null) {
          console.log(response); 
          Alert.success("Actualización exitosa")         
        }
      })
      .catch((response) => console.error(response));
  };
};

export const setProductsDtoAdmin = (payload) => {
  return {
    type: creators.SET_PRODUCTSDTO_ADMIN,
    payload,
  };
};

export const loadProductsDtoAdmin = () => {
  return async (dispatch, getState) => {
    await GETData(`product/dtoAdmin`, "GET")
      .then((response) => {
        if (response !== null) {
          dispatch(setProductsDtoAdmin(response));
        }
      })
      .catch((response) => console.error(response));
  };
};
const current = `http://localhost:8000/`;

const token = localStorage.getItem('token');  

const headers_sec= {
      Accept: "application/json",
      "Content-Type": "application/json",
      'token': `Bearer ${token}`
    };

const headers= {
      Accept: "application/json",
      "Content-Type": "application/json",      
    };

const SETData = async (url, method, params, endpoint = current, sec) => {  

  const response = await fetch(`${endpoint}${url}`, {    
    method: method,    
    headers: sec ? headers_sec : headers,
    body: JSON.stringify(params),
  });
  if (response.ok) {
    const body = await response.text().then(response);

    if (body !== "") {
      return JSON.parse(body);
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const GETData = async (url, method, sec = false, endpoint = current ) => {
  

  const response = await fetch(`${endpoint}${url}`, {    
    method: method,    
    mode: "cors",
    headers: sec ? headers_sec : headers,
  });
  if (response.ok) {
    const body = await response.text().then(response);

    if (body !== "") {
      return JSON.parse(body);
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export { SETData, GETData };

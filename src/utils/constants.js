//  const BASE_URL = "/api";

// export { BASE_URL }; 

//dev 
export const BASE_URL = location.hostname === "localhost" ? "http://localhost:7777" : "/api"  ;
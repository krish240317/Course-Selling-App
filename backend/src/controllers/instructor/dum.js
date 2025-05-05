import { ApiResponse } from "../../utils/ApiResponse.js";
const dum = (req, res) => {
    return res.json(new ApiResponse(200,"Verified"));
  };
  
  export default dum;
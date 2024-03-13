import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth";
import AuthService from "../../services/auth.service";

const Login = () => {
  return (
    <Auth submitLabel="Login" onSubmit={async ({username, password}) => {
      let res = await AuthService.login(username, password)
      console.log(res);
      
    }}>
      <Link to={"/register"} style={{alignSelf: "center"}}>
        <MUILink>Register</MUILink>
      </Link>
    </Auth>
  );
};

export default Login;

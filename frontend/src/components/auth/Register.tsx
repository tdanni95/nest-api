import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth";
import AuthService from "../../services/auth.service";

const Register = () => {
  return (
    <Auth
      submitLabel="Register"
      onSubmit={async ({username, password}) => {
        await AuthService.register(username, password)
      }}
    >
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <MUILink>Login</MUILink>
      </Link>
    </Auth>
  );
};

export default Register;

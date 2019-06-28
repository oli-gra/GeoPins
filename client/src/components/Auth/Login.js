import React from "react";
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import { GraphQLClient } from 'graphql-request'
import { GoogleLogin } from 'react-google-login'

const meQu = `
{
  me{
    name,
    email
  }
}`

const Login = ({ classes }) => {

  const onSuccess = async googleUser => {
    const token = googleUser.getAuthResponse().id_token
    const client = new GraphQLClient('https://localhost:4000/graphql', {
      headers: { authorization: token }
    })
    const data = await client.request(meQu)
    console.log(data)
  }

  return <GoogleLogin
    clientId='590162180322-b6jrfkrenndlhaqn6luhfa9j57u3rtjk.apps.googleusercontent.com'
    onSuccess={onSuccess}
    isSignedIn={true}
  />
}

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);

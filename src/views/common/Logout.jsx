import React from "react";
import { getFromStorage } from "../../utility/storage";
import Home from "./Home";
import Login from "./Login";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: "",
    };
  }
  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage("btt_local_storage");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("http://localhost:8765/btt/user/logout?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false,
            });
            // window.location.reload();
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    }
  }
  render() {
    const { isLoading, token } = this.state;
    if (isLoading) {
      return (
        <div className="container mt-5">
          <p>Loading...</p>
        </div>
      );
    }
    console.log("Inside logout render Token: " + token);
    if (!token) {
      return <Login />;
      // return <Home />;
    }
    // else {
    //   return <Login />;
    // }
  }
}

export default Logout;

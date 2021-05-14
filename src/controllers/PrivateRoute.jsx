import React from "react";
import {
  Route,
  Redirect,
  withRouter, // history
} from "react-router-dom";

class PrivateRoute extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       isLogged: false,
  //       isAdmin: false,
  //       loaded: false,
  //     };
  //   }

  // componentDidMount ()  {
  //     this.checkIsLogged();
  // }

  // checkIsLogged = () => { ** queries the server for user status, ie, logged in or not
  //     let check = new Promise(resolve => {
  //         const last_active_client = localStorage.getItem('last_active') ? localStorage.getItem('last_active') : 0;
  //         const data = { payload: last_active_client};
  //         resolve(axios.post('/api-session', data));
  //     })
  //     check.then(response => {
  //         this.setState({
  //             isLogged: response.data.is_logged,
  //             isAdmin: response.data.is_admin,
  //             loaded: true,
  //         })
  //     })
  // }

  render() {
    // const { component: Component, ...rest } = this.props;
    const currentLocation = this.props.location.pathname;

    // if (!this.state.loaded) return null;
    // if (this.props.path.includes('/admin')) { // handles access to admin
    //     if (!this.state.isLogged) {
    //         return <Redirect to={{
    //             pathname: '/login',
    //             state: {from: currentLocation}
    //         }}/>
    //     } else {
    //         return (
    //             <Route {...rest}
    //                 render={props => {
    //                     return this.state.isAdmin === true ? (
    //                         <Component {...props} />
    //                         ):(
    //                         <Redirect to='/' />
    //                         )
    //                 }}
    //             />
    //         )
    //     }
    // } else { // access to non admin pages
    return (
      <Route
        // {...rest}
        render={() => {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: currentLocation },
              }}
            />
          );
          //   this.state.isLogged === true ? (
          //     <Component {...props} />
          //   ) : (
          //     <Redirect
          //       to={{
          //         pathname: "/login",
          //         state: { from: currentLocation },
          //       }}
          //     />
          //   );
        }}
      />
    );
  }
  // }
}

export default withRouter(PrivateRoute);

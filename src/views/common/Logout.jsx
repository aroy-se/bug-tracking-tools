import React from "react";

const Logout = () => {
  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <div>
      <a href="#" onClick={logout()}>
        LOGOUT
      </a>
    </div>
  );
};

export default Logout;

import React, { useState } from "react";
import * as Constants from "../../utility/Constants";

const DeleteUserDetails = () => {
  // To show status message after successful insertion
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    // userId: 0,
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    photo: "",
    email: "",
    mobile: "",
    // language:"",
    moreInfo: "",
  });

  // Handle function
  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    const deleteAnUser = {
      userId: input.userId,
    };
    deleteUserDetails(deleteAnUser);
    // setInput.value = "";
  }
  var deleteUserDetails = (userData) => {
    const parameters = {
      method: "DELETE",
    };
    console.log(Constants.URL + input.userId);
    fetch(Constants.URL + parseInt(input.userId), parameters)
      .then((response) => response.json())
      .then(() => {
        setSuccess(true);
      });
  };
  return (
    <div className="registration_main" border="0">
      <form>
        <table className="registration_table">
          <tr>
            <td></td>
            <td>
              <p className="reg-label">DELETE RECORD</p>
            </td>
          </tr>
          <tr>
            <td>
              <label>USER ID</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="User ID"
                required={true}
                autoComplete="off"
                name="userId"
                value={input.userId}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <label className="insert-status-label" onChange={handleChange}>
                {success && "The record has been deleted successfully!"}
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label></label>
            </td>
            <td className="register-btn-col">
              <input
                type="submit"
                className="register"
                name="submit"
                value="DELETE USER"
                onClick={handleSubmit}
              />
            </td>
          </tr>
        </table>
      </form>
    </div>
    //  </div>
  );
};

export default DeleteUserDetails;

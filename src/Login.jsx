import React, { useEffect, useState } from "react";

let Login = (props) =>{
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [dirty, setDirty] = useState({
      email: false,
      password: false,
    });

    let [errors, setErrors] = useState({
      email: [],
      password: [],
    });

    let [loginMessage, setLoginMessage] = useState("");

    //a function to validate email and password
    let validate = () => {
      //variable to store errorsData
      let errorsData = {};

      //email
      errorsData.email = [];

      //email can't blank
      if (!email) {
        errorsData.email.push("Email can't be blank");
      }

      //email regex
      let validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (email) {
        if (!validEmailRegex.test(email)) {
          errorsData.email.push("Proper email address is expected");
        }
      }

      //password
      errorsData.password = [];

      //password can't blank
      if (!password) {
        errorsData.password.push("Password can't be blank");
      }

      //password regex
      let validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
      if (password) {
        if (!validPasswordRegex.test(password)) {
          errorsData.password.push(
            "Password should be 6 to 15 characters long with at least one uppercase letter, one lowercase letter and one digit"
          );
        }
      }

      setErrors(errorsData);
    };

    useEffect(validate, [email, password]);

    //executes on each render (initial render and state update)
    useEffect(()=>{
      console.log("nothing dependencies")
    });

    //execute only on state update of email and password (and also with initial render) -- componentDidUpdate
    useEffect(()=>{
      console.log("with dependencies array")
    },[email,password]);
    
    //execute only once - on initial render -- componentDidMount
    useEffect(()=>{
      // load dta from db 
      console.log("with empty dependencies array : Login");
      document.title = "Login";
    },[]);

    //execute only once - on component unmounting phase = componentWillUnmount phase
    useEffect(()=>{
      console.log("start unmount phase"); //we have passed [] so once will execute orlse everytime
      return () => { 
          console.log("Component unmounting phase");
      }
    },[]);

    //When the user clicks on Login button
    let onLoginClick = async () => {
      //set all controls as dirty
      let dirtyData = dirty;
      Object.keys(dirty).forEach((control) => {
        dirtyData[control] = true;
      });
      setDirty(dirtyData);

      //call validate
      validate();

      if (isValid()) {
        let response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`,
          { method: "GET" }
        );
        if (response.ok) {
          //Status code is 200
          let responseBody = await response.json();
          if (responseBody.length > 0) {
            props.history.replace("/dashboard");
          } else {
            setLoginMessage(<span className="text-danger">Invalid Login, please try again</span>);
          }
        } else {
          setLoginMessage(<span className="text-danger">Unable to connect to server</span>);
        }
      }
    };

    let isValid = () => {
      let valid = true;

      //reading all controls from errors
      for (let control in errors) {
        if (errors[control].length > 0) valid = false;
      }

      return valid;
    };  
    return <div className="row">
      <div className="col-lg-5 col-md-7 mx-auto">
        <div className="card border-success shadow-lg my-2">
          <div className="card-header border-bottom border-success">
            <h4
              style={{ fontSize: "40px" }}
              className="text-success text-center"
            >
              Login
            </h4>
          </div>

          <div className="card-body border-bottom border-success">
            {/* email starts */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(event)=>{
                    setEmail(event.target.value);
                    console.log(email)
                }}
                onBlur={() => {
                  setDirty({ ...dirty, email: true });
                  validate();
                }}  
              />
              <div className="text-danger">
                {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
              </div>
            </div>
            {/* email ends  */}

            {/* password starts */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(event)=>{
                    setPassword(event.target.value);
                    console.log(password);
                }}
                onBlur={() => {
                  setDirty({ ...dirty, password: true });
                  validate();
                }}
              />
              <div className="text-danger">
                {dirty["password"] && errors["password"][0] ? errors["password"] : ""}
              </div>
            </div>
            {/* password ends  */}
          </div>
          <div className="card-footer text-center">
            <div className="m-1">{loginMessage}</div>
            <button className="btn btn-success m-2" onClick={onLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
};
export default Login;
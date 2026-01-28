import React, { useEffect, useState } from "react";

let Login = () =>{
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

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
      console.log("with empty dependencies array")
    },[]);
    
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
                onChange={(event)=>{
                    setEmail(event.target.value);
                    console.log(email)
                  }}
                placeholder="Email"
              />
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
              />
            </div>
            {/* password ends  */}
          </div>
        </div>
      </div>
    </div>
};
export default Login;
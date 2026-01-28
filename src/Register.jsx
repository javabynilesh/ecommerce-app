import React from 'react';

let Register = () => {

    //execute only once - on initial render -- componentDidMount
    useEffect(()=>{
        // load dta from db 
        console.log("with empty dependencies array : Register");
        document.title = "Register";
    },[]);

    return (
        <div>
            <h1>Register</h1>
        </div>
    );
}

export default Register;
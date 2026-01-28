import React , {useEffect , useState} from 'react';

let Register = () => {

    //execute only once - on initial render -- componentDidMount
    useEffect(() => {
        // load dta from db 
        console.log("with empty dependencies array : Register");
        document.title = "Register";
    }, []);

    return (
        <div className="row">
            <div className="col-lg-6 col-md-7 mx-auto">
                <div className="card border-primary shadow my-2">
                    <div className="card-header border-bottom border-primary">
                        <h4
                            style={{ fontSize: "40px" }}
                            className="text-primary text-center"
                        >
                            Register
                        </h4>
                    </div>

                    <div className="card-body border-bottom">
                        {/* email starts */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="email">
                                Email
                            </label>
                            <div className="col-lg-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    value=""
                                   
                                />
                            </div>
                        </div>
                        {/* email ends */}

                        {/* password starts */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="password">
                                Password
                            </label>
                            <div className="col-lg-8">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    value=""
                                />
                            </div>
                        </div>
                        {/* password ends */}

                        {/* fullName starts */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="fullName">
                                Full Name
                            </label>
                            <div className="col-lg-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    id="fullName"
                                    value=""
                                    
                                />
                            </div>
                        </div>
                        {/* fullName ends */}

                        {/* dateOfBirth starts */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="dateOfBirth">
                                Date of Birth
                            </label>
                            <div className="col-lg-8">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    value=""
                                    
                                />
                            </div>
                        </div>
                        {/* dateOfBirth ends */}

                        {/* gender starts */}
                        <div className="form-group form-row">
                            <label className="col-lg-4">Gender</label>
                            <div className="col-lg-8">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        id="male"
                                        className="form-check-input"
                                        checked=""
                                       
                                    />

                                    <label className="form-check-inline" htmlFor="male">
                                        Male
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        id="female"
                                        className="form-check-input"
                                        checked=""                                       
                                    />

                                    <label className="form-check-inline" htmlFor="female">
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* gender ends */}

                        {/* country starts */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="country">
                                Country
                            </label>
                            <div className="col-lg-8">
                                <select
                                    className="form-control"
                                    name="country"
                                    id="country"
                                    value=""
                                >
                                   
                                </select>
                            </div>
                        </div>
                        {/* country ends */}

                        {/* receiveNewsLetters starts */}
                        <div className="form-group form-row">
                            <label className="col-lg-4"></label>
                            <div className="col-lg-8">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        name="receiveNewsLetters"
                                        value="true"
                                        id="receiveNewsLetters"
                                        className="form-check-input"
                                        checked=""
                                       
                                    />

                                    <label
                                        className="form-check-inline"
                                        htmlFor="receiveNewsLetters"
                                    >
                                        Receive News Letters
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* receiveNewsLetters ends */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
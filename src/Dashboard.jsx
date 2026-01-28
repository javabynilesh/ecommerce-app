import React , {useEffect , useState} from 'react';

let Dashboard = () => {

    //execute only once - on initial render -- componentDidMount
    useEffect(()=>{
        // load dta from db 
        console.log("with empty dependencies array : DashBoard");
        document.title = "DashBoard";
    },[]);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;
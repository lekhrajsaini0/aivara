import React from 'react'
import GenerateDetails from '../components/GeerateDetails'
import HeaderApp from '../components/HeaderApp'
import Header from "../components/HeaderConditional"


const detail = () => {
  // const [token, setToken] = useState(false);
  // useEffect(() => {
  //   setToken(localStorage.getItem("isloggin"));
  // }, []);
  // if (token === null) {
  //   window.location.href = "/";
  // }
  return (
    <div>
     
         <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet"/>
<Header headerWithSignout={true} />
<GenerateDetails/>
    </div>
  );
};

export default detail;

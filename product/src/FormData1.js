import { useContext, useEffect, useState } from "react";
import { UserContext,NameContext } from "./App";

function FormData1(){
    const [country,setCountryName]=useState([]);
    let count = useContext(UserContext)
    let Name=useContext(NameContext);
    console.log("countryList:",country);


    useEffect(()=>{
        const fetchCountries=async()=>{
            try{
                const res=await fetch(`https://api.first.org/data/v1/countries`);
                const response=await res.json();
                const countryList = Object.values(response.data).map(item => item.country).sort();
                console.log("response:-",response);
                setCountryName(countryList);
            }catch(error){
                console.error('error occures:',error)
            }
        }
        fetchCountries();
    },[])

    return(
        <>
        <form>
            <div className="form-group"> 
                <label>{count}</label><br/>
                <label>{Name}</label><br/>
                <label>fullname:</label>
                <input type="text" name="fullname" className="form-control"/>
            </div>

            <div className="form-group"> 
                <label>Email address</label>
                <input type="email" name="email" className="form-control"/>
            </div>

            <div className="form-group"> 
                <label>password</label>
                <input type="password" name="email" className="form-control"/>
            </div>

            <div className="form-group"> 
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" className="form-control"/>
            </div>

            <div className="form-group"> 
                <label>Phone Number</label>
                <input type="text" name="phone" className="form-control"/>
            </div>

            <label>Gender:</label>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" value="Female"></input>
                <label className="form-check-label">Female</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" value="Male"></input>
                <label className="form-check-label">Male</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" value="Other"></input>
                <label className="form-check-label">Other</label>
            </div>

            <label>skill:</label>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="React"></input>
                <label className="form-check-label">React</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Node.js"></input>
                <label className="form-check-label">Node.js</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="MongoDB"></input>
                <label className="form-check-label">MongoDB</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Express"></input>
                <label className="form-check-label">Express</label>
            </div>
    
            <div className="form-group">
                <label>Select Country</label>
                <select className="form-control" name="selectedCountry" value="">
                    <option value="">--select country--</option>
                    {
                        country.map((countryname,index)=>(
                            <option key={index} value={countryname}>
                                {countryname}
                            </option>
                        ))
                    }
                </select>

            </div>
            <button type="submit" className="btn btn-primary">submit</button>
        </form>
        
        </>
    )

}

export default FormData1;
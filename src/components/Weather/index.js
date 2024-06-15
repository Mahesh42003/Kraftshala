import {Component} from 'react'
import { MdDarkMode } from "react-icons/md";
import { CiLight,CiSearch } from "react-icons/ci";
import './index.css'

class Weather extends Component {
    state={currentLocationPincode:"522659",currentWeatherData:{},currentLocation:"",currentCountry:"in",isDark:false,currentDay:"",currentDate:"",currentMonth:"",currentYear:"",currentTime:"",pincode:"",errorMessage:"",currentCity:""}

    componentDidMount(){
        this.timerId=setInterval(this.getWeatherData,1000) //Using ComponentDidMount we can know the imformation of weather every second.
    }  

    
    
    getWeatherData=async() => {
        const {currentLocationPincode,currentCountry,currentCity}=this.state
        const url=currentCity.length === 0 ?`https://api.openweathermap.org/data/2.5/weather?zip=${currentLocationPincode},${currentCountry}&APPID=145fe4391407966c3f4b8e0ca5e35c5e`:`https://api.openweathermap.org/data/2.5/weather?q=${currentCity},${currentCountry}&APPID=145fe4391407966c3f4b8e0ca5e35c5e`
        
        const options={
            method:"GET"   //We have to retrive the data we have to use GET Method.
        } 
        const response=await fetch(url,options) 
        
        if(response.ok === true){             //If the Pincode or Location is valid.
            const data=await response.json()
            const {main}=data 
            const {wind}=data
            const {weather}=data 
            const {name}=data 
            const weatherData={
                presentTemprature:main.temp-273,           //Current Temprature
                minimumTemprature:main.temp_min-273,       //Low Temprature in a day
                maximumTemprature:main.temp_max-273,
                pressure:main.pressure,
                humidity:main.humidity,                   //Humidity
                windSpeed:wind.speed,                     //Speed of the wind for every hour
                presentCondition:weather[0].description   //Description Of the Weather Condition
            }  
            const presentDate=new Date() 
            const result=presentDate.toString().split(" ")   
            const presentHours=presentDate.getHours() < 10 ? `0${presentDate.getHours()}`:`${presentDate.getHours()}`
            const presentMinutes=presentDate.getMinutes() < 10 ? `0${presentDate.getMinutes()}`:`${presentDate.getMinutes()}`
            this.setState({currentWeatherData:weatherData,currentDay:result[0],currentDate:result[2],currentMonth:result[1],currentYear:result[3],currentTime:`${presentHours}:${presentMinutes}`,currentLocation:name,errorMessage:""}) 
        }

        else{                          //If the Pincode is invalid
            const data=await response.json() 
            this.setState({errorMessage:data.message,currentWeatherData:{}})
        }
    } 

    changingMode=() => {                  //Toggling the background
        this.setState((prevState) => ({
            isDark:!prevState.isDark
        }))
    }   

    searchingPincode=(Event) => {             //Holding the value of which has search in the input element
        this.setState({pincode:Event.target.value})
    } 

    clickingSearchButton=() => {              //Onclick on search button it will filter the location based on the input
        const {pincode}=this.state 
        const pincode1=parseInt(pincode)
        
        if(isNaN(pincode) === true){
        this.setState({currentCity:pincode,pincode:"",currentLocationPincode:""})
        }
        else{
            this.setState({currentLocationPincode:pincode1,pincode:"",currentCity:""})
        }
    }

    render(){  
        const {currentWeatherData,isDark,currentLocation,currentDay,currentDate,currentMonth,currentYear,currentTime,pincode,errorMessage}=this.state  
        
        if(errorMessage.length > 0){  //If the errorMessage is not empty
            return(   
                <div className={isDark ? "background-black":"background-white"}>
                 <div className='flexing-of-heading-and-icon'>
                 <h1 className={isDark?"color-white-styling":"color-black-styling"}>Today Weather</h1>
                 <button alt={isDark ? "white":"dark"} onClick={this.changingMode} className='button-styling'>{isDark ?<CiLight className='size-of-icon white-button-styling'/>:<MdDarkMode className='size-of-icon'/>}</button>
                </div>
                <input type="search" placeholder='Enter Any Pincode' className='margin-left-search-button' onChange={this.searchingPincode} value={pincode}/>
                <button alt="search" className='size-of-search-icon' onClick={this.clickingSearchButton}><CiSearch/></button>
                <div className='flexing-of-not-found-image'>
                    <img src="https://static.vecteezy.com/system/resources/previews/028/116/820/original/magnifying-glass-weather-report-icon-symbols-search-discovery-cloud-research-analysis-concept-3d-isolated-illustration-design-cartoon-pastel-minimal-style-for-design-ux-ui-print-ad-vector.jpg" alt="Not Found" className='Not-Found-image'/>
                    <h1 className={isDark?"color-white-styling":"color-black-styling"}>{errorMessage}</h1>
                </div>
                </div>
            )
        } 
        return(
            <div className={isDark ? "background-black":"background-white"}>
                <div className='flexing-of-heading-and-icon'>
                <h1 className={isDark?"color-white-styling":"color-black-styling"}>Today Weather</h1>
                <button alt={isDark ? "white":"dark"} onClick={this.changingMode} className='button-styling'>{isDark ?<CiLight className='size-of-icon white-button-styling'/>:<MdDarkMode className='size-of-icon'/>}</button>
                </div>
                <input type="search" placeholder='Enter Any Pincode' className='margin-left-search-button' onChange={this.searchingPincode} value={pincode}/>
                <button alt="search" className='size-of-search-icon' onClick={this.clickingSearchButton}><CiSearch/></button>
                <div className='alignment-of-weather-data'>
                    <h1 className={isDark?"color-white-styling":"color-black-styling"}>{currentLocation}</h1> 
                    <p className={isDark?"color-white-styling":"color-black-styling"}>{currentDay} {currentDate} {currentMonth} {currentYear} {currentTime}</p>
                    <div className='flexing-image-and-temprature'>
                    <img src="https://i.im.ge/2024/06/14/KWN5Hp.WhatsApp-Image-2024-06-14-at-10-15-40-PM.jpeg" alt="clouds" className='clouds-size'/>
                    <h1 className={isDark?"color-white-styling margin-left-of-temprature":"color-black-styling margin-left-of-temprature"}>{Math.ceil(currentWeatherData.presentTemprature)}<sup>o</sup> C</h1>
                    <p className={isDark?"color-white-styling margin-left-of-temprature sizeOfthefont":"color-black-styling margin-left-of-temprature sizeOfthefont"}>{currentWeatherData.presentCondition}</p>
                    </div>
                </div> 
                <div className='flexing-of-weather-items'> 
                    <div>
                    <p className={isDark?"color-white-styling":"color-black-styling"}>{Math.ceil(currentWeatherData.maximumTemprature)}<sup>o</sup>c</p> 
                    <h3 className={isDark?"color-white-styling":"color-black-styling"}>max</h3>
                    </div> 
                    <div>
                        <p className={isDark?"color-white-styling":"color-black-styling"}>{currentWeatherData.windSpeed} kmph</p>
                        <h3 className={isDark?"color-white-styling":"color-black-styling"}>wind</h3> 
                    </div> 
                    <div>
                        <p className={isDark?"color-white-styling":"color-black-styling"}>{currentWeatherData.humidity}%</p>
                        <h3 className={isDark?"color-white-styling":"color-black-styling"}>Humidity</h3>
                    </div> 
                    <div>
                        <p className={isDark?"color-white-styling":"color-black-styling"}> {Math.ceil(currentWeatherData.minimumTemprature)}<sup>o</sup>c</p>
                        <h3 className={isDark?"color-white-styling":"color-black-styling"}>min</h3>
                    </div>
                </div>
            </div>
        ) 
    } 
} 
export default Weather

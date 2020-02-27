import React from 'react';
import './App.css';

// weather API: appid=ae1a61d946925e8eb436efb450fe5979
// Giphy API key: w1JVUVzl5TudBQCsIZNcxJ36k2F2dtoB

function WeatherDisplay(props) {
  return (
    <div className='dayDisp'>
      <div id='city'>
        <p>City: {props.dayData.city} </p>
      </div>
      <div className='box'>
        <div id='box1'><br />
          <p>{props.dayData.date} </p>
          <p>Feels Like: {props.dayData.feels} C</p>
          <p>{props.dayData.overcast} </p>
        </div>
        <div id='temp'>
          <p>Temperature: {props.dayData.temp} C</p>
          <p>Lowest: {props.dayData.low} C</p>
          <p>Highest: {props.dayData.high} C</p>
        </div>
      </div>
      <div id='extra'>
        <p>Pressure: {props.dayData.pressure} Pa</p>
        <p>Wind: {props.dayData.wind} km/h</p>
        <p>Humidity: {props.dayData.humidity} %</p>
      </div>
    </div>
  )
}

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      //#region
      //MULTIPLE DATES:
      // days: [
      //   {
      //   date: '5/25/2050',
      //   temp: '289',
      //   tempFeel: '378',
      //   tempMin: '289',
      //   tempMax: '342',
      //   pressure: '1004',
      //   seaLevel: '1004',
      //   gndLevel: '1000',
      //   humidity: '60',
      //   overcast: 'clouds'
      //   },
        // {
        // date: '7/30/2050',
        // temp: '32',
        // tempFeel: '555',
        // tempMin: '282349',
        // tempMax: '342342',
        // pressure: '1004',
        // seaLevel: '100344',
        // gndLevel: '1000',
        // humidity: '620',
        // overcast: 'sunny'
        // },
        // {
        // date: '7/23/2050',
        // temp: '32',
        // tempFeel: '555',
        // tempMin: '282349',
        // tempMax: '342342',
        // pressure: '1004',
        // seaLevel: '100344',
        // gndLevel: '1000',
        // humidity: '620',
        // overcast: 'sunny'
        // },
        // {
        // date: '7/10/2050',
        // temp: '32',
        // tempFeel: '555',
        // tempMin: '282349',
        // tempMax: '342342',
        // pressure: '1004',
        // seaLevel: '100344',
        // gndLevel: '1000',
        // humidity: '620',
        // overcast: 'sunny'
        // },
        // {
        // date: '7/5/2050',
        // temp: '32',
        // tempFeel: '555',
        // tempMin: '282349',
        // tempMax: '342342',
        // pressure: '1004',
        // seaLevel: '100344',
        // gndLevel: '1000',
        // humidity: '620',
        // overcast: 'sunny'
        // },
      //],
      //#endregion
      date: '2020-05-12',
      temp: '243',
      feels: '244',
      overcast: 'clouds',
      high: '344',
      low: '323',
      wind: '33',
      pressure: '33',
      humidity: '33',
      city: 'toronto',
      value: ''
    }

    this.updateCity = this.updateCity.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.city !== this.state.city) {
      this.fetchData();
    }
  }

  async fetchData() {
    try {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=ae1a61d946925e8eb436efb450fe5979`)
      let data = await response.json();

      //let date = (new Date()).toISOString().split('T')[0];  //LEARNED: .toISOString() to switch from new Date() to YYYY-MM-DD format
      //#region
      //code below to update - MULTIPLE DATES:
      // let fetchedDate1 = user["list"][0].dt_txt.slice(0, 10);
      // let fetchedDate2 = user["list"][8].dt_txt.slice(0, 10);
      // let fetchedDate3 = user["list"][16].dt_txt.slice(0, 10);
      // let fetchedDate4 = user["list"][24].dt_txt.slice(0, 10);
      // let fetchedDate5 = user["list"][32].dt_txt.slice(0, 10);
      // let dateState = [...this.state.days];
      // let dateItem1 = {...dateState[0]};  // can be = dateState[0]
      // let dateItem2 = {...dateState[1]};
      // let dateItem3 = {...dateState[2]};
      // let dateItem4 = {...dateState[3]};
      // let dateItem5 = {...dateState[4]};
      // dateItem1.date = fetchedDate1;
      // dateItem2.date = fetchedDate2;
      // dateItem3.date = fetchedDate3;
      // dateItem4.date = fetchedDate4;
      // dateItem5.date = fetchedDate5;
      // dateState[0] = dateItem1; //sends modified date back to the variables; this prevents the use of for-loops/HOFs for this code section
      // dateState[1] = dateItem2;
      // dateState[2] = dateItem3;
      // dateState[3] = dateItem4;
      // dateState[4] = dateItem5;
      // this.setState({days: dateState});
      //#endregion

      let newDate = String(new Date()).slice(0,15);
      console.log(newDate);
      this.setState({
        date: newDate,
        temp: Math.round(((data.main.temp) - 273.15), 2),
        feels: Math.round(((data.main.feels_like) - 273.15), 2),
        overcast: data.weather[0].main,
        high: Math.round(((data.main.temp_max) - 273.15), 2),
        low: Math.round(((data.main.temp_min) - 273.15), 2),
        wind: data.wind.speed,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        city: data.name
      })

      //additional response operation (use .map())...
    } catch(err) {
      console.log(err);
    }
  }

  handleCityChange() {
    this.setState({
      city: this.state.value,
      value: ''
    })
  }

  updateCity(e) {
    const newValue = e.target.value;

    this.setState({
      value: newValue
    })
  }

  render() {
    return(
      <div className='output'>
        <h1>BTS Weather Network</h1>
        <div className='input'>
          <input type='text' placeholder='Please enter city name' name='cityName' onChange={this.updateCity}></input>
          <button onClick={this.handleCityChange}>Forever Young!</button>
        </div>
        <WeatherDisplay 
          dayData={this.state}
        />
      </div>
    )
  }
}

export default App;

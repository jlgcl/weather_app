import React from 'react';
import './App.css';

// weather API: api.openweathermap.org/data/2.5/forecast?q={city name}&appid=ae1a61d946925e8eb436efb450fe5979
// Giphy API key: w1JVUVzl5TudBQCsIZNcxJ36k2F2dtoB

function WeatherDisplay(props) {
  return (
    <div className='dayDisp'>
      {props.dayData.map((day) => (
        <div key={day.date} className='day'>
          <p>Date: {day.date}</p>
          <p>Temperature: {day.temp}</p>
          <p>Feels Like: {day.tempFeel}</p>
          <p>Lowest: {day.tempMin}</p>
          <p>Highest: {day.tempMax}</p>
          <p>Pressure: {day.pressure}</p>
          <p>Sea Level: {day.seaLevel}</p>
          <p>Ground Level: {day.gndLevel}</p>
          <p>Humidity: {day.humidity}</p>
          <p>Cast: {day.overcast}</p>
        </div>
      ))}
    </div>
  )
}

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      days: [
        {
        date: '5/25/2050',
        temp: '289',
        tempFeel: '378',
        tempMin: '289',
        tempMax: '342',
        pressure: '1004',
        seaLevel: '1004',
        gndLevel: '1000',
        humidity: '60',
        overcast: 'clouds'
        },
        {
        date: '7/30/2050',
        temp: '32',
        tempFeel: '555',
        tempMin: '282349',
        tempMax: '342342',
        pressure: '1004',
        seaLevel: '100344',
        gndLevel: '1000',
        humidity: '620',
        overcast: 'sunny'
        },
        {
        date: '7/23/2050',
        temp: '32',
        tempFeel: '555',
        tempMin: '282349',
        tempMax: '342342',
        pressure: '1004',
        seaLevel: '100344',
        gndLevel: '1000',
        humidity: '620',
        overcast: 'sunny'
        },
        {
        date: '7/10/2050',
        temp: '32',
        tempFeel: '555',
        tempMin: '282349',
        tempMax: '342342',
        pressure: '1004',
        seaLevel: '100344',
        gndLevel: '1000',
        humidity: '620',
        overcast: 'sunny'
        },
        {
        date: '7/5/2050',
        temp: '32',
        tempFeel: '555',
        tempMin: '282349',
        tempMax: '342342',
        pressure: '1004',
        seaLevel: '100344',
        gndLevel: '1000',
        humidity: '620',
        overcast: 'sunny'
        },
      ],
      city: 'toronto',
      value: ''
    }

    this.updateCity = this.updateCity.bind(this)
    this.fetchData = this.fetchData.bind(this)
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevState, currentState) {
    //if this.state.city changes, load fetchData again...
  }

  async fetchData() {
    try {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=ae1a61d946925e8eb436efb450fe5979`)
      let user = await response.json();
      console.log(user["list"][0].main["temp"]);

      //additional response operation (use .map())...
    } catch(err) {
      console.log(err);
    }
  }

  handleCityChange() {
    this.setState({
      city: this.state.value
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
          dayData={this.state.days}
        />
      </div>
    )
  }
}

export default App;

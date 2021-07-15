import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Card, CardText, CardBody,
  CardTitle, Col, Row, Container, Form, Input, Button
} from 'reactstrap';
import Temp from "../src/images/hot.png"
import Humidity from "../src/images/humidity.png"
import MinTemp from "../src/images/high-temperature.png"


function App() {
  const [search, setsearch] = useState('')
  const [allData, setAllData] = useState({
    city: '',
    country: '',
    humidity: '',
    temperature: '',
    minTemp: '',
    weatherIcons: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async (city) => {
    try {
      const apiKey = "3f100a7d14d78f500d4db179beb3313e"
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      await setAllData({
        city: res.data.name,
        country: res.data.sys.country,
        humidity: res.data.main.humidity,
        temperature: res.data.main.temp,
        minTemp: res.data.main.temp_min,
        weatherIcons: res.data.weather[0].icon
      })
    }
    catch { }
  }


  const handleSubmit = (event) => {
    console.log(search)
    fetchData(search)
    event.preventDefault()
  };

  const handleChange = event => {
    setsearch(event.target.value);
  };

  return (
    <main>
       <Container fluid>
      <div>
      <Col sm="4" className="main-content">
      <Card className="card-search">
      <Form onSubmit={handleSubmit}>
          <Input placeholder="with a placeholder"
            type="text"
            name="city"
            placeholder="City Name"
            value={search}
            onChange={handleChange}
          />
          <Button for="city">Search</Button>

        </Form>
          </Card>
      </Col>
      </div>
</Container>
      <div>
      </div>
      <Container fluid>
        <div>
          <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
            <CardTitle tag="h5">{allData.city}</CardTitle>
            <CardText>  {allData.country}</CardText>
          </Card>
        </div>
        <div>
          <Row>
            <Col sm="4">
              <Card className="last-child">
                <CardBody>
                  <img src={Humidity} className="weather-image" />
                  <CardTitle tag="h5">HUMIDITY</CardTitle>
                  <CardText className="weather-data">  {allData.humidity}%</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col sm="4">
              <Card className="last-child">
                <CardBody>
                  <img src={Temp} className="weather-image" />
                  <CardTitle tag="h5">TEMPERATURE</CardTitle>
                  <CardText className="weather-data">{allData.temperature}°C</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col sm="4">
              <Card className="last-child">
                <CardBody>
                  <img src={MinTemp} className="weather-image" />
                  <CardTitle tag="h5">MIN TEMPERATURE</CardTitle>
                  <CardText className="weather-data"> {allData.minTemp}°C</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </main >
  );
}

export default App;

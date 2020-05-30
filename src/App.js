import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from "axios";
import Form from "react-bootstrap/Form";

// import Input from "react-bootstrap/Input";
import Columns from "react-columns";
function App() {
const [Latest, setLatest]=useState([]);
const [results, setResults]=useState([]);
const [searchCountries, setSearchCountries]=useState("");
  useEffect (()=>{
    axios.all([
    axios.get("https://disease.sh/v2/all?yesterday=false&allowNull=true"),
     axios.get("https://disease.sh/v2/countries")
    ])
    .then(responseArr=>{
     setLatest(responseArr[0].data);
   setResults(responseArr[1].data)
    })
    .catch(err=>{console.log(err);
    });
  },
  
  
  []);

  const date= new Date(parseInt(Latest.updated));
  const LastUpdated=date.toString()
const filterCountries=results.filter(item=>{
  return searchCountries !== ""? item.country.includes(searchCountries) :item;
})
  const countries=filterCountries.map((data, id)=>{
    return(
    <Card
    key={id}
    //  bg="light"
    //   text="dark"
     bg="secondary" text="white"
       className="text-center" 
       style={{margin:"10px"}}>
          <Card.Img variant="top" src={data.countryInfo.flag} style={{height:"270px"}}/>
    <Card.Body>
    <Card.Title>{data.country}</Card.Title>
   
     <Card.Text>Cases: {data.cases}</Card.Text>
        <Card.Text>Deaths: {data.deaths}</Card.Text>
         <Card.Text>Recovered: {data.recovered}</Card.Text>
          <Card.Text>Active: {data.active}</Card.Text>
           <Card.Text>Today's Cases: {data.todayCases}</Card.Text>
            <Card.Text>Today's Death: {data.todayDeaths}</Card.Text>
     </Card.Body>
     </Card>
    );
  })

   var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];

  return (
    <div className="App">
    <h2 style={{align:"center"}}>Covid-19 live stats</h2>
    <CardDeck>
  <Card bg="dark" text="white" style={{margin:"10px"}}>
    
    <Card.Body>
      <Card.Title>Cases</Card.Title>
      <Card.Text>
     {Latest.cases}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small >Last updated {LastUpdated}</small>
    </Card.Footer>
  </Card>
  <Card bg="danger" text="white" style={{margin:"10px"}}>

    <Card.Body>
      <Card.Title>Deaths</Card.Title>
      <Card.Text>
        {Latest.deaths}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small >Last updated {LastUpdated}</small>
    </Card.Footer>
  </Card>
  <Card bg="success" text="white" style={{margin:"10px"}}>
 
    <Card.Body>
      <Card.Title>Recovered</Card.Title>
      <Card.Text>
      {Latest.recovered}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small >Last updated {LastUpdated}</small>
    </Card.Footer>
  </Card>
</CardDeck>
<br/>
<Form style={{margin:"10px"}}>
       <Form.Group >
        <Form.Label for="exampleEmail">Search</Form.Label>
        <Form.Control type="text" name="text" id="exampleEmail" placeholder="Search a Country"
        onChange={e=> setSearchCountries(e.target.value)} />
      </Form.Group>
      </Form>
<Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default App;

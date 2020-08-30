import React, {useState, useEffect} from 'react';

function StateWiseLevel(props) {
  const [data, setData] = useState(props.data);
  const [confirmed, setConfirmed] = useState(0);
  const [active, setActive] = useState(0);
  const [recoveries, setRecoveries] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [deltas, setDeltas] = useState(0);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    const parseData = () => {
      let confirmed = 0;
      let active = 0;
      let recoveries = 0;
      let deaths = 0;
      let deltas = {};
      data.forEach((state, index) => {
        if (index !== 0) {
          confirmed += parseInt(state.confirmed);
          active += parseInt(state.active);
          recoveries += parseInt(state.recovered);
          deaths += parseInt(state.deaths);
        } else {
          deltas = {
            confirmed: parseInt(state.deltaconfirmed),
            deaths: parseInt(state.deltadeaths),
            recovered: parseInt(state.deltarecovered),
          };
        }
      });
      setConfirmed(confirmed);
      setActive(active);
      setRecoveries(recoveries);
      setDeaths(deaths);
      setDeltas(deltas);
    };
    parseData();
  }, [data]);

  return (
    <React.Fragment>
      
<div className="card-container">
<div className="cardStyle fadeInUp" style={{animationDelay: '1s'}}> 
  <h3 className="card-title is-cherry" style={{color:"#ff073a"}}>Confirmed</h3>
  <div className="bar ">
    <div className="filledbar"></div>
  </div>
  <div className="card-circle">
    <div id="name" style={{color:"#ff073a"}}>
    
        <h1 className="title">{confirmed} </h1>
    </div>
    
  </div>
</div>
<div className="cardStyle fadeInUp" style={{animationDelay: '1s'}}>
  <h3 className="card-title" style={{color:"#007bff"}}>ACTIVE</h3>
  <div className="bar">
    <div className="emptybar"></div>
    <div className="filledbar"></div>
  </div>
  <div className="card-circle">
    <div id="name" style={{color:'#007bff'}}>
    <h1 className="title has-text-info">{active}</h1>
    </div>
    
  </div>
</div>
<div className="cardStyle fadeInUp" style={{animationDelay: '1s'}}>
  <h3 className="card-title" style={{color:"#28a745"}}>RECOVERED </h3>
  <div className="bar">
    <div className="emptybar"></div>
    <div className="filledbar"></div>
  </div>
  <div className="card-circle">
    <div id="name" style={{color:'#28a745'}}>
        <h1 className="title has-text-success">{recoveries} </h1>
    </div>
    
  </div>
</div>
<div className="cardStyle fadeInUp" style={{animationDelay: '1s'}}>
  <h3 className="card-title is-gray" style={{color:"#6c757d"}}>DECEASED</h3>
  <div className="bar">
    <div className="emptybar"></div>
    <div className="filledbar"></div>
  </div>
  
  <div className="card-circle">
    <div id="name" style={{color:'#6c757d'}}>
    
        <h1 className="title has-text-grey">{deaths}</h1>
    </div>
    
  </div>
</div>
</div>



</React.Fragment>
  );
}

export default StateWiseLevel;

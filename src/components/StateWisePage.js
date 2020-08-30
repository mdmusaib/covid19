import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {formatDistance, format} from 'date-fns';
import {
  formatDate,
  formatDateAbsolute,
  validateCTS,
} from '../utils/common-functions';
import * as Icon from 'react-feather';
import {Link} from 'react-router-dom';

// import Table from './table';
import StateWiseTable from './stateTable';
import StateWiseLevel from './stateLevel';
// import Level from './level';
import MapExplorer from './mapexplorer';
import TimeSeries from './timeseries';
import Minigraph from './minigraph';


function StateWisePage(props) {
  const [selectedState,setSelectedState]=useState([]);
  const [states, setStates] = useState([]);
  const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
  /* const [patients, setPatients] = useState([]);*/
  const [fetched, setFetched] = useState(false);
  const [graphOption, setGraphOption] = useState(1);
  const [lastUpdated, setLastUpdated] = useState('');
  const [timeseries, setTimeseries] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [timeseriesMode, setTimeseriesMode] = useState(true);
  const [timeseriesLogMode, setTimeseriesLogMode] = useState(false);
  const [regionHighlighted, setRegionHighlighted] = useState(undefined);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      const [
        response,
        stateDistrictWiseResponse,
        updateLogResponse,
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/state_district_wise.json'),
        axios.get('https://api.covid19india.org/updatelog/log.json'),
      ]);
      setSelectedState(response.data.statewise.filter(state=>state.statecode === 'TT' || state.statecode==='TN'?state:null))
      setStates(response.data.statewise);
      setTimeseries(validateCTS(response.data.cases_time_series));
      setLastUpdated(response.data.statewise[0].lastupdatedtime);
      setStateDistrictWiseData(stateDistrictWiseResponse.data);
      setActivityLog(updateLogResponse.data);
      /* setPatients(rawDataResponse.data.raw_data.filter((p) => p.detectedstate));*/
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  const onHighlightState = (state, index) => {
    if (!state && !index) setRegionHighlighted(null);
    else setRegionHighlighted({state, index});
  };
  const onHighlightDistrict = (district, state, index) => {
    if (!state && !index && !district) setRegionHighlighted(null);
    else setRegionHighlighted({district, state, index});
  };

  return (
    <React.Fragment>
      
          <div className="header main-head fadeInUp" style={{animationDelay: '1s'}}>
            <div className="header-mid">
              <div className="titles">
                <h1>COVID-19 Tracker - India</h1>
              </div>
              <div className="last-update">
                <h6>Last Updated</h6>
                <h6 style={{color: '#28a745', fontWeight: 600}}>
                  {isNaN(Date.parse(formatDate(lastUpdated)))
                    ? ''
                    : formatDistance(
                        new Date(formatDate(lastUpdated)),
                        new Date()
                      ) + ' Ago'}
                </h6>
                <h6 style={{color: '#28a745', fontWeight: 600}}>
                  {isNaN(Date.parse(formatDate(lastUpdated)))
                    ? ''
                    : formatDateAbsolute(lastUpdated)}
                </h6>
              </div>
            </div>
          </div>
  
        <div className="card-design">
        {selectedState.length > 1 && <StateWiseLevel data={selectedState} />}
        </div>

          
      <div className="Container">
          <div className="map_section">
      {fetched && (
            <React.Fragment>
              <MapExplorer
                states={selectedState}
                stateDistrictWiseData={stateDistrictWiseData}
                regionHighlighted={regionHighlighted}
              />
            </React.Fragment>
          )}

          {/* <Minigraph timeseries={timeseries} animate={true} /> */}
          </div>
        <div className="table-section">
        <h5 className="table-fineprint fadeInUp" style={{animationDelay: '1.5s'}}>
        Compiled from State Govt.
      </h5>
    
    <StateWiseTable
            states={selectedState}
            selectedState={selectedState}
            summary={false}
            stateDistrictWiseData={stateDistrictWiseData}
            onHighlightState={onHighlightState}
            onHighlightDistrict={onHighlightDistrict}
          />
         </div>

        
          </div>        
  
         
    
  
         
          
        
        
        
    </React.Fragment>
  );
}

export default StateWisePage;

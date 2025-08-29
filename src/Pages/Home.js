import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'
//import { Rosters } from "../Composables/useRosters.js"
import "../CSS/Home.css"
import {Roster} from "../DataStructures/Roster";
import {globalRosters} from "../Composables/useRosters";
import {NavigateForwards} from "../Navigator";
import Header from "../Components/Header";
import {getL, swapLNG} from "../Composables/useLexicon";




const Home = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const passedData = location.state;

    const [slots, setSlots] = useState(12);
    const [rostersSelected, setRostersSelected] = useState([]);
    const [emptySlots, setEmptySlots] = useState(0);
    const [rosters, setRosters] = useState([new Roster('name', 'pikachu')]);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [path, setPath] = useState('');
    const [text, setText] = useState({
        homeHeader: "Welcome to DraftDex",
        homeHeader2: "Select two rosters to begin comparing or create a new roster to add to the draft",
        newRoster: "+ New Roster",
        socialTab: "Social Tab"
    });
    const [newRoster, setNewRoster] = useState(Roster.fromJSON(passedData));
    const [data, setData]=useState([])

    useEffect(() => {
        setRosters(globalRosters);
        setEmptySlots(slots - globalRosters.length);
    }, []);

    const selectRoster = (roster) => {
        let newRostersSelected;
        if (rostersSelected?.includes(roster)) {
            newRostersSelected = rostersSelected?.filter(r => r !== roster);
        } else {
            newRostersSelected = [...rostersSelected, roster];
        }

        if (newRostersSelected.length === 2) {
            console.log("Navigating to selected matchup with roster: ", newRostersSelected);
            setData({ userRoster: newRostersSelected[0].toJSON(), enemyRoster: newRostersSelected[1].toJSON() });
            setShouldNavigate(true);
            setPath('/selectedMatchup');
            // Assuming there's some navigation logic here
        }
        setRostersSelected(newRostersSelected);
    };

    const languageSwap = () => {
        setText(prevText => swapLNG(prevText));
    };

    return (
        <div style={{ backgroundColor: '#302B2B', textAlign: 'center', minHeight: '100vh', paddingBottom: '20px' }}>
            <Header reboot={languageSwap} />
            <h1 className='text'>{text["homeHeader"]}</h1>
            <h3 className='text'>
                {text['homeHeader2']}
            </h3>
            <ul style={{ columns: '3', marginTop: '5%' }}>
                {rosters && rosters?.map((roster, index) =>
                    <li className={rostersSelected?.includes(roster) ? 'lii highlighted' : 'lii'}
                        onClick={() => selectRoster(roster)} key={index}>
                        {roster.name}
                    </li>
                )}
                {Array.from(Array(emptySlots)).map((_, index) => (
                    <li className='lii' key={index}>
                        <Link to="/createRoster" className='link'>{text["newRoster"]}</Link>
                    </li>
                ))}
            </ul>            
            {shouldNavigate && <NavigateForwards data={data} path={path} />}
        </div>
    );
};

export default Home;
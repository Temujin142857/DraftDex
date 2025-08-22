import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'
//import { Rosters } from "../Composables/useRosters.js"
import "../CSS/Home.css"
import {Specie} from "../DataStructures/Specie";
import {Roster} from "../DataStructures/Roster";
import {Move} from "../DataStructures/Move";
import {Ability} from "../DataStructures/Ability";
import {NavigateForwards} from "../Navigator";
import * as state from "../Composables/useRosters";
import Header from "../Components/Header";
import {getL, swapLNG} from "../Composables/useLexicon";
import {User} from "../DataStructures/User";
import {loadUserRosters} from "../Composables/useDatabase";
import {loadRostersFromUser} from "../Composables/useRosters";

const defaultUser=new User("Ash");

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
        const setupData = async () => {
            try {
                console.log("loadingHome", newRoster);
                const newRosters = await loadRostersFromUser(defaultUser);

                const resolvedRosters = await Promise.all(newRosters);

                setRosters(resolvedRosters);
                setEmptySlots(slots - resolvedRosters.length);

                console.log("Rosters:", resolvedRosters);
            } catch (error) {
                console.error('Error loading rosters:', error);
            }
        };

        setupData(); // Call the async function
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

    const goToSocial = () => {
        setShouldNavigate(true);
        setPath('/social');
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
            <h2 className='text link' onClick={goToSocial}>
                {text["socialTab"]}
            </h2>
            {shouldNavigate && <NavigateForwards data={data} path={path} />}
        </div>
    );
};

export default Home;
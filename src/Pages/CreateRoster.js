import React from "react";
import { loadTeams } from "../Composables/useDatabase.js"
import {Link} from 'react-router-dom'
import "../CSS/CreateRoster.css"
import {Specie} from "../DataStructures/Specie";
import Header from "../Components/Header";
import {loadAllSpecies} from "../Composables/useDatabase.js";

class CreateRoster extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slots: 12,
            speciesSelected: [],
            emptySlots: 0,
            species: [],
            slotsSelected: [],

            filteredSpecies: [new Specie("temp")],
            searchInput: ''
        }
    }

    async componentDidMount() {
        loadTeams();
        const speciesL=  await loadAllSpecies();
        console.log(speciesL);
        this.setState({ filteredSpecies: speciesL });
        this.setState({species: speciesL});
    }

    selectSlot=(specie)=>{
        this.setState((prevState) => ({
            speciesSelected: [...prevState.speciesSelected, specie]
        }));
    }

    handleSearchInputChange = (event) => {
        const searchInput = event.target.value.toLowerCase();
        const filteredSpecies = this.state.species.filter(specie =>
            specie.name.toLowerCase().includes(searchInput)
        );
        this.setState({ searchInput, filteredSpecies });
    };

    render() {
        const { emptySlots, speciesSelected, species, slotSelected, searchInput, filteredSpecies } = this.state;
        return (
            <div style={{backgroundColor: '#302B2B', textAlign: 'center', minHeight: '100vh', paddingBottom: '20px'}}>
                <Header></Header>
                <div style={{textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <div style={{padding: '3px', border: '2px solid white', borderRadius: '10px', backgroundColor: '#302B2B', textAlign: 'center', maxHeight: '90vh', minWidth: '25vw'}}>
                        <h2 className={'text'}>Choose Pokemon</h2>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={this.handleSearchInputChange}
                            placeholder="Search for a Pokemon..."
                            style={{marginBottom: '20px', padding: '8px', width: '100%', boxSizing: 'border-box'}}
                        />

                        <ul style={{listStyle: 'none', padding: 0, marginTop: '5px', overflow: 'auto', maxHeight: '70vh'}}>
                            {filteredSpecies.map((specie, index) => (
                                <li className={'i' + ' li'} key={index} onClick={() => this.selectSlot(specie)}
                                    style={{margin: '20px 10px', cursor: 'pointer'}}>
                                    {specie.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{marginLeft: "80px", minWidth: '25vw'}}>
                        <h2  contentEditable={"true"} className={'text'}>Roster Name</h2>
                        <ul style={{margin: '50px 0', display: 'grid', gridTemplateColumns: 'auto auto', gap: '20px'}}>
                            {speciesSelected && speciesSelected.map((specie, index) => (
                                <li key={index} className={'li'} style={{margin: '20px 0'}}>
                                    {specie.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Link to="/" className={'link'}
                      style={{display: 'block', marginTop: '20px', color: 'white', textDecoration: 'none', fontSize: '24px'}}>Save</Link>
            </div>

        );
    }
}


export default CreateRoster;
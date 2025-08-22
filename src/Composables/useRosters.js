import {createTeam, createTeamFromSnapshot} from './useTeams.js';
import {loadRoster, saveSpecie, saveRoster, loadUserRosters} from "./useDatabase";
import {Roster} from "../DataStructures/Roster";
import {loadASpecie} from "./useSpecies";
import {Pokemon} from "../DataStructures/Pokemon";

export const createRoster = (name, species=[], team=null) => {
    if (!team && species.length > 6) {
        team = createTeam('', species.splice(0, 6));
    } else {
        team = team || createTeam();
    }

    return {
        name,
        species,
        team
    };
};

export const loadARoster=async (rosterID) => {
    return createRosterFromSnapshot(await loadRoster(rosterID));
}

export const loadRostersFromUser = async (user) => {
    const rawRosters=await loadUserRosters(user);
    let rosters=[];
    for(const roster of rawRosters){
        if(!roster)continue;
        rosters.push(createShallowRosterFromSnapshot(roster));
    }
    return rosters;
}

export const createShallowRosterFromSnapshot=(snapshot)=>{
    let name = snapshot.name;
    let id= snapshot.rosterID;
    let speciesList = snapshot.speciesList || snapshot.species;
    let teams=snapshot.teams;
    for (let i=0;i< teams.length; i++) {
        teams[i] = createTeamFromSnapshot(teams[i]);
    }
    console.log("shallow snapshot: ", snapshot);

    return new Roster(name, speciesList, teams, id);
}


export const createRosterFromSnapshot = async (snapshot) => {
    let name = snapshot.name;
    let id= snapshot.rosterID;
    let speciesList = snapshot.speciesList || snapshot.species;
    console.log("snapshot: ", snapshot);
    console.log("SpeciesList being loaded: ",speciesList)

    let species = await Promise.all(
        speciesList.map(speciesName => loadASpecie(speciesName))
    );

    let teams = snapshot.teams;

    for (let i=0;i< teams.length; i++) {
        teams[i] = createTeamFromSnapshot(teams[i]);
        const team=teams[i];
        for (let i=0; i< team.pokemons.length;i++) {
            if(typeof team.pokemons[i] == "string"){
                const specie=species.find((s) => s.name === team.pokemons[i])
                team.pokemons[i]=new Pokemon(specie)
            }else{
                team.pokemons[i].specie = species.find((s) => s.name === team.pokemons[i].specie);
            }

        }
    }

    return new Roster(name, species, teams, id);
}

export const saveARoster=(roster)=>{
    console.log("saving roster, useRosters:", roster);
    for (let i=0; i<roster.species.length; i++){
        roster.species[i] = roster.species[i].name;
    }
    for (let i=0; i<roster.teams.length; i++){
        for (let j = 0; j < roster.teams[i].pokemons.length; j++) {
            if(roster.teams[i].pokemons[j].specie.name){
                roster.teams[i].pokemons[j]=roster.teams[i].pokemons[j].specie.name
            }else {
                roster.teams[i].pokemons[j]=roster.teams[i].pokemons[j].specie
            }

        }
    }
    saveRoster(roster);
}

export const updateRoster=(roster)=>{
    for (let i=0; i<roster.species.length; i++){
        roster.species[i] = roster.species[i].name;
    }
    for (let i=0; i<roster.teams.length; i++){
        for (let j = 0; j < roster.teams[i].pokemons.length; j++) {
            roster.teams[i].pokemons[j]=roster.teams[i].pokemons[i].specie.name
        }
    }
    saveRoster(roster);
}



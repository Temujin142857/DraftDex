// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { createPokemonFromSnapshot } from "../DataStructures/Pokemon.js"
import {Specie} from "../DataStructures/Specie.js";
import { createTeamsFromSnapshot } from "../DataStructures/Team.js"
import {addRoster, setUser, user as gUser} from "./useUser(lol)";
import {User} from "../DataStructures/User";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAh1Filb5mSLsMugjgvRsm07hfD-7JdKzg",
    authDomain: "test-39a85.firebaseapp.com",
    projectId: "test-39a85",
    storageBucket: "test-39a85.appspot.com",
    messagingSenderId: "1014279615263",
    appId: "1:1014279615263:web:f536bd2597ace7dc15762a",
    measurementId: "G-QNCMLWCKYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const useDatabase = getDatabase(app);


function writeUserData(userId, name, email, imageUrl) {
    set(ref(useDatabase, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture: imageUrl
    }).then(r => {}) ;
}


function readData(path){
    return new Promise((resolve, reject) => {
        const dataRef = ref(useDatabase, path);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);  // Resolve the Promise with the data
        }, (error) => {
            reject(error);  // Reject the Promise if there's an error
        });
    });

}

export async function loadAPokemon(pokemonId, user = "default") {
    const data = await readData(user + "/Pokemon/" + pokemonId);
    return createPokemonFromSnapshot(data);
}

export async function loadSpecie(speciesName) {
    const data = await readData("species/" + speciesName);
    console.log("attempted loaded specie", data)
    return data;
}

export async function loadAllSpecies() {
    try {
        const data = await readData("names");
        console.log("data:" + data);
        const speciesArray = data.split(",");
        return speciesArray;  // Return the array of Specie objects
    } catch (error) {
        console.error("Error loading species:", error);
    }
}

export async function loadMove(moveName){
    const data=await readData("moves/"+moveName);
    return data;
}

export async function loadTeams(){
    const data=await readData("teams");
    return createTeamsFromSnapshot(data);
}

export function saveAPokemon(pokemon){

}

export async function saveSpecie(specie){
    console.log("saving specie: ", specie);
    specie.moves=null;
    await set(ref(useDatabase, 'species/' + specie.name), specie);
}

export function uploadSpeciesList(){

}

export async function loadRosterPointer(){
    try {
        const data = await readData("rosterPointer");
        console.log("rosterID: " + data);
        return data;
    } catch (error) {
        console.error("Error loading species:", error);
    }
}

export async function incrementRosterPointer(currentValue){
    await set(ref(useDatabase, 'rosterPointer'), ++currentValue);
}


//add a reference to the roster in the user's profile
export async function saveRoster(roster){
    if(!roster.rosterID){
        await generateRosterID(roster);
    }
    console.log("saving roster: ", roster);
    console.log("roster as json: ", roster.toJSON())
    await set(ref(useDatabase, 'rosters/' + roster.rosterID), roster.toJSON());
    console.log("user pre changes: ", gUser);
    addRoster(roster.rosterID);
    await set(ref(useDatabase, 'users/'+gUser.name), gUser.rosters);
    console.log("user: ", gUser);
}

export async function generateRosterID(roster){
    roster.rosterID= await loadRosterPointer();
    if(!roster.rosterID){roster.rosterID=0;}
    await incrementRosterPointer(roster.rosterID);
}

export async function loadRoster(rosterID){
    try {
        const data = await readData("rosters/"+rosterID);
        console.log("rosterLoaded: " , data);
        return data;
    } catch (error) {
        console.error("Error loading species:", error, " RosterID:",rosterID);
    }
}

export async function loadUserRosters(user){
    try {
        let rosters=[];
        const data = await readData("users/"+user.name);
        setUser(new User(user.name, data));
        for (const rosterID of data.split(',')) {
            console.log("rosterID: ", rosterID);
            let roster=await loadRoster(rosterID);
            rosters.push(roster);
            addRoster(rosterID);
        }
        return rosters;
    }catch (error) {
        console.error("Error loading userData:", error);
    }

}

export const saveMove = async (move) =>{
    await set(ref(useDatabase, 'moves/' + move.name), move);
}


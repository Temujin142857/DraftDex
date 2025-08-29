export let user;

export const setUser = (newUser) =>{
    user=newUser;
}

export const addRoster=(roster)=>{
    roster=String(roster);
    if(!user.rosters.includes(roster))user.rosters=user.rosters+","+roster;
}

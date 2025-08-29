let twice = 0;
let once = 0;
export async function fetchSpecies(name) {
  console.log("api");
  try {
    // Replace this with your actual API endpoint
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    //console.log("raw responce: ",response)
    // Parse the response as JSON
    const data = await response.json();
    console.log("raw responce json: ", data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export async function fetchMove(name) {
  console.log("api");
  try {
    // Replace this with your actual API endpoint
    const response = await fetch("https://pokeapi.co/api/v2/move/" + name);
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    //console.log("raw responce: ",response)
    // Parse the response as JSON
    const data = await response.json();
    console.log("raw responce json: ", data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export async function fetchGeneric(endpoint) {
  console.log("api");
  try {
    console.log(endpoint);
    const response = await fetch(endpoint);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    //console.log("raw responce: ",response)
    // Parse the response as JSON
    const data = await response.json();
    //console.log("raw responce json: ",data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

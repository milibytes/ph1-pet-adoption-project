/*

FUREVER 

1. Fetch the array object from the JSON database
2. Write a function that displays the details on the pet in the right side pane
3. Add an event listener for when user mouses over an object so that it gets slight
4. Add an event listener for when a user searches via the search form
5. Add an event listener so that when someone click on "Lick"
6. On load, show a random pet card on the right side menu


*/


// GLOBAL VARIABLES

const menu = document.querySelector("#menu")
const searchForm = document.querySelector("#search-form")


// Write a function to populate pet details when filling into containers and when highlighting 
// a particular pet on the right side display panel
function petDetails (pet) {
    //Set the current pet so that the "lick" button will work
    currentPet = pet
    const detailImage = document.querySelector("#detail-image")
    detailImage.src = pet.Image
    const name = document.querySelector("#name")
    name = pet.Name
    const age = document.querySelector("#age")
    age.textContent = pet.Age
    const birthday = document.querySelector("#birthday")
    birthday.textContent = pet.Birthday
    const breed = document.querySelector("#breed")
    breed.textContent = pet.Breed
    const tricks = document.querySelector("#tricks")
    tricks.textContent = pet.Tricks
    const species = document.querySelector("#species")
    species.textContent = pet.Species
    const licked = document.querySelector("#licked")
    licked.textContent = pet.Licked ? "Licked 👅 ! " : "Lick?"
    const licks = document.querySelector("#licks")
    licks = pet.Licks // Note: no using text content since we want this to be a number
}



// Fetch request to populate the menu from the JSON file
fetch ("http://localhost:3000/pets")
.then (response => response.json())
.then (pets => {
    pets.forEach(pet => {
        const image = document.createElement("img")
        image.src = pet.Image
        //Append each pet to the menu using the global constant
        menu.append(image)
        
        // Add event listener to populate right side pane display when user clicks on a pet image
        // in the menu
        img.addEventListener( "click", () => petDetails(pet))
    })
    // Set a starting pet. For now, putting in the first item. But code below is to change this to a
    // random pet once we get it working.
    const initialPet = pets[0]
    //Code for random pet-  currently commented out
    // function randomIntFromInterval(min, max) { // min and max included 
    //     return Math.floor(Math.random() * (max - min + 1) + min)
    //   }
    //   const randomInt = randomIntFromInterval(1, 6) // 1 through 6 since we have six pet cards
    //   console.log(randomInt)
    // Call the petDetails function to display details for an initial pet
    petDetails(initialPet)
})



// When user clicks on the Lick button, up the number of licks and do a PATCH to the database
// to update the number of Licks
const lickButton = document.querySelector("#lick-bttn")
lickButton.addEventListener = ("click", () =>
    fetch(`http://localhost:3000/${currentPet}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          licks: ++licks,
          licked: !licked
        })
      }).then(response => response.json())
      // Updating `likes.textContent` here (rather than before our `fetch()`)
      //          guarantees that it only updates after our PATCH succeeds.
      .then(patchedPet => licks.textContent = `${patchedPet.Licks} Licks`)
    )


// Make an event listener for the search button
searchForm.addEventListener("submit", (event) => {
    event.preventDefault
    

})



// CODING OFF BELOW AS A START IN CASE WE NEED IT
const theButton = document.querySelector("#watched")
theButton.addEventListener("click", () => {
    //using the global variable, we are making the watched value the opposite of itself
    currentMovie.watched = !currentMovie.watched
    //Now, on the current Movie, which is the button in this case when we are clicking, we m
    theButton.textContent = currentMovie.watched ? "Watched" : "Unwatched"
    //Note: For coding challege, fine to just change the text not do a Patch
})

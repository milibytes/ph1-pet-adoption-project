/*

FUREVER 

1. Fetch the array object from the JSON database
2. Write a function that displays the details on the pet in the right side pane
3. Add an event listener for when user mouses over an object so that it gets slight
4. Add an event listener for when a user searches via the search form
5. Add an event listener so that when someone click on "Lick"
6. On load, show a random pet card on the right side display


*/


// GLOBAL VARIABLES

const petNav = document.querySelector("#pet-nav")
const searchBar = document.querySelector("#search-bar")
let currentPet


// Write a function to populate pet details when filling into containers and when highlighting 
// a particular pet on the right side display panel
function petDetails (pet) {
    //Set the current pet so that the "lick" button will work
    currentPet = pet
    //Set the detail photo for when someone clicks on the pet to display details
    const pngImage = document.querySelector("#image-png")
    pngImage.src = pet.pngImage
    pngImage.alt = pet.name
    const name = document.querySelector(".name")
    name.textContent = "Name: " + pet.name
    const age = document.querySelector(".age")
    age.textContent = "Age: " + pet.age
    const birthday = document.querySelector(".birthday")
    birthday.textContent = "Birthday: " + pet.birthday
    const breed = document.querySelector(".breed")
    breed.textContent = "Breed: " + pet.breed
    const tricks = document.querySelector(".tricks")
    tricks.textContent = "Tricks: " + pet.tricks
    const species = document.querySelector(".species")
    species.textContent = "Species: " + pet.species
    const sex = document.querySelector(".sex")
    sex.textContent = "Sex: " + pet.sex
    // const licked = document.querySelector("#licked")
    // licked.textContent = pet.licked ? "Licked 👅 ! " : "Lick?"
    // const licks = document.querySelector("#licks")
    // licks.textContent = pet.licks
}



// Fetch request to populate the petNav from the JSON file
fetch ("http://localhost:3000/pets")
.then (response => response.json())
.then (pets => {
    pets.forEach(pet => {
        //Make a div for each
        const petDiv = document.createElement("div")
        petDiv.className = "pet-div"
        const image = document.createElement("img")
        image.src = pet.image
        image.alt = pet.name
        // Add event listener to populate right side pane display when user clicks on a pet image
        // in the petNav
        image.addEventListener("click", () => petDetails(pet))
        //Append the image to the div
        petDiv.append(image)
        //Append each pet div to the petNav using the global constant
        petNav.append(petDiv)
    })
    // Set a starting pet. For now, putting in the first item. But code below is to change this to a
    // random pet once we get it working.
    // const initialPet = pets[0]
    // This code creates a random number for choosing the starting 
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
        }
        //Subtract 1 from the randomInt to account for an array value of zero
        const petsArrayLengthMinusOne = pets.length - 1
        const randomInt = randomIntFromInterval(0, petsArrayLengthMinusOne)
        console.log("This is my randomInt value: ", randomInt)
        console.log("This is my arrayLength value: ", petsArrayLengthMinusOne)
    //Make a constant of the details of the random starting pet
    const initialPet = pets[randomInt]
        console.log("My randomly selected starting pet is:, ", pets[randomInt])
    // Call the petDetails function to display details of the array object for the random initial pet
    petDetails(initialPet)
})



// When user clicks on the Lick button, up the number of licks and do a PATCH to the database
// to update the number of Licks and open the adoption Furm

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
      .then(patchedPet => licks.textContent = `${patchedPet.licks} Licks`)
    //Open the adoption form
    

    )

// For now, since we don't have unique user logins, when someone clicks the lick button,
// the button will go away and show up as licked


//MELISSA is hsandling this 
// Make an event listener for the search button
// searchForm.addEventListener("submit", (event) => {
//     event.preventDefault()


// })













// CODING OFF BELOW AS A START IN CASE WE NEED IT
// const theButton = document.querySelector("#watched")
// theButton.addEventListener("click", () => {
//     //using the global variable, we are making the watched value the opposite of itself
//     currentMovie.watched = !currentMovie.watched
//     //Now, on the current Movie, which is the button in this case when we are clicking, we m
//     theButton.textContent = currentMovie.watched ? "Watched" : "Unwatched"
//     //Note: For coding challege, fine to just change the text not do a Patch
// })


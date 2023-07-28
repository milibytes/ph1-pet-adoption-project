
//FUREVER 

// 1. Fetch the array object from the JSON database
// 2. Write a function that displays the details on the pet in the right side pane
// 3. Add an event listener for when user mouses over an object so that it gets slight
// 4. Add an event listener for when a user searches via the search form
// 5. Add an event listener so that when someone click on "Lick"
// 6. On load, show a random pet card on the right side display




// GLOBAL VARIABLES
const petNav = document.querySelector("#pet-nav");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-query");
const lickButton = document.querySelector("#lick-button");
let currentPet;
let pets;


// LICK BUTTON

lickButton.addEventListener("click", () => {

    if (lickButton.textContent === "LICKED!") {
        lickButton.textContent = true
        lickButton.textContent = "LICK ME"
    } else {
        lickButton.textContent = false
        lickButton.textContent = "LICKED!"
    }


})

// Write a function to populate pet details when filling into containers and when highlighting 
// a particular pet on the right side display panel
function petDetails(pet) {
    // Set the current pet so that the "lick" button will work
    currentPet = pet;
    // Set the detail photo for when someone clicks on the pet to display details
    const pngImage = document.querySelector("#image-png");
    pngImage.src = pet.pngImage; //Fixed this as was not pointing to png
    pngImage.alt = pet.name;
    const name = document.querySelector(".name");
    name.textContent = pet.name;
    const age = document.querySelector(".age");
    age.textContent = "AGE: " + pet.age;
    const birthday = document.querySelector(".birthday");
    birthday.textContent = "BIRTHDAY: " + pet.birthday;
    const breed = document.querySelector(".breed");
    breed.textContent = "BREED: " + pet.breed;
    const tricks = document.querySelector(".tricks");
    tricks.textContent = "TRICKS: " + pet.tricks;
    const species = document.querySelector(".species");
    species.textContent = "SPECIES: " + pet.species;
    const sex = document.querySelector(".sex");
    sex.textContent = "SEX: " + pet.sex;
    // const licked = document.querySelector("#licked")
    // licked.textContent = pet.licked ? "Licked 👅 ! " : "Lick?"
    // const licks = document.querySelector("#licks")
    // licks.textContent = pet.licks;

}

// Fetch request to populate the petNav from the JSON file
fetch("http://localhost:3000/pets")
    .then((response) => response.json())
    .then((fetchedPets) => {
        // Assign the fetchedPets to the global pets variable
        pets = fetchedPets;

        pets.forEach((pet) => {
            //Make a div for each
            const petDiv = document.createElement("div");
            petDiv.className = "pet-div";
            const image = document.createElement("img");
            image.src = pet.image;
            image.alt = pet.name;
            // Add event listener to populate right side pane display when user clicks on a pet image
            // in the petNav
            image.addEventListener("click", () => petDetails(pet));
            //Append the image to the div
            petDiv.append(image);
            //Append each pet div to the petNav using the global constant
            petNav.append(petDiv);
        });

        // Set a starting pet using randomIntFromInterval...
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
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



        // Make an event listener for the SEARCH here inside the fetch .then() callback
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const searchQuery = searchInput.value.trim().toLowerCase();

            //filter pets based on search query
            const filteredPets = pets.filter((pet) => {
                const name = pet.name.toLowerCase();
                const breed = pet.breed.toLowerCase();
                const species = pet.species.toLowerCase();
                const sex = pet.sex.toLowerCase();
                const age = pet.age.toLowerCase();

                //return true if properties match the search
                return (
                    breed.includes(searchQuery) ||
                    sex.includes(searchQuery) ||
                    species.includes(searchQuery) ||
                    age.includes(searchQuery) ||
                    name.includes(searchQuery)
                );
            });

            //clear current pet display
            petNav.innerHTML = "";
            // repopulate petNav with filtered pets
            filteredPets.forEach((pet) => {
                const petDiv = document.createElement("div");
                petDiv.className = "pet-div";
                const image = document.createElement("img");
                image.src = pet.image;
                image.alt = pet.name;

                image.addEventListener("click", () => petDetails(pet));
                petDiv.append(image);
                petNav.append(petDiv);
            });

            //display message, if no filtered pets
            if (filteredPets.length === 0) {
                const noResultsDiv = document.createElement("div");
                noResultsDiv.textContent = "No pets found matching your search!";
                petNav.append(noResultsDiv);
            }
        });
 

// Hide the adoption form when the page is loaded
let showForm = false;
document.querySelector("#lick-button").addEventListener("click", () => {
showForm = !showForm;
document.querySelector("#adoption-form").style.display = showForm ? "block" : "none";
var allPets = document.getElementsByClassName('pet-div');
delete allPets
});



// Add an event listener to the form so that when the information is submitted
// it updates the JSON database with a POST to

const adoptionForm = document.querySelector("#adoption-form")
adoptionForm.addEventListener("submit", event => {
    event.preventDefault();
    fetch("http://localhost:3000/adopters", {
      method: "POST",
      headers: {
        // What we're sending ()
        "Content-Type": "application/json",
        // What we want to receive (N/A in this case but setting it as practice)
        "Accept": "application/json"
      },
      body: JSON.stringify({
        fname: event.target.fname.value,
        lname: event.target.lname.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        zipcode: event.target.zipcode.value,
        details: event.target.details.value
      })
    }).then(response => response.json())
    adoptionForm.reset
    let name = currentPet.name
    alert(`${name} thanks you furever! 👅`);
    document.querySelector("#adoption-form").style.display = "none";
})


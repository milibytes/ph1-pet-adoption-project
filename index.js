
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
let currentPet;
let pets;

// Write a function to populate pet details when filling into containers and when highlighting 
// a particular pet on the right side display panel
// Write a function to populate pet details when filling into containers and when highlighting 
// a particular pet on the right side display panel
function petDetails(pet) {
    // Set the current pet so that the "lick" button will work
    currentPet = pet;
    // Set the detail photo for when someone clicks on the pet to display details
    const pngImage = document.querySelector("#image-png");
    pngImage.src = pet.image;
    pngImage.alt = pet.name;
    const name = document.querySelector(".name");
    name.textContent = "Name: " + pet.name;
    const age = document.querySelector(".age");
    age.textContent = "Age: " + pet.age;
    const birthday = document.querySelector(".birthday");
    birthday.textContent = "Birthday: " + pet.birthday;
    const breed = document.querySelector(".breed");
    breed.textContent = "Breed: " + pet.breed;
    const tricks = document.querySelector(".tricks");
    tricks.textContent = "Tricks: " + pet.tricks;
    const species = document.querySelector(".species");
    species.textContent = "Species: " + pet.species;
    const sex = document.querySelector(".sex");
    sex.textContent = "Sex: " + pet.sex;
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

        const petsArrayLengthMinusOne = pets.length - 1;
        const randomInt = randomIntFromInterval(0, petsArrayLengthMinusOne);
        const initialPet = pets[randomInt];

        // Call the petDetails function to display details of the array object for the random initial pet
        petDetails(initialPet);

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
    });

//When user clicks on the Lick button, up the number of licks and do a PATCH to the database
//to update the number of Licks
const lickButton = document.querySelector("#lick-button");
lickButton.addEventListener("click", () => {
    currentPet.licks++;
    currentPet.licked = !currentPet.licked;
    fetch(`http://localhost:3000/${currentPet}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            licks: currentPet.licks,
            licked: currentPet.licked,
        }),
    })
        .then((response) => response.json())
        .then((patchedPet) => (licks.textContent = `${patchedPet.licks} Licks`));
});








// // GLOBAL VARIABLES

// const petNav = document.querySelector("#pet-nav")
// const searchForm = document.querySelector("#search-form")
// const searchInput= document.querySelector("#search-query")
// let currentPet



// // Write a function to populate pet details when filling into containers and when highlighting 
// // a particular pet on the right side display panel
// function petDetails (pet) {
//     //Set the current pet so that the "lick" button will work
//     currentPet = pet
//     //Set the detail photo for when someone clicks on the pet to display details
//     const pngImage = document.querySelector("#image-png")
//     pngImage.src = pet.pngImage
//     pngImage.alt = pet.name
//     const name = document.querySelector(".name")
//     name.textContent = "Name: " + pet.name
//     const age = document.querySelector(".age")
//     age.textContent = "Age: " + pet.age
//     const birthday = document.querySelector(".birthday")
//     birthday.textContent = "Birthday: " + pet.birthday
//     const breed = document.querySelector(".breed")
//     breed.textContent = "Breed: " + pet.breed
//     const tricks = document.querySelector(".tricks")
//     tricks.textContent = "Tricks: " + pet.tricks
//     const species = document.querySelector(".species")
//     species.textContent = "Species: " + pet.species
//     const sex = document.querySelector(".sex")
//     sex.textContent = "Sex: " + pet.sex
//     // const licked = document.querySelector("#licked")
//     // licked.textContent = pet.licked ? "Licked 👅 ! " : "Lick?"
//     // const licks = document.querySelector("#licks")
//     // licks.textContent = pet.licks
// }



// // Fetch request to populate the petNav from the JSON file
// fetch ("http://localhost:3000/pets")
// .then (response => response.json())
// .then ((fetchedPets) => {
//     pets= fetchedPets;
//     pets.forEach(pet => {
//         //Make a div for each
//         const petDiv = document.createElement("div")
//         petDiv.className = "pet-div"
//         const image = document.createElement("img")
//         image.src = pet.image
//         image.alt = pet.name
//         // Add event listener to populate right side pane display when user clicks on a pet image
//         // in the petNav
//         image.addEventListener("click", () => petDetails(pet))
//         //Append the image to the div
//         petDiv.append(image)
//         //Append each pet div to the petNav using the global constant
//         petNav.append(petDiv)
//     })
//     // Set a starting pet. For now, putting in the first item. But code below is to change this to a
//     // random pet once we get it working.
//     // const initialPet = pets[0]
//     // This code creates a random number for choosing the starting 
//     function randomIntFromInterval(min, max) { // min and max included 
//         return Math.floor(Math.random() * (max - min + 1) + min)
//         }
//         //Subtract 1 from the randomInt to account for an array value of zero
//         const petsArrayLengthMinusOne = pets.length -= 1
//         const randomInt = randomIntFromInterval(0, petsArrayLengthMinusOne)
        
//         // console.log("This is my randomInt value: ", randomInt)
//         // console.log("This is my arrayLength value: ", petsArrayLengthMinusOne)
//     //Make a constant of the details of the random starting pet
//     const initialPet = pets[randomInt]
//     // Call the petDetails function to display details of the array object for the random initial pet
//     petDetails(initialPet)
// })



// //When user clicks on the Lick button, up the number of licks and do a PATCH to the database
// //to update the number of Licks
// const lickButton = document.querySelector("#lick-button")
// lickButton.addEventListener("click", () => {
//     currentPet.licks++;
//     currentPet.licked= !currentPet.licked;
//     fetch(`http://localhost:3000/${currentPet}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json"
//         },
//         body: JSON.stringify({
//           licks: currentPet.licks,
//           licked: currentPet.licked
//         })
//       })
//       .then(response => response.json())
//       // Updating `likes.textContent` here (rather than before our `fetch()`)
//       //          guarantees that it only updates after our PATCH succeeds.
//       .then((patchedPet) => (licks.textContent = `${patchedPet.licks} Licks`))
// })

// //For now, since we don't have unique user logins, when someone clicks the lick button,
// //the button will go away and show up as licked


// //Make an event listener for the SEARCH

// searchForm.addEventListener("submit", (event) => {
//     event.preventDefault()
// const searchQuery= searchInput.value.trim().toLowerCase();
// let pets
// //filter pets based on search query
// const filteredPets = pets.filter((pet) => {
//   const name= pet.name.toLowerCase()
//   const breed= pet.breed.toLowerCase()
//   const species=pet.species.toLowerCase()
//   const sex=pet.sex.toLowerCase()
//   const age=pet.age.toLowerCase()

//   //return true if properties match the search

//   return breed.includes(searchQuery) || sex.includes(searchQuery) ||species.includes(searchQuery)||age.includes(searchQuery) ||name.includes(searchQuery);

// })
// //clear current pet display
// petNav.innerHTML="";
// // repopulate petNav with filtered pets
// filteredPets.forEach((pet) => {
//     const petDiv = document.createElement('div')
//     petDiv.className= 'pet-div'
//     const image= document.createElement('img')
//     image.src = pet.image
//     image.alt = pet.name

//     image.addEventListener('click', () => petDetails(pet))
//     petDiv.append(image)
//     petNav.append(petDiv)
// })

// //display message, if no filtered pets

// if(filteredPets.length ===0) {
//     const noResultsDiv = document.createElement('div')
//     noResultsDiv.textContent = 'No pets found matching your search!'
//     petNav.append(noResultsDiv)
// }
// })






// // //CODING OFF BELOW AS A START IN CASE WE NEED IT
// // const theButton = document.querySelector("#watched")
// // theButton.addEventListener("click", () => {
// //     //using the global variable, we are making the watched value the opposite of itself
// //     currentMovie.watched = !currentMovie.watched
// //     //Now, on the current Movie, which is the button in this case when we are clicking, we m
// //     theButton.textContent = currentMovie.watched ? "Watched" : "Unwatched"
// //     //Note: For coding challege, fine to just change the text not do a Patch
// // })

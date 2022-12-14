//PHASE-1-WEEK-3-CODE-CHALLENGE

//First we ensure we write an event that ensures that the HTML is loaded first before the script
document.addEventListener("DOMContentLoaded", (e) => {
    console.log("The DOM has loaded")
    showMovie()
    movieDetails(JSON.parse(filmsObj))

})
//A fetch function that will enable the movie list to load from db json
function showMovie() {
    fetch("https://phase-1-code-challenge-3.vercel.app/db.json")
    .then((response)=> response.json())
    .then((filmsObj=> filmsObj.films.forEach(films => showMovieNames(films))));
}
const filmDetails = document.getElementById("show-description")

//A function that creates the list of movies to be displayed 
function showMovieNames(films) {
    const filmNames = document.createElement("li")
    filmNames.className= ("film-list")
    filmNames.textContent= films.title
    filmDetails.append(filmNames)
    filmNames.addEventListener("click", function onclick() {
       movieDetails(films);
    })

}
//This function will have a card that will contain all the movie details  after clicking
function movieDetails(films) {
    const filmName = document.getElementById("film-name")
    const filmImg = document.getElementById("film-image")
    const filmDescr = document.getElementById("film-description")
    const filmRuntime = document.getElementById("film-runtime")
    const filmShowtime = document.getElementById("film-showtime")
    const availabletickets = document.getElementById("available-tickets")

    //The details will be the title, poster, running time, showing time and available tickets
    filmName.textContent= films.title
    filmImg.src= films.poster
    filmDescr.textContent= films.description
    filmRuntime.textContent=`Runtime: ${films.runtime}minutes`
    filmShowtime.textContent=`Time: ${films.showtime}`

    //We will subtract the number of tickets to the tickets sold to display how many tickets remain after purchase
    let remaindertickets = films.capacity - films.tickets_sold
    availabletickets.textContent=`Available tickets: ${remaindertickets}`
    const filmButton = document.getElementById("ticket-buyer")
    filmButton.dataset.id = films.id

    //This button enables one to buy tickets and after the purchase the number of tickets are less by one after every click
    filmButton.addEventListener("click", function reduceTickets() {
        if (remaindertickets>=0) {
            return availabletickets.textContent =`Available tickets: ${remaindertickets--}`
        }
        //when the number of tickets reaches 0 then the tuckets are sold out
        else if (remaindertickets < 0) {
            return availabletickets.textcontent=`sold-out`
        }
    })
}

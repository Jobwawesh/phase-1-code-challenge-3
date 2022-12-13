document.addEventListener('DOMContentLoaded', () => { moviesLoaded() })
document.addEventListener('DOMContentLoaded', moviesLoaded)


  //fetches all movie details upon page load
  function moviesLoaded(){

    const listMovies = document.getElementById('films')

    const movieContainer = document.getElementById('movieContainer')

    const posterDiv = document.getElementById('posterDiv')

showMovie(1, movieContainer)
    fetch('https://sammy-ck.github.io/db.json')
    .then(resp => resp.json())
    .then(data => createMovieDetailCard(data.films[0], movieContainer))

    fetch('http://localhost:3000/films')

    fetch('https://sammy-ck.github.io/db.json')
    .then(resp => resp.json())
    .then(data => {

        data.forEach(movie => {
        (data.films).forEach(movie => {
            const liMovie = document.createElement('li')
            liMovie.style.cursor = 'pointer'

            liMovie.addEventListener('click', () => {
                movieContainer.innerHTML = ''
               showMovie(movie.id, movieContainer)
            })

            const pTitle = document.createElement('p')
            const deleteBtn = document.createElement('button')
            deleteBtn.innerText = 'DELETE'

            deleteBtn.addEventListener('click',() => { 
                deleteMovie(movie.id, liMovie)
            })

            pTitle.innerText = movie.title
            liMovie.appendChild(pTitle)
            pTitle.appendChild(deleteBtn)
            listMovies.appendChild(liMovie)

            liMovie.addEventListener('click', () => {
                movieContainer.innerHTML = ''
                createMovieDetailCard(movie, movieContainer)
            })
        })
    })
  }
}

//createMovieDetailsCard : Creates a movie detail card from data using fetch request response for individual movie
/**
* createMovieDetailsCard : Creates a movie detail card for movie.
*   
*   @data: fetch request response for individual movie
**/
function createMovieDetailCard(data, tagToAppend) {

    const poster = document.createElement('img')
        poster.src = data.poster

        tagToAppend.appendChild(poster)
        const title = document.createElement('h2')
        title.innerText = data.title
        tagToAppend.appendChild(title)
        const runtime = document.createElement( 'p')
        runtime.innerHTML = `<b>Run time:</b> ${data.runtime}`
        tagToAppend.appendChild(runtime)
        const showtime = document.createElement( 'p')
        showtime.innerHTML = `<b>Show time:</b> ${data.showtime}
        <p><b>Available Tickets</b></p>`
        tagToAppend.appendChild(showtime)

////Calculate available movie tickets
        const capacity = data.capacity
        const titcketsSold = data.tickets_sold
        let remainingTickets = capacity - titcketsSold

        const availableTickets = document.createElement('p')
        availableTickets.innerText =  remainingTickets
        tagToAppend.appendChild(availableTickets)
        const description = document.createElement( 'p')
        description.innerText = data.description
        tagToAppend.appendChild(description)

        const buyTicketBtn = document.createElement('button')
        buyTicketBtn.innerText = 'BUY TICKET'


updateBuyBtn (remainingTickets, availableTickets, buyTicketBtn)

//update DOM and json server on available tickets upon buying
        buyTicketBtn.addEventListener('click',() => {
            fetch(`http://localhost:3000/films/${data.id}`)
            .then(resp => resp.json())
            .then(datam => {

            fetch(`http://localhost:3000/films/${data.id}`,{
            method : "PATCH",
            headers : {
            "Content-Type" : "application/json",
            Accept : "application/json"
            },
            body : JSON.stringify({
            tickets_sold : ((datam.tickets_sold < datam.capacity)?datam.tickets_sold + 1: datam.capacity)
            })
            })
            .then(resp => resp.json())
            .then(dataz => {
            remainingTickets--

            updateBuyBtn (remainingTickets, availableTickets, buyTicketBtn)
            if(remainingTickets > 1){
                remainingTickets--
               availableTickets.innerText =  remainingTickets
            }else{
                availableTickets.innerText = 0
                buyTicketBtn.disabled = true
                buyTicketBtn.innerText = 'SOLD OUT'
                buyTicketBtn.style.cursor = 'not-allowed'
                buyTicketBtn.style.backgroundColor = 'grey'
            }


            })
            })

        })
        tagToAppend.appendChild(buyTicketBtn)
}


//shows movie details on the DOM
function showMovie(id, movieContainer) {
    fetch(`http://localhost:3000/films/${id}`)
    .then(resp => resp.json())
    .then(data => createMovieDetailCard(data, movieContainer))
    }


//deletes a movie from the ul menu list and the server
function deleteMovie (movieID, liMovie)  {
    fetch(`http://localhost:3000/films/${movieID}`,{
      method : "DELETE",
      headers : {
          "Content-Type" : "application/json",
          Accept : "application/json"
      }
    })
    .then(() => { liMovie.remove(); })
  }

//disable button on sold out tickets
function updateBuyBtn (remainingTickets, availableTickets, buyTicketBtn){
    if(remainingTickets >= 1){                
        availableTickets.innerText =  remainingTickets
     }else{
         availableTickets.innerText = 0
         buyTicketBtn.disabled = true
         buyTicketBtn.innerText = 'SOLD OUT'
         buyTicketBtn.style.backgroundColor = 'grey'
         buyTicketBtn.style.cursor = 'not-allowed'
     }
  }
}
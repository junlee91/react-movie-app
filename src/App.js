import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  state = {}


  _buttonClick = (e) => {
    console.log('clicked! ' + e.target.id);
  
    const option = e.target.id;

   
    switch(option)
    {
      case 'opt1': 
        this._getMovies('download_count')
        break;
      case 'opt2': 
        this._getMovies('like_count')
        break;
      case 'opt3': 
        this._getMovies('rating_count')
        break;
      default:
        break;
    }

  }
  
  componentDidMount(){
    //this._getMovies();
  }

  _getMovies = async (val) => {
    const movies = await this._callApi(val)  // wating callApi to be finished
    this.setState({ // this happens after await finishes 
      movies
    })
  }
  
  // normal fetch is synchronous
  // Promise is asynchornous : making schedule 
  _callApi = (val) =>{
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by='+val)
    .then(response => response.json())  // only one attribute
    .then(json => json.data.movies)     // don't need return statement  '=>' automatically returns
    .catch(err => console.log(err))
  }
  
  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return <Movie 
        title={movie.title_english} 
        poster={movie.large_cover_image} 
        key={movie.id} 
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    })
    return movies
  }

  // renders whenever state changes 
  render() {
    const {movies} = this.state;
    return (
      <div>
        <div className="ButtonLayout">
          <button className="Button" id='opt1' onClick={(e) => this._buttonClick(e)}>Downloads</button>
          <button className="Button" id='opt2' onClick={(e) => this._buttonClick(e)}>Likes</button>
          <button className="Button" id='opt3' onClick={(e) => this._buttonClick(e)}>Rating</button>
        </div>
        <div className={movies ? "App" : "App--loading"}>
          {movies ? this._renderMovies() : "Please select sorting options.."}
        </div>
      </div>
    );
  }
}


export default App;



/*
setTimeout(()=>{
      this.setState({
        movies: [
          {
            title: "Matrix",
            poster: "https://metrouk2.files.wordpress.com/2017/02/the-matrix.jpg?quality=80&strip=all"
          },
          {
            title: "Harry Poter 7",
            poster: "http://vignette2.wikia.nocookie.net/harrypotter/images/a/a1/Harry-Potter-and-The-Deathly-Hallows-Part-2-Wallpapers-3.jpg/revision/latest?cb=20120102111518"
          },
          {
            title: "Titanic",
            poster: "https://cdn.theculturetrip.com/wp-content/uploads/2016/02/titanic-movie-promo-stills-wallpaper-4-650x366.jpg"
          },
          {
            title: "Star Wars",
            poster: "https://lumiere-a.akamaihd.net/v1/images/swbfii_keyart_clean_final_flat_8d03e069.jpeg?region=0%2C37%2C1024%2C576&width=600"
          },
          {
            title: "Hunger Game",
            poster: "https://cdn.empireonline.com/jpg/80/0/0/1000/563/0/north/0/0/0/0/0/t/films/131631/images/fUn5I5f4069vwGFEEvA3HXt9xPP.jpg"
        
          },
          {
            title: "Transformers",
            poster: "http://cdn-static.denofgeek.com/sites/denofgeek/files/styles/main_wide/public/bumblebee.jpg?itok=oEdcEIJT"
          }
        ]
      })
    }, 3000)

*/
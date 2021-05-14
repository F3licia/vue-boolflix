const app = new Vue({
        el: '#app',
        data: {
          tmdbApiK:"27c55bf69cc942b29c61c82472c4114c",
          textToSearch:"",
          movieList:[],
          langList:[],
          tvSeriesList:[],
          },

          methods:{

            getLanguages() {
                this.movieList.forEach((movie) => {
                    if(!this.langList.includes(movie.original_language)){
                     this.langList.push(movie.original_language);       
                    }
                })
            },

             makeAxiosSearch(type){
                const axiosOptions={
                    params: {
                        api_key: this.tmdbApiK,
                        query: this.textToSearch,
                        language: "it-IT"
                    }                                               //----------DA RIVEDERE
                }
                axios.get("https://api.themoviedb.org/3/search/" + type, axiosOptions).then((resp)=> {   
                   
                         if(type==="movie"){
                              this.movieList = resp.data.results.map((movie) => {
                                  if(movie.original_language ==="en"){movie.original_language ="us"}
                                  if(movie.original_language ==="ja"){movie.original_language ="jp"}
                                 movie.original_language = "https://www.countryflags.io/"+movie.original_language+"/flat/64.png";
                                movie.poster_path = "https://image.tmdb.org/t/p/w342"+movie.poster_path;
                                  
                                  return movie
                                  }
                              )
                         }else if(type==="tv"){
                             this.tvSeriesList = resp.data.results.map((serie) => {
                                if(movie.original_language ==="en"){movie.original_language ="us"}
                                if(movie.original_language ==="ja"){movie.original_language ="jp"}
                                serie.original_language = "https://www.countryflags.io/"+serie.original_language+"/flat/64.png";
                                serie.poster_path = "https://image.tmdb.org/t/p/w342"+serie.poster_path;
                                 serie.title = serie.name  //modifica dei dati PRIMA di inserirli in data
                                 serie.original_title = serie.original_name 
                                 return serie
                                 }
                             )};
                             this.getLanguages()
                })
            },
           
            doSearch() {
            
            this.makeAxiosSearch("movie")
            this.makeAxiosSearch("tv")
            
            
          
            },
            
        } 
})         
 



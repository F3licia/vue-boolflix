const app = new Vue({
        el: '#app',
        data: {
          tmdbApiK:"27c55bf69cc942b29c61c82472c4114c",
          textToSearch:"",
          movieList:[],
          movieListFltr:[],//

          tvSeriesList:[],
          tvSeriesListFltr:[],//

          active: {},
          actors:[],
          movieGenres:[],
          activeMovieGen:"",

          tvGenres:[],
          activeTvGen:"",
          },

        methods:{

            //recupera i dati dall'api e li divide in film e serie
            makeAxiosSearch(type){

                const axiosOptions={
                    params: {
                        api_key: this.tmdbApiK,
                        query: this.textToSearch,
                        language: "it-IT"
                    }                                             
                }
                axios.get("https://api.themoviedb.org/3/search/" + type, axiosOptions)
                .then((resp)=> {                      
                                if(type==="movie"){
                                this.movieList = resp.data.results;
                                this.movieListFltr = resp.data.results
                                }else if(type==="tv"){
                                this.tvSeriesList = resp.data.results.map((serie) => {
                                serie.title = serie.name  
                                serie.original_title = serie.original_name 
                                return serie})
                                this.tvSeriesListFltr =  this.tvSeriesList;
                                
                                } 

                //una volta separati i dati passano in funzioni che li rielaborano (vedi workOnData)          
                    this.workOnLang(this.movieList);
                    this.workOnData(this.movieList);
                    this.workOnLang(this.tvSeriesList);                    
                    this.workOnData(this.tvSeriesList);    
                })
            },

            //cambia valore "type" nella stringa API
            doSearch() {
                this.makeAxiosSearch("movie")
                this.makeAxiosSearch("tv")
            },

            //"workOnData" fa una copia dei valori e li rielabora con stringhe
            workOnData(data) {

                data.map((element) => { //compone link bandiera
                element.original_language_2 = "https://www.countryflags.io/"+element.original_language+"/flat/64.png";   

                element.vote_average_2 =   Math.ceil(element.vote_average /2 )  //stampa stelle voti
                element.vote_average_difference = 5 - element.vote_average_2;   //stampa stelle vuote 

                element.poster_path_2 = "https://image.tmdb.org/t/p/w342"+element.poster_path; //recupera poster
                
                })
             },

            //converte sigle lingua originale
            workOnLang(data) {
                data.map((el) => {
                    switch(el.original_language) {
                        case "en":
                        el.original_language = "us"
                        break;
                        case "ja":
                        el.original_language = "jp"
                        break;
                        case "da":
                        el.original_language = "dk"
                        break;
                        default:
                        el.original_language}                        
                     })
            },

            //seleziona un elemento
            selectFun(element){ 
                this.active = element;      
             // this.movie_id = element.id //
            },

            //chiudi finestra dettagli
            close() {
                this.active = '';  
            },
            
            //trova cast
            getCast(Type, Id) {  //scatenato al click da vue passa due argomenti richiamati con chiave nell'api

                axios.get(`https://api.themoviedb.org/3/${Type}/${Id}/credits`, {
                    params: {
                        api_key: this.tmdbApiK,

                    }
                }).then((resp) => {
                    this.actors = Vue.set(this.active , 'cast', resp.data.cast);
                    this.actors = this.actors.slice(0, 3);
                })
            },

            //trova genere
            getGenre(type, Id, element) {
                axios.get(`https://api.themoviedb.org/3/${type}/${Id}`, {

                    params: {
                        api_key: this.tmdbApiK,
                        language: 'it-IT'
                    }

                }).then((resp) => {
                    Vue.set(element, 'genres', resp.data.genres)
                })
            },

            //ricarica la pagina
            refresh() {
            window.location.reload();
            },

            movieFilter() {
            this.movieListFltr = [...this.movieList];  //ripopola l'array al cambio 

                if (this.activeMovieGen !== 0) {
                    this.movieListFltr = this.movieListFltr.filter((element) => {

                        if (element.genre_ids.includes(this.activeMovieGen)){
                            return true;
                        } else {
                            return false
                        }    
                    })
                }else{
                    this.movieListFltr = [...this.movieList]
                }  
            },

            seriesFilter() {
            this.tvSeriesListFltr = [...this.tvSeriesList];

                if (this.activeTvGen !== 0) {
                     this.tvSeriesListFltr = this.tvSeriesListFltr.filter((element) => {

                        if (element.genre_ids.includes(this.activeTvGen)) {
                            return true;
                        } else {
                            return false
                        }
                    })
                }else {
                    this.tvSeriesListFltr = [...this.tvSeriesList];
                }
            }
        },
        computed: {

        },
        mounted(){

            //tutti i generei film per il selettore 
            axios.get("https://api.themoviedb.org/3/genre/movie/list?", {

                params: {
                    api_key: this.tmdbApiK,
                    language: 'it-IT'
                }

            }) .then((resp)=> {   
                 this.movieGenres = resp.data.genres

            }),

             //tutti i generei serie tv per il selettore 
            axios.get("https://api.themoviedb.org/3/genre/tv/list?", {

                params: {
                    api_key: this.tmdbApiK,
                    language: 'it-IT'
                }

            }) .then((resp)=> {   
                this.tvGenres = resp.data.genres

            })

    },

})         







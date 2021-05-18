const app = new Vue({
        el: '#app',
        data: {
          tmdbApiK:"27c55bf69cc942b29c61c82472c4114c",
          textToSearch:"",
          movieList:[],
          tvSeriesList:[],
          },

        methods:{

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
                                this.movieList = resp.data.results
                                }else if(type==="tv"){
                                this.tvSeriesList = resp.data.results.map((serie) => {
                                serie.title = serie.name  
                                serie.original_title = serie.original_name 
                                return serie})  
                                } 

                //una volta separati i dati passano in funzioni che li rielaborano (vedi workOnData)          
                    this.workOnLang(this.movieList);
                    this.workOnLang(this.tvSeriesList);                    
                    this.workOnData(this.movieList);
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

                data.map((element) => {
                element.original_language_2 = "https://www.countryflags.io/"+element.original_language+"/flat/64.png";   //compone link bandiera

                element.vote_average_2 =   Math.ceil(element.vote_average /2 )  //stampa stelle voti
                element.vote_average_difference = 5 - element.vote_average_2;   //stampa stelle vuote 

                element.poster_path_2 = "https://image.tmdb.org/t/p/w342"+element.poster_path; //recupera poster

                element.overview_2 = element.overview;   //modifica panoramica
                if( element.overview_2.length > 600){ element.overview_2 = element.overview_2.slice(0, 600)+ "..."} 
                return element
                })
             },
        } 
})         
 
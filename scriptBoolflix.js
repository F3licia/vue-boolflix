const app = new Vue({
        el: '#app',
        data: {
          tmdbApiK:"27c55bf69cc942b29c61c82472c4114c",
          textToSearch:"",
          movieList:[],
          tvSeriesList:[],
          },

        methods:{

            workOnData(data) {
               data.map((element) => {
               if(element.original_language ==="en"){element.original_language ="us"}
               if(element.original_language ==="ja"){element.original_language ="jp"}
               if(element.original_language ==="da"){element.original_language ="dk"}
               element.original_language_2 = "https://www.countryflags.io/"+element.original_language+"/flat/64.png";
               element.vote_average_2 =   Math.ceil(element.vote_average /2 )  //stampare stelle
               element.poster_path_2 = "https://image.tmdb.org/t/p/w342"+element.poster_path;
               element.overview_2 = element.overview;
               if( element.overview_2.length > 600){ element.overview_2 = element.overview_2.slice(0, 650)+ "..."} 
               return element
                })
           },

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
                    this.workOnData(this.movieList)
                    this.workOnData(this.tvSeriesList)         
                })
            },     
            doSearch() {
                this.makeAxiosSearch("movie")
                this.makeAxiosSearch("tv")
            },
        } 
})         
 
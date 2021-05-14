const app = new Vue({
        el: '#app',
        data: {
          tmdbApiK:"27c55bf69cc942b29c61c82472c4114c",
          textToSearch:"",
          movieList:[],
          tvSeriesList:[],
          },

          methods:{

            getFlags(maindata) {    //si può migliorare
                maindata.forEach((el) => {
                    switch(el.original_language) {
                        case "en":
                        el.original_language = "https://www.countryflags.io/US/flat/64.png"
                        break;
                        case "fr":
                        el.original_language = "https://www.countryflags.io/FR/flat/64.png"
                        break;
                        case "de":
                        el.original_language = "https://www.countryflags.io/DE/flat/64.png"
                        break;
                        case "it":
                        el.original_language = "https://www.countryflags.io/IT/flat/64.png"
                        break;
                        case "es":
                        el.original_language = "https://www.countryflags.io/ES/flat/64.png"
                        break;
                        case "pt":
                        el.original_language = "https://www.countryflags.io/PT/flat/64.png"
                        break;
                        default:
                        el.original_language
                      }
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
                 axios.get("https://api.themoviedb.org/3/search/" + type, axiosOptions).then((resp)=> {
                   
                         if(type==="movie"){
                           this.movieList = resp.data.results  
                         }else if(type==="tv"){
                             this.tvSeriesList = resp.data.results.map((serie) => {
                                 serie.title = serie.name  //modifica dei dati PRIMA di inserirli in data
                                 serie.original_title = serie.original_name 
                                 return serie
                                 }
                             )};
                             this.getFlags(this.movieList)
                    })
             },
           
            doSearch() {
            
            this.makeAxiosSearch("movie")
            this.makeAxiosSearch("tv")
            this.getFlags(this.movieList)
            
          
            },
            
        } 
})         
 



   






//  <img src="https://www.countryflags.io/US/flat/64.png">

/*
if(type==="tv"){
      this.movieList = resp.data.results.map((el) => {
          el.original_language === "en"  //modifica dei dati PRIMA di inserirli in data
          el.original_language = "https://www.countryflags.io/US/flat/64.png"
          return serie
          }
      )};*/
const app = new Vue({
        el: '#app',
        data: {
          tmdbApiK:"27c55bf69cc942b29c61c82472c4114c",
          textToSearch:"",
          movieList:[],
          tvSeriesList:[],
          langList:[],
          },

          methods:{
    
            getLanguages() {
                this.movieList.forEach((movie) => {
                    if(!this.langList.includes(movie.original_language)){
                     this.langList.push(movie.original_language);       
                    }//va chiamata NEL then, alla fine
                })
            },

             makeAxiosSearch(type){
                const axiosOption={
                    params: {
                        api_key: this.tmdbApiK,
                        query: this.textToSearch,
                        language: "it-IT"
                    }
                }
               axios.get("https://api.themoviedb.org/3/search/" + type, axiosOption).then((resp)=> {
                   
                         if(type==="movie"){
                           this.movieList = resp.data.results  
                         }else if(type==="tv"){
                             this.tvSeriesList = resp.data.results.map((serie) => {
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
 





const app = new Vue({
        el: '#app',
        data: {
          tmdbApiK:"27c55bf69cc942b29c61c82472c4114c",
          textToSearch:"",
          movieList:[],
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
            doSearch() {
                const axiosOptions={
                    params: {
                        api_key: this.tmdbApiK,
                        query: this.textToSearch,
                        language: "it-IT"
                    }
                }
               axios.get("https://api.themoviedb.org/3/search/movie?", axiosOptions).then((resp)=> {
                          this.movieList = resp.data.results,
                          this.getLanguages()
                    }) 
          
              },
            
        } 
})         
 





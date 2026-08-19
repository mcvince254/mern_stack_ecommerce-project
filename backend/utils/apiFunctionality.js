class APIFunctionality{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        //console.log(this.queryStr.keyword) test keyword
        const keyword = this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"
            }
        }:{};
       this.query = this.query.find({... keyword});

       return this
    }

    filter(){
        const queryCopy = {... this.queryStr}
        // console.log(queryCopy)  test queryStr
        const removeFields  = ["keyword","page","limit"];
        removeFields.forEach(key => delete queryCopy[key]);
        this.query = this.query.find(queryCopy);
        return this
    }

   pagination(resultsPerPage){
       const currentPage = Number(this.queryStr.page) || 1;

       const skip = resultsPerPage * (currentPage - 1);

       this.query = this.query
           .skip(skip)
           .limit(resultsPerPage);

       return this;
   }
}

export default APIFunctionality
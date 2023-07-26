import React, { Component } from 'react'
import NewsItem from './NewsItem'


export default class News extends Component {

    

    constructor(){
        super();
        // console.log("Hi I am a constructor from news component");
        this.state={
            articles:new Array(),
            loading:false,
            page:1
        };
    }

    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=us&apiKey=6cc9971e83854413b842ebb838e31112&page=1&pageSize=15";
        let data=await fetch(url);
        // console.log(data);
        let parsedData=await data.json();
        // console.log(parsedData);
        // console.log(parsedData);
        let totalPage=Math.ceil(parsedData.totalResults/10);

        this.setState({
            articles:parsedData.articles,
            loading: this.state.loading,
            page: this.state.page,
            totalPage:totalPage
        });
        
        // fetch("url").then((response) => response.json())
        // .then((data) => {
        //     this.setState({
        //         articles: data.articles
        //     });
        // });

        // let url = //your url
        // fetch(url).then((res)=>{
        //     res.json().then((result)=>{
        //         console.log(result.articles)
        //         this.setState({articles:result.articles})
        //     })
        // })
    }

    handleNextClick=async function(event){
        // console.log("next clicked");
        // console.log(this.state);
        let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=6cc9971e83854413b842ebb838e31112&page=${this.state.page+1}&pageSize=15`;
        let data=await fetch(url);
        // console.log(data);
        let parsedData=await data.json();
        // console.log(parsedData);
        this.setState({
            articles:parsedData.articles,
            page:this.state.page+1,
            loading: this.state.loading
        });
    }

    handlePrevClick=async function(event){
        // console.log("previous clicked");
        let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=6cc9971e83854413b842ebb838e31112&page=${this.state.page-1}&pageSize=15`;
        let data=await fetch(url);
        // console.log(data);
        let parsedData=await data.json();
        // console.log(parsedData);
        this.setState({
            articles:parsedData.articles,
            loading: this.state.loading,
            page:this.state.page-1
        });
    }

    render() {
        // console.log("Printing this",this.state);
        return (
        <div className='container my-3'>
            <h1 className='text-center'>NewsMonkey - Top headlines</h1>
            <div className="row">
                {   
                    this.state.articles.map(function (element){
                        if(element){
                            return (
                                <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,85):""} imageUrl={element.urlToImage?element.urlToImage:"https://micrometscientific.co.za/wp-content/uploads/2022/05/Blank-Image-600x600.png"} newsUrl={element.url} />
                                </div>
                                );
                        }
                        
                    })
                }   
            </div>
            <div className="contianer d-flex justify-content-between my-5">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick.bind(this)}>&larr; Previous</button>
                <button disabled={this.state.page>=this.state.totalPage} type="button" className="btn btn-dark" onClick={this.handleNextClick.bind(this)}>Next &rarr;</button>
            </div>
        </div>
        )
    }
}



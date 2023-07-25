import React, { Component } from 'react'
import NewsItem from './NewsItem'


export default class News extends Component {

    

    constructor(){
        super();
        console.log("Hi I am a constructor from news component");
        this.state={
            articles:[],
            loading:false,
            page:1
        };
    }

    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=6cc9971e83854413b842ebb838e31112&page=1";
        let data=await fetch(url);
        // console.log(data);
        let parsedData=await data.json();
        // console.log(parsedData);
        this.setState({
            articles:parsedData.articles,
            loading: this.state.loading,
            page: this.state.page
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
        let url=`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=6cc9971e83854413b842ebb838e31112&page=${this.state.page+1}`;
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
        let url=`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=6cc9971e83854413b842ebb838e31112&page=${this.state.page-1}`;
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
        return (
        <div className='container my-3'>
            <h1>NewsMonkey - Top headlines</h1>
            <div className="row">
                {
                    this.state.articles.map(function (element){
                        return (
                        <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title.slice(0,45)} description={element.description.slice(0,85)} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                        );
                    })
                }   
            </div>
            <div className="contianer d-flex justify-content-between my-5">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick.bind(this)}>&larr; Previous</button>
                <button type="button" className="btn btn-dark" onClick={this.handleNextClick.bind(this)}>Next &rarr;</button>
            </div>
        </div>
        )
    }
}



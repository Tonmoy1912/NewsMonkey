import React, { Component } from 'react'
import NewsItem from './NewsItem'


export default class News extends Component {

    

    constructor(){
        super();
        console.log("Hi I am a constructor from news component");
        this.state={
            articles:[],
            loading:false
        };
    }

    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=6cc9971e83854413b842ebb838e31112";
        let data=await fetch(url);
        console.log(data);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({articles:parsedData.articles});
        
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
            
        </div>
        )
    }
}



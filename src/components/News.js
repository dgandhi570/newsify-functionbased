import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  articles = []
  constructor(){
    super();
    this.state = {
    articles: this.articles,
    loading: false
  }
}

async componentDidMount() { 
  console.log("eh")
  let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=59a4717a84774b4abe4d455531c7dd41"
  let data = await fetch(url)
  let pdata =  await data.json()
  console.log(pdata)
  this.setState({articles: pdata.articles})

}

  render() {
    return (
      <div className='container my-3'>
        <h2>Newsifyy Yourself</h2><hr/>
        <div className='row'>
        {this.state.articles.map( (x) => 
                                           { return  <div className='col-md-4 my-3' key={x.url}>
                                              <NewsItem title={x.title.slice(0,20)} description={x.description.slice(0,50)} imageUrl={x.urlToImage
} newsUrl={x.url}/>
                                              </div> }  
                                                      )}
      </div>
      </div>
    )
  }
}

export default News 
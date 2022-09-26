import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import PropTypes from 'prop-types'



export class News extends Component {
  
  static defaultProps = {
      country: "in",
      category: "general"
  }

static propTypes = {
  country: PropTypes.string,
  category: PropTypes.string
}

  constructor(){
    super();
    this.state = {
    articles: [],
    loading: false,
    page: 1

  }

}

async componentDidMount() { 
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cac4e5d83c58454e9a975d0ac5a1204d&pageSize=6`
  let data = await fetch(url)
  this.setState({loading: true})
  let pdata =  await data.json()
  this.setState({articles: pdata.articles, totalResults: pdata.totalResults, loading: false})

};


nextClick = async () => {
  console.log("next")
  if(this.state.page + 1 > Math.ceil(this.state.totalResults/6)){
  
  }else{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cac4e5d83c58454e9a975d0ac5a1204d&page=${this.state.page + 1}&pageSize=6`
  let data = await fetch(url)
  this.setState({loading: true})
  let pdata =  await data.json()
  this.setState({
    page: this.state.page + 1,
    articles: pdata.articles,
    loading: false
  })}
}

prevClick = async () => {
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cac4e5d83c58454e9a975d0ac5a1204d&page=${this.state.page - 1}&pageSize=6`
  let data = await fetch(url)
  this.setState({loading: true})
  let pdata =  await data.json()
  this.setState({
    page: this.state.page - 1,
    articles: pdata.articles,
    loading: false
  })
}

  render() {
    
    return (
      <div style={{backgroundColor: "black"}}>
        <br/>
        {!this.state.loading && <Loading/>}

        <div className='container' >
        <h1 style={{color: "white"}}>Newsifyy Yourself : {this.props.category.toUpperCase()}</h1><hr/>
        <div className='row'>
        {!this.state.loading && this.state.articles.map( (x) => 
                                           { return  <div className='col-md-4 my-3' key={x.url}>
                                              <NewsItem title={x.title?x.title.slice(0,18):""} description={x.description?x.description.slice(0,80):""} imageUrl={x.urlToImage} newsUrl={x.url}/>
                                              </div> }  
                                                      )}
      </div>

          <div className='container d-flex justify-content-between my-3' >

          <button disabled={this.state.page === 1} type="button" className="btn btn-light" style={{borderRadius: "200%"}} onClick={this.prevClick}> &larr; </button>
          <h3 style={{color: "white"}}>Page: {this.state.page}</h3>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/6)} className="btn btn-light" style={{borderRadius: "200%"}} onClick={this.nextClick}> &rarr;</button>
          </div>
          <br/>
      </div>
      </div>
    )
  }
}

export default News 
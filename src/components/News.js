import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {
  
  static defaultProps = {
      country: "in",
      category: "all"
  }

static propTypes = {
  country: PropTypes.string,
  category: PropTypes.string
}

capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props){
    super(props);
    this.state = {
    articles: [],
    loading: 0,
    page: 1,
    totalResults: 0,
    progress: 0
  }
  document.title = `Newsify - ${this.capitalizeFirstLetter(this.props.category)}`;

}

async updateNews(){
    this.props.setProgress(20)
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=59a4717a84774b4abe4d455531c7dd41&page=${this.state.page}&pageSize=6`
    let url =  `https://inshorts.deta.dev/news?category=${this.props.category}`
    this.setState({loading: 1})
    this.props.setProgress(40)
    let data = await fetch(url)
    this.props.setProgress(60)
    let pdata =  await data.json()
    console.log(pdata)
    this.props.setProgress(80)
    this.setState({articles: pdata.data, totalResults: pdata.data.length, loading: 0})
    this.props.setProgress(100)

}

async componentDidMount() { 
  this.updateNews();

};

fetchMoreData = async () => {
  this.setState({page: this.state.page + 1})
  // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=59a4717a84774b4abe4d455531c7dd41&page=${this.state.page}&pageSize=6`
   let url =  `https://inshorts.deta.dev/news?category=${this.props.category}`
  let data = await fetch(url)
    let pdata =  await data.json()
    console.log(pdata)
    this.setState({articles: this.state.articles.concat(pdata.data), totalResults: pdata.data.length})
  };



  render() {
    
    return (
      <>
      <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
        hasMore={this.state.articles.length !== this.state.totalResults}
        
        
        >
                                      </InfiniteScroll>
      <div style={{backgroundColor: "black"}}>

        <br/>
        <div className='container' >
        <h1 style={{color: "white"}}>Newsifyy Yourself : {this.capitalizeFirstLetter(this.props.category)}</h1><hr/>
        {this.state.loading?<Loading/>:""}

        
        <div className='row'>
        {this.state.articles.map( (x) => 
                                    { return  <div className='col-md-4 my-3' key={x.url}>
                                      <NewsItem title={x.title?x.title.slice(0,18):""} content={x.content?x.content.slice(0,80):""} author={x.author} imageUrl={x.imageUrl} readMoreUrl={x.readMoreUrl}/>
                                      </div> }  
                                      )}
        </div>
          
      </div>
      </div>
      </>
    )
  }
}

export default News 
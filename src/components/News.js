import React,{useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import PropTypes from 'prop-types'

import InfiniteScroll from 'react-infinite-scroll-component';



const News =(props)=> {
  


capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props){
    super(props);
    state = {
    articles: [],
    loading: 0,
    page: 1,
    totalResults: 0,
    progress: 0
  }
  document.title = `Newsify - ${capitalizeFirstLetter(props.category)}`;

}

async updateNews(){
    props.setProgress(20)
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=59a4717a84774b4abe4d455531c7dd41&page=${state.page}&pageSize=6`
    let url =  `https://inshorts.deta.dev/news?category=${props.category}`
    setState({loading: 1})
    props.setProgress(40)
    let data = await fetch(url)
    props.setProgress(60)
    let pdata =  await data.json()
    console.log(pdata)
    props.setProgress(80)
    setState({articles: pdata.data, totalResults: pdata.data.length, loading: 0})
    props.setProgress(100)

}

async componentDidMount() { 
  updateNews();

};

fetchMoreData = async () => {
  setState({page: state.page + 1})
  // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=59a4717a84774b4abe4d455531c7dd41&page=${state.page}&pageSize=6`
   let url =  `https://inshorts.deta.dev/news?category=${props.category}`
  let data = await fetch(url)
    let pdata =  await data.json()
    console.log(pdata)
    setState({articles: state.articles.concat(pdata.data), totalResults: pdata.data.length})
  };



  render() {
    
    return (
      <>
      <InfiniteScroll
        dataLength={state.articles.length}
        next={fetchMoreData}
        style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
        hasMore={state.articles.length !== state.totalResults}
        
        
        >
                                      </InfiniteScroll>
      <div style={{backgroundColor: "black"}}>

        <br/>
        <div className='container' >
        <h1 style={{color: "white"}}>Newsifyy Yourself : {capitalizeFirstLetter(props.category)}</h1><hr/>
        {state.loading?<Loading/>:""}

        
        <div className='row'>
        {state.articles.map( (x) => 
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

News.defaultProps = {
  country: "in",
  category: "all"
}

News.propTypes = {
country: PropTypes.string,
category: PropTypes.string
}


export default News 
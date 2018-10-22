import React, { Component } from 'react'
/*import { Switch, Route } from 'react-router-dom'

import Article from './views/Article'
import ItemArticle from './components/ItemArticle'
import Counter from './components/Counter'*/

import NProgress from 'nprogress'

import './assets/bootstrap.min.css'
import 'nprogress/nprogress.css'

import Locales from './locales'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiData: [],
      activeLanguage: "ua",
      activeCategory: "general"
    }

    this.loadInfo = {
      nowLoading: false,
      page: 1
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', evt => this.handleScroll(evt))
    this.getNews()
  }
  getNews() {
    NProgress.start()
    this.loadInfo.nowLoading = true
    fetch('https://newsapi.org/v2/top-headlines?country=' + this.state.activeLanguage + '&category=' + this.state.activeCategory + '&apiKey=bc3c497432b6483689a63ea2bf294392&pageSize=5&page=' + this.loadInfo.page)
      .then(response => response.json())
      .then((data) => {
        let oldData = this.state.apiData

        oldData = oldData.concat(data.articles)

        this.setState({ apiData: oldData })
        this.loadInfo.nowLoading = false
        this.loadInfo.page++
        NProgress.done()
      })
  }
  handleScroll(event) {
    if (Math.abs(document.body.scrollHeight - (window.scrollY + window.innerHeight)) <= 70) {
      if (!this.loadInfo.nowLoading) {
        this.getNews()
      }
    }
  }
  changeLanguage(e) {
    console.log(e.target.value)
    this.setState({
      activeLanguage: e.target.value,
      apiData: []
    }, () => {
      this.loadInfo = {
        nowLoading: false,
        page: 1
      }
      this.getNews()
    })
  }
  changeCategory(e) {
    this.setState({
      activeCategory: e.target.value,
      apiData: []
    }, () => {
      this.loadInfo = {
        nowLoading: false,
        page: 1
      }
      this.getNews()
    })
  }
  render() {
    let items = []
    for (let item of this.state.apiData) {
      items.push(
        <div key={items.length} className="card mb-2 mt-2">
          <img className="card-img-top" src={item.urlToImage} />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
          </div>
          <div className="card-footer">
            <span class="badge badge-info" style={{ marginTop: '10px' }}>{item.source.name}</span>
            <a href={item.url} target="_bank" className="btn btn-primary float-right">{Locales.read[this.state.activeLanguage]}</a>
          </div>
        </div>
      )
    }

    let languages = []
    for (let index in Locales.languages) {
      languages.push(<option value={index} key={index}>{Locales.languages[index]}</option>)
    }

    let categories = []
    for (let index in Locales.categories) {
      categories.push(<option value={index} key={index}>{Locales.categories[index][this.state.activeLanguage]}</option>)
    }
    return (
      <div className="App">

        <div class="navbar navbar-fixed-top navbar-dark bg-dark">
          <div class="navbar-header pull-left">
            <a class="navbar-brand" href="#">{Locales.news[this.state.activeLanguage]}</a>
          </div>
          <div class="navbar-header pull-right">
            <select onChange={(e) => this.changeLanguage(e)} value={this.state.activeLanguage} style={{ marginRight: '10px' }}>
              {languages}
            </select>
            <select onChange={(e) => this.changeCategory(e)} value={this.state.activeCategory} style={{ marginRight: '10px' }}>
              {categories}
            </select>
            <button type="button" class="btn btn-default navbar-btn">{Locales.likes[this.state.activeLanguage]}</button>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 col-sm-12">
              {items}
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
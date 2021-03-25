import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
let stockUrl = 'http://localhost:3000/stocks'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolio: [],
    filter: "All",
    sort: "None"
  }
  componentDidMount(){
    fetch(stockUrl)
    .then(res => res.json())
    .then(stocks => this.setState({ stocks }))
  }

  onPurchaseStock = (id) => {
    let stocks = this.state.stocks
    let newPortfolioItem = stocks.filter(stock => stock.id === id)
    this.setState((prevState)=> {
      return{
      ...prevState,
      portfolio: [...this.state.portfolio, ...newPortfolioItem]
    }
  })
  }

  removeStock = (id) => {
    let newPortfolio = this.state.portfolio.filter(stock => stock.id !== id)
    this.setState((prevState)=> {
      return{
        
        portfolio: [...newPortfolio]
      }
    })
  }

  filterStocks = () => {
    
    switch (this.state.filter){
      case "All":
        return this.state.stocks
      case "Tech":
        return this.state.stocks.filter(s => s.type === "Tech")
      case "Sportswear":
        return this.state.stocks.filter(s => s.type === "Sportswear")
      case "Finance":
        return this.state.stocks.filter(s => s.type === "Finance")
      default:
        return this.state.stocks
    }
  }

  editFilter = (e) => {
    this.setState({filter: e.target.value})
  }

  handleABCSort = (e) => {
    let newArray = this.state.stocks.sort((a,b) => a.name.localeCompare(b.name))
    this.setState({
      stocks: newArray,
      sort: e.target.value
    })
    
  }

  handlePriceSort = (e) => {
    let newArray = this.state.stocks.sort((a,b) => (a.price - b.price))
     this.setState({
      stocks: newArray,
      sort: e.target.value
      })
  }


  render() {
    // console.log(this.state)
    return (
      <div>
        <SearchBar sort={this.state.sort} editFilter={this.editFilter} abcSort={this.handleABCSort} priceSort={this.handlePriceSort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.filterStocks()} purchaseStock={this.onPurchaseStock} />

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.portfolio} removeStock={this.removeStock} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;

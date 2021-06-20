import React from 'react';
import Box from './components/box/box.component';
import './App.scss';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      portfolios: [
        {
          quantity: 1,
          portfolio: 7,
          disabled: false
        },
        {
          quantity: 5,
          portfolio: 10,
          disabled: false
        },
        {
          quantity: 10,
          portfolio: 6,
          disabled: false
        },
        {
          quantity: 50,
          portfolio: 5,
          disabled: false
        },
        {
          quantity: 100,
          portfolio: 3,
          disabled: false
        },
        {
          quantity: 500,
          portfolio: 2,
          disabled: false
        },
        {
          quantity: 1000,
          portfolio: 12,
          disabled: false
        },
        {
          quantity: 5000,
          portfolio: 13,
          disabled: false
        },
        {
          quantity: 10000,
          portfolio: 1,
          disabled: false
        },
        {
          quantity: 50000,
          portfolio: 9,
          disabled: false
        },
        {
          quantity: 100000,
          portfolio: 4,
          disabled: false
        },
        {
          quantity: 250000,
          portfolio: 8,
          disabled: false
        },
        {
          quantity: 500000,
          portfolio: 11,
          disabled: false
        },
        {
          quantity: 1000000,
          portfolio: 14,
          disabled: false
        }
      ],
      giftPortfolios: {
        "1": "Pandora Charm",
        "5": "Sueter",
        "10": "Pistaches",
        "50": "Sueter",
        "100": "Pandora Joyero",
        "500": "Takis",
        "1000": "Macbook Case",
        "5000": "Pandora Pulsera",
        "10000": "Pica Fresa",
        "50000": "Mazapan",
        "100000": "Chocolates",
        "250000": "Lukas",
        "500000": "Pelon Riko",
        "1000000": "Vuala"
      },
      gifts: 0,
      chooseCase: false,
      giftCase: {},
      numberCase: 0,
      toOffer: false,
      endGame: false,
      offer: 0,
      audio: true
    }
  }

  disabler = (portfolio) => {
    if (!portfolio.disabled) {
      this.calculateOffer();
      const toOpen = this.state.portfolios.filter(port => port.disabled === false).length;
      if (toOpen <= 2) {
        this.setState({
          endGame: true,
          toOffer: true
        });
        return;
      }
      const newPort = {
        ...portfolio,
        disabled: true
      };
      const newGift = this.state.gifts + 1;
      this.setState({
        portfolios: this.state.portfolios.map((port) => port.quantity === portfolio.quantity ? newPort : port),
        gifts: newGift
      });
      if (newGift % 2 === 0) {
        this.setState({
          toOffer: true
        });
      }
    }
  }

  choosePortfolio = (port, caseNumber) => {
    console.log(port);
    this.setState({
      chooseCase: true,
      giftCase: port,
      numberCase: caseNumber
    });
  }

  deal = () => {
    this.setState({
      endGame: true
    });
  }

  noDeal = () => {
    this.setState({
      toOffer: false
    })
  }

  calculateOffer = () => {
    const toOpen = this.state.portfolios.filter(port => port.disabled === false);
    const filtered = toOpen.map(p => p.quantity).reduce((total, num) => total + num) / toOpen.length;
    this.setState({
      offer: Math.floor(filtered)
    });
  }

  render() {
    return (
      <div className='main'>
        <div className={`${this.state.numberCase === 0 ? 'hide' : 'sectioner'} ${this.state.toOffer ? 'hide' : 'sectioner'}`}>
          {this.state.portfolios.filter((p, i) => i < (this.state.portfolios.length / 2)).map((port, index) => (
            <span key={index} className={`pricer ${port.disabled ? 'disabled' : ''}`} onClick={() => this.disabler(port)}>
              <b>${port.quantity}</b>
            </span>
          ))}
        </div>
        {!this.state.endGame &&
          <div className='main-section'>
            <img className='logo' src='https://i.imgur.com/TRDiHu5.png' alt='Dear or no Deal' />
            {!this.state.chooseCase &&
              <div className='box-container'>
                {this.state.portfolios.slice().sort((a, b) => (a.portfolio > b.portfolio) ? 1 : (b.portfolio > a.portfolio) ? -1 : 0).map((port, index) => (<Box key={index} number={port.portfolio} handleClick={() => this.choosePortfolio(port, port.portfolio)} />))}
              </div>
            }
            {this.state.chooseCase &&
              <div>
                <h1>Yours:</h1>
                <Box number={this.state.numberCase} handleClick={() => null} />
              </div>
            }
            {this.state.toOffer &&
              <div className='offer'>
                <h2>Offer: ${this.state.offer}</h2>
                <div className='btns'>
                  <div className='btn deal pulse' onClick={this.deal}>Deal</div>
                  <div className='btn no-deal pulse' onClick={this.noDeal}>No Deal</div>
                </div>
              </div>
            }
          </div>
        }
        {this.state.endGame &&
          <div className='final'>
            <img className='logo' src='https://i.imgur.com/TRDiHu5.png' alt='Dear or no Deal' />
            <h1>Congratulations: </h1>
            <h2>You win: ${this.state.offer}</h2>
            <h1>Your Case:</h1>
            <Box number={this.state.numberCase} handleClick={() => null} />
            <h2>Amount: ${this.state.giftCase.quantity} </h2>
            <h2>Gift: {this.state.giftPortfolios[this.state.giftCase.quantity]}</h2>
          </div>

        }
        <div className={`${this.state.numberCase === 0 ? 'hide' : 'sectioner'} ${this.state.toOffer ? 'hide' : 'sectioner'}`}>
          {this.state.portfolios.filter((p, i) => i >= (this.state.portfolios.length / 2)).map((port, index) => (
            <span key={index} className={`pricer ${port.disabled ? 'disabled' : ''}`} onClick={() => this.disabler(port)}>
              <b>${port.quantity}</b>
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default App;

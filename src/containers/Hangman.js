import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import './Hangman.css'

import { choseLetter, restart } from '../actions/hangman'

const WordItem = styled.li`
  display: inline-block;
  width: 20px;
  margin: 0 3px;
  text-align: center;
  border-bottom: 1px solid black;
`;

class Hangman extends PureComponent {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleButton = this.handleButton.bind(this)
    const { chose, wrong, word, maxTries, } = this.props
  }

  handleKeyDown( event ) {
    const { dispatch } = this.props;
    dispatch(choseLetter(event.key));
  }

  handleButton() {
    const { dispatch } = this.props;
    dispatch(restart());
  }

  render() {
    const short = this.props
    const guessWords = []
    let correctCount = 0
    let gameMessage = ""

    for(let i = 0; i < short.word.length; i++) {
      let currentLetter = ""

      if (short.chose.includes(short.word[i])) {
        currentLetter = short.word[i]
        correctCount += 1
      }

      guessWords.push(<WordItem key={i}>{ currentLetter }</WordItem>)
    }

    if (correctCount === short.word.length) {
      gameMessage = "YOU WON!!"
    } else if ( short.maxTries - short.wrong === 0) {
      gameMessage = `YOU LOSE.. the correct word is: ${this.word}`
    }

    return (
      <div
        tabIndex="0"
        onKeyDown={this.handleKeyDown}
        ref={event => this.gameBox = event }
      >
        <h1>Κρεμάλα</h1>
        <p>{guessWords}</p>
        <p>You have {short.maxTries - short.wrong} tries left</p>
        <p>Guessed: {short.chose.join("-")}</p>
        <p>{gameMessage}</p>
        <button  onClick={this.handleButton}>Restart</button>
        <p>"wisdom", "mythology", "skeptical", "archaic", "asteroid"</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { hangman } = state
  return hangman;
}

export default connect(mapStateToProps)(Hangman)

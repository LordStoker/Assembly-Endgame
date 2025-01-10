import { useState } from 'react'
import {languages} from './languages.js'

export default function App() {

  const[currentWord, setCurrentWord] = useState('React');
  const[guessedLetters, setGuessedLetters] = useState([]);


  //ALFABETO
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
    return(
      <button onClick={ () => setGuessedLetters(prevGuessedLetters => [...prevGuessedLetters, letter])}key={letter}>{letter}</button>
    )
  });
  console.log(guessedLetters);
  //PALABRA A ADIVINAR
  const wordLetters = currentWord.split('').map((letter, index) => {
    return(
      <span className='letter' key={index}>
        {letter.toUpperCase()}
      </span>
    )
  }
  );
  //CHIPS DE LENGUAJES (VIDAS)
  const languagesChips = languages.map(language => {
    return(
      <span 
        className='chip'
        key={language.name}
        style={{backgroundColor: language.backgroundColor, color: language.color}}
      >
        {language.name}
      </span>
    )
  })

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className='game-Status'>
        <h2>You win!</h2>
        <p>Well done 🎉</p>
      </section>
      <section className='language-chips'>
        {languagesChips}
      </section>
      <section className='word'>
        {wordLetters}
      </section>
      <section className='keyboard'>
        {alphabet}
      </section>
      <button className='new-Game'>New Game</button>


      {/* <section className='youLose'>
        <h2>Game over</h2>
        <p>You lose! Better start learning Assembly 😭</p>
      </section> */}
    </main>
  )
}



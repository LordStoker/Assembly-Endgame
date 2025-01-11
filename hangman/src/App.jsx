import {useState} from 'react'
import {languages} from './languages.js'
import {clsx} from 'clsx';

export default function App() {

  const[currentWord, setCurrentWord] = useState('react'.toUpperCase());
  const[guessedLetters, setGuessedLetters] = useState([]);

  //ALFABETO
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const keyboard = alphabet.split('').map(letter => {
    //COMPROBAR SI LA LETRA SE HA INTENTADO Y SI ESTÁ O NO EN LA PALABRA A ADIVINAR
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
      }
    );


      // const backGroundColor = isGuessed ? {backgroundColor: 'green'} : {backgroundColor: 'red'};
    return(
        <button 
        // style={{backgroundColor: isCorrect ? 'green' : isWrong ? 'red' : '#FCBA29'}}
        className={className}
        onClick={() => addGuessedLetter(letter)} key={letter}>
          {letter}
        </button>
      )
  });
//AÑADIR LETRAS SI NO SE REPITEN
  function addGuessedLetter(letter) {
    setGuessedLetters(prevGuessedLetters =>
      prevGuessedLetters.includes(letter) ? prevGuessedLetters :
      [...prevGuessedLetters, letter]);
  }

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
        {keyboard}
      </section>
      <button className='new-Game'>New Game</button>


      {/* <section className='youLose'>
        <h2>Game over</h2>
        <p>You lose! Better start learning Assembly 😭</p>
      </section> */}
    </main>
  )
}



import {useState} from 'react'
import {languages} from './languages.js'
import {clsx} from 'clsx';
import Confetti from 'react-confetti';
import {getFarewellText} from './utils.js';

export default function App() {

  //STATE VARIABLES
  const[currentWord, setCurrentWord] = useState('react'.toUpperCase());
  const[guessedLetters, setGuessedLetters] = useState([]);
  // const[wrongAttempts, setWrongAttempts] = useState(0);
  //DERIVED VARIABLES
  const wrongAttempts = guessedLetters.filter(letter => !currentWord.includes(letter)).length;
  //const rightAttempts = guessedLetters.filter(letter => currentWord.includes(letter)).length;
  const isGameWon = currentWord.split('').every(letter => guessedLetters.includes(letter));
  const isGameLost = wrongAttempts >= languages.length -1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
  const gameStatusClass = clsx('game-status',{
    won : isGameWon,
    lost :  isGameLost,
    farewell : !isGameOver && isLastGuessIncorrect
  });


  function renderGameStatus(){
    if(!isGameOver && isLastGuessIncorrect){
      return <p className='farewell-message'>{getFarewellText(languages[wrongAttempts-1].name)}</p>;
    }
    if(isGameWon){
      return(
        <>
          <Confetti/>
          <h2>You win!</h2>
          <p>Well done 🎉</p>
        </>
      )
    }
    if(isGameLost){
      return(
        <>
          <h2>Game over</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )
    }

  }

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
        onClick={() => addGuessedLetter(letter)} key={letter}
        disabled={isGameOver}>
          
          {letter}
        </button>
      )
  });



//AÑADIR LETRAS SI NO SE REPITEN
  function addGuessedLetter(letter) {
    
    setGuessedLetters(prevGuessedLetters =>
      prevGuessedLetters.includes(letter) ? prevGuessedLetters :
      [...prevGuessedLetters, letter]);
    
    // if(!currentWord.includes(letter)) {
    //   setWrongAttempts(prevWrongAttempts => prevWrongAttempts + 1);
    // }
  }

  //PALABRA A ADIVINAR
  const wordLetters = currentWord.split('').map((letter, index) => {
    
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    return(   
         
      <span className='letter' key={index}>
        {isCorrect ? letter.toUpperCase() : ''}
      </span>
    )
  }
);
  //CHIPS DE LENGUAJES (VIDAS)
  const languagesChips = languages.map((language, index) => {

    const className = clsx('chip', index < wrongAttempts && 'lost'); 
    return(
      <span 
        className={className}
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
      <section className={gameStatusClass}>
      {renderGameStatus()}
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
      {isGameOver && <button className='new-game'>New Game</button>}


      {/* <section className='youLose'>
        <h2>Game over</h2>
        <p>You lose! Better start learning Assembly 😭</p>
      </section> */}
    </main>
  )
}



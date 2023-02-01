import React from 'react'
import { useState, useEffect } from 'react'
import LoadingFrame from '../components/LoadingFrame'

import QuestionsCarousel from '../components/QuestionsCarousel'
const { questions } = require('../data/questions.json')
// import { feliz } from '/happyFace.png'



const Examen = () => {

    const [humanScore, setHumanScore] = useState(0)
    const [AIScore, setAIScore] = useState(0)
    const [test, setTest] = useState([])
    const [gameFinished, setGameFinished] = useState(false);

    const updatePuntuaciones = ((human, AI) => {
        setHumanScore(humanScore + human)
        setAIScore(AIScore + AI)
    })

    useEffect(() => {
        const allQuestions = questions.slice();
        const selectedQuestions = [];
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * allQuestions.length);
            selectedQuestions.push(allQuestions[randomIndex]);
            allQuestions.splice(randomIndex, 1);
        }
        setTimeout(() => {
            setTest(selectedQuestions)
        }, 3000)
    }, [])

    return (
        <>

            {gameFinished ? (
                <div className='endGame'>
                    <p>Your test has been finished!</p>
                    <span className='endText'>
                        <p>Your score: {humanScore} </p>
                        <p>Co:here score: {AIScore} </p>
                        {humanScore > AIScore ?
                            (
                                <p>"You won!"</p>
                            ) :
                            (humanScore === AIScore ?
                                (
                                    <p>"It's a tie!"</p>
                                ) :
                                (
                                    <p>"Ooops, you lost..."</p>
                                ))
                        }
                    </span>
                    <span>
                        {humanScore > AIScore ?
                            (
                                <img className='endImg' src='/happyFace.png' alt='carita felis' />
                            ) :
                            (humanScore === AIScore ?
                                (
                                    <img className='endImg' src='/surprisedFace.png' alt='carita sorpremdida' />
                                ) :
                                (
                                    <img className='endImg' src='/sadFace.png' alt='carita tristona' />
                                ))
                        }
                    </span>
                </div>
            ) : (test.length > 0 ? (
                <QuestionsCarousel gameFinished={setGameFinished} updatePuntuaciones={updatePuntuaciones} questions={test} />
            ) : (
                <LoadingFrame text="Loading your test..."></LoadingFrame>
            ))
            }
        </>
    )
}

export default Examen
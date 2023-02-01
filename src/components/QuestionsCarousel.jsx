import { useEffect, useState } from "react";
import LoadingFrame from "./LoadingFrame";
import { askAI } from "../functions/funciones"
function QuestionsCarousel({ questions, updatePuntuaciones, gameFinished }) {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [AIThinking, setAIThinking] = useState(false);
    const [isUserOptionSelected, setIsUserOptionSelected] = useState(false);
    const [options, setOptions] = useState([]);
    const [AIOptionText, setAIOptionText] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [AIOption, setAIOption] = useState(null);
    const [userOption, setUserOption] = useState(null);

    useEffect(() => {
        setOptions(questions[currentQuestionIndex].options)
    }, [currentQuestionIndex, questions])

    function markAIOption(text) {
        const optionSelected = options.find(o => {
            return text.toLowerCase().includes(o.key.toLowerCase());
        });
        if (optionSelected) {
            setAIOption(optionSelected);
            setAIOptionText(text);
            const buttonAISelection = document.getElementById(optionSelected.key);
            buttonAISelection.classList.add("AISelection");
        }
        else {
            debugger;
            setAIOption({ key: null });
            setAIOptionText(text);
        }
    }

    function markCorrectAnswer() {
        const question = questions[currentQuestionIndex];
        const correctAnswer = question.options.find((o) => {
            return o.key.toLowerCase() === question.key.toLowerCase();
        })
        const buttonCorrectAnswer = document.getElementById(correctAnswer.key);
        buttonCorrectAnswer.classList.add("correctAnswer");
        setCorrectAnswer(correctAnswer);
    }


    const handleNext = () => {
        checkScores();
        setOptions(questions[currentQuestionIndex].options)
        resetStates();
    }

    function resetStates() {
        setAIThinking(false);
        setIsUserOptionSelected(false)
        setAIOptionText(null)
        setCorrectAnswer(null)
        setAIOption(null);
        setUserOption(null);
        if (currentQuestionIndex < 10 - 1) {
            setOptions(questions[currentQuestionIndex + 1].options)
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
        else
            gameFinished(true)
    }

    async function handleUser(option, button) {
        button.classList.add("userSelected");
        setUserOption(option);
        setIsUserOptionSelected(true);
        setAIThinking(true);
        const responeAI = await askAI(questions[currentQuestionIndex].question)
        markAIOption(responeAI)
        setAIThinking(false);
        setTimeout(() => {
            markCorrectAnswer();
        }, 3000)
    }


    function checkScores() {
        const scoreAI = correctAnswer.key === AIOption.key ? 10 : -5;
        const scoreHuman = correctAnswer.key === userOption.key ? 10 : -5;
        updatePuntuaciones(scoreHuman, scoreAI)
    }

    return (
        <>
            <div className="question-carousel">
                <h2>{questions[currentQuestionIndex].question}</h2>
                <div className="options">
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <button className="buttonOption" disabled={isUserOptionSelected} onClick={(e) => {
                            handleUser(option, e.currentTarget)
                        }} id={option.key} key={option.key}>{option.answer}</button>
                    ))}
                </div>
                {
                    AIThinking ? (<LoadingFrame text="The AI ​​is thinking..."></LoadingFrame>) : (null)
                }
                {
                    AIOptionText ? (
                        <div className="AIResponse">
                            <h2>Co:here said:</h2>
                            <p>{AIOptionText}</p>
                        </div>
                    ) : (null)
                }
                {
                    correctAnswer != null ? (
                        <div>
                            <button onClick={handleNext} className="goTo"> {currentQuestionIndex + 1 === 10 ? ("Finish!"):("Next >")}</button>
                        </div>
                    ) : (null)

                }
            </div>
        </>
    );
}

export default QuestionsCarousel;
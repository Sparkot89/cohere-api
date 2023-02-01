import { Link } from "react-router-dom"
const Inicio = () => {
    return (
        <div className='welcome' >
            <h1>Welcome!!!</h1>
            <span>
                <p>Are you smarter than an AI? Let's find out!</p>
                <p>This test consists of 10 random questions in which you will compete with Co:here (Artificial Intelligence), to answer them!</p>
            </span>
            <span className='welcomeLegend'>
                <p className="userResponse response"> User response</p>
                <p className="AIResponse response"> Co:here response</p>
                <p className="bothResponse response"> Both response</p>
                <p className="correnctAnswer response"> Correct answer</p>
            </span>
            <p className="ready">Are you ready?</p>
            <Link to='/Exam'><button className="goTo">GO!</button></Link>
        </div>
    )
}

export default Inicio
import React, {ChangeEvent,useEffect, useState} from "react";
import "./App.css";


// 1. Починить инпуты;
// 2. Имплементировать добавление и удаление инпутов;
// 3. По клику на Submit значение каждого из инпутов должно пройти валидацию
//    и в случае успеха в консоль нужно вывести веселый смайлик, а если хоть одно
//    значение не проходит - грустный смайлик;


const HAPPY_EMOJI = "😊";
const SAD_EMOJI = "😞";

type inputType = {
    value: string
}
export default function App() {
    let [arrValue, setArrValue] = useState<Array<string>>([])
    let [arrayInput, setArrayInput] = useState<Array<inputType>>([{value: ""}])
    let [checkResult, setCheckResult]= useState(false)

    const addInput = () => {
        setArrayInput([...arrayInput, {value: ""}])
    }

    let itemsInput = arrayInput.map((el, i) => {
        return <div key={i}>
            <input key={i} type="text" value={el.value}
                   onChange={(e) => onChangeHandler(e, i)}/>
            <button type="button" onClick={() => removeInput(i)}>Remove input
            </button>
        </div>
    })

    const removeInput = (i: number) => {
        setArrayInput([...arrayInput.filter((_, index) => index !== i)])
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        setArrayInput([...arrayInput.filter((el, index) => index === i ? arrayInput[i].value = e.target.value : el)])
    }
    useEffect(() => {
        const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        const validate = (value: string) => sleep(2000).then(() => value === "bob");
        const promises = arrValue.map(el => validate(el))
        const promise = Promise.all(promises)
        promise.then((res) => {
            setCheckResult(res.every(elem => elem))
        });
    }, [arrayInput, arrValue])

    const handleSubmit = () => {
        setArrValue(arrayInput.map(el => el.value))
        checkResult ? console.log(HAPPY_EMOJI): console.log(SAD_EMOJI)
    };

    return (
        <div className="App">
            <h2>Bob Form</h2>
            {itemsInput}
            <div className="controls">
                <button type="button" onClick={addInput}>Add input
                </button>
                <button onClick={handleSubmit} type="button">
                    Submit values
                </button>
            </div>
        </div>
    );
}


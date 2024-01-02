import React from 'react'
import './Variables.css';
const Length = ({isAngle, setIsAngle, isLength, setIsLength, isRightTriangle, text}) => {
    const handleChange = (e) => {
        let checkboxAngle = isRightTriangle ? e.target.id.slice(-2) : e.target.id.slice(-1);
        if(e.target.checked){
            if(isLength.used.length === null){
                setIsLength({...isLength, used: {...isLength.used, length: [{sd: checkboxAngle, length: null}]}})
            } else {
                setIsLength({...isLength, used: {...isLength.used, length: [...isLength.used.length, {sd: checkboxAngle, length: null}]}});
            }
        } else {
            if(isLength.used.length !== null){
                setIsLength({...isLength, used: {...isLength.used, length: isLength.used.length.filter(({sd}) => sd !== checkboxAngle)}});
            }
        }
    }

    const addLength = (e) => {
        isLength.used.length.map(({sd}, index) => {
            if(sd === e.target.id){
                let newLength = [...isLength.used.length];
                newLength[index].length = e.target.value !== '' ? e.target.value : null;
                setIsLength({...isLength, used: {...isLength.used, length: newLength}})
            }
        })
    } 

    return <div className="variable length">
        <div className="checkbox">
            {text.map((text, index) => {
            const round = index+1 === 1 || index+1 === 2 ? index+1 === 1 ? 'rounded-start' : '' : 'rounded-end';
            let usedLength = isRightTriangle ? isLength.used.length : isLength.used.length && isLength.used?.length?.map(knownLength => knownLength.sd);
            return <React.Fragment key={text}>
                <input type="checkbox" className="btn-check" name="length" id={'checkbox_' + text} autoComplete="off" onChange={handleChange}  {...isLength.sd === text && isLength.find && {disabled: true, checked: false}} {...isRightTriangle && usedLength === text && {checked: true}} key={'radio-' + text} 
                {...!isRightTriangle && usedLength?.includes(text) && {checked: true}}
                />
                <label className={"btn btn-secondary form-control rounded-0 " + round} htmlFor={'checkbox_' + text} key={'label-' + text}>{text}</label>
            </React.Fragment>
            })}
            <h3>Length</h3>
        </div>
        <div className="input">
            { isLength.used.length && isLength.used.length.map(({sd}, index) => {
                return sd !== isLength.sd || isAngle.find ? <input className='w-100 text-center mt-4' type="number" id={sd} placeholder={'length ' + sd + ' - 10'} key={index} value={isLength.used.length[index].length || sd} onChange={addLength} /> : null
            })}
        </div>
    </div>
}


const FindLength = ({isLength, setIsLength, text}) => {
    return <div className="variable find-length">
        <div className='radio'>
        {text.map((text, index) => {
        let round = index+1 === 1 || index+1 === 2 ? index+1 === 1 ? 'rounded-start' : '' : 'rounded-end'
        return <React.Fragment key={text}>
            <input type="radio" className="btn-check" name="findLength" id={'findLength'+text} autoComplete="off" {...isLength.sd === text && {checked: true}} onChange={(e) => {e.target.checked ? 
            setIsLength({...isLength, sd: text}) : setIsLength({...isLength, sd: null})}}/>
            {/* // setIsLength({...isLength, sd: text, used: {length: isLength.used.length.filter(({sd}) => sd !== text), angle: isLength.used.angle}}) : setIsLength({...isLength, find: null})}}/> */}
            <label className={"btn btn-secondary form-control rounded-0 " + round} htmlFor={'findLength'+text}>{text}</label>
            </React.Fragment>
        })}
        <h3>Find</h3>
        </div>
    </div>
}

export {Length, FindLength};
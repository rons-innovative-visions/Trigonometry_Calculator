import React from 'react'
const Angle = ({isAngle, setIsAngle, isLength, setIsLength, isRightTriangle, text, useAngle}) => {
    const handleChange = (e) => {
        let checkboxAngle = e.target.id[9];
        if(e.target.checked){
            if(isRightTriangle){
                setIsAngle({...isAngle, angle: checkboxAngle});
            } else {
                if(isLength.find){
                    if(isLength.used.angle === null){
                        setIsLength({...isLength, used: {...isLength.used, angle: [{angle: checkboxAngle, deg: null}]}})
                    } else {
                        setIsLength({...isLength, used: {...isLength.used, angle: [...isLength.used.angle, {angle: checkboxAngle, deg: null}]}});
                    }
                } else {
                    if(!useAngle){
                        if(isLength.used.angle === null){
                            setIsLength({...isLength, used: {...isLength.used, angle: [{angle: checkboxAngle, deg: null}]}})
                        } else {
                            setIsLength({...isLength, used: {...isLength.used, angle: [...isLength.used.angle, {angle: checkboxAngle, deg: null}]}});
                        }
                    } else {
                        setIsAngle({...isAngle, angle: e.target.id[10]})
                    }
                }
            }
        } else {
            if(isLength.used.angle !== null){
                setIsLength({...isLength, used: {...isLength.used, angle: isLength.used.angle.filter(({angle}) => angle !== checkboxAngle)}});
            }
        }
    }

    const addAngle = (e) => {
        isLength.used.angle.map(({angle}, index) => {
            if(angle === e.target.id){
                let newAngle = [...isLength.used.angle];
                newAngle[index].deg = e.target.value !== '' ? e.target.value : null;
                setIsLength({...isLength, used: {...isLength.used, angle: newAngle}});
            }
        })
    }

    return <div className={'variable angle' + (!isRightTriangle && ' non-right' || '')}>
        <div className="radio">
            {text.map((text, index) => {
            let type = isRightTriangle || useAngle ? 'radio' : 'checkbox';
            let id = useAngle ? 'findAngle_' + text : 'checkbox_' + text
            let round = !isRightTriangle ? index+1 === 1 || index+1 === 2 ? index+1 === 1 ? 'rounded-start' : '' : 'rounded-end' : index+1 === 1 ? 'rounded-start' : 'rounded-end';
            if(text.length === 3){
                round = index+1 === 1 || index+1 === 2 ? index+1 === 1 ? 'rounded-start' : '' : 'rounded-end';
            }
            let usedAngles = isRightTriangle ? isAngle.angle : isLength.used.angle && isLength.used?.angle?.map(knownAngle => knownAngle.angle);
            return <React.Fragment key={text}>
                <input type={type} className="btn-check" name="angle" id={id} autoComplete="off" onChange={handleChange} {...isRightTriangle && usedAngles === text && {checked: true}} key={'radio-' + text} 
                {...!isRightTriangle && !useAngle && usedAngles?.includes(text) && {checked: true}}
                {...!isRightTriangle && useAngle && isAngle.angle === text && {checked: true}}
                {...!isRightTriangle && !useAngle && isAngle.find  && isAngle.angle === text && {disabled: true, checked: false}}
                />
                <label className={"btn btn-secondary form-control rounded-0 " + round} htmlFor={id} key={'label-' + text}>{text}</label>
            </React.Fragment>
            })}
            <h3>{isAngle.find && useAngle ? 'Find' : 'Angle'}</h3>
        </div>
        {isRightTriangle && !isAngle.find ? 
            <input className='w-100 text-center' type="number" placeholder={'angle ' + isAngle.angle} onChange={(e) => setIsLength({...isLength, used: {...isLength.used, angle: e.target.value}})}/> :
            !isRightTriangle && !useAngle && isLength.used?.angle?.map(angle => {
                return isAngle.find && isAngle.angle === angle.angle || <input className='w-100 text-center' id={angle.angle} type="number" placeholder={'angle ' + angle.angle} onChange={addAngle} key={angle.angle} {...isAngle.angle === angle.angle && isAngle.find && {disabled: true, placeholder: 'angle ' + angle.angle}}/>
            })
        }
        
    </div>
}

export default Angle
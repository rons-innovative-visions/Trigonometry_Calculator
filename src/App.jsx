import {Angle, Length, FindLength} from './Pages/Variables/'
import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'

function App() {
  const [isRightTriangle, setIsRightTriangle] = useState(true)
  const [isAngle, setIsAngle] = useState({find: false, angle: 'B', used : {length: null, angle: null}})
  const [isLength, setIsLength] = useState({find: true, sd: 'AB', used : {length: [{sd: 'ac', length: null}], angle: null}})
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    if(isRightTriangle === false) {
      setIsLength({find: true, sd: 'a', used : {length: [{sd: 'b', length: null}], angle: [{angle: 'A', deg: null}, {angle: 'B', deg: null}]}})
      setIsAngle({find: false, ...isAngle})
      console.log(isAngle);
    } else {
      setIsLength({find: true, sd: 'AB', used : {length: null, angle: null}})    
      setIsAngle({find: false, ...isAngle})
    }
  }, [isRightTriangle])

  function getInverseTang(opp, adj) {
    // Calculate angle using inverse tangent
    const result = Math.atan(opp / adj) * 180 / Math.PI;
    return result.toFixed(2);
  }
  function getInverseCos(adj, hyp) {
    // Calculate angle using inverse cotangent
    const result = Math.acos(adj / hyp) * 180 / Math.PI;
    return result.toFixed(2);
  }
  function getInverseSine(opp, hyp) {
    // Calculate angle using inverse sine
    const result = Math.asin(opp / hyp) * 180 / Math.PI;
    return result.toFixed(2);
  }

  function getSine(length, angle, operator) {
    // Calculate side length using sine
    let result = length / Math.sin((angle * Math.PI) / 180);
    if (operator === '*'){
      result = length * Math.sin((angle * Math.PI) / 180);
    }
    return result.toFixed(4);
  }
  function getCos(length, angle, operator) {
    // Calculate side length using cos
    let result = length / Math.cos((angle * Math.PI) / 180);
    if (operator === '*'){
      result = length * Math.cos((angle * Math.PI) / 180);
    }
    return result.toFixed(4);
  }
  function getTan(length, angle, operator) {
    // Calculate side length using tan
    let result = length / Math.tan((angle * Math.PI) / 180);
    if (operator === '*'){
      result = length * Math.tan((angle * Math.PI) / 180);
    }
    return result.toFixed(4);
  }

  const calculate = () => {
    if(isRightTriangle){
      let lengths = isLength.used.length?.map(sideLength => sideLength.length && sideLength.length)
      lengths = lengths?.filter(sideLength => sideLength !== null)
      if(isAngle.find){
        lengths = {length: isLength.used.length?.map(sideLength => sideLength.length), sd: isLength.used.length?.map(sideLength => sideLength.sd)}
        lengths.length = lengths?.length?.filter(sideLength => sideLength !== '')
        let side1 = {sd: lengths.sd[0], length: lengths.length[0]};
        let side2 = {sd: lengths.sd[1], length: lengths.length[1]};

        // Cleaned up code for calculating angle B in a triangle
        
        if (isAngle.angle === 'B') {
          // Calculate angle B in case angle is 'B'
          if (side1.sd === 'AB') {
            if (side2.sd === 'AC') {
              // Calculate angle B using tangent
              setAnswer("Angle " + isAngle.angle + ' = ' + getInverseTang(side2.length, side1.length) + '°');
            } else if (side2.sd === 'CB') {
              // Calculate angle B using cosine
              setAnswer("Angle " + isAngle.angle + ' = ' + getInverseCos(side1.length, side2.length) + '°');
            }
          } else if (side1.sd === 'AC') {
            if (side2.sd === 'AB') {
              // Calculate angle B using tangent
              setAnswer("Angle " + isAngle.angle + ' = ' + getInverseTang(side1.length, side2.length) + '°');
            } else if (side2.sd === 'CB') {
              // Calculate angle B using sine
              setAnswer("Angle " + isAngle.angle + ' = ' + getInverseSine(side1.length, side2.length) + '°');
            }
          } else if (side1.sd === 'CB') {
            if (side2.sd === 'AB') {
              // Calculate angle B using cosine
              setAnswer("Angle " + isAngle.angle + ' = ' + getInverseCos(side2.length, side1.length) + '°');
            } else if (side2.sd === 'AC') {
              // Calculate angle B using sine
              setAnswer("Angle " + isAngle.angle + ' = ' + getInverseSine(side2.length, side1.length) + '°');
            }
          }
        } else {
          // Calculate angle C
          if (side1.sd === 'AB') {
            if (side2.sd === 'AC') {
              // Calculate angle C using tangent
              setAnswer("Angle " + isAngle.angle + ' = ' + getInverseTang(side1.length, side2.length) + '°');
            } else if (side2.sd === 'CB') {
              // Calculate angle C using sine
              setAnswer("Angle " + isAngle.angle + ' = ' + getInverseSine(side1.length, side2.length) + '°');
            }
          } else if (side1.sd === 'AC') {
            if (side2.sd === 'AB') {
              // Calculate angle C using tangent
              setAnswer("Angle " + isAngle.angle + ' = ' + getInverseTang(side2.length, side1.length) + '°');
            } else if (side2.sd === 'CB') {
              // Calculate angle C using cosine
              setAnswer("Angle " + isAngle.angle + ' = ' + getInverseCos(side1.length, side2.length) + '°');
            }
          } else if (side1.sd === 'CB') {
            if (side2.sd === 'AB') {
              // Calculate angle B using sine
              setAnswer("Angle " + isAngle.angle + ' = ' + getInverseSine(side2.length, side1.length) + '°');
            } else if (side2.sd === 'AC') {
              // Calculate angle B using cosine
              setAnswer("Angle " + isAngle.angle + ' = ' + getInverseCos(side2.length, side1.length) + '°');
            }
          }
        }
      } else {
        let find = isLength.sd;
        if (lengths?.length === 1 && isLength.used.angle) {;
          // Find using length & angle
          console.log(isLength.used.length[0]);
          let sd = isLength.used.length[0].sd;
          let length = isLength.used.length[0].length;
          let angle = isLength.used.angle;
        
          if (isAngle.angle === 'B') {
            if(find === 'AB') {
              if(sd === 'AC'){
                // Opposite (adjacent / hypotenuse)
                setAnswer('Length ' + isLength.sd + " = " + getTan(length, angle, '/'));
              } else if(sd === 'CB'){
                // Hypotenuse (adjacent)
                setAnswer('Length ' + isLength.sd + " = " + getCos(length, angle, '*'));
              }
            } else if(find === 'AC') {
              if(sd === 'AB'){
                // Adjacent (opposite)
                setAnswer('Length ' + isLength.sd + " = " + getTan(length, angle, '*'));
              } else if(sd === 'CB') {
                // Hypotenuse (opposite)
                setAnswer('Length ' + isLength.sd + " = " + getSine(length, angle, '*'));
              }
            } else if(find === 'CB') {
              if(sd === 'AB'){
                // Adjacent (hypotenuse)
                setAnswer('Length ' + isLength.sd + " = " + getCos(length, angle, '/'));
              } else if(sd === 'AC'){
                // Opposite (hypotenuse)
                setAnswer('Length ' + isLength.sd + " = " + getSine(length, angle, '/'));
              }
            }
          } else {
            if(find === 'AB'){
              if(sd === 'AC'){
                // Adjacent (opposite)
                setAnswer('Length ' + isLength.sd + " = " + getTan(length, angle, '*'));
              } else if(sd === 'CB'){
                // Hypotenuse (opposite)
                setAnswer('Length ' + isLength.sd + " = " + getSine(length, angle, '*'));
              }
            } else if(find === 'AC'){
              if(sd === 'AB'){
                // Opposite (adjacent)
                setAnswer('Length ' + isLength.sd + " = " + getTan(length, angle, '/'));
              } else if(sd === 'CB'){
                // Hypotenuse (adjacent)
                setAnswer('Length ' + isLength.sd + " = " + getCos(length, angle, '*'));
              }
            } else if(find === 'CB'){
              if(sd === 'AB'){
                // Opposite (hypotenuse)
                setAnswer('Length ' + isLength.sd + " = " + getSine(length, angle, '/'));
              } else if(sd === 'AC'){
                // Adjacent (hypotenuse)
                setAnswer('Length ' + isLength.sd + " = " + getCos(length, angle, '/'));
              }
            }
          }
        }
      } 
    } else {
      // if not right triangle
      if(isAngle.find) {
        // find angle
        let find = isAngle.angle;
        let lengths = isLength.used.length?.map(sideLength => sideLength.length)
        lengths = lengths.filter(sideLength => sideLength !== '' && sideLength !== null)
        let angles = isLength.used.angle?.map(angle => angle.angle && angle.deg)
        angles = angles?.filter(angle => angle !== '' && angle !== null)
        
        if (angles.length === 1 && lengths.length === 2) {
          // sin law
          let oppositeLength = isLength.used.length.map(({sd, length}) => find.toLowerCase() === sd && length);
          oppositeLength = oppositeLength.filter(sideLength => sideLength !== false).toString();
          let angle = angles.toString();
          let length = lengths.filter(sideLength => sideLength !== oppositeLength).toString();
          setAnswer(Math.asin(oppositeLength * Math.sin(angle * Math.PI / 180) / length) * 180 / Math.PI + '°');
        } else if (lengths.length === 3) {
          // cosine law
          let oppositeLength = isLength.used.length.map(({sd, length}) => find.toLowerCase() === sd && length);
          oppositeLength = oppositeLength.filter(sideLength => sideLength !== false).toString();
          let a = lengths.filter(sideLength => sideLength !== oppositeLength)[0]
          let b = lengths.filter(sideLength => sideLength !== oppositeLength)[1]
          // console.log('c^2=a^2+b^2-2ab*cos(c)');
          console.log(oppositeLength + '^2 = ' + a + '^2 + ' + b + '^2 - 2 * ' + a + ' * ' + b + ' * cos(B)');
          setAnswer(Math.acos(((oppositeLength * oppositeLength) - (a * a + b * b)) / -(2 * a * b)) * 180 / Math.PI + '°')
        }
      } else {
        // find length
        let find = isLength.sd;
        let lengths = isLength.used.length?.map(sideLength => sideLength.length)
        lengths = lengths.filter(sideLength => sideLength !== '' && sideLength !== null)
        let angles = isLength.used.angle?.map(angle => angle.angle && angle.deg)
        angles = angles?.filter(angle => angle !== '' && angle !== null)
        if(angles.length === 2 && lengths.length === 1) {
          let isOpposite = isLength.used.angle.map(({angle, deg}) => find.toUpperCase() === angle);
          if(isOpposite){
            let oppositeAngle = isLength.used.angle.map(({angle, deg}) => isLength.sd.toUpperCase() === angle && deg || null); oppositeAngle = oppositeAngle.filter(deg => deg !== null).toString();
            let length = lengths.toString()
            let angle = angles.filter(angle => angle !== oppositeAngle).toString();
            setAnswer(Math.sin(oppositeAngle * Math.PI/180) * length / Math.sin((angle * Math.PI) / 180))
          }
        } else if(angles.length === 1 && lengths.length === 2) {
          let oppositeAngle = isLength.used.angle.map(({angle, deg}) => find.toUpperCase() === angle && deg || null)
          oppositeAngle = oppositeAngle.filter(deg => deg !== null).toString();
          let a = lengths.filter(sideLength => sideLength !== oppositeAngle)[0];
          let b = lengths.filter(sideLength => sideLength !== oppositeAngle)[1];
          console.log('c^2 = ' + a + '^2 + ' + b + '^2 - 2 * ' + a + ' * ' + b + ' * cos(' + oppositeAngle + ')');
          setAnswer(Math.sqrt((a * a) + (b * b) - 2 * a * b * Math.cos(oppositeAngle * Math.PI / 180)))
        }
      }
    }
  }
  
  return (
    <>
      <div className="triangle">
      <h1>Find {isAngle.find ? 'Angle' : 'Length'}</h1>
        {isRightTriangle ? 
        <div className="rt">
          <Variables isRightTriangle={isRightTriangle} isAngle={isAngle} isLength={isLength} setIsLength={setIsLength} answer={answer}/>
        </div> : 
        <div className="t">
          <Variables isRightTriangle={isRightTriangle}  isAngle={isAngle} isLength={isLength} setIsLength={setIsLength} answer={answer}/>
        </div>}
      </div>
      <div className="variables">
        {answer && <h2 className='px-4 py-2 answer'>{answer}</h2>}
        <div className="variable switch">
          <input type="checkbox" id="rightTriangle" onChange={() => {
            setIsRightTriangle(!isRightTriangle)
            setIsAngle({find: false, angle: 'B', used : {length: null, angle: null}})
          }} {...isRightTriangle && {checked: true}}/><label htmlFor="rightTriangle">Toggle</label>
          <h3 className=''>Right Triangle</h3>
        </div>
        <div className="variable switch">
          <input type="checkbox" id="angle" {...isAngle.find && {checked: true}} onChange={() => {
            setIsAngle({...isAngle, find: !isAngle.find});
            setIsLength({...isLength, find: !isLength.find});
          }}/><label htmlFor="angle">Toggle</label>
          <h3 className=''>Find Angle</h3>
        </div>
        <h2>Variables</h2>
        {
          isLength.find ? (
            <>
              {isRightTriangle ? (
                <>
                  <FindLength {...{isLength, setIsLength, text: ['AB', 'AC', 'CB']}}/>
                  <Angle {...{isAngle, setIsAngle, isLength, setIsLength, isRightTriangle, text: ['C', 'B']}}/>
                  <Length {...{isAngle, setIsAngle, isLength, setIsLength, isRightTriangle, text: ['AB', 'AC', 'CB']}}/>
                </>
              ) : ( isLength.find &&
                <>
                  <FindLength {...{isLength, setIsLength, text: ['a', 'b', 'c']}}/>
                  <Angle {...{isAngle, setIsAngle, isLength, setIsLength, isRightTriangle, text: ['A', 'B', 'C']}}/>
                  <Length {...{isAngle, setIsAngle, isLength, setIsLength, isRightTriangle, text: ['a', 'b', 'c']}}/>
                </>
              )}
            </>
          ) : isRightTriangle ? (
            <>
              <Angle {...{isAngle, setIsAngle, isLength, setIsLength, isRightTriangle, text: ['C', 'B']}}/>
              <Length {...{isAngle, setIsAngle, isLength, setIsLength, isRightTriangle, text: ['AB', 'AC', 'CB']}}/>
            </>
          ) : (
            <>
              {isAngle.find && !isRightTriangle && <Angle {...{isAngle, setIsAngle, isLength, setIsLength, isRightTriangle, text: ['A', 'B', 'C'], useAngle: true}}/>}
              <Angle {...{isAngle, setIsAngle, isLength, setIsLength, isRightTriangle, text: ['A', 'B', 'C']}}/>
              <Length {...{isAngle, setIsAngle, isLength, setIsLength, isRightTriangle, text: ['a', 'b', 'c']}}/>
            </>
          )
        }
        <button className="btn btn-primary" onClick={calculate}>Calculate</button>
      </div>
    </>
  )
}

const Variables = ({isRightTriangle, isAngle, isLength, setIsLength, answer}) => {
  const sides = isRightTriangle ? ['ab', 'ac', 'cb'] : ['a', 'b', 'c'];  
  const angles = ['A', 'B', 'C'];
  // console.log(typeof isLength.used?.angle === 'string' || isLength.used.angle === null);
  const usedAngles = isRightTriangle ? isAngle.angle : isLength.used?.angle?.map(({angle}) => angle);
  return (
    <>
      <div className="angles">
        {angles.map((angle, index) => {
          return <React.Fragment key={angle}>
            <span id={angle}>{angle}</span>
            <div {...isRightTriangle && usedAngles === angle && {className: 'angle ' + angle}}></div>
            <div {...!isRightTriangle && usedAngles?.includes(angle) && {className: 'angle ' + angle}}></div>
          </React.Fragment>
        })}
      </div>
      <div className="lengths">
          {sides.map((side, index) => {
            return <React.Fragment key={side}>
              {isRightTriangle ? isLength.find && isLength.sd === side.toUpperCase() ? <input id={side} value={isLength.find ? 'unknown' : side} onChange={()=>{}}/> :
                isLength.used.length?.map(knownSide => knownSide.sd === side.toUpperCase() && 
                <input type='number' id={side} key={side} value={knownSide.length || ''} placeholder={side} onChange={(e) => {
                  let newLength = isLength.used.length;
                  console.log(newLength[index]);
                  newLength[index-1].length = e.target.value;
                  console.log(newLength);
                  setIsLength({...isLength, used: {...isLength.used, length: newLength}});
                }}/>
              ) :
              isLength.find && isLength.sd === side ? <input id={side} value={isLength.find ? 'unknown' : side} onChange={() => {}}/> :
              isLength.used.length?.map(knownSide => knownSide.sd === side && <input type='number' id={side} key={side} value={knownSide.length || ''} placeholder={side} onChange={() => {}}/>)
              }
            </React.Fragment>
          })}
        </div>
    </>
  )
}

export default App
import {useRef } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { setExp} from './factory/calcSlice';
import { Edit, setExpression  , evaluateExp} from './factory/calculating';


function App() { 
  let exp = useSelector(state => state.calc.exp)
  const dis = useDispatch()
  let live = useRef('0')
  
  let handleExp =  (e)=>{
     if(exp.includes('=')){
      if(e.target.textContent == 'Ac'){
        dis(setExp("00"))      
        live.current = '0'
        return
      }
      if(e.target.textContent == '='){
        return
      }
      if(isNaN(e.target.textContent) && e.target.textContent !='.'){
        dis(setExp([ live.current + e.target.textContent , 'CalcDead']))
        live.current = e.target.textContent
        return
      }
      else{
        dis(setExp([e.target.textContent , 'CalcDead']))
        live.current = e.target.textContent
        return
      }      
    }

    if(e.target.textContent == "Ac"){
        dis(setExp("00"))      
        live.current = '0'
        return
     }

    if(e.target.textContent == "0" && (exp == "" || (isNaN(exp[exp.length-1]) && exp[exp.length-1] != '.'))){
       return
    }

    if(e.target.textContent == "."){
      if(exp[exp.length-1] == "."){
         return
      }
      let piece = ""
      for (let i = exp.length -1 ; i >= 0; i--) {
        if(isNaN(exp[i]) && exp[i] != '.' ){
          break
        }  
        piece += exp[i]     
      }
      if(piece.includes('.')){
        return
      }
      if(live.current != '0' && !isNaN(live.current)){ 
         live.current += e.target.textContent ; 
         dis(setExp(e.target.textContent))
        return
      }
      if(isNaN(live.current)){ 
        live.current ="0" + e.target.textContent ; 
        dis(setExp("0" +e.target.textContent))
       return
     }
    }

    if( live.current == "0" || (isNaN(e.target.textContent) && e.target.textContent != '.') ){
      live.current  = e.target.textContent      
    }
    else if(!isNaN(e.target.textContent)){
      if((/[^0-9]/).test(live.current) && !live.current.includes('.'))
      {live.current = e.target.textContent }
      else{
        live.current = live.current + e.target.textContent
      }  
    }
    
    
    if(e.target.textContent == "="){
      console.log( "Test : " + exp);     
      let modified = Edit(exp)
      let result = evaluateExp(setExpression(modified))
      dis(setExp([modified , result , 'mod']))
      live.current = result
      console.log( "Result : " + result);
      return
    }
  
    dis(setExp(e.target.textContent))    
  }
 

  return (
    <>
    <div className="mt-16 mx-auto bg-black sm:w-full md:w-full lg:w-1/3 p-2 rounded-lg ring-2  ring-gray-500 hover:ring-4 ring-inset shadow-lg  hover:shadow-blue-500/50">
      <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>
     
      <div>       
          <p className="text-orange-400 font-mono text-xl font-bold text-end">{exp}</p>
          <p id="display" className="text-orange-400 font-mono text-xl font-bold text-end">
             {live.current}
          </p>
      </div>     
      <div className="grid grid-cols-4 grid-rows-6 mt-3 gap-1">
        <button onClick={handleExp} className="rounded bg-sky-800 text-white fw-bold h-14 w-full text-2xl hover:bg-sky-700 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130 col-span-2">(</button>
        <button onClick={handleExp} className="rounded bg-sky-800 text-white fw-bold h-14 w-full text-2xl hover:bg-sky-700 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130 col-span-2">)</button>
        <button onClick={handleExp} id="multiply" className="rounded bg-zinc-700 text-white fw-bold h-14 w-full text-2xl hover:bg-zinc-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">*</button>
        <button onClick={handleExp} id="divide" className="rounded bg-zinc-700 text-white fw-bold h-14 w-full text-2xl hover:bg-zinc-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">/</button>
        <button onClick={handleExp} d="sqrt"   className="rounded bg-zinc-700 text-white fw-bold h-14 w-full text-2xl hover:bg-zinc-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">√</button>
        <button onClick={handleExp} id="add" className="rounded bg-zinc-700 text-white fw-bold h-14 w-full text-2xl hover:bg-zinc-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">+</button>
        <button onClick={handleExp} id="one" className="rounded bg-slate-600 text-white fw-bold h-14 w-full text-2xl hover:bg-slate-400 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">1</button>
        <button onClick={handleExp} id="two" className="rounded bg-slate-600 text-white fw-bold h-14 w-full text-2xl hover:bg-slate-400 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">2</button>
        <button onClick={handleExp} id="three" className="rounded bg-slate-600 text-white fw-bold h-14 w-full text-2xl hover:bg-slate-400 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">3</button>
        <button onClick={handleExp} id="subtract" className="rounded bg-zinc-700 text-white fw-bold h-14 w-full text-2xl hover:bg-zinc-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">-</button>
        <button onClick={handleExp} id="four" className="rounded bg-slate-600 text-white fw-bold h-14 w-full text-2xl hover:bg-slate-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">4</button>
        <button onClick={handleExp} id="five" className="rounded bg-slate-600 text-white fw-bold h-14 w-full text-2xl hover:bg-slate-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">5</button>
        <button onClick={handleExp} id="six" className="rounded bg-slate-600 text-white fw-bold h-14 w-full text-2xl hover:bg-slate-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">6</button>
        <button onClick={handleExp} id="exp" className="rounded bg-zinc-700 text-white fw-bold h-14 w-full text-2xl hover:bg-zinc-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">^</button>
        <button onClick={handleExp} id="seven" className="rounded bg-slate-600 text-white fw-bold h-14 w-full text-2xl hover:bg-slate-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">7</button>
        <button onClick={handleExp} id="eight" className="rounded bg-slate-600 text-white fw-bold h-14 w-full text-2xl hover:bg-slate-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">8</button>
        <button onClick={handleExp} id="nine" className="rounded bg-slate-600 text-white fw-bold h-14 w-full text-2xl hover:bg-slate-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">9</button>
        <button onClick={handleExp} id="clear" className="rounded bg-red-800 text-white fw-bold h-14 w-full text-2xl hover:bg-red-900 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">Ac</button>
        <button onClick={handleExp} id="zero" className="rounded bg-slate-600 text-white fw-bold h-14 w-full text-2xl hover:bg-slate-400 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">0</button>
        <button onClick={handleExp} id="decimal" className="rounded bg-sky-800 text-white fw-bold h-14 w-full text-2xl hover:bg-sky-700 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">.</button>
        <button onClick={handleExp} id="equals"  className="rounded bg-blue-500 text-white fw-bold h-14 w-full text-2xl hover:bg-blue-700  col-span-2 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-130">=</button>    
      </div>    
  </div> 
   <div className="mt-7 mx-auto bg-neutral-700 sm:w-full md:w-full lg:w-1/3 p-4 rounded-lg ring-2 shadow-lg  hover:shadow-blue-700/50">
    <div className='text-center'>
      <p className='text-slate-200 text-lg font-bold font-mono shadow-lg hover:shadow-blue-500/50 my-3'>Designed And Coded By
       <a href='https://github.com/MohamedEmadEldeen09?tab=repositories' target='_blank'><span className='text-2xl text-white font-bold font-mono hover:text-sky-500'> Mohamed Emad</span></a></p>
      <a href='https://www.linkedin.com/in/mohamed-emad-530236234/' target='_blank' className='text-sky-600 text-xl font-bold font-mono shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1 hover:scale-150'>LinkedIn</a>
      <a href='https://github.com/MohamedEmadEldeen09?tab=repositories' target='_blank' className='text-neutral-900 text-2xl font-bold font-mono shadow-lg hover:shadow-slate-500/50 ml-3 hover:-translate-y-1 hover:scale-150'>GitHub</a>
    </div>
   </div> 
  </>
  )
}

export default App;

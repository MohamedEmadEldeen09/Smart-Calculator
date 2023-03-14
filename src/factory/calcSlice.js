import { createSlice } from "@reduxjs/toolkit";


export let initState = {
    exp : "",
    output : ""
}
let calcSlice = createSlice({
    name : "calc",
    initialState: initState,
    reducers : {
        setExp : (state , action)=>{
          if(state.exp == '0'){
            state.exp = action.payload
          }
          else if(action.payload == '00'){
            state.exp = ''
          } 
          else if(action.payload[2] =='mod'){ 
           state.exp = action.payload[0] + "=" + action.payload[1]
          }
          else if(action.payload[1] =='CalcDead'){ 
            state.exp = action.payload[0] 
           }
          else{
            state.exp = state.exp + action.payload
          } 
        },
        setOutput : (state , action)=>{
          state.exp = action.payload
        }
    }   
})

export let  {setExp , setRes , setOutput} = calcSlice.actions
export default calcSlice.reducer
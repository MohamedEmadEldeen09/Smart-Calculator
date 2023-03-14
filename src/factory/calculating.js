
//√ * ^ + - /  operations
// Set The infix Exepresion to be Prefix Exepresion
let periority = {
    '+' : 1,
    '-' : 1,
    '*' : 2,
    '/' : 2,
    '√' : 3,
    '^' : 4
}
let setExpression = (infix)=>{
    let stack = []   
    let pref =  ""
    let negative = false
    let inf = infix.split('')     
    for (let i = 0; i < inf.length; i++) {
        if((/[0-9]/).test(inf[i])){
            if(i != 0 && (/[^0-9]/).test(inf[i-1]) && !negative && inf[i-1] != "."){pref += " "}   
            if(negative){negative = false}      
            pref += inf[i]
        }
        else if(inf[i] == "."){pref += inf[i]}
        else{
            if(inf[i] == "(" || (stack.length > 0 && stack[stack.length-1] == "(")){
                stack.push(inf[i])               
            }
            else{
                if(i == 0 && inf[i]=='-'){
                    negative = true
                    pref += inf[i]              
                }
                else if(inf[i]=='-' && (/[^0-9]/).test(inf[i-1]) && inf[i-1] != "."){
                   negative = true , pref += " " ;  pref += inf[i] ; 
                }
              
               else if(stack.length == 0 && inf[i] != ")"){ stack.push(inf[i])}
               else if(periority[inf[i]] > periority[stack[stack.length-1]]){
                    stack.push(inf[i])                   
                } 

               else if(periority[inf[i]] <= periority[stack[stack.length-1]] || inf[i] == ")" ){
                     while (stack[stack.length-1] != "(" && stack.length>0) {
                        pref += " "
                        pref += stack.pop()
                     }
                     if(stack[stack.length-1] == "("){stack.pop()}  
                     if(inf[i] != ")"){stack.push(inf[i])}                    
                }
            }          
        }        
    }

    while (stack.length > 0) {
        if((/[\(|\)]/).test(stack[stack.length - 1])){stack.pop()}
        else{  pref += " " ; pref += stack.pop() }      
    }
   return pref
}
//console.log(setExpression('4+5*6/44^2+(3*2)')); // 4 5 6 * + 44 2 ^ / 3 2 * +
//console.log(setExpression('4+8*9/3'));  // 4 8 9 * + 3 /
//console.log(setExpression('88-3*2^2'));  // 88 3 2 2 ^ * -
//console.log(setExpression('-88-3*2^2')); // -88 3 2 2 ^ * -
//console.log(setExpression('-88-3*-2^2')); // -88 3 -2 2 ^ * -
//console.log(setExpression('8-9+1')); // 8 9 - 1 +
//console.log(setExpression('5+((3+(√4^2)^2)^2)*3')); // 5 3 4 2 ^ √ 2 ^ + 2 ^ 3 * +
//console.log(setExpression('(4^2/(4-2.5))+1*8'));
//console.log(setExpression('9-5'));


//Evaluate the prefix exepresion 
let eva = (operation , num1 , num2)=>{
    if(operation == "*"){
      return Number(num1) * Number(num2)
    }
    else if(operation == "+"){
        return Number(num1) + Number(num2)
    }
    else if(operation == "-"){
        return Number(num1) - Number(num2)    
    }
    else if(operation == "/"){
        return Number(num1) / Number(num2)
    }
    else if(operation == "^"){
        return Math.pow(Number(num1) , Number(num2))  
    }
    else if(operation == "√"){
        return Math.sqrt(Number(num1) , 2)  
    }
    return undefined
}
let evaluateExp = (readyExp)=>{ 
    let stack=[]
    let pre = readyExp.split(' ')   
    for (let i = 0; i < pre.length; i++) {     
         if(isNaN(pre[i])){
           let num2 = stack.pop()
           if(pre[i] == "/" && num2 == '0'){            
                return  "Error : Can not divide on 0"                                 
           }   
           else if(pre[i] == "√"){
             stack.push(eva(pre[i] , num2)) 
           }
           else{
              let num1 = stack.pop()
              stack.push(eva(pre[i] , num1 , num2))
           }       
         }else{
            stack.push(pre[i])
         }
    }
    return stack.pop()
}
// console.log(evaluateExp(setExpression('5+((3+(√4^2)^2)^2)*3')));
// console.log(evaluateExp(setExpression('4+8*9/3')));
// console.log(evaluateExp(setExpression('-88-3*2^2')));
// console.log(evaluateExp(setExpression('4+5*6/44^2+(3*2)')));
// console.log(evaluateExp(setExpression('1-6')));

let Edit = (exp)=>{
    let newExp =""
  if(isNaN(exp[exp.length-1])){
    let index = 0
    let ends = ""
    for(let i =  exp.length-1 ; i >= 0 ; i--){       
       if(!isNaN(exp[i])){index = i ;break}
       ends += exp[i]
    }
    if(index != 0){
        if(ends.includes(')')){
            exp = exp.slice(0,index+1)+")"
        }
        else{
            exp = exp.slice(0,index+1)
        }       
     }
   }

    for (let n = 0; n < exp.length; n++) {
        if(isNaN(exp[n])){break}  
        else{newExp+=exp[n]}    
    }

    let start = 0
    if(newExp.length == 0){start = 1}
    else{start = newExp.length}

   for (let j = start; j < exp.length; j++) {  
     if(!isNaN(exp[j])){ 
        if(isNaN(exp[j-1]) && isNaN(exp[j-2])){          
           if(exp[j-1] == "-" && (exp[j-2]!="(" || exp[j-2]!=")")){           
            newExp+=exp[j-2]
            newExp+=exp[j-1]
           }
           else{
            if(newExp[newExp.length-1] !="(" && newExp[newExp.length-1] !=")"){
                newExp+=exp[j-1]
            }          
           }     
        }
        else if(isNaN(exp[j-1]) && !isNaN(exp[j-2])){
            if(newExp[newExp.length-1] != "(" && newExp[newExp.length-1] != ")" && exp[j-1] != '√'){
                newExp+=exp[j-1]
            }
            if(exp[j-1] == '√'){
                newExp+='*' 
                newExp+=exp[j-1]               
             }
        }  
        newExp+=exp[j] 
     }
     else{
        if(exp[j] == ')'  || exp[j] == '('){
         if(isNaN(exp[j-1]) && exp[j] == '('){
            newExp+=exp[j-1] 
         }
         if(!isNaN(exp[j-1]) && exp[j] == '('){
            newExp+='*'           
         }
         newExp+=exp[j]
       }   
     }    
   }
     
   return newExp 
  }
  
export  {setExpression , evaluateExp , eva , Edit, periority}
class Calculator{
    constructor(previousOperandElement,currentOperandElement){
        this.previousOperandElement=previousOperandElement;
        this.currentOperandElement=currentOperandElement;
        this.clear();
    }
    clear(){
        this.previousOperand="";
        this.currentOperand="";        
        this.operation=undefined;
    }
    chooseOperation(operation){
        if(this.currentOperand=="") return
        if(this.currentOperand!==""){
            this.compute()
        }
        this.operation=operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand=""
    }
    compute(){
        let answer;
        let prevNum=parseFloat(this.previousOperand)
        let currNum=parseFloat(this.currentOperand);
        if(isNaN(prevNum)||isNaN(currNum)) return
        switch(this.operation){
            case "+":
                answer=prevNum+currNum;
                break;
            case "%":
                answer=prevNum%currNum;
                break;
            case "-":
                answer=prevNum-currNum;
                break;
            case "*":
                answer=prevNum*currNum;
                break;
            case "÷":
                answer=prevNum/currNum;
                break;
            }
            this.currentOperand=answer;
            this.previousOperand="";
            this.operation=undefined;
    }
    getDisplayNumber(number){
        let newNum;
        let StringNum=number.toString();
        let intNum=parseFloat(StringNum.split('.')[0]);
        let deciNum=StringNum.split('.')[1];
        
        if(isNaN(intNum)){
            newNum=''
        }else{
            newNum=intNum.toLocaleString("en",{
                maximumFractionDigits:0,
            })
        }
        if(deciNum!=null){
            return `${newNum}.${deciNum}`
        }else{
            return newNum;
        }
    }
    appendNumber(num){
        if(num=='.'&&this.currentOperand.includes('.')) return;
        this.currentOperand=this.currentOperand.toString()+num.toString();
    }
    delele(){
        this.currentOperand=this.currentOperand.slice(0,-1);
    }
    updateDisplay(){
        this.currentOperandElement.innerText=this.getDisplayNumber(this.currentOperand);
        if(this.operation!=null){
            this.previousOperandElement.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandElement.innerText=""
        }    
    }

}

const numbers=document.querySelectorAll('[data-number]');
const operations=document.querySelectorAll('[data-operation]')
const allClearButton=document.querySelector('[data-all-clear]')
const deleteButton=document.querySelector('[data-delete]')
const equalButton=document.querySelector('[data-equals]')
const previousOperandElement=document.querySelector('[data-previous-operand]')
const currentOperandElement=document.querySelector('[data-current-operand]')

const calculator=new Calculator(previousOperandElement,currentOperandElement);

equalButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
})
numbers.forEach((e)=>e.addEventListener('click',()=>{
    calculator.appendNumber(e.innerText);
    calculator.updateDisplay();
}))
operations.forEach((e)=>e.addEventListener('click',()=>{
    calculator.chooseOperation(e.innerText)
    calculator.updateDisplay();
}))

deleteButton.addEventListener('click',()=>{
    calculator.delele();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
})
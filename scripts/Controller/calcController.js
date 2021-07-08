class CalcCalculator {

    constructor() {

        this._operation = [];
        this._localte = 'pt-br';
        this._displayCalcEL = document.querySelector('#display');
        this._dateEL = document.querySelector('#data');
        this._timeEL = document.querySelector('#hora');
        this._currentDate;
        this.setDisplayDateTime();
        this.initialize();
        this.initButtonsEvents();

    }

    initialize() {  //Método inicialização do display data e horas

        this.setDisplayDateTime();

        setInterval(() => {
            
            this.setDisplayDateTime();

        }, 1000);
    }


    addEventListenerAll(element, events, fn) {   //Método que transforma um evento em vários eventos
        
        events.split(' ').forEach(event =>{

            element.addEventListener(event,fn, false);
        });

    }

    clearAll() { //Método que apaga todos as entradas de valores digitados
        this._operation = [];
    }

    clearEntry() { //Método que apaga a ultima entrada de valor digitado
        this._operation.pop();
    }

    setError() { //Método que gera um erro caso o usuário consiga gerar um xD
        this.displayCalc = 'Error';
    }
    getLastOperation(){ //Método que pega o ultimo item do array
       return this._operation[this._operation.length - 1];
    }

    setLastOperation(value) { // Método que troca a ultima posição do valor (array)
        return this._operation[this._operation.length - 1] = value;

    } 

    isOperator(value) { //Método que verifica se é um operador 
       return ['+', '-', '/','*','%'].indexOf(value) > -1;
    }

    pushOperation(value) { //Método que faz o push

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();
        }
    }

    calc() { //Método que calcula as operações

        let last = this._operation.pop();
        
        let result = eval(this._operation.join(''));

        this._operation = [result, last];

        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay() { //Método que mostra o ultimo numero no display

        let lastNumber;

        for (let i = this._operation.length - 1 ; i >=0; i--) {
            if(!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }   
        }
        this.displayCalc = lastNumber;
    }

    addOperation(value) { //Método que adiciona uma operação
        
        if (isNaN(this.getLastOperation())) { //Validação para adicionar a operação ou concatenar o valor com outro               
           
            if (this.isOperator(value)) { // caso o usuario troque a operação

                this.setLastOperation(value);

            }else if (isNaN(value)){
                
                console.log(value);

            } else{   
                this.pushOperation(value);
                this.setLastNumberToDisplay();

            }
        } else{

            if (this.isOperator(value)) {
                this.pushOperation(value);

            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();
            }
        }
    }

    execBtn(value) {  //Método que executa as operações

        switch (value) {

            case 'ac':
                this.clearAll();
            break;
          
            case 'ce':
                this.clearEntry();
            break;

            case 'soma':
                this.addOperation('+')
            break;   

            case 'subtracao':
                this.addOperation('-')
            break;

            case 'divisao':
                this.addOperation('/')
            break;   

            case 'multiplicacao':
                this.addOperation('*')
            break;  
            
            case 'porcento':
                this.addOperation('=')
            break;   

            case 'igual':
                
            break; 

            case 'ponto':
                this.addOperation('.')
            break; 

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
            break;

        default: 
            this.setError();
        break
            

        }

    }

    initButtonsEvents(){  // Método eventos dos botões

        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

          buttons.forEach((btn, index)=>{

            this.addEventListenerAll(btn, 'click drag', e =>{

                let textBtn = btn.className.baseVal.replace('btn-','');

                this.execBtn(textBtn)

            }); 
            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e =>{
                btn.style.cursor = 'pointer'
            })
          })
    }

    setDisplayDateTime() {   //Método que gera um new date

        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    get displayTime() {
        return this._timeEL.innerHTML;
    }
    set displayTime(value) {
        this._timeEL.innerHTML = value ;
    }

    get displayDate() {
        return this._dateEL.innerHTML;
    }
    set displayDate(value) {
        this._dateEL.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEL.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEL.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }
    set currentDate(value) {
        this._currentDate = value;
    }









}
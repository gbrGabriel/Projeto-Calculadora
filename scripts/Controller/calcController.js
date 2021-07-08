class CalcCalculator {

    constructor() {

        this._localte = 'pt-br';
        this._displayCalcEL = document.querySelector('#display');
        this._dateEL = document.querySelector('#data');
        this._timeEL = document.querySelector('#hora');
        this._currentDate;
        this.setDisplayDateTime();
        this.initialize();
        this.initButtonsEvents();

    }

    initialize() {

        this.setDisplayDateTime();

        setInterval(() => {
            
            this.setDisplayDateTime();

        }, 1000);
    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

          buttons.forEach((btn, index)=>{

            btn.addEventListener('click', e =>{

                console.log(btn.className.baseVal.replace('btn-',''));
            });

          })
    }

    setDisplayDateTime() {

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
function gameClass (){
    this.Controller = new controllerClass();
    this.Bindings = new bindingClass(this.Controller);
    console.log(this);
};

var Game = new gameClass();
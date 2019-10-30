function bindingClass (controllerRef){
    this.ControllerRef = controllerRef;
    this.ConfigureKeyBindings();
    this.SetGlobalTimer();
    this.TimerActions = [
        new TimerAction()
    ];

    window.GlobalBindingRef = this;
};

bindingClass.prototype.KeyBindings = []

bindingClass.prototype.ConfigureKeyBindings = function(){
    window.addEventListener("keydown", (event) => {
        let bindings = this.KeyBindings.filter(x => x.KeyCode == event.code);
        bindings.forEach((binding) => {
            binding.KeyDown();
        });
    });

    window.addEventListener("keyup", (event) => {
        let bindings = this.KeyBindings.filter(x => x.KeyCode == event.code);
        bindings.forEach((binding) => { 
            binding.KeyUp(); 
        });
    });
}

bindingClass.prototype.SetGlobalTimer = function(){
    var _globalTimer = setInterval(() => {

        this.TimerActions.forEach((timerAction) => {
            if(( timerAction.Iteration % timerAction.RunEvery) == 0)  
                timerAction.Action();

            timerAction.Iteration += 1; 
            if (timerAction.Iteration > timerAction.RunMax) timerAction.Dispose = true;
        });

        this.TimerActions = this.TimerActions.filter(x => x.Dispose == false);
    }, 1000);
}
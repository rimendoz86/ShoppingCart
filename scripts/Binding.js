function bindingClass (controllerRef){
    this.ControllerRef = controllerRef;
    this.RegisterOrderForm();
    
    window.GlobalBindingRef = this;
    this.BindFormToModel(ModelRef.Authentication,'loginForm');
};

bindingClass.prototype.RegisterOrderForm = function() {
    let orderForm = new DomRef('orderForm');

    orderForm.nativeElementRef.addEventListener("keydown", (event) => {
        this.ControllerRef.orderformUpdate(event);
    });

    orderForm.nativeElementRef.addEventListener("change", (event) => {
        this.ControllerRef.orderformUpdate(event);
    });

    orderForm.nativeElementRef.addEventListener("submit", (event) => {
        event.preventDefault();
        GlobalControllerRef.SubmitOrder();
    });
}

bindingClass.prototype.BindFormToModel = function(objectRef,formID, onSubmit = (modelData) =>{ console.log(modelData); return; }, onChange = (modelData) =>{ return; }) 
{
    let orderForm = new DomRef(formID);

    orderForm.nativeElementRef.addEventListener("keyup", (event) => {
        objectRef[event.target.id] = event.target.value;
        onChange(objectRef);
    });

    orderForm.nativeElementRef.addEventListener("change", (event) => {
        objectRef[event.target.id] = event.target.value;
        onChange(objectRef);
    });

    orderForm.nativeElementRef.addEventListener("submit", (event) => {
        event.preventDefault();
        onSubmit(objectRef);
    });


}

function bindingClass (controllerRef){
    this.ControllerRef = controllerRef;
    this.RegisterOrderForm();
    
    window.GlobalBindingRef = this;
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
        event.preventDefault();GlobalControllerRef.SubmitOrder();
    });
}

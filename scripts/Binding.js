function bindingClass (controllerRef){
    this.ControllerRef = controllerRef;
    //this.RegisterOrderForm();
    
    this.LoginForm = new FormBinding(ModelRef.Authentication,'loginForm');
    
    this.OrderForm = new FormBinding(ModelRef.ShoppingCart,'orderForm', (model)=> {
        let orderID = model.orderShipping ? model.orderShipping : 0;
        this.ControllerRef.UpdateShipping(orderID);
    },
    () => {
        this.ControllerRef.SubmitOrder();
    })
    
    window.GlobalBindingRef = this;
};

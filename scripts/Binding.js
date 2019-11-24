function bindingClass (controllerRef){
    this.ControllerRef = controllerRef;
    
    bindingClass.BindFormToModel(ModelRef.Authentication,'loginForm');
    
    bindingClass.BindFormToModel(ModelRef.ShoppingCart,'orderForm', (model)=> {
        console.log(ModelRef.ShoppingCart);
        let orderID = model.orderShipping ? model.orderShipping : 0;
        this.ControllerRef.UpdateShipping(orderID);
        LocalStorage.ShoppingCart.set(ModelRef.ShoppingCart);
    },
    () => {
        this.ControllerRef.SubmitOrder();
    })
    window.GlobalBindingRef = this;
};

bindingClass.BindFormToModel = function(objectRef,formID, onChange = (modelData) =>{ return; }, onSubmit = (modelData) =>{ console.log(modelData); return; },) 
{
    let formRef = new DomRef(formID);

    formRef.nativeElementRef.addEventListener("keyup", (event) => {
        let changeFound = bindingClass.FormToModel(objectRef,formID);
        if (changeFound) onChange(objectRef);
    });

    formRef.nativeElementRef.addEventListener("change", (event) => {
        let changeFound = bindingClass.FormToModel(objectRef,formID);
        if (changeFound) onChange(objectRef);
    });

    formRef.nativeElementRef.addEventListener("submit", (event) => {
        event.preventDefault();
        let changeFound = bindingClass.FormToModel(objectRef,formID);
        if (changeFound) onChange(objectRef);
        onSubmit(objectRef);
    });
}

bindingClass.ModelToForm = function (objectRef, formID, onChange = (modelData) =>{ return; }) {
let objKeys = Object.keys(objectRef);
let formRef = document.getElementById(formID);
let changeFound = false;

objKeys.forEach((key) => {
    let formInput = formRef.elements[key];
    if (formInput && formInput.value != objectRef[key]){
        formInput.value = objectRef[key] ? objectRef[key] : '';
        changeFound = true;
        } 
    });
    return changeFound;
};

bindingClass.FormToModel = function (objectRef, formID){
    let objKeys = Object.keys(objectRef);
    let formRef = document.getElementById(formID);
    let changeFound = false;

    objKeys.forEach((key) => {
        let formInput = formRef.elements[key];
        if (formInput && formInput.value != objectRef[key]){
            objectRef[key] = formInput.value ? formInput.value : '';
            changeFound = true;
            } 
        });
    return changeFound;
};

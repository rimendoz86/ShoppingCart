function bindingClass (controllerRef){
    this.ControllerRef = controllerRef;
    //this.RegisterOrderForm();
    
    bindingClass.BindFormToModel(ModelRef.Authentication,'loginForm');
    
    bindingClass.BindFormToModel(ModelRef.ShoppingCart,'orderForm', (model)=> {
        let orderID = model.orderShipping ? model.orderShipping : 0;
        this.ControllerRef.UpdateShipping(orderID);
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
        bindingClass.FormToModel(objectRef,formID);
        onChange(objectRef);
    });

    formRef.nativeElementRef.addEventListener("change", (event) => {
        bindingClass.FormToModel(objectRef,formID);
        onChange(objectRef);
    });

    formRef.nativeElementRef.addEventListener("submit", (event) => {
        event.preventDefault();
        bindingClass.FormToModel(objectRef,formID);
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
    if(changeFound) onChange(objectRef);
};

bindingClass.FormToModel = function (objectRef, formID){
    let objKeys = Object.keys(objectRef);
    let formRef = document.getElementById(formID);
    objKeys.forEach((key) => {
        let formInput = formRef.elements[key];
        if (formInput && formInput.value != objectRef[key]){
            objectRef[key] = formInput.value ? formInput.value : '';
        } 
        });
};

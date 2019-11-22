function bindingClass (controllerRef){
    this.ControllerRef = controllerRef;
    this.RegisterOrderForm();
    
    this.BindFormToModel(ModelRef.Authentication,'loginForm');
    window.GlobalBindingRef = this;
};

bindingClass.prototype.RegisterOrderForm = function() {
    let orderForm = new DomRef('orderForm');

    orderForm.nativeElementRef.addEventListener("keyup", (event) => {
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
    let formRef = new DomRef(formID);

    formRef.nativeElementRef.addEventListener("keyup", (event) => {
        objectRef[event.target.id] = event.target.value;
        onChange(objectRef);
    });

    formRef.nativeElementRef.addEventListener("change", (event) => {
        objectRef[event.target.id] = event.target.value;
        onChange(objectRef);
    });

    formRef.nativeElementRef.addEventListener("submit", (event) => {
        event.preventDefault();
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
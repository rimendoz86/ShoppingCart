
function Product(id, name, description, imageRef, price) {
    this.ID = id;
    this.Name = name;
    this.Description = description;
    this.ImageRef = imageRef;
    this.Price = price;
}
function Authentication() {
    this.UserID;
    this.Login;
    this.Password;
}

function SelectedProduct(quantity, productModel){
    this.Quantity = quantity;
    this.Product = productModel;
}

function Cart(selectedProducts = [], shipping = Picklists.ShippingTypes[0], customerName = '', customerEmail = '', customerAddress = ''){
    this.CustomerName = customerName;
    this.CustomerEmail = customerEmail;
    this.CustomerAddress = customerAddress;
    this.SelectedProducts = selectedProducts;
    this.orderShipping = 0;
    this.Shipping = shipping;
    this.getSubtotal = () => {
        let runningTotal = 0;
        this.SelectedProducts.forEach( prod => {
            runningTotal += (prod.Product.Price * prod.Quantity)
        });
        return parseFloat(runningTotal.toFixed(2));
    };
    this.getTax = () => {
        let tax = this.getSubtotal() * .0775;
        return parseFloat(tax.toFixed(2));
    };
    this.getTotal = () => {
        return this.getSubtotal() + this.getTax() + this.Shipping.Price;
    }
}

function TimerAction(action = () => {return}, runEvery = 5, runMax = 15){
    this.Action = action;
    this.RunEvery = runEvery;
    this.RunMax = runMax;
    this.Iteration = 0;
    this.Dispose = false;
}

function KeyBind(keyCode = '', keyDown = () => { return }, keyUp = () => { return }){
    this.KeyCode = keyCode;
    this.KeyDown = keyDown;
    this.KeyUp = keyUp;
}

function DomRef(id){
    this.nativeElementRef = document.getElementById(id);

    this.SetOnClick = function(methodByRef){
        this.nativeElementRef.addEventListener("click", methodByRef);
    }
    
    this.SetInnerHTML = function(innerHTML){
        this.nativeElementRef.innerHTML = innerHTML;
    }

    this.SetValue = function(value){
        this.nativeElementRef.value = value;
    }

    this.ReplaceClass = function(removeClass, addClass){
        this.nativeElementRef.classList.remove(removeClass);
        this.nativeElementRef.classList.add(addClass);
    }

    this.SetRotation = function(degree){
        this.nativeElementRef.style.transform = `rotate(${degree}deg)`;
    }

    this.SetLocation = function(left, top){
        this.nativeElementRef.style.top = `${top}px`;
        this.nativeElementRef.style.left = `${left}px`;
    }

    this.AppendChild = function(htmlNode){
        this.nativeElementRef.appendChild(htmlNode);
    }

    this.Reset = function(){
        this.nativeElementRef.reset();
    }



    this.Show = function (isShow) {
        if (isShow) {
            this.ReplaceClass("hide", null);
        } else {
            this.ReplaceClass(null, "hide");
        }
    }  
}

//Static Methods
var LocalStorage = {
    ShoppingCart: {
        get: () => {
            return JSON.parse(localStorage.getItem('ShoppingCart'));
        },
        set: (shoppingCart) => {
            localStorage.setItem('ShoppingCart',JSON.stringify(shoppingCart));
        },
        clear: () => {
            localStorage.removeItem('ShoppingCart');
        }
    }
}

var Picklists = {
    ShippingTypes: [
        {ID: 0, Type:"No Rush", Price: 0},
        {ID: 1, Type:"2-Day", Price: 5.99},
        {ID: 2, Type:"Overnight", Price: 10.99}
    ]
}

var Data = {
    Get: (controller, params = '') => {
        let promise = new Promise((resolve, reject) => {
            let BaseURL = "\\_API\\Controllers\\";
            let req = new XMLHttpRequest;
            req.open("GET",BaseURL+controller+".php?"+params,true);
            req.setRequestHeader("Content-type", "application/json");
            req.onreadystatechange = (event) => {
                let res = event.currentTarget;
                if(res.readyState == 4 && res.status == 200){
                    try{
                        resolve(JSON.parse(res.responseText));
                    }catch(err){
                        console.log(res.responseText);
                        reject(err);
                    }
                }else if (res.readyState == 4 && res.status != 200){
                    reject(event);
                }
            }
            req.send();
        })
        return promise;
    },
    Post: (controller, params) => {
        let promise = new Promise((resolve, reject) => {
            let BaseURL = "\\_API\\Controllers\\";
            let req = new XMLHttpRequest;
            req.open("POST",BaseURL+controller+".php",true);
            req.setRequestHeader("Content-Type", "application/json");
            req.onreadystatechange = (event) => {
                let res = event.currentTarget;
                if(res.readyState == 4 && res.status == 200){
                    try{
                        resolve(JSON.parse(res.responseText));
                    }catch(err){
                        console.log(res.responseText);
                        reject(err);
                    }
                }else if (res.readyState == 4 && res.status != 200){
                    reject(event);
                }
            }
            let paramsJson = JSON.stringify(params);
            req.send(paramsJson);
        })
        return promise;
    }
}

function FormBinding(objectRef,formID, onChange = (modelData) =>{ return; }, onSubmit = (modelData) =>{ console.log(modelData); return; }) {
    this.ObjectRef = objectRef;
    this.FormID = formID;
    this.FormRef = new DomRef(formID);
    this.OnChange = () => {};
    this.OnSubmit = () => {};

    this.BindFormToModel = function(objectRef,formID, onChange = (modelData) =>{ return; }, onSubmit = (modelData) =>{ console.log(modelData); return; }) {

    this.FormRef.nativeElementRef.addEventListener("keyup", (event) => {
        if(this.FormToModel(this.ObjectRef,this.FormID)) 
        this.OnChange(this.ObjectRef);
    });

    this.FormRef.nativeElementRef.addEventListener("change", (event) => {
        if(this.FormToModel(this.ObjectRef,this.FormID))
            this.OnChange(this.ObjectRef);
    });

    this.FormRef.nativeElementRef.addEventListener("submit", (event) => {
        event.preventDefault();
        if(this.FormToModel(this.ObjectRef,this.FormID))
            this.OnChange(this.ObjectRef);
        this.OnSubmit();
    });
    }

    this.ModelToForm = function (objectRef, formID) {
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

    this.FormToModel = function (objectRef, formID){
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
}


function Product(id, name, description, imageRef, price) {
    this.ID = id;
    this.Name = name;
    this.Description = description;
    this.ImageRef = imageRef;
    this.Price = price;
}

function Authentication() {
    this.UserID = null;
    this.Login = null;
    this.Password = null;
    this.IsAdmin = null;
    this.IsActive = null;
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

var RegexType = {
    Username: `^[a-z0-9_-]{3,15}$`,
    Password: `((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})`,
    Hexadecimal: `^#([\iA-Fa-f0-9]{6}|[\iA-Fa-f0-9]{3})$`,
    Email: `^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$`,
    Image: `([^\\s]+(\\.(jpg|png|gif|bmp))$)`,
    IP: `^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])$`,
    Time: `(1[012]|[1-9]):[0-5][0-9](\\\\s)?(am|pm)`,
    Time24: `([01]?[0-9]|2[0-3]):[0-5][0-9]`,
    DateFormat: `(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/((19|20)\\d\\d)`,
    HTML: `<("[^"]*"|'[^']*'|[^'">])*>`,
    HTMLink: `<a([^>]+)>(.+?)<\/a>`
};

String.prototype.IsType = function(regex, modifier = null){
let val = this.toString()
var re = !modifier ? new RegExp(regex) : new RegExp(regex, modifier);
return val.match(re) ? true: false;
}

var Data = {
    Get: (controller, params = '') => {
        return Data._ReqWithURI('GET',controller,params)
    },
    Post:(controller, params) => {
        return Data._ReqWithBody('POST',controller,params)
    },
    Put:(controller, params) => {
        return Data._ReqWithBody('PUT',controller,params)
    },
    Delete: (controller, id) => {
        return Data._ReqWithURI('DELETE',controller,`id=${id}`)
    },
    _ReqWithBody: (verb, controller, params) => {
        let promise = new Promise((resolve, reject) => {
            let BaseURL = "\\_API\\Controllers\\";
            let req = new XMLHttpRequest;
            req.open(verb,BaseURL+controller+".php",true);
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
    },
    _ReqWithURI: (verb, controller, params) => {
        let promise = new Promise((resolve, reject) => {
            let BaseURL = "\\_API\\Controllers\\";
            let req = new XMLHttpRequest;
            req.open(verb,BaseURL+controller+".php?"+params,true);
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
    }
}

function FormBinding(objectRef,formID, onChange = (modelData) =>{ return; }, onSubmit = (modelData) =>{ console.log(modelData); return; }) {
    this.ObjectRef = objectRef;
    this.FormID = formID;
    this.FormRef = new DomRef(formID);
    this.OnChange = onChange;
    this.OnSubmit = onSubmit;

    this.BindFormToModel = function() {
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

    this.ModelToForm = function (objectRef = this.ObjectRef, formID = this.FormID) {
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

    this.FormToModel = function (objectRef = this.ObjectRef, formID = this.FormID){
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
    this.BindFormToModel();
}

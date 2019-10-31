
function Product(id, name, description, imageRef) {
    this.ID = id;
    this.Name = name;
    this.Description = description;
    this.ImageRef = imageRef;
}

function SelectedProduct(quantity, productModel){
    this.Quantity = quantity;
    this.Product = productModel;
}

function Cart(){
    this.User;
    this.SelectedProducts = [];
}

function User(){}

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
}

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

var Data = {
    Get: (controller, params = '') => {
        let promise = new Promise((resolve, reject) => {
            let BaseURL = "\\_API\\Controllers\\";
            let req = new XMLHttpRequest;
            req.open("GET",BaseURL+controller+"?"+params,true);
            req.setRequestHeader("Content-type", "application/json");
            req.onreadystatechange = (event) => {
                let res = event.currentTarget;
                if(res.readyState == 4 && res.status == 200){
                    resolve(JSON.parse(res.responseText));
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
            req.open("POST",BaseURL+controller,true);
            req.setRequestHeader("Content-Type", "application/json");
            req.onreadystatechange = (event) => {
                let res = event.currentTarget;
                if(res.readyState == 4 && res.status == 200){
                    resolve(JSON.parse(res.responseText));
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
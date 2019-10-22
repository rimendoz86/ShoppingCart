function Product() {
    this.ID;
    this.Name;
    this.Description;
    this.ImageRef;
}

function SelectedProduct(){
    this.Quantity;
    this.Product;
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
}

var DataService = {
    getProducts: () => { 
        return [
    {"ID": 0, "Name": "Product1", "Description": "This is the first product", "ImageRef": "product0.jpg"},
    {"ID": 1, "Name": "Product2", "Description": "This is the second product", "ImageRef": "product1.jpg"},
    {"ID": 2, "Name": "Product3", "Description": "This is the third product", "ImageRef": "product2.jpg"}]}
}
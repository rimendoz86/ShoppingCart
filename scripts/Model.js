function modelClass (){
    this.View = new viewClass();
    this.Products = [];
    this.ShoppingCart = new Cart();
    this.Authentication = new Authentication();
    this.Users = [];
    this.UserEdit = new Authentication();
    window.ModelRef = this;
}
function controllerClass (){
    this.Model = new modelClass();
    window.GlobalControllerRef = this;
    this.InitializeShoppingCart();
    this.PopulateProductsTable();
    this.PopulateShoppingCartTable();
    this.PopulatePricingTable();

};

controllerClass.prototype.InitializeShoppingCart = function(){
    let localCart = LocalStorage.ShoppingCart.get();
    this.Model.ShoppingCart = localCart 
                            ? new Cart(localCart.SelectedProducts,
                                localCart.Shipping, 
                                localCart.CustomerName, 
                                localCart.CustomerEmail, 
                                localCart.CustomerAddress)
                            : new Cart();

    GlobalViewRef.InitializeForm(localCart.CustomerName, 
                                localCart.CustomerEmail, 
                                localCart.CustomerAddress,
                                localCart.Shipping.ID)
}

controllerClass.prototype.PopulateProductsTable = function () {
    this.Model.Products = [];
    Data.Get("Product").then((productList) => {
        productList.forEach(prod => {
            let newProduct = new Product(prod.ID, 
                                        prod.Name, 
                                        prod.Description, 
                                        prod.ImageRef, 
                                        prod.Price);
            this.Model.Products.push(newProduct);
        });
        GlobalViewRef.PopulateProductsTable(this.Model.Products);
    });
}

controllerClass.prototype.PopulateShoppingCartTable = function () {
    GlobalViewRef.PopulateShoppingCartTable(this.Model.ShoppingCart);
    this.PopulatePricingTable();
}

controllerClass.prototype.PopulatePricingTable = function () {
    GlobalViewRef.PopulatePricingTable(this.Model.ShoppingCart);
}

controllerClass.prototype.AddItemToCart = function (productID, increment){
    let alreadyInCart = this.Model.ShoppingCart.SelectedProducts.find(x => x.Product.ID == productID);
    if (alreadyInCart){
        alreadyInCart.Quantity += increment;
    }else{
        let selectedProduct = this.Model.Products.find( x => x.ID == productID);
        let newCartItem =  new SelectedProduct(1, selectedProduct);
        this.Model.ShoppingCart.SelectedProducts.push(newCartItem);
    }
    
    this.Model.ShoppingCart.SelectedProducts = this.Model.ShoppingCart.SelectedProducts.filter(x => x.Quantity > 0);
    LocalStorage.ShoppingCart.set(this.Model.ShoppingCart);
    this.PopulateShoppingCartTable();
}

controllerClass.prototype.EmptyCart = function () {
    this.Model.ShoppingCart = new Cart();
    LocalStorage.ShoppingCart.clear();
    this.PopulateShoppingCartTable();
}

controllerClass.prototype.UpdateShipping = function(event){
    let shipping = Picklists.ShippingTypes[event.target.value];
    if (shipping) {
        this.Model.ShoppingCart.Shipping = shipping;
        this.PopulatePricingTable();
    }
}

controllerClass.prototype.orderformUpdate = function(event) {
    if (event.target.id == "orderShipping"){
        this.UpdateShipping(event);
    }else{
        this.Model.ShoppingCart[event.target.id] = event.target.value;
    }
    LocalStorage.ShoppingCart.set(this.Model.ShoppingCart);

}

controllerClass.prototype.SubmitOrder = function(){
    console.log(this.Model.ShoppingCart)
}
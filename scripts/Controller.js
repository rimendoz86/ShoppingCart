function controllerClass (){
    this.Model = new modelClass();
    window.GlobalControllerRef = this;
    this.PopulateProductsTable();
    this.GetShoppingCartFromLocal();
    this.PopulateShoppingCartTable();

};

controllerClass.prototype.GetShoppingCartFromLocal = function(){
    let localShoppingCart = LocalStorage.ShoppingCart.get();
    this.Model.ShoppingCart = localShoppingCart ? localShoppingCart : [];
}

controllerClass.prototype.PopulateProductsTable = function () {
    this.Model.Products = [];
    Data.Get("Product.php").then((productList) => {
        productList.forEach(prod => {
            let newProduct = new Product(prod.ID, prod.Name, prod.Description, prod.ImageRef);
            this.Model.Products.push(newProduct);
        });
        GlobalViewRef.PopulateProductsTable(this.Model.Products);
    });
}

controllerClass.prototype.PopulateShoppingCartTable = function () {
    let ShoppingCart = LocalStorage.ShoppingCart.get();
    GlobalViewRef.PopulateShoppingCartTable(ShoppingCart);
}

controllerClass.prototype.AddItemToCart = function (productID, increment){
    let alreadyInCart = this.Model.ShoppingCart.find( x => x.Product.ID == productID);
    if (alreadyInCart){
        alreadyInCart.Quantity += increment;
    }else{
        let selectedProduct = this.Model.Products.find( x => x.ID == productID);
        let newCartItem =  new SelectedProduct(1, selectedProduct);
        this.Model.ShoppingCart.push(newCartItem);
    }
    
    this.Model.ShoppingCart = this.Model.ShoppingCart.filter(x => x.Quantity > 0);
    LocalStorage.ShoppingCart.set(this.Model.ShoppingCart);
    this.PopulateShoppingCartTable();
}
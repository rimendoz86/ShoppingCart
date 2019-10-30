function viewClass (){
    window.GlobalViewRef = this;
    this.ProductsTable = new DomRef('productsTable');
};

viewClass.prototype.PopulateProductsTable = function (modelProducts){
    let tableContent = `<thead><tr><th>Image</th><th>Name</th><th>Description</th><th>Add</th></tr></thead>
                        <tbody>`;
    modelProducts.forEach(prod => {
        tableContent += `
        <tr>
            <td><img src="\\assets\\${prod.ImageRef}" /></td>
            <td>${prod.Name}</td>
            <td>${prod.Description}</td>
            <td><span type="button" class="btn btn-primary" onclick="GlobalControllerRef.AddItemToCart(${prod.ID})">Add</span></td>
        </tr>
        `
    });
    tableContent += "</tbody>"
    this.ProductsTable.SetInnerHTML(tableContent);
}
var productNameInput = document.getElementById("productNameInput"); //Input klo
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");

var productNameAlert = document.getElementById("productNameAlert");
var productPriceAlert = document.getElementById("productPriceAlert");
var addBtn = document.getElementById("addbtn");

var searchInput = document.getElementById("searchInput")

var productList;
var mainIndex = 0;

var isExist = false;

if (localStorage.getItem("ourProducts") == null) {
  productList = []
} else {
  productList = JSON.parse(localStorage.getItem("ourProducts"));
  displayProducts()
}

function clear() {
  productNameInput.value = ""
  productPriceInput.value = ""
  productCategoryInput.value = ""
  productDescInput.value = ""
}



//2M

function addProduct() {
  for(var i = 0; i < productList.length; i++){
    if(productNameInput.value == productList[i].name && productNameInput.value != productList[mainIndex].name){
      isExist = true
    }
  }


  if (validateName(productNameInput.value)&& validatePrice(productPriceInput.value) && !isExist) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescInput.value,
    };


    if (addBtn.innerHTML == "Add product") {
      productList.push(product); //1
    } else {
      productList.splice(mainIndex, 1, product)
      addBtn.innerHTML = "Add product"
    }



    localStorage.setItem("ourProducts", JSON.stringify(productList));
    displayProducts()
    clear()
    
  }else{
    alert("000")
    isExist = false
  }
}


function validateName(name) {
  var regex = /^[A-Z][a-z]{3,}$/
  if (regex.test(name)) {
    return true;
  }
}

function validatePrice(price) {
  var regex = /^([1-9][0-9]{0,3}|10000)$/
  if (regex.test(price)) {
    return true;
  }
}






//exist && 



function displayProducts() {
  var cartoona = "";
  for (
    var i = 0; i < productList.length; i++ //2
  ) {
    cartoona += `<tr>
                                <td>${i}</td>
                                <td>${productList[i].name}</td>
                                <td>${productList[i].price}</td>
                                <td>${productList[i].category}</td>
                                <td>${productList[i].desc}</td>
                                <td><button onclick = "updateProduct(${i})" id="updatebtn" class="btn btn-warning ">update</button></td>
                                <td><button onclick = "deleteProduct(${i})" class="btn btn-danger">delete</button></td>
                    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartoona;
}


function deleteProduct(i) {
  productList.splice(i, 1)
  localStorage.setItem("ourProducts", JSON.stringify(productList));
  displayProducts()
}

function updateProduct(i) {
  productNameInput.value = productList[i].name;
  productPriceInput.value = productList[i].price;
  productCategoryInput.value = productList[i].category;
  productDescInput.value = productList[i].desc;

  addBtn.innerHTML = "Update product"

  mainIndex = i;
}


function searchProducts() {
  var cartoona = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) == true) {
      cartoona += `<tr>
      <td>${i}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].category}</td>
      <td>${productList[i].desc}</td>
      <td><button onclick = "updateProduct(${i})" id="updatebtn" class="btn btn-warning ">update</button></td>
      <td><button onclick = "deleteProduct(${i})" class="btn btn-danger">delete</button></td>
</tr>`;
    }
  }

  document.getElementById("tableBody").innerHTML = cartoona;

}















// function updateProduct(index) {
//   productNameInput.value = productList[index].name;
//   productPriceInput.value = productList[index].price;
//   productCategoryInput.value = productList[index].category;
//   productDescInput.value = productList[index].desc;
//   addBtn.innerHTML = "Update product";
//   mainIndex = index;
// }
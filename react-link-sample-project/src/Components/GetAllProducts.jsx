export async function GetAllProducts() {
    const response = await fetch("http://localhost:1414/product")
    const products = await response.json();
    return products;
}
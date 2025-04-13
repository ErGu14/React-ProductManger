export async function CreateProduct(product) {
    const result = window.confirm("Ürünü Oluşturmak İstediğine Emin Misin?");
    if(!result) return;
    const response = await fetch('http://localhost:1414/product/add', {
        method: 'POST',
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(product)
    })
    const createdData = await response.json()
    return createdData;
}
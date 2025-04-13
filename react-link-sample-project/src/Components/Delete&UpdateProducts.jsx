export async function DeleteProduct(id) {
    const result = window.confirm("Silmek İstediğine Emin Misin?")
    if(!result){return;}
    const response = await fetch(`http://localhost:1414/product/delete/${id}`, {
        method: "DELETE"
    })

}
export async function UpdateProduct(id,updatedProduct) {
    const result = window.confirm("Değişiklikler Kayıt Edilsin Mi?")
    if(!result){return;}
    const response = await fetch(`http://localhost:1414/product/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)

    });
    const updatedData = await response.json();
    return updatedData;
}
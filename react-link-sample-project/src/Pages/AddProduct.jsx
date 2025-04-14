import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateProduct } from "../Components/CreateProduct";

function AddProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault(); // Sayfa yenilenmesini engelle
        const result = await CreateProduct(product); // Yeni ürünü oluştur
        if(result.isSuccessful){
            alert(result.data)
            navigate("/products")
        }else{
            alert(result.errorMessages[0])
        }
    }

    function handleChange(e) {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
             <button
                onClick={() => navigate("/products")}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "20px",
                }}
            >
                     Geri
             </button>
            <h1>Yeni Ürün Ekle</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
                <label htmlFor="name">Ürün Adı:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "10px", padding: "5px" }}
                />

                <label htmlFor="description">Açıklama:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "10px", padding: "5px" }}
                />

                <label htmlFor="price">Fiyat:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "10px", padding: "5px" }}
                />

                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Ürün Oluştur
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
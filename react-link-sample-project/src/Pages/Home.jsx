import { useState, useEffect } from "react";
import { GetAllProducts } from "../Components/GetAllProducts";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]); // Ürünler state'i

    function NavigateProduct() {
        navigate("/product"); // Ürün düzenleme sayfasına yönlendirme
    }

    useEffect(() => {
        async function fetchProducts() {
            const data = await GetAllProducts();
            setProducts(data); // Ürünleri state'e aktar
        }
        fetchProducts();
    }, []); // Sadece bir kez çalışır

    return (
        <>
           <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Hoş Geldiniz!</h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "30px" }}>
                {products.map((product, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            margin: "10px",
                            padding: "10px",
                            width: "300px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src="https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/esupport/esupport-pages/desktop-connected-to-monitor.png"
                            alt={product.name}
                            style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "5px",
                                marginBottom: "10px",
                            }}
                        />
                        <h2 style={{ fontSize: "20px", margin: "10px 0" }}>{product.name}</h2>
                        <p style={{ color: "#555", fontSize: "16px", margin: "5px 0" }}>{product.description}</p>
                        <p style={{ fontWeight: "bold", margin: "5px 0" }}>Fiyat: {product.price} TL</p>
                        <button>Sepe Ekle</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
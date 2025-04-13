import { useState, useEffect } from "react";
import { GetAllProducts } from "../Components/GetAllProducts";
import { DeleteProduct, UpdateProduct } from "../Components/Delete&UpdateProducts";
import { useNavigate } from "react-router-dom";


function Product() {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState({}); // Düzenlenecek ürün bilgisi
    const [isEditProduct, setIsEditProduct] = useState(false); // Düzenleme formunun görünürlüğü
    const navigate = useNavigate();
    async function fetchProducts() {
        const data = await GetAllProducts();
        setProducts(data); // Ürünleri state'e aktar
    }
    // Ürünleri backend'den çek
    useEffect(() => {

        fetchProducts();
    }, []);

    // Silme işlemi
    async function DeletingProduct(id) {
        const isDeleted = await DeleteProduct(id);
        if (isDeleted) {
            setProducts(products.filter((x) => x.id !== id)); // Silinen ürünü state'den kaldır
        }
    }

    // Düzenleme işlemini başlat
    function EditFormActive(product) {
        setEditProduct(product); // Düzenlenecek ürünü belirle
        setIsEditProduct(true); // Düzenleme formunu aç
    }

    // Güncelleme işlemi
    async function UpdatingProduct() {
        if (editProduct) {
            const updatedProduct = await UpdateProduct(editProduct.id, editProduct);
            if (updatedProduct) {
                setProducts(products.map((product) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                )); // Güncellenen ürünü state'de değiştir
                await fetchProducts();
                setIsEditProduct(false); // Düzenleme formunu kapat

            }
        }
    }

    // Input değerlerini güncelle
    function InputChange(e) {
        setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
    }
    function navigateHome(){
        navigate("/Home")
    }

    return (
        <>
            <button
                onClick={navigateHome}
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
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Ürünler</h1>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {products.map((product, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            margin: "10px",
                            padding: "10px",
                            width: "300px", // Kart genişliği
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Hafif gölgelendirme
                            textAlign: "center", // İçerik ortalama
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
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                            <button
                                style={{
                                    padding: "5px 10px",
                                    backgroundColor: "#ff4c4c",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                onClick={() => DeletingProduct(product.id)}
                            >
                                Sil
                            </button>
                            <button
                                style={{
                                    padding: "5px 10px",
                                    backgroundColor: "#4caf50",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                onClick={() => EditFormActive(product)}
                            >
                                Düzenle
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Düzenleme Formu */}
            {isEditProduct && editProduct && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "20px",
                        backgroundColor: "#fff",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        zIndex: 1000,
                    }}
                >
                    <h2>Ürünü Düzenle</h2>
                    <label>Ürün Adı:</label>
                    <input
                        type="text"
                        name="name"
                        value={editProduct.name || ""}
                        onChange={InputChange}
                        placeholder="Ürün Adı"
                        style={{ margin: "10px 0", width: "100%", padding: "10px" }}
                    />
                    <label>Ürün Açıklaması:</label>
                    <input
                        type="text"
                        name="description"
                        value={editProduct.description || ""}
                        onChange={InputChange}
                        placeholder="Ürün Açıklaması"
                        style={{ margin: "10px 0", width: "100%", padding: "10px" }}
                    />
                    <label>Ürün Fiyatı:</label>
                    <input
                        type="number"
                        name="price"
                        value={editProduct.price || ""}
                        onChange={InputChange}
                        placeholder="Ürün Fiyatı"
                        style={{ margin: "10px 0", width: "100%", padding: "10px" }}
                    />
                    <button
                        onClick={UpdatingProduct}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#4caf50",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "10px",
                        }}
                    >
                        Tamam
                    </button>
                    <button
                        onClick={() => setIsEditProduct(false)}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#f44336",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "10px",
                            marginLeft: "10px",
                        }}
                    >
                        İptal
                    </button>
                </div>
            )}
        </>
    );
}

export default Product;
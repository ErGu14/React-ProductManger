import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 550px" }}>
                <div style={{display: "flex", gap: "10px"}}>
                    <button
                        onClick={() => {
                            navigate("/");
                        }}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "blue",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Ana Sayfa
                    </button>
                    <button
                        onClick={() => {
                            navigate("/products");
                        }}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "blue",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Ürünlerim
                    </button>
                </div>
                <button
                    onClick={() => {
                        localStorage.clear();
                        navigate("/login");
                    }}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Hesaptan Çıkış Yap
                </button>
            </div>
            <hr />
            <Outlet />
        </>
    );
}

export default App;
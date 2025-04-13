import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function EnterAccount(e) {
        e.preventDefault();
        const data = { Email: email, Password: password };

        const response = await fetch("http://localhost:1414/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = response.headers.get("Content-Length") > 0
            ? await response.json()
            : {};

        if (response.ok) {
            alert("Giriş Başarılı");
            navigate("/home");
        } else {
            alert(result.Error || "Bilgiler Yanlış Tekrar Deneyin");
        }
    }

    function gotoRegister() {
        navigate("/register");
    }

    return (
        <>
            <h1 style={{
                color: "red",
                fontSize: "36px",
                textAlign: "center",
                marginBottom: "10px"
            }}>
                Giriş Yap
            </h1>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px"
            }}>
                <label>Email:</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                />
                <label>Password:</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                />
                <button
                    style={{ marginTop: "10px" }}
                    onClick={EnterAccount}
                >
                    Giriş Yap
                </button>
                <Link to= "/register"
                    style={{ marginTop: "10px" }}
                    onClick={gotoRegister}
                >
                    Hesabım Yok
                </Link>
            </div>
        </>
    );
}

export default Login;
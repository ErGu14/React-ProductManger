import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("user1@example.com");
    const [password, setPassword] = useState("password1");
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
        }).then((res) => res.json());

        if (response.isSuccessful) {
            localStorage.setItem("token","This is a token");
            navigate("/");
        } else {
            alert(response.errorMessages[0]);
        }
    }

    function gotoRegister() {
        navigate("/register");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            navigate("/");
        }
    },[]);

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                />
                <label>Password:</label>
                <input
                value={password}
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
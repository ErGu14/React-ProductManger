import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
    const [UserName, setUserName] = useState("");
    const [eMail, setEMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function CreateAccount(e) {
        e.preventDefault();
        const data = { Email: eMail, Name: UserName, Password: password };
        const response = await fetch("http://localhost:1414/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = response.headers.get("Content-Length") > 0  //bu kısım eğer body kısmı null gelirse bile boş döndürmesini sağlıyor eğer önceki gormat JSON... gibi bişey yazarsak hata fırlatacaktır
            ? await response.json()
            : {};

        if (response.ok) {
            alert(result.Message || "Kaydınız Başarılı Giriş Yapınız");
            navigate("/");
        } else {
            alert(result.Error || "Kayıt İşlemi Başarısız Lütfen Bilgileri Eksiksiz Doldurun");
        }
    }

    return (
        <>
            <h1 style={{ color: "red", fontSize: "36px", textAlign: "center", marginBottom: "10px" }}>
                Kayıt Yeri
            </h1>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px"
            }}>
                <label>UserName:</label>
                <input
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    required
                />
                <label>Email:</label>
                <input
                    onChange={(e) => setEMail(e.target.value)}
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
                    onClick={CreateAccount}
                >
                    Kayıt Ol
                </button>
                <Link to="/" style={{ marginTop: "10px", textDecoration: "none", color: "blue" }}>
                    Zaten Hesabım Var
                </Link>
            </div>
        </>
    );
}

export default Register;
# React Projesi: Ürün Yönetimi

Bu proje, React kullanarak bir ürün yönetim sistemi geliştirmek amacıyla oluşturulmuştur. Kullanıcılar ürün ekleme, düzenleme, silme işlemleri gerçekleştirebilir.

---

## **Özellikler**
- Kullanıcı Girişi (Login) ve Kayıt Olma (Register)
- Ürünleri listeleme
- Ürün ekleme
- Ürün düzenleme
- Ürün silme
- Kullanıcıları listeleme
- Hesaptan çıkış yapma

---

## **Teknolojiler**
- **React**: Kullanıcı arayüzünün oluşturulması
- **React Router**: Sayfalar arasında geçiş
- **Fetch API**: Backend ile veri iletişimi
- **Backend**: RESTful API ile veri işlemleri

---

## **Proje Yapısı**
src/ ├── Components/ │   ├── CreateProduct.js │   ├── GetAllProducts.js ├── Pages/ │   ├── Home.jsx │   ├── Login.jsx │   ├── Register.jsx │   ├── Product.jsx │   ├── AddProduct.jsx ├── App.jsx ├── index.js

---

## **Nasıl Çalıştırılır?**
1. Projeyi klonlayın:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```
2. Gerekli bağımlılıkları yükleyin:
    ```bash
    npm install
    ```
3. Projeyi başlatın:
    ```bash
    npm start
    ```
4. Backend'i başlatmayı unutmayın!

---

## **Backend ile İletişim**
Backend API, ürünler ve kullanıcılar üzerinde işlemler yapmak için kullanılmaktadır. API ile etkileşimde kullanılan ana endpoint'ler şunlardır:
- **Ürün Listeleme**: `GET http://localhost:1414/product`
- **Ürün Ekleme**: `POST http://localhost:1414/product/add`
- **Ürün Düzenleme**: `PUT http://localhost:1414/product/update/:id`
- **Ürün Silme**: `DELETE http://localhost:1414/product/delete/:id`

---

## **Geri Butonu**
Her sayfada `/home` adresine yönlendiren bir "Geri" butonu eklenmiştir.

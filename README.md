# 🎬 Projecte Cinema - 2024/2025

Repositori del projecte de gestió de cinemes desenvolupat durant el curs 2024/2025.

## 🌐 Enllaços importants

- 🔗 Aplicació en producció: [Cinema Online](http://cine.a23arnbarsor.daw.inspedralbes.cat:27500/)
- 💻 Repositori GitHub: [tr3-cinema-24-25-arnaubarrerosorribas](https://github.com/inspedralbes/tr3-cinema-24-25-arnaubarrerosorribas)
- 🎨 Disseny UI/UX: [Penpot](https://design.penpot.app/#/view?file-id=2fba00dd-ccda-80a0-8005-ddf70dbe4bb6&page-id=2fba00dd-ccda-80a0-8005-ddf70dbe4bb7&section=interactions&frame-id=36bed9f3-4d4e-8063-8005-ddfce1608b5c&index=0&share-id=2fba00dd-ccda-80a0-8005-ddfd5d633f17)

## 📌 Descripció

El projecte consisteix en una plataforma de gestió de cinemes que permet la compra d'entrades, la gestió de pel·lícules i la visualització de la recaptació. També incorpora WebSockets per veure en temps real les butaques que s'estan reservant.

## 🚀 Tecnologies Utilitzades

- **Back-end:** Laravel 12, PHP
- **Front-end:** NEXT.js, Tailwind CSS
- **Base de dades:** MySQL
- **Autenticació:** Laravel Sanctum
- **Temps real:** WebSockets amb Laravel Echo i Pusher

## ⚙️ Instal·lació i Execució

### 1️⃣ Clonar el Repositori
```bash
 git clone https://github.com/inspedralbes/tr3-cinema-24-25-arnaubarrerosorribas.git
 cd tr3-cinema-24-25-arnaubarrerosorribas
```

### 2️⃣ Instal·lar Dependències
```bash
composer install
npm install
```

### 3️⃣ Configurar l'entorn
Copiar el fitxer `.env.example` a `.env` i configurar les variables d'entorn.
```bash
cp .env.example .env
php artisan key:generate
```

### 4️⃣ Migrar la Base de Dades
```bash
php artisan migrate --seed
```

### 5️⃣ Executar el Servei
```bash
php artisan serve
npm run dev
```
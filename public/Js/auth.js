// ======================
// ELEMENT
// ======================
const formLogin = document.getElementById("formLogin");
const formRegister = document.getElementById("formRegister");
const tombolDaftar = document.getElementById("tombolDaftar");

const pesanError = document.getElementById("pesanError");
const teksPesanError = document.getElementById("teksPesanError");

// ======================
// LOGIN
// ======================
if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    pesanError.classList.add("hidden");

    const data = {
      email: formLogin.email.value.trim(),
      password: formLogin.password.value
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const hasil = await res.json();

      if (!res.ok) {
        pesanError.classList.remove("hidden");
        teksPesanError.textContent = hasil.pesan || "Login gagal";
        return;
      }

      // SIMPAN
      localStorage.setItem("token", hasil.token);
      localStorage.setItem("peran", hasil.peran);
      localStorage.setItem("nama", hasil.nama);

      // REDIRECT SESUAI PERAN
      if (hasil.peran === "admin") {
        window.location.href = "/Dashbord_admin";
      } else {
        window.location.href = "/Dashbord_user";
      }

    } catch (err) {
      console.error(err);
      pesanError.classList.remove("hidden");
      teksPesanError.textContent = "Server error";
    }
  });
}

// ======================
// REGISTER
// ======================
if (formRegister) {
  formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nama = formRegister.nama.value.trim();
    const email = formRegister.email.value.trim();
    const password = formRegister.password.value;
    const peran = formRegister.peran.value;

    if (!nama || !email || !password || !peran) {
      alert("Semua field harus diisi");
      return;
    }

    const data = {
      nama: nama,
      email: email,
      password: password,
      peran: peran
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const hasil = await res.json();

      if (!res.ok) {
        alert(hasil.pesan || "Registrasi gagal");
        return;
      }

      alert("Registrasi berhasil, silakan login");
      window.location.href = "/";

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  });
}

// ======================
// TOMBOL PINDAH KE REGISTER
// ======================
if (tombolDaftar) {
  tombolDaftar.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/register";
  });
}

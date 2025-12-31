// login.js
fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email,
    password
  })
})
.then(res => res.json())
.then(data => {
  if (!data.token) {
    alert("Login gagal");
    return;
  }

  // 🔒 SIMPAN TOKEN
  localStorage.setItem("token", data.token);

  // 🔥 PASTIKAN TERSIMPAN
  setTimeout(() => {
    window.location.href =
      data.peran === "admin"
        ? "/PesanUser"
        : "/Pesan_denganAdmin";
  }, 300);
});

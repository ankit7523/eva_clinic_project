document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("whatsappForm");
  const successBox = document.getElementById("successMessage");

  if (!form || !successBox) return;

  // page load par hide
  successBox.style.display = "none";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const place = document.getElementById("place").value.trim();
    const problem = document.getElementById("problem").value;
    const details = document.getElementById("details").value.trim();

    // validation
    if (!name || !mobile || !place || !problem) {
      alert("Please fill all required fields");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert("Please enter valid 10 digit mobile number");
      return;
    }

    // ✅ click par success show
    successBox.style.display = "block";

    // ✅ CLEAN message (NO comments inside)
    const message =
`Hello EVA CLINIC,

Name: ${name}
Mobile: ${mobile}
Place: ${place}
Hair Problem: ${problem}
Description: ${details ? details : "N/A"}`;

    const url = `https://wa.me/919696438436?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    form.reset();
  });

});

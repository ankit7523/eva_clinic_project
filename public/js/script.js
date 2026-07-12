/* ===============================
   SITE LOAD
================================ */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Vaanya Clinic site loaded successfully!");

  /* ===============================
     APPOINTMENT FORM (BACKEND CONNECT)
  ================================ */
  const form = document.getElementById("appointmentForm");
  const messageBox = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        city: form.city.value.trim(),
        state: form.state.value
      };

      // Frontend validation
      if (!/^\d{10}$/.test(formData.phone)) {
        alert("Please enter valid 10 digit mobile number");
        return;
      }

      try {
        const res = await fetch("/appointment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.ok) {
          messageBox.innerText = data.message || "Appointment booked successfully!";
          messageBox.style.color = "green";
          form.reset();

          setTimeout(() => {
            closePopup();
            messageBox.innerText = "";
          }, 1500);
        } else {
          messageBox.innerText = "Form submit failed";
          messageBox.style.color = "red";
        }

      } catch (err) {
        messageBox.innerText = "Server error. Try again.";
        messageBox.style.color = "red";
        console.error(err);
      }
    });
  }

  /* ===============================
     ACTIVE NAV LINK (AUTO)
  ================================ */
  const links = document.querySelectorAll(".nav-links a");
  const currentPath = window.location.pathname;

  links.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
});

/* ===============================
   LOADER
================================ */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

/* ===============================
   NAVBAR SHADOW ON SCROLL
================================ */
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (nav) {
    nav.classList.toggle("nav-shadow", window.scrollY > 40);
  }
});

/* ===============================
   SMOOTH SCROLL
================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ===============================
   SCROLL ANIMATION
================================ */
const animated = document.querySelectorAll(".animate");
window.addEventListener("scroll", () => {
  animated.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

/* ===============================
   POPUP OPEN / CLOSE
================================ */
function openPopup() {
  const popup = document.getElementById("advicePopup");
  if (popup) {
    popup.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closePopup() {
  const popup = document.getElementById("advicePopup");
  if (popup) {
    popup.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

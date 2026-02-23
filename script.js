// CONFIGURACIÓN
const PHONE_NUMBER = "56912345678"

// WhatsApp Link Generator
function openWhatsApp(data = null) {
  let message = "Hola RedMaestro, necesito ayuda con una urgencia.\n\n";

  if (data) {
    message += `*Nombre:* ${data.nombre}\n`;
    message += `*Comuna:* ${data.comuna}\n`;
    message += `*Descripción:* ${data.descripcion}\n`;
    message += `*¿Es para hoy?:* Sí\n`;
  } else {
    message += "Quiero coordinar un maestro para hoy. ¿Están disponibles?";
  }

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`, "_blank");
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Smooth Scroll (solo anclas internas)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Botones WhatsApp (navbar + CTA + sticky)
  const waButtons = document.querySelectorAll(".btn-whatsapp, #wa-sticky");
  waButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openWhatsApp();
    });
  });

  // Interceptar Formulario: deja que Netlify capture y luego abre WhatsApp
  const form = document.querySelector('form[name="contacto-redmaestro"]');
  if (form) {
    form.addEventListener("submit", () => {
      const formData = new FormData(form);
      const data = {
        nombre: (formData.get("name") || "").toString().trim(),
        comuna: (formData.get("comuna") || "").toString().trim(),
        descripcion: (formData.get("message") || "").toString().trim(),
      };

      // Abrir WhatsApp después de un delay corto
      setTimeout(() => {
        openWhatsApp(data);
      }, 500);
    });
  }
});

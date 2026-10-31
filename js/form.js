const form = document.querySelector("#contact-form");
const submitBtn = document.querySelector("#contact-submit");
const status = document.querySelector("#form-status");

if (!form) return;

const emailDestino = "ELVISRAMSES24@GMAIL.COM";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!form.reportValidity()) return;

  const buttonText = submitBtn.querySelector("span");

  // Evitar envíos duplicados
  submitBtn.disabled = true;
  buttonText.textContent = "Sending...";

  status.textContent = "";
  status.className = "form-status";

  const formData = {
    name: form.elements.name.value.trim(),
    email: form.elements.email.value.trim(),
    message: form.elements.message.value.trim(),
    _subject: "Nuevo mensaje desde tu portafolio",
    _honey: form.elements._honey.value,
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${emailDestino}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (String(data.success) !== "true") {
      throw new Error(data.message || "No se pudo enviar el mensaje.");
    }

    // Envío exitoso
    status.textContent =
      "¡Mensaje enviado correctamente! Gracias por contactarme.";

    status.classList.add("success");

    form.reset();
  } catch (error) {
    console.error("Error al enviar el formulario:", error);

    status.textContent = "No se pudo enviar el mensaje. Inténtalo nuevamente.";

    status.classList.add("error");
  } finally {
    submitBtn.disabled = false;
    buttonText.textContent = "Submit";
  }
});

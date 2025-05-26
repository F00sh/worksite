// scripts/contact.ts
type FormFields = {
  first: string;
  last: string;
  email: string;
  message: string;
};

const form = document.querySelector<HTMLFormElement>("#contact-form")!;
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data: FormFields = {
    first:  (form.elements.namedItem("first")  as HTMLInputElement).value,
    last:   (form.elements.namedItem("last")   as HTMLInputElement).value,
    email:  (form.elements.namedItem("email")  as HTMLInputElement).value,
    message:(form.elements.namedItem("message")as HTMLTextAreaElement).value,
  };

  try {
    // TODO: replace with your endpoint (Formspree, Netlify forms, etc.)
    const r = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!r.ok) throw new Error(r.statusText);
    alert("Thanks! Your message has been sent.");
    form.reset();
  } catch (err) {
    console.error(err);
    alert("There was a problem – please try again later.");
  }
});

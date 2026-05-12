/**
 * EmailJS (https://www.emailjs.com/) — public key is safe in client bundles.
 * Ensure your template in the dashboard uses the same `{{variable}}` names as
 * {@link emailJsTemplateFields} values.
 */
export const emailConfig = {
  /** Shown in the site and mailto fallbacks */
  contactEmail: "idrissioussama001@gmail.com",
} as const;

export const emailJsConfig = {
  publicKey: "aMEmdZl3S2pn5RXkl",
  serviceId: "service_zjr0u2e",
  templateId: "template_8nytezk",
} as const;

/** Keys = payload fields we collect; values = EmailJS template parameter names */
export const emailJsTemplateFields = {
  name: "from_name",
  email: "from_email",
  message: "message",
} as const;

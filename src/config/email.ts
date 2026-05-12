/**
 * EmailJS (https://www.emailjs.com/) — public key is safe in client bundles.
 * {@link buildEmailJsTemplateParams} fills common `{{variable}}` names used in templates.
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

/** Names on `<input name="…">` (optional; primary send uses {@link buildEmailJsTemplateParams}). */
export const emailJsTemplateFields = {
  name: "from_name",
  email: "from_email",
  message: "message",
} as const;

/**
 * Maps one set of form values to every variable name EmailJS templates commonly use,
 * so `{{name}}`, `{{from_name}}`, `{{user_name}}`, etc. all resolve in the dashboard.
 */
export function buildEmailJsTemplateParams(args: {
  name: string;
  email: string;
  message: string;
}): Record<string, string> {
  const name = args.name.trim();
  const email = args.email.trim();
  const message = args.message.trim();

  return {
    message,
    // single-word (many default “Contact” templates)
    name,
    email,
    // from_* (Gmail / auto-reply style)
    from_name: name,
    from_email: email,
    // user_* (EmailJS wizard samples)
    user_name: name,
    user_email: email,
    // reply header helpers
    reply_to: email,
    sender_email: email,
    sender_name: name,
  };
}

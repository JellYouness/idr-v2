"use client";

import emailjs from "@emailjs/browser";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { sectionTitleImageClassName } from "@/lib/section-title-image";
import { emailJsConfig, emailJsTemplateFields } from "@/config/email";
import type { SiteMeta } from "@/lib/types";

type ContactSectionProps = {
  site: SiteMeta;
};

function toMailtoHref(args: { to: string; subject: string; body: string }) {
  const params = new URLSearchParams({
    subject: args.subject,
    body: args.body,
  });
  return `mailto:${args.to}?${params.toString()}`;
}

type FormStatus = "idle" | "sending" | "success" | "error";

function emailJsErrorText(err: unknown): string {
  if (err && typeof err === "object" && "text" in err) {
    return String((err as { text: string }).text);
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong. Please try again or use email directly.";
}

export function ContactSection({ site }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorText, setErrorText] = useState("");

  const successRef = useRef<HTMLParagraphElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    emailjs.init(emailJsConfig.publicKey);
  }, []);

  const mailtoHref = useMemo(() => {
    const trimmedName = name.trim() || "Anonymous";
    const trimmedEmail = email.trim() || "Not provided";
    const trimmedMessage = message.trim();

    return toMailtoHref({
      to: site.email,
      subject: `Portfolio inquiry — ${trimmedName}`,
      body: [
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        "",
        trimmedMessage || "(No message)",
      ].join("\n"),
    });
  }, [email, message, name, site.email]);

  const scrollToRef = useCallback((el: HTMLElement | null) => {
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setErrorText("");
    setStatus("sending");

    const templateParams = {
      [emailJsTemplateFields.name]: name.trim(),
      [emailJsTemplateFields.email]: email.trim(),
      [emailJsTemplateFields.message]: message.trim(),
    };

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        templateParams,
        { publicKey: emailJsConfig.publicKey },
      );
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      requestAnimationFrame(() => scrollToRef(successRef.current));
    } catch (err) {
      setStatus("error");
      setErrorText(emailJsErrorText(err));
      requestAnimationFrame(() => scrollToRef(errorRef.current));
    }
  };

  return (
    <Section id="contact" ariaLabelledby="contact-title" tone="dark">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <h2
              id="contact-title"
              className="relative m-0 mb-4 p-0 font-[inherit] font-normal leading-none"
            >
              <Image
                src="/images/contact.png"
                alt="Contact"
                width={640}
                height={128}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className={`block brightness-0 invert ${sectionTitleImageClassName}`}
              />
            </h2>
            <p className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Let’s work together
            </p>
            <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
              Tell me about your project and I’ll get back to you as soon as
              possible.
            </p>

            <div className="mt-8 flex flex-col gap-2 text-sm text-muted sm:text-base">
              <a
                className="w-fit underline-offset-4 hover:underline"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
              <a
                className="w-fit underline-offset-4 hover:underline"
                href={`tel:${site.phoneHref}`}
              >
                {site.phoneDisplay}
              </a>
              <p>{site.location}</p>
            </div>
          </div>

          <form
            id="contact-form"
            onSubmit={onSubmit}
            className="flex flex-col gap-4"
          >
            <p
              ref={successRef}
              role="status"
              aria-live="polite"
              className={[
                "rounded border border-foreground/20 bg-surface px-4 py-3 text-sm text-foreground",
                status === "success" ? "" : "hidden",
              ].join(" ")}
            >
              Thanks — your message was sent. I’ll get back to you soon.
            </p>

            <p
              ref={errorRef}
              role="alert"
              aria-live="assertive"
              className={[
                "rounded border border-red-500/40 bg-surface px-4 py-3 text-sm text-red-300",
                status === "error" ? "" : "hidden",
              ].join(" ")}
            >
              {errorText ? `Error: ${errorText}` : "Error sending message."}
            </p>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name={emailJsTemplateFields.name}
                autoComplete="name"
                placeholder="Your name"
                className="w-full border border-foreground/15 bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-foreground/35"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name={emailJsTemplateFields.email}
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full border border-foreground/15 bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-foreground/35"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Message
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name={emailJsTemplateFields.message}
                required
                rows={6}
                placeholder="What do you need help with?"
                className="w-full resize-none border border-foreground/15 bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-foreground/35"
              />
            </label>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex min-h-13 min-w-[min(100%,16rem)] items-center justify-center border border-foreground/35 px-10 py-4 text-center text-sm font-medium text-foreground transition-colors enabled:hover:bg-foreground enabled:hover:text-background disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="size-4 shrink-0 animate-spin text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  "Send message"
                )}
              </button>
              <a
                href={mailtoHref}
                className="text-sm text-muted underline-offset-4 hover:underline"
              >
                Or email directly
              </a>
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}

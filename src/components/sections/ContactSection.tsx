"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { SiteMeta } from "@/lib/types";

type ContactSectionProps = {
  site: SiteMeta;
};

function toMailtoHref(args: {
  to: string;
  subject: string;
  body: string;
}) {
  const params = new URLSearchParams({
    subject: args.subject,
    body: args.body,
  });
  return `mailto:${args.to}?${params.toString()}`;
}

export function ContactSection({ site }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    window.location.href = mailtoHref;
  };

  return (
    <Section id="contact" ariaLabelledby="contact-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted">
              Contact
            </p>
            <h2
              id="contact-title"
              className="text-balance text-3xl font-bold text-foreground sm:text-4xl"
            >
              Let’s work together
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
              Tell me about your project and I’ll get back to you as soon as possible.
            </p>

            <div className="mt-8 flex flex-col gap-2 text-sm text-muted sm:text-base">
              <a className="w-fit underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <a className="w-fit underline-offset-4 hover:underline" href={`tel:${site.phoneHref}`}>
                {site.phoneDisplay}
              </a>
              <p>{site.location}</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
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
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full border border-foreground/15 bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-foreground/35"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                placeholder="What do you need help with?"
                className="w-full resize-none border border-foreground/15 bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-light focus:border-foreground/35"
              />
            </label>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex min-w-[min(100%,16rem)] items-center justify-center border border-foreground/35 bg-button-fill px-10 py-4 text-center text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Send message
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


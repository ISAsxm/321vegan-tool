function MailtoLink({ email = "", subject = "", body = "", children }) {
  const params =
    subject || body
      ? `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          body
        )}`
      : "";
  return <a href={`mailto:${email}${params}`}>{children}</a>;
}

export default MailtoLink;

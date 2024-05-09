const { MAILER_VALIDATION_URL } = process.env;

export const confirmUrl = (email: string | null, code: string) => {
  return `${MAILER_VALIDATION_URL}/${email}/${code}`;
};

export const getEmailValidationConfig = (
  to: string,
  confirmUrl: string
): any => ({
  to,
  from: "noresponse@cluster.io",
  subject: "Confirmação de Email",
  html: `<p>Por favor, confirme seu email clicando <a href="${confirmUrl}">aqui</a>.</p>`,
});

const { MAILER_RESET_PASSWORD_URL } = process.env;

export const recoverPasswordUrl = (email: string, code: string) => {
  return `${MAILER_RESET_PASSWORD_URL}/${email}/${code}`;
};

export const getEmailRecoverPasswordConfig = (
  to: string,
  recoverPasswordUrl: string
): any => ({
  to,
  from: "noresponse@cluster.io",
  subject: "Recuperação de Senha",
  html: `<p>Para alterar a senha clique <a href="${recoverPasswordUrl}">aqui</a>.</p>`,
});

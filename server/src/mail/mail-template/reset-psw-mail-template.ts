export function generateResetPasswordMailTemplate(email: string, link: string) {
  return {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Восстановление пароля на сайте SHOP.RU',
    text: '',
    html: `
        <div>
            <h1>Для восстановления пароля перейдите по ссылке:<h1>
            <a href="${link}">Ссылка</a>
        </div>
    `,
  };
}

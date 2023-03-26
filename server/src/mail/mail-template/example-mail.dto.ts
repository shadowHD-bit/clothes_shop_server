export const testLetter = {
  from: process.env.SMTP_USER,
  to: 'sanek0020601@gmail.com',
  subject: 'С сайта SHOP.RU (Тестовое сообщение)',
  text: '',
  html: `
          <div>
              Это тестовое сообщение!
          </div>
      `,
};

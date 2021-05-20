import { NextApiRequest, NextApiResponse } from 'next';

import { createTransport } from 'nodemailer';

import { Email } from '../../components/Form';
import { getDate } from '../../utils';

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name, cartList }: Email = req.body;

  const date = getDate();

  let transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USERMAIL,
      pass: process.env.PASSMAIL,
    },
  });

  const list = cartList.map(({ id, amount }) => {
    const amountFormated = Number(amount) > 9 ? amount : `0${amount}`;
    const unit = Number(amount) <= 1 ? 'Unidade' : 'Unidades';

    return `<tr style="background-color: #ffffff">
      <td style="font-size: 16px; padding: 8px 16px">${id}</td>
      <td style="font-size: 16px; padding: 8px 16px">${amountFormated} ${unit}</td>
    </tr>`;
  });

  const listFormated = list.reduce((acc, curr) => `${acc}${curr}`);

  try {
    const response = await transporter.sendMail({
      from: process.env.USERMAIL,
      to: 'pjferragens@gmail.com',
      replyTo: email,
      subject: 'Contato através do site: www.pjferragens.com.br',
      html: `
      <p style="font-size: 16px; color: #565857;"><strong>Nome:</strong> ${name}</p>
      <p style="font-size: 16px; color: #565857;"><strong>E-mail:</strong> ${email}</p>
      <p style="font-size: 16px; color: #565857;"><strong>Enviado:</strong> ${date}</p>

      <table
      style="
        width: fit-content;
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        background-color: rgba(0, 0, 0, 0.1);
        color: #565857;
        border-radius: 5px;
      "
    >
      <caption
        style="
          font-size: 16px;
          margin: 0 0 24px;
          white-space: nowrap;          
          text-align: left;
        "
      >
      <strong>Lista para orçamento:</strong>        
      </caption>
      <tr style="background-color: #00aaaa">
        <th style="font-size: 24px; color: #ffffff; padding: 16px">
          Referência
        </th>
        <th style="font-size: 24px; color: #ffffff; padding: 16px">
          Quantidade
        </th>
      </tr>
      ${listFormated}
    </table>
      `,
    });

    return !response.rejected[0]
      ? res.send({ message: 'OK' })
      : res.status(404).send({ message: 'FAILED' });
  } catch (error) {
    return res.status(404).send({ message: 'FAILED' });
  }
}

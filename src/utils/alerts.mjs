import { mailOptions, sendMail, transporter } from "../config/nodemailer.mjs";

export const sendStockAlert = (product) => {
  const alertMessage = `
    <p><strong>Alert:</strong> Stock for <strong>${product.name}</strong> 
    is below the required threshold of <strong>${product.stockThreshold}</strong>. 
    Current quantity is <strong>${product.quantity}</strong>.</p>
  `;
  const configOptions = {...mailOptions, html: alertMessage };
  sendMail(transporter, configOptions);
};

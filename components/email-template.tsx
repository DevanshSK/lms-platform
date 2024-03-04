import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message
}) => (
  <div>
    <h1>Sender Name: {name}!</h1>
    <h2>Sender Email: {email}</h2>
    <p>Message recieved:</p>
    <p>{message}</p>
  </div>
);
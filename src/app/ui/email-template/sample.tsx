interface EmailTemplateProps {
  name: string;
  subject: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  subject,
}) => {
  return (
    <div>
      <div>
        <p>Hello {name}</p>

        <h3>{subject}</h3>

        <p>
          We are excited to have you join us. We are here to help you with your
          journey to becoming a better developer.
        </p>

        <p>
          If you have any questions, please feel free to reach out to us at{" "}
          <a href="mailto:beauty4ever@oluwasetemi.dev">
            beauty4ever@oluwasetemi.dev
          </a>
        </p>

        <p>Best,</p>
      </div>
    </div>
  );
};

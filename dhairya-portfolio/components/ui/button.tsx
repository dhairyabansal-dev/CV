import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: ButtonVariant;
}

export function Button({
  children,
  className,
  href,
  type = "button",
  variant = "primary",
  ...buttonProps
}: ButtonProps) {
  const buttonClassName = ["button", `button--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a className={buttonClassName} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClassName} type={type} {...buttonProps}>
      {children}
    </button>
  );
}

import { ReactNode } from "react";

interface ShimmerButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const ShimmerButton = ({ href, onClick, children, className = "", target, rel }: ShimmerButtonProps) => {
  const inner = (
    <>
      <div className="shimmer-container">
        <div className="shimmer" />
      </div>
      <div className="shimmer-backdrop" />
      <span className="shimmer-text">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={`shimmer-button ${className}`}>
        {inner}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`shimmer-button ${className}`}>
      {inner}
    </button>
  );
};

export default ShimmerButton;

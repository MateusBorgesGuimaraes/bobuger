import React from "react";
import { Link } from "react-router-dom";
import styles from "./LinkButton.module.css";

type ILinkButton = React.ComponentProps<"a"> & {
  path?: string;
  href?: string;
  children: React.PropsWithChildren;
  backgroundColor?: string;
  color?: string;
  fontSize?: string | number;
  padding?: string | number;
  borderRadius?: string | number;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const LinkButton = ({
  path = "/",
  href,
  children,
  backgroundColor,
  color,
  fontSize,
  padding = "14px 24px",
  borderRadius = "8px",
  onClick,
  ...props
}: ILinkButton) => {
  const style = {
    backgroundColor,
    color,
    fontSize,
    padding,
    borderRadius,
    fontWeight: "600",
  };

  if (href) {
    return (
      <a className={styles.btn} href={href} style={style} onClick={onClick}>
        {children}
      </a>
    );
  } else {
    return (
      <Link className={styles.btn} to={path} style={style} onClick={onClick}>
        {children}
      </Link>
    );
  }
};

export default LinkButton;

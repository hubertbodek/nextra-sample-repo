import type { FC, ReactNode } from "react";
import { FaArrowLeft, FaArrowRight, FaLock, FaRegClone } from "react-icons/fa";
import { FiExternalLink, FiPlus, FiShare2 } from "react-icons/fi";
import styles from "./screenshot.module.css";

interface Props {
  variant?: Variant;
  darkened?: boolean;
  url?: string;
  children: ReactNode;
  isLinkEnabled?: boolean; // Prop to control the link state
}

type Variant = "webapp" | "cli";

export const Screenshot: FC<Props> = ({
  variant = "webapp",
  url = "app.acmeapi.dev",
  darkened = false,
  children,
  isLinkEnabled = false,
}: Props) => {
  const renderWebappTopBar = () => (
    <div className={styles.browserBar}>
      {darkened && <div className={styles.overlay} />}
      <div className={styles.browserIconsLeft}>
        <span className={`${styles.circle} ${styles.red}`}></span>
        <span className={`${styles.circle} ${styles.yellow}`}></span>
        <span className={`${styles.circle} ${styles.green}`}></span>
        <div className={styles.browserControls}>
          <FaArrowLeft className={styles.icon} />
          <FaArrowRight className={styles.icon} />
        </div>
      </div>
      <a
        href={isLinkEnabled ? `https://${url}` : undefined}
        target={isLinkEnabled ? "_blank" : undefined}
        rel={isLinkEnabled ? "noopener noreferrer" : undefined}
        className={`${styles.clickableArea} ${
          !isLinkEnabled ? styles.disabledLink : ""
        }`}
        onClick={(e) => {
          if (!isLinkEnabled) {
            e.preventDefault();
          }
        }}
      >
        <div className={styles.browserAddress}>
          <FaLock className={`${styles.icon} ${styles.lockIcon}`} />
          <span className={styles.url}>{url}</span>
          {isLinkEnabled && (
            <FiExternalLink className={styles.externalLinkIcon} />
          )}
        </div>
      </a>
      <div className={styles.browserIconsRight}>
        <FiShare2 className={styles.icon} />
        <FiPlus className={styles.icon} />
        <FaRegClone className={styles.icon} />
      </div>
    </div>
  );

  const renderCliTopBar = () => (
    <div className={styles.terminalBar}>
      <div className={styles.terminalIconsLeft}>
        <span
          className={`${styles.terminalCircle} ${styles.terminalRed}`}
        ></span>
        <span
          className={`${styles.terminalCircle} ${styles.terminalYellow}`}
        ></span>
        <span
          className={`${styles.terminalCircle} ${styles.terminalGreen}`}
        ></span>
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {variant === "webapp" && renderWebappTopBar()}
        {variant === "cli" && renderCliTopBar()}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Screenshot;

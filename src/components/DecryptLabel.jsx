import DecryptedText from "./DecryptedText";
import { decryptDefaults } from "./decryptDefaults";

/** Single-line decrypt with site-wide defaults; pass props to override (e.g. animateOn="hover"). */
export default function DecryptLabel({
  text,
  className = "",
  parentClassName = "",
  encryptedClassName = decryptDefaults.encryptedClassName,
  ...props
}) {
  const resolvedParent = parentClassName || className;
  const resolvedClass = className || parentClassName;

  return (
    <DecryptedText
      text={text}
      parentClassName={resolvedParent}
      className={resolvedClass}
      encryptedClassName={encryptedClassName}
      {...decryptDefaults}
      {...props}
    />
  );
}

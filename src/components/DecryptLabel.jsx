import DecryptedText from "./DecryptedText";

export const decryptDefaults = {
  animateOn: "view",
  sequential: true,
  revealDirection: "center",
  speed: 45,
  maxIterations: 12,
  encryptedClassName: "text-lime-400",
  disableAnimation: true,
};

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

/** Two-tone headings: plain + accent (+ optional trailing plain). */
export function DecryptSplitHeading({
  before = "",
  highlight = "",
  after = "",
  className = "",
  beforeClassName = "text-white",
  highlightClassName = "text-lime-400",
  afterClassName = "text-white",
  ...props
}) {
  return (
    <span className={className}>
      {before ? (
        <DecryptLabel text={before} parentClassName={beforeClassName} className={beforeClassName} {...props} />
      ) : null}
      {highlight ? (
        <DecryptLabel text={highlight} parentClassName={highlightClassName} className={highlightClassName} {...props} />
      ) : null}
      {after ? (
        <DecryptLabel text={after} parentClassName={afterClassName} className={afterClassName} {...props} />
      ) : null}
    </span>
  );
}

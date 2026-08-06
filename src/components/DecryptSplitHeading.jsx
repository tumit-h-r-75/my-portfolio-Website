import DecryptLabel from "./DecryptLabel";

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

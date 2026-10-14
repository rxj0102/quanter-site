/** Text that starts with [ is a placeholder and gets the amber style. */
export default function T({ children }: { children: string }) {
  return children.startsWith("[") ? <span className="ph">{children}</span> : <>{children}</>;
}

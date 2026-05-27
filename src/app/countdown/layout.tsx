export default function CountdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout overrides the parent layout and does NOT render Nav/Footer
  return children;
}

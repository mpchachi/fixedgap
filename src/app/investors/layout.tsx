export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Este layout sobrescribe el layout padre y NO renderiza Nav/Footer
  return children;
}

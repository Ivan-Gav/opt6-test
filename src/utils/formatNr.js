export default function formatNr(n) {
  return new Intl.NumberFormat().format(n);
}

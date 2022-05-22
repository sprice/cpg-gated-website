import Link from "next/link";

export default function FourOhFour() {
  return (
    <>
      <h2>404 - This page went Pop!</h2>
      <Link href="/">
        <a>Head back home</a>
      </Link>
    </>
  );
}

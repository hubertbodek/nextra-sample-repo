import { Button } from "~/components";
import Link from "~/lib/next";

export const CTA = () => {
  const cta = (
    <Link href="https://app.acmeapi.dev">
      <Button asChild size="lg">
        <div>Try now for free</div>
      </Button>
    </Link>
  );

  return <div>CTA</div>;
};

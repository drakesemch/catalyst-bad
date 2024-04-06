import { db } from "~/server/db";
import ConfirmSchoolClientPage from "./client";

export default async function ConfirmSchoolPage({
  searchParams,
}: {
  searchParams: {
    school: string;
  };
}) {
  const school = await db.school.findUnique({
    where: {
      id: searchParams.school,
    },
  });
  return <ConfirmSchoolClientPage school={school!} />;
}

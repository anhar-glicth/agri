import EditClient from "./EditClient";

export async function generateStaticParams() {
  return [{ id: "1" }];
}

export default async function EditLahan({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditClient id={id} />;
}

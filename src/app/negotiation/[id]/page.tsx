import { redirect } from 'next/navigation';

export default async function NegotiationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Redirect to inbox - negotiations now open in modals
  redirect('/inbox');
}

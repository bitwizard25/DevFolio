import { redirect } from 'next/navigation';

// Portfolio OS is now the homepage — keep old bookmarks/shared links alive.
export default function OsPage() {
  redirect('/');
}

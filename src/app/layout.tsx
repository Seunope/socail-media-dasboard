// import { ThemeProvider } from "next-themes";
// import "@/styles/globals.css";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           {children}
//         </ThemeProvider>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//   document.documentElement.classList.add('no-flash');
// `,
//           }}
//         />
//       </body>
//     </html>
//   );
// }

import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import { ThemeInitializer } from "@/components/theme-script";
import { AuthProvider } from "@/context/AuthContext";
import { User } from "@/lib/types";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialUser = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    avatar: "https://example.com/avatar.jpg",
  } as User;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
        </ThemeProvider>
        <ThemeInitializer />
      </body>
    </html>
  );
}

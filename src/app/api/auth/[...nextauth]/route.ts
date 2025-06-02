// route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { User } from "next-auth";


const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      try {
        const { data } = await supabase
          .from("users")
          .select("id")
          .eq("email", user.email)
          .maybeSingle();

        if (!data && user.email) {
          const { error: insertError } = await supabase.from("users").insert([
            {
              email: user.email,
              name: user.name,
              provider: "google",
            },
          ]);

          if (insertError) {
            console.error("❌ Insert failed:", insertError.message);
            return false;
          }
        }

        return true;
      } catch (err) {
        console.error("❌ signIn callback error:", err);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

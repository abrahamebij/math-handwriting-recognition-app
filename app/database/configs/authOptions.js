import CredentialsProvider from "next-auth/providers/credentials";
import User from "../models/User";
import bcrypt from "bcryptjs";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User does not exist");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

export default authOptions;

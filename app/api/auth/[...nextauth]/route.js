import NextAuth from "next-auth";
import authOptions from "../../../database/configs/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import { NextRequest } from "next/server";

export const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD || "DeltaCharlie-27-5-1939";

export function verifyAdminAuth(req: NextRequest): boolean {
  // Check authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (token === ADMIN_PASSWORD || token === "admin_token_authorized") {
      return true;
    }
  }

  // Check admin session cookie
  const cookie = req.cookies.get("admin_session");
  if (cookie && (cookie.value === ADMIN_PASSWORD || cookie.value === "admin_authorized")) {
    return true;
  }

  return false;
}

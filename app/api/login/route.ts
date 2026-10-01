import bcrypt from "bcryptjs";

import { getCloudflareContext } from "@opennextjs/cloudflare";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    // Validate email
    if (!email) {
      return NextResponse.json(
        {
          error: "Email is required",
        },
        {
          status: 400,
        }
      );
    }

    // Validate password
    if (!password) {
      return NextResponse.json(
        {
          error: "Password is required",
        },
        {
          status: 400,
        }
      );
    }

    const { env } =
      await getCloudflareContext();

    const db = env.DB;

    // Find user
    const user = await db
      .prepare(
        `
        SELECT
          id,
          name,
          email,
          password
        FROM users
        WHERE email = ?
        LIMIT 1
        `
      )
      .bind(email)
      .first<{
        id: string;
        name: string;
        email: string;
        password: string;
      }>();

    // User does not exist
    if (!user) {
      return NextResponse.json(
        {
          error:
            "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    // Check password
    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatches) {
      return NextResponse.json(
        {
          error:
            "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    // Login successful
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to login",
      },
      {
        status: 500,
      }
    );
  }
}
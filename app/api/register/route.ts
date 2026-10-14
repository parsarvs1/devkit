import bcrypt from "bcryptjs";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

 
    if (!name) {
      return NextResponse.json(
        {
          error: "Name is required",
        },
        {
          status: 400,
        }
      );
    }

    if (name.length > 50) {
      return NextResponse.json(
        {
          error:
            "Name must be 50 characters or less",
        },
        {
          status: 400,
        }
      );
    }

    
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

    if (password.length < 6) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 6 characters",
        },
        {
          status: 400,
        }
      );
    }

    const { env } =
      await getCloudflareContext();

    const db = env.DB;


    const existingUser = await db
      .prepare(
        `
        SELECT id
        FROM users
        WHERE email = ?
        LIMIT 1
        `
      )
      .bind(email)
      .first<{
        id: string;
      }>();

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "An account with this email already exists",
        },
        {
          status: 409,
        }
      );
    }

  
    const hashedPassword =
      await bcrypt.hash(password, 12);

  
    const userId =
      crypto.randomUUID();

   
    const createdAt =
      new Date().toISOString();

   
    await db
      .prepare(
        `
        INSERT INTO users (
          id,
          name,
          email,
          password,
          created_at
        )
        VALUES (?, ?, ?, ?, ?)
        `
      )
      .bind(
        userId,
        name,
        email,
        hashedPassword,
        createdAt
      )
      .run();

    return NextResponse.json(
      {
        success: true,
        user: {
          id: userId,
          name,
          email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "REGISTER ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create account",
      },
      {
        status: 500,
      }
    );
  }
}
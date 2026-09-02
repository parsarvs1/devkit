import { auth } from "@/auth";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    console.log("PROFILE SESSION:", session);

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (!session.user.id) {
      return NextResponse.json(
        {
          error: "User ID not found in session",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
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

    const { env } =
      await getCloudflareContext();

    const db = env.DB;

    await db
      .prepare(
        `
        UPDATE users
        SET name = ?
        WHERE id = ?
        `
      )
      .bind(
        name,
        session.user.id
      )
      .run();

    return NextResponse.json({
      success: true,
      name,
    });
  } catch (error) {
    console.error(
      "PROFILE UPDATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to update profile",
      },
      {
        status: 500,
      }
    );
  }
}
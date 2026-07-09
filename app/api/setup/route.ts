import { NextResponse } from "next/server";

import { createServiceSupabaseClient } from "@/lib/supabase/server";

type SetupPayload = {
  householdName?: unknown;
  primaryEmail?: unknown;
  people?: unknown;
  preferences?: unknown;
};

function toClientSetup(row: {
  household_name: string;
  primary_email: string | null;
  people: unknown;
  preferences: unknown;
}) {
  return {
    householdName: row.household_name,
    primaryEmail: row.primary_email ?? "",
    people: Array.isArray(row.people) ? row.people : [],
    preferences: row.preferences && typeof row.preferences === "object" && !Array.isArray(row.preferences) ? row.preferences : {},
  };
}

function tableMissingResponse(message: string) {
  return NextResponse.json(
    {
      error: "setup_table_unavailable",
      message,
      setup: null,
    },
    { status: 503 },
  );
}

export async function GET() {
  const supabase = createServiceSupabaseClient();

  if (!supabase) {
    return NextResponse.json(
      {
        error: "supabase_env_missing",
        message: "Supabase environment variables are not configured for setup storage.",
        setup: null,
      },
      { status: 503 },
    );
  }

  const { data, error } = await supabase
    .from("harbor_setups")
    .select("household_name, primary_email, people, preferences")
    .eq("setup_key", "default")
    .maybeSingle();

  if (error) {
    return tableMissingResponse(error.message);
  }

  return NextResponse.json({ setup: data ? toClientSetup(data) : null });
}

export async function POST(request: Request) {
  const supabase = createServiceSupabaseClient();

  if (!supabase) {
    return NextResponse.json(
      {
        error: "supabase_env_missing",
        message: "Supabase environment variables are not configured for setup storage.",
      },
      { status: 503 },
    );
  }

  let body: SetupPayload;

  try {
    body = (await request.json()) as SetupPayload;
  } catch {
    return NextResponse.json({ error: "invalid_json", message: "Request body must be valid JSON." }, { status: 400 });
  }

  const householdName = typeof body.householdName === "string" ? body.householdName.trim() : "";
  const primaryEmail = typeof body.primaryEmail === "string" ? body.primaryEmail.trim() : "";
  const people = Array.isArray(body.people) ? body.people : null;
  const preferences =
    body.preferences && typeof body.preferences === "object" && !Array.isArray(body.preferences) ? body.preferences : null;

  if (!householdName) {
    return NextResponse.json({ error: "household_name_required", message: "Household name is required." }, { status: 400 });
  }

  if (!people) {
    return NextResponse.json({ error: "people_must_be_array", message: "People must be an array." }, { status: 400 });
  }

  if (!preferences) {
    return NextResponse.json({ error: "preferences_must_be_object", message: "Preferences must be an object." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("harbor_setups")
    .upsert(
      {
        setup_key: "default",
        household_name: householdName,
        primary_email: primaryEmail || null,
        people,
        preferences,
      },
      { onConflict: "setup_key" },
    )
    .select("household_name, primary_email, people, preferences")
    .single();

  if (error) {
    return tableMissingResponse(error.message);
  }

  return NextResponse.json({ setup: toClientSetup(data) });
}

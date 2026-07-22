// Zentrale Supabase-Verbindung für login.html und dashboard.html.
// SUPABASE_ANON_KEY ist der "anon public" Key aus Supabase -> Project Settings -> API.
// Er darf öffentlich im Browser-Code stehen (Zugriffsrechte regeln die RLS-Policies in Supabase).
const SUPABASE_URL = "https://tdndhujchdttoasjjmcs.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkbmRodWpjaGR0dG9hc2pqbWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2Mjk5MzYsImV4cCI6MjEwMDIwNTkzNn0.J716SQ59eOYPJUOqYfokX_8wnPahPIqHj4oNaS8hieE";

// URL der PDF-Converter-API (Render), fuer den Stripe-Checkout-Aufruf im Dashboard.
const API_BASE_URL = "https://pdf-converter-api-0g8x.onrender.com";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

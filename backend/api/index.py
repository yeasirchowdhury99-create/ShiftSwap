
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client

# ✅ paste your actual values here
SUPABASE_URL = "https://yugextggpkmgerevchck.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Z2V4dGdncGttZ2VyZXZjaGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NzYzNTEsImV4cCI6MjA5NjE1MjM1MX0.Py84EN2ARHsnAWN7hbNnziFk0Nk2KUa8XNJw91i7UPE"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Shift(BaseModel):
    title: str
    time: str

@app.get("/api/shifts")
def get_shifts():
    response = supabase.table("shifts").select("*").execute()
    return response.data

@app.post("/api/shifts")
def add_shift(shift: Shift):
    response = supabase.table("shifts").insert([{
        "title": shift.title,
        "time": shift.time
    }]).execute()

    return response.data

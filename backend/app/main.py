from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.lounges import router as lounges_router

app = FastAPI(title="운지기 API", version="0.0.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://unjigi-mvp-git-test-yoons-projects-77b5c785.vercel.app",
        "https://unjigi-mvp.vercel.app",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok", "service": "unjigi-backend"}

app.include_router(lounges_router)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.lounges import router as lounges_router
from fastapi import Depends
from app.db.session import get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

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

@app.get("/dbping")
async def dbping(session: AsyncSession = Depends(get_async_session)):
    await session.execute(text("SELECT 1"))
    return {"ok": True}

app.include_router(lounges_router)

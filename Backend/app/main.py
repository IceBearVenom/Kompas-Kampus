from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# List of frontend origins permitted to make requests
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://yourdomain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Use ["*"] to allow all origins (see note below)
    allow_credentials=True,  # Allow cookies and Authorization headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all request headers
)


@app.get("/")
async def root():
    return {"message": "CORS is enabled"}

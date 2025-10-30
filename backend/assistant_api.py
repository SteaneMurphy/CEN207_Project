from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline, BitsAndBytesConfig
from embeddings_search import search_products
import torch

# Initialise FastAPI
app = FastAPI(title="OneStop AI Assistant")

# CORS and middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to your locally downloaded model
model_path = "./models/SmolLM3-3B"

# INT4 quantization config
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype="float16",
)

# Load tokenizer and model locally in int4 mode
tokeniser = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(
    model_path,
    quantization_config=bnb_config,
    device_map="auto"
)

# Create a text-generation pipeline
chat_pipe = pipeline("text-generation", model=model, tokenizer=tokeniser)

# Request/response schema
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    user_message = req.message

    # Step 1: Find similar products
    matched_products = search_products(user_message, top_k=5)

    product_summaries = [
        f"{p['name']} ({p['brand']}): {p['description']}"
        for p in matched_products
    ]
    context = "\n".join(product_summaries)

    # Step 2: Build context for the model
    context = "\n\n".join([
        f"Product: {p['name']}\nDescription: {p['description']}\nSpecs: {p['technicalSpecs']}"
        for p in matched_products
    ])

    prompt = f"""
    You are a helpful AI shopping assistant.

    The user asked: "{user_message}"

    Here are some relevant products:
    {context}

    Respond conversationally, suggesting one or more products from above if appropriate.
    Do not include raw JSON or code in your answer.

    AI:
    """.strip()

    # Step 3: Generate reply
    response = chat_pipe(
        prompt,
        max_new_tokens=200,
        do_sample=True,
        temperature=0.7,
        top_p=0.9,
    )[0]["generated_text"]

    reply = response.split("AI:")[-1].strip() if "AI:" in response else response.strip()

    # Step 4: Return both, but structured
    return {
        "reply": reply,
        "matched_products": [
            { "id": p["id"], "name": p["name"], "price": p["price"], "image": p["images"][0] }
            for p in matched_products
        ]
    }


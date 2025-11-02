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

# Path locally stored model
model_path = "./models/SmolLM3-3B"

"""
    Loads the model in INT4 quantization mode as model is too powerful
    for my local computer. Config set against known values for my hardware.
"""
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype="float16",
)

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

"""
    This endpoint utilises the search function from the 'embeddings_search.py' script.

    Once the similar products are returned, their descriptions and names are seperated and
    added to an array.

    The AI model is instructed to act as a shopping asisstant and is passed the computed
    similar products. The model presents its response, related to this list.

    The list is also returned to the frontend for display and rendering purposes.
"""
@app.post("/chat")
def chat(req: ChatRequest):
    user_message = req.message

    matched_products = search_products(user_message, top_k=5)                                       # find similar products using consine vectorisation

    product_summaries = [
        f"{p['name']} ({p['brand']}): {p['description']}"
        for p in matched_products
    ]
    context = "\n".join(product_summaries)

    context = "\n\n".join([                                                                        # create the prompt and context to be used by the AI model
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

    response = chat_pipe(                                                                           # generate the response, set token limit and other settigns
        prompt,
        max_new_tokens=800,
        do_sample=True,
        temperature=0.7,
        top_p=0.9,
    )[0]["generated_text"]

    reply = response.split("AI:")[-1].strip() if "AI:" in response else response.strip()            # split the response into matched products array and customer response

    return {
        "reply": reply,
        "matched_products": [
            { "id": p["id"], "name": p["name"], "price": p["price"], "image": p["images"][0] }
            for p in matched_products
        ]
    }


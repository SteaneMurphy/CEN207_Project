from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline, BitsAndBytesConfig

# Initialise FastAPI
app = FastAPI(title="OneStop AI Assistant")

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
    """Generate a response from the local model"""
    prompt = f"You are a helpful AI assistant. Respond conversationally to the user.\nUser: {req.message}\nAI:"
    
    response = chat_pipe(
        prompt,
        max_new_tokens=150,
        do_sample=True,
        temperature=0.7,
        top_p=0.9,
    )[0]["generated_text"]

    # Strip the prompt from the start of the output
    reply = response[len(prompt):].strip()

    return {"reply": reply}


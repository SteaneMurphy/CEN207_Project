import json
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import os

# Paths
BASE_DIR = os.path.dirname(__file__)
PRODUCTS_PATH = os.path.join(BASE_DIR, "../data/products.json")
EMBEDDINGS_PATH = os.path.join(BASE_DIR, "../data/product_vectors.npy")

# Load model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Load products and embeddings
with open(PRODUCTS_PATH, "r") as f:
    products = json.load(f)

embeddings = np.load(EMBEDDINGS_PATH)

def search_products(query, top_k=5):
    """Return the top-k most relevant products to a text query."""
    # Encode query to vector
    query_vec = model.encode([query])
    # Compute cosine similarities
    sims = cosine_similarity(query_vec, embeddings)[0]
    # Sort by similarity
    top_indices = sims.argsort()[-top_k:][::-1]
    # Return top products
    return [products[i] for i in top_indices]

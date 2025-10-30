from sentence_transformers import SentenceTransformer
import numpy as np
import json
import os

# Path for product list
DATA_PATH = os.path.join(os.path.dirname(__file__), "../data/products.json")
with open(DATA_PATH, "r") as f:
    products = json.load(f)

# Embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Product text mappings
texts = [
    f"{p['name']} by {p['brand']} — Category: {p['category']}. "
    f"Price: ${p['price']}. Rating: {p['rating']} stars from {p['numReviews']} reviews. "
    f"Description: {p['description']}. "
    f"Technical specs: " + ", ".join([f"{k}: {v}" for k, v in p['technicalSpecs'].items()]) + ". "
    f"Features: " + ", ".join(p['features'])
    for p in products
]

# Generate the embeddings
embeddings = model.encode(texts, convert_to_numpy=True)

# Save vectorised product list to disk
np.save("product_vectors.npy", embeddings)
with open("product_metadata.json", "w") as f:
    json.dump(products, f)

print("Embeddings generated and saved")
from sentence_transformers import SentenceTransformer
import numpy as np
import json
import os

"""
    This script sets up file paths and then loads the embeddings model 'MiniLM'.
    The fields from 'products.json' are then designated and sent through the model.
    These fields are then vectorised against themselves and saved as a new vectorised list.
"""

# File paths
PRODUCTS_PATH = os.path.join(os.path.dirname(__file__), "../data/products.json")
EMBEDDING_PATH = os.path.join(os.path.dirname(__file__), "../data/product_vectors.npy")
METADATA_PATH = os.path.join(os.path.dirname(__file__), "../data/product_metadata.json")

with open(PRODUCTS_PATH, "r") as f:
    products = json.load(f)

# Embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Fields to vectorise from the products.json file
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

# Save vectorised product list
np.save(EMBEDDING_PATH, embeddings)
with open(METADATA_PATH, "w") as f:
    json.dump(products, f)

print("Embeddings generated and saved")
from huggingface_hub import snapshot_download

"""
    This script downloads the 'SmolLM3' model to the project
"""

# Hugging Face repository for the model
repo_id = "HuggingFaceTB/SmolLM3-3B"

# Local folder to save the model
local_dir = "./models/SmolLM3-3B"

print(f"Downloading {repo_id} to {local_dir} ...")
snapshot_download(repo_id=repo_id, local_dir=local_dir)
print("Download complete!")
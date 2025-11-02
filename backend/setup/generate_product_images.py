from diffusers import StableDiffusionPipeline
import torch, json, os

"""
    This script first loads the product data from the 'products.json' file
    and determines the output directories.

    It then loads the StableDiffusion image generation model and is then
    given the below prompt. The prompt is to generate product photos on a white
    background according to the product descriptions sent in.

    Each image generated is then saved with an incremental numbering system.
"""

# File I/O
with open("../../frontend/OneStop/public/products.json") as f:
    products = json.load(f)

output_dir = "../../frontend/OneStop/public/productImages"
os.makedirs(output_dir, exist_ok=True)

# Stable Diffusion model
pipe = StableDiffusionPipeline.from_pretrained(
    "stabilityai/sd-turbo",
    torch_dtype=torch.float16
).to("cuda" if torch.cuda.is_available() else "cpu")

# Prompt - Generates images
for p in products:
    prompt = (
        f"studio product photo of a {p['name']}, {p['category']}, "
        "isolated on white background, realistic lighting, 4k"
    )

    image = pipe(
        prompt,
        num_inference_steps=30,
        guidance_scale=7.5,
        height=512,
        width=512
    ).images[0]

    save_path = os.path.join(output_dir, f"{p['id']}.jpg")
    image.save(save_path)

    p["images"] = [f"/productImages/{p['id']}.jpg"]
    print(f"Generated: {p['name']} → {save_path}")

# File I/O
with open("../../frontend/OneStop/public/products.json", "w") as f:
    json.dump(products, f, indent=2)

print("All product images generated and products.json updated!")

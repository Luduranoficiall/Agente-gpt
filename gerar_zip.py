import os
import zipfile


def zip_project(output="agente_gpt_final.zip"):
    root = os.getcwd()
    with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as z:
        for folder, _, files in os.walk(root):
            for f in files:
                if f.endswith(".zip") or f.startswith("gerar_zip"):
                    continue
                full = os.path.join(folder, f)
                rel = os.path.relpath(full, root)
                z.write(full, rel)
    print(f"ZIP gerado com sucesso: {output}")


if __name__ == "__main__":
    zip_project()

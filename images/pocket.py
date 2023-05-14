from pocketbase import Client
from pocketbase.client import FileUpload
import glob
client = Client("http://localhost:8090")

user = client.admins.auth_with_password("studente.cosimo.sgambelluri@gmail.com", "4RQVb7CkR8ms3jP")

files = glob.glob("*.png")
for file in files:
    print(file)
    image_id = file.split(".")[0]
    result = client.collection("images").create(
        {
            "image_id": image_id,
            "image": FileUpload((file, open(file, "rb"))),
        })
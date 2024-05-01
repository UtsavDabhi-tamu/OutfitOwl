# Step 1: Install Git LFS to download large pre-trained models file
```bash
sudo apt install git-lfs
```
Troubleshoot - https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage

If there are difficulties downloading the `.pkl` files through Git LFS, you can download them directly from Google Drive.

[Basic.pkl](https://drive.google.com/file/d/1Co3XbMyFDaCSNZr27__y8rddVxYCRt9n/view?usp=share_link)<br>
[Patterns.pkl](https://drive.google.com/file/d/1Cpm3ndRxyJxIsC31SxrNG4z1x-dyklJL/view?usp=share_link)<br>
[Solid.pkl](https://drive.google.com/file/d/15g3gmc9oAGhNLnTrBB18RmClAeWv2w7Q/view?usp=drive_link)<br>
[TensorCodex.pkl](https://drive.google.com/file/d/15Kdq7AV6_rIf8CUiN0H7EvHti7HEcjRf/view?usp=drive_link)<br>
Move the `.pkl` files to `api/` directory

# Step 2: Install docker
Follow the steps provided here - [docker-install](https://docs.docker.com/engine/install/)

# Step 3: Clone the github repo and checkout to 'Docker' branch
```bash
git clone https://github.com/dabhiutsav/OutfitOwl.git
git checkout docker
```

# Step 4: Download the API key file from Google Drive
https://drive.google.com/file/d/1f1s0Ukxvh7RLIQYLprnThuvkBnz05cAX/view?usp=sharing

Place the file `keys.py` in the main directory

# Step 5: Run the application
```bash
docker-compose up --build
```

That's it! Now, you can view the application: [OutfitOwl](http://localhost:3000)

# Step 1: Install Git LFS to download large pre-trained models file
```bash
sudo apt install git-lfs
```
Troubleshoot - https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage

# Step 2: Install docker
Follow the steps provided here - [docker-install](https://docs.docker.com/engine/install/)

# Step 4: Clone the github repo and checkout to 'Docker' branch
```bash
git clone https://github.com/dabhiutsav/OutfitOwl.git
git checkout docker
```

# Step 5: Download the API key file from Google Drive
https://drive.google.com/file/d/1f1s0Ukxvh7RLIQYLprnThuvkBnz05cAX/view?usp=sharing

Place the file keys.py in the main directory

# Step 6: Run the application
```bash
docker-compose up --build
```

That's it! Now, you can view the application: [OutfitOwl](http://localhost:3000)

# Step 1: Install Python (skip if already installed)

**MAC:**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update
brew install python
python3 --version
```

**Ubuntu:**
```bash
sudo apt update
sudo apt install python3
python3 --version
```

# Step 2: Install NVM (Node Version Manager)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
Shut down this terminal and open a new one. Then type:
```bash
nvm install v18.17.1
```
Troubleshoot - https://github.com/nvm-sh/nvm?tab=readme-ov-file

# Step 3: Install Git LFS to download large pre-trained models file
```bash
sudo apt install git-lfs
```
Troubleshoot - https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage

If there are difficulties downloading the .pkl files through Git LFS, you can download them directly from Google Drive.

[Basic.pkl](https://drive.google.com/file/d/1Co3XbMyFDaCSNZr27__y8rddVxYCRt9n/view?usp=share_link)<br>
[Patterns.pkl](https://drive.google.com/file/d/1Cpm3ndRxyJxIsC31SxrNG4z1x-dyklJL/view?usp=share_link)<br>
[Solid.pkl](https://drive.google.com/file/d/15g3gmc9oAGhNLnTrBB18RmClAeWv2w7Q/view?usp=drive_link)<br>
[TensorCodex.pkl](https://drive.google.com/file/d/15Kdq7AV6_rIf8CUiN0H7EvHti7HEcjRf/view?usp=drive_link)<br>
Move the `.pkl` files to `api/` directory

# Step 4: Install Dependencies and Run the Application
```bash
npm i
npm run build
npm run start
```

Your application is running at http://localhost:3000
